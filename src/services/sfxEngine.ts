// Duolingo-style sound effects, synthesized with the Web Audio API (no files, no latency).

let ctx: AudioContext | null = null
let master: GainNode | null = null
let enabled = true

function audio(): AudioContext | null {
  if (!enabled) return null
  try {
    if (!ctx) {
      ctx = new AudioContext()
      master = ctx.createGain()
      master.gain.value = 0.55
      master.connect(ctx.destination)
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

export function setSfxEnabled(on: boolean) {
  enabled = on
}
export const sfxEnabled = () => enabled

/** One enveloped note: fast attack, warm exponential decay. */
function note(freq: number, start: number, dur: number, { type = 'sine' as OscillatorType, gain = 0.32, attack = 0.008, dest }: { type?: OscillatorType; gain?: number; attack?: number; dest?: AudioNode } = {}) {
  const c = ctx!
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(g).connect(dest || master!)
  osc.start(start)
  osc.stop(start + dur + 0.02)
}

/** Correct answer: E5 → B5 with a soft E6 overtone. */
export function playCorrect() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  note(659.25, t, 0.22, { type: 'triangle', gain: 0.3 })
  note(987.77, t + 0.085, 0.42, { type: 'triangle', gain: 0.34 })
  note(1318.51, t + 0.085, 0.36, { type: 'sine', gain: 0.07 })
}

/** Wrong answer: low-pass filtered F3 → D3 thud. */
export function playWrong() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 520
  lp.Q.value = 0.7
  lp.connect(master!)
  note(174.61, t, 0.2, { type: 'triangle', gain: 0.42, attack: 0.006, dest: lp })
  note(146.83, t + 0.13, 0.32, { type: 'triangle', gain: 0.42, attack: 0.006, dest: lp })
}

/** Streak milestone / lesson complete: C5 → E5 → G5 → C6 arpeggio. */
export function playFanfare() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    note(f, t + i * 0.095, i === 3 ? 0.6 : 0.24, { type: 'triangle', gain: 0.28 })
    note(f * 2, t + i * 0.095, i === 3 ? 0.45 : 0.18, { type: 'sine', gain: 0.05 })
  })
}

/** Button press / card flip: 800 Hz → 300 Hz pop in 18 ms. */
export function playPop() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, t)
  osc.frequency.exponentialRampToValueAtTime(300, t + 0.018)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.003)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
  osc.connect(g).connect(master!)
  osc.start(t)
  osc.stop(t + 0.06)
}

/** Resolves after the given milliseconds; used to sequence SFX before speech. */
export const afterSfx = (ms = 380) => new Promise((r) => setTimeout(r, ms))
