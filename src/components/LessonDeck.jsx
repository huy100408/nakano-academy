import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Lightbulb, RotateCw, Sparkles } from 'lucide-react'
import { MODULES } from '../data/curriculum.js'
import { Eyebrow, Kbd } from './ui.jsx'
import { playPop } from '../services/sfxEngine'

export default function LessonDeck({ s, say }) {
  const cards = MODULES[s.subj].flashcards
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  const card = cards[i]

  const go = (d) => {
    setFlip(false)
    setI((x) => (x + d + cards.length) % cards.length)
    say('teaching')
  }
  const toggle = () => {
    playPop()
    setFlip((f) => !f)
    if (!flip) say('teaching', card.hook)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input,textarea,button') && e.key === ' ') return
      if (e.target.closest?.('input,textarea')) return
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === ' ') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="anim-fade-up flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>
          Flashcard {i + 1} of {cards.length}
        </Eyebrow>
        <div className="flex gap-1">
          {cards.map((_, k) => (
            <button
              key={k}
              onClick={() => {
                setFlip(false)
                setI(k)
              }}
              aria-label={`Card ${k + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{ width: k === i ? 20 : 7, background: k === i ? s.color : 'rgb(24 24 29 / .12)' }}
            />
          ))}
        </div>
      </div>

      <div className="flip cursor-pointer" onClick={toggle}>
        <div className={`flip-inner ${flip ? 'on' : ''}`}>
          <div className="ruled relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-7 text-center">
            <span className="absolute left-5 top-4 font-mono text-[11px] font-semibold text-faint">{card.id}</span>
            <span className="absolute left-0 top-0 h-full w-1.5" style={{ background: s.color }} />
            <Eyebrow className="mb-2">{s.topic}</Eyebrow>
            <h3 className="font-display text-[clamp(22px,3vw,28px)] font-extrabold leading-tight tracking-tight" style={{ color: s.ink }}>
              {card.front}
            </h3>
            <div className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-faint">
              <RotateCw size={12} /> Tap or press <Kbd>Space</Kbd> to flip
            </div>
          </div>
          <div
            className="back flex min-h-[300px] flex-col justify-center gap-4 rounded-2xl border p-6 text-left"
            style={{ background: `color-mix(in oklab, ${s.color} 9%, white)`, borderColor: `color-mix(in oklab, ${s.color} 35%, white)` }}
          >
            <p className="whitespace-pre-line text-center font-display text-[18px] font-bold leading-relaxed text-ink">{card.back}</p>
            <div className="flex gap-2.5 rounded-xl bg-white/80 px-3.5 py-2.5 text-[13.5px] leading-snug">
              <Lightbulb size={16} className="mt-0.5 shrink-0" style={{ color: s.ink }} />
              <span>
                <b>Key takeaway:</b> {card.takeaway}
              </span>
            </div>
            <div className="flex gap-2.5 rounded-xl bg-white/80 px-3.5 py-2.5 text-[13.5px] leading-snug">
              <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: s.ink }} />
              <span>
                <b>Memory hook:</b> {card.hook}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <button onClick={() => go(-1)} className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-[13px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink">
          <ArrowLeft size={15} /> Previous
        </button>
        <span className="hidden items-center gap-1 text-[11.5px] text-faint sm:flex">
          <Kbd>←</Kbd> <Kbd>→</Kbd> browse
        </span>
        <button onClick={() => go(1)} className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-[13px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink">
          Next <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
