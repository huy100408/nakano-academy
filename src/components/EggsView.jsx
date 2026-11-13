import { useMemo, useState } from 'react'
import { ArrowRight, BookOpenText, Check, Eye, Flame, MessageCircle, PersonStanding, RotateCcw, Trophy, X } from 'lucide-react'
import { EGG_ROUNDS } from '../data/curriculum.js'
import { SISTERS, byId } from '../data/sisters.js'
import { useAcademy } from '../state/useAcademy'
import { Avatar, Eyebrow, asset, shuffle } from './ui.jsx'

const ROUNDS = 5
const BASE = 100
const CLUES = [
  { key: 'academic', label: 'Clue 1 · Academic answer', icon: BookOpenText, mult: 3 },
  { key: 'slip', label: 'Clue 2 · Speech slip', icon: MessageCircle, mult: 2 },
  { key: 'tell', label: 'Clue 3 · Behavioural tell', icon: PersonStanding, mult: 1 },
]

/** One round per sister first, so a game of 5 can't repeat a target until all five appeared. */
function makeGame() {
  const bySister = SISTERS.map((s) => shuffle(EGG_ROUNDS.filter((r) => r.who === s.id))[0]).filter(Boolean)
  return shuffle(bySister).slice(0, ROUNDS)
}

function History() {
  const { state } = useAcademy()
  const logs = state.eggsLogs
  const board = useMemo(
    () =>
      SISTERS.map((s) => {
        const rows = logs.filter((l) => l.target_sister === s.id)
        const hits = rows.filter((l) => l.guessed_sister === s.id).length
        return { s, rows: rows.length, acc: rows.length ? Math.round((hits / rows.length) * 100) : null }
      }).sort((a, b) => (b.acc ?? -1) - (a.acc ?? -1)),
    [logs],
  )
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4">
          <Eyebrow className="flex items-center gap-1.5">
            <Trophy size={12} /> High score
          </Eyebrow>
          <div className="mt-1 font-mono text-[26px] font-bold">{state.profile.scrambled_eggs_high_score}</div>
        </div>
        <div className="card p-4">
          <Eyebrow className="flex items-center gap-1.5">
            <Flame size={12} /> Best streak
          </Eyebrow>
          <div className="mt-1 font-mono text-[26px] font-bold">{state.profile.scrambled_eggs_best_streak}</div>
        </div>
      </div>
      <div className="card p-4">
        <Eyebrow className="mb-3">Recognition leaderboard</Eyebrow>
        <div className="space-y-2">
          {board.map(({ s, rows, acc }, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-4 font-mono text-[12px] font-bold text-faint">{i + 1}</span>
              <Avatar s={s} size={28} />
              <span className="flex-1 text-[13.5px] font-semibold">{s.first}</span>
              <span className="text-[12px] text-muted">{rows} round{rows === 1 ? "" : "s"}</span>
              <span className="w-12 text-right font-mono text-[13px] font-bold">{acc === null ? '—' : `${acc}%`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-4">
        <Eyebrow className="mb-3">Deduction history</Eyebrow>
        {logs.length === 0 ? (
          <p className="text-[13px] text-muted">No rounds yet. Your guesses are saved to your account.</p>
        ) : (
          <div className="space-y-1.5">
            {logs.slice(0, 10).map((l) => {
              const ok = l.target_sister === l.guessed_sister
              return (
                <div key={l.id} className="flex items-center gap-2.5 text-[12.5px]">
                  <span className={`grid h-5 w-5 place-items-center rounded-full ${ok ? 'bg-green-100 text-good' : 'bg-red-100 text-bad'}`}>{ok ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}</span>
                  <Avatar s={byId(l.target_sister)} size={22} />
                  <span className="flex-1 truncate">
                    {byId(l.target_sister)?.first}
                    {!ok && <span className="text-muted"> (guessed {byId(l.guessed_sister)?.first})</span>}
                  </span>
                  <span className="text-muted">
                    {l.clues_used} clue{l.clues_used > 1 ? 's' : ''}
                  </span>
                  <span className="w-12 text-right font-mono font-bold">+{l.points_awarded}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function EggsView() {
  const { state, logEggsRound, finishEggsGame } = useAcademy()
  const [rounds, setRounds] = useState(makeGame)
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(1)
  const [guess, setGuess] = useState(null)
  const [total, setTotal] = useState(0)
  // The streak carries over between games while you keep guessing right.
  const [streak, setStreak] = useState(() => {
    const last = state.eggsLogs[0]
    return last && last.target_sister === last.guessed_sister ? last.streak_at_time : 0
  })
  const [gameBest, setGameBest] = useState(0)
  const done = i >= rounds.length
  const r = rounds[i]
  const mult = CLUES[shown - 1].mult

  const choose = (id) => {
    if (guess || !r) return
    setGuess(id)
    const ok = id === r.who
    const pts = ok ? BASE * mult : 0
    const nextStreak = ok ? streak + 1 : 0
    setStreak(nextStreak)
    setGameBest((b) => Math.max(b, nextStreak))
    setTotal((t) => t + pts)
    logEggsRound({ target: r.who, guessed: id, cluesUsed: shown, multiplier: mult, points: pts, streak: nextStreak })
  }
  const next = () => {
    if (i + 1 >= rounds.length) finishEggsGame({ total, bestStreak: gameBest })
    setI(i + 1)
    setGuess(null)
    setShown(1)
  }
  const again = () => {
    setRounds(makeGame())
    setI(0)
    setGuess(null)
    setShown(1)
    setTotal(0)
    setGameBest(0)
  }

  return (
    <div className="flex h-full flex-col" style={{ '--accent': '#DC2626', '--accent-ink': '#991B1B', '--on-accent': '#fff' }}>
      <header className="drag win-controls-pad px-4 pb-4 pt-5 sm:px-8 sm:pt-7">
        <Eyebrow>Deduction mini-game</Eyebrow>
        <h1 className="mt-1 font-display text-[clamp(24px,3vw,30px)] font-extrabold leading-none tracking-tight">Scrambled Eggs</h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted">
          All five sisters are dressed as Itsuki. Guess early for more points: after 1 clue a right answer scores ×3, after 2 it scores ×2, and after 3 it scores ×1.
        </p>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-8 lg:pb-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
          <div className="min-w-0">
            {done ? (
              <div className="card anim-pop p-8 text-center sm:p-10">
                <Eyebrow>Game over</Eyebrow>
                <div className="mt-2 font-display text-[56px] font-extrabold leading-none">{total}</div>
                <div className="mt-1 text-[13px] text-muted">
                  points · best streak this game {gameBest}
                  {total >= state.profile.scrambled_eggs_high_score && total > 0 && <b className="ml-1 text-accent-ink">New high score!</b>}
                </div>
                <p className="mt-5 text-[15px] font-medium">
                  {total >= 1200
                    ? '“...Love. That’s how I tell them apart. Don’t make me say it twice.”'
                    : total >= 600
                      ? '“Not bad. You’re starting to see them as five different people.”'
                      : '“Idiot. They’re five different people. Look closer.”'}
                </p>
                <p className="text-[12px] text-muted">— Fuutarou Uesugi</p>
                <button onClick={again} className="mt-7 inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-bold text-white hover:bg-ink/85">
                  <RotateCcw size={15} /> Play again
                </button>
              </div>
            ) : (
              <div key={i} className="anim-fade-up space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-[22px] bg-ink shadow-lift">
                  <img src={asset('videos/itsuki-poster.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700" style={{ filter: guess ? 'none' : 'saturate(.35) brightness(.7) blur(2px)' }} />
                  {!guess && <div className="absolute inset-0 grid place-items-center font-display text-[min(22vw,140px)] font-extrabold text-white/85 drop-shadow-[0_6px_30px_rgb(0_0_0/.5)]">?</div>}
                  {guess && (
                    <div className="anim-pop absolute inset-0 grid place-items-center bg-black/40">
                      <div className="flex flex-col items-center text-white">
                        <Avatar s={byId(r.who)} size={96} ring />
                        <div className="mt-3 font-display text-[22px] font-extrabold">It was {byId(r.who).first}!</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute left-3 top-3 flex gap-1.5 text-[12px] font-semibold text-white">
                    <span className="rounded-full bg-black/45 px-3 py-1 backdrop-blur">
                      Round {i + 1}/{rounds.length}
                    </span>
                    <span className="rounded-full bg-black/45 px-3 py-1 backdrop-blur">{total} pts</span>
                    <span className="flex items-center gap-1 rounded-full bg-black/45 px-3 py-1 backdrop-blur">
                      <Flame size={12} /> {streak}
                    </span>
                  </div>
                  {!guess && <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 font-mono text-[13px] font-bold text-white">×{mult}</div>}
                </div>

                <div className="card p-4 sm:p-5">
                  {CLUES.map((c, k) => {
                    const Icon = c.icon
                    const open = k < shown || guess
                    return (
                      <div key={c.key} className={`flex gap-3 border-b border-line py-3 first:pt-0 last:border-0 last:pb-0 ${open ? '' : 'opacity-50'}`}>
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${open ? 'bg-red-50 text-red-600' : 'bg-ink/5 text-faint'}`}>
                          <Icon size={16} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <Eyebrow>
                            {c.label} · ×{c.mult}
                          </Eyebrow>
                          {open ? <p className="anim-fade-up mt-0.5 text-[14.5px] leading-snug">{r[c.key]}</p> : <p className="mt-0.5 text-[13px] italic text-faint">Hidden</p>}
                        </div>
                      </div>
                    )
                  })}
                  {!guess && shown < 3 && (
                    <button onClick={() => setShown(shown + 1)} className="mt-3 flex min-h-[40px] items-center gap-2 rounded-xl border border-dashed border-red-300 px-3 text-[13px] font-semibold text-red-700 hover:bg-red-50">
                      <Eye size={14} /> Reveal clue {shown + 1} (drops to ×{CLUES[shown].mult})
                    </button>
                  )}
                </div>

                <div>
                  <Eyebrow className="mb-2">Who is it?</Eyebrow>
                  <div className="grid grid-cols-5 gap-2">
                    {SISTERS.map((s) => {
                      const reveal = guess && (s.id === r.who || s.id === guess)
                      const right = s.id === r.who
                      return (
                        <button
                          key={s.id}
                          onClick={() => choose(s.id)}
                          disabled={!!guess}
                          className={`relative flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-xl border-[1.5px] bg-white px-1 py-2 text-[12px] font-bold transition ${
                            reveal ? (right ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : guess ? 'border-line opacity-40' : 'border-line hover:-translate-y-0.5 hover:shadow-card'
                          }`}
                        >
                          <Avatar s={s} size={36} />
                          {s.first}
                        </button>
                      )
                    })}
                  </div>
                  {guess && (
                    <div className="anim-fade-up mt-3 flex items-center gap-3">
                      <span className="text-[14px] font-semibold">{guess === r.who ? `Correct! +${BASE * mult} points` : 'Wrong guess: 0 points, streak reset'}</span>
                      <button onClick={next} className="ml-auto flex min-h-[44px] items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-bold text-white">
                        {i + 1 >= rounds.length ? 'Results' : 'Next round'} <ArrowRight size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <History />
        </div>
      </div>
    </div>
  )
}
