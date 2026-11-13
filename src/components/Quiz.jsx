import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, Headphones, LogOut, Medal, RotateCcw, ShieldCheck, Sparkles, X } from 'lucide-react'
import { MODULES, tierOf } from '../data/curriculum.js'
import { ITEMS, itemByKey } from '../data/items.js'
import { bySubject, byId } from '../data/sisters.js'
import { useAcademy } from '../state/useAcademy'
import { Avatar, Eyebrow, ITEM_ICONS, Kbd, Ring, pick, shuffle, toast } from './ui.jsx'

const LETTERS = 'ABCD'

function prepare(questions) {
  return questions.map((q) => {
    const order = shuffle([0, 1, 2, 3])
    return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) }
  })
}

function reactionFor(subject, kind, milestone) {
  const r = MODULES[subject]?.reactions
  if (!r) return undefined
  if (kind === 'correct' && milestone && r.streak?.[milestone]) return pick(r.streak[milestone])
  return pick(kind === 'correct' ? r.correct : r.mistake)
}

/**
 * One quiz run. `questions` carry their `subject`. When the run ends it is logged to
 * study_sessions as (sister, subject, tier). `say(mood, text, sisterId)` drives dialogue.
 */
export default function Quiz({ title, questions, tier, sister, subject, say, onExit, onRestart }) {
  const { state, inventory, answer, finishSession, consumeItem } = useAcademy()
  const run = useMemo(() => prepare(questions), [questions])
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hidden, setHidden] = useState([])
  const [hint, setHint] = useState(null)
  const [doubled, setDoubled] = useState(false)
  const [results, setResults] = useState([])
  const [score, setScore] = useState(0)
  const [maruo, setMaruo] = useState(0)
  const [itemsUsed, setItemsUsed] = useState({})
  const [summary, setSummary] = useState(null)
  const answeredQi = useRef(-1)
  const q = run[qi]
  const total = run.length
  const correct = results.filter(Boolean).length
  const speaker = q ? bySubject(q.subject) : byId(sister)

  const choose = (i) => {
    if (!q || picked !== null || hidden.includes(i) || answeredQi.current === qi) return
    answeredQi.current = qi
    setPicked(i)
    const ok = i === q.answer
    const res = answer({ subject: q.subject, questionId: q.id, correct: ok, doubled })
    setResults((r) => [...r, ok])
    setScore((s) => s + res.points)
    setMaruo((m) => m + res.approvalDelta)
    const line = reactionFor(q.subject, ok ? 'correct' : 'mistake', res.milestone)
    say(ok ? 'praising' : 'scolding', res.shielded ? `${line} (The kitchen timer saved your streak.)` : line, speaker.id)
    if (res.shielded) toast('Streak Shield used: your streak is safe', { icon: ShieldCheck })
    if (res.milestone) toast(`${res.milestone}-answer streak!`, { icon: Sparkles })
  }

  const next = () => {
    if (picked === null || summary) return
    if (qi + 1 >= total) {
      const s = finishSession({ sister, subject, tier, correct, total, score, maruoDelta: maruo, itemsUsed })
      setSummary(s)
      const pct = total ? correct / total : 0
      say(pct >= 0.8 ? 'praising' : pct >= 0.5 ? 'teaching' : 'scolding', undefined, byId(sister)?.id || speaker.id)
      if (s.bonusItem) toast(`Earned: ${itemByKey(s.bonusItem).name}`, { icon: Medal })
      return
    }
    setQi(qi + 1)
    setPicked(null)
    setHidden([])
    setHint(null)
    setDoubled(false)
    say('teaching', undefined, bySubject(run[qi + 1].subject).id)
  }

  const use = (key) => {
    const item = itemByKey(key)
    if (summary) return
    if (key === 'nino_timer' && state.shield) return toast('A shield is already active')
    if (['ichika_notes', 'miku_headphones', 'yotsuba_ribbon'].includes(key) && picked !== null) return toast('Use it before you answer')
    if (key === 'ichika_notes' && hidden.length) return
    if (key === 'miku_headphones' && hint) return
    if (key === 'yotsuba_ribbon' && doubled) return
    if (!consumeItem(key)) return toast(`No ${item.name} left. Score 80%+ in ${byId(item.sister).first}'s sessions to earn more.`, { ms: 4000 })
    setItemsUsed((u) => ({ ...u, [key]: (u[key] || 0) + 1 }))
    if (key === 'ichika_notes') setHidden(shuffle([0, 1, 2, 3].filter((k) => k !== q.answer)).slice(0, 2))
    if (key === 'miku_headphones') setHint(q.hint)
    if (key === 'yotsuba_ribbon') setDoubled(true)
    if (key === 'itsuki_bun') toast('+10% Maruo approval')
    say('teaching', item.line, item.sister)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input,textarea') || e.metaKey || e.ctrlKey || e.altKey) return
      const i = LETTERS.toLowerCase().indexOf(e.key.toLowerCase())
      if (!summary && e.key.length === 1 && i >= 0) {
        e.preventDefault()
        choose(i)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        summary ? onRestart?.() : next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (summary) {
    const pct = total ? Math.round((correct / total) * 100) : 0
    return (
      <div className="anim-fade-up flex h-full flex-col">
        <div className="flex items-center gap-5 rounded-2xl bg-accent-softer p-5">
          <Ring value={pct} size={88} stroke={8}>
            <div className="text-center leading-none">
              <div className="font-mono text-[22px] font-bold">{pct}%</div>
            </div>
          </Ring>
          <div className="min-w-0">
            <Eyebrow>{title} · results</Eyebrow>
            <div className="mt-1 font-display text-[21px] font-extrabold">{pct === 100 ? 'Perfect run!' : pct >= 80 ? 'Excellent work.' : pct >= 50 ? 'Passing. Keep going.' : 'Back to the books.'}</div>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-muted">
              <span>
                {correct}/{total} correct
              </span>
              <span>+{score} exam pts</span>
              <span className={maruo + summary.approvalDelta >= 0 ? 'text-good' : 'text-bad'}>
                Maruo {maruo + summary.approvalDelta >= 0 ? '+' : ''}
                {maruo + summary.approvalDelta}%
              </span>
            </div>
            {summary.bonusItem && <div className="mt-2 text-[13px] font-semibold text-accent-ink">Earned {itemByKey(summary.bonusItem).name}!</div>}
          </div>
        </div>
        <div className="scroll-thin mt-4 flex-1 space-y-1 overflow-y-auto pr-1">
          {run.map((x, k) => (
            <div key={x.id} className="flex items-start gap-3 rounded-xl px-3 py-2 text-[13px] hover:bg-ink/[.03]">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${results[k] ? 'bg-green-100 text-good' : 'bg-red-100 text-bad'}`}>
                {results[k] ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1 leading-snug">
                {x.q}
                <span className="block text-[12px] text-muted">Answer: {x.options[x.answer]}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button onClick={onExit} className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-line px-4 text-[14px] font-bold hover:bg-ink/[.03]">
            <LogOut size={15} /> Done
          </button>
          <button onClick={onRestart} className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[14px] font-bold text-on-accent hover:brightness-105">
            <RotateCcw size={15} /> Another round <Kbd>↵</Kbd>
          </button>
        </div>
      </div>
    )
  }

  if (!q)
    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-muted">
        Nothing to review here right now.
        <button onClick={onExit} className="mt-3 text-[13px] font-semibold text-ink underline">
          Back
        </button>
      </div>
    )

  return (
    <div key={q.id} className="anim-fade-up flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Eyebrow>
          {title} · {qi + 1}/{total}
        </Eyebrow>
        <span className="rounded-full bg-ink/[.05] px-2 py-0.5 text-[11px] font-bold text-muted">
          {tierOf(q.tier).label} · {tierOf(q.tier).points * (doubled ? 2 : 1)} pts{doubled ? ' (×2)' : ''}
        </span>
      </div>
      <div className="mb-4 flex gap-1">
        {run.map((_, k) => (
          <span
            key={k}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ background: k < results.length ? (results[k] ? '#22c55e' : '#ef4444') : k === qi ? 'var(--accent)' : 'rgb(24 24 29 / .08)' }}
          />
        ))}
      </div>

      {q.subject !== subject && (
        <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-muted">
          <Avatar s={speaker} size={20} /> {speaker.first} · {speaker.topic}
        </div>
      )}
      <h3 className="text-[16.5px] font-semibold leading-snug text-ink">{q.q}</h3>
      {q.code && <pre className="scroll-thin mt-3 overflow-x-auto rounded-xl bg-[#1d1b22] px-4 py-3 font-mono text-[13px] leading-relaxed text-[#f3efe6]">{q.code}</pre>}
      {hint && (
        <div className="anim-fade-up mt-3 flex items-start gap-2 rounded-xl bg-indigo-50 px-3 py-2.5 text-[13.5px] text-indigo-900">
          <Headphones size={15} className="mt-0.5 shrink-0" /> {hint}
        </div>
      )}

      <div className="mt-4 grid gap-2">
        {q.options.map((o, i) => {
          const gone = hidden.includes(i)
          const isAns = i === q.answer
          const isPick = i === picked
          let cls = 'border-line bg-white hover:border-accent-line hover:bg-accent-softer'
          if (picked !== null) cls = isAns ? 'border-green-500 bg-green-50' : isPick ? 'border-red-400 bg-red-50' : 'border-line bg-white opacity-45'
          return (
            <button
              key={i}
              disabled={gone || picked !== null}
              onClick={() => choose(i)}
              className={`group flex min-h-[48px] items-center gap-3 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left text-[14.5px] font-medium transition ${cls} ${gone ? 'pointer-events-none opacity-25 line-through' : ''}`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[12px] font-bold transition ${
                  picked !== null && isAns ? 'bg-green-500 text-white' : picked !== null && isPick ? 'bg-red-500 text-white' : 'bg-ink/[.05] text-muted group-hover:bg-accent group-hover:text-on-accent'
                }`}
              >
                {picked !== null && isAns ? <Check size={14} strokeWidth={3} /> : picked !== null && isPick ? <X size={14} strokeWidth={3} /> : LETTERS[i]}
              </span>
              <span className="min-w-0 flex-1 break-words">{o}</span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className={`anim-fade-up mt-4 rounded-xl border-l-4 px-4 py-3 text-[14px] leading-relaxed ${picked === q.answer ? 'border-green-500 bg-green-50/70' : 'border-red-400 bg-red-50/70'}`}>
          <div className="mb-0.5 text-[12.5px] font-bold" style={{ color: speaker.ink }}>
            {picked === q.answer ? 'Correct!' : 'Not quite.'} {speaker.first} explains
          </div>
          {q.explain}
        </div>
      )}

      {/* Item belt */}
      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {ITEMS.map((it) => {
            const Icon = ITEM_ICONS[it.icon]
            const n = inventory[it.key]
            const owner = byId(it.sister)
            return (
              <button
                key={it.key}
                onClick={() => use(it.key)}
                title={`${it.name}: ${it.desc}`}
                className={`relative flex min-h-[40px] items-center gap-1.5 rounded-xl border px-2.5 text-[12px] font-bold transition ${n ? 'border-line bg-white hover:-translate-y-0.5 hover:shadow-card' : 'border-dashed border-line text-faint'}`}
              >
                <span className="grid h-6 w-6 place-items-center rounded-md" style={{ background: n ? owner.color : 'rgb(24 24 29 / .06)', color: n ? owner.onAccent : undefined }}>
                  <Icon size={13} />
                </span>
                <span className="hidden sm:inline">{it.short}</span>
                <span className="font-mono text-muted">×{n}</span>
                {it.key === 'nino_timer' && state.shield && <ShieldCheck size={13} className="text-sky-500" />}
              </button>
            )
          })}
          {picked !== null && (
            <button onClick={next} className="ml-auto flex min-h-[44px] items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-bold text-white hover:bg-ink/85">
              {qi + 1 >= total ? 'Finish' : 'Next'} <ArrowRight size={15} />
            </button>
          )}
        </div>
        {picked === null && (
          <div className="mt-2 hidden items-center gap-1 text-[11.5px] text-faint sm:flex">
            Answer with <Kbd>A</Kbd>–<Kbd>D</Kbd> · <Kbd>↵</Kbd> next
          </div>
        )}
      </div>
    </div>
  )
}
