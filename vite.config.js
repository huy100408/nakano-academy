import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Strict CSP for the packaged app only (the dev server needs inline scripts for HMR).
const CSP =
  "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; " +
  "style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self'; connect-src 'self' https://api.fish.audio; frame-src https://www.youtube-nocookie.com https://www.youtube.com"

const cspPlugin = {
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml: (html) =>
    html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
}

// base './' so the built app loads from file:// inside Electron.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), cspPlugin],
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 900 },
})
