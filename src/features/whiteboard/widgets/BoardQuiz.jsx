import { useEffect, useState } from 'react'

/** Multiple-choice question drawn on the whiteboard. Value: { choice }. */
export default function BoardQuiz({ props = {}, onChange }) {
  const { q, options = [] } = props
  const [choice, setChoice] = useState(null)
  useEffect(() => onChange?.({ choice }), [choice]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="space-y-3">
      <p className="text-[15.5px] font-semibold leading-snug text-ink">{q}</p>
      <div className="grid gap-2">
        {options.map((o, i) => (
          <button
            key={i}
            onClick={() => setChoice(i)}
            className={`btn-3d flex min-h-[46px] items-center gap-3 rounded-xl border-[1.5px] px-3.5 py-2 text-left text-[14px] font-medium ${
              choice === i ? 'border-accent bg-accent-soft' : 'border-line bg-white'
            }`}
          >
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[12px] font-bold ${choice === i ? 'bg-accent text-on-accent' : 'bg-ink/[.05] text-muted'}`}>
              {'ABCD'[i]}
            </span>
            <span className="flex-1">{o}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
