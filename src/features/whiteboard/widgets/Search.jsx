import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, ChevronRight, RotateCcw, XCircle } from 'lucide-react'

const DEFAULT_ARRAY = [3, 8, 12, 17, 23, 31, 42, 56, 64, 77, 89]
const MODES = [
  { id: 'binary', label: 'Binary' },
  { id: 'linear', label: 'Linear' },
]

const cleanArray = (arr) => {
  const nums = Array.isArray(arr) ? arr.map(Number).filter(Number.isFinite) : []
  return nums.length ? nums : DEFAULT_ARRAY
}
const normMode = (m) => (m === 'linear' ? 'linear' : 'binary')

// Stepper state. Binary: [low, high] is the live range; `last` is the index compared most recently.
// Linear: `i` is the next index to compare.
const freshRun = (n) => ({ low: 0, high: n - 1, i: 0, last: null, cmp: null, steps: 0, found: false, done: n === 0 })

function step(run, mode, arr, target) {
  if (run.done) return run
  const steps = run.steps + 1
  if (mode === 'binary') {
    const mid = Math.floor((run.low + run.high) / 2)
    const v = arr[mid]
    if (v === target) return { ...run, last: mid, cmp: 'eq', steps, found: true, done: true }
    if (v < target) {
      const low = mid + 1
      return { ...run, low, last: mid, cmp: 'lt', steps, done: low > run.high }
    }
    const high = mid - 1
    return { ...run, high, last: mid, cmp: 'gt', steps, done: run.low > high }
  }
  const i = run.i
  if (arr[i] === target) return { ...run, last: i, cmp: 'eq', steps, found: true, done: true }
  return { ...run, i: i + 1, last: i, cmp: 'ne', steps, done: i + 1 >= arr.length }
}

function statusText(run, mode, arr, target) {
  const n = arr.length
  if (run.last === null) {
    return mode === 'binary'
      ? `low = 0, high = ${n - 1}. Press Step to compare the middle element with ${target}.`
      : `i = 0. Press Step to compare each element with ${target}, left to right.`
  }
  const k = run.last
  const v = arr[k]
  if (run.cmp === 'eq') return `Compared index ${k}: ${v} = ${target}.`
  if (mode === 'binary') {
    const tail = run.done
      ? ' low is now past high, so nothing is left to search.'
      : run.cmp === 'lt'
        ? ` Discard the left half: low = ${run.low}.`
        : ` Discard the right half: high = ${run.high}.`
    return `Compared index ${k} (mid): ${v} ${run.cmp === 'lt' ? '<' : '>'} ${target}.${tail}`
  }
  return `Compared index ${k}: ${v} ≠ ${target}.${run.done ? ' That was the last element.' : ` Move on: i = ${run.i}.`}`
}

