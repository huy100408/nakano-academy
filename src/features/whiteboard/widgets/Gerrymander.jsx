import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react'

// 5×5 redistricting puzzle. Value: { blueSeats: 0-5, redSeats: 0-5, valid: boolean }.
// valid = every district has exactly 5 cells and is contiguous (4-neighbour).

const N = 5
// 15 blue (B) and 10 red (R) voters, row by row.
const VOTERS = ['RRBBB', 'RRBBB', 'RBBRB', 'RRBBB', 'BRBRB'].join('').split('')
const START = Array.from({ length: N * N }, (_, i) => i % N) // five column districts (Blue 3, Red 2)
const DCOL = ['#fde68a', '#d9f99d', '#fbcfe8', '#e9d5ff', '#fed7aa']
const PARTY = { B: '#2563eb', R: '#dc2626' }
const CELL = 50, PAD = 5

function contiguous(cells, assign, d) {
  if (!cells.length) return false
  const seen = new Set([cells[0]])
  const queue = [cells[0]]
  while (queue.length) {
    const i = queue.shift()
    const r = Math.floor(i / N), c = i % N
    for (const [rr, cc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
      const j = rr * N + cc
      if (rr >= 0 && rr < N && cc >= 0 && cc < N && assign[j] === d && !seen.has(j)) {
        seen.add(j)
        queue.push(j)
      }
    }
  }
  return seen.size === cells.length
}

function analyze(assign) {
  const ds = Array.from({ length: N }, (_, d) => {
    const cells = assign.flatMap((a, i) => (a === d ? [i] : []))
    const blue = cells.filter((i) => VOTERS[i] === 'B').length
    const red = cells.length - blue
    const winner = blue > red ? 'B' : red > blue ? 'R' : null
    const need = Math.floor(cells.length / 2) + 1
    return {
      d, cells, blue, red, winner,
      ok: cells.length === 5 && contiguous(cells, assign, d),
      split: cells.length > 0 && !contiguous(cells, assign, d),
      wastedB: winner === 'B' ? blue - need : blue,
      wastedR: winner === 'R' ? red - need : red,
    }
  })
  return {
    ds,
    blueSeats: ds.filter((x) => x.winner === 'B').length,
    redSeats: ds.filter((x) => x.winner === 'R').length,
    valid: ds.every((x) => x.ok),
    wastedB: ds.reduce((s, x) => s + x.wastedB, 0),
    wastedR: ds.reduce((s, x) => s + x.wastedR, 0),
  }
}

export default function Gerrymander({ props = {}, onChange }) {
  const [assign, setAssign] = useState(START)
  const [picked, setPicked] = useState(0)
  const a = analyze(assign)
  const { blueSeats, redSeats, valid } = a

  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.({ blueSeats, redSeats, valid })
  }, [blueSeats, redSeats, valid])

  const paint = (i) => setAssign((cur) => (cur[i] === picked ? cur : cur.map((d, j) => (j === i ? picked : d))))
  const painting = useRef(false)
  const cellAt = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest?.('[data-cell]')
    return el ? Number(el.getAttribute('data-cell')) : null
  }
  const stop = () => { painting.current = false }

  return (
    <div className="@container w-full text-ink">
      <div className="grid gap-3 @xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <svg
            viewBox={`0 0 ${N * CELL + 2 * PAD} ${N * CELL + 2 * PAD}`} className="mx-auto h-auto max-h-[300px] w-full select-none" style={{ touchAction: 'none' }}
            role="group" aria-label="Voter grid: click or drag over cells to add them to the chosen district"
            onPointerDown={(e) => { const i = cellAt(e); if (i == null) return; painting.current = true; paint(i) }}
            onPointerMove={(e) => { if (!painting.current) return; const i = cellAt(e); if (i != null) paint(i) }}
            onPointerUp={stop} onPointerCancel={stop} onPointerLeave={stop}
          >
            {assign.map((d, i) => {
              const r = Math.floor(i / N), c = i % N, x = PAD + c * CELL, y = PAD + r * CELL
              return (
                <g key={i} data-cell={i} className="cursor-pointer" role="button" tabIndex={0}
                  aria-label={`Row ${r + 1}, column ${c + 1}: ${VOTERS[i] === 'B' ? 'blue' : 'red'} voter in district ${d + 1}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); paint(i) } }}>
                  <rect x={x} y={y} width={CELL} height={CELL} fill={DCOL[d]} stroke="#fff" strokeWidth="1" />
                  <text x={x + 5} y={y + 11} fontSize="8.5" fontWeight="700" fill="#18181d" fillOpacity="0.45">{d + 1}</text>
                  <circle cx={x + CELL / 2} cy={y + CELL / 2 + 2} r="13" fill={PARTY[VOTERS[i]]} stroke="#fff" strokeWidth="2" />
                  <text x={x + CELL / 2} y={y + CELL / 2 + 6} fontSize="11" fontWeight="800" textAnchor="middle" fill="#fff">{VOTERS[i]}</text>
                </g>
              )
            })}
            <g stroke="#18181d" strokeWidth="3" strokeLinecap="round" pointerEvents="none">
              {assign.map((d, i) => {
                const r = Math.floor(i / N), c = i % N, x = PAD + c * CELL, y = PAD + r * CELL
                return (
                  <g key={i}>
                    {(c === N - 1 || assign[i + 1] !== d) && <line x1={x + CELL} y1={y} x2={x + CELL} y2={y + CELL} />}
                    {(r === N - 1 || assign[i + N] !== d) && <line x1={x} y1={y + CELL} x2={x + CELL} y2={y + CELL} />}
                    {c === 0 && <line x1={x} y1={y} x2={x} y2={y + CELL} />}
                    {r === 0 && <line x1={x} y1={y} x2={x + CELL} y2={y} />}
                  </g>
                )
              })}
            </g>
          </svg>
          <p className="mt-1 text-center text-[11px] text-faint">Pick a district, then click or drag across cells to redraw it.</p>
        </div>

        <div className="min-w-0 space-y-2.5">
          <div className="grid grid-cols-5 gap-1.5" role="group" aria-label="District to paint">
            {a.ds.map((x) => (
              <button key={x.d} onClick={() => setPicked(x.d)} aria-pressed={picked === x.d}
                className={`btn-3d flex min-h-[54px] flex-col items-center justify-center rounded-xl border-2 px-0.5 text-[11px] font-bold leading-tight ${picked === x.d ? 'border-accent-ink' : 'border-transparent'}`}
                style={{ background: DCOL[x.d] }}>
                <span className="text-[12.5px]">D{x.d + 1}</span>
                <span style={{ color: x.winner ? PARTY[x.winner] : '#6b6b76' }}>{x.winner === 'B' ? 'Blue' : x.winner === 'R' ? 'Red' : 'Tie'} {x.blue}–{x.red}</span>
                <span className={x.ok ? 'text-muted' : 'text-bad'}>{x.cells.length}/5{x.split ? ' split' : ''}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-accent-softer p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-[16px] font-bold">
                <span style={{ color: PARTY.B }}>Blue {blueSeats}</span> – <span style={{ color: PARTY.R }}>{redSeats} Red</span> seats
              </span>
              <span className={`flex items-center gap-1 text-[12px] font-bold ${valid ? 'text-good' : 'text-bad'}`} aria-live="polite">
                {valid ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                {valid ? 'Valid map' : 'Invalid: each district needs 5 connected cells'}
              </span>
            </div>
            <Bar label="Seats" parts={a.ds.map((x) => (x.winner ? PARTY[x.winner] : '#d4d4d8'))} />
            <Bar label="Votes" parts={VOTERS.slice().sort().map((v) => PARTY[v])} />
            <div className="mt-1.5 text-[12px] text-muted">
              Wasted votes: <b style={{ color: PARTY.B }}>Blue {a.wastedB}</b> · <b style={{ color: PARTY.R }}>Red {a.wastedR}</b>
            </div>
          </div>

          <dl className="grid gap-1.5 text-[11.5px] leading-snug @md:grid-cols-3">
            <div className="rounded-xl border border-line bg-white p-2"><dt className="font-bold">Packing</dt><dd className="text-muted">Cram the other side’s voters into a few districts they win by a landslide.</dd></div>
            <div className="rounded-xl border border-line bg-white p-2"><dt className="font-bold">Cracking</dt><dd className="text-muted">Spread their voters thinly so they fall just short in every district.</dd></div>
            <div className="rounded-xl border border-line bg-white p-2"><dt className="font-bold">Wasted vote</dt><dd className="text-muted">Any vote for a loser, or for a winner beyond the 3 needed.</dd></div>
          </dl>

          <button onClick={() => { setAssign(START); setPicked(0) }} className="btn-3d flex min-h-[38px] items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-[12.5px] font-bold">
            <RotateCcw size={14} /> Reset to columns
          </button>
        </div>
      </div>
    </div>
  )
}

function Bar({ label, parts }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="w-10 text-[11px] font-bold text-muted">{label}</span>
      <div className="flex h-3.5 flex-1 gap-px overflow-hidden rounded-full bg-line">
        {parts.map((c, i) => <span key={i} className="flex-1" style={{ background: c }} />)}
      </div>
    </div>
  )
}
