// Live classroom whiteboard: the sister speaks each teaching beat (Fish Audio), board notes
// pop in while she talks, an interactive model sits beside the board, and the final beat ends
// with a hands-on "Check Board" challenge that is scored and synced to Supabase.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Lightbulb, ListTree, Play, RotateCcw, Sparkles, Square, Target } from 'lucide-react'
import { lessonsOf, matchExpect } from '../../data/curriculum/index.js'
import { playCorrect, playWrong } from '../../services/sfxEngine'
import { onSpeaking, speak, stopVoice, voicePrefs } from '../../services/voiceTutor'
import { lessonKey, useAcademy } from '../../state/useAcademy'
import { Waveform } from '../../components/VoiceLesson.jsx'
import { Avatar, Eyebrow, toast } from '../../components/ui.jsx'
import { WIDGETS } from './widgets/index.js'
import SyllabusTree from './SyllabusTree.jsx'

const NO_PROPS = Object.freeze({})

const TONES = {
  tip: 'border-amber-300 bg-amber-50 text-amber-900',
  warn: 'border-red-300 bg-red-50 text-red-900',
  example: 'border-indigo-300 bg-indigo-50 text-indigo-900',
}

function BoardElement({ el, fresh }) {
  const pop = fresh ? 'wb-pop' : ''
  switch (el.type) {
    case 'heading':
      return (
        <h3 className={`${pop} wb-heading font-display text-[clamp(20px,2.4vw,26px)] font-extrabold leading-tight text-ink`}>
          <span className="wb-underline">{el.text}</span>
        </h3>
      )
    case 'term':
      return (
        <div className={`${pop} rounded-xl border border-line bg-white/80 px-4 py-3`}>
          <span className="wb-highlight font-bold text-accent-ink">{el.term}</span>
          <p className="mt-1 text-[14.5px] leading-relaxed text-ink/85">{el.def}</p>
        </div>
      )
    case 'bullets':
      return (
        <ul className={`${pop} space-y-1.5 pl-1`}>
          {el.items.map((it, i) => (
            <li key={i} className="wb-stagger flex gap-2 text-[14.5px] leading-snug" style={{ animationDelay: `${i * 0.18}s` }}>
              <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent" />
              {it}
            </li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <div className={`${pop} flex flex-wrap items-center gap-2`}>
          {el.items.map((it, i) => (
            <span key={i} className="wb-stagger flex items-center gap-2" style={{ animationDelay: `${i * 0.22}s` }}>
              <span className="rounded-lg border-2 border-accent bg-white px-2.5 py-1 text-[13.5px] font-semibold">{it}</span>
              {i < el.items.length - 1 && <ArrowRight size={18} className="text-accent-ink" />}
            </span>
          ))}
        </div>
      )
    case 'callout':
      return (
        <div className={`${pop} flex items-start gap-2 rounded-xl border-l-4 px-3.5 py-2.5 text-[14px] font-medium ${TONES[el.tone] || TONES.tip}`}>
          <Sparkles size={15} className="mt-0.5 shrink-0" />
          {el.text}
        </div>
      )
    case 'formula':
      return <div className={`${pop} inline-block max-w-full overflow-x-auto whitespace-pre rounded-xl bg-[#1f2a24] px-4 py-2.5 font-mono text-[14.5px] leading-relaxed text-[#eaf2e6] shadow-inner`}>{el.text}</div>
    default:
      return null
  }
}

export default function WhiteboardStage({ s, subject, lessonId, onExit, onOpen }) {
  const { state, lessonStep, lessonCheck } = useAcademy()
  const lessons = useMemo(() => lessonsOf(subject), [subject])
  const idx = lessons.findIndex((l) => l.id === lessonId)
  const lesson = lessons[idx]
  const progress = state.lessons[lessonKey(subject, lessonId)]

  const [beat, setBeat] = useState(-1)
  const [shown, setShown] = useState(0)
  const [line, setLine] = useState(lesson?.objective || '')
  const [speaking, setSpeaking] = useState(false)
  const [value, setValue] = useState(null)
  const [result, setResult] = useState(null) // null | 'pass' | 'fail'
  const [showHint, setShowHint] = useState(false)
  const [shake, setShake] = useState(0)
  const [showTree, setShowTree] = useState(false)
  const timers = useRef([])
  const boardEnd = useRef(null)

  useEffect(() => onSpeaking((on, who) => setSpeaking(on && who === s.id)), [s.id])
  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(
    () => () => {
      clearTimers()
      stopVoice()
    },
    [],
  )
  // New lesson: back to the title card.
  useEffect(() => {
    clearTimers()
    stopVoice()
    setBeat(-1)
    setShown(0)
    setResult(null)
    setShowHint(false)
    setValue(null)
    setLine(lesson?.objective || '')
  }, [lessonId]) // eslint-disable-line react-hooks/exhaustive-deps

  const startBeat = useCallback(
    (i) => {
      if (!lesson) return
      const b = lesson.beats[i]
      clearTimers()
      setBeat(i)
      setShown(0)
      setLine(b.say)
      setShowHint(false)
      lessonStep({ subject, lessonId, beatsDone: i + 1 })
      // Pop board notes in across the length of the spoken line.
      const est = Math.min(12000, Math.max(2600, (b.say.length / 15) * 1000 / (voicePrefs().speed || 1)))
      b.board.forEach((_, k) => {
        timers.current.push(setTimeout(() => setShown(k + 1), k === 0 ? 250 : Math.round((est * k) / b.board.length)))
      })
      speak(b.say, s.id)
      setTimeout(() => boardEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300)
    },
    [lesson, lessonId, lessonStep, s.id, subject],
  )

  // The model on the board: the latest widget declared at or before the current beat.
  const active = useMemo(() => {
    if (!lesson) return null
    for (let i = beat; i >= 0; i--) if (lesson.beats[i].widget) return { ...lesson.beats[i].widget, from: i }
    return null
  }, [lesson, beat])

  if (!lesson)
    return (
      <div className="p-8 text-muted">
        Lesson not found.{' '}
        <button onClick={onExit} className="font-semibold text-ink underline">
          Back to the syllabus
        </button>
      </div>
    )

  const last = beat === lesson.beats.length - 1
  const check = last ? lesson.beats[beat].check : null
  const W = active ? WIDGETS[active.type] : null
  const prevLesson = lessons[idx - 1]
  const nextLesson = lessons[idx + 1]

  const runCheck = () => {
    if (!check) return
    const passed = matchExpect(check.expect, value)
    const res = lessonCheck({ subject, lessonId, sister: s.id, passed })
    if (passed) {
      playCorrect()
      setResult('pass')
      setLine(check.praise)
      if (res.firstPass) toast(`Lesson ${lessonId} complete · +${res.points} exam points`, { icon: Target })
      setTimeout(() => speak(check.praise, s.id), 380)
    } else {
      playWrong()
      setResult('fail')
      setShowHint(true)
      setShake((k) => k + 1)
      setLine(check.hint)
      setTimeout(() => speak(check.hint, s.id), 480)
    }
  }

  return (
    <div className="flex h-full">
      {/* Syllabus rail */}
      <aside className={`${showTree ? 'fixed inset-0 z-40 block bg-paper p-4 pb-24' : 'hidden'} scroll-thin w-full overflow-y-auto border-r border-line p-3 2xl:static 2xl:block 2xl:w-[300px] 2xl:shrink-0`}>
        {showTree && (
          <button onClick={() => setShowTree(false)} className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-muted 2xl:hidden">
            <ArrowLeft size={15} /> Back to the lesson
          </button>
        )}
        <SyllabusTree
          subject={subject}
          activeId={lessonId}
          compact
          onOpen={(id) => {
            setShowTree(false)
            onOpen(id)
          }}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Lesson header */}
        <header className="drag win-controls-pad flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
          <button onClick={onExit} className="btn-3d grid h-10 w-10 place-items-center rounded-xl border border-line bg-white" aria-label="Back to syllabus">
            <ArrowLeft size={17} />
          </button>
          <button onClick={() => setShowTree(true)} className="btn-3d grid h-10 w-10 place-items-center rounded-xl border border-line bg-white 2xl:hidden" aria-label="Show syllabus">
            <ListTree size={17} />
          </button>
          <div className="min-w-0 flex-1">
            <Eyebrow>
              Unit {lesson.unit} · {lesson.unitTitle}
            </Eyebrow>
            <h1 className="truncate font-display text-[clamp(18px,2.2vw,24px)] font-extrabold leading-tight">
              <span className="text-accent-ink">{lesson.id}</span> {lesson.title}
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            {lesson.beats.map((_, k) => (
              <span key={k} className="h-2 rounded-full transition-all" style={{ width: k === beat ? 22 : 8, background: k <= beat ? 'var(--accent)' : 'rgb(24 24 29 / .12)' }} />
            ))}
            {progress?.completed && <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-good">Complete · {progress.best_score}</span>}
          </div>
        </header>

        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-28 pt-4 sm:px-6 lg:pb-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(380px,1fr)]">
            {/* Teacher + board */}
            <div className="min-w-0 space-y-4">
              <div className="card flex items-start gap-4 p-4">
                <div className={`relative shrink-0 rounded-full ${speaking ? 'anim-pulse' : ''}`}>
                  <Avatar s={s} size={60} ring />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-bold" style={{ color: s.ink }}>
                    {s.first} {speaking ? '· speaking' : ''}
                  </div>
                  <p key={line} className="anim-fade-up mt-0.5 text-[15px] font-medium leading-relaxed">
                    {line}
                  </p>
                  <div className="mt-1 h-10">
                    <Waveform color={s.color} active={speaking} />
                  </div>
                </div>
              </div>

              <div className="wb-board relative min-h-[300px] rounded-[22px] border border-line p-5 shadow-card sm:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <Eyebrow>Whiteboard</Eyebrow>
                  <span className="font-mono text-[11px] text-faint">{beat < 0 ? 'ready' : `beat ${beat + 1}/${lesson.beats.length}`}</span>
                </div>
                {beat < 0 ? (
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="font-mono text-[44px] font-extrabold leading-none text-accent-ink">{lesson.id}</div>
                    <div className="mt-2 font-display text-[22px] font-extrabold">{lesson.title}</div>
                    <p className="mt-2 max-w-md text-[14px] text-muted">{lesson.objective}</p>
                    <button onClick={() => startBeat(0)} className="btn-3d btn-3d-accent mt-6 flex min-h-[50px] items-center gap-2 rounded-2xl bg-accent px-6 text-[15px] font-bold text-on-accent">
                      <Play size={17} fill="currentColor" /> Start lesson
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lesson.beats.slice(0, beat + 1).map((b, bi) => (
                      <div key={bi} className={`space-y-3 ${bi < beat ? 'opacity-55' : ''}`}>
                        {b.board.slice(0, bi < beat ? b.board.length : shown).map((el, k) => (
                          <BoardElement key={k} el={el} fresh={bi === beat} />
                        ))}
                        {bi < beat && <hr className="border-dashed border-line" />}
                      </div>
                    ))}
                    <div ref={boardEnd} />
                  </div>
                )}
              </div>

              {beat >= 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => startBeat(Math.max(0, beat - 1))} disabled={beat === 0} className="btn-3d flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-[13px] font-bold disabled:opacity-40">
                    <ChevronLeft size={15} /> Back
                  </button>
                  <button onClick={() => (speaking ? stopVoice() : startBeat(beat))} className="btn-3d flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-[13px] font-bold">
                    {speaking ? <Square size={13} fill="currentColor" /> : <RotateCcw size={14} />} {speaking ? 'Stop' : 'Replay'}
                  </button>
                  {!last && (
                    <button onClick={() => startBeat(beat + 1)} className="btn-3d btn-3d-accent ml-auto flex min-h-[44px] items-center gap-1.5 rounded-xl bg-accent px-5 text-[13.5px] font-bold text-on-accent">
                      Next step <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Interactive model + check */}
            <div className="min-w-0 space-y-4 xl:sticky xl:top-0 xl:self-start">
              <div className="card p-4 sm:p-5">
                <Eyebrow className="mb-3">{W ? W.label : 'Interactive model'}</Eyebrow>
                {W ? (
                  <div key={`${lessonId}-${active.from}`} className="anim-fade-up">
                    <W.C props={active.props || NO_PROPS} onChange={setValue} />
                  </div>
                ) : (
                  <p className="py-10 text-center text-[13.5px] text-muted">{beat < 0 ? 'Start the lesson. The model appears when she draws it.' : 'No model yet. Keep going.'}</p>
                )}
              </div>

              {check && (
                <div key={shake} className={`card anim-fade-up border-2 p-5 ${result === 'fail' ? 'anim-shake border-red-300' : result === 'pass' ? 'border-green-400' : 'border-accent-line'}`}>
                  <Eyebrow className="flex items-center gap-1.5">
                    <Target size={12} /> Whiteboard check
                  </Eyebrow>
                  <p className="mt-1.5 text-[15px] font-semibold leading-snug">{check.prompt}</p>
                  {showHint && (
                    <p className="anim-fade-up mt-2 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-[13.5px] text-amber-900">
                      <Lightbulb size={15} className="mt-0.5 shrink-0" /> {check.hint}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={runCheck}
                      data-nopop
                      className={`btn-3d btn-3d-accent relative flex min-h-[48px] items-center gap-2 rounded-xl bg-accent px-5 text-[14.5px] font-bold text-on-accent ${result === 'pass' ? 'anim-correct' : ''}`}
                    >
                      {result === 'pass' && (
                        <span className="confetti" aria-hidden>
                          {Array.from({ length: 16 }, (_, k) => (
                            <i key={k} style={{ '--a': `${(k / 16) * 360}deg`, '--c': ['#22c55e', 'var(--accent)', '#f59e0b', '#3b82f6'][k % 4] }} />
                          ))}
                        </span>
                      )}
                      <Target size={16} /> Check board
                    </button>
                    {!showHint && result !== 'pass' && (
                      <button onClick={() => setShowHint(true)} className="btn-3d flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-[13px] font-bold">
                        <Lightbulb size={14} /> Hint
                      </button>
                    )}
                    {result === 'pass' && nextLesson && (
                      <button onClick={() => onOpen(nextLesson.id)} className="btn-3d ml-auto flex min-h-[48px] items-center gap-1.5 rounded-xl bg-ink px-5 text-[14px] font-bold text-white">
                        Next: {nextLesson.id} <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                  {result === 'pass' && <p className="mt-3 text-[13px] font-semibold text-good">Correct! Saved to your course progress.</p>}
                </div>
              )}

              <div className="flex justify-between text-[12.5px] font-semibold text-muted">
                {prevLesson ? (
                  <button onClick={() => onOpen(prevLesson.id)} className="flex items-center gap-1 hover:text-ink">
                    <ChevronLeft size={14} /> {prevLesson.id} {prevLesson.title}
                  </button>
                ) : (
                  <span />
                )}
                {nextLesson && (
                  <button onClick={() => onOpen(nextLesson.id)} className="flex items-center gap-1 text-right hover:text-ink">
                    {nextLesson.id} {nextLesson.title} <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
