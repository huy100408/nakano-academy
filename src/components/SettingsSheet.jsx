import { useEffect, useState } from 'react'
import { Loader2, Mic, Music, Volume2, X } from 'lucide-react'
import { SISTERS } from '../data/sisters.js'
import { introEnabled } from '../intro/Intro.jsx'
import { playCorrect } from '../services/sfxEngine'
import { speak } from '../services/voiceTutor'
import { useAcademy } from '../state/useAcademy'
import { Avatar, Eyebrow, toast } from './ui.jsx'

function Toggle({ label, sub, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-white p-4 ring-1 ring-line">
      <span>
        <span className="block text-[13.5px] font-semibold">{label}</span>
        {sub && <span className="block text-[12px] text-muted">{sub}</span>}
      </span>
      <input type="checkbox" className="h-4 w-4 accent-ink" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  )
}

export default function SettingsSheet({ onClose }) {
  const { state, setPrefs } = useAcademy()
  const p = state.profile
  const [testing, setTesting] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const test = async (sis) => {
    setTesting(sis.id)
    const r = await speak(sis.lines.idle[0], sis.id, { force: true })
    setTesting(null)
    if (!r.ok) toast(`Voice unavailable: ${r.error}`, { ms: 5000 })
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[2px]" onClick={onClose}>
      <div className="anim-fade-up safe-area flex h-full w-[440px] max-w-full flex-col bg-paper shadow-lift" onClick={(e) => e.stopPropagation()}>
        <div className="drag mac-traffic-pad flex items-center justify-between border-b border-line px-6 pb-4 pt-6">
          <div>
            <Eyebrow>Preferences · synced to your account</Eyebrow>
            <h2 className="font-display text-[22px] font-extrabold">Settings</h2>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/[.06]" aria-label="Close">
            <X size={17} />
          </button>
        </div>

        <div className="scroll-thin flex-1 space-y-6 overflow-y-auto p-6">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mic size={16} />
              <h3 className="text-[14px] font-bold">Tutor voices (Fish Audio)</h3>
            </div>
            <Toggle label="Speak reactions and explanations" sub="Each sister reads her lines in her own voice." checked={p.voice_enabled} onChange={(v) => setPrefs({ voice_enabled: v })} />
            <div className="space-y-4 rounded-xl bg-white p-4 ring-1 ring-line">
              <label className="block">
                <span className="mb-1 flex justify-between text-[13px] font-semibold">
                  Volume <span className="font-mono text-muted">{Math.round(Number(p.voice_volume) * 100)}%</span>
                </span>
                <input type="range" min="0" max="1" step="0.05" value={Number(p.voice_volume)} onChange={(e) => setPrefs({ voice_volume: Number(e.target.value) })} className="w-full accent-ink" />
              </label>
              <label className="block">
                <span className="mb-1 flex justify-between text-[13px] font-semibold">
                  Speed <span className="font-mono text-muted">{Number(p.voice_speed).toFixed(2)}×</span>
                </span>
                <input type="range" min="0.75" max="1.5" step="0.05" value={Number(p.voice_speed)} onChange={(e) => setPrefs({ voice_speed: Number(e.target.value) })} className="w-full accent-ink" />
              </label>
            </div>
            <div className="rounded-xl bg-white p-4 ring-1 ring-line">
              <div className="mb-3 text-[13px] font-semibold">Test a voice</div>
              <div className="grid grid-cols-5 gap-2">
                {SISTERS.map((sis) => (
                  <button key={sis.id} onClick={() => test(sis)} disabled={!!testing} className="btn-3d flex flex-col items-center gap-1 rounded-xl border border-line bg-white py-2 text-[11.5px] font-bold disabled:opacity-50">
                    <Avatar s={sis} size={30} />
                    {testing === sis.id ? <Loader2 size={12} className="animate-spin" /> : <Volume2 size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Music size={16} />
              <h3 className="text-[14px] font-bold">Sound effects</h3>
            </div>
            <Toggle
              label="Chimes, thuds and clicks"
              sub="A ding for right answers, a thud for wrong ones, a fanfare for streaks."
              checked={p.sfx_enabled}
              onChange={(v) => {
                setPrefs({ sfx_enabled: v })
                if (v) setTimeout(playCorrect, 50)
              }}
            />
            <label className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-line">
              <span>
                <span className="block text-[13.5px] font-semibold">Play intro on launch</span>
                <span className="block text-[12px] text-muted">The opening clip and title animation. Esc skips it.</span>
              </span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-ink"
                defaultChecked={introEnabled()}
                onChange={(e) => {
                  try {
                    localStorage.setItem('nakano-academy:intro', e.target.checked ? 'on' : 'off')
                  } catch {}
                }}
              />
            </label>
          </section>

          <section className="rounded-xl bg-white p-4 text-[12px] leading-relaxed text-muted ring-1 ring-line">
            <div className="mb-1 text-[13px] font-semibold text-ink">About</div>
            Nakano Academy is a free, open-source fan project inspired by <i>The Quintessential Quintuplets</i> by Negi Haruba. It is not affiliated with the author, Kodansha or the anime studios. Built by Brian Nguyen.
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              <span><b className="text-ink">1–5</b> switch tutor</span>
              <span><b className="text-ink">Space</b> flip card</span>
              <span><b className="text-ink">A–D</b> answer</span>
              <span><b className="text-ink">Enter</b> next</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
