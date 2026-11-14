import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

const G = 9.8
const MODES = ['fma', 'projectile']
const MODE_LABELS = { fma: 'F = ma', projectile: 'Projectile' }

const r1 = (x) => Math.round(x * 10) / 10 || 0
const rad = (deg) => (deg * Math.PI) / 180
const int = (v, lo, hi, d) => {
  const n = Math.round(Number(v))
  return v === null || v === undefined || v === '' || !Number.isFinite(n) ? d : Math.min(hi, Math.max(lo, n))
}
const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const halo = { paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round' }

function init(props) {
  const ini = { ...props, ...(props.initial && typeof props.initial === 'object' ? props.initial : {}) }
  return {
    mode: MODES.includes(props.mode) ? props.mode : 'fma',
    mass: int(ini.mass, 1, 50, 10),
    force: int(ini.force, 0, 500, 100),
    angle: int(ini.angle, 5, 85, 45),
    speed: int(ini.speed, 5, 50, 20),
  }
}

const projectileOf = (angle, speed) => {
  const t = rad(angle)
  return {
    range: (speed * speed * Math.sin(2 * t)) / G,
    maxHeight: (speed * speed * Math.sin(t) ** 2) / (2 * G),
    flight: (2 * speed * Math.sin(t)) / G,
  }
}

function valueOf(s) {
  if (s.mode === 'fma') return { mode: 'fma', mass: s.mass, force: s.force, accel: r1(s.force / s.mass) }
  const p = projectileOf(s.angle, s.speed)
  return { mode: 'projectile', angle: s.angle, speed: s.speed, range: r1(p.range), maxHeight: r1(p.maxHeight) }
}

/** Forces & motion. Value: fma { mode, mass, force, accel } · projectile { mode, angle, speed, range, maxHeight }. */
export default function Forces({ props = {}, onChange }) {
  const propsKey = JSON.stringify(props)
  const [state, setState] = useState(() => init(props))
  const [seenKey, setSeenKey] = useState(propsKey)
  const [shot, setShot] = useState(0)
  if (seenKey !== propsKey) {
    setSeenKey(propsKey)
    setState(init(props))
    setShot(0)
  }

  const value = valueOf(state)
  const valueKey = JSON.stringify(value)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.(JSON.parse(valueKey))
  }, [valueKey])

  const locked = MODES.includes(props.mode)
  const set = (patch) => {
    setState((s) => ({ ...s, ...patch }))
    if ('angle' in patch || 'speed' in patch) setShot(0)
  }

  return (
    <div className="@container w-full min-w-0">
      {!locked && (
        <div role="tablist" aria-label="Simulation" className="mb-3 inline-flex rounded-xl bg-ink/[.05] p-1">
          {MODES.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={k === state.mode}
              onClick={() => set({ mode: k })}
              className={`min-h-9 rounded-lg px-3 text-[13px] font-semibold transition ${
                k === state.mode ? 'bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/.12)]' : 'text-muted hover:text-ink'
              }`}
            >
              {MODE_LABELS[k]}
            </button>
          ))}
        </div>
      )}

      {state.mode === 'fma' ? (
        <>
          <div className="mb-2 font-mono text-[15px] font-bold text-accent-ink" aria-live="polite">
            a = F ÷ m = {state.force} N ÷ {state.mass} kg = {value.accel.toFixed(1)} m/s²
          </div>
          <FmaScene mass={state.mass} force={state.force} />
          <div className="mt-2 grid grid-cols-2 gap-x-4">
            <Slider label="Mass" unit="kg" value={state.mass} min={1} max={50} onChange={(v) => set({ mass: v })} />
            <Slider label="Net force" unit="N" value={state.force} min={0} max={500} onChange={(v) => set({ force: v })} />
          </div>
        </>
      ) : (
        <>
          <div className="mb-2 flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-[13.5px] font-bold text-accent-ink" aria-live="polite">
            <span>range = {value.range.toFixed(1)} m</span>
            <span>max height = {value.maxHeight.toFixed(1)} m</span>
          </div>
          <ProjectileScene angle={state.angle} speed={state.speed} shot={shot} />
          <div className="mt-2 flex items-end gap-3">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-4">
              <Slider label="Angle" unit="°" value={state.angle} min={5} max={85} onChange={(v) => set({ angle: v })} />
              <Slider label="Speed" unit="m/s" value={state.speed} min={5} max={50} onChange={(v) => set({ speed: v })} />
            </div>
            <button
              type="button"
              onClick={() => setShot((n) => n + 1)}
              className="btn-3d btn-3d-accent mb-0.5 flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-xl bg-accent px-4 text-[13.5px] font-bold text-on-accent"
            >
              <Play size={14} fill="currentColor" /> Launch
            </button>
          </div>
          <p className="mt-1 text-[12px] font-medium leading-snug text-muted">
            Range = v² sin 2θ ÷ g · Max height = v² sin²θ ÷ 2g · g = 9.8 m/s² · time in the air ≈{' '}
            {projectileOf(state.angle, state.speed).flight.toFixed(1)} s
          </p>
        </>
      )}
    </div>
  )
}

