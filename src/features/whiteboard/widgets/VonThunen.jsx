import { useEffect, useRef, useState } from 'react'

// Von Thünen rings + bid-rent chart. Value: { ring: 'market'|'dairy'|'forest'|'grain'|'ranching'|null, distance: 0-100, transport: 1-10 }.
// The marker at `distance` decides the ring: 0 km is the market, beyond the last ring is wilderness (null).

// Rent R = Y(p − c) − Y·t·d, with t = k × transport. Order is inner → outer; boundaries scale with 1 / transport.
const USES = [
  { id: 'dairy', name: 'Dairy & market gardening', short: 'Dairy', Y: 20, p: 40, c: 12, k: 0.2, fill: '#a3d977', line: '#5fa83a',
    why: 'Milk, fruit and vegetables spoil fast and are heavy, so they must reach the market quickly. They earn the most per acre, so they outbid every other use for the closest land.' },
  { id: 'forest', name: 'Forest (wood & fuel)', short: 'Forest', Y: 15, p: 40, c: 15, k: 0.1, fill: '#2f7d4f', line: '#2f7d4f',
    why: 'In 1826 wood was the main fuel and building material. It is bulky and heavy to haul, so it stays close to the city even though it earns less per acre than dairy.' },
  { id: 'grain', name: 'Grains & field crops', short: 'Grain', Y: 10, p: 30, c: 11, k: 0.05, fill: '#f2c94c', line: '#c99a12',
    why: 'Wheat and rye do not spoil and are light for their value, so they can travel farther. They need large fields, which cheaper land farther out provides.' },
  { id: 'ranching', name: 'Livestock ranching', short: 'Ranch', Y: 2, p: 60, c: 12, k: 0.1, fill: '#c8875a', line: '#a8653a',
    why: 'Animals can walk themselves to market, and grazing needs huge areas, so ranching takes the cheapest, most distant land.' },
]
const MARKET_WHY = 'The central city where every farmer sells. Land rent is highest here because transport cost to market is zero.'
const WILD_WHY = 'Too far from the market: transport costs eat all profit, so no use earns positive rent. The land stays wilderness.'

const A = (u) => u.Y * (u.p - u.c)
const slope = (u, T) => u.Y * u.k * T
const rentAt = (u, d, T) => A(u) - slope(u, T) * d
function bands(T) {
  return USES.map((u, i) => {
    const n = USES[i + 1]
    const end = n ? (A(u) - A(n)) / (slope(u, T) - slope(n, T)) : A(u) / slope(u, T)
    return { u, end }
  }).map((b, i, all) => ({ ...b, start: i ? all[i - 1].end : 0 }))
}
const winner = (d, T) => bands(T).find((b) => d >= b.start && d < b.end) ?? null
const ringAt = (d, T) => (d === 0 ? 'market' : winner(d, T)?.u.id ?? null)
const midOf = (b) => (b.start >= 100 ? null : Math.max(1, Math.round((b.start + Math.min(b.end, 100)) / 2)))
const clampInt = (v, lo, hi) => Math.min(hi, Math.max(lo, Math.round(Number(v)) || lo))
const fmt = (n) => String(Math.round(n * 100) / 100)

// Ring diagram geometry
const RC = 120, RMAX = 108
const rr = (km) => (Math.min(km, 100) / 100) * RMAX
const annulus = (r0, r1) =>
  `M${RC - r1},${RC} A${r1},${r1} 0 1 0 ${RC + r1},${RC} A${r1},${r1} 0 1 0 ${RC - r1},${RC} Z` +
  (r0 > 0.5 ? ` M${RC - r0},${RC} A${r0},${r0} 0 1 1 ${RC + r0},${RC} A${r0},${r0} 0 1 1 ${RC - r0},${RC} Z` : '')
// Bid-rent chart geometry
const CW = 340, CH = 222, L = 42, R = 330, T = 12, B = 182
const cx = (d) => L + (d / 100) * (R - L)
const cy = (rent) => B - (Math.max(rent, 0) / 600) * (B - T)

