// App state for a signed-in student, kept in step with Supabase.
// Every action updates React state immediately, then queues the matching write
// through SupabaseSync (src/services/supabaseSync.ts).

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { MODULES, QUESTION_INDEX, tierOf } from '../data/curriculum.js'
import { itemForSister } from '../data/items.js'
import {
  DEFAULT_PROFILE_FIELDS,
  SupabaseSync,
  newId,
  progressKey,
  type CloudSnapshot,
  type EggsRow,
  type Profile,
  type ProfilePatch,
  type ProgressRow,
  type SessionRow,
  type SyncStatus,
} from '../services/supabaseSync'

export const SUBJECT_KEYS = ['math', 'english', 'geo', 'cs', 'science'] as const
export type SubjectKey = (typeof SUBJECT_KEYS)[number]
export type ItemKey = 'ichika_notes' | 'nino_timer' | 'miku_headphones' | 'yotsuba_ribbon' | 'itsuki_bun'
export type Mastery = Record<SubjectKey, number>
export type Inventory = Record<ItemKey, number>

export const MIDTERM_WARNING_BELOW = 40
const DAY = 86_400_000

export interface AcademyState {
  profile: Profile
  progress: Record<string, ProgressRow>
  sessions: SessionRow[]
  eggsLogs: EggsRow[]
  /** Nino's Kitchen Timer is armed (local until it is used up). */
  shield: boolean
}

