import { SUBJECTS, bySubject, byId } from '../data/sisters.js'
import { TIERS } from '../data/curriculum.js'
import { letterGrade, useAcademy } from '../state/useAcademy'
import { Avatar, Eyebrow } from './ui.jsx'

function Radar({ series }) {
  const S = 380
  const c = S / 2
  const R = 126
  const n = SUBJECTS.length
  const pt = (k, v) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / n
    return [c + Math.cos(a) * R * (v / 100), c + Math.sin(a) * R * (v / 100)]
  }
  const poly = (vals) => vals.map((v, k) => pt(k, v).join(',')).join(' ')
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label="Five-subject mastery radar">
      {[20, 40, 60, 80, 100].map((g) => (
        <polygon key={g} points={poly(Array(n).fill(g))} fill={g === 100 ? '#faf8f4' : 'none'} stroke="rgb(24 24 29 / .08)" />
      ))}
      {SUBJECTS.map((_, k) => {
        const [x, y] = pt(k, 100)
        return <line key={k} x1={c} y1={c} x2={x} y2={y} stroke="rgb(24 24 29 / .08)" />
      })}
      {series.map((sr) => (
        <g key={sr.name}>
          <polygon points={poly(sr.values)} strokeWidth="2.2" strokeDasharray={sr.dash || ''} strokeLinejoin="round" style={{ fill: sr.color, fillOpacity: sr.fill, stroke: sr.color, transition: 'all .6s' }} />
          {!sr.dash &&
            sr.values.map((v, k) => {
              const [x, y] = pt(k, v)
              return <circle key={k} cx={x} cy={y} r="3.5" fill="#fff" strokeWidth="2" style={{ stroke: sr.color }} />
            })}
        </g>
      ))}
      {SUBJECTS.map((sub, k) => {
        const [x, y] = pt(k, 121)
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

const GRADE_TONE = { 'S+': '#7c3aed', S: '#2563eb', A: '#16a34a', B: '#65a30d', C: '#ca8a04', D: '#ea580c', F: '#dc2626' }

function quotes(avg, approval) {
  const fuu =
    avg >= 88
      ? 'I have nothing left to teach you. ...Don’t tell anyone I said that.'
      : avg >= 60
        ? 'You’re getting there. Now do it again without thinking about it.'
        : avg >= 30
          ? 'Above the red line. Barely. That’s not a compliment.'
          : 'This is the starting line, not the finish. Open your notebook.'
  const maruo =
    approval >= 80
      ? 'Mr. Uesugi, I see results. The arrangement continues. — Maruo Nakano'
      : approval >= 40
        ? 'I am watching the numbers closely. Do not disappoint me. — Maruo Nakano'
        : 'If this continues, I will be looking for a new tutor. — Maruo Nakano'
  return { fuu, maruo }
}

const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
const tierLabel = (t) => TIERS.find((x) => x.key === t)?.label || (t === 'midterm_rescue' ? 'Midterm Rescue' : t === 'review' ? 'Weak-spot review' : t)

export default function ReportView() {
  const { state, mastery, baseline } = useAcademy()
  const p = state.profile
  const values = SUBJECTS.map((s) => mastery[s.key])
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  const overall = letterGrade(avg)
  const { fuu, maruo } = quotes(avg, p.maruo_approval)
  const series = [
    { name: 'Fuutarou · 500/500', color: '#18181d', values: SUBJECTS.map(() => 100), fill: 0, dash: '6 5' },
    { name: 'Baseline (canon start)', color: '#a1a1aa', values: SUBJECTS.map((s) => baseline[s.key]), fill: 0.08, dash: '3 3' },
    { name: 'Your mastery now', color: 'var(--accent)', values, fill: 0.22 },
  ]

  return (
    <div className="flex h-full flex-col">
      <header className="drag win-controls-pad flex flex-wrap items-end justify-between gap-3 px-4 pb-4 pt-5 sm:px-8 sm:pt-7">
        <div>
          <Eyebrow>Asahiyama High · synced report</Eyebrow>
          <h1 className="mt-1 font-display text-[clamp(24px,3vw,30px)] font-extrabold leading-none tracking-tight">Student Report Card</h1>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-card ring-1 ring-line">
          <Eyebrow>Overall</Eyebrow>
          <span className="font-display text-[30px] font-extrabold leading-none" style={{ color: GRADE_TONE[overall] }}>
            {overall}
          </span>
          <span className="font-mono text-[13px] text-muted">{avg}/100</span>
        </div>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-8 lg:pb-8">
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ['Exam score', p.exam_score.toLocaleString(), 'cumulative points'],
            ['Maruo approval', `${p.maruo_approval}%`, p.maruo_approval < 40 ? 'Midterm warning!' : 'hiring rating'],
            ['Best streak', p.best_streak, `current ${p.study_streak}`],
            ['Eggs high score', p.scrambled_eggs_high_score, `best streak ${p.scrambled_eggs_best_streak}`],
          ].map(([k, v, sub]) => (
            <div key={k} className="card px-4 py-3.5">
              <Eyebrow>{k}</Eyebrow>
              <div className="mt-1 font-display text-[26px] font-extrabold leading-none">{v}</div>
              <div className={`mt-1 text-[12px] ${sub === 'Midterm warning!' ? 'font-bold text-bad' : 'text-muted'}`}>{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="card p-5 sm:p-6">
            <Radar series={series} />
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[12px] font-medium text-muted">
              {series.map((s) => (
                <span key={s.name} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-5 gap-2">
              {SUBJECTS.map((sub) => {
                const v = mastery[sub.key]
                const g = letterGrade(v)
                const t = bySubject(sub.key)
                const delta = v - baseline[sub.key]
                return (
                  <div key={sub.key} className="card flex flex-col items-center px-1 py-3 text-center">
                    <Avatar s={t} size={30} />
                    <div className="mt-1.5 text-[11px] font-bold text-muted">{sub.short}</div>
                    <div className="font-display text-[28px] font-extrabold leading-none" style={{ color: GRADE_TONE[g] }}>
                      {g}
                    </div>
                    <div className="mt-1 font-mono text-[11.5px]">{v}</div>
                    <div className={`font-mono text-[10.5px] ${delta >= 0 ? 'text-good' : 'text-bad'}`}>
                      {delta >= 0 ? '+' : ''}
                      {delta} vs base
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="card space-y-3 p-5">
              <div className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-[13px] font-bold text-white">風</span>
                <p className="text-[14px] leading-relaxed">
                  <b>Fuutarou:</b> “{fuu}”
                </p>
              </div>
              <div className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-700 font-display text-[13px] font-bold text-white">丸</span>
                <p className="text-[14px] leading-relaxed text-ink/80">“{maruo}”</p>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="border-b border-line px-5 py-3">
                <Eyebrow>Recent sessions</Eyebrow>
              </div>
              {state.sessions.length === 0 ? (
                <p className="px-5 py-4 text-[13px] text-muted">Finish a practice run and it will appear here, on every device.</p>
              ) : (
                <div className="divide-y divide-line">
                  {state.sessions.slice(0, 8).map((x) => {
                    const sis = byId(x.sister_id)
                    const pct = x.total_questions ? Math.round((x.correct_answers / x.total_questions) * 100) : 0
                    return (
                      <div key={x.id} className="flex items-center gap-3 px-5 py-2.5 text-[13px]">
                        {sis ? <Avatar s={sis} size={26} /> : <span className="h-[26px] w-[26px]" />}
                        <span className="min-w-0 flex-1 truncate">
                          <b>{tierLabel(x.difficulty_tier)}</b> <span className="text-muted">· {fmtDate(x.completed_at)}</span>
                        </span>
                        <span className="font-mono">
                          {x.correct_answers}/{x.total_questions}
                        </span>
                        <span className="hidden w-14 text-right font-mono text-muted sm:block">+{x.score_earned}</span>
                        <span className={`w-12 text-right font-mono font-bold ${x.maruo_delta >= 0 ? 'text-good' : 'text-bad'}`}>
                          {x.maruo_delta >= 0 ? '+' : ''}
                          {x.maruo_delta}%
                        </span>
                        <span className="w-9 text-right font-mono text-[12px] text-faint">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
