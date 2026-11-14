import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'

const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1]
const NIBBLES = [
  { name: 'High nibble', weights: WEIGHTS.slice(0, 4), shift: 4 },
  { name: 'Low nibble', weights: WEIGHTS.slice(4), shift: 0 },
]

const toByte = (v) => {
  const n = Math.round(Number(v))
  return Number.isFinite(n) ? Math.min(255, Math.max(0, n)) : 0
}
const hexOf = (d) => d.toString(16).toUpperCase().padStart(2, '0')
const binOf = (d) => d.toString(2).padStart(8, '0')

/** 8-bit flipper. Value: { decimal: 0-255, hex: 'XX', binary: '00000000' }. */
export default function Binary({ props = {}, onChange }) {
  const start = toByte(props.start ?? 0)
  const showHex = !!props.showHex
  const [decimal, setDecimal] = useState(start)

  // A later beat can hand the same widget a new start value: reset to it.
  const [prevStart, setPrevStart] = useState(start)
  if (start !== prevStart) {
    setPrevStart(start)
    setDecimal(start)
  }

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.({ decimal, hex: hexOf(decimal), binary: binOf(decimal) })
  }, [decimal])

  const onWeights = WEIGHTS.filter((w) => (decimal & w) !== 0)
  const expression = onWeights.length ? `${onWeights.join(' + ')} = ${decimal}` : 'all bits off = 0'

  return (
    <div className="@container w-full space-y-3">
      <div className="flex flex-col gap-2 @sm:flex-row">
        {NIBBLES.map((nib) => {
          const nibValue = (decimal >> nib.shift) & 15
          return (
            <div
              key={nib.name}
              className={`flex-1 rounded-2xl ${showHex ? 'border border-line bg-white/60 p-1.5' : ''}`}
            >
              <div className="grid grid-cols-4 gap-1.5">
                {nib.weights.map((w) => {
                  const on = (decimal & w) !== 0
                  return (
                    <button
                      key={w}
                      type="button"
                      aria-pressed={on}
                      aria-label={`${w}s bit, ${on ? 'on' : 'off'}`}
                      onClick={() => setDecimal((d) => d ^ w)}
                      className={`btn-3d flex min-h-[58px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-0.5 py-1.5 transition-colors ${
                        on ? 'btn-3d-accent border-transparent bg-accent text-on-accent' : 'border-line bg-white text-muted'
                      }`}
                    >
                      <span className="text-[11px] font-bold tabular-nums opacity-80">{w}</span>
                      <span className="font-mono text-[26px] font-extrabold leading-none">{on ? 1 : 0}</span>
                    </button>
                  )
                })}
              </div>
              {showHex && (
                <div className="mt-1.5 flex items-center justify-between gap-2 px-1.5 pb-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-faint">{nib.name}</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="font-mono text-[13px] text-muted">{nibValue.toString(2).padStart(4, '0')}</span>
                    <span className="text-[12px] text-faint">→</span>
                    <span className="font-mono text-[20px] font-extrabold text-accent-ink">
                      {nibValue.toString(16).toUpperCase()}
                    </span>
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl bg-accent-softer px-3 py-2.5">
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 break-words font-mono text-[14.5px] font-semibold text-ink" aria-live="polite">
            {expression}
          </p>
          <button
            type="button"
            onClick={() => setDecimal(0)}
            disabled={decimal === 0}
            className="btn-3d flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-[12.5px] font-bold text-muted disabled:opacity-40"
          >
            <RotateCcw size={14} aria-hidden="true" /> Clear
          </button>
        </div>
        <div className={`mt-2 grid gap-2 ${showHex ? 'grid-cols-2 @sm:grid-cols-3' : 'grid-cols-2'}`}>
          <Readout label="Decimal" value={decimal} />
          {/* With hex on a narrow board, the binary string takes its own full-width row so it never truncates. */}
          <Readout
            label="Binary"
            value={binOf(decimal)}
            small
            className={showHex ? 'order-last col-span-2 @sm:order-none @sm:col-span-1' : ''}
          />
          {showHex && <Readout label="Hex" value={`0x${hexOf(decimal)}`} />}
        </div>
      </div>
    </div>
  )
}

function Readout({ label, value, small, className = '' }) {
  return (
    <div className={`min-w-0 rounded-xl bg-white px-2.5 py-1.5 ${className}`}>
      <div className="text-[10.5px] font-bold uppercase tracking-wide text-faint">{label}</div>
      <div
        className={`truncate font-mono font-extrabold tabular-nums text-ink ${small ? 'text-[16px] leading-[28px]' : 'text-[22px] leading-[28px]'}`}
      >
        {value}
      </div>
    </div>
  )
}
