import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Apple,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Egg,
  Globe,
  Heart,
  Layers,
  Monitor,
  PencilLine,
  Play,
  RotateCw,
  Sparkles,
  Star,
  Timer,
  X,
} from 'lucide-react'
import { EGG_ROUNDS, SISTERS, SUBJECTS, bySubject } from '../src/data/sisters.js'
import Intro from '../src/intro/Intro.jsx'

const GH_USER = 'https://github.com/huy100408'
const REPO = 'https://github.com/huy100408/nakano-academy'
const DL = `${REPO}/releases/latest/download`
const FILES = {
  macArm: `${DL}/NakanoAcademy-mac-arm64.dmg`,
  macIntel: `${DL}/NakanoAcademy-mac-x64.dmg`,
  win: `${DL}/NakanoAcademy-win-x64.exe`,
}
const BASE = import.meta.env.BASE_URL
const A = (p) => `${BASE}${p}`

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

/* ───────── hooks ───────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}
function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setY(window.scrollY))
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return y
}
function useInView(ref, threshold = 0.3) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, threshold])
  return v
}
function detectOS() {
  const ua = navigator.userAgent
  if (/Windows/i.test(ua)) return 'win'
  if (/Mac/i.test(ua)) return 'mac'
  return 'other'
}

/* ───────── small pieces ───────── */
function Avatar({ s, size = 40, ring }) {
  return (
    <img
      src={A(`avatars/${s.id}.jpg`)}
      alt={s.first}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size, boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 4px ${s.color}` : undefined }}
    />
  )
}
function SectionHead({ kicker, title, sub, center }) {
  return (
    <div className={`reveal ${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <div className="text-[12px] font-bold uppercase tracking-[.2em] text-muted">{kicker}</div>
      <h2 className="mt-3 font-display text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.02] tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-[clamp(16px,1.6vw,19px)] leading-relaxed text-muted">{sub}</p>}
    </div>
  )
}
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const vis = useInView(ref, 0.6)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!vis) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1400)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [vis, to])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

/* ───────── nav ───────── */
function Nav({ y }) {
  const solid = y > 30
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? 'border-b border-line bg-white/75 backdrop-blur-xl' : ''}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={A('icon.png')} alt="" className="h-8 w-8" />
          <span className="font-display text-[16px] font-extrabold tracking-tight">Nakano Academy</span>
        </a>
        <nav className="ml-4 hidden items-center gap-6 text-[14px] font-semibold text-muted md:flex">
          <a href="#tutors" className="hover:text-ink">Tutors</a>
          <a href="#try" className="hover:text-ink">Try it</a>
          <a href="#features" className="hover:text-ink">Features</a>
          <a href="#download" className="hover:text-ink">Download</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href={REPO} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-ink hover:bg-ink/5 sm:flex">
            <GitHubIcon size={17} /> GitHub
          </a>
          <a href="#download" className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13.5px] font-bold text-white shadow-sm hover:bg-ink/85">
            <Download size={15} /> Download
          </a>
        </div>
      </div>
      <div className="h-[2px] bg-transparent">
        <div
          className="h-full"
          style={{
            width: `${Math.min(100, (y / Math.max(1, (typeof document !== 'undefined' ? document.documentElement.scrollHeight : 1) - window.innerHeight)) * 100)}%`,
            background: 'linear-gradient(90deg,#eab308,#a855f7,#3b82f6,#22c55e,#ef4444)',
          }}
        />
      </div>
    </header>
  )
}

