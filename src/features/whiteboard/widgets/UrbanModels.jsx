import { useEffect, useRef, useState } from 'react'

// North American urban models with clickable zones. Value: { model, zone: string | null }.

const C = {
  cbd: 'var(--accent)', transition: '#e8836b', working: '#f2b880', residential: '#f6dc8f', commuter: '#bfe0b5',
  industry: '#a7a9b4', heavy: '#6f7280', low: '#f2b880', middle: '#f6dc8f', high: '#9fd3c7',
  outlying: '#c4b5fd', rsub: '#bfe0b5', isub: '#c9c2b8', edge: '#8fb8e8', suburb: '#e7efd9', office: '#cfc7f0', beltway: '#4b5563',
}
const z = (id, n, name, color, income, density, desc) => ({ id, n, name, color, income, density, desc })
const CBD = (desc) => z('cbd', 1, 'Central Business District (CBD)', C.cbd, 'Mixed; few residents', 'Very high (offices, stores)', desc)

const MODELS = {
  burgess: {
    label: 'Burgess', title: 'Concentric zone model (Burgess, 1925)',
    note: 'Based on 1920s Chicago: the city grows outward in rings, and wealth rises with distance from the center.',
    zones: [
      CBD('Offices, department stores and the highest land values at the heart of the city.'),
      z('transition', 2, 'Zone in transition', C.transition, 'Low', 'High', 'Factories mixed with run-down rental housing; the first stop for new immigrants.'),
      z('working', 3, 'Working-class homes', C.working, 'Low to moderate', 'Medium-high', 'Modest older homes of factory workers who moved out of zone 2 but stay near their jobs.'),
      z('residential', 4, 'Middle-class residential', C.residential, 'Middle', 'Medium', 'Newer single-family homes and apartments for the middle class.'),
      z('commuter', 5, 'Commuter zone', C.commuter, 'Upper-middle to high', 'Low', 'Suburbs and satellite towns beyond the built-up area; residents commute to the CBD.'),
    ],
  },
  hoyt: {
    label: 'Hoyt', title: 'Sector model (Hoyt, 1939)',
    note: 'Cities grow in wedges along transport routes; a land use that starts in one direction keeps expanding outward that way.',
    zones: [
      CBD('The commercial core where the transport routes meet.'),
      z('industry', 2, 'Wholesale & light manufacturing', C.industry, 'Workplaces, not homes', 'Little housing', 'A wedge along the railway or river, where goods are moved.'),
      z('low', 3, 'Low-income residential', C.low, 'Low', 'High', 'Grows beside the factories and rail lines, where noise and pollution keep rents low.'),
      z('middle', 4, 'Middle-income residential', C.middle, 'Middle', 'Medium', 'Fills the space between, close enough to work but away from industry.'),
      z('high', 5, 'High-income residential', C.high, 'High', 'Low', 'A wedge stretching out along a desirable corridor (high ground, waterfront, boulevard), away from industry.'),
    ],
  },
  'harris-ullman': {
    label: 'Harris-Ullman', title: 'Multiple nuclei model (Harris & Ullman, 1945)',
    note: 'The car-era city has several centers (nuclei), each drawing activities that need it and repelling ones that clash.',
    zones: [
      CBD('Still the main hub, but no longer the only center of activity.'),
      z('wholesale', 2, 'Wholesale & light manufacturing', C.industry, 'Workplaces, not homes', 'Little housing', 'Clusters next to the CBD and rail lines for easy shipping.'),
      z('low', 3, 'Low-income residential', C.low, 'Low', 'High', 'Near industry and warehouses, where land is cheaper and less desirable.'),
      z('middle', 4, 'Middle-income residential', C.middle, 'Middle', 'Medium', 'The largest area, filling the space between the nuclei.'),
      z('high', 5, 'High-income residential', C.high, 'High', 'Low', 'On the most pleasant land, far from heavy industry.'),
      z('heavy-industry', 6, 'Heavy manufacturing', C.heavy, 'Workplaces, not homes', 'Very little housing', 'Needs space and clashes with homes (noise, pollution), so it sits at the edge near transport.'),
      z('outlying-business', 7, 'Outlying business district', C.outlying, 'Middle (serves nearby homes)', 'Medium', 'A secondary node of shops and offices serving the surrounding neighbourhoods.'),
      z('residential-suburb', 8, 'Residential suburb', C.rsub, 'Upper-middle to high', 'Low', 'A separate commuter community beyond the city edge.'),
      z('industrial-suburb', 9, 'Industrial suburb', C.isub, 'Low to middle (workers)', 'Low-medium', 'Factories and workers’ housing that moved out to cheaper land on the fringe.'),
    ],
  },
  galactic: {
    label: 'Galactic', title: 'Galactic city / peripheral model (Harris, 1990s)',
    note: 'Post-1950s sprawl: a beltway rings the old city and business spreads to edge cities, so downtown is just one node among many.',
    zones: [
      z('cbd', 1, 'Central city (old CBD)', C.cbd, 'Mixed, high and low', 'High', 'The old downtown, now one node among many after shops and jobs moved to the edge.'),
      z('edge-city', 2, 'Edge city', C.edge, 'Middle to high', 'Low-medium (mostly offices, malls)', 'Big clusters of offices, malls and entertainment at beltway interchanges, e.g. Tysons, Virginia.'),
      z('suburb', 3, 'Suburban residential', C.suburb, 'Middle to high', 'Low', 'Sprawling subdivisions filling the space around the beltway.'),
      z('office-park', 4, 'Office / business park', C.office, 'Workplaces, not homes', 'Very low (no housing)', 'Low-rise offices, tech campuses and warehouses with big parking lots along the highway.'),
      z('beltway', 5, 'Beltway (ring road)', C.beltway, 'Not residential', 'None', 'The ring highway that links edge cities and suburbs, so trips no longer pass through downtown.'),
    ],
  },
}

