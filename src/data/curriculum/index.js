// Numbered courses per subject (see README.md in this folder for the format).
import aphug13 from './aphug-units-1-3.js'
import aphug45 from './aphug-units-4-5.js'
import aphug67 from './aphug-units-6-7.js'
import cs from './cs.js'
import english from './english.js'
import math from './math.js'
import science from './science.js'

export const COURSES = {
  math: { title: 'Mathematics', units: math },
  english: { title: 'English Literature & Rhetoric', units: english },
  geo: { title: 'AP Human Geography', units: [...aphug13, ...aphug45, ...aphug67] },
  cs: { title: 'AP Computer Science', units: cs },
  science: { title: 'Science: Physics, Chemistry & Biology', units: science },
}

/** Every lesson of a course in order, with its unit attached. */
export function lessonsOf(subject) {
  return (COURSES[subject]?.units || []).flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u.unit, unitTitle: u.title })))
}

/** Does a widget value satisfy a check's `expect`? Exact value, {min,max} range, or array of allowed values. */
export function matchExpect(expect, value) {
  if (!expect || !value) return false
  return Object.entries(expect).every(([k, e]) => {
    const v = value[k]
    if (Array.isArray(e)) return e.some((x) => same(x, v))
    if (e && typeof e === 'object') return typeof v === 'number' && (e.min == null || v >= e.min - 1e-9) && (e.max == null || v <= e.max + 1e-9)
    return same(e, v)
  })
}
const same = (a, b) => (typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) < 1e-6 : typeof a === 'string' && typeof b === 'string' ? a.toLowerCase() === b.toLowerCase() : a === b)
