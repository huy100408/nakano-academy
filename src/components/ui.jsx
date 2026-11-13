import { useEffect, useState } from 'react'
import { CakeSlice, CupSoda, Medal, Sandwich, ScrollText } from 'lucide-react'

export const ITEM_ICONS = { ScrollText, CakeSlice, CupSoda, Medal, Sandwich }

export const asset = (p) => `./${p}`

export function accentVars(s) {
  return { '--accent': s.color, '--accent-ink': s.ink, '--on-accent': s.onAccent }
}

export function Bar({ value, max = 100, color = 'var(--accent)', className = 'h-1.5', track = 'bg-ink/[.07]' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={`w-full overflow-hidden rounded-full ${track} ${className}`}>
      <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export function Ring({ value, max = 100, size = 64, stroke = 6, color = 'var(--accent)', track = 'rgb(24 24 29 / .08)', children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value / max))
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

export function Avatar({ s, size = 40, ring = false, className = '' }) {
  return (
    <img
      src={asset(`avatars/${s.id}.jpg`)}
      alt={s.first}
      draggable={false}
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size, boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 4px ${s.color}` : undefined }}
    />
  )
}

export function Segmented({ value, onChange, options }) {
  return (
    <div className="no-drag inline-flex rounded-xl bg-ink/[.05] p-1">
      {options.map(([k, label, Icon]) => {
        const on = k === value
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition ${
              on ? 'bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/.12)]' : 'text-muted hover:text-ink'
            }`}
          >
            {Icon && <Icon size={15} strokeWidth={2.2} />}
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function Kbd({ children }) {
  return (
    <kbd className="rounded-md border border-line bg-white px-1.5 py-px font-mono text-[10px] font-semibold text-muted shadow-[0_1px_0_rgb(0_0_0/.08)]">
      {children}
    </kbd>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <div className={`text-[10.5px] font-bold uppercase tracking-[.14em] text-faint ${className}`}>{children}</div>
}

/* Toasts */
let pushToast = () => {}
export const toast = (msg, opts = {}) => pushToast({ msg, ...opts })

export function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    pushToast = (t) => {
      const id = Math.random().toString(36).slice(2)
      setItems((xs) => [...xs.slice(-2), { id, ...t }])
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), t.ms || 2800)
    }
    return () => (pushToast = () => {})
  }, [])
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2">
      {items.map((t) => (
        <div key={t.id} className="anim-fade-up flex items-center gap-2.5 rounded-full bg-ink/90 px-4 py-2 text-[13px] font-medium text-white shadow-lift backdrop-blur">
          {t.icon && <t.icon size={15} />}
          {t.msg}
        </div>
      ))}
    </div>
  )
}

export function shuffle(a) {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}
export const pick = (a) => a[Math.floor(Math.random() * a.length)]
