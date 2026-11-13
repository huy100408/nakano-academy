import { useCallback, useEffect, useRef, useState } from 'react'
import { Heart, Layers, PencilLine, RotateCcw, SkipForward, Timer, Pause, Play } from 'lucide-react'
import { SUBJECTS } from '../data/sisters.js'
import { speak, stopVoice } from '../lib/voice.js'
import Stage from './Stage.jsx'
import LessonDeck from './LessonDeck.jsx'
import Quiz from './Quiz.jsx'
import { Bar, Eyebrow, ITEM_ICONS, Ring, Segmented, pick } from './ui.jsx'

function Pomodoro({ onLap }) {
  const WORK = 25 * 60
  const BREAK = 5 * 60
  const [left, setLeft] = useState(WORK)
  const [run, setRun] = useState(false)
  const [phase, setPhase] = useState('work')
  useEffect(() => {
    if (!run) return
    const t = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(t)
  }, [run])
  useEffect(() => {
    if (left > 0) return
    if (phase === 'work') {
      setPhase('break')
      setLeft(BREAK)
      onLap()
    } else {
      setPhase('work')
      setLeft(WORK)
    }
  }, [left]) // eslint-disable-line react-hooks/exhaustive-deps
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const dur = phase === 'work' ? WORK : BREAK
  return (
    <div className="card p-4">
      <div className="flex items-center gap-4">
        <Ring value={dur - left} max={dur} size={58} stroke={5} color={phase === 'work' ? 'var(--accent)' : '#38bdf8'}>
          <Timer size={18} className="text-accent-ink" />
        </Ring>
        <div className="flex-1">
          <Eyebrow>Stamina Pomodoro · {phase === 'work' ? 'Focus' : 'Break'}</Eyebrow>
          <div className="font-mono text-[28px] font-bold leading-tight tabular-nums">
            {mm}:{ss}
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <button onClick={() => setRun(!run)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent py-1.5 text-[12.5px] font-bold text-on-accent hover:brightness-105">
          {run ? <Pause size={13} /> : <Play size={13} />} {run ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRun(false); setPhase('work'); setLeft(WORK) }} className="grid w-9 place-items-center rounded-lg bg-ink/[.05] text-muted hover:text-ink" title="Reset" aria-label="Reset timer">
          <RotateCcw size={14} />
        </button>
        <button onClick={() => setLeft(1)} className="grid w-9 place-items-center rounded-lg bg-ink/[.05] text-muted hover:text-ink" title="Skip to end of phase" aria-label="Skip phase">
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  )
}

function Dossier({ s, state }) {
  const score = state.scores[s.subj]
  const aff = state.affection[s.id]
  const ItemIcon = ITEM_ICONS[s.item.icon]
  return (
    <div className="card overflow-hidden">
      <div className="relative px-4 pb-4 pt-4">
        <div className="pointer-events-none absolute -right-2 -top-6 font-display text-[110px] font-extrabold leading-none opacity-[.07]" style={{ color: s.color }}>
          {s.no}
        </div>
        <Eyebrow>Dossier No.{s.no}</Eyebrow>
        <div className="mt-1 font-display text-[19px] font-extrabold leading-tight">{s.name}</div>
        <div className="text-[12.5px] text-muted">{s.role}</div>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/75">{s.persona}</p>
      </div>
      <div className="grid grid-cols-2 border-t border-line">
        <div className="border-r border-line p-4">
          <Eyebrow>Your score</Eyebrow>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-[26px] font-bold leading-none">{score}</span>
            <span className="font-mono text-[12px] text-faint">/100</span>
          </div>
          <Bar value={score} className="mt-2 h-1" />
          <div className="mt-1.5 text-[11px] text-muted">
            Canon start: {s.base} {score >= 30 ? '· passing' : '· needs 30'}
          </div>
        </div>
        <div className="p-4">
          <Eyebrow>Affection</Eyebrow>
          <div className="mt-1 flex items-baseline gap-1">
            <Heart size={16} className="self-center text-pink-500" fill="currentColor" />
            <span className="font-mono text-[26px] font-bold leading-none">{aff}</span>
          </div>
          <Bar value={aff} color="#ec4899" className="mt-2 h-1" />
          <div className="mt-1.5 text-[11px] text-muted">Motif: {s.motif}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-line bg-accent-softer px-4 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-on-accent">
          <ItemIcon size={15} />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[12.5px] font-bold">Desk item · {s.item.name}</div>
          <div className="text-[11.5px] text-muted">{s.item.desc} Use it in the quiz.</div>
        </div>
      </div>
    </div>
  )
}

