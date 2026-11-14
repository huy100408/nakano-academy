import { useEffect, useId, useRef, useState } from 'react'
import { RotateCcw, StepForward } from 'lucide-react'

// Diffusion simulator on an 8×6 settlement network. Value: { mode, step: 0-8 }.

const MODES = {
  relocation: {
    label: 'Relocation',
    caption: 'People carry the trait with them when they migrate. It appears in a distant place and skips the places in between.',
    example: 'e.g. migrants bringing their language, religion or food to a new country',
  },
  contagious: {
    label: 'Contagious',
    caption: 'Spreads to the nearest places first, like a ripple, whatever their size. Distance decay: farther places adopt later and less strongly.',
    example: 'e.g. a disease outbreak or a viral meme',
  },
  hierarchical: {
    label: 'Hierarchical',
    caption: 'Jumps down the urban hierarchy: metropolis, then cities, then towns, and only then the villages, skipping nearby countryside at first.',
    example: 'e.g. new fashions or technology reaching major cities first',
  },
  stimulus: {
    label: 'Stimulus',
    caption: 'The underlying idea spreads, but each place changes the trait to fit its own culture (new shapes and colours).',
    example: "e.g. Sequoyah's Cherokee syllabary, inspired by the idea of writing; McDonald's McAloo Tikki in India",
  },
}
const MAX = 8
const COLS = 8, ROWS = 6
const W = 556, H = 322
const X = (c) => 40 + c * 68
const Y = (r) => 34 + r * 52
const HEARTH = [1, 1]
const RANK = { '1,1': 3, '6,1': 2, '2,4': 2, '6,4': 2, '4,0': 1, '3,2': 1, '0,3': 1, '7,3': 1, '4,5': 1 }
const RADIUS = [6.5, 9, 12, 15]
const RANK_NAME = ['village', 'town', 'city', 'metropolis']
const NODES = []
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) NODES.push({ c, r, rank: RANK[`${c},${r}`] ?? 0 })
const dist = (a, b) => Math.hypot(a.c - b.c, a.r - b.r)
const H0 = { c: HEARTH[0], r: HEARTH[1] }
const HUBS = NODES.filter((n) => n.rank > 0)
const hubStep = (n) => 3 - n.rank // metropolis 0, cities 1, towns 2

const DEST = [
  { to: { c: 6, r: 4 }, depart: 1, arrive: 3 },
  { to: { c: 6, r: 1 }, depart: 4, arrive: 6 },
]

// When each node adopts (step) in each mode, plus which version of the trait it shows.
function schedule(mode, n) {
  const d = dist(n, H0)
  if (mode === 'contagious' || mode === 'stimulus') {
    const at = Math.ceil(d - 1e-9)
    const variant = mode === 'contagious' || at === 0 ? 'orig' : n.c <= 3 ? 'a' : 'b'
    return { at, variant }
  }
  if (mode === 'hierarchical') {
    if (n.rank > 0) return { at: hubStep(n), variant: 'orig' }
    const via = Math.min(...HUBS.map((h) => hubStep(h) + 1 + 2 * Math.ceil(dist(n, h) - 1e-9)))
    return { at: Math.min(MAX, Math.max(3, via)), variant: 'orig' }
  }
  // relocation: hearth community, then two migrant groups found distant enclaves
  const opts = [d <= 1 ? 0 : Infinity]
  for (const m of DEST) {
    const e = dist(n, m.to)
    if (e === 0) opts.push(m.arrive)
    else if (e <= 1) opts.push(m.arrive + 1)
    else if (e <= 1.5) opts.push(MAX)
  }
  return { at: Math.min(...opts), variant: 'orig' }
}
const PLAN = Object.fromEntries(Object.keys(MODES).map((m) => [m, NODES.map((n) => schedule(m, n))]))

