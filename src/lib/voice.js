// Fish Audio voice playback. The request itself runs in Electron's main process
// (electron/main.cjs) so the API key never reaches the page. In a plain browser
// build there is no bridge, and voice is simply unavailable.

const bridge = typeof window !== 'undefined' ? window.nakano : undefined
export const voiceAvailable = Boolean(bridge?.voice)

let current = null
let settingsCache = null

export async function getSettings() {
  if (!bridge) return null
  settingsCache = await bridge.settings.get()
  return settingsCache
}

export async function saveSettings(patch) {
  if (!bridge) return null
  settingsCache = await bridge.settings.set(patch)
  return settingsCache
}

export function stopVoice() {
  if (current) {
    current.pause()
    URL.revokeObjectURL(current.src)
    current = null
  }
}

/** Speak a line in a sister's voice. Resolves to { ok, error? }. Never throws. */
export async function speak(text, sister, { force = false } = {}) {
  if (!bridge) return { ok: false, error: 'Voice needs the desktop app.' }
  const s = settingsCache || (await getSettings())
  if (!force && (!s?.voiceEnabled || !s?.hasApiKey)) return { ok: false, error: 'Voice is off.' }
  stopVoice()
  const res = await bridge.voice.speak(text, sister, force)
  if (!res.ok) return res
  const url = URL.createObjectURL(new Blob([res.audio], { type: res.mime }))
  current = new Audio(url)
  current.onended = () => stopVoice()
  try {
    await current.play()
    return { ok: true }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}
