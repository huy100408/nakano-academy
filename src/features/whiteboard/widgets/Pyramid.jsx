import { useEffect, useMemo, useRef, useState } from 'react'

// Population pyramid. Value: { preset, birthRate: 5-50 (int), dependencyRatio: int }.

const COHORTS = ['0–4', '5–9', '10–14', '15–19', '20–24', '25–29', '30–34', '35–39', '40–44', '45–49', '50–54', '55–59', '60–64', '65–69', '70–74', '75–79', '80–84', '85+']

// Share of the total population per cohort (both sexes), rounded from recent UN estimates.
const PRESETS = {
  expansive: { label: 'Expansive', like: 'Niger-like', birthRate: 45, shares: [19, 16, 13, 10.5, 8.5, 7, 6, 5, 4, 3.2, 2.5, 2, 1.5, 1.1, 0.7, 0.4, 0.2, 0.1] },
  stationary: { label: 'Stationary', like: 'USA-like', birthRate: 11, shares: [5.6, 5.9, 6.3, 6.5, 6.5, 6.7, 7, 6.8, 6.5, 6, 6.2, 6.3, 6.4, 5.5, 4.5, 3, 1.9, 1.9] },
  constrictive: { label: 'Constrictive', like: 'Japan-like', birthRate: 6, shares: [3.4, 3.9, 4.3, 4.4, 4.7, 4.9, 5, 5.6, 6.1, 7.3, 7.8, 6.7, 6, 6, 7.6, 6.2, 4.9, 5.2] },
}
// Fraction of each cohort that is male (women outlive men at older ages).
const MALE = [0.512, 0.512, 0.512, 0.51, 0.508, 0.505, 0.503, 0.5, 0.5, 0.498, 0.495, 0.49, 0.485, 0.47, 0.45, 0.43, 0.39, 0.33]
// How strongly the 0–4, 5–9 and 10–14 cohorts follow the birth-rate slider (newest cohort most).
const FOLLOW = [1, 0.6, 0.3]

const W = 520, H = 300
const CX = 260, GAP = 24, MAXL = 210, AXIS = 12 // % per sex at full bar length
const TOP = 26, RH = 14
const px = (pct) => (Math.min(pct, AXIS) / AXIS) * MAXL
const sum = (a, i, j) => a.slice(i, j).reduce((s, v) => s + v, 0)
const groupOf = (i) => (i < 3 ? 'young' : i >= 13 ? 'old' : 'work')
const FILL = { young: { fill: 'var(--accent)', op: 1 }, work: { fill: 'var(--accent)', op: 0.42 }, old: { fill: '#18181d', op: 0.55 } }

const clampBR = (v) => Math.min(50, Math.max(5, Math.round(Number(v)) || 5))
const validPreset = (p) => (PRESETS[p] ? p : 'stationary')

function model(preset, birthRate) {
  const P = PRESETS[preset]
  const f = birthRate / P.birthRate
  const raw = P.shares.map((s, i) => (i < 3 ? s * (1 + (f - 1) * FOLLOW[i]) : s))
  const total = sum(raw, 0, 18)
  const pct = raw.map((v) => (v / total) * 100)
  const young = sum(raw, 0, 3), work = sum(raw, 3, 13), old = sum(raw, 13, 18)
  const dependencyRatio = Math.round(((young + old) / work) * 100)
  const base = raw[0] / (sum(raw, 5, 8) / 3)
  const shape = base >= 1.3 ? 'expansive: wide base' : base <= 0.78 ? 'constrictive: narrow base' : 'stationary: straight sides'
  return { pct, dependencyRatio, shape, young: (young / total) * 100, work: (work / total) * 100, old: (old / total) * 100 }
}

