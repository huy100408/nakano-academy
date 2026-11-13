// Signature item boosts. Counts live in user_profiles.item_inventory.
export const ITEMS = [
  {
    key: 'ichika_notes',
    sister: 'ichika',
    name: "Ichika's Script Notes",
    short: '50/50',
    icon: 'ScrollText',
    desc: 'Crosses out two wrong answers.',
    line: 'Psst~ I marked up the script for you. It is not these two.',
  },
  {
    key: 'nino_timer',
    sister: 'nino',
    name: "Nino's Kitchen Timer",
    short: 'Shield',
    icon: 'Timer',
    desc: 'Streak Shield: your next wrong answer will not break your streak.',
    line: "Fine, I set the timer. Mess up once and I'll... let it slide. Once!",
  },
  {
    key: 'miku_headphones',
    sister: 'miku',
    name: "Miku's Headphones",
    short: 'Hint',
    icon: 'Headphones',
    desc: 'Reveals a hint before you answer.',
    line: '...Put these on. Listen carefully. Here is a hint.',
  },
  {
    key: 'yotsuba_ribbon',
    sister: 'yotsuba',
    name: "Yotsuba's Ribbon",
    short: '×2 points',
    icon: 'Ribbon',
    desc: 'Doubles the exam points for this question.',
    line: 'Ribbon power, ON! This question counts double! Shishishi!',
  },
  {
    key: 'itsuki_bun',
    sister: 'itsuki',
    name: "Itsuki's Curry Bun",
    short: '+10% approval',
    icon: 'Sandwich',
    desc: "Restores 10% of Mr. Maruo Nakano's approval.",
    line: 'A curry bun for Father? ...Very well. He does appreciate good manners.',
  },
]

export const itemByKey = (k) => ITEMS.find((i) => i.key === k)
export const itemForSister = (id) => ITEMS.find((i) => i.sister === id)
