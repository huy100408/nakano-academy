// All tutor content lives here. Each sister: 6 concept cards, 8 quiz questions.
// Quiz `answer` is the index into `options` (options are shuffled at runtime).

export const SUBJECTS = [
  { key: 'math', label: 'Mathematics', short: 'Math' },
  { key: 'eng', label: 'English', short: 'English' },
  { key: 'geo', label: 'AP Human Geography', short: 'Human Geo' },
  { key: 'cs', label: 'Computer Science', short: 'CS' },
  { key: 'sci', label: 'Science', short: 'Science' },
]

// The 4-Core toggle drops the elective (Computer Science) from totals.
export const ELECTIVE = 'cs'

export const SISTERS = [
  /* ───────────────────────────── 01 ICHIKA ───────────────────────────── */
  {
    id: 'ichika',
    no: '01',
    name: 'Ichika Nakano',
    first: 'Ichika',
    kanji: '一花',
    subj: 'math',
    topic: 'Algebra · Geometry',
    base: 39,
    total: 127,
    color: '#FACC15',
    ink: '#854D0E',
    onAccent: '#1C1917',
    motif: 'Right-ear piercing',
    role: 'The eldest. Actress.',
    persona: 'Playful, teasing big sister. Explains equations like scenes in a script.',
    item: { name: "Ichika's Script", icon: 'ScrollText', type: 'fifty', desc: 'Cuts two wrong answers from the current question.' },
    lines: {
      idle: [
        "Onee-san's here~ Shall we run some math lines before my audition?",
        'Want to know a secret? Equations are just scripts with numbers.',
        "Ehehe, don't stare at me. Stare at the problem.",
      ],
      teaching: [
        'Scene one: isolate the variable. Scene two: do the same thing to both sides.',
        "Read it like a line from a script. One beat at a time.",
        'A trick from the director: sketch the shape first, then solve.',
      ],
      praising: [
        'Bravo! That deserves a standing ovation~',
        'Look at you. Onee-san is a little impressed.',
        'Perfect take. No reshoots needed.',
      ],
      scolding: [
        "Cut! Let's run that scene again~",
        "Ara, you flubbed your line. Happens to the best of us.",
        "Mou~ Let me walk you through it, step by step.",
      ],
    },
    cards: [
      { front: 'Quadratic Formula', back: 'For ax² + bx + c = 0:\nx = (−b ± √(b² − 4ac)) / 2a', deep: 'The discriminant D = b² − 4ac decides the ending: D > 0 gives two real roots, D = 0 one repeated root, D < 0 no real roots.' },
      { front: 'Pythagorean Theorem', back: 'In a right triangle, a² + b² = c², where c is the hypotenuse.', deep: 'Memorize the common triples 3-4-5, 5-12-13 and 8-15-17. Any multiple, like 6-8-10, also works.' },
      { front: 'Slope of a Line', back: 'm = (y₂ − y₁) / (x₂ − x₁)\nRise over run.', deep: 'Slope-intercept form is y = mx + b. Parallel lines share m. Perpendicular slopes multiply to −1.' },
      { front: 'Polygon Angle Sum', back: 'An n-sided polygon has interior angles summing to (n − 2) × 180°.', deep: 'Each angle of a regular n-gon is (n − 2) × 180° ÷ n. Exterior angles of any convex polygon sum to 360°.' },
      { front: 'Laws of Exponents', back: 'aᵐ · aⁿ = aᵐ⁺ⁿ\naᵐ ÷ aⁿ = aᵐ⁻ⁿ\n(aᵐ)ⁿ = aᵐⁿ', deep: 'a⁰ = 1 for a ≠ 0, and a⁻ⁿ = 1 / aⁿ. Fractional exponents are roots: a^(1/n) = ⁿ√a.' },
      { front: 'Systems of Equations', back: 'Solve two equations together by substitution or elimination.', deep: 'Elimination: add or subtract the equations so one variable cancels. If the lines are parallel there is no solution; if they coincide there are infinitely many.' },
    ],
    quiz: [
      { q: 'Solve for x:', code: '2x + 6 = 14', options: ['x = 4', 'x = 5', 'x = 10', 'x = 8'], answer: 0, explain: 'Subtract 6 from both sides to get 2x = 8, then divide by 2: x = 4. Two beats, like a short scene~' },
      { q: 'What are the roots of this equation?', code: 'x² − 5x + 6 = 0', options: ['x = 1 and x = 6', 'x = 2 and x = 3', 'x = −2 and x = −3', 'x = 5 and x = 6'], answer: 1, explain: 'Find two numbers that multiply to 6 and add to −5: −2 and −3. So (x − 2)(x − 3) = 0, which gives x = 2 or x = 3.' },
      { q: 'A right triangle has legs 6 and 8. How long is the hypotenuse?', options: ['12', '14', '10', '48'], answer: 2, explain: '6² + 8² = 36 + 64 = 100, and √100 = 10. It is the 3-4-5 triple doubled. Onee-san loves a callback.' },
      { q: 'What is the sum of the interior angles of a hexagon?', options: ['540°', '720°', '900°', '1080°'], answer: 1, explain: 'A hexagon has 6 sides, so (6 − 2) × 180° = 720°.' },
      { q: 'What is the slope of the line through (1, 2) and (3, 8)?', options: ['2', '6', '1/3', '3'], answer: 3, explain: 'Rise is 8 − 2 = 6, run is 3 − 1 = 2, so the slope is 6 ÷ 2 = 3.' },
      { q: 'Solve the system:', code: 'x + y = 10\nx − y = 4', options: ['x = 7, y = 3', 'x = 6, y = 4', 'x = 3, y = 7', 'x = 5, y = 5'], answer: 0, explain: 'Add the equations and y cancels: 2x = 14, so x = 7. Then 7 + y = 10 gives y = 3. Elimination, like cutting an extra from the scene.' },
      { q: 'What is the area of a circle with radius 3?', options: ['6π', '3π', '9π', '12π'], answer: 2, explain: 'A = πr² = π × 3² = 9π. 6π is the circumference (2πr), a classic mix-up.' },
      { q: 'Simplify:', code: '(x³)² · x', options: ['x⁶', 'x⁷', 'x⁵', 'x⁹'], answer: 1, explain: '(x³)² = x⁶ because you multiply powers. Then x⁶ · x¹ = x⁷ because you add powers.' },
    ],
  },

  /* ───────────────────────────── 02 NINO ───────────────────────────── */
  {
    id: 'nino',
    no: '02',
    name: 'Nino Nakano',
    first: 'Nino',
    kanji: '二乃',
    subj: 'eng',
    topic: 'Grammar · Vocabulary',
    base: 43,
    total: 119,
    color: '#A855F7',
    ink: '#6B21A8',
    onAccent: '#FFFFFF',
    motif: 'Two butterfly ribbons',
    role: 'The second. Cook.',
    persona: 'Sharp, blunt tsundere who warms up on streaks and bakes for perfect scores.',
    item: { name: "Nino's Pastry", icon: 'CakeSlice', type: 'shield', desc: 'Streak Shield. Your next wrong answer will not break the streak.' },
    lines: {
      idle: [
        'What? You actually showed up? Fine. Sit down.',
        "Don't get the wrong idea. I'm only tutoring because there's nothing on TV.",
        "If you're going to waste my time, at least do it quietly.",
      ],
      teaching: [
        "Listen carefully, because I'm only saying this once.",
        'Grammar is like baking. Skip one step and the whole thing collapses.',
        'Subject first. Then the verb has to match it. Got it?',
      ],
      praising: [
        "...Not bad. Don't let it go to your head.",
        "Hmph. I guess you're not completely hopeless.",
        "Correct. It's not like I'm happy about it or anything.",
      ],
      warm: [
        'You are on a roll... I-I baked something extra, okay? Eat it.',
        'Fine! You are good at this! Are you happy now?!',
        'Keep it up and maybe I will make you a whole cake. Maybe.',
      ],
      scolding: [
        'Are you an idiot?! Read the sentence again!',
        'Wrong! Ugh, honestly. Look here.',
        "That's not even close. Pay attention this time!",
      ],
    },
    cards: [
      { front: 'Present Perfect', back: 'have / has + past participle\n"I have finished my homework."', deep: 'It links the past to now. Signal words: already, yet, ever, never, since, for. Never use it with a finished time: ✗ "I have seen it yesterday."' },
      { front: 'Subject–Verb Agreement', back: 'Singular subject → singular verb.\n"She studies." / "They study."', deep: 'With either…or and neither…nor, the verb agrees with the nearer subject: "Neither the sisters nor the tutor is late."' },
      { front: 'Relative Pronouns', back: 'who → people · which → things\nthat → people or things · whose → possession', deep: 'Use commas with which for extra information: "The cake, which Nino baked, is gone." Never put commas around a that clause.' },
      { front: 'Second Conditional', back: 'If + past simple, would + base verb\n"If I had time, I would bake."', deep: 'It describes imaginary present situations. Formal English uses were for every person: "If I were you, I would study."' },
      { front: 'Affect vs. Effect', back: 'Affect is usually a verb (to influence).\nEffect is usually a noun (the result).', deep: 'Memory trick RAVEN: Remember, Affect = Verb, Effect = Noun. Exception: "to effect change" means to bring change about.' },
      { front: 'Passive Voice', back: 'be + past participle\n"The cake was baked by Nino."', deep: 'Use it when the action matters more than who did it. Match the tense through be: is baked, was baked, has been baked, will be baked.' },
    ],
    quiz: [
      { q: 'Choose the correct form.', code: 'She ___ to Kyoto three times.', options: ['has been', 'have been', 'was been', 'is going'], answer: 0, explain: '"She" is singular, so it is has. "Three times" is life experience up to now, which means present perfect. Obviously.' },
      { q: 'Choose the correct verb.', code: 'Neither the sisters nor the tutor ___ late.', options: ['are', 'were', 'is', 'be'], answer: 2, explain: 'With neither…nor, the verb matches the nearer subject. "The tutor" is singular, so is. Write that down.' },
      { q: 'Complete the second conditional.', code: 'If I ___ you, I would study harder.', options: ['am', 'was being', 'be', 'were'], answer: 3, explain: 'Imaginary situation, second conditional, so were for every person. "If I were you." Remember it.' },
      { q: 'Which word is a synonym of "diligent"?', options: ['Lazy', 'Hardworking', 'Careless', 'Noisy'], answer: 1, explain: 'Diligent means careful and hardworking. Like me in the kitchen. Not like you before this lesson.' },
      { q: 'Choose the correct relative pronoun.', code: 'The girl ___ baked the cake is Nino.', options: ['which', 'whose', 'who', 'whom'], answer: 2, explain: '"The girl" is a person and the subject of "baked", so who. Not which. I am not a thing!' },
      { q: 'Choose the correct passive form.', code: 'The cake ___ by Nino yesterday.', options: ['baked', 'was baked', 'has baked', 'is baking'], answer: 1, explain: '"Yesterday" is finished past time, and the cake did not bake itself. Past passive: was + baked.' },
      { q: 'Which word fills the blank?', code: '___ raining again, so bring an umbrella.', options: ["It's", 'Its', "Its'", 'It'], answer: 0, explain: "It's = it is. Its (no apostrophe) is possessive, like \"the cat licked its paw.\" Do not mix them up again." },
      { q: 'Choose the correct preposition.', code: "I'm interested ___ cooking.", options: ['on', 'at', 'in', 'for'], answer: 2, explain: '"Interested in." It is a fixed pair, so memorize it. ...And yes, you can be interested in my cooking.' },
    ],
  },

  /* ───────────────────────────── 03 MIKU ───────────────────────────── */
  {
    id: 'miku',
    no: '03',
    name: 'Miku Nakano',
    first: 'Miku',
    kanji: '三玖',
    subj: 'geo',
    topic: 'AP Human Geography',
    base: 68,
    total: 162,
    color: '#3B82F6',
    ink: '#1E40AF',
    onAccent: '#FFFFFF',
    motif: 'Blue headphones',
    role: 'The third. Warlord enthusiast.',
    persona: 'Soft-spoken and earnest. Reads every map like a Sengoku battlefield. Runs on matcha soda.',
    item: { name: "Miku's Matcha Soda", icon: 'CupSoda', type: 'fifty', desc: 'Matcha buff. Two wrong answers vanish.' },
    lines: {
      idle: [
        "...Mm. You came. Let's study geography together.",
        'Takeda Shingen studied the land before every battle. We will too.',
        '...Do you want some matcha soda? It helps me think.',
      ],
      teaching: [
        'Swift as the wind, quiet as the forest... read the stimulus first, then the question.',
        'Think of it like a battle map. Who lives where, and why they moved.',
        '...On the AP exam, always ask: what scale is this? Local, national, global?',
      ],
      praising: [
        '...You got it. Like a general who knows the terrain.',
        'Mm. That made me happy.',
        "Correct. You're becoming a strategist.",
      ],
      scolding: [
        "...That one's wrong. It's okay. Even Shingen lost sometimes.",
        'Mm... not quite. Let me explain.',
        "...Don't give up. We retreat, then regroup.",
      ],
    },
    cards: [
      { front: 'Demographic Transition Model', back: 'Stage 1 high CBR & CDR\nStage 2 CDR falls fast\nStage 3 CBR falls\nStage 4 both low\nStage 5 CBR < CDR', deep: 'Stage 2 is driven by medicine and sanitation (the epidemiological transition). Stage 3 is driven by urbanization, women in the workforce, and access to contraception.' },
      { front: "Von Thünen's Model", back: 'Rings of agriculture around a market city, set by transport cost vs. land rent.', deep: 'Innermost: dairy and market gardening (perishable). Then forest (heavy fuel), then grain/field crops, then ranching on the outer ring.' },
      { front: 'Central Place Theory', back: "Christaller: settlements serve hinterlands in hexagonal market areas.", deep: 'Threshold = the minimum population needed to support a service. Range = the maximum distance people will travel for it. High-order goods (hospitals) need big thresholds.' },
      { front: 'World-Systems Theory', back: 'Wallerstein: Core · Semi-periphery · Periphery', deep: 'Core states (USA, Germany, Japan) have high-skill, high-wage production. Periphery states export raw materials. The semi-periphery (Brazil, India, China) mixes both.' },
      { front: 'Migration: Push, Pull, Gravity', back: 'Push factors drive people out; pull factors draw them in.', deep: "Ravenstein's laws: most migrants move short distances, often step by step. The gravity model says interaction rises with population size and falls with distance." },
      { front: 'Political Boundaries', back: 'Antecedent · Subsequent · Superimposed · Relic · Geometric', deep: 'Superimposed boundaries are imposed by outside powers, ignoring existing cultures (much of colonial Africa). Centripetal forces unify a state; centrifugal forces divide it.' },
    ],
    quiz: [
      { q: 'A country has a crude birth rate of 38 per 1,000 and a crude death rate that recently fell from 30 to 12 per 1,000 after vaccines and clean water arrived. Which DTM stage best describes it?', options: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'], answer: 1, explain: '...Births are still high but deaths dropped fast. That is Stage 2, when the population grows fastest. Like an army that suddenly stops losing soldiers.' },
      { q: "According to Von Thünen's model, which activity would locate in the ring closest to the market city?", options: ['Cattle ranching', 'Grain farming', 'Dairy and market gardening', 'Forestry'], answer: 2, explain: 'Milk and vegetables spoil quickly, so they must be close to the market. Ranching goes farthest out, because cattle can walk to market.' },
      { q: 'A population pyramid with a very wide base that narrows sharply toward the top most likely indicates:', options: ['An aging population with low fertility', 'High fertility and a young population', 'Zero population growth', 'Large-scale in-migration of retirees'], answer: 1, explain: 'A wide base means many children, so fertility is high. The narrow top means few people live to old age. ...This is typical of Stage 2 countries.' },
      { q: 'Many boundaries in Africa were drawn by European powers at the Berlin Conference without regard to existing ethnic groups. These are best classified as:', options: ['Antecedent boundaries', 'Relic boundaries', 'Subsequent boundaries', 'Superimposed boundaries'], answer: 3, explain: 'Superimposed: placed on top of the land by outsiders. ...Like a warlord drawing borders on someone else\'s map. It often causes centrifugal conflict later.' },
      { q: 'In Central Place Theory, the minimum number of people needed to support a service is called its:', options: ['Range', 'Threshold', 'Hinterland', 'Market area'], answer: 1, explain: 'Threshold. Range is how far people will travel. A matcha soda vending machine has a tiny threshold... a hospital has a huge one.' },
      { q: 'Which of the following is the best example of a centripetal force?', options: ['A separatist movement in one region', 'A shared national language taught in schools', 'Deep religious divisions between provinces', 'An uneven distribution of wealth'], answer: 1, explain: 'A shared language pulls people together, so it is centripetal. The other three pull a state apart. ...Shingen kept his clan united the same way.' },
      { q: 'According to the gravity model, spatial interaction is greatest between:', options: ['Two small towns far apart', 'Two large cities close together', 'A large city and a distant small town', 'Any two places with the same climate'], answer: 1, explain: 'Interaction = population × population ÷ distance. Big populations and short distance give the strongest pull.' },
      { q: "In Wallerstein's world-systems theory, which country is most commonly classified as semi-periphery?", options: ['Germany', 'Chad', 'Brazil', 'Japan'], answer: 2, explain: 'Brazil has both advanced industry and raw-material exports, so it is semi-periphery. Germany and Japan are core. Chad is periphery.' },
    ],
  },

  /* ───────────────────────────── 04 YOTSUBA ───────────────────────────── */
  {
    id: 'yotsuba',
    no: '04',
    name: 'Yotsuba Nakano',
    first: 'Yotsuba',
    kanji: '四葉',
    subj: 'cs',
    topic: 'Computer Science',
    base: 31,
    total: 96,
    color: '#22C55E',
    ink: '#166534',
    onAccent: '#FFFFFF',
    motif: 'Green bunny ribbon',
    role: 'The fourth. Athlete.',
    persona: 'Hyper-energetic supporter. Treats code like relay training. Runs Pomodoro stamina timers.',
    item: { name: "Yotsuba's Medal", icon: 'Medal', type: 'shield', desc: 'Streak Shield. The medal absorbs one mistake.' },
    lines: {
      idle: [
        'Shishishi! Ready to train your brain muscles?!',
        "Let's do our best together! Ganbarou!",
        "I'll be your biggest supporter, no matter what!",
      ],
      teaching: [
        'Okay, warm-up stretch! Trace the code one line at a time, like counting laps!',
        'A loop is just running laps! Count how many times you go around!',
        'Recursion is like a relay race! Pass the baton until someone hits the finish line!',
      ],
      praising: [
        'YESSS! Gold medal!! Shishishi!',
        'You did it! I knew you could!',
        "Amazing! Let's run a victory lap!",
      ],
      scolding: [
        "Waah, so close! Don't give up, we'll get the next one!",
        "It's okay! Bugs are just part of training!",
        "Ahh, I would've picked that too... let's debug it together!",
      ],
    },
    cards: [
      { front: 'Binary Numbers', back: 'Base 2. Place values: …16 8 4 2 1\n1011₂ = 8 + 2 + 1 = 11', deep: 'n bits can represent 2ⁿ different values. 8 bits (a byte) gives 256 values: 0 to 255.' },
      { front: 'Big-O Notation', back: 'How runtime grows with input size n.\nO(1) < O(log n) < O(n) < O(n log n) < O(n²)', deep: 'Binary search is O(log n) because it halves the search space each step. A loop inside a loop over n items is O(n²).' },
      { front: 'Boolean Logic', back: 'AND: both true · OR: at least one true · NOT: flips', deep: "De Morgan's laws: NOT (A AND B) = (NOT A) OR (NOT B), and NOT (A OR B) = (NOT A) AND (NOT B)." },
      { front: 'Loops & Iteration', back: 'A loop repeats a block. Track the counter carefully.', deep: 'range(1, 5) in Python produces 1, 2, 3, 4. The stop value is excluded. Forgetting this causes off-by-one errors.' },
      { front: 'Recursion', back: 'A function that calls itself.\nNeeds a base case + a recursive case.', deep: 'factorial(n) = n × factorial(n − 1), with base case factorial(0) = 1. Without a base case it recurses forever and overflows the call stack.' },
      { front: 'Stacks & Queues', back: 'Stack = LIFO (last in, first out)\nQueue = FIFO (first in, first out)', deep: 'A stack is like a pile of plates; the call stack and undo history use one. A queue is like a lunch line; print jobs and breadth-first search use one.' },
    ],
    quiz: [
      { q: 'What is the binary number 1101₂ in decimal?', options: ['11', '13', '15', '9'], answer: 1, explain: '8 + 4 + 0 + 1 = 13! Each place doubles: 1, 2, 4, 8. Count them like laps!' },
      { q: 'What is the worst-case time complexity of binary search on a sorted list of n items?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 2, explain: 'Each step cuts the list in half, so it only needs about log₂ n steps. Super speedy, like a sprint!' },
      { q: 'You push 1, then 2, then 3 onto a stack. What does pop() return?', options: ['1', '2', '3', 'Nothing, the stack is full'], answer: 2, explain: 'Stacks are LIFO: last in, first out! 3 went on last, so 3 comes off first. Like a pile of gym mats!' },
      { q: 'Which expression is equivalent to NOT (A AND B)?', options: ['(NOT A) AND (NOT B)', '(NOT A) OR (NOT B)', 'A OR B', 'NOT A'], answer: 1, explain: "De Morgan's law! Flip each part AND swap AND to OR. Two moves, like a cartwheel into a handspring!" },
      { q: 'What is printed?', code: 'total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)', options: ['15', '10', '4', '5'], answer: 1, explain: 'range(1, 5) runs 1, 2, 3, 4. It stops BEFORE 5! 1 + 2 + 3 + 4 = 10. Off-by-one trap dodged!' },
      { q: 'A recursive function has no base case. What happens when you call it?', options: ['It returns 0', 'It runs once and stops', 'It recurses until the call stack overflows', 'The compiler adds a base case automatically'], answer: 2, explain: 'With no finish line, the relay never ends! Each call stacks on top until the program crashes with a stack overflow.' },
      { q: 'How many different values can 8 bits represent?', options: ['8', '16', '255', '256'], answer: 3, explain: '2⁸ = 256 values, from 0 to 255. 255 is the biggest number, but there are 256 values counting zero. Tricky!' },
      { q: 'What is the time complexity of this code?', code: 'for i in range(n):\n    for j in range(n):\n        print(i, j)', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(2n)'], answer: 1, explain: 'The inner loop runs n times for each of the n outer laps: n × n = n². That is a lot of laps!' },
    ],
  },

  /* ───────────────────────────── 05 ITSUKI ───────────────────────────── */
  {
    id: 'itsuki',
    no: '05',
    name: 'Itsuki Nakano',
    first: 'Itsuki',
    kanji: '五月',
    subj: 'sci',
    topic: 'Biology · Physics',
    base: 56,
    total: 148,
    color: '#EF4444',
    ink: '#991B1B',
    onAccent: '#FFFFFF',
    motif: 'Star hairpins',
    role: 'The youngest. Future teacher.',
    persona: 'Formal, diligent aspiring teacher. Needs meat bun and curry energy to unlock deep notes.',
    item: { name: "Itsuki's Curry Bun", icon: 'Sandwich', type: 'fifty', desc: 'Energy boost. Two wrong answers are eliminated.' },
    lines: {
      idle: [
        'Good day. Please take out your notebook. We shall begin.',
        'I intend to become a teacher, so I will teach you properly.',
        'I am not hungry. That sound was... the wind.',
      ],
      teaching: [
        'Observe carefully. Science rewards those who are precise.',
        'First, identify the known quantities. Then choose the formula.',
        'Please write the units. A number without units is incomplete.',
      ],
      praising: [
        'Excellent. That is a model answer.',
        'Correct. I am pleased with your progress.',
        'Well done. This calls for a celebratory meat bun.',
      ],
      scolding: [
        'That is incorrect. Please do not be careless.',
        'Hmph. I expected better. Let us review it.',
        'Wrong. ...And I am NOT eating too much, thank you.',
      ],
    },
    cards: [
      { front: "Newton's Second Law", back: 'F = ma\nNet force (N) = mass (kg) × acceleration (m/s²)', deep: '1 newton = 1 kg·m/s². Near Earth, weight W = mg with g ≈ 9.8 m/s², so a 50 kg student weighs about 490 N.' },
      { front: 'Photosynthesis', back: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\nOccurs in chloroplasts.', deep: 'The light-dependent reactions (thylakoids) make ATP and NADPH. The Calvin cycle (stroma) uses them to fix CO₂ into sugar.' },
      { front: 'Mitochondria', back: 'Site of cellular respiration:\nglucose + O₂ → CO₂ + H₂O + ATP', deep: 'Mitochondria have their own DNA, which supports endosymbiotic theory. Aerobic respiration yields roughly 30–32 ATP per glucose.' },
      { front: "Ohm's Law", back: 'V = IR\nVoltage (V) = current (A) × resistance (Ω)', deep: 'In series, R_total = R₁ + R₂. In parallel, 1/R_total = 1/R₁ + 1/R₂. Power P = VI = I²R.' },
      { front: 'DNA Base Pairing', back: 'A pairs with T · G pairs with C\nIn RNA, uracil (U) replaces thymine.', deep: 'A–T forms 2 hydrogen bonds and G–C forms 3, so GC-rich DNA is more heat-stable. The two strands run antiparallel (5′→3′).' },
      { front: 'Kinetic & Potential Energy', back: 'KE = ½mv²\nPE = mgh', deep: 'Without friction, mechanical energy is conserved: a ball dropped from height h hits the ground with speed v = √(2gh), whatever its mass.' },
    ],
    quiz: [
      { q: 'What net force accelerates a 2 kg cart at 3 m/s²?', options: ['1.5 N', '5 N', '6 N', '0.67 N'], answer: 2, explain: 'F = ma = 2 kg × 3 m/s² = 6 N. Note the unit: newtons. Please always write it.' },
      { q: 'In which organelle does photosynthesis occur?', options: ['Chloroplast', 'Mitochondrion', 'Nucleus', 'Ribosome'], answer: 0, explain: 'The chloroplast, which contains chlorophyll. The mitochondrion handles respiration. It is a common trap; do not fall into it.' },
      { q: 'A 2 A current flows through a 5 Ω resistor. What is the voltage across it?', options: ['2.5 V', '7 V', '0.4 V', '10 V'], answer: 3, explain: 'V = IR = 2 A × 5 Ω = 10 V. Simple, like counting meat buns. Two plates of five makes ten.' },
      { q: 'In DNA, adenine (A) pairs with which base?', options: ['Guanine', 'Thymine', 'Cytosine', 'Uracil'], answer: 1, explain: 'A pairs with T, G pairs with C. Uracil appears only in RNA. Please memorize this precisely.' },
      { q: 'Ignoring air resistance, what is the acceleration of a falling object near Earth\'s surface?', options: ['About 9.8 m/s²', 'About 1.6 m/s²', 'It depends on the mass', '0 m/s²'], answer: 0, explain: 'About 9.8 m/s², whatever the mass. 1.6 m/s² is the Moon. Heavier things do not fall faster... unlike my appetite. Ahem.' },
      { q: 'What is the kinetic energy of a 2 kg ball moving at 3 m/s?', options: ['6 J', '9 J', '18 J', '3 J'], answer: 1, explain: 'KE = ½mv² = ½ × 2 × 3² = 9 J. Square the speed before multiplying. 18 J means you forgot the ½.' },
      { q: 'Mitosis in a human body cell produces:', options: ['Four genetically different haploid cells', 'Two genetically identical diploid cells', 'Two haploid gametes', 'One cell with doubled chromosomes'], answer: 1, explain: 'Mitosis makes two identical diploid cells, for growth and repair. Four different haploid cells is meiosis. Do not confuse them.' },
      { q: 'A solution has a pH of 3. It is:', options: ['Strongly basic', 'Neutral', 'Acidic', 'Weakly basic'], answer: 2, explain: 'Below 7 is acidic, 7 is neutral, above 7 is basic. pH 3 is quite acidic, like lemon juice. Not like curry. Curry is perfect.' },
    ],
  },
]

export const FESTIVAL_ROOMS = {
  ichika: 'Drama Club Stage Café',
  nino: 'Pancake & Pastry Stand',
  miku: 'Sengoku Warlord Map Exhibit',
  yotsuba: 'Retro Arcade & Relay Booth',
  itsuki: 'Curry Bun Tutoring Lounge',
}

export const FUUTAROU_IDLE = [
  'Grades are everything. Now study.',
  'I scored 500/500. Your turn to stop being an idiot.',
  'Thirty points in every subject. That is the minimum Mr. Nakano will accept.',
  'Five sisters, five subjects, one tutor. We are graduating together.',
]

export const EGG_ROUNDS = [
  { who: 'ichika', subject: "If x + 3 = 7... I'll memorize it like a script. Scene one, subtract three~", speech: 'Teasing, drawn-out vowels. Calls herself "onee-san".', posture: 'Stretches lazily, then touches her right earlobe out of habit.' },
  { who: 'ichika', subject: '"The angles of a triangle sum to 180 degrees!" How was that delivery? Convincing?', speech: 'Ends sentences with a wink and a "fufu~".', posture: 'Yawns like she slept in. The wig is on crooked.' },
  { who: 'nino', subject: 'It\'s "have eaten", not "have ate". Honestly, are you an idiot?', speech: 'Sharp and blunt, then quietly mumbles "...good job".', posture: 'Crosses her arms and turns away, then peeks back.' },
  { who: 'nino', subject: 'I baked these for the vocab review. NOT for you. "Diligent" means hardworking. Eat.', speech: '"Hmph!" Scolding first, sweetness second.', posture: 'Keeps smoothing two spots in her hair where ribbons would sit.' },
  { who: 'miku', subject: '...Stage 2 of the demographic transition. Death rates drop first.', speech: 'Very quiet, short sentences, long pauses: "...mm."', posture: 'Reaches for headphones around her neck that aren\'t there.' },
  { who: 'miku', subject: 'A superimposed boundary... drawn by outsiders. Like a warlord carving up someone else\'s land.', speech: 'Soft monotone that brightens only when warlords come up.', posture: 'Sips a can of matcha soda and avoids eye contact.' },
  { who: 'yotsuba', subject: 'range(1, 5) stops BEFORE five! Count the laps with me! Shishishi!', speech: 'LOUD and cheerful, always followed by "Let\'s do our best!"', posture: 'Bounces on her toes and gives a big salute.' },
  { who: 'yotsuba', subject: 'A stack is like a pile of gym mats! Last one on is the first one off! Now Pomodoro, GO!', speech: 'Exclamation points everywhere. Never gives up.', posture: 'Tilts her head as if balancing a giant ribbon.' },
  { who: 'itsuki', subject: 'F equals m times a. Please write the units properly: newtons.', speech: 'Formal and polite: "Please...", "I shall...", "Excuse me."', posture: 'Sits perfectly upright, then her stomach growls.' },
  { who: 'itsuki', subject: 'Mitochondria produce ATP. Energy is important. I am NOT eating too much!', speech: 'Proper keigo that cracks into indignation when food comes up.', posture: 'Adjusts a star pin, then bows a little too stiffly.' },
]

export const byId = (id) => SISTERS.find((s) => s.id === id)
export const bySubject = (key) => SISTERS.find((s) => s.subj === key)