export default function Classroom({ s, state, dispatch, voiceReady }) {
  const [tab, setTab] = useState('lesson')
  const [dialogue, setDialogue] = useState(() => ({ mood: 'idle', text: pick(s.lines.idle), key: 1 }))
  const streakRef = useRef(state.streak)
  streakRef.current = state.streak

  const say = useCallback(
    (mood, custom) => {
      let pool = s.lines[mood]
      if (mood === 'praising' && s.lines.warm && streakRef.current >= 3) pool = s.lines.warm
      const text = custom || pick(pool)
      setDialogue((d) => ({ mood, text, key: d.key + 1 }))
      if (voiceReady) speak(text, s.id)
    },
    [s, voiceReady],
  )

  useEffect(() => () => stopVoice(), [])

  const talk = () => {
    dispatch({ type: 'affection', sister: s.id, by: 1 })
    say(
      'praising',
      {
        nino: 'W-what are you staring at?!',
        miku: '...!! D-don’t look at me so suddenly.',
        itsuki: 'Is there something on my face? ...Rice?',
        yotsuba: 'Shishishi! High five!',
        ichika: 'Fufu~ falling for onee-san already?',
      }[s.id],
    )
  }

  const subject = SUBJECTS.find((x) => x.key === s.subj)

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="drag win-controls-pad flex items-end justify-between gap-6 px-8 pb-5 pt-7">
        <div>
          <Eyebrow>
            Tutor No.{s.no} · {s.topic}
          </Eyebrow>
          <h1 className="mt-1 flex items-baseline gap-3 font-display text-[30px] font-extrabold leading-none tracking-tight">
            {subject.label}
            <span className="text-[15px] font-bold" style={{ color: s.ink }}>
              with {s.first}
            </span>
          </h1>
        </div>
        <Segmented
          value={tab}
          onChange={(k) => {
            setTab(k)
            say(k === 'quiz' ? 'teaching' : 'idle')
          }}
          options={[
            ['lesson', 'Lesson deck', Layers],
            ['quiz', 'Live quiz', PencilLine],
          ]}
        />
      </header>

      {/* Body */}
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-8 pb-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(380px,1fr)]">
          <div className="min-w-0 space-y-5">
            <Stage s={s} dialogue={dialogue} onMood={(m) => say(m)} onTalk={talk} onReplay={() => speak(dialogue.text, s.id)} voiceReady={voiceReady} />
            <div className={`grid gap-5 ${s.id === 'yotsuba' ? 'lg:grid-cols-[1fr_260px]' : ''}`}>
              <Dossier s={s} state={state} />
              {s.id === 'yotsuba' && (
                <Pomodoro
                  onLap={() => {
                    dispatch({ type: 'pomodoro' })
                    dispatch({ type: 'affection', sister: s.id, by: 5 })
                    say('praising', 'One full lap of focus! You’re a champion! Five-minute stretch break!')
                  }}
                />
              )}
            </div>
          </div>
          <section className="card flex min-h-[560px] flex-col p-6 xl:sticky xl:top-0 xl:max-h-[calc(100vh-130px)] xl:overflow-y-auto scroll-thin">
            {tab === 'lesson' ? (
              <LessonDeck s={s} energy={state.energy} setEnergy={(v) => dispatch({ type: 'energy', value: v })} say={say} />
            ) : (
              <Quiz s={s} state={state} dispatch={dispatch} say={say} />
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
