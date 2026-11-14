import { useEffect, useRef, useState } from 'react'
import { Check, Minus, Plus, RotateCcw } from 'lucide-react'

const PRESETS = ['H2 + O2 -> H2O', 'CH4 + O2 -> CO2 + H2O', 'N2 + H2 -> NH3', 'Fe + O2 -> Fe2O3', 'C3H8 + O2 -> CO2 + H2O']
const MIN = 1
const MAX = 12

// --- chemistry ---
// "Fe2O3" -> { Fe: 2, O: 3 }; also handles groups like "Ca(OH)2".
function parseFormula(formula) {
  const f = String(formula).trim()
  let i = 0
  const count = () => {
    let digits = ''
    while (i < f.length && f[i] >= '0' && f[i] <= '9') digits += f[i++]
    return digits ? parseInt(digits, 10) : 1
  }
  const group = () => {
    const out = {}
    const add = (el, n) => {
      out[el] = (out[el] || 0) + n
    }
    while (i < f.length) {
      const ch = f[i]
      if (ch === '(') {
        i++
        const inner = group()
        i++ // skip ')'
        const n = count()
        for (const el of Object.keys(inner)) add(el, inner[el] * n)
      } else if (ch === ')') {
        break
      } else if (ch >= 'A' && ch <= 'Z') {
        let el = ch
        i++
        while (i < f.length && f[i] >= 'a' && f[i] <= 'z') el += f[i++]
        add(el, count())
      } else {
        i++
      }
    }
    return out
  }
  return group()
}

// "H2 + O2 -> H2O" -> { left: ['H2', 'O2'], right: ['H2O'] }
function parseEquation(eq) {
  const [l = '', r = ''] = String(eq).split(/->|→|=/)
  const side = (s) => s.split('+').map((x) => x.trim()).filter(Boolean)
  return { left: side(l), right: side(r) }
}

// Per-element atom totals on each side, elements in order of first appearance.
function tally(eq, coefficients) {
  const { left, right } = parseEquation(eq)
  const species = [...left, ...right]
  const order = []
  const sums = { left: {}, right: {} }
  species.forEach((f, idx) => {
    const sideKey = idx < left.length ? 'left' : 'right'
    const atoms = parseFormula(f)
    for (const el of Object.keys(atoms)) {
      if (!order.includes(el)) order.push(el)
      sums[sideKey][el] = (sums[sideKey][el] || 0) + atoms[el] * (coefficients[idx] ?? 1)
    }
  })
  return order.map((el) => ({ el, left: sums.left[el] || 0, right: sums.right[el] || 0 }))
}

function isBalanced(eq, coefficients) {
  if (!coefficients.every((c) => Number.isInteger(c) && c >= 1)) return false
  const rows = tally(eq, coefficients)
  return rows.length > 0 && rows.every((r) => r.left === r.right)
}
// --- end chemistry ---

function init(props) {
  const raw = typeof props.equation === 'string' ? props.equation.trim() : ''
  const parsed = raw && parseEquation(raw)
  const ok = parsed && parsed.left.length > 0 && parsed.right.length > 0
  const equation = ok ? raw : PRESETS[0]
  const { left, right } = parseEquation(equation)
  return { equation, coefs: Array(left.length + right.length).fill(1) }
}