function Arrow({ x, y, len, color, width = 5 }) {
  if (len < 2) return <circle cx={x} cy={y} r={3.5} style={{ fill: color }} />
  const tip = x + len
  const head = Math.min(11, len)
  return (
    <g>
      <line x1={x} y1={y} x2={Math.max(x, tip - head + 1)} y2={y} strokeWidth={width} strokeLinecap="round" style={{ stroke: color }} />
      <polygon points={`${tip},${y} ${tip - head},${y - 7} ${tip - head},${y + 7}`} style={{ fill: color }} />
    </g>
  )
}

// Cart on a 10 m track, accelerating from rest at a = F/m, then resetting.
function FmaScene({ mass, force }) {
  const a = force / mass
  const W = 400
  const groundY = 176
  const left = 24
  const pxPerM = 36
  const cw = Math.round(34 + mass * 0.9)
  const ch = Math.round(22 + mass * 0.5)
  const cartRef = useRef(null)
  const readRef = useRef(null)

  useEffect(() => {
    const el = cartRef.current
    const read = readRef.current
    if (!el) return undefined
    const maxD = left + 10 * pxPerM - cw - left
    const arrive = a > 0 ? Math.sqrt((2 * maxD) / (a * pxPerM)) : Infinity
    const place = (dist, t) => {
      el.setAttribute('transform', `translate(${dist.toFixed(2)} 0)`)
      if (read) read.textContent = a > 0 ? `t = ${t.toFixed(1)} s   v = ${(a * t).toFixed(1)} m/s` : 'no net force: stays at rest'
    }
    if (a <= 0 || reducedMotion()) {
      place(0, 0)
      return undefined
    }
    let raf = 0
    let start = performance.now()
    const tick = (now) => {
      let t = (now - start) / 1000
      if (t > arrive + 0.8) {
        start = now
        t = 0
      }
      const tc = Math.min(t, arrive)
      place(Math.min(maxD, 0.5 * a * tc * tc * pxPerM), tc)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [a, cw])

  const lenF = (force / 500) * 270
  const lenA = Math.min(270, a * 10)
  return (
    <svg viewBox={`0 0 ${W} 200`} className="block h-auto max-h-[230px] w-full select-none" role="img" aria-label={`Cart of ${mass} kilograms pushed by ${force} newtons`}>
      <rect x={0} y={0} width={W} height={200} rx={10} fill="#fff" />
      {/* vectors, drawn to scale */}
      <g fontSize={10} fontWeight={700}>
        <text x={12} y={28} className="fill-muted">
          F = <tspan className="fill-ink">{force} N</tspan>
        </text>
        <Arrow x={112} y={24} len={lenF} color="var(--accent)" />
        <text x={12} y={60} className="fill-muted">
          a = <tspan className="fill-ink">{r1(a).toFixed(1)} m/s²</tspan>
        </text>
        <Arrow x={112} y={56} len={lenA} color="var(--accent-ink)" />
        {a * 10 > 270 && (
          <text x={112 + lenA} y={74} textAnchor="end" fontSize={8} fontWeight={600} className="fill-muted">
            arrow capped: off scale
          </text>
        )}
      </g>
      <text ref={readRef} x={W - 12} y={92} textAnchor="end" fontSize={10} className="fill-muted font-mono" />

      {/* track */}
      <line x1={10} y1={groundY} x2={W - 10} y2={groundY} className="stroke-ink/60" strokeWidth={2} />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={left + i * pxPerM} y1={groundY} x2={left + i * pxPerM} y2={groundY + (i % 2 ? 3 : 5)} className="stroke-ink/40" />
          {i % 2 === 0 && (
            <text x={left + i * pxPerM} y={groundY + 15} textAnchor="middle" fontSize={8} className="fill-muted">
              {i} m
            </text>
          )}
        </g>
      ))}

      {/* cart */}
      <g ref={cartRef}>
        <rect x={left} y={groundY - 12 - ch} width={cw} height={ch} rx={6} className="fill-accent" />
        <text
          x={left + cw / 2}
          y={groundY - 12 - ch / 2 + 4}
          textAnchor="middle"
          fontSize={11}
          fontWeight={800}
          style={{ fill: 'var(--on-accent)' }}
        >
          {mass} kg
        </text>
        <circle cx={left + 10} cy={groundY - 6} r={6} className="fill-ink" />
        <circle cx={left + cw - 10} cy={groundY - 6} r={6} className="fill-ink" />
      </g>
    </svg>
  )
}

