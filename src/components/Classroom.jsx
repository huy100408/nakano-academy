import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BookOpenCheck, Flame, GraduationCap, Layers, Pause, PencilLine, Play, RotateCcw, SkipForward, Target, Timer } from 'lucide-react'
import { MODULES, TIERS } from '../data/curriculum.js'
import { itemForSister } from '../data/items.js'
import { SUBJECTS } from '../data/sisters.js'
import { speak, stopVoice } from '../lib/voice.js'
import { letterGrade, reviewQueue, useAcademy } from '../state/useAcademy'
import LessonDeck from './LessonDeck.jsx'
import Quiz from './Quiz.jsx'
import Stage from './Stage.jsx'
import { Bar, Eyebrow, ITEM_ICONS, Ring, Segmented, pick, shuffle } from './ui.jsx'

function Pomodoro() {
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
    } else {
      setPhase('work')
      setLeft(WORK)
    }
  }, [left]) // eslint-disable-line react-hooks/exhaustive-deps
  const dur = phase === 'work' ? WORK : BREAK
  return (
    <div className="card p-4">
      <div className="flex items-center gap-4">
        <Ring value={dur - left} max={dur} size={56} stroke={5} color={phase === 'work' ? 'var(--accent)' : '#38bdf8'}>
          <Timer size={17} className="text-accent-ink" />
        </Ring>
        <div className="flex-1">
          <Eyebrow>Stamina Pomodoro · {phase === 'work' ? 'Focus' : 'Break'}</Eyebrow>
          <div className="font-mono text-[26px] font-bold leading-tight tabular-nums">
            {String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <button onClick={() => setRun(!run)} className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent text-[12.5px] font-bold text-on-accent">
          {run ? <Pause size={13} /> : <Play size={13} />} {run ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRun(false); setPhase('work'); setLeft(WORK) }} className="grid w-10 place-items-center rounded-lg bg-ink/[.05] text-muted" aria-label="Reset timer">
          <RotateCcw size={14} />
        </button>
        <button onClick={() => setLeft(1)} className="grid w-10 place-items-center rounded-lg bg-ink/[.05] text-muted" aria-label="Skip phase">
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  )
}

function Dossier({ s }) {
  const { state, mastery, baseline, inventory } = useAcademy()
  const score = mastery[s.subj]
  const weak = Object.values(state.progress).filter((p) => p.subject_id === s.subj && p.is_weak_spot).length
  const item = itemForSister(s.id)
  const ItemIcon = ITEM_ICONS[item.icon]
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
      <div className="grid grid-cols-3 border-t border-line">
        <div className="border-r border-line p-4">
          <Eyebrow>Mastery</Eyebrow>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-[24px] font-bold leading-none">{score}</span>
            <span className="font-mono text-[11px] text-faint">/100</span>
          </div>
          <Bar value={score} className="mt-2 h-1" />
          <div className="mt-1.5 text-[11px] text-muted">Baseline {baseline[s.subj]}</div>
        </div>
        <div className="border-r border-line p-4">
          <Eyebrow>Grade</Eyebrow>
          <div className="mt-1 font-display text-[28px] font-extrabold leading-none" style={{ color: s.ink }}>
            {letterGrade(score)}
          </div>
          <div className="mt-2 text-[11px] text-muted">F → S+</div>
        </div>
        <div className="p-4">
          <Eyebrow>Weak spots</Eyebrow>
          <div className="mt-1 font-mono text-[24px] font-bold leading-none">{weak}</div>
          <div className="mt-2 text-[11px] text-muted">synced to cloud</div>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-line bg-accent-softer px-4 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-on-accent">
          <ItemIcon size={15} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[12.5px] font-bold">{item.name}</div>
          <div className="text-[11.5px] text-muted">{item.desc}</div>
        </div>
        <span className="font-mono text-[13px] font-bold">×{inventory[item.key]}</span>
      </div>
    </div>
  )
}

