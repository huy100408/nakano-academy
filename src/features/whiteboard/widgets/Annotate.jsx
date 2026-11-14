import { useEffect, useRef, useState } from 'react'
import { Highlighter } from 'lucide-react'

const FAMILY_OF = {
  ethos: 'appeals',
  pathos: 'appeals',
  logos: 'appeals',
  metaphor: 'figurative',
  simile: 'figurative',
  personification: 'figurative',
  irony: 'figurative',
  imagery: 'figurative',
  alliteration: 'figurative',
  hyperbole: 'figurative',
  anaphora: 'structure',
  parallelism: 'structure',
  antithesis: 'structure',
  'rhetorical-question': 'structure',
  diction: 'structure',
  syntax: 'structure',
  thesis: 'argument',
  claim: 'argument',
  evidence: 'argument',
  commentary: 'argument',
  counterargument: 'argument',
}
// Full class strings so Tailwind picks them up.
const FAMILIES = {
  appeals: { label: 'Rhetorical appeal', active: 'bg-rose-200', found: 'bg-rose-100/80', chip: 'bg-rose-100 text-rose-800', bar: 'border-rose-400' },
  figurative: { label: 'Figurative language', active: 'bg-violet-200', found: 'bg-violet-100/80', chip: 'bg-violet-100 text-violet-800', bar: 'border-violet-400' },
  structure: { label: 'Structure & style', active: 'bg-sky-200', found: 'bg-sky-100/80', chip: 'bg-sky-100 text-sky-800', bar: 'border-sky-400' },
  argument: { label: 'Argument', active: 'bg-amber-200', found: 'bg-amber-100/80', chip: 'bg-amber-100 text-amber-800', bar: 'border-amber-400' },
}
const familyOf = (tag) => FAMILIES[FAMILY_OF[tag]] || FAMILIES.structure
const pretty = (tag) => {
  const s = String(tag).replace(/[-_]+/g, ' ').trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}
// Clauses may or may not carry their own spacing: add a space only where words would run together.
const needsSpace = (prev, cur) => prev && !/\s$/.test(prev) && !/^[\s,.;:!?)\]}'"’”…-]/.test(cur)

/** Literary annotation board. Value: { picked: tag of the last clause clicked | null, foundCount }. */
export default function Annotate({ props = {}, onChange }) {
  const passage = Array.isArray(props.passage) ? props.passage.filter((c) => c && typeof c.text === 'string') : []
  const passageKey = JSON.stringify(passage)
  const [selected, setSelected] = useState(null) // clause index
  const [found, setFound] = useState(() => new Set())
  const [seenKey, setSeenKey] = useState(passageKey)
  if (seenKey !== passageKey) {
    setSeenKey(passageKey)
    setSelected(null)
    setFound(new Set())
  }

  const picked = selected === null ? null : passage[selected]?.tag ?? null
  const foundCount = found.size
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  useEffect(() => {
    onChangeRef.current?.({ picked, foundCount })
  }, [picked, foundCount])

  const total = passage.filter((c) => c.tag).length
  const pick = (i) => {
    setSelected(i)
    setFound((f) => (f.has(i) ? f : new Set(f).add(i)))
  }

  if (!passage.length) return <p className="py-8 text-center text-[13px] text-muted">No passage to annotate.</p>

  const cur = selected === null ? null : passage[selected]
  const fam = cur ? familyOf(cur.tag) : null

  return (
    <div className="w-full min-w-0 space-y-3">
      <div className="flex items-center justify-between gap-2 text-[12px] font-semibold text-muted">
        <span className="flex items-center gap-1.5">
          <Highlighter size={14} /> Tap an underlined phrase to annotate it.
        </span>
        <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 font-bold text-accent-ink" aria-live="polite">
          {foundCount} / {total} found
        </span>
      </div>

      <div className="ruled scroll-thin relative max-h-[248px] overflow-y-auto rounded-2xl border border-line bg-[#fffdf8] bg-local py-8 pl-11 pr-4 shadow-[inset_0_1px_0_rgb(255_255_255)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-8 w-px bg-rose-300/70" />
        <p className="font-serif text-[15.5px] leading-[32px] text-ink">
          {passage.map((c, i) => {
            const space = needsSpace(passage[i - 1]?.text, c.text) ? ' ' : ''
            if (!c.tag) {
              return (
                <span key={i}>
                  {space}
                  {c.text}
                </span>
              )
            }
            const f = familyOf(c.tag)
            const isSel = selected === i
            const isFound = found.has(i)
            return (
              <span key={i}>
                {space}
                <span
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSel}
                  aria-label={isFound ? `${c.text} (${pretty(c.tag)})` : undefined}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      pick(i)
                    }
                  }}
                  className={`box-decoration-clone cursor-pointer rounded-[5px] px-0.5 underline decoration-dotted decoration-[1.5px] underline-offset-[5px] transition-colors ${
                    isSel ? `${f.active} decoration-ink/50` : isFound ? `${f.found} decoration-ink/30` : 'decoration-ink/40 hover:bg-ink/[.05]'
                  }`}
                >
                  {c.text}
                </span>
              </span>
            )
          })}
        </p>
      </div>

      {cur ? (
        <div key={selected} className={`anim-fade-up rounded-xl border border-l-4 border-line bg-white px-3.5 py-2.5 ${fam.bar}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[15px] font-extrabold text-ink">{pretty(cur.tag)}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${fam.chip}`}>{fam.label}</span>
          </div>
          <p className="mt-1 text-[13px] leading-snug text-muted">{cur.note || 'No note for this one. What effect does it have on the reader?'}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line px-3.5 py-3 text-[12.5px] text-faint">Your annotation note appears here.</div>
      )}
    </div>
  )
}
