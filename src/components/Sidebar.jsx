import { ClipboardList, Egg, Flame, Settings, ShieldCheck } from 'lucide-react'
import { SISTERS, SUBJECTS, ELECTIVE, FUUTAROU_IDLE } from '../data/sisters.js'
import { summary } from '../lib/store.js'
import { Avatar, Bar, Eyebrow, Ring } from './ui.jsx'

function fuutarouLine(state, sum) {
  if (sum.approved) return 'Every subject over 30. ...Fine. Mr. Nakano can’t complain now.'
  if (state.streak >= 5) return `A ${state.streak}-answer streak? Don’t get cocky. Keep going.`
  if (sum.total > 0) return `${sum.total} points. ${sum.subs.length - sum.passing} subject${sum.subs.length - sum.passing === 1 ? '' : 's'} still under the pass line. Move.`
  return FUUTAROU_IDLE[0]
}

export default function Sidebar({ state, dispatch, view, setView, active, setActive, onSettings }) {
  const sum = summary(state)
  const list = SISTERS.filter((s) => !state.coreMode || s.subj !== ELECTIVE)

  const NavItem = ({ id, icon: Icon, label, hint }) => (
    <button
      onClick={() => setView(id)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13.5px] font-semibold transition ${
        view === id ? 'bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/.08)]' : 'text-muted hover:bg-ink/[.04] hover:text-ink'
      }`}
    >
      <Icon size={17} strokeWidth={2.1} />
      <span className="flex-1">{label}</span>
      {hint && <span className="text-[11px] font-medium text-faint">{hint}</span>}
    </button>
  )

  return (
    <aside className="flex h-full w-[272px] shrink-0 flex-col border-r border-line bg-[#efebe4]/70 backdrop-blur-xl">
      {/* Brand / drag area */}
      <div className="drag mac-traffic-pad px-5 pb-4 pt-5">
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
          {list.map((s) => {
            const on = view === 'class' && active === s.id
            const sub = SUBJECTS.find((x) => x.key === s.subj)
            const score = state.scores[s.subj]
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id)
                  setView('class')
                }}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition ${
                  on ? 'bg-white shadow-[0_1px_3px_rgb(0_0_0/.08)]' : 'hover:bg-ink/[.04]'
                }`}
              >
                {on && <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full" style={{ background: s.color }} />}
                <Avatar s={s} size={36} ring={on} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13.5px] font-bold">{s.first}</span>
                    <span className={`font-mono text-[11px] font-semibold ${score >= 30 ? 'text-ink' : 'text-faint'}`}>{score}</span>
                  </div>
                  <div className="mb-1 truncate text-[11.5px] text-muted">{sub.label}</div>
                  <Bar value={score} color={s.color} className="h-[3px]" />
                </div>
              </button>
            )
          })}
        </nav>

        <Eyebrow className="px-3 pb-2 pt-5">Modes</Eyebrow>
        <div className="space-y-0.5">
          <NavItem id="eggs" icon={Egg} label="Scrambled Eggs" hint={state.eggsBest ? `best ${state.eggsBest}/5` : 'bonus'} />
          <NavItem id="report" icon={ClipboardList} label="Report Card" hint={sum.approved ? '★' : undefined} />
        </div>
      </div>

      {/* Fuutarou HUD */}
      <div className="m-3 mt-0 rounded-2xl bg-ink p-4 text-white shadow-[0_10px_30px_-12px_rgb(0_0_0/.6)]">
        <div className="flex items-center gap-3.5">
          <Ring value={sum.total} max={sum.max} size={66} stroke={6} color="#fff" track="rgb(255 255 255 / .14)">
            <div className="text-center leading-none">
              <div className="font-mono text-[17px] font-bold">{sum.total}</div>
              <div className="mt-0.5 font-mono text-[9.5px] text-white/50">/{sum.max}</div>
            </div>
          </Ring>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-white/55">Streak</span>
              <span className="flex items-center gap-1 font-mono font-bold">
                {state.shield && <ShieldCheck size={13} className="text-sky-300" />}
                <Flame size={13} className={state.streak ? 'text-orange-400' : 'text-white/30'} />
                {state.streak}
                <span className="font-normal text-white/40">· {state.best}</span>
              </span>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="text-white/55">Maruo approval</span>
                <span className="font-mono font-bold">
                  {sum.passing}/{sum.subs.length}
                </span>
              </div>
              <Bar value={sum.passing} max={sum.subs.length} color={sum.approved ? '#4ade80' : '#fbbf24'} track="bg-white/12" className="h-1" />
            </div>
          </div>
        </div>
        <p className="mt-3 border-t border-white/10 pt-3 text-[12px] leading-snug text-white/75">
          <span className="font-bold text-white">Fuutarou</span> <span className="text-white/40">500/500 · Rank #3</span>
          <br />“{fuutarouLine(state, sum)}”
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'coreMode', value: !state.coreMode })}
            className="flex flex-1 items-center justify-between rounded-lg bg-white/[.08] px-2.5 py-1.5 text-[11.5px] font-semibold hover:bg-white/[.14]"
            title="4-Core leaves Computer Science out of the total"
          >
            <span>{state.coreMode ? '4-Core subjects' : '5-Full subjects'}</span>
            <span className={`relative h-4 w-7 rounded-full transition ${state.coreMode ? 'bg-sky-400' : 'bg-white/25'}`}>
              <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${state.coreMode ? 'left-3.5' : 'left-0.5'}`} />
            </span>
          </button>
          <button onClick={onSettings} className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-white/[.08] hover:bg-white/[.14]" aria-label="Settings" title="Settings">
            <Settings size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
