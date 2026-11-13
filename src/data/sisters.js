// The five tutors: identity, theme colours and dialogue lines.
// Lesson content (flashcards, questions, Scrambled Eggs clues) lives in src/data/subjects/.

export const SUBJECTS = [
  { key: 'math', label: 'Mathematics', short: 'Math' },
  { key: 'english', label: 'English', short: 'English' },
  { key: 'geo', label: 'AP Human Geography', short: 'Human Geo' },
  { key: 'cs', label: 'Computer Science', short: 'CS' },
  { key: 'science', label: 'Science', short: 'Science' },
]

export const SISTERS = [
  {
    "id": "ichika",
    "no": "01",
    "name": "Ichika Nakano",
    "first": "Ichika",
    "kanji": "一花",
    "subj": "math",
    "topic": "Algebra · Geometry",
    "base": 39,
    "total": 127,
    "color": "#F59E0B",
    "ink": "#92400E",
    "onAccent": "#1C1917",
    "motif": "Right-ear piercing",
    "role": "The eldest. Actress.",
    "persona": "Playful, teasing big sister. Explains equations like scenes in a script.",
    "lines": {
      "idle": [
        "Onee-san's here~ Shall we run some math lines before my audition?",
        "Want to know a secret? Equations are just scripts with numbers.",
        "Ehehe, don't stare at me. Stare at the problem."
      ],
      "teaching": [
        "Scene one: isolate the variable. Scene two: do the same thing to both sides.",
        "Read it like a line from a script. One beat at a time.",
        "A trick from the director: sketch the shape first, then solve."
      ],
      "praising": [
        "Bravo! That deserves a standing ovation~",
        "Look at you. Onee-san is a little impressed.",
        "Perfect take. No reshoots needed."
      ],
      "scolding": [
        "Cut! Let's run that scene again~",
        "Ara, you flubbed your line. Happens to the best of us.",
        "Mou~ Let me walk you through it, step by step."
      ]
    }
  },
  {
    "id": "nino",
    "no": "02",
    "name": "Nino Nakano",
    "first": "Nino",
    "kanji": "二乃",
    "subj": "english",
    "topic": "Grammar · Vocabulary",
    "base": 43,
    "total": 119,
    "color": "#F43F5E",
    "ink": "#9F1239",
    "onAccent": "#FFFFFF",
    "motif": "Two butterfly ribbons",
    "role": "The second. Cook.",
    "persona": "Sharp, blunt tsundere who warms up on streaks and bakes for perfect scores.",
    "lines": {
      "idle": [
        "What? You actually showed up? Fine. Sit down.",
        "Don't get the wrong idea. I'm only tutoring because there's nothing on TV.",
        "If you're going to waste my time, at least do it quietly."
      ],
      "teaching": [
        "Listen carefully, because I'm only saying this once.",
        "Grammar is like baking. Skip one step and the whole thing collapses.",
        "Subject first. Then the verb has to match it. Got it?"
      ],
      "praising": [
        "...Not bad. Don't let it go to your head.",
        "Hmph. I guess you're not completely hopeless.",
        "Correct. It's not like I'm happy about it or anything."
      ],
      "warm": [
        "You are on a roll... I-I baked something extra, okay? Eat it.",
        "Fine! You are good at this! Are you happy now?!",
        "Keep it up and maybe I will make you a whole cake. Maybe."
      ],
      "scolding": [
        "Are you an idiot?! Read the sentence again!",
        "Wrong! Ugh, honestly. Look here.",
        "That's not even close. Pay attention this time!"
      ]
    }
  },
  {
    "id": "miku",
    "no": "03",
    "name": "Miku Nakano",
    "first": "Miku",
    "kanji": "三玖",
    "subj": "geo",
    "topic": "AP Human Geography",
    "base": 68,
    "total": 162,
    "color": "#6366F1",
    "ink": "#3730A3",
    "onAccent": "#FFFFFF",
    "motif": "Blue headphones",
    "role": "The third. Warlord enthusiast.",
    "persona": "Soft-spoken and earnest. Reads every map like a Sengoku battlefield. Runs on matcha soda.",
    "lines": {
      "idle": [
        "...Mm. You came. Let's study geography together.",
        "Takeda Shingen studied the land before every battle. We will too.",
        "...Do you want some matcha soda? It helps me think."
      ],
      "teaching": [
        "Swift as the wind, quiet as the forest... read the stimulus first, then the question.",
        "Think of it like a battle map. Who lives where, and why they moved.",
        "...On the AP exam, always ask: what scale is this? Local, national, global?"
      ],
      "praising": [
        "...You got it. Like a general who knows the terrain.",
        "Mm. That made me happy.",
        "Correct. You're becoming a strategist."
      ],
      "scolding": [
        "...That one's wrong. It's okay. Even Shingen lost sometimes.",
        "Mm... not quite. Let me explain.",
        "...Don't give up. We retreat, then regroup."
      ]
    }
  },
  {
    "id": "yotsuba",
    "no": "04",
    "name": "Yotsuba Nakano",
    "first": "Yotsuba",
    "kanji": "四葉",
    "subj": "cs",
    "topic": "Computer Science",
    "base": 31,
    "total": 96,
    "color": "#10B981",
    "ink": "#065F46",
    "onAccent": "#FFFFFF",
    "motif": "Green bunny ribbon",
    "role": "The fourth. Athlete.",
    "persona": "Hyper-energetic supporter. Treats code like relay training. Runs Pomodoro stamina timers.",
    "lines": {
      "idle": [
        "Shishishi! Ready to train your brain muscles?!",
        "Let's do our best together! Ganbarou!",
        "I'll be your biggest supporter, no matter what!"
      ],
      "teaching": [
        "Okay, warm-up stretch! Trace the code one line at a time, like counting laps!",
        "A loop is just running laps! Count how many times you go around!",
        "Recursion is like a relay race! Pass the baton until someone hits the finish line!"
      ],
      "praising": [
        "YESSS! Gold medal!! Shishishi!",
        "You did it! I knew you could!",
        "Amazing! Let's run a victory lap!"
      ],
      "scolding": [
        "Waah, so close! Don't give up, we'll get the next one!",
        "It's okay! Bugs are just part of training!",
        "Ahh, I would've picked that too... let's debug it together!"
      ]
    }
  },
  {
    "id": "itsuki",
    "no": "05",
    "name": "Itsuki Nakano",
    "first": "Itsuki",
    "kanji": "五月",
    "subj": "science",
    "topic": "Biology · Physics",
    "base": 56,
    "total": 148,
    "color": "#DC2626",
    "ink": "#991B1B",
    "onAccent": "#FFFFFF",
    "motif": "Star hairpins",
    "role": "The youngest. Future teacher.",
    "persona": "Formal, diligent aspiring teacher. Needs meat bun and curry energy to unlock deep notes.",
    "lines": {
      "idle": [
        "Good day. Please take out your notebook. We shall begin.",
        "I intend to become a teacher, so I will teach you properly.",
        "I am not hungry. That sound was... the wind."
      ],
      "teaching": [
        "Observe carefully. Science rewards those who are precise.",
        "First, identify the known quantities. Then choose the formula.",
        "Please write the units. A number without units is incomplete."
      ],
      "praising": [
        "Excellent. That is a model answer.",
        "Correct. I am pleased with your progress.",
        "Well done. This calls for a celebratory meat bun."
      ],
      "scolding": [
        "That is incorrect. Please do not be careless.",
        "Hmph. I expected better. Let us review it.",
        "Wrong. ...And I am NOT eating too much, thank you."
      ]
    }
  }
]

export const FUUTAROU_IDLE = [
  "Grades are everything. Now study.",
  "I scored 500/500. Your turn to stop being an idiot.",
  "Thirty points in every subject. That is the minimum Mr. Nakano will accept.",
  "Five sisters, five subjects, one tutor. We are graduating together."
]

export const byId = (id) => SISTERS.find((s) => s.id === id)
export const bySubject = (key) => SISTERS.find((s) => s.subj === key)