// Curved migration route: quadratic Bézier bowed to one side.
function route(to) {
  const x0 = X(H0.c), y0 = Y(H0.r), x1 = X(to.c), y1 = Y(to.r)
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, len = Math.hypot(x1 - x0, y1 - y0)
  const qx = mx + ((y1 - y0) / len) * 46, qy = my - ((x1 - x0) / len) * 46
  const at = (t) => [(1 - t) ** 2 * x0 + 2 * (1 - t) * t * qx + t * t * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * qy + t * t * y1]
  return { d: `M${x0},${y0} Q${qx},${qy} ${x1},${y1}`, at }
}
const ROUTES = DEST.map((m) => route(m.to))
const nearestUpper = (town) => [H0, ...HUBS.filter((h) => h.rank === 2)].sort((a, b) => dist(a, town) - dist(b, town))[0]
const arc = (a, b) => {
  const x0 = X(a.c), y0 = Y(a.r), x1 = X(b.c), y1 = Y(b.r)
  return `M${x0},${y0} Q${(x0 + x1) / 2},${Math.min(y0, y1) - 30} ${x1},${y1}`
}

const VARIANT = { orig: 'var(--accent)', a: '#f59e0b', b: '#0d9488' }

export default function Diffusion({ props = {}, onChange }) {
  const initial = MODES[props.mode] ? props.mode : 'contagious'
  const [mode, setMode] = useState(initial)
  const [step, setStep] = useState(0)
  const [prev, setPrev] = useState(initial)
  if (initial !== prev) {
    setPrev(initial)
    setMode(initial)
    setStep(0)
  }
  const uid = useId().replace(/:/g, '')

  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.({ mode, step })
  }, [mode, step])

  const plan = PLAN[mode]
  const adopted = plan.filter((p) => p.at <= step).length
  const decay = mode === 'contagious' || mode === 'stimulus'

  return (
    <div className="@container w-full space-y-2.5 text-ink">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Diffusion type">
        {Object.entries(MODES).map(([k, m]) => (
          <button key={k} onClick={() => { setMode(k); setStep(0) }} aria-pressed={mode === k}
            className={`btn-3d min-h-[36px] rounded-xl border px-3 text-[12.5px] font-bold ${mode === k ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line bg-white'}`}>
            {m.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none rounded-2xl border border-line bg-paper" role="img"
        aria-label={`${MODES[mode].label} diffusion, step ${step} of ${MAX}: ${adopted} of ${NODES.length} places have adopted`}>
        <defs>
          <clipPath id={`${uid}-clip`}><rect x="0" y="0" width={W} height={H} rx="16" /></clipPath>
          <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-ink)" />
          </marker>
        </defs>
        {NODES.map((n, i) => (
          <g key={`e${i}`} stroke="#18181d" strokeOpacity="0.08" strokeWidth="1.5">
            {n.c < COLS - 1 && <line x1={X(n.c)} y1={Y(n.r)} x2={X(n.c + 1)} y2={Y(n.r)} />}
            {n.r < ROWS - 1 && <line x1={X(n.c)} y1={Y(n.r)} x2={X(n.c)} y2={Y(n.r + 1)} />}
          </g>
        ))}

        {decay && step > 0 && (
          <ellipse clipPath={`url(#${uid}-clip)`} cx={X(H0.c)} cy={Y(H0.r)} rx={step * 68} ry={step * 52} fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeOpacity="0.5" strokeDasharray="5 5" />
        )}
        {mode === 'hierarchical' && (
          <g fill="none" stroke="var(--accent-ink)" strokeWidth="1.8" strokeOpacity="0.7" markerEnd={`url(#${uid}-arrow)`}>
            {step >= 1 && HUBS.filter((h) => h.rank === 2).map((h) => <path key={`${h.c}${h.r}`} d={arc(H0, h)} />)}
            {step >= 2 && HUBS.filter((h) => h.rank === 1).map((h) => <path key={`${h.c}${h.r}`} d={arc(nearestUpper(h), h)} strokeDasharray="4 3" />)}
          </g>
        )}
        {mode === 'relocation' && DEST.map((m, k) => step >= m.depart && (
          <g key={k}>
            <path d={ROUTES[k].d} fill="none" stroke="var(--accent-ink)" strokeWidth="2" strokeDasharray="6 5" strokeOpacity="0.6" markerEnd={`url(#${uid}-arrow)`} />
            {step < m.arrive && (() => {
              const [gx, gy] = ROUTES[k].at((step - m.depart + 1) / (m.arrive - m.depart + 1))
              return (
                <g>
                  <circle cx={gx} cy={gy} r="15" fill="#fff" stroke="var(--accent-ink)" strokeWidth="1.5" />
                  {[[-5, -3], [5, -3], [0, 5]].map(([dx, dy]) => <circle key={dx + ',' + dy} cx={gx + dx} cy={gy + dy} r="3.6" style={{ fill: 'var(--accent)' }} />)}
                  <text x={gx} y={gy - 19} fontSize="10" fontWeight="800" textAnchor="middle" fill="var(--accent-ink)">migrants</text>
                </g>
              )
            })()}
          </g>
        ))}

        {NODES.map((n, i) => {
          const p = plan[i]
          const on = p.at <= step
          const r = RADIUS[n.rank]
          const x = X(n.c), y = Y(n.r)
          const fresh = on && p.at === step && step > 0
          const op = on ? (decay ? Math.max(0.35, 1 - 0.08 * p.at) : 1) : 1
          const fill = on ? VARIANT[p.variant] : '#fff'
          const stroke = on ? 'none' : '#c4c4cc'
          return (
            <g key={i}>
              {fresh && <circle cx={x} cy={y} r={r + 5} fill="none" stroke="var(--accent-ink)" strokeWidth="1.5" strokeDasharray="3 2" />}
              {on && p.variant === 'a' ? (
                <rect x={x - r * 0.8} y={y - r * 0.8} width={r * 1.6} height={r * 1.6} transform={`rotate(45 ${x} ${y})`} style={{ fill }} fillOpacity={op} />
              ) : on && p.variant === 'b' ? (
                <rect x={x - r * 0.85} y={y - r * 0.85} width={r * 1.7} height={r * 1.7} rx="2" style={{ fill }} fillOpacity={op} />
              ) : (
                <circle cx={x} cy={y} r={r} style={{ fill }} fillOpacity={op} stroke={stroke} strokeWidth="1.5" />
              )}
              {n.c === H0.c && n.r === H0.r && <text x={x} y={y + r + 11} fontSize="9.5" fontWeight="800" textAnchor="middle" fill="var(--accent-ink)">hearth</text>}
            </g>
          )
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setStep((s) => Math.min(MAX, s + 1))} disabled={step >= MAX}
          className="btn-3d btn-3d-accent flex min-h-[40px] items-center gap-1.5 rounded-xl bg-accent px-4 text-[13px] font-bold text-on-accent disabled:opacity-50">
          <StepForward size={16} /> Play step
        </button>
        <button onClick={() => setStep(0)} className="btn-3d flex min-h-[40px] items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-[13px] font-bold">
          <RotateCcw size={15} /> Reset
        </button>
        <div className="ml-auto flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: MAX + 1 }, (_, k) => (
            <span key={k} className={`h-2 w-2 rounded-full ${k <= step ? 'bg-accent' : 'bg-line'}`} />
          ))}
        </div>
        <span className="font-mono text-[12.5px] font-bold" aria-live="polite">Step {step}/{MAX} · {adopted}/{NODES.length} places</span>
      </div>

      <div className="rounded-2xl border border-line bg-accent-softer p-3 text-[12.5px] leading-snug">
        <span className="font-display font-bold text-accent-ink">{MODES[mode].label} diffusion. </span>
        {MODES[mode].caption}
        <div className="mt-1 text-muted">{MODES[mode].example}</div>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-faint">
          <span>Bigger dot = bigger place ({RANK_NAME.slice().reverse().join(' → ')})</span>
          {mode === 'stimulus' && <span><span className="text-[#f59e0b]">◆</span> <span className="text-[#0d9488]">■</span> locally adapted versions</span>}
          {decay && <span>Fainter = adopted later (distance decay)</span>}
        </div>
      </div>
    </div>
  )
}
