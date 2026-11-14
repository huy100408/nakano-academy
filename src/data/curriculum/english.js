// Nino Nakano · English Literature & Rhetoric
// Terminology follows the College Board AP English Language and Composition big ideas
// (Rhetorical Situation, Claims and Evidence, Reasoning and Organization, Style) and the
// AP English Literature and Composition big ideas (Character, Setting, Structure, Narration,
// Figurative Language, Literary Argumentation).
// Passages are original or short quotations from public-domain works (pre-1929).
// Lesson ids are permanent: never renumber or reuse one.

export default [
  {
    unit: 1,
    title: 'The Rhetorical Situation',
    lessons: [
      {
        id: '1.1',
        title: 'Speaker, Purpose, Audience, Context, Exigence',
        objective: 'Identify the speaker, purpose, audience, context, and exigence of a text using SPACE.',
        beats: [
          {
            say: `Listen carefully, because I'm only saying this once. Nobody writes anything for no reason. Every text is cooked for a specific person, at a specific moment, to do a specific job. That whole setup is called the rhetorical situation.`,
            board: [
              { type: 'heading', text: 'The rhetorical situation' },
              { type: 'term', term: 'Rhetorical situation', def: 'Who is writing, to whom, why, and under what circumstances. Every choice in a text answers to it.' },
            ],
          },
          {
            say: `Memorize this: SPACE. Speaker, purpose, audience, context, exigence. If you prefer SOAPSTone, fine, it covers the same ground plus subject and tone. Just don't walk into an essay without one of them.`,
            board: [
              { type: 'bullets', items: [
                'S · Speaker: who is writing, and what shapes their view',
                'P · Purpose: what they want the audience to think, feel, or do',
                'A · Audience: who they are writing for, and what that audience values',
                'C · Context: the time, place, and circumstances',
                'E · Exigence: the problem or event that made writing necessary',
              ] },
              { type: 'callout', text: 'SOAPSTone = Speaker, Occasion, Audience, Purpose, Subject, Tone. Same kitchen, different labels.', tone: 'tip' },
            ],
          },
          {
            say: `Exigence is the one people burn. It is not the topic and it is not the goal. It is the spark, the thing that happened that made the writer say, I have to respond to this right now. Purpose is what they hope to achieve once they do.`,
            board: [
              { type: 'term', term: 'Exigence', def: 'The problem, event, or need that prompts the text. The "why now?"' },
              { type: 'callout', text: 'Lincoln, November 1863. Exigence: a new cemetery for the soldiers killed at Gettysburg must be dedicated. Purpose: turn a nation’s grief into resolve to finish the work they died for.', tone: 'example' },
            ],
          },
          {
            say: `Here's why this matters on the exam. The College Board wants you to explain how a writer's choices fit the situation, not just spot devices like a tourist. A joke that works on your sisters fails in front of a principal. Same ingredients, different guests.`,
            board: [
              { type: 'steps', items: ['Situation: who, for whom, why now', 'Choices: appeals, diction, structure', 'Effect on that audience'] },
              { type: 'callout', text: 'Never analyze a device without saying who it is aimed at and why.', tone: 'warn' },
            ],
          },
          {
            say: `Now prove you were listening. Read the scenario on the board. Each answer is a different piece of SPACE, and only one of them is the exigence. Don't you dare pick the purpose.`,
            board: [
              { type: 'callout', text: 'Scenario: On Monday a student slips on a wet cafeteria floor. That evening, the principal emails every parent to explain the new floor-mat policy and reassure them the school is safe.', tone: 'example' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: `What is the EXIGENCE of the principal's email?`,
                options: ['The principal', 'Every parent at the school', 'A student slipping on the wet cafeteria floor', 'Reassuring parents that the school is safe'],
                answer: 2,
              },
            },
            check: {
              prompt: `Pick the exigence of the principal's email.`,
              expect: { choice: 2 },
              hint: `Exigence is the event that made the email necessary. Ask yourself what happened on Monday.`,
              praise: `Hmph. The slip on the floor. That's the spark, and everything else is the response. Fine, you get it.`,
            },
          },
        ],
      },
      {
        id: '1.2',
        title: 'Ethos: Earning the Right to Be Heard',
        objective: 'Identify how a writer builds credibility (ethos) and explain why it matters to the audience.',
        beats: [
          {
            say: `Would you take a cake recipe from someone who burns toast? No. Ethos is that same instinct. It's the audience asking, why should I trust you, and the writer answering before they even ask.`,
            board: [
              { type: 'heading', text: 'Ethos: credibility' },
              { type: 'term', term: 'Ethos', def: 'An appeal based on the writer’s character and credibility: expertise, experience, good judgment, and shared values.' },
            ],
          },
          {
            say: `There are a few ways to earn it. Show expertise or firsthand experience. Show that you share the audience's values. Show you're fair by admitting what the other side gets right. And never, ever sound like you're bluffing.`,
            board: [
              { type: 'bullets', items: [
                'Expertise: "As a nurse for twenty years..."',
                'Experience: "I have stood in that line myself."',
                'Shared values: "Like you, I want this town to be safe."',
                'Fairness: admitting a reasonable objection',
              ] },
            ],
          },
          {
            say: `Ethos isn't only in the words. It's also in who the speaker already is. Lincoln walked onto that platform at Gettysburg already the President, and his speech ran about two minutes. A stranger would have to spend lines earning the trust his office had already bought him.`,
            board: [
              { type: 'term', term: 'Situated ethos', def: 'Credibility the speaker brings in: title, reputation, history with the audience.' },
              { type: 'term', term: 'Invented ethos', def: 'Credibility the writer builds inside the text through tone, knowledge, and fairness.' },
            ],
          },
          {
            say: `Your turn. Here's me arguing that we need a new oven, and of course I used more than one appeal. Find the exact clause where I tell you why you should trust me, and click it.`,
            board: [{ type: 'heading', text: 'Find the ethos' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'As the one who has cooked every dinner in this house for three years,', tag: 'ethos', note: 'Ethos through experience: she establishes her expertise before she makes her claim.' },
                  { text: 'I am telling you the old oven has to go.', tag: 'claim', note: 'Claim: the position she wants the audience to accept.' },
                  { text: 'Its door no longer seals, and it runs about twenty degrees hotter than the dial says.', tag: 'logos', note: 'Logos: specific, checkable facts offered as reasons.' },
                  { text: 'Do you really want Yotsuba’s birthday cake to come out as charcoal?', tag: 'rhetorical-question', note: 'Rhetorical question with a pathos edge: it makes the audience picture the loss.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause where the speaker builds her credibility.',
              expect: { picked: 'ethos' },
              hint: `Look for the part about who she is, not what the oven does. What has she done that makes her worth listening to?`,
              praise: `Correct. Three years without a burnt dinner. That's not bragging, that's ethos. And it's true, by the way.`,
            },
          },
        ],
      },
      {
        id: '1.3',
        title: 'Pathos and Logos',
        objective: 'Distinguish appeals to emotion and values (pathos) from appeals to reason and evidence (logos), and explain the effect of each.',
        beats: [
          {
            say: `Pathos is the appeal to the audience's emotions and values. Done well, it makes people care. Done badly, it's syrup poured over a burnt pancake, and the audience can taste the manipulation.`,
            board: [
              { type: 'heading', text: 'Pathos' },
              { type: 'term', term: 'Pathos', def: 'An appeal to the audience’s emotions, values, and sense of identity.' },
              { type: 'bullets', items: ['Vivid anecdotes and images', 'Charged diction: "abandoned," "home"', 'Shared hopes and fears'] },
            ],
          },
          {
            say: `Logos is the appeal to reason. Facts, statistics, cause and effect, examples, if this, then that. It's the recipe itself: measured, testable, and it either works or it doesn't.`,
            board: [
              { type: 'term', term: 'Logos', def: 'An appeal to logic: evidence, data, examples, and clear reasoning.' },
              { type: 'bullets', items: ['Statistics and facts', 'Cause → effect', 'Logical comparison and analogy'] },
            ],
          },
          {
            say: `Here's the mistake I see constantly. Students write, the author uses pathos, and stop. Useless! Tell me which emotion, aimed at which audience, and what it pushes them to do. Naming the spice is not the same as tasting the dish.`,
            board: [
              { type: 'callout', text: 'Weak: "The author uses pathos." Strong: "By picturing the empty dinner table, the writer makes her sisters feel the loneliness they are choosing."', tone: 'warn' },
            ],
          },
          {
            say: `Now, here's me trying to stop my sisters from living on instant noodles. I used every appeal, naturally. Find the one aimed straight at the heart.`,
            board: [{ type: 'heading', text: 'Find the pathos' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'One cup of instant noodles can carry more than half the sodium you should eat in an entire day.', tag: 'logos', note: 'Logos: a specific fact the audience can check.' },
                  { text: 'Eat them four nights a week, and that salt adds up faster than you think.' },
                  { text: 'Think of the five of us at one table again, instead of alone in our rooms with plastic cups.', tag: 'pathos', note: 'Pathos: an image of togetherness against loneliness. It targets what the sisters value, not what they know.' },
                  { text: 'I have fed this family for years, so believe me when I say you can do better.', tag: 'ethos', note: 'Ethos: she leans on her experience as the family cook.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause that appeals to emotion.',
              expect: { picked: 'pathos' },
              hint: `Skip the numbers. Which clause makes you picture something and feel it?`,
              praise: `Right. Five of us at one table. It worked on Miku, at least. Don't tell her I said that.`,
            },
          },
        ],
      },
      {
        id: '1.4',
        title: 'Rhetorical Choices: Fitting the Audience',
        objective: 'Explain how a writer selects appeals and strategies to fit a specific audience and purpose.',
        beats: [
          {
            say: `Ethos, pathos, logos. Congratulations, you know the ingredients. Now the real skill is choosing which ones to serve to which guest. A rhetorical choice is any decision a writer makes because of the situation.`,
            board: [
              { type: 'heading', text: 'Rhetorical choices' },
              { type: 'term', term: 'Rhetorical choice', def: 'Any decision a writer makes (appeal, evidence, word, order, tone) in response to the rhetorical situation.' },
            ],
          },
          {
            say: `Start with the audience. What do they already believe? What do they value? Are they friendly, neutral, or hostile? A skeptical audience usually wants proof. A friendly one wants to be moved to act.`,
            board: [
              { type: 'bullets', items: [
                'Skeptical or hostile → concede, lead with evidence',
                'Neutral → clear reasons, credible sources',
                'Friendly → shared values, a call to action',
              ] },
            ],
          },
          {
            say: `Writers also choose order. Some save the strongest point for last so it lingers. Others open with a story to earn attention before the numbers. Neither is automatically right. What matters is whether you can explain why the choice fits.`,
            board: [
              { type: 'steps', items: ['Name the choice', 'Connect it to audience or purpose', 'Explain the effect'] },
              { type: 'callout', text: 'Template: "By [choice], the writer [effect] in order to [purpose] for [audience]."', tone: 'tip' },
            ],
          },
          {
            say: `Here's my speech asking the student council to fund the cooking club. The council is stingy and counting every yen. Click the choice I made specifically for people like that.`,
            board: [{ type: 'heading', text: 'Who is this line for?' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Members of the council, I know you have twelve requests and one budget,', tag: 'ethos', note: 'Ethos through goodwill: she shows she understands the council’s pressure, which makes her seem fair.' },
                  { text: 'so picture a first-year eating convenience-store bread alone every lunch.', tag: 'pathos', note: 'Pathos: a lonely image meant to make the council care.' },
                  { text: 'Our club asks for 12,000 yen a month and serves 120 meals: 100 yen a meal.', tag: 'logos', note: 'Logos: a cost-per-meal figure aimed squarely at a money-conscious audience.' },
                  { text: 'Is there a cheaper lesson this school will buy all year?', tag: 'rhetorical-question', note: 'Rhetorical question: it lets the council reach her conclusion themselves.' },
                ],
              },
            },
            check: {
              prompt: 'The council is skeptical about money. Click the clause built for that concern.',
              expect: { picked: 'logos' },
              hint: `A skeptical treasurer wants numbers, not feelings. Find the arithmetic.`,
              praise: `Exactly. A hundred yen a meal. Nobody argues with arithmetic. Well done.`,
            },
          },
        ],
      },
    ],
  },

  {
    unit: 2,
    title: 'Literary Devices',
    lessons: [
      {
        id: '2.1',
        title: 'Metaphor, Simile, and Personification',
        objective: 'Identify metaphor, simile, and personification and explain what each comparison suggests.',
        beats: [
          {
            say: `Figurative language means words doing more than their dictionary definitions. You compare one thing to another so the reader understands it faster and feels it harder. Like salt: a little, and everything tastes more like itself.`,
            board: [
              { type: 'heading', text: 'Figurative language' },
              { type: 'callout', text: 'Literal: "The kitchen was busy." Figurative: "The kitchen was a battlefield."', tone: 'example' },
            ],
          },
          {
            say: `A simile compares using like or as. A metaphor skips the like and says one thing is the other, which makes it bolder. Shakespeare didn't write that the world is like a stage. He wrote, all the world's a stage. Feel the difference.`,
            board: [
              { type: 'term', term: 'Simile', def: 'A comparison using "like" or "as": "my Luve is like a red, red rose" (Burns).' },
              { type: 'term', term: 'Metaphor', def: 'A direct comparison that says one thing IS another: "All the world’s a stage" (Shakespeare, As You Like It).' },
            ],
          },
          {
            say: `Personification gives human qualities to something that isn't human. Emily Dickinson wrote that Death kindly stopped for her, as if Death were a polite gentleman with a carriage. It makes something terrifying feel strangely calm.`,
            board: [
              { type: 'term', term: 'Personification', def: 'Giving human actions, feelings, or traits to a non-human thing: "Because I could not stop for Death – / He kindly stopped for me" (Dickinson).' },
            ],
          },
          {
            say: `And don't stop at naming it! The exam wants to know what the comparison suggests. If the kitchen is a battlefield, then the cooks are soldiers and dinner is a war. Unpack the comparison like groceries.`,
            board: [
              { type: 'steps', items: ['Spot the comparison', 'Name the two things compared', 'Which traits transfer?', 'Why does it matter here?'] },
            ],
          },
          {
            say: `Here's a scene from our kitchen. Almost every clause has a device, so don't guess. Click the one where an object behaves like a person.`,
            board: [{ type: 'heading', text: 'Find the personification' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'By six o’clock the kitchen was a battlefield,', tag: 'metaphor', note: 'Metaphor: the kitchen IS a battlefield, suggesting chaos, danger, and shouted orders.' },
                  { text: 'flour drifting through the air like snow,', tag: 'simile', note: 'Simile with "like": soft, white, and everywhere.' },
                  { text: 'the kettle screaming for someone to save it,', tag: 'personification', note: 'Personification: a kettle can whistle, but only a person screams to be rescued.' },
                  { text: 'and Nino at the center of it all, sleeves rolled, giving orders.', tag: 'imagery', note: 'Visual imagery: a concrete picture of the commander of this battlefield.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause that uses personification.',
              expect: { picked: 'personification' },
              hint: `Which thing in the kitchen is doing something only a person would do?`,
              praise: `Yes, the kettle. Screaming to be rescued, just like Itsuki when dinner is late. Not bad.`,
            },
          },
        ],
      },
      {
        id: '2.2',
        title: 'Irony: Verbal, Situational, Dramatic',
        objective: 'Distinguish verbal, situational, and dramatic irony and explain what each reveals.',
        beats: [
          {
            say: `Irony is a gap between what's expected and what's real. There are three kinds, and you will mix them up if you're lazy, so pay attention. Verbal, situational, and dramatic.`,
            board: [
              { type: 'heading', text: 'Irony = a gap' },
              { type: 'bullets', items: [
                'Verbal: saying the opposite of what you mean',
                'Situational: the outcome reverses what was expected',
                'Dramatic: the audience knows what a character does not',
              ] },
            ],
          },
          {
            say: `Verbal irony is saying one thing and meaning another. In Julius Caesar, Mark Antony keeps calling Brutus an honourable man, right after Brutus helped murder Caesar. Each time he repeats it, the crowd hears the opposite more clearly. Sarcasm is its crude, bitter cousin.`,
            board: [
              { type: 'term', term: 'Verbal irony', def: 'A speaker says one thing and means another. Antony: "Brutus is an honourable man."' },
            ],
          },
          {
            say: `Situational irony is when the outcome flips what everyone expected. Dramatic irony is when we in the audience know something a character doesn't. In Romeo and Juliet, we know Juliet only took a sleeping potion. Romeo doesn't. That gap is why the tomb scene hurts so much.`,
            board: [
              { type: 'term', term: 'Situational irony', def: 'The result contradicts expectations: the fire station burns down.' },
              { type: 'term', term: 'Dramatic irony', def: 'The audience knows what a character does not: Romeo believes Juliet is dead; we know she is only drugged.' },
            ],
          },
          {
            say: `Irony is never just a trick. Ask what the gap reveals. Antony's irony turns a crowd against the conspirators. Situational irony often exposes pride or the limits of planning. Dramatic irony builds dread, because we watch characters walk toward something they can't see.`,
            board: [
              { type: 'callout', text: 'Exam move: name the gap, then name what it exposes (hypocrisy, pride, fate, tension).', tone: 'tip' },
            ],
          },
          {
            say: `Now, a story from the school baking contest. Click the exact moment the outcome flips the expectation. Careful, there's a simile in there pretending to be clever.`,
            board: [{ type: 'heading', text: 'Find the irony' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'The contest judge spent the whole morning warning every team about burnt crusts.' },
                  { text: '"Watch your oven like a hawk," she told us,', tag: 'simile', note: 'Simile: "like a hawk." It sets her up as the expert who would never make this mistake.' },
                  { text: 'then pulled her own demonstration tart from the oven, burnt black.', tag: 'irony', note: 'Situational irony: the expert on avoiding burnt crusts burns her own. The gap exposes her overconfidence.' },
                  { text: 'The smoke alarm offered its own review.', tag: 'personification', note: 'Personification: a smoke alarm "reviewing" the tart like a judge.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause that creates situational irony.',
              expect: { picked: 'irony' },
              hint: `Who spent all morning warning everyone? Now look at what happens to her own tart.`,
              praise: `Right. The judge who preached about burnt crusts burnt her own. I enjoyed that more than I should have.`,
            },
          },
        ],
      },
      {
        id: '2.3',
        title: 'Imagery and Symbolism',
        objective: 'Analyze how sensory imagery creates mood and how a symbol carries meaning beyond itself.',
        beats: [
          {
            say: `Imagery is language that hits the senses. Not just sight. Sound, smell, taste, touch. A good writer makes you smell the bread before you've even read the word bread.`,
            board: [
              { type: 'heading', text: 'Imagery: the senses' },
              { type: 'bullets', items: ['Visual (sight)', 'Auditory (sound)', 'Olfactory (smell)', 'Gustatory (taste)', 'Tactile (touch)'] },
            ],
          },
          {
            say: `Look at this paragraph about a bakery. Click each tagged clause and see which sense it's working on. Notice that nobody wrote, the bakery was cozy. They didn't have to.`,
            board: [
              { type: 'callout', text: 'Imagery builds mood without announcing it: show the reader, don’t tell them.', tone: 'tip' },
            ],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'The bakery door opened with a small brass jingle,', tag: 'imagery', note: 'Auditory imagery: a bright little sound that welcomes you in.' },
                  { text: 'and warm air rolled out smelling of butter and caramel.', tag: 'imagery', note: 'Olfactory and tactile imagery: warmth and smell at once.' },
                  { text: 'Behind the glass, the cream puffs sat in neat golden rows,', tag: 'imagery', note: 'Visual imagery: order and color suggest care and skill.' },
                  { text: 'and the first bite cracked, then melted.', tag: 'imagery', note: 'Gustatory and tactile imagery: texture you can almost feel.' },
                ],
              },
            },
          },
          {
            say: `A symbol is something concrete that stands for something abstract, and it usually returns, gathering meaning. Hester Prynne's scarlet letter begins as a mark of shame. Later in Hawthorne's novel, some townspeople say the A stands for Able. Same object, deeper meaning.`,
            board: [
              { type: 'term', term: 'Symbol', def: 'A concrete object, image, or action that represents an abstract idea, often recurring through a text.' },
              { type: 'callout', text: 'The scarlet A (Hawthorne, 1850): shame → identity → for some, "Able."', tone: 'example' },
            ],
          },
          {
            say: `How do you know something is a symbol and not just furniture? It repeats, it shows up at turning points, and the text gives it more attention than its practical job needs. If a writer keeps coming back to the same cake, it isn't about the cake.`,
            board: [
              { type: 'bullets', items: ['It recurs', 'It appears at turning points', 'It gets more attention than its literal job needs'] },
              { type: 'callout', text: 'Don’t hunt for symbols in everything. Sometimes a curtain is just blue.', tone: 'warn' },
            ],
          },
          {
            say: `Read the passage on the board. Then tell me what the slices stand for. And don't you dare say they stand for cake.`,
            board: [
              { type: 'callout', text: 'Every birthday, the five sisters split one cake into five equal slices. The year Nino moved out, she still baked it, and still cut five slices, alone in her new apartment.', tone: 'example' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'What do the five slices most likely symbolize?',
                options: ['Nino’s skill as a baker', 'The sisters’ bond, which she keeps even apart', 'Her fear of wasting food', 'How expensive the cake was'],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose what the five slices symbolize.',
              expect: { choice: 1 },
              hint: `Why cut five slices when only one person is eating? Who are the other four for?`,
              praise: `Yes. The bond. Even apart, she cuts five. Ugh, why is this making me emotional. Next lesson.`,
            },
          },
        ],
      },
      {
        id: '2.4',
        title: 'Sound Devices and Meter',
        objective: 'Identify alliteration, assonance, and onomatopoeia, and recognize common meters such as iambic pentameter.',
        beats: [
          {
            say: `Poems are meant to be heard, so writers pick words for their sound, not just their meaning. Alliteration repeats the first consonant sound. Assonance repeats vowel sounds. Onomatopoeia is a word that sounds like what it means, like hiss or sizzle.`,
            board: [
              { type: 'heading', text: 'Sound devices' },
              { type: 'term', term: 'Alliteration', def: 'Repeated initial consonant sounds: "weak and weary" (Poe, The Raven).' },
              { type: 'bullets', items: ['Assonance: repeated vowel sounds ("slow, low, rolling")', 'Consonance: repeated consonant sounds ("pick the black sock")', 'Onomatopoeia: sizzle, hiss, thump'] },
            ],
          },
          {
            say: `Listen to these lines I wrote while making jam. Click the tagged parts and say them out loud. Yes, out loud, I don't care who hears you. Sound should match meaning: soft sounds for soft things, harsh sounds for violence.`,
            board: [
              { type: 'callout', text: 'Read it aloud. Your ears catch what your eyes miss.', tone: 'tip' },
            ],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Butter, brown sugar, and a bowl of berries;', tag: 'alliteration', note: 'Alliteration: the repeated b sound is round and soft, like the ingredients.' },
                  { text: 'the pot starts to hiss and sputter and pop,', tag: 'imagery', note: 'Onomatopoeia and auditory imagery: "hiss" and "pop" sound like the jam itself.' },
                  { text: 'and the heat rolls slowly over the low stove.', tag: 'diction', note: 'Assonance through word choice: the long o in "rolls," "slowly," "low," and "stove" stretches the line out, like the heat.' },
                ],
              },
            },
          },
          {
            say: `Now meter. Meter is the pattern of stressed and unstressed syllables in a line of poetry. Each unit of the pattern is called a foot. The most common foot in English is the iamb: da DUM. Unstressed, then stressed, like a heartbeat.`,
            board: [
              { type: 'term', term: 'Meter', def: 'The regular pattern of stressed and unstressed syllables in a line of poetry.' },
              { type: 'bullets', items: ['Iamb: da-DUM (be-LOW)', 'Trochee: DUM-da (GAR-den)', 'Anapest: da-da-DUM (in-ter-RUPT)', 'Dactyl: DUM-da-da (BEAU-ti-ful)'] },
            ],
          },
          {
            say: `Then count the feet. Five iambs in a line is iambic pentameter, ten syllables, and Shakespeare's favorite. Shall I compare thee to a summer's day. Da DUM, da DUM, da DUM, da DUM, da DUM. Unrhymed iambic pentameter is called blank verse.`,
            board: [
              { type: 'formula', text: 'shall I | com-PARE | thee TO | a SUM- | -mer’s DAY  = 5 iambs' },
              { type: 'bullets', items: ['Tetrameter = 4 feet', 'Pentameter = 5 feet', 'Hexameter = 6 feet'] },
              { type: 'callout', text: 'Blank verse = unrhymed iambic pentameter. Free verse = no regular meter.', tone: 'tip' },
            ],
          },
          {
            say: `Final test. Read the line on the board out loud and tap the beat with your finger. Count the syllables, find the stresses, then choose the meter. Don't guess. Count.`,
            board: [
              { type: 'callout', text: '"The butter melts, the sugar starts to burn."', tone: 'example' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'What is the meter of this line?',
                options: ['Iambic pentameter', 'Trochaic tetrameter', 'Anapestic trimeter', 'Free verse'],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the meter of the line.',
              expect: { choice: 0 },
              hint: `There are ten syllables. Does the stress land on the first syllable or the second? the BUT, ter MELTS.`,
              praise: `Iambic pentameter. Five da DUMs, just like Shakespeare. Fine, I'm a little impressed.`,
            },
          },
        ],
      },
    ],
  },

  {
    unit: 3,
    title: 'Syntax & Diction',
    lessons: [
      {
        id: '3.1',
        title: 'Diction and Connotation',
        objective: 'Explain how a writer’s word choice and its connotations shape meaning and attitude.',
        beats: [
          {
            say: `Diction is word choice. That's it. But every word comes with baggage. Its denotation is the dictionary meaning. Its connotation is the feeling it drags along with it.`,
            board: [
              { type: 'heading', text: 'Diction = word choice' },
              { type: 'term', term: 'Denotation', def: 'The literal, dictionary meaning of a word.' },
              { type: 'term', term: 'Connotation', def: 'The emotional associations a word carries.' },
            ],
          },
          {
            say: `Thrifty, frugal, cheap, stingy. Same denotation: careful with money. But call me thrifty and I'll smile. Call me stingy and you're eating instant noodles tonight. Writers pick the word that carries the attitude they want.`,
            board: [
              { type: 'steps', items: ['thrifty (+)', 'frugal (neutral)', 'cheap (−)', 'stingy (−−)'] },
              { type: 'callout', text: 'Same meaning, different temperature.', tone: 'tip' },
            ],
          },
          {
            say: `Diction also has levels. Formal or informal. Concrete or abstract. Plain or ornate. A eulogy and a text message shop in completely different pantries. When the diction shifts suddenly inside a text, that's a signal. Something changed, and you need to say what.`,
            board: [
              { type: 'bullets', items: [
                'Formal ↔ informal (colloquial, slang)',
                'Concrete (oven, flour) ↔ abstract (hope, duty)',
                'Plain and blunt ↔ elevated and ornate',
              ] },
              { type: 'callout', text: 'A sudden shift in diction often marks a shift in tone or purpose.', tone: 'warn' },
            ],
          },
          {
            say: `Here's a review of a café. Most of it is fair. But one clause uses a single loaded word to turn the owner into a villain. Find it.`,
            board: [{ type: 'heading', text: 'Find the loaded word' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'The new café near the station is small and quiet.' },
                  { text: 'Its owner hoards every leftover pastry at closing time,', tag: 'diction', note: 'Diction: "hoards" instead of "keeps" or "saves" connotes greed and secrecy. The fact is neutral; the word is not.' },
                  { text: 'and the cream puffs look like they lost a fight on the way to the plate.', tag: 'simile', note: 'Simile: comic and insulting, but it works by comparison, not by one loaded word.' },
                  { text: 'Still, the coffee is hot, and the windows catch the morning sun.', tag: 'imagery', note: 'Imagery: warm, visual details that soften the review.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause where one word’s connotation does the attacking.',
              expect: { picked: 'diction' },
              hint: `Look at the verbs. Saving and hoarding mean the same thing on paper. Which one sounds greedy?`,
              praise: `Hoards. One word, and the owner is a dragon sitting on a pile of pastries. That's diction. Good.`,
            },
          },
        ],
      },
      {
        id: '3.2',
        title: 'Tone vs. Mood',
        objective: 'Distinguish a writer’s tone from a reader’s mood and describe each with precise words.',
        beats: [
          {
            say: `People confuse these constantly, and it drives me crazy. Tone is the writer's attitude toward the subject or audience. Mood is the feeling the reader gets. Tone is the cook's attitude. Mood is how the dinner guest feels.`,
            board: [
              { type: 'heading', text: 'Tone ≠ mood' },
              { type: 'term', term: 'Tone', def: 'The writer’s or speaker’s attitude toward the subject or audience.' },
              { type: 'term', term: 'Mood', def: 'The atmosphere or feeling a text creates in the reader.' },
            ],
          },
          {
            say: `And please, stop writing that the tone is happy or sad. That's a child's vocabulary. Use precise words. Sardonic. Wistful. Reverent. Indignant. Condescending. Pick the one that fits, then prove it with diction.`,
            board: [
              { type: 'bullets', items: [
                'Instead of "happy": elated, playful, admiring, reverent',
                'Instead of "sad": wistful, mournful, resigned, bitter',
                'Instead of "mad": indignant, sardonic, scornful, exasperated',
              ] },
            ],
          },
          {
            say: `Here's me writing about Fuutarou's curry. Click the tagged parts. My tone starts mocking and then it shifts. Tone can shift, and when it does, the exam wants you to notice where and why.`,
            board: [
              { type: 'callout', text: 'Tone shifts often hinge on a "but," a "yet," a short sentence, or a change in diction.', tone: 'tip' },
            ],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Fuutarou’s curry arrived at the table' },
                  { text: 'with all the confidence of a man who had never tasted it.', tag: 'irony', note: 'Verbal irony: "confidence" is mockery. Tone: sardonic.' },
                  { text: 'It was, I suppose, technically food.', tag: 'diction', note: 'Diction: "I suppose" and "technically" are grudging and dry. Tone: condescending.' },
                  { text: 'I ate every bite anyway.', tag: 'syntax', note: 'Syntax: a short, flat sentence after the jokes. The tone shifts to reluctant affection.' },
                ],
              },
            },
          },
          {
            say: `Mood is built from imagery, setting, pacing, and sound. Darkness, silence, and short sentences build suspense. Sunlight and long, loose sentences build calm. The writer controls it, but it lives in the reader.`,
            board: [
              { type: 'bullets', items: ['Imagery and setting', 'Pacing: short sentences speed up, long ones slow down', 'Sound: harsh or soft'] },
            ],
          },
          {
            say: `Last one. Read the passage on the board. I'm not asking about the writer's attitude this time. I'm asking how it makes you, the reader, feel.`,
            board: [
              { type: 'callout', text: '"The kitchen was dark. Upstairs, a floorboard creaked. Then another. Closer."', tone: 'example' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Which word best names the MOOD of this passage?',
                options: ['Suspenseful', 'Sarcastic', 'Admiring', 'Nostalgic'],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the mood of the passage.',
              expect: { choice: 0 },
              hint: `Sarcastic and admiring are attitudes a writer holds. What do the dark, the creak, and the word closer do to your nerves?`,
              praise: `Suspenseful. Short sentences, darkness, something getting closer. You felt it, didn't you? Good.`,
            },
          },
        ],
      },
      {
        id: '3.3',
        title: 'Sentence Structures for Effect',
        objective: 'Identify periodic and cumulative sentences, parallelism, anaphora, and antithesis, and explain their effects.',
        beats: [
          {
            say: `Syntax is how words are arranged into sentences, and where the main clause sits changes everything. A periodic sentence holds the main point until the very end, building suspense. A cumulative sentence says the point first, then piles on details.`,
            board: [
              { type: 'heading', text: 'Syntax = arrangement' },
              { type: 'term', term: 'Periodic sentence', def: 'Main clause delayed to the end: "Despite the smoke, the cracked crust, and the shrieking alarm, the cake won."' },
              { type: 'term', term: 'Cumulative (loose) sentence', def: 'Main clause first, details after: "The cake won, despite the smoke, the cracked crust, and the shrieking alarm."' },
            ],
          },
          {
            say: `Parallelism means putting related ideas in the same grammatical form. Measure carefully, mix gently, bake patiently. Three verbs, three adverbs, perfect rhythm. Break the pattern and it sounds like a collapsed soufflé.`,
            board: [
              { type: 'term', term: 'Parallelism', def: 'Similar grammatical structure for related ideas: "measure carefully, mix gently, bake patiently."' },
              { type: 'callout', text: 'Faulty: "I like baking, to cook, and when I fry things." Fixed: "I like baking, cooking, and frying."', tone: 'warn' },
            ],
          },
          {
            say: `Anaphora repeats the same words at the start of successive clauses. Lincoln at Gettysburg: we can not dedicate, we can not consecrate, we can not hallow this ground. Each repetition presses harder, like kneading dough.`,
            board: [
              { type: 'term', term: 'Anaphora', def: 'Repetition at the beginning of successive clauses: "we can not dedicate—we can not consecrate—we can not hallow—this ground" (Lincoln).' },
            ],
          },
          {
            say: `Antithesis sets opposites side by side in balanced structure. Dickens opens A Tale of Two Cities with it: it was the best of times, it was the worst of times. Best against worst, in matching clauses. The balance makes the contrast impossible to miss.`,
            board: [
              { type: 'term', term: 'Antithesis', def: 'Contrasting ideas in parallel structure: "It was the best of times, it was the worst of times" (Dickens).' },
              { type: 'callout', text: 'Dickens also uses anaphora there ("it was... it was..."). One sentence can do two jobs; say which effect you mean.', tone: 'tip' },
            ],
          },
          {
            say: `My speech about baking. Each clause leans on a different structure. Find the one that balances two opposites against each other.`,
            board: [{ type: 'heading', text: 'Find the antithesis' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Though the oven was old, the recipe older, and the cook exhausted, the cake rose.', tag: 'syntax', note: 'Periodic sentence: the main clause, "the cake rose," is held back until the end.' },
                  { text: 'We bake when we are tired, we bake when we are sad, we bake when no one says thank you,', tag: 'anaphora', note: 'Anaphora: "we bake when" opens each clause, building insistence.' },
                  { text: 'because a cake can be ruined in a minute but perfected only over years.', tag: 'antithesis', note: 'Antithesis: "ruined in a minute" against "perfected over years," opposite ideas in balanced form.' },
                  { text: 'So measure carefully, mix gently, and bake patiently.', tag: 'parallelism', note: 'Parallelism: three verb-and-adverb pairs in the same form.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause that uses antithesis.',
              expect: { picked: 'antithesis' },
              hint: `Look for two opposite ideas in matching halves. Something happens fast, and something takes forever.`,
              praise: `Ruined in a minute, perfected over years. Opposites, perfectly balanced. Like my cream puffs. Good job.`,
            },
          },
        ],
      },
      {
        id: '3.4',
        title: 'Punctuation for Effect',
        objective: 'Explain how dashes, colons, semicolons, ellipses, and short sentences control emphasis and pacing.',
        beats: [
          {
            say: `Punctuation isn't decoration. It's timing. It tells the reader where to pause, what to stress, and what to connect. Good writers use it the way I use an oven timer: on purpose.`,
            board: [
              { type: 'heading', text: 'Punctuation = timing' },
              { type: 'callout', text: 'Ask of every mark: where does it make me pause, and what does it make me notice?', tone: 'tip' },
            ],
          },
          {
            say: `A dash interrupts. It can drop in a sudden aside, or jolt the reader toward an emphatic ending. A colon is a drumroll. It promises that what follows will explain or reveal what came before.`,
            board: [
              { type: 'term', term: 'Dash (—)', def: 'Interruption, aside, or sudden emphasis: "My sisters—bless them—ate it anyway."' },
              { type: 'term', term: 'Colon (:)', def: 'Anticipation; what follows explains, lists, or reveals: "One thing was missing: sugar."' },
            ],
          },
          {
            say: `A semicolon joins two complete thoughts that belong together, often to balance or contrast them. And a very short sentence after long ones lands like a slammed door. Writers use it to punch. Like this.`,
            board: [
              { type: 'term', term: 'Semicolon (;)', def: 'Links two related independent clauses, often for balance: "Ichika sleeps; Nino cooks."' },
              { type: 'callout', text: 'Long, winding sentences, then a short one. Then silence. Effect: emphasis.', tone: 'example' },
            ],
          },
          {
            say: `Then there's the ellipsis. Three dots for hesitation or a thought trailing off. It's how you sound when you're about to admit something embarrassing... not that I would know. Always name the effect, not just the mark.`,
            board: [
              { type: 'term', term: 'Ellipsis (…)', def: 'Hesitation, omission, or a thought trailing off.' },
              { type: 'callout', text: 'Never write "the author uses a colon." Write what the pause DOES.', tone: 'warn' },
            ],
          },
          {
            say: `Here's my soufflé tragedy. One clause uses punctuation to make you wait, then drops the worst word on you. Find it.`,
            board: [{ type: 'heading', text: 'Find the dramatic pause' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'After ninety minutes of whisking, folding, and waiting,', tag: 'parallelism', note: 'Parallelism: three -ing verbs in a row stretch out the effort.' },
                  { text: 'I opened the oven and found my soufflé exactly as I had feared: flat.', tag: 'syntax', note: 'Colon for effect: the pause makes you wait for one blunt word, so the disappointment lands hard.' },
                  { text: 'It sat in the dish like a pancake that had given up.', tag: 'simile', note: 'Simile: a comic comparison that softens the disaster.' },
                  { text: 'My sisters ate every spoonful anyway.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause where punctuation creates a pause before a dramatic reveal.',
              expect: { picked: 'syntax' },
              hint: `Look for the mark that works like a drumroll. What comes right after it?`,
              praise: `The colon. You wait, and then, flat. One word. Devastating. Okay, that one was well done.`,
            },
          },
        ],
      },
    ],
  },

  {
    unit: 4,
    title: 'Thesis & Claims',
    lessons: [
      {
        id: '4.1',
        title: 'The Defensible Thesis',
        objective: 'Recognize and write a defensible thesis that takes a position and previews a line of reasoning.',
        beats: [
          {
            say: `A thesis is the main claim of your whole essay. One sentence, the thing you're going to prove. Without it, your essay is a pile of ingredients on the counter, and nobody knows what you're making.`,
            board: [
              { type: 'heading', text: 'The thesis' },
              { type: 'term', term: 'Thesis', def: 'The essay’s central, defensible claim: the position every paragraph supports.' },
            ],
          },
          {
            say: `Defensible means two things. A reasonable person could disagree with it, and you can support it with evidence. A fact is not a thesis, because there's nothing to argue. An opinion nobody could ever prove isn't one either.`,
            board: [
              { type: 'bullets', items: [
                'Not a fact: "Lincoln spoke at Gettysburg in 1863."',
                'Not a vague label: "Lincoln uses many rhetorical devices."',
                'Not an unprovable superlative: "It is the greatest speech ever."',
                'Yes: an arguable interpretation you can prove with the text',
              ] },
            ],
          },
          {
            say: `A strong thesis also hints at how you'll prove it. That's your line of reasoning in miniature. On the AP exam, a thesis that just restates the prompt earns nothing. Say how the writer achieves the effect, and why.`,
            board: [
              { type: 'formula', text: 'By [choice(s)], [writer] [does what] in order to [purpose].' },
              { type: 'callout', text: 'For literature, argue about meaning, not plot: "Through X, the author suggests Y about Z."', tone: 'tip' },
            ],
          },
          {
            say: `Here's an introduction one of my sisters wrote about Romeo and Juliet. Tap the tagged sentences. Notice that only one of them actually takes a position someone could argue against.`,
            board: [
              { type: 'callout', text: 'Prompt: Analyze how Shakespeare develops the lovers’ downfall in Romeo and Juliet.', tone: 'example' },
            ],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Romeo and Juliet, written in the 1590s, follows two teenagers from feuding families in Verona.', tag: 'evidence', note: 'Background fact. True, but no one can argue with it, so it cannot be the thesis.' },
                  { text: 'Is it really the stars that kill these lovers?', tag: 'rhetorical-question', note: 'A hook. It raises interest, but a question is not a claim.' },
                  { text: 'Through the play’s relentless haste, Shakespeare suggests that the lovers are undone less by fate than by their own impatience.', tag: 'thesis', note: 'Thesis: arguable, specific, and it previews how the essay will prove it (the haste, the impatience).' },
                ],
              },
            },
          },
          {
            say: `Now choose. Only one of these is a defensible thesis. The others are a fact, a vague label, and an opinion nobody could ever prove. Don't embarrass me.`,
            board: [{ type: 'heading', text: 'Which one can be defended?' }],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Which is a defensible thesis about the Gettysburg Address?',
                options: [
                  'Lincoln gave the Gettysburg Address in 1863 at a new cemetery.',
                  'Lincoln uses many rhetorical devices in his speech.',
                  'By contrasting the soldiers’ sacrifice with the duty of the living, Lincoln turns mourning into a call to finish the war’s work.',
                  'The Gettysburg Address is the greatest speech in history.',
                ],
                answer: 2,
              },
            },
            check: {
              prompt: 'Pick the defensible thesis.',
              expect: { choice: 2 },
              hint: `Throw out the fact, the vague one, and the one nobody could ever prove. What's left makes an arguable claim and says how.`,
              praise: `Correct. It argues something specific and tells me how. That's a thesis with a backbone. Hmph. Good.`,
            },
          },
        ],
      },
      {
        id: '4.2',
        title: 'Building a Line of Reasoning',
        objective: 'Build and trace a line of reasoning in which each claim advances the thesis.',
        beats: [
          {
            say: `A thesis alone is a promise. The line of reasoning is how you keep it. It's the sequence of claims, usually one per body paragraph, that leads the reader step by step to your conclusion.`,
            board: [
              { type: 'heading', text: 'Line of reasoning' },
              { type: 'term', term: 'Line of reasoning', def: 'The logical sequence of claims that work together to support the thesis.' },
            ],
          },
          {
            say: `Each body paragraph should open with a claim, a topic sentence that gives a reason, not a fact. Then evidence. Then commentary that explains how the evidence proves the claim. Claim, evidence, commentary. Every paragraph, like a recipe card.`,
            board: [
              { type: 'steps', items: ['Claim: one reason that supports the thesis', 'Evidence: specific support', 'Commentary: how and why the evidence proves the claim'] },
            ],
          },
          {
            say: `And the claims have to connect. Claim two should build on claim one, not just sit beside it. If I could shuffle your paragraphs and lose nothing, you probably have a list, not a line of reasoning.`,
            board: [
              { type: 'callout', text: 'Shuffle test: if your body paragraphs can be reordered with no loss, they are likely a list, not a line of reasoning.', tone: 'warn' },
              { type: 'callout', text: 'Link claims with logic words: because, therefore, which means, as a result.', tone: 'tip' },
            ],
          },
          {
            say: `Here's a paragraph from an essay arguing that school should start later. Find the sentence that works as this body paragraph's claim, the step that moves the thesis forward. Not the thesis, and not the evidence.`,
            board: [{ type: 'heading', text: 'Find the claim' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Schools should start later, because teenagers’ bodies are built for it and tired students learn less.', tag: 'thesis', note: 'Thesis: the whole essay’s position, with two reasons previewed.' },
                  { text: 'First, a teenager’s body clock genuinely runs late.', tag: 'claim', note: 'Claim: the first reason from the thesis, stated as a point this paragraph will prove.' },
                  { text: 'Sleep researchers have found that melatonin is released later at night during adolescence, and the American Academy of Pediatrics recommends that high schools start no earlier than 8:30 a.m.', tag: 'evidence', note: 'Evidence: specific and credible support for the claim.' },
                  { text: 'So an early bell does not turn teens into morning people; it makes them sit through first period during what their bodies still treat as night.', tag: 'commentary', note: 'Commentary: explains why the evidence proves the claim and points back to the thesis.' },
                ],
              },
            },
            check: {
              prompt: 'Click the claim that opens this body paragraph.',
              expect: { picked: 'claim' },
              hint: `The thesis covers the whole essay. The claim is smaller: one reason. Which sentence gives one reason and then gets proved?`,
              praise: `Yes. Body clocks run late. One reason, then proof, then commentary. That's a line of reasoning, not a pile of facts.`,
            },
          },
        ],
      },
      {
        id: '4.3',
        title: 'Counterarguments and Concessions',
        objective: 'Use concession and rebuttal to address opposing views and strengthen an argument.',
        beats: [
          {
            say: `An argument that ignores the other side is like a cake with no structure. One poke and it collapses. A counterargument is the opposing view, and a smart writer brings it up before the reader can.`,
            board: [
              { type: 'heading', text: 'Facing the other side' },
              { type: 'term', term: 'Counterargument', def: 'An opposing view or objection to the writer’s claim.' },
            ],
          },
          {
            say: `First you concede. You admit what's reasonable about their point, with words like admittedly or granted. Then you rebut. You explain why your claim still holds, with however, yet, or even so. Concede the crumb, keep the cake.`,
            board: [
              { type: 'term', term: 'Concession', def: 'Acknowledging that part of an opposing view is valid.' },
              { type: 'term', term: 'Rebuttal (refutation)', def: 'Explaining why the claim still stands despite the objection.' },
              { type: 'callout', text: 'Concede: "Admittedly..." "Granted..." → Rebut: "However..." "Even so..."', tone: 'tip' },
            ],
          },
          {
            say: `Why bother? Because it builds ethos. You look fair, informed, and confident enough to face objections, and you defuse the reader's doubt before it grows. Just don't build a straw man, a weak, silly version of the other side that's easy to knock down. Readers notice.`,
            board: [
              { type: 'bullets', items: [
                'Builds ethos: you seem fair and informed',
                'Answers the reader’s objections before they harden',
                'Avoid the straw man: represent the other side honestly',
              ] },
            ],
          },
          {
            say: `Here's my argument for keeping phones out of class. Click the clause where I give ground to the other side. Yes, even I give ground sometimes. Don't look so shocked.`,
            board: [{ type: 'heading', text: 'Find the concession' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Phones should stay in lockers during class.', tag: 'claim', note: 'Claim: the writer’s position.' },
                  { text: 'Admittedly, a phone can be a useful tool for looking up a word or checking a schedule.', tag: 'counterargument', note: 'Concession: the writer grants the opposing side’s most reasonable point.' },
                  { text: 'But a dictionary is a poor trade for a device built to pull attention away, buzzing even when it sits face down.', tag: 'logos', note: 'Rebuttal: reasoning that answers the concession and returns to the claim.' },
                  { text: 'Teachers can hand out dictionaries; they cannot hand back lost focus.', tag: 'antithesis', note: 'Antithesis: "can hand out" against "cannot hand back" makes the closing line stick.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause that concedes a point to the opposing side.',
              expect: { picked: 'counterargument' },
              hint: `Find the word that signals admitting something. It usually sounds like admittedly or granted.`,
              praise: `Right. Admittedly, phones can be useful. I gave them that, then took it right back. That's how you win an argument. Ask my sisters.`,
            },
          },
        ],
      },
      {
        id: '4.4',
        title: 'Organization and Transitions',
        objective: 'Choose an organizational pattern and transitions that make the relationships between ideas clear.',
        beats: [
          {
            say: `Organization is the order you serve things in. Appetizer before dessert. A good structure makes your argument feel inevitable. A bad one makes the reader do the work, and readers hate doing your work.`,
            board: [
              { type: 'heading', text: 'Organization' },
              { type: 'bullets', items: ['Order of importance', 'Chronological', 'Cause and effect', 'Problem and solution', 'Compare and contrast'] },
            ],
          },
          {
            say: `Pick the pattern that fits your purpose. Arguing for a policy? Problem, then solution. Explaining how something happened? Cause and effect, or chronological. Building to your best point? Order of importance, so the strongest reason is the last taste in their mouth.`,
            board: [
              { type: 'callout', text: 'Policy argument: problem → causes → solution → answer to objections.', tone: 'example' },
            ],
          },
          {
            say: `Transitions are the joints between ideas, and each one makes a promise. However promises a contrast. Therefore promises a consequence. For example promises an illustration. Use the wrong one and you've lied to your reader.`,
            board: [
              { type: 'bullets', items: [
                'Addition: furthermore, moreover, worse still',
                'Contrast: however, yet, in contrast',
                'Cause and effect: therefore, as a result, consequently',
                'Example: for instance, for example',
                'Concession: admittedly, granted',
              ] },
              { type: 'callout', text: '"However" followed by agreement = a broken promise.', tone: 'warn' },
            ],
          },
          {
            say: `Transitions between paragraphs should carry an idea, not just a word. Instead of writing, another reason is, try something like, cost is only half the problem. That links the paragraph you finished to the one you're starting.`,
            board: [
              { type: 'callout', text: 'Weak: "Another reason is..." Strong: "Cost is only half the problem; the food itself is worse."', tone: 'example' },
            ],
          },
          {
            say: `Final question. Paragraph two showed cafeteria lunches cost more than homemade ones. Paragraph three will show they're also less healthy. Choose the transition whose promise matches.`,
            board: [{ type: 'heading', text: 'Match the promise' }],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Paragraph 2: cafeteria lunch costs more. Paragraph 3: it is also less healthy. Which transition best opens paragraph 3?',
                options: ['However,', 'Worse still,', 'For example,', 'In contrast,'],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose the transition that opens paragraph three.',
              expect: { choice: 1 },
              hint: `Paragraph three piles another problem on top of the first. Which choice adds and escalates, instead of contrasting or giving an example?`,
              praise: `Worse still. It adds and escalates. That's a transition that keeps its promise. Hmph. You're learning.`,
            },
          },
        ],
      },
    ],
  },

  {
    unit: 5,
    title: 'Evidence & Commentary',
    lessons: [
      {
        id: '5.1',
        title: 'Selecting Evidence',
        objective: 'Choose evidence that is relevant, specific, and sufficient to support a claim.',
        beats: [
          {
            say: `Evidence is your proof. In literature it's usually quotations and specific details from the text. In argument it can be facts, statistics, examples, expert testimony, or experience. But not every true thing is useful evidence.`,
            board: [
              { type: 'heading', text: 'Evidence' },
              { type: 'bullets', items: ['Quotations and textual details', 'Facts and statistics', 'Examples and anecdotes', 'Expert testimony'] },
            ],
          },
          {
            say: `Good evidence is relevant, specific, and sufficient. Relevant means it proves this claim, not a neighboring one. Specific means exact words or numbers, not a vague gesture. Sufficient means there's enough of it that the claim stands without wobbling.`,
            board: [
              { type: 'steps', items: ['Relevant: proves THIS claim', 'Specific: exact words, numbers, details', 'Sufficient: enough to bear the weight'] },
            ],
          },
          {
            say: `The classic trap is evidence that's true but beside the point. Your reader nods, then wonders why you told them. Before you use anything, ask yourself: if this weren't here, would my claim be weaker? If not, cut it.`,
            board: [
              { type: 'callout', text: 'True ≠ relevant. Every piece of evidence must earn its place.', tone: 'warn' },
              { type: 'callout', text: 'Short, precise quotations beat long ones. Quote the words you will actually analyze.', tone: 'tip' },
            ],
          },
          {
            say: `Here's a claim about the Gettysburg Address. All four options are true, so don't get lazy. Only one of them actually proves the claim. Pick it.`,
            board: [
              { type: 'callout', text: 'Claim: Lincoln shifts the ceremony’s purpose from honoring the dead to charging the living with a task.', tone: 'example' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Which evidence best supports the claim?',
                options: [
                  'The speech is fewer than three hundred words long.',
                  'Lincoln says, "It is for us the living, rather, to be dedicated here to the unfinished work."',
                  'The Battle of Gettysburg lasted three days in July 1863.',
                  'Edward Everett spoke for about two hours before Lincoln did.',
                ],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose the evidence that proves the claim.',
              expect: { choice: 1 },
              hint: `The claim is about a shift from the dead to the living. Which option actually mentions the living and their task?`,
              praise: `Correct. Us the living, and the unfinished work. That's the shift, in his own words. The rest was just trivia.`,
            },
          },
        ],
      },
      {
        id: '5.2',
        title: 'Integrating Quotations',
        objective: 'Embed quotations smoothly into your own sentences and avoid dropped quotes.',
        beats: [
          {
            say: `A dropped quote is a quotation sitting alone in your paragraph, with no introduction and no explanation. It's like cracking a raw egg onto a plate and calling it breakfast. The reader has no idea why it's there.`,
            board: [
              { type: 'heading', text: 'No dropped quotes' },
              { type: 'callout', text: 'Dropped: Lincoln honors the soldiers. "The world will little note, nor long remember what we say here."', tone: 'warn' },
            ],
          },
          {
            say: `There are three better ways. Use a signal phrase, like, as Lincoln admits. Use a colon after a complete sentence of your own. Or, best of all, embed a short piece of the quotation inside your own sentence so it reads smoothly.`,
            board: [
              { type: 'bullets', items: [
                'Signal phrase: As Lincoln admits, "The world will little note..."',
                'Colon: Lincoln is modest about his own words: "The world will little note..."',
                'Embedded: Lincoln predicts the world "will little note, nor long remember" his speech.',
              ] },
            ],
          },
          {
            say: `When you embed, the sentence still has to be grammatical. If you change a word to make it fit, put your change in square brackets. If you cut words out, use an ellipsis. Never change the meaning. That's not editing, that's lying.`,
            board: [
              { type: 'term', term: 'Brackets [ ]', def: 'Mark a word you changed or added for grammar or clarity.' },
              { type: 'term', term: 'Ellipsis (...)', def: 'Marks words you removed from the middle of a quotation.' },
            ],
          },
          {
            say: `And quote less. Pick the exact words you're going to analyze, not the whole paragraph. Then follow up right away with what those words do. A quotation without commentary is half a dish.`,
            board: [
              { type: 'callout', text: 'Quote the phrase, not the page. Then explain it in the next breath.', tone: 'tip' },
            ],
          },
          {
            say: `Four students, one quotation. Only one of them weaves it into their own sentence and then says something about it. Find that one.`,
            board: [{ type: 'heading', text: 'Smooth, or dropped?' }],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Which sentence integrates the quotation best?',
                options: [
                  '"The world will little note, nor long remember what we say here." This is humble.',
                  'Lincoln predicts the world "will little note, nor long remember" his words, a modesty that hands all the honor to the soldiers.',
                  'Lincoln says a quote about how the world won’t remember the speech.',
                  'There is a quote in the speech that says "the world will little note."',
                ],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose the best-integrated quotation.',
              expect: { choice: 1 },
              hint: `Look for the one where the quotation fits inside the student's own grammar and is followed by an explanation.`,
              praise: `Right. Embedded, grammatical, and explained. And the irony is, the world did remember. Every word.`,
            },
          },
        ],
      },
      {
        id: '5.3',
        title: 'Writing Commentary',
        objective: 'Write commentary that explains how evidence supports a claim instead of summarizing it.',
        beats: [
          {
            say: `Commentary is where you earn your grade. Evidence shows what the text says. Commentary explains how and why it proves your claim. Without it, you're handing me a bag of groceries and calling it dinner.`,
            board: [
              { type: 'heading', text: 'Commentary' },
              { type: 'term', term: 'Commentary', def: 'The writer’s explanation of how the evidence supports the claim and why it matters.' },
            ],
          },
          {
            say: `The biggest mistake is summary. Restating the quotation in simpler words is not analysis. I can read. Tell me what the word choice does, what it suggests, and how it connects to your line of reasoning.`,
            board: [
              { type: 'callout', text: 'Summary: "This means rich men need wives." Commentary: explains the irony and its effect.', tone: 'warn' },
              { type: 'bullets', items: ['What choice did the writer make?', 'What does it suggest or reveal?', 'How does that prove the claim?', 'So what? Why does it matter?'] },
            ],
          },
          {
            say: `Zoom in on specific words, then zoom out to the purpose. A good rule of thumb is at least two sentences of commentary for every piece of evidence. On the AP rubric, the top evidence and commentary scores go to essays that consistently explain how the evidence supports the line of reasoning.`,
            board: [
              { type: 'steps', items: ['Zoom in: a key word or choice', 'Explain its effect', 'Zoom out: link to the claim and purpose'] },
              { type: 'callout', text: 'Rule of thumb: two or more sentences of commentary per piece of evidence.', tone: 'tip' },
            ],
          },
          {
            say: `Here's a paragraph about the first line of Pride and Prejudice. There's a claim, the evidence, a lazy summary, and real commentary. Click the commentary. If you pick the summary, I'm taking your dessert.`,
            board: [{ type: 'heading', text: 'Find the commentary' }],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Austen opens Pride and Prejudice by mocking the marriage market.', tag: 'claim', note: 'Claim: what this paragraph will prove.' },
                  { text: 'Her narrator announces, "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."', tag: 'evidence', note: 'Evidence: a short, exact quotation.' },
                  { text: 'This means that rich single men need to get married.' },
                  { text: 'The grand phrase "universally acknowledged" dresses village gossip up as philosophy, and the joke is that the families with unmarried daughters, not the rich man, are the ones truly in want.', tag: 'commentary', note: 'Commentary: zooms in on diction, names the irony, and explains how it proves the claim.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause that is genuine commentary.',
              expect: { picked: 'commentary' },
              hint: `Summary repeats the quotation in plain words. Commentary explains the joke and why it matters. Which sentence talks about who is really doing the wanting?`,
              praise: `Yes. That's commentary. It explains the trick, not just the words. Austen would approve. So do I. A little.`,
            },
          },
        ],
      },
      {
        id: '5.4',
        title: 'Synthesis: Sources in Conversation',
        objective: 'Combine multiple sources to support your own position, using commentary to connect them.',
        beats: [
          {
            say: `Synthesis means using several sources to build your own argument. On the AP Language exam, you get a set of sources, usually six or seven, and you defend a position using at least three of them. Your position. Not theirs.`,
            board: [
              { type: 'heading', text: 'Synthesis' },
              { type: 'term', term: 'Synthesis', def: 'Combining ideas from multiple sources to support your own position on an issue.' },
            ],
          },
          {
            say: `The mistake is the source summary essay. Source A says this, Source B says that. That's a buffet, not a meal. You are the chef. Your claim leads every paragraph, and the sources serve it.`,
            board: [
              { type: 'callout', text: 'Weak: "Source A says... Source B says..." Strong: your claim first, sources as support.', tone: 'warn' },
              { type: 'steps', items: ['Your claim', 'Source as evidence', 'Your commentary', 'Next source, in conversation'] },
            ],
          },
          {
            say: `Make the sources talk to each other. One supports, another complicates, a third answers an objection. Use phrases like, while one source worries about this, another suggests that. And cite every source you use, by letter or by author.`,
            board: [
              { type: 'bullets', items: [
                'Agree: "Source B confirms what Source A found..."',
                'Complicate: "Source D adds a limit..."',
                'Answer: "Source A’s data answers Source C’s worry..."',
              ] },
              { type: 'callout', text: 'Cite every source you use: (Source A) or the author’s name.', tone: 'tip' },
            ],
          },
          {
            say: `Here's a synthesis paragraph about keeping cooking classes, built on practice sources I made up for this drill. Find the clause where the writer makes two sources talk to each other. That's synthesis.`,
            board: [
              { type: 'callout', text: 'Practice prompt: Should schools keep cooking classes? (Sources are invented for this drill.)', tone: 'example' },
            ],
            widget: {
              type: 'annotate',
              props: {
                passage: [
                  { text: 'Schools should keep cooking classes, because they teach skills that textbooks can only describe.', tag: 'thesis', note: 'The writer’s own position leads. The sources will serve it.' },
                  { text: 'One district found that students in cooking electives improved on fraction problems (Source A).', tag: 'evidence', note: 'Evidence from one source, cited.' },
                  { text: 'Critics argue that class time belongs to tested subjects (Source C).', tag: 'counterargument', note: 'Counterargument from another source, represented fairly.' },
                  { text: 'Yet Source A’s fraction gains suggest that a cooking class is a math class in disguise, which answers Source C’s worry on its own terms.', tag: 'commentary', note: 'Synthesis: the writer puts Source A and Source C in conversation to advance her own claim.' },
                ],
              },
            },
            check: {
              prompt: 'Click the clause where the writer puts two sources in conversation.',
              expect: { picked: 'commentary' },
              hint: `Look for the sentence that mentions two sources at once and explains how one answers the other.`,
              praise: `Exactly. Source A answers Source C, and the writer is the one doing the talking. You're the chef now. Don't get used to me saying that.`,
            },
          },
        ],
      },
    ],
  },
]
