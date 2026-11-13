// Cloud sync for Nakano Academy.
//
// The UI updates instantly (optimistic); every change is also queued here and written
// to Supabase in small debounced batches. The queue lives in localStorage, so answers
// given offline (or on a flaky phone connection) are sent the next time we're online.
// Rows are written with upserts keyed on stable ids, so retrying a batch is harmless.

import { supabase } from '../lib/supabase'
import type { Database } from '../types/supabase'

type Tables = Database['public']['Tables']
export type Profile = Tables['user_profiles']['Row']
export type ProfilePatch = Tables['user_profiles']['Update']
export type ProgressRow = Tables['question_progress']['Row']
export type ProgressUpsert = Tables['question_progress']['Insert']
export type SessionRow = Tables['study_sessions']['Row']
export type SessionInsert = Tables['study_sessions']['Insert']
export type EggsRow = Tables['scrambled_eggs_logs']['Row']
export type EggsInsert = Tables['scrambled_eggs_logs']['Insert']

export type SyncStatus = 'synced' | 'syncing' | 'offline'

export interface CloudSnapshot {
  profile: Profile
  progress: ProgressRow[]
  sessions: SessionRow[]
  eggsLogs: EggsRow[]
}

interface Queue {
  reset: boolean
  profile: ProfilePatch | null
  progress: Record<string, ProgressUpsert>
  sessions: SessionInsert[]
  eggs: EggsInsert[]
}

const emptyQueue = (): Queue => ({ reset: false, profile: null, progress: {}, sessions: [], eggs: [] })
const HISTORY_LIMIT = 50

export const DEFAULT_PROFILE_FIELDS = {
  exam_score: 0,
  study_streak: 0,
  best_streak: 0,
  last_study_date: null,
  maruo_approval: 70,
  preferred_sister: 'miku',
  baseline_mastery: { math: 39, english: 43, geo: 68, cs: 31, science: 56 },
  current_mastery: { math: 0, english: 0, geo: 0, cs: 0, science: 0 },
  item_inventory: { ichika_notes: 2, nino_timer: 2, miku_headphones: 2, yotsuba_ribbon: 2, itsuki_bun: 2 },
  scrambled_eggs_high_score: 0,
  scrambled_eggs_best_streak: 0,
} satisfies Partial<Profile>

export const progressKey = (subject: string, question: string) => `${subject}:${question}`

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked: the queue stays in memory */
  }
}

export class SupabaseSync {
  readonly userId: string
  private queue: Queue
  private status: SyncStatus = 'synced'
  private listeners = new Set<(s: SyncStatus) => void>()
  private timer: ReturnType<typeof setTimeout> | null = null
  private flushing = false
  private retryMs = 4000
  private queueKey: string
  private cacheKey: string

  /** Development-only demo mode: nothing is sent to Supabase. */
  readonly demo: boolean

  constructor(userId: string, opts: { demo?: boolean } = {}) {
    this.userId = userId
    this.demo = Boolean(opts.demo)
    this.queueKey = `nakano-sync-queue:${userId}`
    this.cacheKey = `nakano-cloud-cache:${userId}`
    this.queue = { ...emptyQueue(), ...readJSON<Queue>(this.queueKey, emptyQueue()) }
    window.addEventListener('online', this.onOnline)
    if (this.hasPending()) this.schedule(0)
  }

  dispose() {
    window.removeEventListener('online', this.onOnline)
    if (this.timer) clearTimeout(this.timer)
    this.listeners.clear()
  }

  /* ── status ── */
  subscribe(fn: (s: SyncStatus) => void) {
    this.listeners.add(fn)
    fn(this.status)
    return () => {
      this.listeners.delete(fn)
    }
  }
  private setStatus(s: SyncStatus) {
    if (s === this.status) return
    this.status = s
    this.listeners.forEach((fn) => fn(s))
  }
  private onOnline = () => this.schedule(0)

  hasPending() {
    const q = this.queue
    return q.reset || !!q.profile || Object.keys(q.progress).length > 0 || q.sessions.length > 0 || q.eggs.length > 0
  }

  /* ── hydrate ── */
  /**
   * Load everything for this user. Pending offline changes are sent first so the
   * fetched data already includes them. Falls back to the last cached copy offline.
   */
  async hydrate(identity: { email: string | null; full_name: string | null; avatar_url: string | null }): Promise<CloudSnapshot> {
    if (this.hasPending() && navigator.onLine) await this.flush()
    try {
      const [profileRes, progressRes, sessionsRes, eggsRes] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('user_id', this.userId).maybeSingle(),
        supabase.from('question_progress').select('*').eq('user_id', this.userId),
        supabase.from('study_sessions').select('*').eq('user_id', this.userId).order('completed_at', { ascending: false }).limit(HISTORY_LIMIT),
        supabase.from('scrambled_eggs_logs').select('*').eq('user_id', this.userId).order('played_at', { ascending: false }).limit(HISTORY_LIMIT),
      ])
      const err = profileRes.error || progressRes.error || sessionsRes.error || eggsRes.error
      if (err) throw err

