import { useMemo, useState } from 'react'
import { CheckCircle2, ChevronDown, Circle, CircleDot, Presentation } from 'lucide-react'
import { COURSES } from '../../data/curriculum/index.js'
import { lessonKey, useAcademy } from '../../state/useAcademy'
import { Bar, Eyebrow } from '../../components/ui.jsx'

const INTERACTIVE = (l) => l.beats.some((b) => b.widget && b.widget.type !== 'boardQuiz')

export function courseStats(subject, lessonsState) {
  const units = COURSES[subject]?.units || []
  const all = units.flatMap((u) => u.lessons)
  const rows = all.map((l) => lessonsState[lessonKey(subject, l.id)])
  const done = rows.filter((r) => r?.completed).length
  const readiness = all.length ? Math.round(rows.reduce((n, r) => n + (r?.best_score || 0), 0) / all.length) : 0
  return { total: all.length, done, readiness }
}

/** The numbered course: units → lessons, with completion, best score and readiness. */
export default function SyllabusTree({ subject, activeId, onOpen, compact = false }) {
  const { state } = useAcademy()
  const course = COURSES[subject]
  const stats = courseStats(subject, state.lessons)
  const firstOpenUnit = useMemo(() => {
    const u = course.units.find((u) => u.lessons.some((l) => l.id === activeId)) || course.units.find((u) => u.lessons.some((l) => !state.lessons[lessonKey(subject, l.id)]?.completed)) || course.units[0]
    return u?.unit
  }, [course, activeId]) // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState(() => new Set([firstOpenUnit]))
  const toggle = (n) =>
    setOpen((s) => {
      const x = new Set(s)
      x.has(n) ? x.delete(n) : x.add(n)
      return x
    })

  return (
    <div className="anim-fade-up">
      <div className={`rounded-2xl bg-accent-softer p-4 ${compact ? 'mb-3' : 'mb-4'}`}>
        <Eyebrow>Course syllabus</Eyebrow>
        <div className="mt-0.5 font-display text-[17px] font-extrabold leading-tight">{course.title}</div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
          <div>
            <div className="mb-1 flex justify-between text-muted">
              <span>Completed</span>
              <span className="font-mono font-bold text-ink">
                {stats.done}/{stats.total}
              </span>
            </div>
            <Bar value={stats.done} max={stats.total || 1} className="h-1.5" />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-muted">
              <span>Exam readiness</span>
              <span className="font-mono font-bold text-ink">{stats.readiness}%</span>
            </div>
            <Bar value={stats.readiness} color={stats.readiness >= 70 ? '#16a34a' : '#f59e0b'} className="h-1.5" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {course.units.map((u) => {
          const rows = u.lessons.map((l) => state.lessons[lessonKey(subject, l.id)])
          const done = rows.filter((r) => r?.completed).length
          const ready = Math.round(rows.reduce((n, r) => n + (r?.best_score || 0), 0) / u.lessons.length)
          const isOpen = open.has(u.unit)
          return (
            <div key={u.unit} className="overflow-hidden rounded-2xl border border-line bg-white">
              <button onClick={() => toggle(u.unit)} className="flex w-full items-center gap-3 px-3.5 py-3 text-left hover:bg-ink/[.02]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-[13px] font-extrabold text-on-accent">{u.unit}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold">{u.title}</span>
                  <span className="text-[11.5px] text-muted">
                    {done}/{u.lessons.length} lessons · readiness {ready}%
                  </span>
                </span>
                <ChevronDown size={16} className={`shrink-0 text-muted transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="border-t border-line py-1">
                  {u.lessons.map((l, i) => {
                    const r = rows[i]
                    const active = l.id === activeId
                    const Icon = r?.completed ? CheckCircle2 : r?.beats_done ? CircleDot : Circle
                    return (
                      <button
                        key={l.id}
                        onClick={() => onOpen(l.id)}
                        className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition ${active ? 'bg-accent-soft' : 'hover:bg-ink/[.03]'}`}
                      >
                        <Icon size={15} className={`shrink-0 ${r?.completed ? 'text-good' : r?.beats_done ? 'text-accent-ink' : 'text-faint'}`} />
                        <span className="w-9 shrink-0 font-mono text-[12px] font-bold text-accent-ink">{l.id}</span>
                        <span className={`min-w-0 flex-1 ${compact ? 'truncate' : ''} ${active ? 'font-bold' : 'font-medium'}`}>{l.title}</span>
                        {INTERACTIVE(l) && <Presentation size={13} className="shrink-0 text-faint" aria-label="Interactive model" />}
                        {r?.best_score ? <span className="shrink-0 font-mono text-[11px] font-bold text-muted">{r.best_score}</span> : null}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