function ModePicker({ s, onStart }) {
  const { state } = useAcademy()
  const mod = MODULES[s.subj]
  const weak = reviewQueue(state.progress, s.subj)
  const done = (tier) => mod.questions.filter((q) => q.tier === tier && state.progress[`${s.subj}:${q.id}`]?.correct_count > 0).length
  return (
    <div className="anim-fade-up">
      <Eyebrow>Choose your practice</Eyebrow>
      <div className="mt-3 grid gap-2.5">
        {TIERS.map((t, i) => {
          const total = mod.questions.filter((q) => q.tier === t.key).length
          return (
            <button key={t.key} onClick={() => onStart(t.key)} className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-line bg-white px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-accent-line hover:shadow-card">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                {[<BookOpenCheck key="e" size={19} />, <PencilLine key="m" size={19} />, <GraduationCap key="h" size={19} />][i]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold">{t.label}</span>
                <span className="block text-[12.5px] text-muted">
                  {t.short} · {t.size} questions · {t.points} pts each · {done(t.key)}/{total} mastered
                </span>
              </span>
              <span className="font-mono text-[12px] font-bold text-faint group-hover:text-accent-ink">{['1×', '2×', '3×'][i]}</span>
            </button>
          )
        })}
        <button
          onClick={() => onStart('review')}
          disabled={!weak.length}
          className="flex min-h-[64px] items-center gap-4 rounded-2xl border border-dashed border-accent-line bg-accent-softer px-4 py-3 text-left transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-on-accent">
            <Target size={19} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold">Review weak spots</span>
            <span className="block text-[12.5px] text-muted">{weak.length ? `${weak.length} question${weak.length === 1 ? '' : 's'} missed or due for review` : 'Nothing due. Spaced repetition will bring questions back.'}</span>
          </span>
        </button>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-[12px] text-muted">
        <Flame size={13} className="text-orange-500" /> Score 80%+ in a run to earn another {itemForSister(s.id).name}.
      </p>
    </div>
  )
}

export default function Classroom({ s, voiceReady }) {
  const { state } = useAcademy()
  const [tab, setTab] = useState('lesson')
  const [mode, setMode] = useState(null)
  const [runKey, setRunKey] = useState(0)
  const [dialogue, setDialogue] = useState(() => ({ mood: 'idle', text: pick(s.lines.idle), key: 1 }))
  const streakRef = useRef(state.profile.study_streak)
  streakRef.current = state.profile.study_streak

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

  const questions = useMemo(() => {
    if (!mode) return []
    const subject = s.subj
    if (mode === 'review') return reviewQueue(state.progress, subject).slice(0, 8)
    const tier = TIERS.find((t) => t.key === mode)
    return shuffle(MODULES[subject].questions.filter((q) => q.tier === mode))
      .slice(0, tier.size)
      .map((q) => ({ ...q, subject }))
    // A new run reshuffles; progress changes mid-run must not.
  }, [mode, runKey, s.subj]) // eslint-disable-line react-hooks/exhaustive-deps

  const subject = SUBJECTS.find((x) => x.key === s.subj)
  const modeLabel = mode === 'review' ? 'Weak-spot review' : TIERS.find((t) => t.key === mode)?.label

  return (
    <div className="flex h-full flex-col">
      <header className="drag win-controls-pad flex flex-wrap items-end justify-between gap-4 px-4 pb-4 pt-5 sm:px-8 sm:pt-7">
        <div>
          <Eyebrow>
            Tutor No.{s.no} · {s.topic}
          </Eyebrow>
          <h1 className="mt-1 flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(24px,3vw,30px)] font-extrabold leading-none tracking-tight">
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
            say(k === 'practice' ? 'teaching' : 'idle')
          }}
          options={[
            ['lesson', 'Flashcards', Layers],
            ['practice', 'Practice', PencilLine],
          ]}
        />
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-8 lg:pb-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(380px,1fr)]">
          <div className="min-w-0 space-y-5">
            <Stage s={s} dialogue={dialogue} onMood={(m) => say(m)} onTalk={() => say('praising', { nino: 'W-what are you staring at?!', miku: '...!! D-don’t look at me so suddenly.', itsuki: 'Is there something on my face? ...Rice?', yotsuba: 'Shishishi! High five!', ichika: 'Fufu~ falling for onee-san already?' }[s.id])} onReplay={() => speak(dialogue.text, s.id)} voiceReady={voiceReady} />
            <div className={`grid gap-5 ${s.id === 'yotsuba' ? 'lg:grid-cols-[1fr_250px]' : ''}`}>
              <Dossier s={s} />
              {s.id === 'yotsuba' && <Pomodoro />}
            </div>
          </div>
          <section className="card scroll-thin flex min-h-[520px] flex-col p-4 sm:p-6 xl:sticky xl:top-0 xl:max-h-[calc(100vh-130px)] xl:overflow-y-auto">
            {tab === 'lesson' ? (
              <LessonDeck s={s} say={say} />
            ) : mode ? (
              <Quiz
                key={`${mode}-${runKey}`}
                title={modeLabel}
                questions={questions}
                tier={mode}
                sister={s.id}
                subject={s.subj}
                say={(mood, text) => say(mood, text)}
                onExit={() => setMode(null)}
                onRestart={() => setRunKey((k) => k + 1)}
              />
            ) : (
              <ModePicker
                s={s}
                onStart={(m) => {
                  setMode(m)
                  setRunKey((k) => k + 1)
                  say('teaching')
                }}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