export interface AnswerResult {
  points: number
  shielded: boolean
  streak: number
  milestone: 3 | 5 | 10 | null
  approvalDelta: number
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function asMastery(j: unknown): Mastery {
  const o = (j && typeof j === 'object' ? j : {}) as Record<string, unknown>
  return Object.fromEntries(SUBJECT_KEYS.map((k) => [k, Number(o[k]) || 0])) as Mastery
}
export function asInventory(j: unknown): Inventory {
  const o = (j && typeof j === 'object' ? j : {}) as Record<string, unknown>
  const keys: ItemKey[] = ['ichika_notes', 'nino_timer', 'miku_headphones', 'yotsuba_ribbon', 'itsuki_bun']
  return Object.fromEntries(keys.map((k) => [k, Math.max(0, Number(o[k]) || 0)])) as Inventory
}

/** 0–100 mastery for one subject: tier-weighted share of questions answered right and not currently weak. */
export function computeMastery(subject: SubjectKey, progress: Record<string, ProgressRow>): number {
  const qs = (MODULES as Record<string, { questions: { id: string; tier: string }[] }>)[subject].questions
  let have = 0
  let total = 0
  for (const q of qs) {
    const w = tierOf(q.tier).weight
    total += w
    const p = progress[progressKey(subject, q.id)]
    if (p && p.correct_count > 0 && !p.is_weak_spot) have += w
  }
  return total ? Math.round((have / total) * 100) : 0
}

/** Letter grade for a 0–100 score. */
export function letterGrade(score: number): 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'S+' {
  if (score >= 97) return 'S+'
  if (score >= 88) return 'S'
  if (score >= 75) return 'A'
  if (score >= 60) return 'B'
  if (score >= 45) return 'C'
  if (score >= 30) return 'D'
  return 'F'
}

/** Questions to review: weak spots first, then anything whose review date has passed. */
export function reviewQueue(progress: Record<string, ProgressRow>, subject?: SubjectKey) {
  const now = Date.now()
  return Object.values(progress)
    .filter((p) => (!subject || p.subject_id === subject) && QUESTION_INDEX[p.question_id])
    .filter((p) => p.is_weak_spot || Date.parse(p.next_review_at) <= now)
    .sort((a, b) => Number(b.is_weak_spot) - Number(a.is_weak_spot) || Date.parse(a.next_review_at) - Date.parse(b.next_review_at))
    .map((p) => QUESTION_INDEX[p.question_id])
}

/** SM-2 style scheduling for one answer. */
function schedule(prev: ProgressRow | undefined, correct: boolean, userId: string, subject: string, questionId: string): ProgressRow {
  const now = Date.now()
  const base: ProgressRow = prev || {
    id: newId(),
    user_id: userId,
    subject_id: subject,
    question_id: questionId,
    correct_count: 0,
    incorrect_count: 0,
    is_weak_spot: false,
    ease_factor: 2.5,
    interval_days: 1,
    next_review_at: new Date(now).toISOString(),
    last_answered_at: new Date(now).toISOString(),
  }
  const ease = Number(base.ease_factor) || 2.5
  if (correct) {
    const interval = base.correct_count === 0 || base.is_weak_spot ? 1 : base.interval_days <= 1 ? 3 : Math.round(base.interval_days * ease)
    return {
      ...base,
      correct_count: base.correct_count + 1,
      is_weak_spot: false,
      ease_factor: Math.min(5, +(ease + 0.1).toFixed(2)),
      interval_days: interval,
      next_review_at: new Date(now + interval * DAY).toISOString(),
      last_answered_at: new Date(now).toISOString(),
    }
  }
  return {
    ...base,
    incorrect_count: base.incorrect_count + 1,
    is_weak_spot: true,
    ease_factor: Math.max(1.3, +(ease - 0.2).toFixed(2)),
    interval_days: 0,
    next_review_at: new Date(now).toISOString(),
    last_answered_at: new Date(now).toISOString(),
  }
}

interface Ctx {
  state: AcademyState
  mastery: Mastery
  baseline: Mastery
  inventory: Inventory
  syncStatus: SyncStatus
  answer: (a: { subject: SubjectKey; questionId: string; correct: boolean; doubled?: boolean }) => AnswerResult
  finishSession: (s: {
    sister: string
    subject: string
    tier: string
    correct: number
    total: number
    score: number
    maruoDelta: number
    itemsUsed: Partial<Record<ItemKey, number>>
  }) => { bonusItem: ItemKey | null; approvalDelta: number }
  consumeItem: (key: ItemKey) => boolean
  setPreferredSister: (id: string) => void
  logEggsRound: (r: { target: string; guessed: string; cluesUsed: number; multiplier: number; points: number; streak: number }) => void
  finishEggsGame: (g: { total: number; bestStreak: number }) => void
  resetProgress: () => void
  setPrefs: (p: Pick<ProfilePatch, 'voice_enabled' | 'sfx_enabled' | 'voice_volume' | 'voice_speed'>) => void
}

const AcademyContext = createContext<Ctx | null>(null)

export function AcademyProvider({ sync, initial, children }: { sync: SupabaseSync; initial: CloudSnapshot; children: ReactNode }) {
  const [state, setState] = useState<AcademyState>(() => ({
    profile: initial.profile,
    progress: Object.fromEntries(initial.progress.map((p) => [progressKey(p.subject_id, p.question_id), p])),
    sessions: initial.sessions,
    eggsLogs: initial.eggsLogs,
    shield: false,
  }))
  const ref = useRef(state)
  ref.current = state
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced')
  useEffect(() => sync.subscribe(setSyncStatus), [sync])

  // Keep an offline copy current (cheap, debounced).
  useEffect(() => {
    const t = setTimeout(
      () => sync.cache({ profile: state.profile, progress: Object.values(state.progress), sessions: state.sessions, eggsLogs: state.eggsLogs }),
      500,
    )
    return () => clearTimeout(t)
  }, [state, sync])

  const commit = useCallback(
    (next: AcademyState, profilePatch?: ProfilePatch) => {
      ref.current = next
      setState(next)
      if (profilePatch && Object.keys(profilePatch).length) sync.enqueueProfile(profilePatch)
    },
    [sync],
  )

  const answer: Ctx['answer'] = useCallback(
    ({ subject, questionId, correct, doubled }) => {
      const s = ref.current
      const q = QUESTION_INDEX[questionId]
      const tier = tierOf(q?.tier)
      const key = progressKey(subject, questionId)
      const row = schedule(s.progress[key], correct, s.profile.user_id, subject, questionId)
      const progress = { ...s.progress, [key]: row }
      sync.enqueueProgress(row)

      const shielded = !correct && s.shield
      const streak = correct ? s.profile.study_streak + 1 : shielded ? s.profile.study_streak : 0
      const points = correct ? tier.points * (doubled ? 2 : 1) : 0
      const approvalDelta = correct ? (tier.key === 'hard' ? 2 : 1) : -2
      const mastery = { ...asMastery(s.profile.current_mastery), [subject]: computeMastery(subject, progress) }
      const patch: ProfilePatch = {
        exam_score: s.profile.exam_score + points,
        study_streak: streak,
        best_streak: Math.max(s.profile.best_streak, streak),
        last_study_date: today(),
        maruo_approval: clamp(s.profile.maruo_approval + approvalDelta, 0, 100),
        current_mastery: mastery,
      }
      commit({ ...s, progress, shield: shielded ? false : s.shield, profile: { ...s.profile, ...patch } as Profile }, patch)
      const milestone = correct && [3, 5, 10].includes(streak) ? (streak as 3 | 5 | 10) : null
      return { points, shielded, streak, milestone, approvalDelta }
    },
    [commit, sync],
  )

  const finishSession: Ctx['finishSession'] = useCallback(
    ({ sister, subject, tier, correct, total, score, maruoDelta, itemsUsed }) => {
      const s = ref.current
      const pct = total ? correct / total : 0
      let approvalDelta = pct >= 0.8 ? 3 : pct < 0.5 ? -3 : 0
      if (tier === 'midterm_rescue') approvalDelta = pct >= 4 / 6 ? 15 : 0
      const inv = asInventory(s.profile.item_inventory)
      const bonusItem = pct >= 0.8 ? ((itemForSister(sister)?.key as ItemKey | undefined) ?? null) : null
      if (bonusItem) inv[bonusItem] += 1
      const patch: ProfilePatch = {
        maruo_approval: clamp(s.profile.maruo_approval + approvalDelta, 0, 100),
        item_inventory: inv,
      }
      const session: SessionRow = {
        id: newId(),
        user_id: s.profile.user_id,
        sister_id: sister,
        subject_id: subject,
        difficulty_tier: tier,
        score_earned: score,
        correct_answers: correct,
        total_questions: total,
        maruo_delta: maruoDelta + approvalDelta,
        items_used: itemsUsed,
        completed_at: new Date().toISOString(),
      }
      sync.enqueueSession(session)
      commit({ ...s, sessions: [session, ...s.sessions].slice(0, 50), profile: { ...s.profile, ...patch } as Profile }, patch)
      return { bonusItem, approvalDelta }
    },
    [commit, sync],
  )

  const consumeItem: Ctx['consumeItem'] = useCallback(
    (key) => {
      const s = ref.current
      const inv = asInventory(s.profile.item_inventory)
      if (inv[key] <= 0) return false
      inv[key] -= 1
      const patch: ProfilePatch = { item_inventory: inv }
      if (key === 'itsuki_bun') patch.maruo_approval = clamp(s.profile.maruo_approval + 10, 0, 100)
      commit({ ...s, shield: key === 'nino_timer' ? true : s.shield, profile: { ...s.profile, ...patch } as Profile }, patch)
      return true
    },
    [commit],
  )

  const setPreferredSister = useCallback(
    (id: string) => {
      const s = ref.current
      if (s.profile.preferred_sister === id) return
      const patch: ProfilePatch = { preferred_sister: id }
      commit({ ...s, profile: { ...s.profile, ...patch } as Profile }, patch)
    },
    [commit],
  )

  const logEggsRound: Ctx['logEggsRound'] = useCallback(
    ({ target, guessed, cluesUsed, multiplier, points, streak }) => {
      const s = ref.current
      const row: EggsRow = {
        id: newId(),
        user_id: s.profile.user_id,
        target_sister: target,
        guessed_sister: guessed,
        clues_used: cluesUsed,
        multiplier,
        points_awarded: points,
        streak_at_time: streak,
        played_at: new Date().toISOString(),
      }
      sync.enqueueEggs(row)
      const best = Math.max(s.profile.scrambled_eggs_best_streak, streak)
      const patch: ProfilePatch = best !== s.profile.scrambled_eggs_best_streak ? { scrambled_eggs_best_streak: best } : {}
      commit({ ...s, eggsLogs: [row, ...s.eggsLogs].slice(0, 50), profile: { ...s.profile, ...patch } as Profile }, patch)
    },
    [commit, sync],
  )

  const finishEggsGame: Ctx['finishEggsGame'] = useCallback(
    ({ total, bestStreak }) => {
      const s = ref.current
      const patch: ProfilePatch = {}
      if (total > s.profile.scrambled_eggs_high_score) patch.scrambled_eggs_high_score = total
      if (bestStreak > s.profile.scrambled_eggs_best_streak) patch.scrambled_eggs_best_streak = bestStreak
      if (Object.keys(patch).length) commit({ ...s, profile: { ...s.profile, ...patch } as Profile }, patch)
    },
    [commit],
  )

  const resetProgress = useCallback(() => {
    const s = ref.current
    sync.enqueueReset()
    commit({
      profile: { ...s.profile, ...DEFAULT_PROFILE_FIELDS, preferred_sister: s.profile.preferred_sister } as Profile,
      progress: {},
      sessions: [],
      eggsLogs: [],
      shield: false,
    })
    // Keep the current tutor selected after the wipe.
    sync.enqueueProfile({ preferred_sister: s.profile.preferred_sister })
  }, [commit, sync])

  const setPrefs: Ctx['setPrefs'] = useCallback(
    (patch) => {
      const s = ref.current
      commit({ ...s, profile: { ...s.profile, ...patch } as Profile }, patch)
    },
    [commit],
  )

  const value = useMemo<Ctx>(
    () => ({
      state,
      mastery: asMastery(state.profile.current_mastery),
      baseline: asMastery(state.profile.baseline_mastery),
      inventory: asInventory(state.profile.item_inventory),
      syncStatus,
      answer,
      finishSession,
      consumeItem,
      setPreferredSister,
      logEggsRound,
      finishEggsGame,
      resetProgress,
      setPrefs,
    }),
    [state, syncStatus, answer, finishSession, consumeItem, setPreferredSister, logEggsRound, finishEggsGame, resetProgress, setPrefs],
  )
  return <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>
}

export function useAcademy(): Ctx {
  const ctx = useContext(AcademyContext)
  if (!ctx) throw new Error('useAcademy must be used inside <AcademyProvider>')
  return ctx
}
