import { useEffect, useReducer } from 'react'
import { ELECTIVE, SUBJECTS } from '../data/sisters.js'

const KEY = 'nakano-academy:v2'

export const initialState = {
  scores: { math: 0, eng: 0, geo: 0, cs: 0, sci: 0 },
  affection: { ichika: 10, nino: 0, miku: 10, yotsuba: 20, itsuki: 5 },
  streak: 0,
  best: 0,
  shield: false,
  coreMode: false,
  festival: null,
  energy: 2,
  answered: 0,
  correct: 0,
  pomodoros: 0,
  eggsBest: 0,
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!raw) return initialState
    return {
      ...initialState,
      ...raw,
      scores: { ...initialState.scores, ...raw.scores },
      affection: { ...initialState.affection, ...raw.affection },
    }
  } catch {
    return initialState
  }
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))

function reducer(state, a) {
  switch (a.type) {
    case 'answer': {
      const base = { ...state, answered: state.answered + 1 }
      if (a.ok) {
        const streak = state.streak + 1
        return {
          ...base,
          correct: state.correct + 1,
          streak,
          best: Math.max(state.best, streak),
          scores: { ...state.scores, [a.subj]: Math.max(state.scores[a.subj], a.pct) },
          affection: { ...state.affection, [a.sister]: clamp(state.affection[a.sister] + 3, 0, 100) },
        }
      }
      if (state.shield) return { ...base, shield: false }
      return { ...base, streak: 0 }
    }
    case 'affection':
      return { ...state, affection: { ...state.affection, [a.sister]: clamp(state.affection[a.sister] + a.by, 0, 100) } }
    case 'shield':
      return { ...state, shield: true }
    case 'energy':
      return { ...state, energy: clamp(a.value, 0, 3) }
    case 'coreMode':
      return { ...state, coreMode: a.value }
    case 'festival':
      return { ...state, festival: a.value }
    case 'pomodoro':
      return { ...state, pomodoros: state.pomodoros + 1 }
    case 'eggs':
      return { ...state, eggsBest: Math.max(state.eggsBest, a.score) }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export function useProgress() {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable: progress lives in memory only */
    }
  }, [state])
  return [state, dispatch]
}

export function activeSubjects(coreMode) {
  return SUBJECTS.filter((s) => !coreMode || s.key !== ELECTIVE).map((s) => s.key)
}

export function summary(state) {
  const subs = activeSubjects(state.coreMode)
  const total = subs.reduce((n, k) => n + state.scores[k], 0)
  const passing = subs.filter((k) => state.scores[k] >= 30).length
  return { subs, total, max: subs.length * 100, passing, approved: passing === subs.length }
}
