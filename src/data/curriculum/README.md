# Course format (numbered lessons + live whiteboard)

Each sister's course is one or more ESM files in this folder, each `export default` an array of **units**.
`index.js` joins them into `COURSES[subjectKey]`.

```js
export default [
  {
    unit: 2,
    title: 'Population and Migration Patterns and Processes',
    lessons: [
      {
        id: '2.5',                       // "<unit>.<n>", unique within the course, never renumber once shipped
        title: 'The Demographic Transition Model',
        objective: 'One sentence: what the student can do after this lesson.',
        beats: [                         // 4–6 teaching beats
          {
            say: 'What the sister says aloud (2–4 sentences, in character, spoken-friendly: no symbols, write "x squared", "Big O of n").',
            board: [                     // 1–3 whiteboard elements that pop in while she speaks
              { type: 'heading', text: 'Stage 2: deaths fall first' },
              { type: 'term', term: 'Crude Death Rate (CDR)', def: 'Deaths per 1,000 people per year.' },
              { type: 'bullets', items: ['Vaccines', 'Clean water', 'Better food supply'] },
              { type: 'steps', items: ['High CBR + high CDR', 'CDR falls', 'Population booms'] }, // drawn with arrows
              { type: 'callout', text: 'Exam tip: NIR peaks in late Stage 2.', tone: 'tip' },     // tone: tip | warn | example
              { type: 'formula', text: 'NIR = (CBR − CDR) ÷ 10' },                               // symbols OK on the board
            ],
            widget: { type: 'dtm', props: { stage: 2 } },   // optional; stays on the board until a later beat sets another
            check: {                                        // REQUIRED on the LAST beat (and only there)
              prompt: 'Set the slider to the stage where the natural increase rate is highest.',
              expect: { stage: 2 },                         // matched against the widget's value (see catalog)
              hint: 'Look for the widest gap between births and deaths.',
              praise: 'Mm... Stage 2. Deaths fell, births did not. Well done.',
            },
          },
        ],
      },
    ],
  },
]
```

Rules
- The beat that has `check` must show a widget (on that beat or an earlier one still on the board).
  If the lesson has no natural interactive model, use `boardQuiz` on the last beat.
- `expect` values: an exact value, `{ min, max }` (inclusive, for numbers), or an array meaning "any of these".
  Every key in `expect` must be a key of that widget's value, with the exact spelling/case listed below.
- `say`, `hint`, `praise` are spoken by text-to-speech: write math/code in words, no brackets or symbols.
  Board text (`heading`, `term`, `formula`, …) may use normal notation.
- Stay in the sister's voice. Accuracy first.

## Widget catalog

Each widget receives `props` and reports a `value` object. `expect` compares against `value`.

| type | props | value (what `expect` can check) |
| --- | --- | --- |
| `dtm` | `{ stage?: 1-5 }` | `{ stage: 1-5 }` |
| `pyramid` | `{ preset?: 'expansive'\|'stationary'\|'constrictive' }` | `{ preset, birthRate: 5-50 (int), dependencyRatio: int }` |
| `vonThunen` | `{ highlight?: ring }` | `{ ring: 'market'\|'dairy'\|'forest'\|'grain'\|'ranching'\|null, distance: 0-100 (int km), transport: 1-10 (int) }` |
| `diffusion` | `{ mode?: 'relocation'\|'contagious'\|'hierarchical'\|'stimulus' }` | `{ mode, step: 0-8 }` |
| `urbanModels` | `{ model?: 'burgess'\|'hoyt'\|'harris-ullman'\|'galactic' }` | `{ model, zone: string\|null }` — zones: burgess `cbd, transition, working, residential, commuter`; hoyt `cbd, industry, low, middle, high`; harris-ullman `cbd, wholesale, low, middle, high, heavy-industry, outlying-business, residential-suburb, industrial-suburb`; galactic `cbd, edge-city, suburb, office-park, beltway` |
| `gerrymander` | `{}` (5×5 voter grid, 5 districts of 5 cells, 15 blue / 10 red voters) | `{ blueSeats: 0-5, redSeats: 0-5, valid: boolean }` |
| `binary` | `{ start?: 0-255, showHex?: boolean }` | `{ decimal: 0-255, hex: 'XX' (2 uppercase digits), binary: '00000000' }` |
| `logicGates` | `{ gate?: 'AND'\|'OR'\|'XOR'\|'NOT'\|'NAND' }` | `{ gate, a: 0\|1, b: 0\|1, out: 0\|1 }` |
| `search` | `{ array: number[] (sorted, 5-15 items), target: number, mode: 'binary'\|'linear' }` | `{ mode, picked: index\|null, steps: int, found: boolean }` — `picked` is the index the student clicked last |
| `bigO` | `{ n?: 1-1000 }` | `{ n: int, log: int, linear: int, nlogn: int, quadratic: int }` |
| `coordPlane` | `{ mode: 'linear'\|'quadratic'\|'trig', initial?: {...} }` | linear `{ mode, m, b }` (step 0.5, −10..10); quadratic `{ mode, a, h, k }` (a step 0.5 in −5..5, never 0; h, k step 1 in −10..10) for y = a(x−h)²+k; trig `{ mode, A, B, C }` (A 0.5..5 step 0.5, B 0.5..4 step 0.5, C −5..5 step 1) for y = A·sin(Bx)+C |
| `forces` | `{ mode: 'fma'\|'projectile' }` | fma `{ mode, mass: 1-50 (int kg), force: 0-500 (int N), accel: number (1 decimal) }`; projectile `{ mode, angle: 5-85 (int °), speed: 5-50 (int m/s), range: number (1 decimal m, g = 9.8), maxHeight: number (1 decimal) }` |
| `bohr` | `{ protons?: 1-20 }` | `{ protons: 1-20, electrons: 0-20, element: symbol, charge: int, shells: '2,8,1' }` |
| `balancer` | `{ equation: 'H2 + O2 -> H2O' \| 'CH4 + O2 -> CO2 + H2O' \| 'N2 + H2 -> NH3' \| 'Fe + O2 -> Fe2O3' \| 'C3H8 + O2 -> CO2 + H2O' }` | `{ equation, coefficients: '2,1,2' (comma string, left→right), balanced: boolean }` |
| `annotate` | `{ passage: [{ text, tag?, note? }] }` — clickable clauses; tags: `ethos, pathos, logos, metaphor, simile, personification, irony, imagery, alliteration, anaphora, parallelism, antithesis, rhetorical-question, hyperbole, diction, syntax, thesis, claim, evidence, commentary, counterargument` | `{ picked: tag\|null, foundCount: int }` — `picked` is the tag of the last clause clicked |
| `boardQuiz` | `{ q, options: [2-4 strings], answer: index }` | `{ choice: index\|null }` (so `expect: { choice: <answer> }`) |
