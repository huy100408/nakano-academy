import { useEffect, useRef, useState } from 'react'

const GATES = ['AND', 'OR', 'XOR', 'NOT', 'NAND']
const ON = 'var(--accent)'
const OFF = '#d4d4d8'
const INK = '#18181d'

const bit = (v) => (v === 1 || v === true || v === '1' ? 1 : 0)
const normGate = (g) => {
  const up = String(g ?? 'AND').toUpperCase()
  return GATES.includes(up) ? up : 'AND'
}

function gateOut(gate, a, b) {
  switch (gate) {
    case 'AND': return a & b
    case 'OR': return a | b
    case 'XOR': return a ^ b
    case 'NOT': return 1 - a
    case 'NAND': return 1 - (a & b)
    default: return 0
  }
}

// Gate drawings in a 360 × 160 box; body spans y 40..120, inputs at y 55/105 (NOT: y 80).
// `inX` is where input wires meet the body, `outX` where the output wire starts.
const SHAPES = {
  AND: { inX: 120, outX: 200, body: 'M120 40 H160 A40 40 0 0 1 160 120 H120 Z', labelX: 152 },
  NAND: { inX: 120, outX: 214, body: 'M120 40 H160 A40 40 0 0 1 160 120 H120 Z', bubble: 207, labelX: 152 },
  OR: { inX: 123, outX: 205, body: 'M115 40 Q160 40 205 80 Q160 120 115 120 Q140 80 115 40 Z', labelX: 158 },
  XOR: {
    inX: 113,
    outX: 205,
    body: 'M115 40 Q160 40 205 80 Q160 120 115 120 Q140 80 115 40 Z',
    extra: 'M105 40 Q130 80 105 120',
    labelX: 160,
  },
  NOT: { inX: 125, outX: 204, body: 'M125 45 L190 80 L125 115 Z', bubble: 197, labelX: 146 },
}

