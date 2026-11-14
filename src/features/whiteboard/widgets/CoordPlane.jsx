import { useEffect, useId, useRef, useState } from 'react'

const MODES = ['linear', 'quadratic', 'trig']
const MODE_LABELS = { linear: 'Linear', quadratic: 'Quadratic', trig: 'Trig' }

// Plot geometry (viewBox units): −10..10 on both axes.
const S = 300
const PAD = 16
const U = (S - 2 * PAD) / 20
const X = (x) => PAD + (x + 10) * U
const Y = (y) => PAD + (10 - y) * U
const TICKS = Array.from({ length: 21 }, (_, i) => i - 10)
// a for the quadratic: −5..5 in steps of 0.5, skipping 0 (slider works on the index).
const A_VALS = Array.from({ length: 20 }, (_, i) => (i < 10 ? -5 + i * 0.5 : 0.5 + (i - 10) * 0.5))

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const snap = (v, step) => Math.round(v / step) * step || 0 // `|| 0` turns −0 into 0
const num = (v, d) => (v === null || v === undefined || v === '' || !Number.isFinite(Number(v)) ? d : Number(v))
const minus = (n) => (n < 0 ? `−${Math.abs(n)}` : `${n}`)
const plusTerm = (n) => (n === 0 ? '' : n > 0 ? ` + ${n}` : ` − ${Math.abs(n)}`)
const coefOf = (c, v) => (c === 1 ? v : c === -1 ? `−${v}` : `${minus(c)}${v}`)
const halo = { paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round' }

function clean(mode, p) {
  if (mode === 'linear') {
    return { m: clamp(snap(num(p.m, 1), 0.5), -10, 10), b: clamp(snap(num(p.b, 0), 0.5), -10, 10) }
  }
  if (mode === 'quadratic') {
    let a = clamp(snap(num(p.a, 1), 0.5), -5, 5)
    if (a === 0) a = 0.5
    return { a, h: clamp(Math.round(num(p.h, 0)), -10, 10) || 0, k: clamp(Math.round(num(p.k, 0)), -10, 10) || 0 }
  }
  return {
    A: clamp(snap(num(p.A, 1), 0.5), 0.5, 5),
    B: clamp(snap(num(p.B, 1), 0.5), 0.5, 4),
    C: clamp(Math.round(num(p.C, 0)), -5, 5) || 0,
  }
}

function init(props) {
  const ini = props.initial && typeof props.initial === 'object' ? props.initial : {}
  const mode = MODES.includes(props.mode) ? props.mode : MODES.includes(ini.mode) ? ini.mode : 'linear'
  return { mode, linear: clean('linear', ini), quadratic: clean('quadratic', ini), trig: clean('trig', ini) }
}

function fOf(mode, p) {
  if (mode === 'linear') return (x) => p.m * x + p.b
  if (mode === 'quadratic') return (x) => p.a * (x - p.h) ** 2 + p.k
  return (x) => p.A * Math.sin(p.B * x) + p.C
}

function equationOf(mode, p) {
  if (mode === 'linear') return p.m === 0 ? `y = ${minus(p.b)}` : `y = ${coefOf(p.m, 'x')}${plusTerm(p.b)}`
  if (mode === 'quadratic') {
    const inner = p.h === 0 ? 'x' : `(x ${p.h > 0 ? '−' : '+'} ${Math.abs(p.h)})`
    return `y = ${coefOf(p.a, `${inner}²`)}${plusTerm(p.k)}`
  }
  return `y = ${p.A === 1 ? '' : `${p.A} `}sin(${p.B === 1 ? '' : p.B}x)${plusTerm(p.C)}`
}

function valueOf(s) {
  const p = s[s.mode]
  if (s.mode === 'linear') return { mode: 'linear', m: p.m, b: p.b }
  if (s.mode === 'quadratic') return { mode: 'quadratic', a: p.a, h: p.h, k: p.k }
  return { mode: 'trig', A: p.A, B: p.B, C: p.C }
}

// Rise/run triangle on y = mx + b, starting as close to the y-intercept as fits on the grid.
function slopeTriangle(m, b) {
  const run = Math.abs(m) >= 1 ? 1 : 2
  for (let i = 0; i < 20; i++) {
    const x0 = i % 2 ? -Math.ceil(i / 2) : i / 2
    const y0 = m * x0 + b
    const y1 = y0 + m * run
    if (x0 >= -10 && x0 + run <= 10 && Math.abs(y0) <= 10 && Math.abs(y1) <= 10) return { x0, y0, run, rise: m * run }
  }
  return null
}

/** Interactive coordinate plane. Value: linear { mode, m, b } · quadratic { mode, a, h, k } · trig { mode, A, B, C }. */
export default function CoordPlane({ props = {}, onChange }) {
  const propsKey = JSON.stringify([props.mode, props.initial])
  const [state, setState] = useState(() => init(props))
  const [seenKey, setSeenKey] = useState(propsKey)
  if (seenKey !== propsKey) {
    setSeenKey(propsKey)
    setState(init(props))
  }

  const value = valueOf(state)
  const valueKey = JSON.stringify(value)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.(JSON.parse(valueKey))
  }, [valueKey])

  const locked = MODES.includes(props.mode)
  const { mode } = state
  const p = state[mode]
  const setP = (patch) => setState((s) => ({ ...s, [s.mode]: clean(s.mode, { ...s[s.mode], ...patch }) }))

  const clipId = `cp-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const svgRef = useRef(null)
  const dragging = useRef(false)

  // Curve path, clipped to the grid by the clipPath.
  const f = fOf(mode, p)
  let d = ''
  if (mode === 'linear') {
    d = `M${X(-10)},${Y(clamp(f(-10), -60, 60))} L${X(10)},${Y(clamp(f(10), -60, 60))}`
  } else {
    for (let i = 0; i <= 400; i++) {
      const x = -10 + i * 0.05
      d += `${i ? 'L' : 'M'}${X(x).toFixed(2)},${Y(clamp(f(x), -60, 60)).toFixed(2)}`
    }
  }

  const toWorld = (e) => {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM()
    if (!ctm) return null
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const q = pt.matrixTransform(ctm.inverse())
    return { x: (q.x - PAD) / U - 10, y: 10 - (q.y - PAD) / U }
  }
  const dragTo = (e) => {
    const w = toWorld(e)
    if (!w) return
    if (mode === 'linear') setP({ b: w.y })
    else if (mode === 'quadratic') setP({ h: w.x, k: w.y })
  }
  const handleEvents = {
    onPointerDown: (e) => {
      dragging.current = true
      e.currentTarget.setPointerCapture?.(e.pointerId)
      dragTo(e)
    },
    onPointerMove: (e) => dragging.current && dragTo(e),
    onPointerUp: (e) => {
      dragging.current = false
      e.currentTarget.releasePointerCapture?.(e.pointerId)
    },
    onPointerCancel: () => {
      dragging.current = false
    },
    onKeyDown: (e) => {
      const dir = { ArrowUp: [0, 1], ArrowDown: [0, -1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key]
      if (!dir) return
      e.preventDefault()
      if (mode === 'linear') setP({ b: p.b + dir[1] * 0.5 })
      else setP({ h: p.h + dir[0], k: p.k + dir[1] })
    },
  }

  const handle = (cx, cy, label) => (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      className="group cursor-grab outline-none active:cursor-grabbing"
      style={{ touchAction: 'none' }}
      {...handleEvents}
    >
      <circle cx={cx} cy={cy} r={20} fill="transparent" />
      <circle cx={cx} cy={cy} r={12} fill="none" strokeWidth={2} className="stroke-transparent group-focus-visible:stroke-accent-ink" />
      <circle cx={cx} cy={cy} r={9} className="fill-accent/20" />
      <circle cx={cx} cy={cy} r={5} className="fill-accent" stroke="#fff" strokeWidth={2} />
    </g>
  )

  // Overlays per mode.
  let overlay = null
  let facts = ''
  if (mode === 'linear') {
    const tri = slopeTriangle(p.m, p.b)
    facts = `slope m = ${minus(p.m)}  ·  y-intercept (0, ${minus(p.b)})`
    overlay = (
      <>
        {tri && (
          <g>
            <path
              d={`M${X(tri.x0)},${Y(tri.y0)} H${X(tri.x0 + tri.run)} V${Y(tri.y0 + tri.rise)}`}
              fill="none"
              className="stroke-accent-ink"
              strokeWidth={1.6}
              strokeDasharray="4 3"
            />
            <text
              x={(X(tri.x0) + X(tri.x0 + tri.run)) / 2}
              y={Y(tri.y0) + (tri.rise >= 0 ? 11 : -5)}
              textAnchor="middle"
              fontSize={8.5}
              fontWeight={700}
              className="fill-accent-ink"
              style={halo}
            >
              run {tri.run}
            </text>
            <text
              x={X(tri.x0 + tri.run) + (tri.x0 + tri.run > 6 ? -4 : 4)}
              y={(Y(tri.y0) + Y(tri.y0 + tri.rise)) / 2 + 3}
              textAnchor={tri.x0 + tri.run > 6 ? 'end' : 'start'}
              fontSize={8.5}
              fontWeight={700}
              className="fill-accent-ink"
              style={halo}
            >
              rise {minus(tri.rise)}
            </text>
          </g>
        )}
        <text
          x={X(0) + (p.m > 0 ? -9 : 9)}
          y={Y(p.b) - 8}
          textAnchor={p.m > 0 ? 'end' : 'start'}
          fontSize={9}
          fontWeight={700}
          className="fill-ink"
          style={halo}
        >
          (0, {minus(p.b)})
        </text>
        {handle(X(0), Y(p.b), `y-intercept at ${p.b}. Drag or use the up and down arrow keys.`)}
      </>
    )
  } else if (mode === 'quadratic') {
    facts = `vertex (${minus(p.h)}, ${minus(p.k)})  ·  axis of symmetry x = ${minus(p.h)}  ·  opens ${p.a > 0 ? 'up' : 'down'}`
    const anchor = p.h > 5 ? 'end' : p.h < -5 ? 'start' : 'middle'
    const labelBelow = p.a > 0 ? Y(p.k) + 19 <= S - 3 : Y(p.k) - 12 < PAD + 2
    overlay = (
      <>
        <line x1={X(p.h)} y1={PAD} x2={X(p.h)} y2={S - PAD} className="stroke-accent-ink" strokeWidth={1.4} strokeDasharray="5 4" />
        <text
          x={X(p.h) + (anchor === 'end' ? -4 : 4)}
          y={p.a > 0 ? PAD + 10 : S - PAD - 5}
          textAnchor={anchor === 'end' ? 'end' : 'start'}
          fontSize={8.5}
          fontWeight={700}
          className="fill-accent-ink"
          style={halo}
        >
          x = {minus(p.h)}
        </text>
        <text
          x={X(p.h)}
          y={Y(p.k) + (labelBelow ? 19 : -12)}
          textAnchor={anchor}
          fontSize={9}
          fontWeight={700}
          className="fill-ink"
          style={halo}
        >
          vertex ({minus(p.h)}, {minus(p.k)})
        </text>
        {handle(X(p.h), Y(p.k), `Vertex at ${p.h}, ${p.k}. Drag or use the arrow keys.`)}
      </>
    )
  } else {
    const period = (2 * Math.PI) / p.B
    const xPeak = Math.PI / (2 * p.B)
    const below = p.C - p.A - 0.9
    const yBr = below >= -10 ? below : p.C + p.A + 0.9
    const x0 = period <= 10 ? 0 : -period / 2
    const periodText = `${p.B === 1 ? '2π' : `2π/${p.B}`} ≈ ${period.toFixed(2)}`
    facts = `amplitude ${p.A}  ·  period ${periodText}  ·  midline y = ${minus(p.C)}`
    overlay = (
      <>
        <line x1={PAD} y1={Y(p.C)} x2={S - PAD} y2={Y(p.C)} className="stroke-ink/35" strokeWidth={1.2} strokeDasharray="5 4" />
        <line x1={X(xPeak)} y1={Y(p.C)} x2={X(xPeak)} y2={Y(p.C + p.A)} className="stroke-accent-ink" strokeWidth={1.8} />
        <circle cx={X(xPeak)} cy={Y(p.C + p.A)} r={3.5} className="fill-accent-ink" />
        <text x={X(xPeak) + 5} y={(Y(p.C) + Y(p.C + p.A)) / 2 + 3} fontSize={8.5} fontWeight={700} className="fill-accent-ink" style={halo}>
          A = {p.A}
        </text>
        <g className="stroke-accent-ink" strokeWidth={1.4}>
          <line x1={X(x0)} y1={Y(yBr)} x2={X(x0 + period)} y2={Y(yBr)} />
          <line x1={X(x0)} y1={Y(yBr) - 4} x2={X(x0)} y2={Y(yBr) + 4} />
          <line x1={X(x0 + period)} y1={Y(yBr) - 4} x2={X(x0 + period)} y2={Y(yBr) + 4} />
        </g>
        <text
          x={X(x0 + period / 2)}
          y={Y(yBr) + (yBr === below ? 11 : -5)}
          textAnchor="middle"
          fontSize={8.5}
          fontWeight={700}
          className="fill-accent-ink"
          style={halo}
        >
          period {periodText}
        </text>
      </>
    )
  }

  return (
    <div className="@container w-full min-w-0">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 font-mono text-[17px] font-bold text-accent-ink" aria-live="polite">
          {equationOf(mode, p)}
        </div>
        {!locked && (
          <div role="tablist" aria-label="Graph type" className="inline-flex rounded-xl bg-ink/[.05] p-1">
            {MODES.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={k === mode}
                onClick={() => setState((s) => ({ ...s, mode: k }))}
                className={`min-h-9 rounded-lg px-3 text-[13px] font-semibold transition ${
                  k === mode ? 'bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/.12)]' : 'text-muted hover:text-ink'
                }`}
              >
                {MODE_LABELS[k]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 @xl:flex-row @xl:items-start">
        <div className="min-w-0 @xl:flex-1">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${S} ${S}`}
            className="mx-auto block h-auto max-h-[240px] w-full select-none @xl:max-h-[340px]"
            role="img"
            aria-label={`Graph of ${equationOf(mode, p)}`}
          >
            <defs>
              <clipPath id={clipId}>
                <rect x={PAD} y={PAD} width={S - 2 * PAD} height={S - 2 * PAD} />
              </clipPath>
            </defs>
            <rect x={PAD} y={PAD} width={S - 2 * PAD} height={S - 2 * PAD} rx={4} fill="#fff" className="stroke-ink/10" />

            {/* grid */}
            {TICKS.map((i) => (
              <g key={i} className={i % 5 === 0 ? 'stroke-ink/[.14]' : 'stroke-ink/[.06]'} strokeWidth={0.7}>
                <line x1={X(i)} y1={PAD} x2={X(i)} y2={S - PAD} />
                <line x1={PAD} y1={Y(i)} x2={S - PAD} y2={Y(i)} />
              </g>
            ))}

            {/* axes with arrows */}
            <g className="stroke-ink/70" strokeWidth={1.2}>
              <line x1={PAD - 6} y1={Y(0)} x2={S - PAD + 6} y2={Y(0)} />
              <line x1={X(0)} y1={S - PAD + 6} x2={X(0)} y2={PAD - 6} />
              {TICKS.map((i) =>
                i === 0 ? null : (
                  <g key={i}>
                    <line x1={X(i)} y1={Y(0) - 2.5} x2={X(i)} y2={Y(0) + 2.5} />
                    <line x1={X(0) - 2.5} y1={Y(i)} x2={X(0) + 2.5} y2={Y(i)} />
                  </g>
                ),
              )}
            </g>
            <g className="fill-ink/70">
              <polygon points={`${S - PAD + 11},${Y(0)} ${S - PAD + 4},${Y(0) - 3.5} ${S - PAD + 4},${Y(0) + 3.5}`} />
              <polygon points={`${PAD - 11},${Y(0)} ${PAD - 4},${Y(0) - 3.5} ${PAD - 4},${Y(0) + 3.5}`} />
              <polygon points={`${X(0)},${PAD - 11} ${X(0) - 3.5},${PAD - 4} ${X(0) + 3.5},${PAD - 4}`} />
              <polygon points={`${X(0)},${S - PAD + 11} ${X(0) - 3.5},${S - PAD + 4} ${X(0) + 3.5},${S - PAD + 4}`} />
            </g>
            <text x={S - 3} y={Y(0) - 6} textAnchor="end" fontSize={10} fontStyle="italic" fontWeight={700} className="fill-ink/70">
              x
            </text>
            <text x={X(0) + 7} y={9} fontSize={10} fontStyle="italic" fontWeight={700} className="fill-ink/70">
              y
            </text>

            {/* tick labels */}
            <g fontSize={7.5} className="fill-muted" style={halo}>
              {TICKS.filter((i) => i !== 0 && i % 2 === 0).map((i) => (
                <g key={i}>
                  <text x={X(i)} y={Y(0) + 10} textAnchor="middle">
                    {minus(i)}
                  </text>
                  <text x={X(0) - 4} y={Y(i) + 2.6} textAnchor="end">
                    {minus(i)}
                  </text>
                </g>
              ))}
              <text x={X(0) - 4} y={Y(0) + 10} textAnchor="end">
                0
              </text>
            </g>

            {/* curve */}
            <path d={d} fill="none" clipPath={`url(#${clipId})`} className="stroke-accent" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />

            {overlay}
          </svg>
        </div>

        <div className="min-w-0 space-y-2 @xl:w-[230px] @xl:shrink-0">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 @xl:grid-cols-1">
            {mode === 'linear' && (
              <>
                <Slider label="Slope m" value={p.m} min={-10} max={10} step={0.5} onChange={(v) => setP({ m: v })} />
                <Slider label="Intercept b" value={p.b} min={-10} max={10} step={0.5} onChange={(v) => setP({ b: v })} />
              </>
            )}
            {mode === 'quadratic' && (
              <>
                <Slider
                  label="Stretch a"
                  value={A_VALS.indexOf(p.a)}
                  min={0}
                  max={A_VALS.length - 1}
                  step={1}
                  display={minus(p.a)}
                  valueText={String(p.a)}
                  onChange={(i) => setP({ a: A_VALS[i] })}
                />
                <Slider label="Shift h" value={p.h} min={-10} max={10} step={1} onChange={(v) => setP({ h: v })} />
                <Slider label="Shift k" value={p.k} min={-10} max={10} step={1} onChange={(v) => setP({ k: v })} />
              </>
            )}
            {mode === 'trig' && (
              <>
                <Slider label="Amplitude A" value={p.A} min={0.5} max={5} step={0.5} onChange={(v) => setP({ A: v })} />
                <Slider label="Frequency B" value={p.B} min={0.5} max={4} step={0.5} onChange={(v) => setP({ B: v })} />
                <Slider label="Midline C" value={p.C} min={-5} max={5} step={1} onChange={(v) => setP({ C: v })} />
              </>
            )}
          </div>
          <p className="text-[12px] font-medium leading-snug text-muted">{facts}</p>
        </div>
      </div>
    </div>
  )
}

function Slider({ label, value, min, max, step, onChange, display, valueText }) {
  return (
    <label className="block min-w-0">
      <span className="flex items-baseline justify-between gap-2 text-[12px] font-semibold text-muted">
        <span className="truncate">{label}</span>
        <span className="font-mono text-[13px] font-bold text-ink">{display ?? minus(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-8 w-full cursor-pointer"
        style={{ accentColor: 'var(--accent)' }}
      />
    </label>
  )
}