const CX = 160, CY = 140
const polar = (r, deg) => [CX + r * Math.sin((deg * Math.PI) / 180), CY - r * Math.cos((deg * Math.PI) / 180)]
function sector(r0, r1, a0, a1) {
  const big = a1 - a0 > 180 ? 1 : 0
  const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1), [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0)
  return `M${x3},${y3} L${x0},${y0} A${r1},${r1} 0 ${big} 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 ${big} 0 ${x3},${y3} Z`
}
const HOYT = [['middle', -40, 20], ['low', 20, 60], ['industry', 60, 100], ['low', 100, 150], ['middle', 150, 250], ['high', 250, 320]]
const HU = [
  ['low', 'M20,20 L100,20 L100,80 L70,80 L70,170 L20,170 Z', 45, 100],
  ['wholesale', 'M100,20 L170,20 L170,140 L140,140 L140,80 L100,80 Z', 135, 55],
  ['cbd', 'M70,80 L140,80 L140,140 L70,140 Z', 105, 114],
  ['high', 'M170,20 L240,20 L240,110 L170,110 Z', 205, 68],
  ['middle', 'M170,110 L240,110 L240,240 L90,240 L90,170 L70,170 L70,140 L170,140 Z', 125, 210],
  ['heavy-industry', 'M20,170 L90,170 L90,240 L20,240 Z', 55, 209],
  ['outlying-business', 'M170,175 L222,175 L222,215 L170,215 Z', 196, 199],
  ['residential-suburb', 'M256,26 L310,26 L310,86 L256,86 Z', 283, 60],
  ['industrial-suburb', 'M256,176 L310,176 L310,236 L256,236 Z', 283, 210],
]