      let profile = profileRes.data
      if (!profile) {
        // The sign-up trigger normally creates this row; create it here if it didn't.
        const ins = await supabase
          .from('user_profiles')
          .upsert({ user_id: this.userId, ...identity }, { onConflict: 'user_id' })
          .select('*')
          .single()
        if (ins.error) throw ins.error
        profile = ins.data
      } else if (identity.avatar_url !== profile.avatar_url || identity.full_name !== profile.full_name) {
        // Keep the Google name and photo current.
        profile = { ...profile, ...identity }
        this.enqueueProfile(identity)
      }
      const snap: CloudSnapshot = { profile, progress: progressRes.data, sessions: sessionsRes.data, eggsLogs: eggsRes.data }
      this.cache(snap)
      this.setStatus(this.hasPending() ? 'syncing' : 'synced')
      return snap
    } catch (e) {
      const cached = readJSON<CloudSnapshot | null>(this.cacheKey, null)
      this.setStatus('offline')
      if (cached) return cached
      throw e
    }
  }

  /** Remember the latest state so the app can open offline. */
  cache(snap: CloudSnapshot) {
    writeJSON(this.cacheKey, {
      ...snap,
      sessions: snap.sessions.slice(0, HISTORY_LIMIT),
      eggsLogs: snap.eggsLogs.slice(0, HISTORY_LIMIT),
    })
  }

  /* ── writes (optimistic: the caller has already updated its own state) ── */
  enqueueProfile(patch: ProfilePatch) {
    this.queue.profile = { ...(this.queue.profile || {}), ...patch }
    this.persistAndSchedule()
  }
  enqueueProgress(row: ProgressUpsert) {
    this.queue.progress[progressKey(row.subject_id, row.question_id)] = { ...row, user_id: this.userId }
    this.persistAndSchedule()
  }
  enqueueSession(row: SessionInsert) {
    this.queue.sessions.push({ ...row, user_id: this.userId })
    this.persistAndSchedule(0)
  }
  enqueueEggs(row: EggsInsert) {
    this.queue.eggs.push({ ...row, user_id: this.userId })
    this.persistAndSchedule(0)
  }
  /** Wipe all cloud progress for this user. Anything queued before is dropped. */
  enqueueReset() {
    this.queue = { ...emptyQueue(), reset: true }
    this.persistAndSchedule(0)
  }

  private persistAndSchedule(delay = 700) {
    writeJSON(this.queueKey, this.queue)
    this.setStatus(navigator.onLine ? 'syncing' : 'offline')
    this.schedule(delay)
  }

  private schedule(delay: number) {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => void this.flush(), delay)
  }

  /* ── flush ── */
  async flush(): Promise<void> {
    if (this.demo) {
      this.queue = emptyQueue()
      this.setStatus('synced')
      return
    }
    if (this.flushing) {
      this.schedule(400)
      return
    }
    if (!this.hasPending()) {
      this.setStatus('synced')
      return
    }
    if (!navigator.onLine) {
      this.setStatus('offline')
      return
    }
    this.flushing = true
    this.setStatus('syncing')
    // Take a snapshot of the batch; new changes made meanwhile go into a fresh queue.
    const batch = this.queue
    this.queue = emptyQueue()
    try {
      const uid = this.userId
      if (batch.reset) {
        const results = await Promise.all([
          supabase.from('question_progress').delete().eq('user_id', uid),
          supabase.from('study_sessions').delete().eq('user_id', uid),
          supabase.from('scrambled_eggs_logs').delete().eq('user_id', uid),
          supabase.from('user_profiles').update(DEFAULT_PROFILE_FIELDS).eq('user_id', uid),
        ])
        const err = results.find((r) => r.error)?.error
        if (err) throw err
      }
      if (batch.profile) {
        const { error } = await supabase.from('user_profiles').update(batch.profile).eq('user_id', uid)
        if (error) throw error
      }
      const progress = Object.values(batch.progress)
      if (progress.length) {
        const { error } = await supabase.from('question_progress').upsert(progress, { onConflict: 'user_id,subject_id,question_id' })
        if (error) throw error
      }
      if (batch.sessions.length) {
        const { error } = await supabase.from('study_sessions').upsert(batch.sessions, { onConflict: 'id', ignoreDuplicates: true })
        if (error) throw error
      }
      if (batch.eggs.length) {
        const { error } = await supabase.from('scrambled_eggs_logs').upsert(batch.eggs, { onConflict: 'id', ignoreDuplicates: true })
        if (error) throw error
      }
      this.retryMs = 4000
    } catch (e) {
      // Put the failed batch back underneath anything queued since, then retry later.
      this.queue = mergeQueues(batch, this.queue)
      console.warn('[sync] write failed, will retry', e)
      this.setStatus('offline')
      this.retryMs = Math.min(this.retryMs * 2, 60000)
      this.schedule(this.retryMs)
    } finally {
      writeJSON(this.queueKey, this.queue)
      this.flushing = false
    }
    if (this.status !== 'offline') {
      if (this.hasPending()) this.schedule(300)
      else this.setStatus('synced')
    }
  }
}

function mergeQueues(older: Queue, newer: Queue): Queue {
  if (newer.reset) return newer
  return {
    reset: older.reset,
    profile: older.profile || newer.profile ? { ...(older.profile || {}), ...(newer.profile || {}) } : null,
    progress: { ...older.progress, ...newer.progress },
    sessions: [...older.sessions, ...newer.sessions],
    eggs: [...older.eggs, ...newer.eggs],
  }
}

export function newId(): string {
  return crypto.randomUUID()
}
