import { useEffect, useRef, useState } from 'react'

// Demographic Transition Model. Value: { stage: 1-5 }.

const STAGES = [
  {
    name: 'High stationary',
    births: 'High, about 35–45 per 1,000',
    deaths: 'High and erratic',
    growth: 'Little or none: births ≈ deaths',
    why: ['Little medicine or sanitation: famine and epidemics keep deaths high', 'Farm families need many children, and many die young'],
    examples: 'No country today; only a few isolated groups',
  },
  {
    name: 'Early expanding',
    births: 'Stay high',
    deaths: 'Fall quickly',
    growth: 'Rapid; natural increase peaks late in this stage',
    why: ['Medical revolution: vaccines, antibiotics', 'Sanitation, clean water and a steadier food supply'],
    examples: 'Niger, Chad, Afghanistan',
  },
  {
    name: 'Late expanding',
    births: 'Fall quickly',
    deaths: 'Keep falling, more slowly',
    growth: 'Still high, but slowing',
    why: ['Urbanization: in cities children cost money instead of working the farm', 'Women in school and the workforce; access to contraception'],
    examples: 'India, Egypt, Kenya',
  },
  {
    name: 'Low stationary',
    births: 'Low, about 10–15',
    deaths: 'Low, about 7–10',
    growth: 'Slow, close to zero',
    why: ['Family planning is the norm; raising children is expensive', 'Long life expectancy keeps deaths low'],
    examples: 'United States, Brazil, Australia',
  },
  {
    name: 'Declining',
    births: 'Very low, below replacement',
    deaths: 'Edge up as the population ages',
    growth: 'Negative: natural decrease',
    why: ['Below-replacement fertility: under 2.1 children per woman', 'An aging population: more elderly, so deaths rise'],
    examples: 'Japan, Italy, South Korea',
  },
]

// Control points every half stage, x = 0..5 (rates per 1,000; population relative 0..1).
const CBR = [40, 41, 40, 40, 39, 27, 15, 13, 12, 10, 8]
const CDR = [38, 35, 39, 30, 17, 12, 10, 9.5, 10, 11, 12]
const POP = [0.1, 0.105, 0.11, 0.14, 0.24, 0.42, 0.62, 0.76, 0.84, 0.87, 0.86]

const W = 600, H = 258
const L = 46, R = 554, T = 18, B = 222
const BW = (R - L) / 5

// Uniform Catmull-Rom through the control points.
function curve(p, x) {
  const u = Math.min(Math.max(x, 0), 5) * 2
  const i = Math.min(Math.floor(u), p.length - 2)
  const t = u - i
  const p0 = p[Math.max(i - 1, 0)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(i + 2, p.length - 1)]
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t)
}
const sx = (x) => L + x * BW
const sy = (rate) => B - (rate / 50) * (B - T)
const sp = (p) => B - p * (B - T)
const DATA = Array.from({ length: 161 }, (_, k) => {
  const x = (k / 160) * 5
  return { x, cbr: curve(CBR, x), cdr: curve(CDR, x), pop: curve(POP, x) }
})
const pts = (arr) => arr.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')
const linePath = (key, scale) => 'M' + pts(DATA.map((d) => [sx(d.x), scale(d[key])]))
// Area between `up` and min(up, down): non-zero only where up > down.
const gapPath = (up, down) =>
  'M' + pts([...DATA.map((d) => [sx(d.x), sy(d[up])]), ...DATA.map((d) => [sx(d.x), sy(Math.min(d[up], d[down]))]).reverse()]) + ' Z'
const CBR_D = linePath('cbr', sy)
const CDR_D = linePath('cdr', sy)
const POP_D = linePath('pop', sp)
const INC_D = gapPath('cbr', 'cdr')
const DEC_D = gapPath('cdr', 'cbr')

const clampStage = (s) => Math.min(5, Math.max(1, Math.round(Number(s)) || 1))

