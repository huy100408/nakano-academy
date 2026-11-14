import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, Scale } from 'lucide-react'

// Z = 1..20
const ELEMENTS = [
  ['H', 'Hydrogen'],
  ['He', 'Helium'],
  ['Li', 'Lithium'],
  ['Be', 'Beryllium'],
  ['B', 'Boron'],
  ['C', 'Carbon'],
  ['N', 'Nitrogen'],
  ['O', 'Oxygen'],
  ['F', 'Fluorine'],
  ['Ne', 'Neon'],
  ['Na', 'Sodium'],
  ['Mg', 'Magnesium'],
  ['Al', 'Aluminum'],
  ['Si', 'Silicon'],
  ['P', 'Phosphorus'],
  ['S', 'Sulfur'],
  ['Cl', 'Chlorine'],
  ['Ar', 'Argon'],
  ['K', 'Potassium'],
  ['Ca', 'Calcium'],
]
// Simplified Bohr model for Z ≤ 20: shells hold 2, 8, 8, then 2.
const CAPS = [2, 8, 8, 2]
const RADII = [50, 78, 106, 134]
// Slot fill order so a partly filled shell looks balanced (top, bottom, right, left, then diagonals).
const FILL_ORDER = { 2: [0, 1], 8: [0, 4, 2, 6, 1, 5, 3, 7] }

const clampInt = (v, lo, hi, d) => {
  const n = Math.round(Number(v))
  return v === null || v === undefined || v === '' || !Number.isFinite(n) ? d : Math.min(hi, Math.max(lo, n))
}
const shellsOf = (e) => {
  const out = []
  let left = e
  for (const c of CAPS) {
    if (left <= 0) break
    out.push(Math.min(c, left))
    left -= c
  }
  return out
}
const chargeText = (c) => (c === 0 ? '0' : c > 0 ? `${c}+` : `${-c}−`)
const ionSup = (c) => (c === 0 ? '' : `${Math.abs(c) === 1 ? '' : Math.abs(c)}${c > 0 ? '+' : '−'}`)

