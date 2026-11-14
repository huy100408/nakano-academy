// Fish Audio (s2.1-pro-free) tutor voices.
// Production: the `fish-tts` Supabase Edge Function (holds the API key, caches MP3s in Storage).
// `npm run dev`: falls back to the Vite proxy at /api/fish-tts (key read server-side from .env.local).
// Playback goes through an AnalyserNode so the UI can draw a live waveform.

import { supabase } from '../lib/supabase'

export const VOICE_IDS: Record<string, string> = {
  ichika: 'ab72b9e7a671480782159a7d7d1fc14d',
  nino: '11393e94e76847fdab0fa0c2f7b28ec1',
  miku: 'cbbac17ad4b44abd8f8d2f92bba92e4a',
  yotsuba: 'ec5383778acc41f69a2b70679f860d8a',
  itsuki: '38e76f4c746f4545acea31e575b82099',
}

/* ── pronunciation ── */
const SUB: Record<string, string> = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' }
const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ⁿ': 'n', '⁻': ' minus ' }

/** Turn math, code and science notation into words a voice can read naturally. */
export function sanitizeForSpeech(input: string): string {
  let s = input
  s = s.replace(/[₀-₉]/g, (c) => SUB[c])
  s = s.replace(/\bO\(\s*([^)]+?)\s*\)/g, (_m, inner) => ` Big O of ${inner} `)
  s = s.replace(/m\/s²/g, ' meters per second squared ').replace(/m\/s\b/g, ' meters per second ')
  s = s.replace(/([A-Za-z0-9)])\s*\^\s*2\b/g, '$1 squared').replace(/([A-Za-z0-9)])\s*\^\s*3\b/g, '$1 cubed')
  s = s.replace(/([A-Za-z0-9)])\s*\^\s*\(?([A-Za-z0-9.\-]+)\)?/g, '$1 to the power of $2')
  s = s.replace(/²/g, ' squared').replace(/³/g, ' cubed')
  s = s.replace(/([A-Za-z0-9])([⁰¹⁴-⁹ⁿ⁻]+)/g, (_m, b, e) => `${b} to the power of ${[...e].map((c) => SUP[c]).join('')}`)
  // Chemical formulas: H2O → "H 2 O", C6H12O6 → "C 6 H 12 O 6"
  s = s.replace(/\b(?=[A-Z][a-z]?\d)((?:[A-Z][a-z]?\d*){2,})\b/g, (f) => f.replace(/([A-Za-z]+)(\d+)/g, '$1 $2 ').trim())
  s = s.replace(/!==/g, ' strictly not equal to ').replace(/===/g, ' strictly equal to ')
  s = s.replace(/!=/g, ' not equal to ').replace(/==/g, ' is equal to ').replace(/≠/g, ' not equal to ')
  s = s.replace(/<=|≤/g, ' less than or equal to ').replace(/>=|≥/g, ' greater than or equal to ')
  s = s.replace(/->|→/g, ' to ').replace(/=>/g, ' gives ')
  s = s.replace(/\+=/g, ' plus equals ').replace(/-=/g, ' minus equals ')
  s = s.replace(/(\d)\s*kg\b/g, '$1 kilograms').replace(/(\d)\s*N\b/g, '$1 newtons').replace(/(\d)\s*J\b/g, '$1 joules')
  s = s.replace(/(\d)\s*V\b/g, '$1 volts').replace(/(\d)\s*A\b/g, '$1 amps').replace(/(\d)\s*Ω/g, '$1 ohms').replace(/Ω/g, ' ohms')
  s = s.replace(/√\s*\(?([^)\s]+)\)?/g, ' square root of $1 ').replace(/π/g, ' pi ').replace(/θ/g, ' theta ').replace(/Δ/g, ' delta ')
  s = s.replace(/×|\s\*\s/g, ' times ').replace(/÷/g, ' divided by ').replace(/−/g, ' minus ')
  s = s.replace(/(\d)\s*%/g, '$1 percent').replace(/°/g, ' degrees')
  s = s.replace(/\s=\s/g, ' equals ').replace(/\s\+\s/g, ' plus ').replace(/\s<\s/g, ' less than ').replace(/\s>\s/g, ' greater than ')
  s = s.replace(/`/g, '').replace(/_/g, ' ').replace(/\n+/g, '. ').replace(/[{}[\]]/g, ' ')
  return s.replace(/\s+/g, ' ').replace(/\s+([.,!?])/g, '$1').trim()
}

/* ── playback ── */
let ctx: AudioContext | null = null
let analyser: AnalyserNode | null = null
let gain: GainNode | null = null
let current: HTMLAudioElement | null = null
let currentSource: MediaElementAudioSourceNode | null = null
const urlCache = new Map<string, string>()
const listeners = new Set<(speaking: boolean, sister: string | null) => void>()
let prefs = { enabled: true, volume: 0.9, speed: 1 }

export function setVoicePrefs(p: Partial<typeof prefs>) {
  prefs = { ...prefs, ...p }
  if (gain) gain.gain.value = prefs.volume
  if (current) current.playbackRate = prefs.speed
}
export const voicePrefs = () => prefs

export function onSpeaking(fn: (speaking: boolean, sister: string | null) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
const emit = (on: boolean, sister: string | null) => listeners.forEach((fn) => fn(on, sister))

/** The analyser feeding the waveform visualizer (null until the first line plays). */
export const getAnalyser = () => analyser

function graph() {
  if (!ctx) {
    ctx = new AudioContext()
    analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    gain = ctx.createGain()
    gain.gain.value = prefs.volume
    analyser.connect(gain).connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function stopVoice() {
  if (current) {
    current.pause()
    current.src = ''
  }
  currentSource?.disconnect()
  current = null
  currentSource = null
  emit(false, null)
}

async function fetchUrl(text: string, voiceId: string): Promise<string> {
  const key = `${voiceId}:${text}`
  const hit = urlCache.get(key)
  if (hit) return hit
  let url: string | null = null
  try {
    const { data, error } = await supabase.functions.invoke('fish-tts', { body: { text, reference_id: voiceId } })
    if (error) throw error
    if (data instanceof Blob) url = URL.createObjectURL(data)
    else if (data?.url) url = data.url
    else throw new Error(data?.error || 'No audio returned')
  } catch (e) {
    if (!import.meta.env.DEV) throw e
    // Local development fallback through the Vite proxy (see vite.config.js).
    const res = await fetch('/api/fish-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, reference_id: voiceId, format: 'mp3', mp3_bitrate: 128, normalize: true, latency: 'balanced' }),
    })
    if (!res.ok) throw new Error(`Voice proxy ${res.status}`)
    url = URL.createObjectURL(await res.blob())
  }
  if (!url) throw new Error('No audio returned')
  urlCache.set(key, url)
  return url
}

/**
 * Speak a line in a sister's voice. Resolves when playback ends (or fails).
 * Never throws: voice is an enhancement, the app works without it.
 */
export async function speak(text: string, sister: string, { force = false } = {}): Promise<{ ok: boolean; error?: string }> {
  const voiceId = VOICE_IDS[sister]
  if (!voiceId || (!prefs.enabled && !force)) return { ok: false, error: 'Voice is off' }
  const clean = sanitizeForSpeech(text).slice(0, 900)
  if (!clean) return { ok: false }
  stopVoice()
  try {
    const url = await fetchUrl(clean, voiceId)
    const c = graph()
    const el = new Audio()
    el.crossOrigin = 'anonymous'
    el.preservesPitch = true
    el.src = url
    el.playbackRate = prefs.speed
    current = el
    try {
      currentSource = c.createMediaElementSource(el)
      currentSource.connect(analyser!)
    } catch {
      el.volume = prefs.volume
    }
    emit(true, sister)
    await el.play()
    await new Promise<void>((resolve) => {
      el.onended = () => resolve()
      el.onerror = () => resolve()
      el.onpause = () => resolve()
    })
    if (current === el) {
      current = null
      currentSource?.disconnect()
      currentSource = null
      emit(false, null)
    }
    return { ok: true }
  } catch (e: any) {
    emit(false, null)
    return { ok: false, error: e?.message || String(e) }
  }
}
