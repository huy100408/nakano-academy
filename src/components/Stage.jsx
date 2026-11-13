import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, Pause, Play, Volume2 } from 'lucide-react'
import { asset } from './ui.jsx'

export const MOODS = [
  ['idle', 'Idle'],
  ['teaching', 'Teaching'],
  ['praising', 'Praising'],
  ['scolding', 'Flustered'],
]

function useTypewriter(text, key) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const step = Math.max(1, Math.round(text.length / 90))
    const t = setInterval(() => {
      setN((x) => {
        if (x >= text.length) {
          clearInterval(t)
          return x
        }
        return Math.min(text.length, x + step)
      })
    }, 16)
    return () => clearInterval(t)
  }, [text, key])
  return [text.slice(0, n), n >= text.length, () => setN(text.length)]
}

function Sparkles({ burst, color }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: 8 + Math.random() * 84,
        top: 45 + Math.random() * 40,
        delay: Math.random() * 0.35,
        size: 10 + Math.random() * 14,
        glyph: ['✦', '★', '♥', '✧'][i % 4],
      })),
    [burst],
  )
  if (!burst) return null
  return (
    <div key={burst} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {bits.map((b, i) => (
        <span key={i} className="sparkle" style={{ left: `${b.left}%`, top: `${b.top}%`, animationDelay: `${b.delay}s`, fontSize: b.size, color: i % 3 ? color : '#fff', textShadow: '0 1px 6px rgb(0 0 0/.25)' }}>
          {b.glyph}
        </span>
      ))}
    </div>
  )
}

export default function Stage({ s, dialogue, onMood, onTalk, onReplay, voiceReady }) {
  const [shown, done, skip] = useTypewriter(dialogue.text, dialogue.key)
  const [paused, setPaused] = useState(false)
  const video = useRef(null)
  const [burst, setBurst] = useState(0)
  const root = useRef(null)

  useEffect(() => {
    if (dialogue.mood === 'praising') setBurst(dialogue.key)
    if (dialogue.mood === 'scolding' && dialogue.key > 1)
      root.current?.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }],
        { duration: 420, easing: 'ease-in-out' },
      )
  }, [dialogue.key, dialogue.mood])

  const togglePlay = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  return (
    <div ref={root} className="relative">
      <div className="grain relative aspect-video w-full overflow-hidden rounded-[22px] bg-ink shadow-lift ring-1 ring-black/5">
        <video
          ref={video}
          key={s.id}
          src={asset(`videos/${s.id}.mp4`)}
          poster={asset(`videos/${s.id}-poster.jpg`)}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* readability gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 via-45% to-black/25" />
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${dialogue.mood === 'scolding' ? 'opacity-100' : 'opacity-0'}`}
          style={{ boxShadow: 'inset 0 0 120px 10px rgb(220 38 38 / .45)' }}
        />
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${dialogue.mood === 'praising' ? 'opacity-100' : 'opacity-0'}`}
          style={{ boxShadow: `inset 0 0 140px 12px ${s.color}88` }}
        />
        <Sparkles burst={burst} color={s.color} />

        {/* nameplate */}
        <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-full bg-black/35 py-1 pl-1 pr-3.5 text-white backdrop-blur-md">
          <span className="grid h-7 min-w-7 place-items-center rounded-full px-1.5 font-mono text-[11px] font-bold" style={{ background: s.color, color: s.onAccent }}>
            {s.no}
          </span>
          <span className="font-display text-[14px] font-bold">{s.kanji}</span>
          <span className="text-[12.5px] font-medium text-white/80">{s.name}</span>
        </div>
        <button
          onClick={togglePlay}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/50"
          aria-label={paused ? 'Play video' : 'Pause video'}
        >
          {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
        </button>

        {/* dialogue box */}
        <div className="absolute inset-x-4 bottom-4">
          <div className="relative cursor-pointer rounded-2xl bg-white/[.93] px-5 pb-3.5 pt-4 shadow-[0_12px_40px_-12px_rgb(0_0_0/.5)] backdrop-blur-xl" onClick={skip}>
            <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-[12px] font-bold shadow-sm" style={{ background: s.color, color: s.onAccent }}>
              {s.first}
              <span className="font-medium opacity-75">· {MOODS.find((m) => m[0] === dialogue.mood)?.[1]}</span>
            </div>
            <p className={`min-h-[44px] text-[15px] font-medium leading-[1.55] text-ink ${done ? '' : 'caret'}`}>{shown}</p>
          </div>
        </div>
      </div>

      {/* controls under the stage */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {MOODS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => onMood(k)}
            className={`rounded-full px-3 py-1 text-[12px] font-semibold transition ${
              dialogue.mood === k ? 'bg-accent-soft text-accent-ink ring-1 ring-accent-line' : 'text-muted hover:bg-ink/[.05] hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          {voiceReady && (
            <button onClick={onReplay} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink" title="Replay voice">
              <Volume2 size={14} /> Replay
            </button>
          )}
          <button onClick={onTalk} className="flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-[12px] font-semibold text-pink-600 ring-1 ring-pink-200 hover:bg-pink-100">
            <Heart size={13} fill="currentColor" /> Talk
          </button>
        </div>
      </div>
    </div>
  )
}