/* ───────── hero ───────── */
function Hero({ y, os }) {
  const [m, setM] = useState({ x: 0, y: 0 })
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
      onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
    >
      <div className="blob left-[-8%] top-[8%] h-[38vw] w-[38vw] bg-yellow-200" />
      <div className="blob right-[-6%] top-[2%] h-[34vw] w-[34vw] bg-violet-200" />
      <div className="blob bottom-[-10%] left-[30%] h-[36vw] w-[36vw] bg-sky-200" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div style={{ transform: `translateY(${y * 0.12}px)` }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-[12.5px] font-semibold text-muted shadow-sm backdrop-blur">
            <span className="flex -space-x-1.5">
              {SISTERS.map((s) => (
                <span key={s.id} className="h-3 w-3 rounded-full ring-2 ring-white" style={{ background: s.color }} />
              ))}
            </span>
            Free &amp; open source · macOS &amp; Windows
          </div>
          <h1 className="mt-6 font-display text-[clamp(44px,6.6vw,96px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            The Quintessential
            <br />
            <span className="rainbow-text">Quintuplets</span>
            <br />
            Tutor App
          </h1>
          <p className="mt-6 max-w-xl text-[clamp(17px,1.7vw,20px)] leading-relaxed text-muted">
            Five Nakano sisters. Five subjects. One goal: <b className="text-ink">500 out of 500</b>. Flashcards, live quizzes and a report card, taught in each sister’s own voice.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {os === 'win' ? (
              <a href={FILES.win} className="flex items-center gap-2.5 rounded-2xl bg-ink px-6 py-4 text-[15px] font-bold text-white shadow-lift transition hover:-translate-y-0.5">
                <Monitor size={18} /> Download for Windows
              </a>
            ) : (
              <a href={FILES.macArm} className="flex items-center gap-2.5 rounded-2xl bg-ink px-6 py-4 text-[15px] font-bold text-white shadow-lift transition hover:-translate-y-0.5">
                <Apple size={18} /> Download for macOS
              </a>
            )}
            <a href={A('app/')} className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-6 py-4 text-[15px] font-bold shadow-card transition hover:-translate-y-0.5">
              <Globe size={18} /> Open in browser
            </a>
          </div>
          <div className="mt-4 text-[13px] text-faint">
            {os === 'win' ? (
              <>Also for <a href="#download" className="font-semibold text-muted underline">macOS</a></>
            ) : (
              <>
                Apple Silicon · <a href={FILES.macIntel} className="font-semibold text-muted underline">Intel Mac</a> · <a href={FILES.win} className="font-semibold text-muted underline">Windows</a>
              </>
            )}
          </div>
        </div>

        {/* fanned video cards */}
        <div className="relative h-[min(64vw,560px)] lg:h-[560px]" style={{ transform: `translate(${m.x * -18}px, ${m.y * -14 + y * -0.06}px)` }}>
          {SISTERS.map((s, i) => {
            const rot = (i - 2) * 7
            const x = (i - 2) * 9
            const top = Math.abs(i - 2) * 26
            return (
              <div
                key={s.id}
                className="floaty absolute left-1/2 top-1/2 w-[80%] overflow-hidden rounded-[22px] border-[5px] border-white bg-ink shadow-lift"
                style={{
                  '--r': `${rot}deg`,
                  transform: `translate(calc(-50% + ${x}%), calc(-50% + ${top}px)) rotate(${rot}deg)`,
                  zIndex: 10 - Math.abs(i - 2),
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <video src={A(`videos/${s.id}.mp4`)} poster={A(`videos/${s.id}-poster.jpg`)} autoPlay muted loop playsInline className="aspect-video w-full object-cover" />
                <div className="absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: s.color, color: s.onAccent }}>
                  {s.no} · {s.first}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <a href="#tutors" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[12px] font-semibold text-faint hover:text-ink" style={{ opacity: Math.max(0, 1 - y / 200) }}>
        Scroll
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}

function Marquee() {
  const items = SISTERS.flatMap((s) => [s.cards[0].front, s.cards[2].front, s.cards[4].front])
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-4">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[18px] font-bold text-ink/70">
            {t}
            <span style={{ color: SISTERS[i % 5].color }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────── sticky tutor scroller ───────── */
function Tutors() {
  const box = useRef(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const r = box.current.getBoundingClientRect()
      const total = r.height - window.innerHeight
      setP(Math.max(0, Math.min(0.9999, -r.top / total)))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  const idx = Math.floor(p * SISTERS.length)
  const s = SISTERS[idx]
  const sub = SUBJECTS.find((x) => x.key === s.subj)
  const local = p * SISTERS.length - idx

  return (
    <section id="tutors" ref={box} className="relative" style={{ height: `${SISTERS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden transition-colors duration-700" style={{ background: `color-mix(in oklab, ${s.color} 13%, #fffdf8)` }}>
        <div className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none font-display text-[42vw] font-extrabold leading-none opacity-[.07] transition-colors duration-700" style={{ color: s.color }}>
          {s.no}
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pt-16 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative">
            {SISTERS.map((x, i) => (
              <div
                key={x.id}
                className="overflow-hidden rounded-[28px] border-[6px] border-white bg-ink shadow-lift transition-all duration-700"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: i === 0 ? undefined : 0,
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? `scale(1) rotate(${(local - 0.5) * -2}deg)` : `scale(.94) translateY(${i < idx ? -30 : 30}px)`,
                }}
              >
                <video src={A(`videos/${x.id}.mp4`)} poster={A(`videos/${x.id}-poster.jpg`)} autoPlay muted loop playsInline preload="metadata" className="aspect-video w-full object-cover" />
              </div>
            ))}
            <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 px-5 py-4 shadow-lift backdrop-blur">
              <div className="absolute -top-3 left-4 rounded-md px-2.5 py-0.5 text-[12px] font-bold" style={{ background: s.color, color: s.onAccent }}>
                {s.first}
              </div>
              <p key={s.id} className="anim-fade-up text-[15px] font-medium leading-relaxed">{s.lines.teaching[0]}</p>
            </div>
          </div>

          <div key={s.id} className="anim-fade-up">
            <div className="flex items-center gap-3">
              <Avatar s={s} size={52} ring />
              <div>
                <div className="font-mono text-[13px] font-bold" style={{ color: s.ink }}>
                  TUTOR No.{s.no} · {s.kanji}
                </div>
                <div className="text-[13px] font-semibold text-muted">{s.role}</div>
              </div>
            </div>
            <h3 className="mt-5 font-display text-[clamp(40px,5.6vw,76px)] font-extrabold leading-[0.95] tracking-tight">{s.first}</h3>
            <div className="mt-2 font-display text-[clamp(20px,2.2vw,28px)] font-bold" style={{ color: s.ink }}>
              teaches {sub.label}
            </div>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/75">{s.persona}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.cards.map((c) => (
                <span key={c.front} className="rounded-full border bg-white/70 px-3 py-1 text-[13px] font-semibold" style={{ borderColor: `color-mix(in oklab, ${s.color} 40%, white)` }}>
                  {c.front}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[13.5px] font-semibold text-muted">
              <Sparkles size={15} style={{ color: s.ink }} /> Desk item: {s.item.name}
            </div>
          </div>
        </div>
        {/* progress rail */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {SISTERS.map((x, i) => (
            <span key={x.id} className="h-1.5 overflow-hidden rounded-full bg-ink/10 transition-all" style={{ width: i === idx ? 56 : 22 }}>
              <span className="block h-full rounded-full" style={{ background: x.color, width: i < idx ? '100%' : i === idx ? `${local * 100}%` : 0 }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── interactive: quiz ───────── */
function TryQuiz() {
  const [subj, setSubj] = useState('math')
  const s = bySubject(subj)
  const [qi, setQi] = useState(0)
  const [pick, setPick] = useState(null)
  const [score, setScore] = useState({ c: 0, n: 0 })
  const q = s.quiz[qi % s.quiz.length]
  const choose = (i) => {
    if (pick !== null) return
    setPick(i)
    setScore((x) => ({ c: x.c + (i === q.answer ? 1 : 0), n: x.n + 1 }))
  }
  const next = () => {
    setPick(null)
    setQi((x) => x + 1)
  }
  return (
    <div className="card overflow-hidden" style={{ '--accent': s.color, '--accent-ink': s.ink, '--on-accent': s.onAccent }}>
      <div className="flex gap-1 overflow-x-auto border-b border-line bg-[#faf8f4] p-2">
        {SUBJECTS.map((x) => {
          const t = bySubject(x.key)
          const on = x.key === subj
          return (
            <button
              key={x.key}
              onClick={() => {
                setSubj(x.key)
                setQi(0)
                setPick(null)
              }}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-bold transition ${on ? 'bg-white shadow-card' : 'text-muted hover:text-ink'}`}
            >
              <Avatar s={t} size={22} />
              {x.short}
            </button>
          )
        })}
      </div>
      <div key={`${subj}-${qi}`} className="anim-fade-up p-6 sm:p-8">
        <div className="mb-3 flex items-center justify-between text-[12px] font-bold uppercase tracking-[.14em] text-faint">
          <span>
            {s.first} · Question {(qi % s.quiz.length) + 1}/{s.quiz.length}
          </span>
          <span className="font-mono normal-case tracking-normal">
            {score.c}/{score.n} correct
          </span>
        </div>
        <h3 className="text-[19px] font-semibold leading-snug">{q.q}</h3>
        {q.code && <pre className="mt-3 overflow-x-auto rounded-xl bg-[#1d1b22] px-4 py-3 font-mono text-[14px] leading-relaxed text-[#f3efe6]">{q.code}</pre>}
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {q.options.map((o, i) => {
            let cls = 'border-line bg-white hover:border-accent-line hover:bg-accent-softer'
            if (pick !== null) cls = i === q.answer ? 'border-green-500 bg-green-50' : i === pick ? 'border-red-400 bg-red-50' : 'border-line opacity-45'
            return (
              <button key={i} onClick={() => choose(i)} disabled={pick !== null} className={`flex items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-left text-[15px] font-medium transition ${cls}`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink/5 font-mono text-[12px] font-bold text-muted">
                  {pick !== null && i === q.answer ? <Check size={14} className="text-good" /> : pick === i ? <X size={14} className="text-bad" /> : 'ABCD'[i]}
                </span>
                {o}
              </button>
            )
          })}
        </div>
        {pick !== null && (
          <div className="anim-fade-up mt-5 flex flex-wrap items-end gap-4">
            <div className="flex min-w-0 flex-1 items-start gap-3 rounded-2xl bg-accent-softer p-4">
              <Avatar s={s} size={36} />
              <p className="text-[14.5px] leading-relaxed">
                <b style={{ color: s.ink }}>{pick === q.answer ? 'Correct! ' : 'Not quite. '}</b>
                {q.explain}
              </p>
            </div>
            <button onClick={next} className="flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[14px] font-bold text-white hover:bg-ink/85">
              Next <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────── interactive: flashcards ───────── */
function TryCards() {
  const [k, setK] = useState(0)
  const [flip, setFlip] = useState(false)
  const all = useMemo(() => SISTERS.flatMap((s) => s.cards.map((c) => ({ ...c, s }))), [])
  const c = all[k % all.length]
  return (
    <div>
      <div className="flip cursor-pointer" onClick={() => setFlip(!flip)}>
        <div className={`flip-inner ${flip ? 'on' : ''}`}>
          <div className="ruled relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-white p-8 text-center shadow-card">
            <span className="absolute left-0 top-0 h-full w-2" style={{ background: c.s.color }} />
            <div className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em] text-faint">
              <Avatar s={c.s} size={20} /> {c.s.topic}
            </div>
            <div className="font-display text-[32px] font-extrabold leading-tight" style={{ color: c.s.ink }}>
              {c.front}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-medium text-faint">
              <RotateCw size={12} /> Tap to flip
            </div>
          </div>
          <div className="back flex min-h-[260px] flex-col items-center justify-center rounded-3xl border p-8 text-center shadow-card" style={{ background: `color-mix(in oklab, ${c.s.color} 10%, white)`, borderColor: `color-mix(in oklab, ${c.s.color} 35%, white)` }}>
            <p className="whitespace-pre-line font-display text-[20px] font-bold leading-relaxed">{c.back}</p>
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-muted">{c.deep}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[12px] text-faint">
          {(k % all.length) + 1} / {all.length}
        </span>
        <button
          onClick={() => {
            setFlip(false)
            setK(k + 1)
          }}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-[14px] font-bold text-ink hover:bg-ink/5"
        >
          Next card <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

/* ───────── interactive: report-card radar ───────── */
function TryRadar() {
  const [v, setV] = useState({ math: 39, eng: 43, geo: 68, cs: 31, sci: 56 })
  const S = 320
  const c = S / 2
  const R = 112
  const n = SUBJECTS.length
  const pt = (k, val) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / n
    return [c + Math.cos(a) * R * (val / 100), c + Math.sin(a) * R * (val / 100)]
  }
  const poly = (vals) => vals.map((val, k) => pt(k, val).join(',')).join(' ')
  const total = Object.values(v).reduce((a, b) => a + b, 0)
  const pass = Object.values(v).every((x) => x >= 30)
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[1fr_1fr]">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full">
        {[25, 50, 75, 100].map((g) => (
          <polygon key={g} points={poly(Array(n).fill(g))} fill="none" stroke="rgb(24 24 29 / .08)" />
        ))}
        <polygon points={poly(Array(n).fill(30))} fill="none" stroke="#f59e0b" strokeDasharray="4 4" />
        <polygon points={poly(Array(n).fill(100))} fill="none" stroke="#18181d" strokeDasharray="5 5" />
        <polygon points={poly(SUBJECTS.map((x) => v[x.key]))} fill="#ef444433" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" />
        {SUBJECTS.map((x, k) => {
          const [px, py] = pt(k, 122)
          return (
            <text key={x.key} x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="700" fill={bySubject(x.key).ink}>
              {x.short}
            </text>
          )
        })}
      </svg>
      <div>
        {SUBJECTS.map((x) => {
          const t = bySubject(x.key)
          return (
            <label key={x.key} className="mb-3 block">
              <span className="mb-1 flex justify-between text-[13px] font-semibold">
                <span>{x.short}</span>
                <span className={`font-mono ${v[x.key] >= 30 ? 'text-good' : 'text-bad'}`}>{v[x.key]}</span>
              </span>
              <input type="range" min="0" max="100" value={v[x.key]} onChange={(e) => setV({ ...v, [x.key]: +e.target.value })} className="w-full" style={{ accentColor: t.color }} />
            </label>
          )
        })}
        <div className={`mt-2 rounded-xl px-4 py-3 text-[13.5px] font-semibold ${pass ? 'bg-green-50 text-good' : 'bg-amber-50 text-amber-700'}`}>
          {total}/500 · {pass ? 'Maruo approves. Festival certificate unlocked!' : 'Some subjects are under 30. No approval yet.'}
        </div>
      </div>
    </div>
  )
}

/* ───────── interactive: scrambled eggs ───────── */
function TryEggs() {
  const [r, setR] = useState(() => EGG_ROUNDS[Math.floor(Math.random() * EGG_ROUNDS.length)])
  const [g, setG] = useState(null)
  const again = () => {
    setG(null)
    setR(EGG_ROUNDS[Math.floor(Math.random() * EGG_ROUNDS.length)])
  }
  return (
    <div>
      <div className="rounded-2xl bg-red-50 p-4 text-[14.5px] leading-relaxed">
        <div className="text-[11px] font-bold uppercase tracking-[.14em] text-red-700/70">“Itsuki” says</div>“{r.subject}”
        <div className="mt-2 text-[13px] text-muted">Habit: {r.posture}</div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {SISTERS.map((s) => {
          const show = g && (s.id === r.who || s.id === g)
          return (
            <button
              key={s.id}
              onClick={() => !g && setG(s.id)}
              className={`flex flex-col items-center gap-1 rounded-xl border-[1.5px] py-2.5 text-[12px] font-bold transition ${show ? (s.id === r.who ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : g ? 'border-line opacity-40' : 'border-line hover:-translate-y-0.5'}`}
            >
              <Avatar s={s} size={36} />
              {s.first}
            </button>
          )
        })}
      </div>
      {g && (
        <div className="anim-fade-up mt-4 flex items-center justify-between text-[14px] font-semibold">
          <span>{g === r.who ? '✔ You can tell them apart!' : `✘ It was ${SISTERS.find((s) => s.id === r.who).first}.`}</span>
          <button onClick={again} className="rounded-xl bg-ink px-4 py-2 text-[13px] font-bold text-white">
            Another
          </button>
        </div>
      )}
    </div>
  )
}

/* ───────── download ───────── */
function CopyBlock({ text }) {
  const [ok, setOk] = useState(false)
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-2xl bg-[#1d1b22] p-5 pr-14 font-mono text-[13.5px] leading-relaxed text-[#f3efe6]">{text}</pre>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(text)
          setOk(true)
          setTimeout(() => setOk(false), 1500)
        }}
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20"
        aria-label="Copy"
      >
        {ok ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}

function DownloadSection({ os }) {
  const [tab, setTab] = useState(os === 'win' ? 'win' : 'mac')
  const steps = {
    mac: [
      ['Download the .dmg', 'Pick Apple Silicon (M1–M4) or Intel. Not sure? Apple menu → About This Mac → Chip.'],
      ['Drag to Applications', 'Open the .dmg and drag Nakano Academy into the Applications folder.'],
      ['First launch', 'The app is not notarized yet. Right-click it and choose Open, then Open again. Or allow it in System Settings → Privacy & Security.'],
    ],
    win: [
      ['Download the installer', 'One .exe for 64-bit Windows 10 and 11.'],
      ['Run it', 'SmartScreen may warn about an unrecognized app because it is not code-signed yet. Click More info → Run anyway.'],
      ['Pick a folder', 'Choose where to install. A desktop and Start Menu shortcut are created for you.'],
    ],
  }
  return (
    <section id="download" className="relative overflow-hidden py-28 sm:py-36">
      <div className="blob left-[10%] top-[10%] h-[30vw] w-[30vw] bg-violet-200" />
      <div className="blob bottom-0 right-[5%] h-[28vw] w-[28vw] bg-green-200" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead center kicker="Installer" title="Get Nakano Academy" sub="Free forever. No account, no ads, no tracking. Your progress stays on your computer." />
        <div className="reveal mt-14 grid gap-5 md:grid-cols-3">
          {[
            ['macOS', 'Apple Silicon', 'M1 · M2 · M3 · M4', FILES.macArm, Apple, os === 'mac'],
            ['macOS', 'Intel', 'macOS 10.15+', FILES.macIntel, Apple, false],
            ['Windows', '64-bit installer', 'Windows 10 · 11', FILES.win, Monitor, os === 'win'],
          ].map(([name, arch, req, href, Icon, rec]) => (
            <a key={href} href={href} className={`card group relative flex flex-col p-7 transition hover:-translate-y-1 hover:shadow-lift ${rec ? 'ring-2 ring-ink' : ''}`}>
              {rec && <span className="absolute right-5 top-5 rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-bold text-white">Your system</span>}
              <Icon size={30} />
              <div className="mt-5 font-display text-[24px] font-extrabold">{name}</div>
              <div className="text-[14px] font-semibold text-muted">{arch}</div>
              <div className="mt-1 text-[13px] text-faint">{req}</div>
              <div className="mt-7 flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-[14px] font-bold text-white transition group-hover:bg-ink/85">
                <Download size={16} /> Download {name === 'Windows' ? '.exe' : '.dmg'}
              </div>
            </a>
          ))}
        </div>
        <div className="reveal mt-4 text-center text-[13.5px] text-muted">
          Prefer not to install? <a href={A('app/')} className="font-bold text-ink underline">Use the web version</a> · All builds on{' '}
          <a href={`${REPO}/releases`} className="font-bold text-ink underline">
            GitHub Releases
          </a>
        </div>

        <div className="reveal card mt-14 grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="inline-flex rounded-xl bg-ink/5 p-1">
              {[
                ['mac', 'macOS'],
                ['win', 'Windows'],
              ].map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className={`rounded-lg px-4 py-1.5 text-[13.5px] font-bold ${tab === k ? 'bg-white shadow-card' : 'text-muted'}`}>
                  {l}
                </button>
              ))}
            </div>
            <ol className="mt-6 space-y-5">
              {steps[tab].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[13px] font-bold text-white" style={{ background: SISTERS[i * 2].color }}>
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[15px] font-bold">{t}</div>
                    <div className="mt-0.5 text-[14px] leading-relaxed text-muted">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="mb-3 text-[15px] font-bold">Or build it from source</div>
            <CopyBlock text={`git clone ${REPO}.git\ncd nakano-academy\nnpm install\nnpm run electron:dev   # run the app\nnpm run dist           # build .dmg / .exe`} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── FAQ ───────── */
const FAQ = [
  ['Is it really free?', 'Yes. Nakano Academy is free and open source under the MIT license. There are no ads, accounts or in-app purchases.'],
  ['Which subjects are covered?', 'Mathematics (Ichika), English (Nino), AP Human Geography (Miku), Computer Science (Yotsuba) and Science (Itsuki). Each has 6 concept cards and 8 quiz questions with explanations, and the order changes on every attempt.'],
  ['Do the sisters talk?', 'Optional voices are supported through Fish Audio. Add your own API key and voice IDs in Settings. The key stays on your computer.'],
  ['Where is my progress saved?', 'Locally, on your device. Nothing is uploaded anywhere.'],
  ['Why does macOS or Windows warn me when I open it?', 'The builds are not code-signed yet, which costs money for a hobby project. The source is public, so you can read it or build it yourself.'],
  ['Can I add questions?', 'Please do! All lesson content lives in one file, src/data/sisters.js. Open a pull request on GitHub.'],
  ['Is this official?', 'No. It is a non-commercial fan project inspired by The Quintessential Quintuplets by Negi Haruba, and it is not affiliated with the author, Kodansha or the anime studios.'],
]
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <SectionHead center kicker="FAQ" title="Questions, answered" />
      <div className="reveal mt-12 divide-y divide-line rounded-3xl border border-line bg-white shadow-card">
        {FAQ.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-bold">
              {q}
              <ChevronDown size={18} className={`shrink-0 transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">{a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────── page ───────── */
export default function Site() {
  const y = useScrollY()
  const os = useMemo(detectOS, [])
  const [intro, setIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('nakano-intro-seen')
    } catch {
      return true
    }
  })
  useReveal()
  useEffect(() => {
    document.body.classList.toggle('locked', intro)
    if (!intro)
      try {
        sessionStorage.setItem('nakano-intro-seen', '1')
      } catch {}
  }, [intro])

  return (
    <>
      {intro && <Intro gate onDone={() => setIntro(false)} />}
      <Nav y={y} />
      <Hero y={y} os={os} />
      <Marquee />
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8">
        <SectionHead kicker="Meet your tutors" title={<>Five sisters, five subjects. Keep scrolling.</>} sub="Each sister teaches the subject she was best at, in her own style: teasing, tsundere, quiet, energetic or strict." />
      </section>
      <Tutors />

      <section id="try" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHead kicker="Try it right here" title="Take a real question." sub="These are the same questions that ship in the app. Pick a sister and answer." />
        <div className="reveal mt-12">
          <TryQuiz />
        </div>
      </section>

      <section id="features" className="bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead kicker="Features" title="Everything a 500/500 student needs." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="reveal card p-7 sm:p-9">
              <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[.14em] text-muted">
                <Layers size={16} /> Lesson deck
              </div>
              <h3 className="mt-2 font-display text-[28px] font-extrabold">30 flip cards, each with a deep note</h3>
              <p className="mt-2 text-[15px] text-muted">Itsuki won’t reveal hers unless you feed her a curry bun.</p>
              <div className="mt-6">
                <TryCards />
              </div>
            </div>
            <div className="reveal card p-7 sm:p-9" style={{ transitionDelay: '.1s' }}>
              <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[.14em] text-muted">
                <Star size={16} /> Report card
              </div>
              <h3 className="mt-2 font-display text-[28px] font-extrabold">Win Mr. Nakano’s approval</h3>
              <p className="mt-2 text-[15px] text-muted">Score 30+ in every subject to unlock the School Festival certificate. Drag the sliders to try it.</p>
              <div className="mt-6">
                <TryRadar />
              </div>
            </div>
            <div className="reveal card p-7 sm:p-9">
              <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[.14em] text-muted">
                <Egg size={16} /> Scrambled Eggs
              </div>
              <h3 className="mt-2 font-display text-[28px] font-extrabold">Can you tell them apart?</h3>
              <p className="mt-2 text-[15px] text-muted">Every sister is disguised as Itsuki. Guess who’s talking.</p>
              <div className="mt-6">
                <TryEggs />
              </div>
            </div>
            <div className="reveal grid gap-4 sm:grid-cols-2" style={{ transitionDelay: '.1s' }}>
              {[
                [PencilLine, 'Live quiz', '40 questions with instant feedback and step-by-step explanations in each sister’s voice.', '#FACC15'],
                [Sparkles, 'Desk items', 'Ichika’s script, Nino’s pastry, Miku’s matcha soda, Yotsuba’s medal and Itsuki’s curry bun give 50/50 hints or streak shields.', '#A855F7'],
                [Timer, 'Pomodoro', 'Yotsuba runs 25/5 focus sprints and cheers you through every lap.', '#22C55E'],
                [Heart, 'Affection', 'Every correct answer brings you closer to your tutor. Who will you bond with most?', '#EF4444'],
              ].map(([Icon, t, d, c]) => (
                <div key={t} className="card p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: c }}>
                    <Icon size={18} />
                  </span>
                  <div className="mt-4 text-[17px] font-bold">{t}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 text-center sm:px-8 md:grid-cols-4">
          {[
            [5, '', 'Tutors'],
            [30, '', 'Concept cards'],
            [40, '', 'Quiz questions'],
            [500, '', 'Points to master'],
          ].map(([n, s, l], i) => (
            <div key={l} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="font-display text-[clamp(48px,6vw,80px)] font-extrabold leading-none" style={{ color: SISTERS[i + 1].color }}>
                <Counter to={n} suffix={s} />
              </div>
              <div className="mt-2 text-[14px] font-semibold text-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-[32px] bg-ink p-8 text-white sm:p-14">
          <div className="blob -right-20 -top-20 h-80 w-80 bg-violet-500 opacity-40" />
          <div className="blob -bottom-24 left-10 h-72 w-72 bg-sky-500 opacity-30" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[.2em] text-white/50">Open source</div>
              <h2 className="mt-3 font-display text-[clamp(32px,4.4vw,52px)] font-extrabold leading-tight">Built in the open. Add your own lessons.</h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/70">
                React, Tailwind and Electron, MIT licensed. All lesson content lives in a single file, so adding a question is one pull request away.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={REPO} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-2xl bg-white px-5 py-3.5 text-[15px] font-bold text-ink transition hover:-translate-y-0.5">
                  <GitHubIcon /> View on GitHub
                </a>
                <a href={GH_USER} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-2xl border border-white/20 px-5 py-3.5 text-[15px] font-bold transition hover:bg-white/10">
                  <img src="https://github.com/huy100408.png?size=64" alt="" className="h-6 w-6 rounded-full" /> @huy100408
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[.06] p-5 font-mono text-[13px] leading-relaxed text-white/80 ring-1 ring-white/10">
              <div className="mb-3 flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-white/40">// src/data/sisters.js</span>
              <br />
              {'{'} <span className="text-sky-300">q</span>: <span className="text-amber-200">'Solve for x:'</span>,
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">code</span>: <span className="text-amber-200">'2x + 6 = 14'</span>,
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">options</span>: [<span className="text-amber-200">'x = 4'</span>, …],
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">answer</span>: <span className="text-violet-300">0</span>,
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">explain</span>: <span className="text-amber-200">'Two beats, like a scene~'</span> {'}'}
            </div>
          </div>
        </div>
      </section>

      <DownloadSection os={os} />
      <Faq />

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <img src={A('icon.png')} alt="" className="h-9 w-9" />
            <div>
              <div className="font-display text-[15px] font-extrabold">Nakano Academy</div>
              <div className="text-[12.5px] text-muted">
                Made by{' '}
                <a href={GH_USER} className="font-semibold text-ink underline">
                  @huy100408
                </a>{' '}
                · MIT License
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[13.5px] font-semibold text-muted sm:ml-auto">
            <a href={REPO} className="flex items-center gap-1.5 hover:text-ink">
              <GitHubIcon size={15} /> Source
            </a>
            <a href={`${REPO}/releases`} className="hover:text-ink">Releases</a>
            <a href={`${REPO}/issues`} className="hover:text-ink">Report a bug</a>
            <button onClick={() => { window.scrollTo(0, 0); setIntro(true) }} className="flex items-center gap-1.5 hover:text-ink">
              <Play size={13} /> Replay intro
            </button>
          </div>
        </div>
        <p className="mx-auto max-w-7xl px-5 pb-10 text-[12px] leading-relaxed text-faint sm:px-8">
          Fan project. The Quintessential Quintuplets (五等分の花嫁) and its characters belong to Negi Haruba and Kodansha. Not affiliated with or endorsed by the rights holders. The intro clip is streamed from YouTube and belongs to its creator.
        </p>
      </footer>
    </>
  )
}
