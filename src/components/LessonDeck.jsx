import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Lock, RotateCw, Sparkles, Utensils } from 'lucide-react'
import { Eyebrow, Kbd } from './ui.jsx'

export default function LessonDeck({ s, energy, setEnergy, say }) {
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  const [deep, setDeep] = useState({})
  const card = s.cards[i]
  const hungry = s.id === 'itsuki'

  const go = (d) => {
    setFlip(false)
    setI((x) => (x + d + s.cards.length) % s.cards.length)
    say('teaching')
  }

  const openDeep = () => {
    if (deep[i]) return
    if (hungry) {
      if (energy <= 0) {
        say('scolding', 'I... cannot explain further on an empty stomach. A curry bun, please.')
        return
      }
      setEnergy(energy - 1)
    }
    setDeep((d) => ({ ...d, [i]: true }))
    say('teaching', hungry ? 'Very well. Here is the deeper note. It will be on the exam.' : 'Here is the deeper note. This is the part people forget on tests.')
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input,textarea')) return
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === ' ') {
        e.preventDefault()
        setFlip((f) => !f)
      } else if (e.key.toLowerCase() === 'd') openDeep()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="anim-fade-up flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>
          Concept {i + 1} of {s.cards.length}
        </Eyebrow>
        <div className="flex gap-1.5">
          {s.cards.map((_, k) => (
            <button
              key={k}
              onClick={() => {
                setFlip(false)
                setI(k)
              }}
              aria-label={`Card ${k + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{ width: k === i ? 22 : 8, background: k === i ? s.color : 'rgb(24 24 29 / .12)' }}
            />
          ))}
        </div>
      </div>

      <div className="flip cursor-pointer" onClick={() => setFlip((f) => !f)}>
        <div className={`flip-inner ${flip ? 'on' : ''}`}>
          <div className="ruled relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-7 text-center">
            <span className="absolute left-5 top-4 font-mono text-[11px] font-semibold text-faint">
              {s.no}-{String(i + 1).padStart(2, '0')}
            </span>
            <span className="absolute left-0 top-0 h-full w-1.5" style={{ background: s.color }} />
            <Eyebrow className="mb-2">{s.topic}</Eyebrow>
            <h3 className="font-display text-[28px] font-extrabold leading-tight tracking-tight" style={{ color: s.ink }}>
              {card.front}
            </h3>
            <div className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-faint">
              <RotateCw size={12} /> Click or press <Kbd>Space</Kbd> to flip
            </div>
          </div>
          <div className="back flex min-h-[300px] flex-col items-center justify-center rounded-2xl border p-7 text-center" style={{ background: `color-mix(in oklab, ${s.color} 10%, white)`, borderColor: `color-mix(in oklab, ${s.color} 35%, white)` }}>
            <Eyebrow className="mb-3">{card.front}</Eyebrow>
            <p className="whitespace-pre-line font-display text-[19px] font-bold leading-relaxed text-ink">{card.back}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-dashed p-4" style={{ borderColor: `color-mix(in oklab, ${s.color} 50%, white)` }}>
        {deep[i] ? (
          <div className="anim-fade-up flex gap-3">
            <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: s.ink }} />
            <p className="text-[14px] leading-relaxed text-ink/85">
              <span className="font-bold" style={{ color: s.ink }}>
                Deep note ·{' '}
              </span>
              {card.deep}
            </p>
          </div>
        ) : (
          <button onClick={openDeep} className="flex w-full items-center gap-3 text-left text-[13.5px] font-semibold text-muted transition hover:text-ink">
            {hungry ? <Lock size={16} /> : <BookOpen size={16} />}
            <span className="flex-1">{hungry ? `Unlock the deep note · costs 1 energy (you have ${energy})` : 'Reveal the deep note'}</span>
            <Kbd>D</Kbd>
          </button>
        )}
      </div>

      {hungry && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-accent-softer px-4 py-3">
          <div>
            <Eyebrow>Itsuki’s energy</Eyebrow>
            <div className="mt-1 flex gap-1">
              {[0, 1, 2].map((k) => (
                <span key={k} className={`h-2 w-7 rounded-full transition ${k < energy ? 'bg-accent' : 'bg-ink/10'}`} />
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setEnergy(3)
              say('praising', 'Mmm! A curry bun... Fully recharged. Thank you. Let us continue.')
            }}
            disabled={energy >= 3}
            className="ml-auto flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2 text-[13px] font-bold text-on-accent shadow-sm transition hover:brightness-105 disabled:opacity-40"
          >
            <Utensils size={14} /> Feed meat bun / curry
          </button>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-4">
        <button onClick={() => go(-1)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink">
          <ArrowLeft size={15} /> Previous
        </button>
        <span className="hidden items-center gap-1 text-[11.5px] text-faint sm:flex">
          <Kbd>←</Kbd> <Kbd>→</Kbd> to browse
        </span>
        <button onClick={() => go(1)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink">
          Next <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
