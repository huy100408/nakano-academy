// Renders build/icon.png (1024²) for electron-builder, plus public/icon.png for the web favicon.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const colors = ['#FACC15', '#A855F7', '#3B82F6', '#22C55E', '#EF4444']
const stripes = colors.map((c, i) => `<rect x="${152 + i * 144}" y="760" width="144" height="56" fill="${c}"/>`).join('')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2830"/><stop offset="1" stop-color="#141318"/></linearGradient>
    <clipPath id="c"><rect x="100" y="100" width="824" height="824" rx="184"/></clipPath>
  </defs>
  <rect x="100" y="100" width="824" height="824" rx="184" fill="url(#g)"/>
  <g clip-path="url(#c)">${stripes}</g>
  <text x="512" y="610" text-anchor="middle" font-family="Hiragino Maru Gothic ProN, Hiragino Sans, sans-serif" font-weight="700" font-size="440" fill="#ffffff">五</text>
  <rect x="100.5" y="100.5" width="823" height="823" rx="184" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="2"/>
</svg>`

mkdirSync('build', { recursive: true })
await sharp(Buffer.from(svg)).png().toFile('build/icon.png')
await sharp(Buffer.from(svg)).resize(256, 256).png().toFile('public/icon.png')
console.log('icons written')
