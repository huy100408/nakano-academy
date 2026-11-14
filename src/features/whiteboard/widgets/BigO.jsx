import { useEffect, useRef, useState } from 'react'

const N_MIN = 1
const N_MAX = 1000
const PRESETS = [10, 100, 1000]

const clampN = (v) => {
  const n = Math.round(Number(v))
  return Number.isFinite(n) ? Math.min(N_MAX, Math.max(N_MIN, n)) : 16
}

// Operation counts reported to lesson checks (all integers). Rounding rules, applied the same way everywhere:
//   log       = max(1, round(log2 n))   at least one step, even for n = 1 (n = 16 -> 4, n = 1000 -> 10)
//   linear    = n
//   nlogn     = round(n * log2 n)       exact product, rounded once (n = 1 -> 0, n = 16 -> 64, n = 1000 -> 9966)
//   quadratic = n * n
const opsAt = (n) => ({
  n,
  log: Math.max(1, Math.round(Math.log2(n))),
  linear: n,
  nlogn: Math.round(n * Math.log2(n)),
  quadratic: n * n,
})

// Fixed categorical order (validated palette, light surface). Text never uses these; swatches carry identity.
const SERIES = [
  { key: 'log', name: 'O(log n)', eg: 'binary search', color: '#2a78d6', f: (n) => Math.max(1, Math.log2(n)) },
  { key: 'linear', name: 'O(n)', eg: 'linear search', color: '#eb6834', f: (n) => n },
  { key: 'nlogn', name: 'O(n log n)', eg: 'merge sort', color: '#1baf7a', f: (n) => n * Math.log2(n) },
  { key: 'quadratic', name: 'O(n²)', eg: 'nested loops', color: '#eda100', f: (n) => n * n },
]

// Chart geometry (viewBox units). y is log10 scale from 10^0 to 10^6.
const W = 440
const H = 214
const X0 = 50
const X1 = 428
const Y0 = 18
const Y1 = 178
const DECADES = 6
const xOf = (n) => X0 + ((n - N_MIN) / (N_MAX - N_MIN)) * (X1 - X0)
const yOf = (v) => Y1 - (Math.log10(Math.max(1, v)) / DECADES) * (Y1 - Y0)
const Y_TICKS = ['1', '10', '100', '1k', '10k', '100k', '1M']
const X_TICKS = [1, 200, 400, 600, 800, 1000]
const SAMPLES = [1, ...Array.from({ length: 500 }, (_, i) => (i + 1) * 2)]
const PATHS = SERIES.map((s) => SAMPLES.map((n, i) => `${i ? 'L' : 'M'}${xOf(n).toFixed(1)} ${yOf(s.f(n)).toFixed(1)}`).join(''))

const fmt = (v) => v.toLocaleString('en-US')
const halo = { stroke: '#fff', strokeWidth: 3, paintOrder: 'stroke', strokeLinejoin: 'round' }

function note({ n, log, linear, nlogn, quadratic }) {
  if (n === 1) return 'At n = 1 every growth rate costs about one step. The gaps only open up as n grows.'
  const ratio = Number((nlogn / linear).toFixed(1)) // n log n ÷ n is log2 n
  return `At n = ${fmt(n)}, O(n²) needs ${fmt(quadratic)} operations (${fmt(n)}× O(n)), O(n log n) about ${ratio}× O(n), and O(log n) just ${log}.`
}

