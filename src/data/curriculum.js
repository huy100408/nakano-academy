// Lesson content per subject, one module per sister (see src/data/subjects/).
import ichikaMath from './subjects/ichika-math.js'
import ninoEnglish from './subjects/nino-english.js'
import mikuGeo from './subjects/miku-geo.js'
import yotsubaCs from './subjects/yotsuba-cs.js'
import itsukiScience from './subjects/itsuki-science.js'

export const MODULES = {
  math: ichikaMath,
  english: ninoEnglish,
  geo: mikuGeo,
  cs: yotsubaCs,
  science: itsukiScience,
}

export const TIERS = [
  { key: 'easy', label: 'Tutoring Session', short: 'Easy', points: 10, weight: 1, size: 6 },
  { key: 'medium', label: 'Midterm', short: 'Medium', points: 20, weight: 2, size: 6 },
  { key: 'hard', label: 'Final Exam', short: 'Hard', points: 30, weight: 3, size: 6 },
]
export const tierOf = (key) => TIERS.find((t) => t.key === key) || TIERS[0]

/** Every question in the app, keyed by its id, with its subject attached. */
export const QUESTION_INDEX = Object.fromEntries(
  Object.entries(MODULES).flatMap(([subject, m]) => m.questions.map((q) => [q.id, { ...q, subject }])),
)

/** Scrambled Eggs rounds: three clues each, from every sister's module. */
export const EGG_ROUNDS = Object.values(MODULES).flatMap((m) => m.eggs.map((e, i) => ({ ...e, who: m.sister, id: `${m.sister}-${i}` })))
