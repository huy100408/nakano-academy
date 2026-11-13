import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, ShieldCheck, X } from 'lucide-react'
import { Eyebrow, ITEM_ICONS, Kbd, Ring, shuffle, toast } from './ui.jsx'

function makeAttempt(s) {
  return shuffle(s.quiz).map((q) => {
    const order = shuffle(q.options.map((_, i) => i))
    return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) }
  })
}

const ITEM_LINES = {
  ichika: 'Psst~ I’ll mouth the answer from backstage. It’s not these two.',
  miku: '...Matcha buff. Two of these are clearly wrong. Mm.',
  itsuki: 'Energy restored. I shall eliminate two incorrect options.',
  nino: 'Eat this pastry. If you mess up once, I’ll... let it slide. Once!',
  yotsuba: 'My medal will protect you! One mistake won’t break your streak! Shishishi!',
}

export default function Quiz({ s, state, dispatch, say }) {
  const [attempt, setAttempt] = useState(() => makeAttempt(s))
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hidden, setHidden] = useState([])
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)
  const [itemUsed, setItemUsed] = useState(false)
  const q = attempt[qi]
  const total = attempt.length
  const correct = results.filter(Boolean).length
  const ItemIcon = ITEM_ICONS[s.item.icon]

  const choose = (i) => {
    if (picked !== null || hidden.includes(i)) return
    setPicked(i)
    const ok = i === q.answer
    const nextCorrect = correct + (ok ? 1 : 0)
    const shielded = !ok && state.shield
    setResults((r) => [...r, ok])
    dispatch({ type: 'answer', ok, subj: s.subj, sister: s.id, pct: Math.round((nextCorrect / total) * 100) })
    say(ok ? 'praising' : 'scolding')
    if (shielded) toast('Streak Shield absorbed the mistake', { icon: ShieldCheck })
  }

  const next = () => {
    if (picked === null) return
    if (qi + 1 >= total) {
      setDone(true)
      const c = results.filter(Boolean).length
      if (c === total)
        say(
          'praising',
          s.id === 'nino'
            ? 'A perfect score?! F-fine! I baked you a strawberry shortcake. Don’t make it weird!'
            : s.id === 'miku'
              ? '...Perfect. Like a flawless campaign. Here, matcha soda. For you.'
              : undefined,
        )
      else if (c / total >= 0.6) say('teaching', 'A passing effort. Review the cards and try again for a perfect score.')
      else say('scolding')
      return
    }
    setQi(qi + 1)
    setPicked(null)
    setHidden([])
    say('teaching')
  }

  const restart = () => {
    setAttempt(makeAttempt(s))
    setQi(0)
    setPicked(null)
    setHidden([])
    setResults([])
    setDone(false)
    setItemUsed(false)
    say('idle')
  }

  const useItem = () => {
    if (itemUsed || done) return
    if (s.item.type === 'fifty') {
      if (picked !== null) return
      setHidden(shuffle([0, 1, 2, 3].filter((k) => k !== q.answer)).slice(0, 2))
    } else {
      if (state.shield) return
      dispatch({ type: 'shield' })
      toast('Streak Shield ready', { icon: ShieldCheck })
    }
    say('teaching', ITEM_LINES[s.id])
    setItemUsed(true)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input,textarea') || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      const idx = ['1', '2', '3', '4'].indexOf(k) >= 0 ? ['1', '2', '3', '4'].indexOf(k) : ['a', 'b', 'c', 'd'].indexOf(k)
      if (!done && idx >= 0) choose(idx)
      else if (k === 'enter') done ? restart() : next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (done) {
    const pct = Math.round((correct / total) * 100)
    return (
      <div className="anim-fade-up flex h-full flex-col">
        <div className="flex items-center gap-5 rounded-2xl bg-accent-softer p-5">
          <Ring value={pct} size={92} stroke={8}>
            <div className="text-center leading-none">
              <div className="font-mono text-[24px] font-bold">{pct}</div>
              <div className="font-mono text-[10px] text-muted">/100</div>
            </div>
          </Ring>
          <div>
            <Eyebrow>Quiz result</Eyebrow>
            <div className="mt-1 font-display text-[22px] font-extrabold">
              {pct === 100 ? 'Perfect score!' : pct >= 60 ? 'Passing grade.' : pct >= 30 ? 'Above the line. Barely.' : 'Back to the books.'}
            </div>
            <div className="mt-0.5 text-[13px] text-muted">
              {correct} of {total} correct · your best score for {s.topic.split(' · ')[0]} is kept
            </div>
            {s.id === 'nino' && pct === 100 && <div className="mt-2 text-[13px] font-semibold text-accent-ink">🍰 Nino baked you a custom strawberry shortcake.</div>}
          </div>
        </div>

        <div className="scroll-thin mt-4 flex-1 space-y-1.5 overflow-y-auto pr-1">
          {attempt.map((x, k) => (
            <div key={k} className="flex items-start gap-3 rounded-xl px-3 py-2 text-[13px] hover:bg-ink/[.03]">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${results[k] ? 'bg-green-100 text-good' : 'bg-red-100 text-bad'}`}>
                {results[k] ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
              </span>
              <span className="flex-1 leading-snug">
                {x.q} {x.code && <code className="rounded bg-ink/[.05] px-1 font-mono text-[12px]">{x.code.split('\n')[0]}</code>}
                <span className="block text-[12px] text-muted">Answer: {x.options[x.answer]}</span>
              </span>
            </div>
          ))}
        </div>
        <button onClick={restart} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14px] font-bold text-on-accent shadow-sm transition hover:brightness-105">
          <RotateCcw size={15} /> Retake with new order <Kbd>↵</Kbd>
        </button>
      </div>
    )
  }

  return (
    <div key={qi} className="anim-fade-up flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>
          Question {qi + 1} of {total}
        </Eyebrow>
        <span className="font-mono text-[12px] font-semibold text-muted">
          {correct}/{results.length} correct
        </span>
      </div>
      <div className="mb-5 flex gap-1">
        {attempt.map((_, k) => (
          <span
            key={k}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ background: k < results.length ? (results[k] ? '#22c55e' : '#ef4444') : k === qi ? s.color : 'rgb(24 24 29 / .08)' }}
          />
        ))}
      </div>

      <h3 className="text-[17px] font-semibold leading-snug text-ink">{q.q}</h3>
      {q.code && <pre className="mt-3 overflow-x-auto rounded-xl bg-[#1d1b22] px-4 py-3 font-mono text-[13.5px] leading-relaxed text-[#f3efe6]">{q.code}</pre>}

      <div className="mt-4 grid gap-2">
        {q.options.map((o, i) => {
          const gone = hidden.includes(i)
          const isAns = i === q.answer
          const isPick = i === picked
          let cls = 'border-line bg-white hover:border-accent-line hover:bg-accent-softer'
          if (picked !== null) {
            if (isAns) cls = 'border-green-500 bg-green-50'
            else if (isPick) cls = 'border-red-400 bg-red-50'
            else cls = 'border-line bg-white opacity-45'
          }
          return (
            <button
              key={i}
              disabled={gone || picked !== null}
              onClick={() => choose(i)}
              className={`group flex items-center gap-3 rounded-xl border-[1.5px] px-3.5 py-3 text-left text-[14.5px] font-medium transition ${cls} ${gone ? 'pointer-events-none opacity-25 line-through' : ''}`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[12px] font-bold transition ${
                  picked !== null && isAns ? 'bg-green-500 text-white' : picked !== null && isPick ? 'bg-red-500 text-white' : 'bg-ink/[.05] text-muted group-hover:bg-accent group-hover:text-on-accent'
                }`}
              >
                {picked !== null && isAns ? <Check size={14} strokeWidth={3} /> : picked !== null && isPick ? <X size={14} strokeWidth={3} /> : 'ABCD'[i]}
              </span>
              <span className="flex-1">{o}</span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className={`anim-fade-up mt-4 rounded-xl border-l-4 px-4 py-3 text-[14px] leading-relaxed ${picked === q.answer ? 'border-green-500 bg-green-50/70' : 'border-red-400 bg-red-50/70'}`}>
          <div className="mb-0.5 text-[12.5px] font-bold" style={{ color: s.ink }}>
            {picked === q.answer ? 'Correct!' : 'Not quite.'} {s.first} explains
          </div>
          {q.explain}
        </div>
      )}

      <div className="mt-auto flex items-center gap-3 pt-5">
        <button
          onClick={useItem}
          disabled={itemUsed || (s.item.type === 'fifty' && picked !== null) || (s.item.type === 'shield' && state.shield)}
          className="flex items-center gap-3 rounded-xl border border-dashed border-accent-line bg-accent-softer px-3 py-2 text-left transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
          title={s.item.desc}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-on-accent">
            <ItemIcon size={16} />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-bold">{s.item.name}</span>
            <span className="block text-[11.5px] text-muted">{itemUsed ? 'Used this attempt' : s.item.type === 'fifty' ? '50/50 hint' : state.shield ? 'Shield active' : 'Streak shield'}</span>
          </span>
        </button>
        {picked !== null ? (
          <button onClick={next} className="ml-auto flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[14px] font-bold text-white shadow-sm transition hover:bg-ink/85">
            {qi + 1 >= total ? 'See results' : 'Next question'} <ArrowRight size={15} />
          </button>
        ) : (
          <span className="ml-auto hidden items-center gap-1 text-[11.5px] text-faint sm:flex">
            Answer with <Kbd>1</Kbd>–<Kbd>4</Kbd>
          </span>
        )}
      </div>
    </div>
  )
}
