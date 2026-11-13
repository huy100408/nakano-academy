import { Award, Lock } from 'lucide-react'
import { FESTIVAL_ROOMS, SISTERS, SUBJECTS, bySubject, byId } from '../data/sisters.js'
import { summary } from '../lib/store.js'
import { Avatar, Eyebrow } from './ui.jsx'

function Radar({ series }) {
  const S = 380
  const c = S / 2
  const R = 128
  const n = SUBJECTS.length
  const pt = (k, v) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / n
    return [c + Math.cos(a) * R * (v / 100), c + Math.sin(a) * R * (v / 100)]
  }
  const poly = (vals) => vals.map((v, k) => pt(k, v).join(',')).join(' ')
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label="Score radar chart">
      {[20, 40, 60, 80, 100].map((g) => (
        <polygon key={g} points={poly(Array(n).fill(g))} fill={g === 100 ? '#faf8f4' : 'none'} stroke="rgb(24 24 29 / .08)" />
      ))}
      {SUBJECTS.map((_, k) => {
        const [x, y] = pt(k, 100)
        return <line key={k} x1={c} y1={c} x2={x} y2={y} stroke="rgb(24 24 29 / .08)" />
      })}
      <polygon points={poly(Array(n).fill(30))} fill="none" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
      {series.map((sr) => (
        <g key={sr.name}>
          <polygon points={poly(sr.values)} fill={sr.color} fillOpacity={sr.fill} stroke={sr.color} strokeWidth="2" strokeDasharray={sr.dash || ''} strokeLinejoin="round" style={{ transition: 'all .6s' }} />
          {!sr.dash && sr.values.map((v, k) => {
            const [x, y] = pt(k, v)
            return <circle key={k} cx={x} cy={y} r="3.5" fill="#fff" stroke={sr.color} strokeWidth="2" />
          })}
        </g>
      ))}
      {SUBJECTS.map((sub, k) => {
        const [x, y] = pt(k, 120)
        const sis = bySubject(sub.key)
        return (
          <g key={sub.key}>
            <text x={x} y={y - 6} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#18181d">
              {sub.short}
            </text>
            <text x={x} y={y + 9} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={sis.ink}>
              {sis.first}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function ReportView({ state, dispatch }) {
  const sum = summary(state)
  const canon = SUBJECTS.map((sub) => bySubject(sub.key).base)
  const canonTotal = SUBJECTS.reduce((n, sub) => n + (sum.subs.includes(sub.key) ? bySubject(sub.key).base : 0), 0)
  const series = [
    { name: 'Fuutarou · 500/500', color: '#18181d', values: SUBJECTS.map(() => 100), fill: 0, dash: '6 5' },
    { name: 'Sisters’ canon scores', color: '#a855f7', values: canon, fill: 0.1 },
    { name: 'You', color: '#ef4444', values: SUBJECTS.map((s) => state.scores[s.key]), fill: 0.22 },
  ]
  const fav = [...SISTERS].sort((a, b) => state.affection[b.id] - state.affection[a.id])[0]
  const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0
  const festival = state.festival && byId(state.festival)

  return (
    <div className="flex h-full flex-col">
      <header className="drag win-controls-pad flex items-end justify-between px-4 pb-5 pt-6 sm:px-8 sm:pt-7">
        <div>
          <Eyebrow>Asahiyama High · Mock exam · {state.coreMode ? '4-Core (CS excluded)' : '5-Full'}</Eyebrow>
          <h1 className="mt-1 font-display text-[30px] font-extrabold leading-none tracking-tight">Student Report Card</h1>
        </div>
        <button
          onClick={() => {
            if (confirm('Reset all scores, streaks and affection? This cannot be undone.')) dispatch({ type: 'reset' })
          }}
          className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-muted hover:bg-ink/[.05] hover:text-bad"
        >
          Reset progress
        </button>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-8">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ['Mock exam', `${sum.total}`, `/ ${sum.max}`],
            ['Accuracy', `${accuracy}%`, `${state.correct} of ${state.answered}`],
            ['Best streak', `${state.best}`, state.shield ? 'shield ready' : 'answers in a row'],
            ['Closest bond', fav.first, `♥ ${state.affection[fav.id]}`],
          ].map(([k, v, sub]) => (
            <div key={k} className="card px-5 py-4">
              <Eyebrow>{k}</Eyebrow>
              <div className="mt-1 font-display text-[28px] font-extrabold leading-none">{v}</div>
              <div className="mt-1 text-[12px] text-muted">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="card p-6">
            <Radar series={series} />
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[12px] font-medium text-muted">
              {series.map((s) => (
                <span key={s.name} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <span className="w-3 border-t-2 border-dashed border-amber-500" />
                Pass line (30)
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card overflow-hidden">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="border-b border-line text-left text-[10.5px] font-bold uppercase tracking-[.12em] text-faint">
                    <th className="px-5 py-3">Subject</th>
                    <th className="py-3">Tutor</th>
                    <th className="py-3 text-right">Canon</th>
                    <th className="px-5 py-3 text-right">You</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBJECTS.map((sub) => {
                    const t = bySubject(sub.key)
                    const off = !sum.subs.includes(sub.key)
                    const v = state.scores[sub.key]
                    return (
                      <tr key={sub.key} className={`border-b border-line last:border-0 ${off ? 'opacity-40' : ''}`}>
                        <td className="px-5 py-2.5 font-semibold">
                          {sub.label}
                          {off && <span className="ml-1.5 text-[11px] font-normal text-muted">(not counted)</span>}
                        </td>
                        <td className="py-2.5">
                          <span className="flex items-center gap-2">
                            <Avatar s={t} size={22} />
                            {t.first}
                          </span>
                        </td>
                        <td className="py-2.5 text-right font-mono text-muted">{t.base}</td>
                        <td className={`px-5 py-2.5 text-right font-mono font-bold ${v >= 30 ? 'text-good' : 'text-bad'}`}>{v}</td>
                      </tr>
                    )
                  })}
                  <tr className="bg-ink/[.025] font-bold">
                    <td className="px-5 py-3">Total</td>
                    <td />
                    <td className="py-3 text-right font-mono text-muted">{canonTotal}</td>
                    <td className="px-5 py-3 text-right font-mono">
                      {sum.total}/{sum.max}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`card relative overflow-hidden p-6 ${sum.approved ? '' : 'bg-[#faf8f4]'}`}>
              {sum.approved ? (
                festival ? (
                  <div className="anim-pop relative rounded-xl border-2 border-double p-6 text-center" style={{ borderColor: festival.color }}>
                    <Eyebrow>Certificate of Achievement</Eyebrow>
                    <div className="mt-1 font-display text-[22px] font-extrabold">School Festival Room Choice</div>
                    <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
                      Having passed every subject with Mr. Maruo Nakano’s approval, this student may spend the festival at
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <Avatar s={festival} size={40} ring />
                      <div className="text-left">
                        <div className="font-display text-[19px] font-extrabold" style={{ color: festival.ink }}>
                          {FESTIVAL_ROOMS[festival.id]}
                        </div>
                        <div className="text-[12px] text-muted">hosted by {festival.name}</div>
                      </div>
                    </div>
                    <div className="mt-5 font-display text-[13px] italic text-muted">— Fuutarou Uesugi, Head Tutor</div>
                    <button onClick={() => dispatch({ type: 'festival', value: null })} className="mt-2 text-[11.5px] font-semibold text-faint underline hover:text-ink">
                      Choose again
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 font-display text-[16px] font-extrabold">
                      <Award size={18} className="text-amber-500" /> Certificate unlocked. Pick your festival room:
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {SISTERS.map((s) => (
                        <button key={s.id} onClick={() => dispatch({ type: 'festival', value: s.id })} className="flex items-center gap-3 rounded-xl border border-line p-3 text-left transition hover:-translate-y-0.5 hover:shadow-card">
                          <Avatar s={s} size={34} />
                          <span className="leading-tight">
                            <span className="block text-[13px] font-bold" style={{ color: s.ink }}>
                              {s.first}
                            </span>
                            <span className="text-[12px] text-muted">{FESTIVAL_ROOMS[s.id]}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/[.06] text-muted">
                    <Lock size={18} />
                  </span>
                  <div>
                    <div className="font-display text-[16px] font-extrabold">School Festival Room Choice</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      Unlocks when every {state.coreMode ? 'core ' : ''}subject reaches 30+, Mr. Maruo Nakano’s pass threshold. {sum.subs.length - sum.passing} to go.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
