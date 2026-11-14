import { useMemo, useState } from 'react'
import { AlertTriangle, CalendarClock, Target } from 'lucide-react'
import { QUESTION_INDEX } from '../data/curriculum.js'
import { SISTERS, bySubject, byId } from '../data/sisters.js'
import { MIDTERM_WARNING_BELOW, reviewQueue, useAcademy } from '../state/useAcademy'
import Quiz from './Quiz.jsx'
import { Avatar, Eyebrow, pick, shuffle } from './ui.jsx'

const RESCUE_SIZE = 6

/** Spaced-repetition review across every subject, or the Midterm Rescue challenge. */
export default function ReviewView({ rescue = false, onDone }) {
  const { state } = useAcademy()
  const [filter, setFilter] = useState('all')
  const [running, setRunning] = useState(rescue)
  const [runKey, setRunKey] = useState(0)
  const [line, setLine] = useState(() => ({ sister: rescue ? byId('itsuki') : bySubject('math'), text: '', mood: 'idle' }))

  const due = reviewQueue(state.progress, filter === 'all' ? undefined : filter)
  const weakCount = Object.values(state.progress).filter((p) => p.is_weak_spot).length
  const dueCount = reviewQueue(state.progress).length

  const questions = useMemo(() => {
    if (rescue) {
      const pool = reviewQueue(state.progress)
      const hard = shuffle(Object.values(QUESTION_INDEX).filter((q) => q.tier === 'hard' && !pool.some((p) => p.id === q.id)))
      return [...pool, ...hard].slice(0, RESCUE_SIZE)
    }
    return due.slice(0, 10)
  }, [runKey, rescue, filter]) // eslint-disable-line react-hooks/exhaustive-deps

  const say = (mood, text, sisterId) => {
    const s = byId(sisterId) || line.sister
    setLine({ sister: s, mood, text: text || pick(s.lines[mood] || s.lines.idle) })
  }

  return (
    <div className="flex h-full flex-col" style={rescue ? { '--accent': '#DC2626', '--accent-ink': '#991B1B', '--on-accent': '#fff' } : undefined}>
      <header className="drag win-controls-pad px-4 pb-4 pt-5 sm:px-8 sm:pt-7">
        <Eyebrow>{rescue ? 'Midterm warning · bonus challenge' : 'Spaced repetition'}</Eyebrow>
        <h1 className="mt-1 font-display text-[clamp(24px,3vw,30px)] font-extrabold leading-none tracking-tight">{rescue ? 'Midterm Rescue' : 'Review Weak Spots'}</h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted">
          {rescue
            ? `Mr. Nakano’s approval fell below ${MIDTERM_WARNING_BELOW}%. Answer ${Math.ceil((RESCUE_SIZE * 4) / 6)} of ${RESCUE_SIZE} hard questions to win back +15%.`
            : 'Questions you missed, plus ones whose review date has come up. Your review schedule is saved to your account, so it follows you to every device.'}
        </p>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-8 lg:pb-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,1.1fr)]">
          <div className="space-y-4">
            {/* speaker */}
            <div className="card flex items-start gap-4 p-5">
              <Avatar s={line.sister} size={56} ring />
              <div className="min-w-0">
                <div className="text-[12px] font-bold" style={{ color: line.sister.ink }}>
                  {line.sister.first}
                </div>
                <p className="mt-0.5 text-[15px] font-medium leading-relaxed">
                  {line.text ||
                    (rescue
                      ? 'This is serious. Father is reconsidering the tutoring contract. Please, let us do our best.'
                      : 'Mistakes are just practice you haven’t finished yet. Shall we review?')}
                </p>
              </div>
            </div>

            {!rescue && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="card p-4">
                    <Eyebrow className="flex items-center gap-1.5">
                      <AlertTriangle size={12} /> Weak spots
                    </Eyebrow>
                    <div className="mt-1 font-mono text-[28px] font-bold">{weakCount}</div>
                  </div>
                  <div className="card p-4">
                    <Eyebrow className="flex items-center gap-1.5">
                      <CalendarClock size={12} /> Due now
                    </Eyebrow>
                    <div className="mt-1 font-mono text-[28px] font-bold">{dueCount}</div>
                  </div>
                </div>
                <div className="card p-4">
                  <Eyebrow className="mb-2">Filter by subject</Eyebrow>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ id: 'all', first: 'All subjects' }, ...SISTERS].map((s) => {
                      const key = s.id === 'all' ? 'all' : s.subj
                      const n = reviewQueue(state.progress, key === 'all' ? undefined : key).length
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setFilter(key)
                            setRunning(false)
                          }}
                          className={`flex min-h-[38px] items-center gap-2 rounded-full border px-3 text-[13px] font-semibold ${filter === key ? 'border-ink bg-ink text-white' : 'border-line bg-white'}`}
                        >
                          {s.id !== 'all' && <Avatar s={s} size={20} />}
                          {s.first} <span className="font-mono opacity-60">{n}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <section className="card flex min-h-[480px] flex-col p-4 sm:p-6">
            {running && questions.length ? (
              <Quiz
                key={runKey}
                title={rescue ? 'Midterm Rescue' : 'Review'}
                questions={questions}
                tier={rescue ? 'midterm_rescue' : 'review'}
                sister={rescue ? 'itsuki' : bySubject(questions[0].subject).id}
                subject={rescue || filter === 'all' ? 'mixed' : filter}
                say={say}
                onExit={() => (rescue ? onDone?.() : setRunning(false))}
                onRestart={() => (rescue ? onDone?.() : setRunKey((k) => k + 1))}
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                  <Target size={24} />
                </span>
                <div className="mt-4 font-display text-[20px] font-extrabold">{due.length ? `${due.length} to review` : 'All caught up!'}</div>
                <p className="mt-1 max-w-xs text-[13.5px] text-muted">
                  {due.length ? 'Up to 10 questions per round, weak spots first.' : 'Answer questions in any classroom. Misses and due reviews show up here.'}
                </p>
                {due.length > 0 && (
                  <button
                    onClick={() => {
                      setRunning(true)
                      setRunKey((k) => k + 1)
                    }}
                    className="btn-3d mt-5 min-h-[46px] rounded-xl bg-ink px-6 text-[14px] font-bold text-white hover:bg-ink/85"
                  >
                    Start review
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
