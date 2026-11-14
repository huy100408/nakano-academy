import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Strict CSP for the packaged app only (the dev server needs inline scripts for HMR).
const CSP =
  "default-src 'self'; img-src 'self' data: blob: https:; media-src 'self' blob: https://*.supabase.co; " +
  "style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self'; connect-src 'self' https://api.fish.audio https://*.supabase.co wss://*.supabase.co; frame-src https://www.youtube-nocookie.com https://www.youtube.com"

const cspPlugin = {
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml: (html) =>
    html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
}

// base './' so the built app loads from file:// inside Electron.
export default defineConfig(({ mode }) => {
  // Server-side only: FISH_AUDIO_* (no VITE_ prefix) is never exposed to the bundle.
  const env = loadEnv(mode, process.cwd(), 'FISH_AUDIO_')
  return {
  base: './',
  plugins: [react(), tailwindcss(), cspPlugin],
  server: {
    proxy: env.FISH_AUDIO_API_KEY
      ? {
          // `npm run dev` voice fallback: /api/fish-tts → Fish Audio, key added here.
          '/api/fish-tts': {
            target: 'https://api.fish.audio',
            changeOrigin: true,
            rewrite: () => '/v1/tts',
            headers: { Authorization: `Bearer ${env.FISH_AUDIO_API_KEY}`, model: env.FISH_AUDIO_MODEL || 's2.1-pro-free' },
            configure: (proxy) =>
              proxy.on('proxyReq', (req) => {
                req.removeHeader('cookie')
              }),
          },
        }
      : undefined,
  },
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 900 },
  }
})