export default function Pyramid({ props = {}, onChange }) {
  const initial = validPreset(props.preset ?? 'expansive')
  const [preset, setPreset] = useState(initial)
  const [birthRate, setBirthRate] = useState(PRESETS[initial].birthRate)
  const [prev, setPrev] = useState(initial)
  if (initial !== prev) {
    setPrev(initial)
    setPreset(initial)
    setBirthRate(PRESETS[initial].birthRate)
  }
  const [hover, setHover] = useState(null)

  const m = useMemo(() => model(preset, birthRate), [preset, birthRate])
  const { dependencyRatio } = m

  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.({ preset, birthRate, dependencyRatio })
  }, [preset, birthRate, dependencyRatio])

  const pick = (p) => {
    setPreset(p)
    setBirthRate(PRESETS[p].birthRate)
  }
  const row = hover ?? 0
  const rowPct = m.pct[row]

  return (
    <div className="@container w-full text-ink">
      <div className="grid gap-3 @xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none" role="img" aria-label={`Population pyramid, ${PRESETS[preset].label}, dependency ratio ${dependencyRatio}`} onPointerLeave={() => setHover(null)}>
            <text x={CX - GAP - 4} y={14} fontSize="12" fontWeight="800" textAnchor="end" fill="#18181d">◀ Male</text>
            <text x={CX + GAP + 4} y={14} fontSize="12" fontWeight="800" fill="#18181d">Female ▶</text>
            {[0, 4, 8, 12].map((t) => (
              <g key={t} fill="#a1a1aa" fontSize="9.5" textAnchor="middle">
                <line x1={CX - GAP - px(t)} x2={CX - GAP - px(t)} y1={TOP - 4} y2={TOP + 18 * RH} stroke="#18181d" strokeOpacity="0.07" />
                <line x1={CX + GAP + px(t)} x2={CX + GAP + px(t)} y1={TOP - 4} y2={TOP + 18 * RH} stroke="#18181d" strokeOpacity="0.07" />
                <text x={CX - GAP - px(t)} y={TOP + 18 * RH + 13}>{t}%</text>
                <text x={CX + GAP + px(t)} y={TOP + 18 * RH + 13}>{t}%</text>
              </g>
            ))}
            {m.pct.map((p, i) => {
              const y = TOP + (17 - i) * RH
              const male = p * MALE[i], female = p * (1 - MALE[i])
              const g = FILL[groupOf(i)]
              const anim = { transition: 'width 0.3s ease, x 0.3s ease' }
              return (
                <g key={i} onPointerEnter={() => setHover(i)} className="cursor-default">
                  <rect x={0} y={y} width={W} height={RH} fill={hover === i ? 'var(--accent)' : 'transparent'} fillOpacity="0.08" />
                  <rect x={CX - GAP - px(male)} y={y + 1} width={px(male)} height={RH - 2} rx="2" style={{ fill: g.fill, ...anim }} fillOpacity={g.op} />
                  <rect x={CX + GAP} y={y + 1} width={px(female)} height={RH - 2} rx="2" style={{ fill: g.fill, ...anim }} fillOpacity={g.op} />
                  <text x={CX} y={y + RH - 3.5} fontSize="9" textAnchor="middle" fill="#6b6b76" pointerEvents="none">{COHORTS[i]}</text>
                </g>
              )
            })}
            <text x={CX} y={H - 2} fontSize="9.5" textAnchor="middle" fill="#a1a1aa">% of total population</text>
          </svg>
          <p className="mt-0.5 text-center text-[11.5px] text-muted" aria-live="polite">
            Ages {COHORTS[row]}: {(rowPct * MALE[row]).toFixed(1)}% male · {(rowPct * (1 - MALE[row])).toFixed(1)}% female
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pyramid shape preset">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button
                key={k}
                onClick={() => pick(k)}
                aria-pressed={preset === k}
                className={`btn-3d flex min-h-[44px] flex-col items-center justify-center rounded-xl border px-1 py-1 text-[12.5px] font-bold leading-tight ${preset === k ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line bg-white'}`}
              >
                {p.label}
                <span className="text-[10.5px] font-medium text-muted">{p.like}</span>
              </button>
            ))}
          </div>

          <label className="block">
            <span className="flex items-baseline justify-between text-[12px] font-bold text-muted">
              Crude birth rate
              <span className="font-mono text-[13px] text-ink">{birthRate} per 1,000</span>
            </span>
            <input
              type="range" min={5} max={50} step={1} value={birthRate}
              onChange={(e) => setBirthRate(clampBR(e.target.value))}
              className="w-full" style={{ accentColor: 'var(--accent)' }} aria-label="Crude birth rate"
            />
            <span className="text-[11px] text-faint">Reshapes ages 0–14 (newest births most). Shape now reads {m.shape}.</span>
          </label>

          <div className="rounded-2xl border border-line bg-accent-softer p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide text-muted">Dependency ratio</span>
              <span className="font-display text-[26px] font-bold leading-none text-accent-ink">{dependencyRatio}</span>
            </div>
            <div className="mt-1 font-mono text-[11.5px] text-muted">(0–14 + 65+) ÷ (15–64) × 100</div>
            <div className="mt-2 space-y-1 text-[12px]">
              <Share swatch="bg-accent" label="Dependents 0–14" v={m.young} />
              <Share swatch="bg-accent opacity-45" label="Working age 15–64" v={m.work} />
              <Share swatch="bg-ink opacity-55" label="Dependents 65+" v={m.old} />
            </div>
            <p className="mt-2 text-[11.5px] leading-snug text-muted">
              {dependencyRatio} dependents for every 100 people of working age.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Share({ swatch, label, v }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-sm ${swatch}`} />
      <span className="flex-1">{label}</span>
      <span className="font-mono font-bold">{v.toFixed(0)}%</span>
    </div>
  )
}
