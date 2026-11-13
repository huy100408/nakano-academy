import { useState } from 'react'
import { AlertTriangle, ClipboardList, Cloud, CloudOff, Egg, ExternalLink, Flame, Loader2, LogOut, RotateCcw, Settings, ShieldCheck, Target } from 'lucide-react'
import { ITEMS } from '../data/items.js'
import { SISTERS, SUBJECTS, FUUTAROU_IDLE, byId } from '../data/sisters.js'
import { useAuth } from '../features/auth/AuthGate'
import { MIDTERM_WARNING_BELOW, letterGrade, reviewQueue, useAcademy } from '../state/useAcademy'
import { Avatar, Bar, Eyebrow, ITEM_ICONS } from './ui.jsx'

export function SyncBadge({ status, compact = false }) {
  const map = {
    synced: { icon: Cloud, text: 'Synced to Supabase', cls: 'text-emerald-600 bg-emerald-50 ring-emerald-200' },
    syncing: { icon: Loader2, text: 'Syncing…', cls: 'text-sky-700 bg-sky-50 ring-sky-200', spin: true },
    offline: { icon: CloudOff, text: 'Offline · queued', cls: 'text-amber-700 bg-amber-50 ring-amber-200' },
  }
  const m = map[status] || map.synced
  const Icon = m.icon
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-bold ring-1 ${m.cls}`} title={m.text}>
      <Icon size={11} className={m.spin ? 'animate-spin' : ''} />
      {!compact && m.text}
    </span>
  )
}

export function ResetModal({ onClose }) {
  const { resetProgress } = useAcademy()
  const [text, setText] = useState('')
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="anim-pop w-full max-w-md rounded-2xl bg-white p-6 shadow-lift" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 text-bad">
          <AlertTriangle size={18} />
          <h2 className="font-display text-[19px] font-extrabold text-ink">Reset cloud progress?</h2>
        </div>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          This permanently deletes your scores, streaks, items, review schedule, session history and Scrambled Eggs records from Supabase, on every device. It cannot be undone.
        </p>
        <label className="mt-4 block text-[13px] font-semibold">
          Type <span className="font-mono text-bad">RESET</span> to confirm
          <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 font-mono text-[14px] outline-none focus:border-ink/30" autoFocus />
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="min-h-[42px] rounded-xl px-4 text-[14px] font-semibold text-muted hover:bg-ink/5">
            Cancel
          </button>
          <button
            disabled={text !== 'RESET'}
            onClick={() => {
              resetProgress()
              onClose()
            }}
            className="min-h-[42px] rounded-xl bg-bad px-4 text-[14px] font-bold text-white disabled:opacity-30"
          >
            Delete everything
          </button>
        </div>
      </div>
    </div>
  )
}

function fuutarouLine(p, avg) {
  if (p.maruo_approval < MIDTERM_WARNING_BELOW) return 'Your father-in-law… I mean, Mr. Nakano is not happy. Midterm Rescue. Now.'
  if (p.study_streak >= 5) return `A ${p.study_streak}-answer streak? Don’t get cocky. Keep going.`
  if (avg >= 75) return 'Not bad. I might even get paid this month.'
  if (p.exam_score > 0) return `${p.exam_score} exam points. Every point counts. Move.`
  return FUUTAROU_IDLE[0]
}

/** The Fuutarou HUD: account, sync, score, streak, items and Maruo's approval. */
export function Hud({ onRescue, onSettings }) {
  const { user, signOut } = useAuth()
  const { state, mastery, inventory, syncStatus } = useAcademy()
  const [reset, setReset] = useState(false)
  const p = state.profile
  const avg = Math.round(SUBJECTS.reduce((n, s) => n + mastery[s.key], 0) / SUBJECTS.length)
  const warning = p.maruo_approval < MIDTERM_WARNING_BELOW
  const name = p.full_name || user.email || 'Student'

  return (
    <div className="rounded-2xl bg-ink p-4 text-white shadow-[0_10px_30px_-12px_rgb(0_0_0/.6)]">
      {/* account */}
      <div className="flex items-center gap-2.5">
        {p.avatar_url ? (
          <img src={p.avatar_url} alt="" referrerPolicy="no-referrer" className="h-9 w-9 rounded-full object-cover ring-2 ring-white/20" />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 font-bold">{name[0]}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-bold">{name}</div>
          <SyncBadge status={syncStatus} />
        </div>
      </div>

      {/* score + streak */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[.07] px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Exam score</div>
          <div className="font-mono text-[19px] font-bold leading-tight">{p.exam_score.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-white/[.07] px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Study streak</div>
          <div className="flex items-center gap-1 font-mono text-[19px] font-bold leading-tight">
            <Flame size={15} className={p.study_streak ? 'text-orange-400' : 'text-white/30'} />
            {p.study_streak}
            {state.shield && <ShieldCheck size={14} className="text-sky-300" />}
            <span className="ml-auto text-[11px] font-normal text-white/40">best {p.best_streak}</span>
          </div>
        </div>
      </div>

      {/* approval */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11.5px]">
          <span className="text-white/60">Maruo Nakano’s approval</span>
          <span className={`font-mono font-bold ${warning ? 'text-red-300' : ''}`}>{p.maruo_approval}%</span>
        </div>
        <Bar value={p.maruo_approval} color={warning ? '#f87171' : p.maruo_approval >= 70 ? '#4ade80' : '#fbbf24'} track="bg-white/12" className="h-1.5" />
      </div>
      {warning && (
        <button onClick={onRescue} className="mt-3 flex w-full items-center gap-2 rounded-xl bg-red-500/90 px-3 py-2 text-left text-[12.5px] font-bold hover:bg-red-500">
          <AlertTriangle size={15} className="shrink-0 animate-pulse" />
          <span className="flex-1">Midterm Warning! Take the Rescue challenge</span>
        </button>
      )}

      {/* items */}
      <div className="mt-3 flex justify-between gap-1 lg:[@media(max-height:820px)]:hidden">
        {ITEMS.map((it) => {
          const Icon = ITEM_ICONS[it.icon]
          const s = byId(it.sister)
          return (
            <span key={it.key} title={`${it.name} ×${inventory[it.key]}: ${it.desc}`} className="relative grid h-9 flex-1 place-items-center rounded-lg bg-white/[.07]">
              <Icon size={15} style={{ color: inventory[it.key] ? s.color : 'rgb(255 255 255 / .25)' }} />
              <span className="absolute -right-0.5 -top-1 rounded-full bg-white px-1 font-mono text-[9.5px] font-bold text-ink">{inventory[it.key]}</span>
            </span>
          )
        })}
      </div>

      <p className="mt-3 border-t border-white/10 pt-3 text-[11.5px] leading-snug text-white/70 lg:[@media(max-height:960px)]:hidden">
        <b className="text-white">Fuutarou</b> <span className="text-white/40">500/500 · Rank #3</span>
        <br />“{fuutarouLine(p, avg)}”
      </p>

      <div className="mt-3 flex gap-1.5">
        <button onClick={() => setReset(true)} className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/[.08] text-[11.5px] font-semibold hover:bg-white/[.14]" title="Reset cloud progress">
          <RotateCcw size={13} /> Reset
        </button>
        <button onClick={signOut} className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/[.08] text-[11.5px] font-semibold hover:bg-white/[.14]">
          <LogOut size={13} /> Sign out
        </button>
        {onSettings && (
          <button onClick={onSettings} className="grid h-8 w-8 place-items-center rounded-lg bg-white/[.08] hover:bg-white/[.14]" aria-label="Settings" title="Settings">
            <Settings size={14} />
          </button>
        )}
      </div>
      {reset && <ResetModal onClose={() => setReset(false)} />}
    </div>
  )
}

export default function Sidebar({ view, setView, active, setActive, onSettings, onRescue }) {
  const { state, mastery } = useAcademy()
  const reviewCount = reviewQueue(state.progress).length

  const NavItem = ({ id, icon: Icon, label, hint }) => (
    <button
      onClick={() => setView(id)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13.5px] font-semibold transition ${
        view === id ? 'bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/.08)]' : 'text-muted hover:bg-ink/[.04] hover:text-ink'
      }`}
    >
      <Icon size={17} strokeWidth={2.1} />
      <span className="flex-1">{label}</span>
      {hint !== undefined && <span className="rounded-full bg-ink/[.06] px-1.5 font-mono text-[11px] font-bold text-muted">{hint}</span>}
    </button>
  )

  return (
    <aside className="flex h-full w-[284px] shrink-0 flex-col border-r border-line bg-[#efebe4]/70 backdrop-blur-xl">
      <div className="drag mac-traffic-pad px-5 pb-3 pt-5">
        <div className="flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[12px] bg-ink font-display text-[19px] font-extrabold text-white shadow-[0_4px_12px_-4px_rgb(0_0_0/.5)]">
            五
            <div className="absolute inset-x-0 bottom-0 flex h-[5px]">
              {SISTERS.map((s) => (
                <span key={s.id} className="flex-1" style={{ background: s.color }} />
              ))}
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-[16px] font-extrabold tracking-tight">Nakano Academy</div>
            <div className="text-[11.5px] font-medium text-muted">Five tutors · One goal</div>
          </div>
        </div>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto px-3 pb-3">
        <Eyebrow className="px-3 pb-2 pt-1">Classroom</Eyebrow>
        <nav className="space-y-0.5">
          {SISTERS.map((s, i) => {
            const on = view === 'class' && active === s.id
            const sub = SUBJECTS.find((x) => x.key === s.subj)
            const score = mastery[s.subj]
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id)
                  setView('class')
                }}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-1.5 text-left transition ${on ? 'bg-white shadow-[0_1px_3px_rgb(0_0_0/.08)]' : 'hover:bg-ink/[.04]'}`}
              >
                {on && <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }} />}
                <Avatar s={s} size={34} ring={on} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13.5px] font-bold">{s.first}</span>
                    <span className="font-mono text-[11px] font-bold" style={{ color: s.ink }}>
                      {letterGrade(score)} · {score}
                    </span>
                  </div>
                  <div className="mb-1 flex items-center justify-between text-[11.5px] text-muted">
                    <span className="truncate">{sub.label}</span>
                    <kbd className="hidden font-mono text-[10px] text-faint group-hover:inline">{i + 1}</kbd>
                  </div>
                  <Bar value={score} color={s.color} className="h-[3px]" />
                </div>
              </button>
            )
          })}
        </nav>

        <Eyebrow className="px-3 pb-2 pt-5">Study modes</Eyebrow>
        <div className="space-y-0.5">
          <NavItem id="review" icon={Target} label="Review weak spots" hint={reviewCount} />
          <NavItem id="eggs" icon={Egg} label="Scrambled Eggs" hint={state.profile.scrambled_eggs_high_score || undefined} />
          <NavItem id="report" icon={ClipboardList} label="Report Card" />
          {!window.nakano && (
            <a href="../" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] font-semibold text-muted hover:bg-ink/[.04] hover:text-ink">
              <ExternalLink size={17} strokeWidth={2.1} />
              <span className="flex-1">Website &amp; downloads</span>
            </a>
          )}
        </div>
      </div>

      <div className="m-3 mt-0">
        <Hud onRescue={onRescue} onSettings={onSettings} />
      </div>
    </aside>
  )
}