export default function Dtm({ props = {}, onChange }) {
  const initial = clampStage(props.stage ?? 1)
  const [stage, setStage] = useState(initial)
  const [prev, setPrev] = useState(initial)
  if (initial !== prev) {
    setPrev(initial)
    setStage(initial)
  }

  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.({ stage })
  }, [stage])

  const info = STAGES[stage - 1]

  return (
    <div className="@container w-full text-ink">
      <div className="grid gap-3 @2xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none" role="group" aria-label="Demographic transition model: click a stage">
            {[0, 10, 20, 30, 40, 50].map((r) => (
              <g key={r}>
                <line x1={L} x2={R} y1={sy(r)} y2={sy(r)} stroke="#18181d" strokeOpacity={r ? 0.06 : 0.25} />
                <text x={L - 6} y={sy(r) + 3.5} fontSize="10" textAnchor="end" fill="#6b6b76">{r}</text>
              </g>
            ))}
            <text transform={`translate(13 ${(T + B) / 2}) rotate(-90)`} fontSize="10.5" textAnchor="middle" fill="#6b6b76">Births / deaths per 1,000</text>
            <text transform={`translate(${W - 18} ${(T + B) / 2}) rotate(90)`} fontSize="10.5" textAnchor="middle" fill="#8b8b96">Total population (relative)</text>

            {STAGES.map((s, i) => {
              const on = stage === i + 1
              return (
                <g key={i}>
                  <rect
                    x={sx(i)} y={T} width={BW} height={B - T + 34}
                    fill="var(--accent)" fillOpacity={on ? 0.13 : 0}
                    stroke={on ? 'var(--accent)' : 'none'} strokeOpacity={0.5}
                    className="cursor-pointer outline-none"
                    role="button" tabIndex={0} aria-pressed={on} aria-label={`Stage ${i + 1}: ${s.name}`}
                    onClick={() => setStage(i + 1)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage(i + 1) }
                    }}
                  />
                  {i > 0 && <line x1={sx(i)} x2={sx(i)} y1={T} y2={B} stroke="#18181d" strokeOpacity="0.12" strokeDasharray="3 4" pointerEvents="none" />}
                  <text x={sx(i + 0.5)} y={B + 20} fontSize="11.5" textAnchor="middle" fontWeight={on ? 800 : 600} fill={on ? 'var(--accent-ink)' : '#6b6b76'} pointerEvents="none">
                    Stage {i + 1}
                  </text>
                </g>
              )
            })}

            <g pointerEvents="none">
              <path d={INC_D} fill="var(--accent)" fillOpacity="0.2" />
              <path d={DEC_D} fill="#dc2626" fillOpacity="0.22" />
              <path d={POP_D} fill="none" stroke="#8b8b96" strokeWidth="2.5" strokeDasharray="1 5" strokeLinecap="round" />
              <path d={CDR_D} fill="none" stroke="#18181d" strokeWidth="2.4" strokeDasharray="7 5" />
              <path d={CBR_D} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
              <text x={sx(2)} y={sy(31)} fontSize="10.5" fontWeight="700" textAnchor="middle" fill="var(--accent-ink)">Natural</text>
              <text x={sx(2)} y={sy(25.5)} fontSize="10.5" fontWeight="700" textAnchor="middle" fill="var(--accent-ink)">increase</text>
              <text x={sx(4.72)} y={sy(21)} fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#b91c1c">Natural</text>
              <text x={sx(4.72)} y={sy(17)} fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#b91c1c">decrease</text>
              <text x={sx(0.08)} y={sy(43.5)} fontSize="10" fontWeight="700" fill="var(--accent-ink)">CBR</text>
              <text x={sx(3.3)} y={sy(4.5)} fontSize="10" fontWeight="700" fill="#18181d">CDR</text>
            </g>
          </svg>

          <label className="mt-1 flex items-center gap-3">
            <span className="text-[12px] font-bold text-muted">Stage</span>
            <input
              type="range" min={1} max={5} step={1} value={stage}
              onChange={(e) => setStage(clampStage(e.target.value))}
              className="w-full" style={{ accentColor: 'var(--accent)' }} aria-label="DTM stage"
            />
            <span className="w-4 font-mono text-[14px] font-bold text-accent-ink">{stage}</span>
          </label>

          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-muted">
            <Key><svg width="22" height="6"><line x1="1" x2="21" y1="3" y2="3" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" /></svg>Birth rate (CBR)</Key>
            <Key><svg width="22" height="6"><line x1="0" x2="22" y1="3" y2="3" stroke="#18181d" strokeWidth="2.4" strokeDasharray="6 4" /></svg>Death rate (CDR)</Key>
            <Key><span className="h-2.5 w-4 rounded-sm bg-accent-soft" />Natural increase</Key>
            <Key><svg width="22" height="6"><line x1="2" x2="21" y1="3" y2="3" stroke="#8b8b96" strokeWidth="2.5" strokeDasharray="1 5" strokeLinecap="round" /></svg>Total population</Key>
          </div>
        </div>

        <aside className="rounded-2xl border border-line bg-accent-softer p-3.5" aria-live="polite">
          <div className="text-[11px] font-bold uppercase tracking-wide text-muted">Stage {stage} of 5</div>
          <div className="font-display text-[17px] font-bold leading-tight text-accent-ink">{info.name}</div>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12.5px] leading-snug">
            <dt className="font-bold text-muted">Births</dt>
            <dd>{info.births}</dd>
            <dt className="font-bold text-muted">Deaths</dt>
            <dd>{info.deaths}</dd>
            <dt className="font-bold text-muted">Growth</dt>
            <dd>{info.growth}</dd>
          </dl>
          <div className="mt-2.5 text-[11px] font-bold uppercase tracking-wide text-muted">Why</div>
          <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-[12.5px] leading-snug">
            {info.why.map((w) => <li key={w}>{w}</li>)}
          </ul>
          <div className="mt-2.5 rounded-xl bg-paper px-2.5 py-1.5 text-[12.5px]">
            <span className="font-bold">Examples: </span>
            {info.examples}
          </div>
          {stage === 5 && <p className="mt-1.5 text-[11px] text-faint">Stage 5 was added to the original four-stage model later.</p>}
        </aside>
      </div>
    </div>
  )
}

function Key({ children }) {
  return <span className="inline-flex items-center gap-1.5">{children}</span>
}
