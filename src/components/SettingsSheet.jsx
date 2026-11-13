import { useEffect, useState } from 'react'
import { KeyRound, Loader2, Mic, Volume2, X } from 'lucide-react'
import { SISTERS } from '../data/sisters.js'
import { getSettings, saveSettings, speak, voiceAvailable } from '../lib/voice.js'
import { Avatar, Eyebrow, toast } from './ui.jsx'
import { introEnabled } from '../intro/Intro.jsx'

export default function SettingsSheet({ onClose, onChange }) {
  const [s, setS] = useState(null)
  const [key, setKey] = useState('')
  const [testing, setTesting] = useState(null)

  useEffect(() => {
    if (voiceAvailable) getSettings().then(setS)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const update = async (patch) => {
    const next = await saveSettings(patch)
    setS(next)
    onChange?.(next)
  }

  const test = async (sis) => {
    setTesting(sis.id)
    const r = await speak(sis.lines.idle[0], sis.id, { force: true })
    setTesting(null)
    if (!r.ok) toast(r.error, { ms: 5000 })
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[2px]" onClick={onClose}>
      <div className="anim-fade-up flex h-full w-[440px] max-w-full flex-col bg-paper shadow-lift" onClick={(e) => e.stopPropagation()}>
        <div className="drag mac-traffic-pad flex items-center justify-between border-b border-line px-6 pb-4 pt-6">
          <div>
            <Eyebrow>Preferences</Eyebrow>
            <h2 className="font-display text-[22px] font-extrabold">Settings</h2>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/[.06]" aria-label="Close">
            <X size={17} />
          </button>
        </div>

        <div className="scroll-thin flex-1 space-y-6 overflow-y-auto p-6">
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Mic size={16} />
              <h3 className="text-[14px] font-bold">Character voices · Fish Audio</h3>
            </div>
            {!voiceAvailable ? (
              <p className="rounded-xl bg-white p-4 text-[13px] text-muted ring-1 ring-line">Voices are available in the desktop app (macOS / Windows). The browser build runs silently.</p>
            ) : !s ? (
              <Loader2 className="animate-spin text-muted" size={18} />
            ) : (
              <div className="space-y-4">
                <label className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-line">
                  <span>
                    <span className="block text-[13.5px] font-semibold">Speak dialogue aloud</span>
                    <span className="block text-[12px] text-muted">{s.hasApiKey ? 'Uses your Fish Audio key' : 'Add an API key first'}</span>
                  </span>
                  <input type="checkbox" className="h-4 w-4 accent-ink" checked={s.voiceEnabled} disabled={!s.hasApiKey} onChange={(e) => update({ voiceEnabled: e.target.checked })} />
                </label>

                <div className="rounded-xl bg-white p-4 ring-1 ring-line">
                  <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold">
                    <KeyRound size={14} /> API key {s.hasApiKey && <span className="rounded-full bg-green-100 px-2 py-px text-[11px] font-bold text-good">saved</span>}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder={s.hasApiKey ? '••••••••  (enter a new key to replace)' : 'Paste your Fish Audio API key'}
                      className="min-w-0 flex-1 rounded-lg border border-line bg-paper px-3 py-2 font-mono text-[12.5px] outline-none focus:border-ink/30"
                    />
                    <button
                      disabled={!key.trim()}
                      onClick={async () => {
                        await update({ fishApiKey: key.trim() })
                        setKey('')
                        toast('API key saved')
                      }}
                      className="rounded-lg bg-ink px-3 text-[12.5px] font-bold text-white disabled:opacity-30"
                    >
                      Save
                    </button>
                  </div>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
                    Stored only on this computer, in the app’s settings file. The key never enters the web page; requests go out from the app’s main process.
                    {s.hasApiKey && (
                      <button onClick={() => update({ fishApiKey: '', voiceEnabled: false })} className="ml-1 font-semibold text-bad underline">
                        Remove key
                      </button>
                    )}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[12px]">
                    <span className="text-muted">Model</span>
                    <input value={s.fishModel} onChange={(e) => update({ fishModel: e.target.value })} className="w-28 rounded-md border border-line bg-paper px-2 py-1 font-mono text-[12px] outline-none" />
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 ring-1 ring-line">
                  <div className="mb-1 text-[13px] font-semibold">Voice model per sister</div>
                  <p className="mb-3 text-[11.5px] text-muted">Paste each voice’s model ID (reference_id) from fish.audio.</p>
                  <div className="space-y-2">
                    {SISTERS.map((sis) => (
                      <div key={sis.id} className="flex items-center gap-2">
                        <Avatar s={sis} size={28} />
                        <input
                          defaultValue={s.voices[sis.id]}
                          onBlur={(e) => e.target.value !== s.voices[sis.id] && update({ voices: { [sis.id]: e.target.value.trim() } })}
                          placeholder={`${sis.first} voice ID`}
                          className="min-w-0 flex-1 rounded-lg border border-line bg-paper px-2.5 py-1.5 font-mono text-[12px] outline-none focus:border-ink/30"
                        />
                        <button onClick={() => test(sis)} disabled={!s.hasApiKey || testing} className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-ink/[.06] hover:text-ink disabled:opacity-30" title="Test voice" aria-label={`Test ${sis.first}'s voice`}>
                          {testing === sis.id ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section>
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
            Nakano Academy is a free, open-source fan project inspired by <i>The Quintessential Quintuplets</i> by Negi Haruba. It is not affiliated with the author, Kodansha, or the anime studios.
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              <span><b className="text-ink">Space</b> flip card</span>
              <span><b className="text-ink">← →</b> browse</span>
              <span><b className="text-ink">1–4</b> answer</span>
              <span><b className="text-ink">Enter</b> next</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