// Launch at `angle` and `speed` from the origin; equal x and y scale so the parabola is true to shape.
const NICE = [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300]
function ProjectileScene({ angle, speed, shot }) {
  const VW = 400
  const VH = 240
  const L = 36
  const R = 12
  const groundY = VH - 26
  const plotW = VW - L - R
  const plotTop = 12
  const worldW = NICE.find((n) => n >= ((speed * speed) / G) * 1.06) ?? 300
  const s = plotW / worldW
  const step = worldW / 5
  const sx = (x) => L + x * s
  const sy = (y) => groundY - y * s
  const th = rad(angle)
  const { range, maxHeight, flight } = projectileOf(angle, speed)
  const pos = (t) => ({ x: speed * Math.cos(th) * t, y: Math.max(0, speed * Math.sin(th) * t - 0.5 * G * t * t) })

  let d = ''
  for (let i = 0; i <= 64; i++) {
    const p = pos((flight * i) / 64)
    d += `${i ? 'L' : 'M'}${sx(p.x).toFixed(2)},${sy(p.y).toFixed(2)}`
  }

  const ballRef = useRef(null)
  useEffect(() => {
    const el = ballRef.current
    if (!el) return undefined
    const put = (p) => {
      el.setAttribute('cx', sx(p.x).toFixed(2))
      el.setAttribute('cy', sy(p.y).toFixed(2))
    }
    if (!shot) {
      put({ x: 0, y: 0 })
      return undefined
    }
    if (reducedMotion()) {
      put(pos(flight))
      return undefined
    }
    const dur = Math.min(2.4, Math.max(0.9, flight / 2)) * 1000
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const u = Math.min(1, (now - start) / dur)
      put(pos(u * flight))
      if (u < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shot, angle, speed]) // the scale and path derive from angle and speed alone

  const landX = sx(range)
  const peakX = sx(range / 2)
  const peakY = sy(maxHeight)
  const heightTicks = []
  for (let h = step; sy(h) >= plotTop; h += step) heightTicks.push(h)
  const groundTicks = Array.from({ length: 6 }, (_, i) => i * step)
  const rangeAnchor = landX > VW - 46 ? 'end' : landX < L + 40 ? 'start' : 'middle'
  // Hide ground tick labels the range label would sit on.
  const [gapL, gapR] = rangeAnchor === 'end' ? [78, 12] : rangeAnchor === 'start' ? [12, 78] : [42, 42]
  const tickHidden = (x) => x !== 0 && sx(x) > landX - gapL && sx(x) < landX + gapR
  const peakAnchor = peakX < L + 56 ? 'start' : 'middle'
  const arcR = 24

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto max-h-[250px] w-full select-none" role="img" aria-label={`Projectile launched at ${angle} degrees and ${speed} metres per second`}>
      <rect x={0} y={0} width={VW} height={VH} rx={10} fill="#fff" />
      {/* grid + axes */}
      <g className="stroke-ink/[.07]" strokeWidth={0.8}>
        {groundTicks.slice(1).map((x) => (
          <line key={x} x1={sx(x)} y1={plotTop} x2={sx(x)} y2={groundY} />
        ))}
        {heightTicks.map((h) => (
          <line key={h} x1={L} y1={sy(h)} x2={VW - R} y2={sy(h)} />
        ))}
      </g>
      <line x1={L} y1={groundY} x2={L} y2={plotTop} className="stroke-ink/40" strokeWidth={1} />
      <g fontSize={8} className="fill-muted">
        {heightTicks.map((h) => (
          <text key={h} x={L - 4} y={sy(h) + 3} textAnchor="end">
            {h}
          </text>
        ))}
        {groundTicks.map((x) =>
          tickHidden(x) ? null : (
            <text key={x} x={sx(x)} y={groundY + 13} textAnchor="middle">
              {x}
              {x === 0 ? ' m' : ''}
            </text>
          ),
        )}
      </g>
      <rect x={6} y={groundY} width={VW - 12} height={4} rx={2} className="fill-ink/15" />
      <line x1={6} y1={groundY} x2={VW - 6} y2={groundY} className="stroke-ink/60" strokeWidth={1.6} />

      {/* launch angle and velocity vector */}
      <path
        d={`M${L + arcR},${groundY} A${arcR},${arcR} 0 0 0 ${L + arcR * Math.cos(th)},${groundY - arcR * Math.sin(th)}`}
        fill="none"
        className="stroke-ink/40"
        strokeWidth={1.2}
      />
      <text
        x={L + (arcR + 10) * Math.cos(th / 2)}
        y={groundY - (arcR + 10) * Math.sin(th / 2) + 3}
        fontSize={9}
        fontWeight={700}
        className="fill-ink"
        style={halo}
      >
        {angle}°
      </text>

      {/* trajectory */}
      <path d={d} fill="none" className="stroke-accent" strokeWidth={2.4} strokeDasharray="6 4" strokeLinecap="round" />
      <line x1={L} y1={groundY} x2={L + 44 * Math.cos(th)} y2={groundY - 44 * Math.sin(th)} className="stroke-accent-ink" strokeWidth={2.4} strokeLinecap="round" />
      <polygon
        points={`0,0 -9,-5 -9,5`}
        transform={`translate(${L + 48 * Math.cos(th)} ${groundY - 48 * Math.sin(th)}) rotate(${-angle})`}
        className="fill-accent-ink"
      />

      {/* peak */}
      <line x1={peakX} y1={peakY} x2={peakX} y2={groundY} className="stroke-accent-ink/50" strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={peakX} cy={peakY} r={4} className="fill-accent-ink" stroke="#fff" strokeWidth={1.5} />
      <text x={peakAnchor === 'start' ? peakX - 4 : peakX} y={peakY - 8} textAnchor={peakAnchor} fontSize={9} fontWeight={700} className="fill-accent-ink" style={halo}>
        max height {r1(maxHeight).toFixed(1)} m
      </text>

      {/* range */}
      <line x1={landX} y1={groundY - 9} x2={landX} y2={groundY + 4} className="stroke-accent-ink" strokeWidth={2} />
      <polygon points={`${landX},${groundY - 9} ${landX + 9},${groundY - 6} ${landX},${groundY - 3}`} className="fill-accent-ink" />
      <text x={landX} y={groundY + 13} textAnchor={rangeAnchor} fontSize={9} fontWeight={700} className="fill-accent-ink">
        range {r1(range).toFixed(1)} m
      </text>

      <circle ref={ballRef} cx={L} cy={groundY} r={6} className="fill-ink" stroke="#fff" strokeWidth={2} />
    </svg>
  )
}

function Slider({ label, unit, value, min, max, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="flex items-baseline justify-between gap-2 text-[12px] font-semibold text-muted">
        <span className="truncate">{label}</span>
        <span className="font-mono text-[13px] font-bold text-ink">
          {value} {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Math.round(Number(e.target.value)))}
        className="h-8 w-full cursor-pointer"
        style={{ accentColor: 'var(--accent)' }}
      />
    </label>
  )
}
