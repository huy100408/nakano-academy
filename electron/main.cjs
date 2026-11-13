// Electron main process: window, settings storage, and the Fish Audio voice bridge.
const { app, BrowserWindow, ipcMain, shell, nativeTheme, session } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

const isMac = process.platform === 'darwin'
const DEV_URL = process.env.VITE_DEV_SERVER_URL

/* ── Settings (kept in the OS user-data folder, never in the repo) ── */
const settingsFile = () => path.join(app.getPath('userData'), 'settings.json')
const DEFAULT_SETTINGS = {
  voiceEnabled: false,
  fishApiKey: '',
  fishModel: 's1',
  voices: { ichika: '', nino: '', miku: '', yotsuba: '', itsuki: '' },
}
function readSettings() {
  try {
    const raw = JSON.parse(fs.readFileSync(settingsFile(), 'utf8'))
    return { ...DEFAULT_SETTINGS, ...raw, voices: { ...DEFAULT_SETTINGS.voices, ...(raw.voices || {}) } }
  } catch {
    return { ...DEFAULT_SETTINGS, fishApiKey: process.env.FISH_AUDIO_API_KEY || '' }
  }
}
function writeSettings(next) {
  fs.mkdirSync(path.dirname(settingsFile()), { recursive: true })
  fs.writeFileSync(settingsFile(), JSON.stringify(next, null, 2), { mode: 0o600 })
}
// The renderer never receives the raw key, only whether one is set.
const publicSettings = (s) => ({ ...s, fishApiKey: undefined, hasApiKey: Boolean(s.fishApiKey) })

ipcMain.handle('settings:get', () => publicSettings(readSettings()))
ipcMain.handle('settings:set', (_e, patch) => {
  const cur = readSettings()
  const next = { ...cur, ...patch, voices: { ...cur.voices, ...(patch.voices || {}) } }
  if (patch.fishApiKey === undefined) next.fishApiKey = cur.fishApiKey
  writeSettings(next)
  return publicSettings(next)
})

/* ── Fish Audio TTS (https://docs.fish.audio) ──
   Runs in the main process so the API key stays out of the page and CORS is not an issue. */
ipcMain.handle('voice:speak', async (_e, { text, sister, force }) => {
  const s = readSettings()
  if (!s.voiceEnabled && !force) return { ok: false, error: 'Voice is turned off.' }
  if (!s.fishApiKey) return { ok: false, error: 'No Fish Audio API key set.' }
  const referenceId = s.voices[sister]
  try {
    const res = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${s.fishApiKey}`,
        'Content-Type': 'application/json',
        model: s.fishModel || 's1',
      },
      body: JSON.stringify({ text, format: 'mp3', ...(referenceId ? { reference_id: referenceId } : {}) }),
    })
    if (!res.ok) return { ok: false, error: `Fish Audio ${res.status}: ${(await res.text()).slice(0, 200)}` }
    return { ok: true, audio: new Uint8Array(await res.arrayBuffer()), mime: 'audio/mpeg' }
  } catch (err) {
    return { ok: false, error: String(err.message || err) }
  }
})

/* ── Window ── */
function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    show: false,
    backgroundColor: '#F6F3EE',
    title: 'Nakano Academy',
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    trafficLightPosition: { x: 18, y: 20 },
    ...(isMac ? {} : { titleBarOverlay: { color: '#00000000', symbolColor: '#3F3F46', height: 44 } }),
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      autoplayPolicy: 'no-user-gesture-required',
    },
  })
  nativeTheme.themeSource = 'light'
  win.once('ready-to-show', () => win.show())

  // Open external links in the user's browser, never inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url)
    return { action: 'deny' }
  })
  win.webContents.on('will-navigate', (e, url) => {
    if (DEV_URL && url.startsWith(DEV_URL)) return
    if (!url.startsWith('file://')) e.preventDefault()
  })

  if (DEV_URL) win.loadURL(DEV_URL)
  else win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
}

app.whenReady().then(() => {
  // YouTube's embed refuses to play without a web referrer, which file:// pages lack.
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ['https://www.youtube-nocookie.com/*', 'https://www.youtube.com/*'] },
    (details, cb) => cb({ requestHeaders: { ...details.requestHeaders, Referer: 'https://huy100408.github.io/' } }),
  )
  createWindow()
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
})
app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})