export default function UrbanModels({ props = {}, onChange }) {
  const initial = MODELS[props.model] ? props.model : 'burgess'
  const [model, setModel] = useState(initial)
  const [zone, setZone] = useState(null)
  const [prev, setPrev] = useState(initial)
  if (initial !== prev) {
    setPrev(initial)
    setModel(initial)
    setZone(null)
  }

  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.({ model, zone })
  }, [model, zone])

  const M = MODELS[model]
  const byId = Object.fromEntries(M.zones.map((x) => [x.id, x]))
  const info = zone ? byId[zone] : null
  // Props for any clickable map shape belonging to zone `id`.
  const shape = (id) => ({
    onClick: () => setZone(id),
    style: { fill: byId[id].color, opacity: zone && zone !== id ? 0.45 : 1, cursor: 'pointer', transition: 'opacity 0.2s' },
    stroke: zone === id ? 'var(--accent-ink)' : '#fff',
    strokeWidth: zone === id ? 3 : 1.5,
  })
  const label = (x, y, text, light) => (
    <text x={x} y={y} fontSize="11" fontWeight="800" textAnchor="middle" fill={light ? '#fff' : '#18181d'} pointerEvents="none">{text}</text>
  )

  return (
    <div className="@container w-full space-y-2.5 text-ink">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Urban model">
        {Object.entries(MODELS).map(([k, m]) => (
          <button key={k} onClick={() => { setModel(k); setZone(null) }} aria-pressed={model === k}
            className={`btn-3d min-h-[36px] rounded-xl border px-3 text-[12.5px] font-bold ${model === k ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line bg-white'}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 @xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <svg viewBox="0 0 320 280" className="mx-auto h-auto max-h-[300px] w-full select-none" role="img" aria-label={`${M.title}. Click a zone.`}>
          {model === 'burgess' && (
            <g>
              {[...M.zones].reverse().map((x) => <circle key={x.id} cx={CX} cy={CY} r={26 * x.n} {...shape(x.id)} />)}
              {M.zones.map((x) => <g key={x.id}>{x.n === 1 ? label(CX, CY + 4, 'CBD', true) : label(CX, CY - 26 * x.n + 17, x.n)}</g>)}
            </g>
          )}
          {model === 'hoyt' && (
            <g>
              {HOYT.map(([id, a0, a1], i) => <path key={i} d={sector(26, 128, a0, a1)} {...shape(id)} />)}
              <circle cx={CX} cy={CY} r={26} {...shape('cbd')} />
              <line x1={polar(26, 80)[0]} y1={polar(26, 80)[1]} x2={polar(134, 80)[0]} y2={polar(134, 80)[1]} stroke="#18181d" strokeWidth="2" strokeDasharray="6 3" pointerEvents="none" />
              <text x={polar(118, 72)[0]} y={polar(118, 72)[1]} fontSize="8.5" fill="#18181d" pointerEvents="none">rail</text>
              {HOYT.map(([id, a0, a1], i) => <g key={i}>{label(polar(80, (a0 + a1) / 2)[0], polar(80, (a0 + a1) / 2)[1] + 4, byId[id].n)}</g>)}
              {label(CX, CY + 4, 'CBD', true)}
            </g>
          )}
          {model === 'harris-ullman' && (
            <g transform="translate(0 10)">
              <path d="M240,56 L256,56 M240,206 L256,206" stroke="#18181d" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="3 2" />
              {HU.map(([id, d]) => <path key={id} d={d} {...shape(id)} />)}
              {HU.map(([id, , x, y]) => <g key={id}>{label(x, y + 4, byId[id].n, id === 'cbd' || id === 'heavy-industry')}</g>)}
              <rect x="20" y="20" width="220" height="220" fill="none" stroke="#18181d" strokeOpacity="0.35" strokeWidth="1.5" pointerEvents="none" />
            </g>
          )}
          {model === 'galactic' && (
            <g>
              <circle cx={CX} cy={CY} r={128} {...shape('suburb')} />
              {[30, 120, 210, 300].map((a) => (
                <line key={a} x1={polar(20, a)[0]} y1={polar(20, a)[1]} x2={polar(128, a)[0]} y2={polar(128, a)[1]} stroke="#4b5563" strokeOpacity="0.55" strokeWidth="3" pointerEvents="none" />
              ))}
              <circle cx={CX} cy={CY} r={82} fill="none" stroke={zone === 'beltway' ? 'var(--accent-ink)' : C.beltway} strokeWidth={zone === 'beltway' ? 11 : 9}
                pointerEvents="stroke" onClick={() => setZone('beltway')} style={{ cursor: 'pointer', opacity: zone && zone !== 'beltway' ? 0.45 : 1 }} />
              {[75, 165, 255, 345].map((a) => {
                const [x, y] = polar(106, a)
                return <rect key={a} x={x - 12} y={y - 7} width="24" height="14" rx="2" transform={`rotate(${a} ${x} ${y})`} {...shape('office-park')} />
              })}
              {[30, 120, 210, 300].map((a) => {
                const [x, y] = polar(82, a)
                return <circle key={a} cx={x} cy={y} r="14" {...shape('edge-city')} />
              })}
              <circle cx={CX} cy={CY} r={22} {...shape('cbd')} />
              {label(CX, CY + 4, 'CBD', true)}
              {label(polar(82, 30)[0], polar(82, 30)[1] - 18, 'edge city')}
            </g>
          )}
        </svg>

        <div className="min-w-0 space-y-2">
          <div>
            <div className="font-display text-[14px] font-bold leading-tight">{M.title}</div>
            <p className="text-[11.5px] leading-snug text-muted">{M.note}</p>
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Zones">
            {M.zones.map((x) => (
              <button key={x.id} onClick={() => setZone(x.id)} aria-pressed={zone === x.id}
                className={`btn-3d flex min-h-[30px] items-center gap-1.5 rounded-lg border px-2 text-[11.5px] font-bold ${zone === x.id ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line bg-white'}`}>
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: x.color }} />
                {x.n} {x.name.replace(' (CBD)', '')}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-line bg-accent-softer p-3" aria-live="polite">
            {info ? (
              <>
                <div className="font-display text-[15px] font-bold text-accent-ink">{info.n}. {info.name}</div>
                <div className="mt-1 flex flex-wrap gap-1.5 text-[11.5px]">
                  <span className="rounded-full bg-paper px-2 py-0.5"><b>Income:</b> {info.income}</span>
                  <span className="rounded-full bg-paper px-2 py-0.5"><b>Housing density:</b> {info.density}</span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-snug">{info.desc}</p>
              </>
            ) : (
              <p className="text-[12.5px] text-muted">Click a zone on the map (or a chip above) to see who lives there.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
