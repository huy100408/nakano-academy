import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Lightbulb, Loader2, Mic, Square, Volume2, Wand2 } from 'lucide-react'
import { MODULES } from '../data/curriculum.js'
import { getAnalyser, onSpeaking, speak, stopVoice, voicePrefs } from '../services/voiceTutor'
import { useAcademy } from '../state/useAcademy'
import { Eyebrow, toast } from './ui.jsx'

/** Live waveform of whatever a tutor is saying. */
export function Waveform({ color, active }) {
  const canvas = useRef(null)
  useEffect(() => {
    let raf
    const draw = () => {
      const cv = canvas.current
      if (!cv) return
      const g = cv.getContext('2d')
      const w = (cv.width = cv.clientWidth * devicePixelRatio)
      const h = (cv.height = cv.clientHeight * devicePixelRatio)
      g.clearRect(0, 0, w, h)
      const a = getAnalyser()
      const bars = 48
      const data = new Uint8Array(a ? a.frequencyBinCount : bars)
      if (a && active) a.getByteFrequencyData(data)
      const bw = w / bars
      for (let i = 0; i < bars; i++) {
        const v = active && a ? data[Math.floor((i / bars) * data.length * 0.7)] / 255 : 0.04 + 0.03 * Math.sin(i / 3 + performance.now() / 600)
        const bh = Math.max(3 * devicePixelRatio, v * h * 0.9)
        g.fillStyle = color
        g.globalAlpha = active ? 0.35 + v * 0.65 : 0.25
        g.beginPath()
        g.roundRect(i * bw + bw * 0.2, (h - bh) / 2, bw * 0.6, bh, bw * 0.3)
        g.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [color, active])
  return <canvas ref={canvas} className="h-16 w-full" aria-hidden />
}

export default function VoiceLesson({ s, say }) {
  const { state, setPrefs } = useAcademy()
  const steps = MODULES[s.subj].lecture || []
  const [i, setI] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shown, setShown] = useState('say')
  const step = steps[i]

  useEffect(() => onSpeaking((on, who) => setSpeaking(on && who === s.id)), [s.id])
  useEffect(() => () => stopVoice(), [])

  const play = async (kind) => {
    if (!step) return
    if (!voicePrefs().enabled) {
      if (!state.profile.voice_enabled) setPrefs({ voice_enabled: true })
    }
    setShown(kind)
    const text = step[kind]
    say(kind === 'example' ? 'praising' : 'teaching', text, { silent: true })
    setLoading(true)
    const r = await speak(text, s.id, { force: true })
    setLoading(false)
    if (!r.ok && r.error && r.error !== 'Voice is off') toast(`Voice unavailable: ${r.error}`, { ms: 4000 })
  }

  const go = (d) => {
    stopVoice()
    setShown('say')
    setI((x) => Math.max(0, Math.min(steps.length - 1, x + d)))
  }

  if (!step) return <p className="text-muted">No voice lesson for this subject yet.</p>

  return (
    <div className="anim-fade-up flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>
          Voice lesson · step {i + 1} of {steps.length}
        </Eyebrow>
        <div className="flex gap-1">
          {steps.map((_, k) => (
            <span key={k} className="h-1.5 rounded-full transition-all" style={{ width: k === i ? 20 : 7, background: k <= i ? s.color : 'rgb(24 24 29 / .12)' }} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent-ink">
            <Mic size={16} />
          </span>
          <h3 className="font-display text-[20px] font-extrabold leading-tight" style={{ color: s.ink }}>
            {step.title}
          </h3>
        </div>
        <div className="mt-3">
          <Waveform color={s.color} active={speaking} />
        </div>
        <p key={shown + i} className="anim-fade-up mt-2 text-[15px] leading-relaxed text-ink/85">
          {shown !== 'say' && <b className="mr-1 text-accent-ink">{shown === 'simpler' ? 'Simpler:' : 'Example:'}</b>}
          {step[shown]}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button onClick={() => play('say')} className="btn-3d btn-3d-accent flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl bg-accent px-2 text-[12.5px] font-bold text-on-accent">
          {loading && shown === 'say' ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />} Read aloud
        </button>
        <button onClick={() => play('simpler')} className="btn-3d flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl border border-line bg-white px-2 text-[12.5px] font-bold">
          {loading && shown === 'simpler' ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />} Explain simpler
        </button>
        <button onClick={() => play('example')} className="btn-3d flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl border border-line bg-white px-2 text-[12.5px] font-bold">
          {loading && shown === 'example' ? <Loader2 size={16} className="animate-spin" /> : <Lightbulb size={16} />} Give an example
        </button>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <button onClick={() => go(-1)} disabled={i === 0} className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-[13px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink disabled:opacity-30">
          <ArrowLeft size={15} /> Previous
        </button>
        {speaking && (
          <button onClick={stopVoice} className="flex min-h-[40px] items-center gap-1.5 rounded-full bg-ink/[.06] px-3 text-[12px] font-bold">
            <Square size={12} fill="currentColor" /> Stop
          </button>
        )}
        <button onClick={() => go(1)} disabled={i === steps.length - 1} className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-[13px] font-semibold text-muted hover:bg-ink/[.05] hover:text-ink disabled:opacity-30">
          Next <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