/** Bohr atom builder. Value: { protons, electrons, element, charge, shells: '2,8,1' } ('' when there are no electrons). */
export default function Bohr({ props = {}, onChange }) {
  const start = clampInt(props.protons, 1, 20, 1)
  const [protons, setProtons] = useState(start)
  const [electrons, setElectrons] = useState(start)
  const [prevStart, setPrevStart] = useState(start)
  if (start !== prevStart) {
    setPrevStart(start)
    setProtons(start)
    setElectrons(start)
  }

  const [symbol, name] = ELEMENTS[protons - 1]
  const charge = protons - electrons
  const shells = shellsOf(electrons)

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const shellKey = shells.join(',')
  useEffect(() => {
    onChangeRef.current?.({ protons, electrons, element: symbol, charge, shells: shellKey })
  }, [protons, electrons, symbol, charge, shellKey])

  const [reduce] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  const outer = shells.length - 1

  return (
    <div className="@container w-full min-w-0">
      <div className="flex flex-col gap-3 @lg:flex-row @lg:items-center">
        <svg
          viewBox="0 0 300 300"
          className="mx-auto block h-auto max-h-[200px] w-full select-none @lg:max-h-[300px] @lg:w-[55%] @lg:shrink-0"
          role="img"
          aria-label={`Bohr model: ${protons} protons, ${electrons} electrons, shells ${shellKey || 'empty'}`}
        >
          {shells.map((n, si) => {
            const r = RADII[si]
            const cap = CAPS[si]
            const slots = Array.from({ length: cap }, (_, i) => {
              const ang = ((-90 + (i * 360) / cap + si * 14) * Math.PI) / 180
              return [150 + r * Math.cos(ang), 150 + r * Math.sin(ang)]
            })
            const filled = new Set(FILL_ORDER[cap].slice(0, n))
            const valence = si === outer
            return (
              <g key={si}>
                <circle cx={150} cy={150} r={r} fill="none" className={valence ? 'stroke-accent/45' : 'stroke-ink/15'} strokeWidth={1.5} />
                <g>
                  {!reduce && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 150 150"
                      to={`${si % 2 ? -360 : 360} 150 150`}
                      dur={`${36 + si * 14}s`}
                      repeatCount="indefinite"
                    />
                  )}
                  {slots.map(([x, y], i) =>
                    filled.has(i) ? (
                      <circle key={i} cx={x} cy={y} r={7.5} className={valence ? 'fill-accent' : 'fill-ink/75'} stroke="#fff" strokeWidth={2} />
                    ) : (
                      <circle key={i} cx={x} cy={y} r={6} fill="#fff" className="stroke-ink/25" strokeWidth={1.2} strokeDasharray="2 2" />
                    ),
                  )}
                </g>
              </g>
            )
          })}
          <circle cx={150} cy={150} r={30} className="fill-accent" />
          <circle cx={150} cy={150} r={30} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={4} />
          <text x={150} y={147} textAnchor="middle" fontSize={15} fontWeight={800} style={{ fill: 'var(--on-accent)' }}>
            {protons}p⁺
          </text>
          <text x={150} y={162} textAnchor="middle" fontSize={8.5} fontWeight={700} style={{ fill: 'var(--on-accent)', opacity: 0.85 }}>
            nucleus
          </text>
        </svg>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="grid h-[68px] w-[64px] shrink-0 grid-rows-[auto_1fr_auto] rounded-xl border-2 border-accent bg-accent-softer px-1.5 py-1 text-center">
              <span className="text-left font-mono text-[10px] font-bold leading-none text-accent-ink">{protons}</span>
              <span className="font-display text-[24px] font-extrabold leading-none text-ink">{symbol}</span>
              <span className="truncate text-[9px] font-semibold leading-none text-muted">{name}</span>
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-display text-[17px] font-extrabold text-ink" aria-live="polite">
                  {symbol}
                  {charge !== 0 && <sup className="ml-px text-[11px]">{ionSup(charge)}</sup>}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11.5px] font-bold ${
                    charge === 0 ? 'bg-good/10 text-good' : 'bg-accent-soft text-accent-ink'
                  }`}
                >
                  {charge === 0 ? 'Neutral atom' : `Ion (${charge > 0 ? 'cation' : 'anion'})`}
                </span>
              </div>
              <div className="text-[12.5px] text-muted">
                Charge <b className="font-mono text-ink">{chargeText(charge)}</b> · Shells{' '}
                <b className="font-mono text-ink">{shellKey ? shells.join(', ') : 'none'}</b>
              </div>
              {charge !== 0 && (
                <button
                  type="button"
                  onClick={() => setElectrons(protons)}
                  className="btn-3d inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-[12px] font-bold text-ink"
                >
                  <Scale size={13} /> Make neutral
                </button>
              )}
            </div>
          </div>
          <Counter label="Protons" value={protons} min={1} max={20} onChange={setProtons} />
          <Counter label="Electrons" value={electrons} min={0} max={20} onChange={setElectrons} />
        </div>
      </div>
    </div>
  )
}

function Counter({ label, value, min, max, onChange }) {
  const set = (v) => onChange(Math.min(max, Math.max(min, Math.round(v))))
  const btn =
    'btn-3d grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink disabled:cursor-not-allowed disabled:opacity-40'
  const unit = label.toLowerCase().slice(0, -1)
  return (
    <div>
      <div className="flex items-baseline justify-between text-[12px] font-semibold text-muted">
        <span>{label}</span>
        <span className="font-mono text-[14px] font-bold text-ink">{value}</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <button type="button" aria-label={`Remove a ${unit}`} disabled={value <= min} onClick={() => set(value - 1)} className={btn}>
          <Minus size={16} strokeWidth={2.6} />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          aria-label={label}
          onChange={(e) => set(Number(e.target.value))}
          className="h-8 min-w-0 flex-1 cursor-pointer"
          style={{ accentColor: 'var(--accent)' }}
        />
        <button type="button" aria-label={`Add a ${unit}`} disabled={value >= max} onClick={() => set(value + 1)} className={btn}>
          <Plus size={16} strokeWidth={2.6} />
        </button>
      </div>
    </div>
  )
}
