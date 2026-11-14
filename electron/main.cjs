// Electron main process: window, settings storage, and the Fish Audio voice bridge.
const { app, BrowserWindow, ipcMain, shell, nativeTheme, session, dialog } = require('electron')

// Never fail silently: if startup breaks, tell the user what happened.
process.on('uncaughtException', (err) => {
  try {
    dialog.showErrorBox('Nakano Academy hit a problem', String((err && err.stack) || err))
  } catch {}
})
const path = require('node:path')
const fs = require('node:fs')

const isMac = process.platform === 'darwin'
const DEV_URL = process.env.VITE_DEV_SERVER_URL

/* ── Google sign-in return link (nakano://auth-callback?code=…) ──
   Sign-in happens in the user's default browser; Supabase sends it back to this
   custom link, and the OS hands the link to this app. */
const PROTOCOL = 'nakano'
let mainWindow = null
let pendingAuthUrl = null

if (process.defaultApp && process.argv.length >= 2) {
  app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [path.resolve(process.argv[1])])
} else {
  app.setAsDefaultProtocolClient(PROTOCOL)
}

function deliverAuthUrl(url) {
  if (!url || !url.startsWith(`${PROTOCOL}://`)) return
  pendingAuthUrl = url
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.show()
    mainWindow.focus()
    mainWindow.webContents.send('auth:callback', url)
  }
}

// One running copy: a second launch (Windows passes the link this way) forwards its link.
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', (_e, argv) => deliverAuthUrl(argv.find((a) => a.startsWith(`${PROTOCOL}://`))))
}
app.on('open-url', (e, url) => {
  e.preventDefault()
  deliverAuthUrl(url)
})
deliverAuthUrl(process.argv.find((a) => a.startsWith(`${PROTOCOL}://`)))

ipcMain.handle('auth:take-pending', () => {
  const u = pendingAuthUrl
  pendingAuthUrl = null
  return u
})
// Only the Supabase sign-in URL may be opened from the page.
ipcMain.handle('auth:open-external', (_e, url) => {
  try {
    const u = new URL(url)
    if (u.protocol === 'https:' && (u.hostname.endsWith('.supabase.co') || u.hostname === 'accounts.google.com')) {
      shell.openExternal(url)
      return true
    }
  } catch {}
  return false
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
    ...(isMac ? {} : { titleBarOverlay: { color: '#f6f3ee', symbolColor: '#3f3f46', height: 44 } }),
    ...(fs.existsSync(path.join(__dirname, '..', 'build', 'icon.png')) ? { icon: path.join(__dirname, '..', 'build', 'icon.png') } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      autoplayPolicy: 'no-user-gesture-required',
    },
  })
  nativeTheme.themeSource = 'light'
  mainWindow = win
  win.on('closed', () => (mainWindow = null))
  win.once('ready-to-show', () => win.show())
  // Show the window even if the first paint is slow or the page fails, so it never stays invisible.
  setTimeout(() => !win.isDestroyed() && !win.isVisible() && win.show(), 3000)
  win.webContents.on('did-fail-load', (_e, code, desc, url) => {
    win.show()
    dialog.showErrorBox('Nakano Academy could not load', `${desc} (${code})\n${url}`)
  })
  win.webContents.on('render-process-gone', (_e, details) => {
    dialog.showErrorBox('Nakano Academy stopped', `The window process exited: ${details.reason}. Please reopen the app.`)
  })

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