/** Binary / linear search stepper. Value: { mode, picked: index|null, steps: int, found: boolean }. */
export default function Search({ props = {}, onChange }) {
  const arrKey = JSON.stringify(props.array ?? null)
  const arr = useMemo(() => cleanArray(props.array), [arrKey]) // eslint-disable-line react-hooks/exhaustive-deps
  const target = Number.isFinite(Number(props.target)) && props.target !== null && props.target !== '' ? Number(props.target) : arr[0]
  const startMode = normMode(props.mode)
  const n = arr.length

  const [mode, setMode] = useState(startMode)
  const [run, setRun] = useState(() => freshRun(n))
  const [picked, setPicked] = useState(null)

  // A later beat can swap the array, target or mode: start over.
  const sig = `${arrKey}|${target}|${startMode}`
  const [prevSig, setPrevSig] = useState(sig)
  if (sig !== prevSig) {
    setPrevSig(sig)
    setMode(startMode)
    setRun(freshRun(n))
    setPicked(null)
  }

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.({ mode, picked, steps: run.steps, found: run.found })
  }, [mode, picked, run.steps, run.found])

  const switchMode = (m) => {
    if (m === mode) return
    setMode(m)
    setRun(freshRun(n))
  }
  const reset = () => {
    setRun(freshRun(n))
    setPicked(null)
  }

  const rangeLive = mode === 'binary' && run.low <= run.high && !(run.done && !run.found)
  const cellState = (k) => {
    if (run.found && k === run.last) return 'found'
    if (mode === 'binary') {
      if (k < run.low || k > run.high) return 'out'
      return 'in'
    }
    if (k < run.i || (run.done && !run.found)) return 'out'
    return 'in'
  }
  const pointers = (k) => {
    const list = []
    if (mode === 'binary') {
      if (rangeLive && k === run.low) list.push({ t: 'low', strong: false })
      if (run.last === k) list.push({ t: 'mid', strong: true })
      if (rangeLive && k === run.high) list.push({ t: 'high', strong: false })
    } else {
      const at = run.found ? run.last : run.done ? null : run.i
      if (at === k) list.push({ t: 'i', strong: true })
    }
    return list
  }

  return (
    <div className="@container w-full space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Search algorithm" className="flex gap-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => switchMode(m.id)}
              className={`btn-3d min-h-[40px] rounded-xl border px-3 text-[13px] font-bold ${
                mode === m.id ? 'btn-3d-accent border-transparent bg-accent text-on-accent' : 'border-line bg-white text-muted'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-bold text-accent-ink">
          Target <span className="font-mono">{target}</span>
        </span>
        <div className="ml-auto flex gap-1.5">
          <button
            type="button"
            onClick={() => setRun((r) => step(r, mode, arr, target))}
            disabled={run.done}
            className="btn-3d btn-3d-accent flex min-h-[40px] items-center gap-1 rounded-xl bg-accent px-3.5 text-[13px] font-bold text-on-accent disabled:opacity-40"
          >
            Step <ChevronRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset"
            className="btn-3d flex min-h-[40px] min-w-[40px] items-center justify-center gap-1 rounded-xl border border-line bg-white px-2.5 text-[13px] font-bold text-muted"
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span className="hidden @sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="scroll-thin overflow-x-auto pb-1">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(40px, 1fr))` }}>
          {arr.map((v, k) => {
            const state = cellState(k)
            const isPicked = picked === k
            const fill = state === 'found' ? 'bg-good text-white' : state === 'out' ? 'bg-ink/[.04] text-faint' : 'bg-white text-ink'
            // The cell compared most recently gets a dashed border (one border-colour class only, so nothing conflicts).
            const edge = state === 'found' ? 'border-transparent' : run.last === k ? 'border-dashed border-ink/40' : 'border-line'
            return (
              <div key={k} className="flex min-w-0 flex-col gap-1">
                <button
                  type="button"
                  aria-pressed={isPicked}
                  aria-label={`Index ${k}, value ${v}`}
                  onClick={() => setPicked(k)}
                  className={`btn-3d flex min-h-[54px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border px-0.5 transition-colors ${fill} ${edge} ${
                    isPicked ? 'outline-3 outline-offset-2 outline-accent' : ''
                  }`}
                >
                  <span className={`text-[10px] font-bold tabular-nums ${state === 'found' ? 'text-white/80' : 'text-faint'}`}>{k}</span>
                  <span className="font-mono text-[15px] font-bold tabular-nums">{v}</span>
                </button>
                <div className="flex min-h-[44px] flex-col items-center gap-0.5">
                  {pointers(k).map((p) => (
                    <span
                      key={p.t}
                      className={`rounded px-1 text-[10px] font-bold leading-[13px] ${
                        p.strong ? 'bg-accent text-on-accent' : 'bg-ink text-white'
                      }`}
                    >
                      {p.t}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[12.5px]">
        <span className="font-bold text-ink">
          Comparisons: <span className="font-mono tabular-nums">{run.steps}</span>
        </span>
        <span className="text-muted">
          {picked === null ? 'Tap a cell to pick an index.' : `Picked index ${picked} (value ${arr[picked]}).`}
        </span>
      </div>

      {run.found ? (
        <div className="flex items-center gap-2 rounded-xl bg-good/10 px-3 py-2.5 text-[13.5px] font-bold text-good" aria-live="polite">
          <CheckCircle2 size={18} aria-hidden="true" />
          Found {target} at index {run.last} after {run.steps} comparison{run.steps === 1 ? '' : 's'}.
        </div>
      ) : run.done && n > 0 ? (
        <div className="flex items-center gap-2 rounded-xl bg-warn/15 px-3 py-2.5 text-[13.5px] font-bold text-ink" aria-live="polite">
          <XCircle size={18} className="text-warn" aria-hidden="true" />
          {target} is not in the array ({run.steps} comparison{run.steps === 1 ? '' : 's'}).
        </div>
      ) : (
        <p className="rounded-xl bg-accent-softer px-3 py-2.5 text-[13px] text-muted" aria-live="polite">
          {statusText(run, mode, arr, target)}
        </p>
      )}
    </div>
  )
}