/** Growth-rate plotter. Value: { n, log, linear, nlogn, quadratic } (ints, see opsAt). */
export default function BigO({ props = {}, onChange }) {
  const startN = clampN(props.n ?? 16)
  const [n, setN] = useState(startN)
  const [draft, setDraft] = useState(null) // text in the number box while typing

  const [prevStart, setPrevStart] = useState(startN)
  if (startN !== prevStart) {
    setPrevStart(startN)
    setN(startN)
    setDraft(null)
  }

  const ops = opsAt(n)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.(opsAt(n))
  }, [n])

  const pick = (v) => {
    setN(clampN(v))
    setDraft(null)
  }

  // Click or drag across the chart to move the n marker.
  const svgRef = useRef(null)
  const dragging = useRef(false)
  const nFromPointer = (e) => {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM()
    if (!ctm) return
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const x = pt.matrixTransform(ctm.inverse()).x
    pick(N_MIN + ((x - X0) / (X1 - X0)) * (N_MAX - N_MIN))
  }

  const mx = xOf(n)
  const markerRight = n > 700

  return (
    <div className="@container w-full space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="bigo-n" className="font-display text-[15px] font-extrabold text-ink">
          n
        </label>
        <input
          id="bigo-n"
          type="range"
          min={N_MIN}
          max={N_MAX}
          step={1}
          value={n}
          onChange={(e) => pick(e.target.value)}
          aria-label="Input size n"
          className="h-10 min-w-[140px] flex-1 cursor-pointer"
          style={{ accentColor: 'var(--accent)' }}
        />
        <input
          type="number"
          min={N_MIN}
          max={N_MAX}
          inputMode="numeric"
          value={draft ?? n}
          aria-label="n value"
          onChange={(e) => {
            setDraft(e.target.value)
            const v = Number(e.target.value)
            if (e.target.value !== '' && Number.isFinite(v)) setN(clampN(v))
          }}
          onBlur={() => setDraft(null)}
          className="h-10 w-[4.75rem] rounded-xl border border-line bg-white px-2 text-center font-mono text-[15px] font-bold tabular-nums text-ink"
        />
        <div className="hidden gap-1 @sm:flex">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={n === p}
              onClick={() => pick(p)}
              className={`btn-3d min-h-[40px] min-w-[44px] rounded-xl border px-2 font-mono text-[12.5px] font-bold ${
                n === p ? 'btn-3d-accent border-transparent bg-accent text-on-accent' : 'border-line bg-white text-muted'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-3 @xl:grid-cols-[minmax(0,1fr)_11rem]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto max-h-60 w-full cursor-crosshair select-none"
          style={{ touchAction: 'pan-y' }}
          role="img"
          aria-label={`Operation counts at n = ${n}: log n ${ops.log}, n ${ops.linear}, n log n ${ops.nlogn}, n squared ${ops.quadratic}`}
          onPointerDown={(e) => {
            dragging.current = true
            e.currentTarget.setPointerCapture?.(e.pointerId)
            nFromPointer(e)
          }}
          onPointerMove={(e) => dragging.current && nFromPointer(e)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          {/* gridlines + y labels (log scale) */}
          {Y_TICKS.map((t, i) => {
            const y = Y1 - (i / DECADES) * (Y1 - Y0)
            return (
              <g key={t}>
                <line x1={X0} x2={X1} y1={y} y2={y} stroke={i ? '#e1e0d9' : '#c3c2b7'} strokeWidth="1" />
                <text x={X0 - 6} y={y + 3.5} textAnchor="end" fontSize="10" fill="#6b6b76">
                  {t}
                </text>
              </g>
            )
          })}
          {X_TICKS.map((t) => (
            <text key={t} x={xOf(t)} y={Y1 + 14} textAnchor="middle" fontSize="10" fill="#6b6b76">
              {t}
            </text>
          ))}
          <text x={(X0 + X1) / 2} y={H - 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#6b6b76">
            input size n
          </text>
          <text
            transform={`translate(12 ${(Y0 + Y1) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="#6b6b76"
          >
            operations (log scale)
          </text>

          {/* curves */}
          {SERIES.map((s, i) => (
            <path key={s.key} d={PATHS[i]} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          ))}

          {/* direct labels at the right edge */}
          {SERIES.map((s) => (
            <text key={s.key} x={X1 - 2} y={yOf(s.f(N_MAX)) - 6} textAnchor="end" fontSize="10" fontWeight="700" fill="#18181d" style={halo}>
              {s.name}
            </text>
          ))}

          {/* n marker */}
          <line x1={mx} x2={mx} y1={Y0} y2={Y1} strokeWidth="1.5" strokeDasharray="4 3" style={{ stroke: 'var(--accent)' }} />
          <text
            x={markerRight ? mx - 6 : mx + 6}
            y={Y0 + 12}
            textAnchor={markerRight ? 'end' : 'start'}
            fontSize="11"
            fontWeight="800"
            fill="#18181d"
            style={halo}
          >
            n = {n}
          </text>
          {SERIES.map((s) => (
            <circle key={s.key} cx={mx} cy={yOf(s.f(n))} r="4.5" fill={s.color} stroke="#fff" strokeWidth="2" />
          ))}

          {/* wide invisible hit area so clicks anywhere on the plot register */}
          <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="transparent" />
        </svg>

        <div className="grid grid-cols-2 gap-1.5 @lg:grid-cols-4 @xl:grid-cols-1">
          {SERIES.map((s) => (
            <div key={s.key} className="min-w-0 rounded-xl border border-line bg-white px-2.5 py-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-[3px] w-3.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden="true" />
                <span className="truncate font-mono text-[12px] font-bold text-ink">{s.name}</span>
              </div>
              <div className="truncate font-mono text-[17px] font-extrabold tabular-nums leading-tight text-ink">{fmt(ops[s.key])}</div>
              <div className="hidden truncate text-[10.5px] text-faint @lg:block">{s.eg}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="rounded-xl bg-accent-softer px-3 py-2 text-[12.5px] leading-snug text-muted" aria-live="polite">
        {note(ops)}
      </p>
    </div>
  )
}