/** Logic gate playground. Value: { gate, a: 0|1, b: 0|1, out: 0|1 }. */
export default function LogicGates({ props = {}, onChange }) {
  const startGate = normGate(props.gate)
  const [gate, setGate] = useState(startGate)
  const [a, setA] = useState(bit(props.a))
  const [b, setB] = useState(bit(props.b))

  const [prevGate, setPrevGate] = useState(startGate)
  if (startGate !== prevGate) {
    setPrevGate(startGate)
    setGate(startGate)
  }

  const out = gateOut(gate, a, b)
  const unary = gate === 'NOT'

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.({ gate, a, b, out })
  }, [gate, a, b, out])

  const shape = SHAPES[gate]
  const wire = (v) => ({ stroke: v ? ON : OFF, transition: 'stroke .2s' })
  const inputs = unary ? [{ key: 'A', v: a, y: 80, flip: () => setA(1 - a) }] : [
    { key: 'A', v: a, y: 55, flip: () => setA(1 - a) },
    { key: 'B', v: b, y: 105, flip: () => setB(1 - b) },
  ]
  const rows = unary ? [[0, 0], [1, 0]] : [[0, 0], [0, 1], [1, 0], [1, 1]]

  return (
    <div className="@container w-full space-y-3">
      <div role="group" aria-label="Choose a gate" className="flex gap-1.5">
        {GATES.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={gate === g}
            onClick={() => setGate(g)}
            className={`btn-3d min-h-[40px] min-w-0 flex-1 rounded-xl border px-1 font-mono text-[13px] font-bold ${
              gate === g ? 'btn-3d-accent border-transparent bg-accent text-on-accent' : 'border-line bg-white text-muted'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-3 @xl:grid-cols-[minmax(0,1fr)_10rem]">
        <div className="min-w-0">
          <svg viewBox="0 0 360 160" className="h-auto w-full" role="img" aria-label={`${gate} gate: A ${a}${unary ? '' : `, B ${b}`}, output ${out}`}>
            {inputs.map((inp) => (
              <g key={inp.key}>
                <line x1="39" y1={inp.y} x2={shape.inX} y2={inp.y} strokeWidth="5" strokeLinecap="round" style={wire(inp.v)} />
                <text x="62" y={inp.y - 8} fontSize="12" fontWeight="700" fill="#6b6b76" fontFamily="ui-monospace, monospace">
                  {inp.v}
                </text>
                <g onClick={inp.flip} style={{ cursor: 'pointer' }}>
                  <circle
                    cx="26"
                    cy={inp.y}
                    r="14"
                    strokeWidth="2.5"
                    style={{ fill: inp.v ? ON : '#fff', stroke: inp.v ? ON : OFF, transition: 'fill .2s, stroke .2s' }}
                  />
                  <text x="26" y={inp.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="800" fill={inp.v ? '#fff' : INK}>
                    {inp.key}
                  </text>
                </g>
              </g>
            ))}

            <line x1={shape.outX} y1="80" x2="280" y2="80" strokeWidth="5" strokeLinecap="round" style={wire(out)} />
            <text x="242" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b6b76" fontFamily="ui-monospace, monospace">
              {out}
            </text>

            <path d={shape.body} fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            {shape.extra && <path d={shape.extra} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />}
            {shape.bubble && <circle cx={shape.bubble} cy="80" r="7" fill="#fff" stroke={INK} strokeWidth="3" />}
            <text x={shape.labelX} y="84.5" textAnchor="middle" fontSize={unary ? 11 : 13} fontWeight="800" fill="#6b6b76" fontFamily="ui-monospace, monospace">
              {gate}
            </text>

            {out === 1 && <circle cx="302" cy="80" r="31" style={{ fill: ON, opacity: 0.18 }} />}
            <circle
              cx="302"
              cy="80"
              r="21"
              strokeWidth="3"
              style={{ fill: out ? ON : '#fff', stroke: out ? ON : OFF, transition: 'fill .2s, stroke .2s' }}
            />
            <text x="302" y="86" textAnchor="middle" fontSize="17" fontWeight="800" fill={out ? '#fff' : '#a1a1aa'} fontFamily="ui-monospace, monospace">
              {out}
            </text>
            <text x="302" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b6b76" letterSpacing="1">
              OUT
            </text>
          </svg>

          <div className="mt-1 flex gap-2">
            <InputToggle label="A" value={a} onFlip={() => setA(1 - a)} />
            <InputToggle label="B" value={b} onFlip={() => setB(1 - b)} disabled={unary} />
          </div>
        </div>

        <table className="w-full table-fixed border-separate border-spacing-y-0.5 text-center font-mono text-[13px]">
          <caption className="pb-1 text-left font-sans text-[11px] font-bold uppercase tracking-wide text-faint">
            {gate} truth table
          </caption>
          <thead>
            <tr className="text-[11px] text-faint">
              <th className="py-1 font-bold">A</th>
              {!unary && <th className="py-1 font-bold">B</th>}
              <th className="py-1 font-bold">OUT</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([ra, rb]) => {
              const active = ra === a && (unary || rb === b)
              const cell = `py-1 first:rounded-l-lg last:rounded-r-lg ${active ? 'bg-accent-soft font-extrabold text-accent-ink' : 'bg-ink/[.03] text-muted'}`
              return (
                <tr
                  key={`${ra}${rb}`}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => {
                    setA(ra)
                    if (!unary) setB(rb)
                  }}
                  className="cursor-pointer"
                >
                  <td className={cell}>{ra}</td>
                  {!unary && <td className={cell}>{rb}</td>}
                  <td className={cell}>{gateOut(gate, ra, rb)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InputToggle({ label, value, onFlip, disabled }) {
  const on = value === 1 && !disabled
  return (
    <button
      type="button"
      aria-pressed={value === 1}
      aria-label={`Input ${label}: ${value}`}
      disabled={disabled}
      title={disabled ? 'NOT has only one input' : undefined}
      onClick={onFlip}
      className={`btn-3d flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border px-3 text-[13px] font-bold disabled:opacity-35 ${
        on ? 'btn-3d-accent border-transparent bg-accent text-on-accent' : 'border-line bg-white text-muted'
      }`}
    >
      <span>Input {label}</span>
      <span className="font-mono text-[20px] font-extrabold leading-none">{disabled ? '–' : value}</span>
    </button>
  )
}
