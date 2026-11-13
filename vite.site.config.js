import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// The GitHub Pages website. The web version of the app is built separately into site-dist/app.
export default defineConfig({
  root: fileURLToPath(new URL('./site', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  base: '/nakano-academy/',
  plugins: [react(), tailwindcss()],
  build: { outDir: fileURLToPath(new URL('./site-dist', import.meta.url)), emptyOutDir: true },
})