function Formula({ f }) {
  return (
    <span>
      {f
        .split(/(\d+)/)
        .filter(Boolean)
        .map((part, i) =>
          /^\d+$/.test(part) ? (
            <sub key={i} className="text-[0.66em]">
              {part}
            </sub>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
    </span>
  )
}

/** Equation balancer. Value: { equation, coefficients: '2,1,2' (left→right), balanced }. */
export default function Balancer({ props = {}, onChange }) {
  const propsKey = String(props.equation ?? '')
  const [state, setState] = useState(() => init(props))
  const [seenKey, setSeenKey] = useState(propsKey)
  if (seenKey !== propsKey) {
    setSeenKey(propsKey)
    setState(init(props))
  }

  const { equation, coefs } = state
  const { left, right } = parseEquation(equation)
  const rows = tally(equation, coefs)
  const balanced = isBalanced(equation, coefs)
  const coefficients = coefs.join(',')

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.({ equation, coefficients, balanced })
  }, [equation, coefficients, balanced])

  const step = (idx, d) =>
    setState((s) => ({ ...s, coefs: s.coefs.map((c, i) => (i === idx ? Math.min(MAX, Math.max(MIN, c + d)) : c)) }))
  const reset = () => setState((s) => ({ ...s, coefs: s.coefs.map(() => 1) }))
  const choose = (eq) => setState(init({ equation: eq }))

  const btn =
    'btn-3d grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink disabled:cursor-not-allowed disabled:opacity-40'
  const card = (f, idx) => (
    <div key={idx} className="flex flex-col items-center gap-1 rounded-2xl border border-line bg-white px-1.5 py-2">
      <div className="flex items-center gap-1">
        <button type="button" aria-label={`Decrease coefficient of ${f}`} disabled={coefs[idx] <= MIN} onClick={() => step(idx, -1)} className={btn}>
          <Minus size={15} strokeWidth={2.6} />
        </button>
        <span className="w-7 text-center font-mono text-[20px] font-extrabold text-accent-ink" aria-label={`coefficient ${coefs[idx]}`}>
          {coefs[idx]}
        </span>
        <button type="button" aria-label={`Increase coefficient of ${f}`} disabled={coefs[idx] >= MAX} onClick={() => step(idx, 1)} className={btn}>
          <Plus size={15} strokeWidth={2.6} />
        </button>
      </div>
      <div className="font-display text-[19px] font-bold leading-tight text-ink">
        {coefs[idx] > 1 && <span className="text-accent-ink">{coefs[idx]}</span>}
        <Formula f={f} />
      </div>
    </div>
  )
  const joiner = (sym, key) => (
    <span key={key} className="px-0.5 font-display text-[20px] font-bold text-muted" aria-hidden="true">
      {sym}
    </span>
  )

  return (
    <div className="w-full min-w-0 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {props.equation ? (
          <span className="text-[12px] font-semibold text-muted">Set the coefficients so atoms are conserved.</span>
        ) : (
          <select
            value={equation}
            onChange={(e) => choose(e.target.value)}
            aria-label="Equation"
            className="min-h-9 rounded-lg border border-line bg-white px-2 text-[13px] font-semibold text-ink"
          >
            {PRESETS.map((p) => (
              <option key={p} value={p}>
                {p.replace('->', '→')}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={reset}
          className="btn-3d inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-[12px] font-bold text-ink"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {left.flatMap((f, i) => (i ? [joiner('+', `pl${i}`), card(f, i)] : [card(f, i)]))}
        {joiner('→', 'arrow')}
        {right.flatMap((f, j) => {
          const idx = left.length + j
          return j ? [joiner('+', `pr${j}`), card(f, idx)] : [card(f, idx)]
        })}
      </div>

      <table className="w-full overflow-hidden rounded-xl border border-line text-[13px]">
        <thead>
          <tr className="bg-ink/[.04] text-left text-[11.5px] font-bold uppercase tracking-wide text-muted">
            <th className="px-3 py-1.5">Element</th>
            <th className="px-3 py-1.5 text-center">Reactants</th>
            <th className="px-3 py-1.5 text-center">Products</th>
            <th className="w-8 px-2 py-1.5" aria-label="Equal" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ok = r.left === r.right
            return (
              <tr key={r.el} className={`border-t border-line transition-colors ${ok ? 'bg-good/10 text-good' : 'text-ink'}`}>
                <td className="px-3 py-1.5 font-display font-bold">{r.el}</td>
                <td className="px-3 py-1.5 text-center font-mono font-bold">{r.left}</td>
                <td className="px-3 py-1.5 text-center font-mono font-bold">{r.right}</td>
                <td className="px-2 py-1.5 text-center">{ok ? <Check size={15} strokeWidth={3} className="inline" /> : <span className="text-faint">≠</span>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div
        aria-live="polite"
        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold ${
          balanced ? 'bg-good/10 text-good' : 'bg-accent-softer text-muted'
        }`}
      >
        {balanced ? <Check size={16} strokeWidth={3} /> : null}
        {balanced ? 'Balanced: the same atoms on both sides.' : 'Not balanced yet. Change the coefficients, never the subscripts.'}
      </div>
    </div>
  )
}
