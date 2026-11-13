import { useState } from 'react'
import { ArrowRight, BookOpenText, Check, MessageCircle, PersonStanding, RotateCcw, X } from 'lucide-react'
import { EGG_ROUNDS, SISTERS, byId } from '../data/sisters.js'
import { Avatar, Eyebrow, asset, shuffle } from './ui.jsx'

const ROUNDS = 5

export default function EggsView({ dispatch }) {
  const [rounds, setRounds] = useState(() => shuffle(EGG_ROUNDS).slice(0, ROUNDS))
  const [i, setI] = useState(0)
  const [guess, setGuess] = useState(null)
  const [hits, setHits] = useState([])
  const done = i >= rounds.length
  const r = rounds[i]
  const score = hits.length

  const choose = (id) => {
    if (guess) return
    setGuess(id)
    if (id === r.who) {
      setHits((h) => [...h, r.who])
      dispatch({ type: 'affection', sister: r.who, by: 3 })
    }
  }
  const next = () => {
    if (i + 1 >= rounds.length) dispatch({ type: 'eggs', score })
    setI(i + 1)
    setGuess(null)
  }
  const again = () => {
    setRounds(shuffle(EGG_ROUNDS).slice(0, ROUNDS))
    setI(0)
    setGuess(null)
    setHits([])
  }

  const verdict =
    score === ROUNDS
      ? '“...Love. That’s how I tell them apart. Don’t make me say it twice.”'
      : score >= 3
        ? '“Not bad. You’re starting to see them as five different people.”'
        : '“Idiot. They’re five different people. Look closer.”'

  return (
    <div className="flex h-full flex-col" style={{ '--accent': '#EF4444', '--accent-ink': '#991B1B', '--on-accent': '#fff' }}>
      <header className="drag win-controls-pad px-4 pb-5 pt-6 sm:px-8 sm:pt-7">
        <Eyebrow>Bonus mode · Love Recognition Test</Eyebrow>
        <h1 className="mt-1 font-display text-[30px] font-extrabold leading-none tracking-tight">Scrambled Eggs</h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted">
          All five sisters are dressed as Itsuki: same hair, same star pins. Name the sister from her subject hint, speech pattern and posture habit.
        </p>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-8">
        {done ? (
          <div className="card anim-pop mx-auto max-w-xl p-10 text-center">
            <Eyebrow>Final result</Eyebrow>
            <div className="mt-2 font-display text-[64px] font-extrabold leading-none">
              {score}
              <span className="text-[28px] text-faint">/{ROUNDS}</span>
            </div>
            <p className="mt-4 text-[15px] font-medium">{verdict}</p>
            <p className="mt-1 text-[12.5px] text-muted">— Fuutarou Uesugi · each correct ID gave that sister +3 affection</p>
            <div className="mt-6 flex justify-center gap-2">
              {SISTERS.map((s) => (
                <div key={s.id} className={`transition ${hits.includes(s.id) ? '' : 'opacity-30 grayscale'}`}>
                  <Avatar s={s} size={44} ring={hits.includes(s.id)} />
                </div>
              ))}
            </div>
            <button onClick={again} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[14px] font-bold text-white hover:bg-ink/85">
              <RotateCcw size={15} /> Play again
            </button>
          </div>
        ) : (
          <div key={i} className="anim-fade-up grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(400px,1fr)]">
            <div className="relative aspect-video overflow-hidden rounded-[22px] bg-ink shadow-lift">
              <img src={asset('videos/itsuki-poster.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: guess ? 'none' : 'saturate(.35) brightness(.7) blur(2px)' }} />
              {!guess && <div className="absolute inset-0 grid place-items-center font-display text-[140px] font-extrabold text-white/85 drop-shadow-[0_6px_30px_rgb(0_0_0/.5)]">?</div>}
              {guess && (
                <div className="anim-pop absolute inset-0 grid place-items-center bg-black/40">
                  <div className="flex flex-col items-center text-white">
                    <Avatar s={byId(r.who)} size={110} ring />
                    <div className="mt-3 font-display text-[24px] font-extrabold">It was {byId(r.who).first}!</div>
                  </div>
                </div>
              )}
              <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                Round {i + 1} / {ROUNDS} · Score {score}
              </div>
            </div>

            <div className="card flex flex-col p-6">
              {[
                [BookOpenText, 'Subject hint', `“${r.subject}”`],
                [MessageCircle, 'Speech pattern', r.speech],
                [PersonStanding, 'Posture habit', r.posture],
              ].map(([Icon, label, text], k) => (
                <div key={label} className="anim-fade-up flex gap-3 border-b border-line py-3.5 first:pt-0" style={{ animationDelay: `${k * 0.12}s` }}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                    <Icon size={16} />
                  </span>
                  <div>
                    <Eyebrow>{label}</Eyebrow>
                    <p className="mt-0.5 text-[14.5px] leading-snug">{text}</p>
                  </div>
                </div>
              ))}

              <Eyebrow className="mb-2 mt-5">Who is it?</Eyebrow>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {SISTERS.map((s) => {
                  const reveal = guess && (s.id === r.who || s.id === guess)
                  const right = s.id === r.who
                  return (
                    <button
                      key={s.id}
                      onClick={() => choose(s.id)}
                      disabled={!!guess}
                      className={`relative flex flex-col items-center gap-1.5 rounded-xl border-[1.5px] px-1 py-3 text-[12.5px] font-bold transition ${
                        reveal ? (right ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : guess ? 'border-line opacity-40' : 'border-line hover:-translate-y-0.5 hover:shadow-card'
                      }`}
                      style={!guess ? { borderColor: undefined } : undefined}
                    >
                      <Avatar s={s} size={42} />
                      {s.first}
                      {reveal && (
                        <span className={`absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full text-white ${right ? 'bg-green-500' : 'bg-red-500'}`}>
                          {right ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              {guess && (
                <button onClick={next} className="anim-fade-up mt-5 flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-[14px] font-bold text-white hover:bg-ink/85">
                  {i + 1 >= ROUNDS ? 'See results' : 'Next round'} <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