export default function VonThunen({ props = {}, onChange }) {
  const highlight = props.highlight ?? null
  const startDistance = (h) => {
    if (h === 'market' || !h) return 0
    const b = bands(5).find((x) => x.u.id === h)
    return b ? midOf(b) ?? 0 : 0
  }
  const [transport, setTransport] = useState(5)
  const [distance, setDistance] = useState(() => startDistance(highlight))
  const [prev, setPrev] = useState(highlight)
  if (highlight !== prev) {
    setPrev(highlight)
    setTransport(5)
    setDistance(startDistance(highlight))
  }

  const ring = ringAt(distance, transport)
  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.({ ring, distance, transport })
  }, [ring, distance, transport])

  const bs = bands(transport)
  const win = distance === 0 ? null : winner(distance, transport)
  const selectRing = (id) => {
    if (id === 'market') return setDistance(0)
    const m = midOf(bs.find((b) => b.u.id === id))
    if (m != null) setDistance(m)
  }
  const drag = useRef(false)
  const fromPointer = (e) => {
    const svg = e.currentTarget
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM().inverse())
    setDistance(clampInt(((p.x - L) / (R - L)) * 100, 0, 100))
  }
  const info = ring === 'market' ? { name: 'Central market (city)', why: MARKET_WHY } : win ? { name: win.u.name, why: win.u.why } : { name: 'Wilderness', why: WILD_WHY }

  return (
    <div className="@container w-full text-ink">
      <div className="grid items-center gap-3 @xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <svg viewBox="0 0 240 240" className="mx-auto h-auto max-h-[250px] w-full select-none" role="group" aria-label="Von Thünen rings: click a ring">
          <circle cx={RC} cy={RC} r={RMAX} fill="#efe9dd" />
          {bs.map((b) => {
            const r0 = rr(b.start), r1 = rr(b.end), rIn = Math.max(r0, 9)
            if (r1 - r0 < 0.5) return null
            const on = ring === b.u.id
            return (
              <g key={b.u.id} className="cursor-pointer" onClick={() => selectRing(b.u.id)}>
                <path d={annulus(r0, r1)} fillRule="evenodd" fill={b.u.fill} stroke={on ? 'var(--accent-ink)' : '#fff'} strokeWidth={on ? 2.5 : 1} />
                {r1 - rIn >= 11 && (
                  <text x={RC} y={RC - (rIn + r1) / 2 + 3} fontSize="9" fontWeight="700" textAnchor="middle" fill={b.u.id === 'forest' || b.u.id === 'ranching' ? '#fff' : '#1f2a12'} pointerEvents="none">
                    {b.u.short}
                  </text>
                )}
              </g>
            )
          })}
          <line x1={RC} y1={RC} x2={RC + RMAX + 4} y2={RC} stroke="#18181d" strokeOpacity="0.45" strokeDasharray="3 3" pointerEvents="none" />
          {[50, 100].map((k) => (
            <text key={k} x={RC + rr(k)} y={RC + 12} fontSize="8" textAnchor="middle" fill="#6b6b76" pointerEvents="none">{k} km</text>
          ))}
          <circle cx={RC} cy={RC} r={8} className="cursor-pointer" style={{ fill: 'var(--accent)' }} stroke={ring === 'market' ? 'var(--accent-ink)' : '#fff'} strokeWidth="2" onClick={() => selectRing('market')} />
          <g pointerEvents="none" transform={`translate(${rr(distance)} 0)`}>
            <circle cx={RC} cy={RC} r="5" fill="#fff" stroke="var(--accent-ink)" strokeWidth="2.5" />
            <text x={RC} y={RC - 9} fontSize="9" fontWeight="800" textAnchor="middle" fill="var(--accent-ink)">{distance} km</text>
          </g>
        </svg>

        <svg
          viewBox={`0 0 ${CW} ${CH}`} className="h-auto w-full cursor-ew-resize select-none" style={{ touchAction: 'pan-y' }}
          role="img" aria-label="Bid-rent chart: drag to move the distance marker"
          onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); fromPointer(e) }}
          onPointerMove={(e) => drag.current && fromPointer(e)}
          onPointerUp={() => { drag.current = false }}
          onPointerCancel={() => { drag.current = false }}
        >
          {[0, 200, 400, 600].map((v) => (
            <g key={v}>
              <line x1={L} x2={R} y1={cy(v)} y2={cy(v)} stroke="#18181d" strokeOpacity={v ? 0.06 : 0.3} />
              <text x={L - 5} y={cy(v) + 3} fontSize="9" textAnchor="end" fill="#6b6b76">{v}</text>
            </g>
          ))}
          <text transform={`translate(11 ${(T + B) / 2}) rotate(-90)`} fontSize="9.5" textAnchor="middle" fill="#6b6b76">Land rent (bid rent)</text>
          {bs.map((b) => {
            const zero = Math.min(100, A(b.u) / slope(b.u, transport))
            const s = Math.min(b.start, 100), e = Math.min(b.end, 100)
            return (
              <g key={b.u.id}>
                <line x1={cx(0)} y1={cy(rentAt(b.u, 0, transport))} x2={cx(zero)} y2={cy(rentAt(b.u, zero, transport))} stroke={b.u.line} strokeOpacity="0.35" strokeWidth="1.5" />
                {e > s && <line x1={cx(s)} y1={cy(rentAt(b.u, s, transport))} x2={cx(e)} y2={cy(rentAt(b.u, e, transport))} stroke={b.u.line} strokeWidth="3.5" strokeLinecap="round" />}
                {e > s && <rect x={cx(s)} y={B + 3} width={cx(e) - cx(s)} height={9} fill={b.u.fill} />}
              </g>
            )
          })}
          {[0, 25, 50, 75, 100].map((d) => (
            <text key={d} x={cx(d)} y={B + 23} fontSize="9" textAnchor="middle" fill="#6b6b76">{d}</text>
          ))}
          <text x={(L + R) / 2} y={CH - 2} fontSize="9.5" textAnchor="middle" fill="#6b6b76">Distance from market (km)</text>
          <line x1={cx(distance)} x2={cx(distance)} y1={T} y2={B + 12} stroke="var(--accent-ink)" strokeWidth="1.5" strokeDasharray="4 3" />
          {win && <circle cx={cx(distance)} cy={cy(rentAt(win.u, distance, transport))} r="4.5" fill="#fff" stroke="var(--accent-ink)" strokeWidth="2.5" />}
        </svg>
      </div>

      <div className="mt-2 grid gap-x-4 gap-y-1 @md:grid-cols-2">
        <Slider label="Distance from market" unit=" km" min={0} max={100} value={distance} onChange={setDistance} />
        <Slider label="Transport cost" unit=" / 10" min={1} max={10} value={transport} onChange={setTransport} />
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Pick a ring">
        {[{ id: 'market', short: 'Market', fill: 'var(--accent)' }, ...USES].map((u) => {
          const b = bs.find((x) => x.u.id === u.id)
          const off = b && midOf(b) == null
          return (
            <button key={u.id} disabled={off} onClick={() => selectRing(u.id)} aria-pressed={ring === u.id}
              className={`btn-3d flex min-h-[32px] items-center gap-1.5 rounded-lg border px-2 text-[12px] font-bold disabled:opacity-40 ${ring === u.id ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line bg-white'}`}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: u.fill }} />
              {u.short}{off ? ' (past 100 km)' : ''}
            </button>
          )
        })}
      </div>

      <div className="mt-2 rounded-2xl border border-line bg-accent-softer p-3" aria-live="polite">
        <div className="font-display text-[15px] font-bold text-accent-ink">
          {distance} km: {info.name}
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug">{info.why}</p>
        <div className="mt-1.5 font-mono text-[12px] text-ink">
          R = Y(p − c) − Ytd
          {win && (() => {
            const u = win.u, t = u.k * transport
            return <span className="text-muted">{`  →  ${u.Y}(${u.p} − ${u.c}) − ${u.Y} × ${fmt(t)} × ${distance} = ${fmt(rentAt(u, distance, transport))}`}</span>
          })()}
        </div>
        <p className="mt-1 text-[11px] text-faint">Y yield · p market price · c production cost · t transport cost per unit per km · d distance. Assumes one market, flat land, equal soil.</p>
      </div>
    </div>
  )
}

function Slider({ label, unit, min, max, value, onChange }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-[12px] font-bold text-muted">
        {label}
        <span className="font-mono text-[13px] text-ink">{value}{unit}</span>
      </span>
      <input type="range" min={min} max={max} step={1} value={value} onChange={(e) => onChange(clampInt(e.target.value, min, max))}
        className="w-full" style={{ accentColor: 'var(--accent)' }} aria-label={label} />
    </label>
  )
}
