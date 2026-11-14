// Itsuki Nakano: Science course (numbered lessons + live whiteboard).
// Aligned with NGSS high-school physical and life science (HS-PS1, HS-PS2, HS-PS3, HS-LS1, HS-LS3),
// with AP Physics 1 / AP Chemistry / AP Biology vocabulary. g = 9.8 m/s² throughout.
// Lesson ids are permanent: never renumber or reuse one.

export default [
  {
    unit: 1,
    title: 'Kinematics',
    lessons: [
      {
        id: '1.1',
        title: 'Displacement, Velocity, and Acceleration',
        objective: 'Distinguish distance from displacement and speed from velocity, and calculate acceleration from a change in velocity.',
        beats: [
          {
            say: "Good day. Please take out your notebook. Motion begins with one question: where did the object end up, compared with where it started? If I walk four hundred meters east to the bakery and then one hundred meters back west, I have traveled five hundred meters of distance, but my displacement is only three hundred meters east.",
            board: [
              { type: 'heading', text: 'Distance vs. displacement' },
              { type: 'term', term: 'Displacement (Δx)', def: 'Change in position: final minus initial. A vector, so it has size and direction.' },
              { type: 'callout', text: 'Walk 400 m east, then 100 m west → distance 500 m, displacement 300 m east.', tone: 'example' },
            ],
          },
          {
            say: "Speed tells us how fast; velocity tells us how fast and in which direction. Average velocity equals displacement divided by time. My bakery trip took two hundred fifty seconds, so my average speed was two meters per second, but my average velocity was only one point two meters per second east.",
            board: [
              { type: 'formula', text: 'v_avg = Δx ÷ Δt' },
              { type: 'bullets', items: ['Average speed = 500 m ÷ 250 s = 2.0 m/s', 'Average velocity = 300 m east ÷ 250 s = 1.2 m/s east'] },
            ],
          },
          {
            say: "Acceleration is the rate at which velocity changes. It equals the change in velocity divided by the time taken, and its unit is meters per second squared. A bicycle that goes from two to eight meters per second in three seconds accelerates at two meters per second squared. And please, write the units every time.",
            board: [
              { type: 'formula', text: 'a = Δv ÷ Δt = (v − v₀) ÷ t' },
              { type: 'callout', text: 'Bicycle: (8 m/s − 2 m/s) ÷ 3 s = 2 m/s²', tone: 'example' },
              { type: 'callout', text: 'A negative acceleration only points in the negative direction. It does not always mean slowing down.', tone: 'warn' },
            ],
          },
          {
            say: "When acceleration is constant, three equations describe everything. A car that starts from rest and accelerates at three meters per second squared for four seconds reaches twelve meters per second and covers twenty-four meters. First list the known quantities, then choose the equation that contains them.",
            board: [
              { type: 'heading', text: 'Constant-acceleration equations' },
              { type: 'bullets', items: ['v = v₀ + at', 'Δx = v₀t + ½at²', 'v² = v₀² + 2aΔx'] },
              { type: 'callout', text: 'From rest, a = 3 m/s², t = 4 s → v = 12 m/s, Δx = ½(3)(4²) = 24 m', tone: 'example' },
            ],
          },
          {
            say: "Now it is your turn. A train speeds up from ten to twenty-five meters per second in five seconds. Find the change in velocity first, then divide by the time.",
            board: [
              { type: 'steps', items: ['Find Δv', 'Divide by Δt', 'Write the units'] },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'A train speeds up from 10 m/s to 25 m/s in 5.0 s. What is its acceleration?',
                options: ['5.0 m/s²', '3.0 m/s²', '7.0 m/s²', '15 m/s²'],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the train's acceleration.",
              expect: { choice: 1 },
              hint: "Subtract the starting velocity from the final velocity, then divide by five seconds.",
              praise: "Correct. Fifteen meters per second of change over five seconds gives three meters per second squared. You even kept the units. Splendid.",
            },
          },
        ],
      },
      {
        id: '1.2',
        title: 'Motion Graphs',
        objective: 'Read position–time and velocity–time graphs, using slope for velocity and acceleration and area for displacement.',
        beats: [
          {
            say: "A graph is a story told on two axes, so please read the axis labels before anything else. On a position versus time graph, the slope is the velocity. A straight line means constant velocity, a flat line means the object is at rest, and a curve means the velocity is changing.",
            board: [
              { type: 'heading', text: 'Position–time graphs' },
              { type: 'formula', text: 'slope = rise ÷ run = Δx ÷ Δt = velocity' },
              { type: 'bullets', items: ['Flat line → at rest', 'Straight sloped line → constant velocity', 'Curving line → accelerating'] },
            ],
          },
          {
            say: "On a velocity versus time graph, the slope is the acceleration. The area between the line and the time axis is the displacement. Area below the axis counts as negative displacement, so please be careful with the sign.",
            board: [
              { type: 'heading', text: 'Velocity–time graphs' },
              { type: 'bullets', items: ['Slope = acceleration', 'Area under the line = displacement', 'Line crosses v = 0 → the object reverses direction'] },
            ],
          },
          {
            say: "Here is a worked example. The velocity rises steadily from zero to ten meters per second over five seconds. The slope is ten divided by five, which is two meters per second squared, and the triangle's area is one half times five times ten, which is twenty-five meters.",
            board: [
              { type: 'callout', text: 'v rises from 0 to 10 m/s over 5 s', tone: 'example' },
              { type: 'formula', text: 'a = 10 m/s ÷ 5 s = 2 m/s²' },
              { type: 'formula', text: 'Δx = ½ × 5 s × 10 m/s = 25 m' },
            ],
          },
          {
            say: "The most common mistake is reading a velocity graph as if it were a position graph. A flat line on a velocity graph does not mean the object is stopped; it means it moves at a constant velocity. It is like a recipe card: if you read the wrong column, the curry will be ruined.",
            board: [
              { type: 'callout', text: 'Flat line on a v–t graph: constant velocity, not at rest!', tone: 'warn' },
              { type: 'bullets', items: ['x–t graph: height = position, slope = velocity', 'v–t graph: height = velocity, slope = acceleration', 'a–t graph: area = change in velocity'] },
            ],
          },
          {
            say: "Let us test your reading. The velocity rises steadily from two to six meters per second over four seconds. The shape under the line is a trapezoid, so please find its area.",
            board: [
              { type: 'formula', text: 'Trapezoid area = ½(b₁ + b₂) × width' },
              { type: 'callout', text: 'Parallel sides = the two velocities; width = the time interval.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'On a v–t graph, velocity rises steadily from 2 m/s to 6 m/s over 4 s. What is the displacement?',
                options: ['1 m', '24 m', '8 m', '16 m'],
                answer: 3,
              },
            },
            check: {
              prompt: 'Choose the displacement.',
              expect: { choice: 3 },
              hint: "Displacement is the area under the line. Average the starting and final velocities, then multiply by the time.",
              praise: "Correct. Sixteen meters. You treated the area as displacement, exactly as a careful scientist should.",
            },
          },
        ],
      },
      {
        id: '1.3',
        title: 'Free Fall',
        objective: 'Use the acceleration due to gravity to predict the speed and position of objects that are dropped or thrown straight up.',
        beats: [
          {
            say: "An object in free fall has only gravity acting on it. Near Earth's surface, every falling object accelerates downward at nine point eight meters per second squared, whatever its mass, as long as we ignore air resistance. A heavy melon and a light meat bun, dropped together in a vacuum, would land at the same time. ...I would catch both, naturally.",
            board: [
              { type: 'heading', text: 'Free fall' },
              { type: 'term', term: 'g', def: 'Acceleration due to gravity near Earth: 9.8 m/s², directed downward.' },
              { type: 'callout', text: 'Apollo 15 (1971): a hammer and a feather dropped on the Moon landed together.', tone: 'tip' },
            ],
          },
          {
            say: "Please choose a sign convention before you calculate. If upward is positive, then the acceleration is negative nine point eight meters per second squared during the whole flight. The constant-acceleration equations from lesson one point one still work; we simply replace a with negative g.",
            board: [
              { type: 'formula', text: 'v = v₀ − gt' },
              { type: 'formula', text: 'y = v₀t − ½gt²' },
              { type: 'callout', text: 'Up = positive, so a = −9.8 m/s² the entire time.', tone: 'tip' },
            ],
          },
          {
            say: "Suppose a ball is dropped from rest. After two seconds its velocity is nine point eight times two, which is nineteen point six meters per second downward. It has fallen one half times nine point eight times two squared, which is also nineteen point six meters.",
            board: [
              { type: 'callout', text: 'Dropped from rest, t = 2.0 s', tone: 'example' },
              { type: 'formula', text: 'v = (9.8 m/s²)(2.0 s) = 19.6 m/s downward' },
              { type: 'formula', text: 'd = ½(9.8 m/s²)(2.0 s)² = 19.6 m' },
            ],
          },
          {
            say: "Now a ball thrown straight up at fourteen point seven meters per second. It loses nine point eight meters per second of speed every second, so it reaches the top after one point five seconds and rises about eleven meters. At the top its velocity is zero for an instant, but gravity has not switched off.",
            board: [
              { type: 'formula', text: 't_top = v₀ ÷ g = 14.7 ÷ 9.8 = 1.5 s' },
              { type: 'formula', text: 'h_max = v₀² ÷ 2g = 14.7² ÷ 19.6 ≈ 11.0 m' },
              { type: 'callout', text: 'At the top: v = 0, but a is still 9.8 m/s² downward.', tone: 'warn' },
            ],
          },
          {
            say: "This is the classic exam trap, so please think carefully. A ball is thrown straight up and pauses at the very top of its path. What is its acceleration at that moment?",
            board: [
              { type: 'heading', text: 'Exam trap' },
              { type: 'callout', text: 'Velocity and acceleration are different quantities.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'A ball is thrown straight up. At the highest point of its path, what is its acceleration?',
                options: ['Zero', '9.8 m/s² upward', '9.8 m/s² downward', "It depends on the ball's mass"],
                answer: 2,
              },
            },
            check: {
              prompt: 'Choose the acceleration at the top of the path.',
              expect: { choice: 2 },
              hint: "The velocity is zero at the top, but is gravity still pulling on the ball?",
              praise: "Correct. Nine point eight meters per second squared, downward, the entire time. Zero velocity does not mean zero acceleration. A model answer.",
            },
          },
        ],
      },
      {
        id: '1.4',
        title: 'Projectile Motion',
        objective: 'Treat horizontal and vertical motion independently and find the launch angle that gives the greatest range.',
        beats: [
          {
            say: "A projectile moves sideways and falls at the same time, and the two motions are independent. Horizontally its velocity stays constant; vertically it is simply in free fall. So a ball rolled off a nineteen point six meter cliff at five meters per second falls for two seconds and lands ten meters from the base. Please do not test this with a meat bun.",
            board: [
              { type: 'heading', text: 'Two independent motions' },
              { type: 'bullets', items: ['Horizontal: aₓ = 0, so vₓ is constant', 'Vertical: a_y = −9.8 m/s² (free fall)', 'Time links the two'] },
              { type: 'callout', text: 'Rolled off a 19.6 m cliff at 5 m/s: falls for 2.0 s, lands 10 m from the base.', tone: 'example' },
            ],
          },
          {
            say: "When a projectile is launched at an angle, we split the launch velocity into components. The horizontal part is the speed times the cosine of the angle, and the vertical part is the speed times the sine of the angle. At twenty meters per second and thirty degrees, that gives about seventeen point three meters per second sideways and ten meters per second upward.",
            board: [
              { type: 'formula', text: 'vₓ = v cos θ     v_y = v sin θ' },
              { type: 'callout', text: 'v = 20 m/s, θ = 30°: vₓ ≈ 17.3 m/s, v_y = 10.0 m/s', tone: 'example' },
            ],
          },
          {
            say: "On level ground, the range equals the speed squared times the sine of twice the angle, divided by g. For twenty meters per second at thirty degrees, the range is about thirty-five point three meters, and the peak height is about five point one meters. Please try the launcher on the board and watch both numbers change.",
            board: [
              { type: 'formula', text: 'R = v² sin(2θ) ÷ g' },
              { type: 'formula', text: 'H = (v sin θ)² ÷ 2g' },
              { type: 'callout', text: '20 m/s at 30°: R ≈ 35.3 m, H ≈ 5.1 m', tone: 'example' },
            ],
            widget: { type: 'forces', props: { mode: 'projectile' } },
          },
          {
            say: "Notice something elegant. Thirty degrees and sixty degrees give exactly the same range, because their doubled angles have the same sine. The sixty degree shot simply flies higher, about fifteen point three meters, and stays in the air longer.",
            board: [
              { type: 'heading', text: 'Complementary angles' },
              { type: 'bullets', items: ['30° and 60° → same range (35.3 m at 20 m/s)', '60° flies higher: H ≈ 15.3 m', 'sin(2θ) can never exceed 1'] },
            ],
          },
          {
            say: "Here is your task. Set the launch speed to twenty meters per second, then find the angle that sends the projectile farthest. If you have it right, the range should read about forty point eight meters.",
            board: [
              { type: 'callout', text: 'Maximum range when sin(2θ) = 1', tone: 'tip' },
            ],
            check: {
              prompt: 'Set the speed to twenty meters per second and choose the angle that gives the greatest range.',
              expect: { speed: 20, angle: 45 },
              hint: "The range depends on the sine of twice the angle. Which angle makes that doubled angle ninety degrees?",
              praise: "Correct. Forty-five degrees, and about forty point eight meters of range. Twice forty-five is ninety, and the sine of ninety degrees is one. Splendid work.",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 2,
    title: 'Forces and Energy',
    lessons: [
      {
        id: '2.1',
        title: "Newton's Three Laws of Motion",
        objective: "State Newton's three laws and use them to explain why objects keep moving, change their motion, or push back.",
        beats: [
          {
            say: "Newton's first law says an object at rest stays at rest, and an object in motion keeps moving at constant velocity, unless a net external force acts on it. This resistance to changes in motion is called inertia, and it depends only on mass. When a bus brakes suddenly, your body keeps moving forward. That is inertia, not rudeness.",
            board: [
              { type: 'heading', text: "Newton's first law" },
              { type: 'term', term: 'Inertia', def: 'The tendency of an object to resist changes in its velocity. More mass → more inertia.' },
              { type: 'callout', text: 'Bus brakes → passengers lurch forward.', tone: 'example' },
            ],
          },
          {
            say: "What matters is the net force, the vector sum of every force on the object. When the forces are balanced, the net force is zero and the velocity does not change. Please remember that a sled sliding at constant speed on frictionless ice needs no forward force at all.",
            board: [
              { type: 'term', term: 'Net force (ΣF)', def: 'The vector sum of all forces acting on one object.' },
              { type: 'callout', text: 'Constant velocity ⇔ ΣF = 0. Motion does not need a force; changing motion does.', tone: 'warn' },
            ],
          },
          {
            say: "Newton's second law tells us what happens when the forces are unbalanced. The acceleration equals the net force divided by the mass, and it points in the same direction as the net force. One newton is the force that accelerates one kilogram at one meter per second squared.",
            board: [
              { type: 'heading', text: "Newton's second law" },
              { type: 'formula', text: 'a = ΣF ÷ m' },
              { type: 'formula', text: '1 N = 1 kg·m/s²' },
            ],
          },
          {
            say: "Newton's third law says forces always come in pairs. If object A pushes on object B, then B pushes on A with a force equal in size and opposite in direction. These two forces act on different objects, so they never cancel each other. When you stand, Earth pulls you down, and you pull Earth up just as hard.",
            board: [
              { type: 'heading', text: "Newton's third law" },
              { type: 'formula', text: 'F(A on B) = −F(B on A)' },
              { type: 'bullets', items: ['Equal size, opposite direction', 'Act on different objects', 'Same type of force (both gravity, both contact, …)'] },
            ],
          },
          {
            say: "Let us see whether the third law has settled in your mind. A heavy truck collides with a small car. Compare the force the car exerts on the truck with the force the truck exerts on the car.",
            board: [
              { type: 'callout', text: 'Third-law pairs are equal even when the objects are not.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'A truck collides with a small car. The force of the car on the truck is…',
                options: [
                  'smaller than the force of the truck on the car',
                  'larger than the force of the truck on the car',
                  'zero, because the car is lighter',
                  'equal in size and opposite in direction to the force of the truck on the car',
                ],
                answer: 3,
              },
            },
            check: {
              prompt: 'Choose how the two forces compare.',
              expect: { choice: 3 },
              hint: "This is an action and reaction pair. The masses differ, but do the forces?",
              praise: "Correct. The forces are equal and opposite. The car accelerates far more only because its mass is smaller. Excellent reasoning.",
            },
          },
        ],
      },
      {
        id: '2.2',
        title: "Newton's Second Law: F = ma",
        objective: 'Use force equals mass times acceleration to find force, mass, or acceleration, and tell mass apart from weight.',
        beats: [
          {
            say: "Newton's second law is usually written as net force equals mass times acceleration. Force is measured in newtons, mass in kilograms, and acceleration in meters per second squared. The cart on the board lets you change the mass and the force, so please experiment while I explain.",
            board: [
              { type: 'formula', text: 'ΣF = m·a' },
              { type: 'bullets', items: ['F in newtons (N)', 'm in kilograms (kg)', 'a in meters per second squared (m/s²)'] },
            ],
            widget: { type: 'forces', props: { mode: 'fma' } },
          },
          {
            say: "If a net force of ten newtons acts on a two kilogram box, the acceleration is ten divided by two, which is five meters per second squared. Double the mass to four kilograms with the same force, and the acceleration halves to two point five. More mass means more inertia, just as a full lunch tray is harder to swing around than an empty one.",
            board: [
              { type: 'bullets', items: ['10 N on 2.0 kg → a = 5.0 m/s²', '10 N on 4.0 kg → a = 2.5 m/s²'] },
              { type: 'callout', text: 'Same force, double the mass → half the acceleration.', tone: 'tip' },
            ],
          },
          {
            say: "Weight is a force: it is the mass times g. A fifty kilogram student weighs fifty times nine point eight, which is four hundred ninety newtons. On the Moon, where g is about one point six, the same student weighs only about eighty newtons, but the mass is still fifty kilograms.",
            board: [
              { type: 'formula', text: 'W = m·g' },
              { type: 'bullets', items: ['Earth: 50 kg × 9.8 m/s² = 490 N', 'Moon: 50 kg × 1.6 m/s² ≈ 80 N', 'Mass stays 50 kg everywhere'] },
            ],
          },
          {
            say: "One equation gives three tools. To find force, multiply mass by acceleration; to find acceleration, divide force by mass; to find mass, divide force by acceleration. First identify the known quantities, then choose the arrangement that contains the unknown.",
            board: [
              { type: 'steps', items: ['List knowns with units', 'Rearrange: F = ma, a = F ÷ m, m = F ÷ a', 'Substitute, then write the units'] },
            ],
          },
          {
            say: "Now please use the cart. A fifteen kilogram cart must accelerate at four meters per second squared. Set the mass, then find the net force that produces exactly that acceleration.",
            board: [
              { type: 'callout', text: 'm = 15 kg, a = 4.0 m/s², F = ?', tone: 'example' },
            ],
            check: {
              prompt: 'Set the mass to fifteen kilograms and the force that gives an acceleration of four meters per second squared.',
              expect: { mass: 15, force: 60 },
              hint: "Force equals mass times acceleration, so multiply fifteen by four.",
              praise: "Correct. Sixty newtons: fifteen kilograms times four meters per second squared. That is a model answer, units and all.",
            },
          },
        ],
      },
      {
        id: '2.3',
        title: 'Friction and Free-Body Diagrams',
        objective: 'Draw a free-body diagram, calculate kinetic friction, and find the net force and acceleration of a sliding object.',
        beats: [
          {
            say: "Before any calculation, please draw a free-body diagram. Represent the object as a dot and draw one arrow for each force acting on it, pointing in the direction of that force. Only forces on the object belong in the diagram, never forces the object exerts on something else.",
            board: [
              { type: 'heading', text: 'Free-body diagram' },
              { type: 'bullets', items: ['Weight (F_g = mg): straight down', 'Normal force (F_N): perpendicular to the surface', 'Applied force, tension, friction: as they act'] },
            ],
          },
          {
            say: "Friction acts along the surface and opposes sliding. Static friction holds a resting object in place, up to a maximum value, while kinetic friction acts once it slides. Kinetic friction equals the coefficient of kinetic friction times the normal force, and the static coefficient is usually larger, which is why starting a heavy box is the hardest part.",
            board: [
              { type: 'formula', text: 'f_k = μ_k · F_N' },
              { type: 'formula', text: 'f_s ≤ μ_s · F_N' },
              { type: 'callout', text: 'Usually μ_s > μ_k: getting it moving is harder than keeping it moving.', tone: 'tip' },
            ],
          },
          {
            say: "Consider a ten kilogram box sliding on a level floor with a kinetic coefficient of zero point three. The normal force balances the weight, ninety-eight newtons, so friction is zero point three times ninety-eight, which is twenty-nine point four newtons. To keep it sliding at constant velocity, you push with exactly twenty-nine point four newtons.",
            board: [
              { type: 'callout', text: 'm = 10 kg, μ_k = 0.30, level floor', tone: 'example' },
              { type: 'formula', text: 'F_N = mg = (10 kg)(9.8 m/s²) = 98 N' },
              { type: 'formula', text: 'f_k = (0.30)(98 N) = 29.4 N' },
            ],
          },
          {
            say: "When the push is larger than friction, the leftover is the net force. On level ground the vertical forces cancel, so the net force is simply the applied force minus friction. Then Newton's second law gives the acceleration.",
            board: [
              { type: 'formula', text: 'ΣFₓ = F_applied − f_k' },
              { type: 'formula', text: 'a = ΣFₓ ÷ m' },
            ],
            widget: { type: 'forces', props: { mode: 'fma' } },
          },
          {
            say: "Your turn. A twenty-five kilogram crate on a level floor has a kinetic coefficient of zero point two, so friction is forty-nine newtons. You push with one hundred forty-nine newtons. The cart on the board takes the net force, so please set the crate's mass and the net force acting on it.",
            board: [
              { type: 'callout', text: 'm = 25 kg, F_push = 149 N, f_k = (0.20)(245 N) = 49 N', tone: 'example' },
            ],
            check: {
              prompt: 'Set the mass to twenty-five kilograms and the net force on the crate.',
              expect: { mass: 25, force: 100 },
              hint: "Subtract the forty-nine newtons of friction from the one hundred forty-nine newton push.",
              praise: "Correct. One hundred newtons of net force, so the crate accelerates at four meters per second squared. Your reasoning was as orderly as a textbook.",
            },
          },
        ],
      },
      {
        id: '2.4',
        title: 'Work, Energy, and Conservation of Energy',
        objective: 'Calculate work, kinetic energy, and gravitational potential energy, and use conservation of energy to predict speeds.',
        beats: [
          {
            say: "In physics, work is done when a force moves an object through a displacement. Work equals the force times the distance times the cosine of the angle between them, and it is measured in joules. Pushing a cart with fifty newtons for four meters does two hundred joules of work. Holding a tray of food perfectly still does no work at all, however tired my arms become.",
            board: [
              { type: 'formula', text: 'W = F·d·cos θ' },
              { type: 'term', term: 'Joule (J)', def: 'One newton acting through one meter: 1 J = 1 N·m.' },
              { type: 'callout', text: '50 N × 4.0 m = 200 J', tone: 'example' },
            ],
          },
          {
            say: "Kinetic energy is the energy of motion: one half times mass times speed squared. Gravitational potential energy is stored by height: mass times g times height. A two kilogram ball moving at three meters per second has nine joules of kinetic energy; lift it five meters and it stores ninety-eight joules of potential energy.",
            board: [
              { type: 'formula', text: 'KE = ½mv²' },
              { type: 'formula', text: 'PE_g = mgh' },
              { type: 'callout', text: 'KE = ½(2 kg)(3 m/s)² = 9 J     PE = (2 kg)(9.8 m/s²)(5 m) = 98 J', tone: 'example' },
            ],
          },
          {
            say: "The work energy theorem connects the two ideas: the net work done on an object equals its change in kinetic energy. If two hundred joules of net work is done on a four kilogram cart starting from rest, its kinetic energy becomes two hundred joules. Solving one half times four times v squared equals two hundred gives a speed of ten meters per second.",
            board: [
              { type: 'formula', text: 'W_net = ΔKE' },
              { type: 'callout', text: '200 J = ½(4 kg)v² → v = 10 m/s', tone: 'example' },
            ],
          },
          {
            say: "Energy is never created or destroyed; it only changes form. Without friction or air resistance, kinetic plus potential energy stays constant, so an object dropped from five meters lands at about nine point nine meters per second. With friction, some mechanical energy becomes thermal energy, but the total is still conserved.",
            board: [
              { type: 'formula', text: 'KE₁ + PE₁ = KE₂ + PE₂' },
              { type: 'formula', text: 'v = √(2gh) = √(2 × 9.8 × 5.0) ≈ 9.9 m/s' },
              { type: 'callout', text: 'Friction converts mechanical energy into thermal energy.', tone: 'tip' },
            ],
          },
          {
            say: "Here is a problem about food, which is purely a coincidence. A two kilogram bag of rice falls from rest from a height of twenty meters, with no air resistance. How much kinetic energy does it have just before it lands?",
            board: [
              { type: 'callout', text: 'All the potential energy at the top becomes kinetic energy at the bottom.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'A 2.0 kg bag of rice falls from rest from 20 m (no air resistance). What is its kinetic energy just before it lands?',
                options: ['39.2 J', '784 J', '392 J', '40 J'],
                answer: 2,
              },
            },
            check: {
              prompt: 'Choose the kinetic energy just before landing.',
              expect: { choice: 2 },
              hint: "The kinetic energy at the bottom equals the potential energy at the top: mass times g times height.",
              praise: "Correct. Three hundred ninety-two joules. Every joule of potential energy became kinetic energy. ...And no, I was not worried about the rice.",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 3,
    title: 'Atomic Structure',
    lessons: [
      {
        id: '3.1',
        title: 'Subatomic Particles and Isotopes',
        objective: 'Identify protons, neutrons, and electrons, read atomic and mass numbers, and explain what makes isotopes different.',
        beats: [
          {
            say: "Every atom is built from three particles. Protons carry a positive charge and neutrons carry no charge, and both sit in the tiny, dense nucleus. Electrons carry a negative charge, have less than one thousandth the mass of a proton, and occupy the space around the nucleus.",
            board: [
              { type: 'heading', text: 'Subatomic particles' },
              { type: 'bullets', items: ['Proton: +1 charge, ≈ 1 u, in the nucleus', 'Neutron: 0 charge, ≈ 1 u, in the nucleus', 'Electron: −1 charge, ≈ 1/1836 u, around the nucleus'] },
            ],
          },
          {
            say: "The atomic number is the number of protons, and it alone decides which element an atom is. The mass number is protons plus neutrons. In a neutral atom, the number of electrons equals the number of protons, so the charges balance exactly.",
            board: [
              { type: 'term', term: 'Atomic number (Z)', def: 'Number of protons. Defines the element.' },
              { type: 'term', term: 'Mass number (A)', def: 'Protons + neutrons.' },
              { type: 'formula', text: 'neutrons = A − Z' },
            ],
          },
          {
            say: "Isotopes are atoms of the same element with different numbers of neutrons. Carbon twelve has six neutrons, carbon thirteen has seven, and carbon fourteen has eight, yet all three have six protons and behave almost identically in chemical reactions. Think of three meat buns with the same filling but different amounts of dough.",
            board: [
              { type: 'heading', text: 'Isotopes of carbon (Z = 6)' },
              { type: 'bullets', items: ['Carbon-12: 6 p, 6 n', 'Carbon-13: 6 p, 7 n', 'Carbon-14: 6 p, 8 n (radioactive)'] },
            ],
          },
          {
            say: "The atomic mass printed on the periodic table is a weighted average of the isotopes found in nature. Chlorine is about seventy-six percent chlorine thirty-five and twenty-four percent chlorine thirty-seven, so its average is about thirty-five point four five atomic mass units. That is why the value sits closer to thirty-five than to thirty-seven.",
            board: [
              { type: 'formula', text: 'average atomic mass = Σ (fraction × isotope mass)' },
              { type: 'callout', text: '0.758(34.97 u) + 0.242(36.97 u) ≈ 35.45 u', tone: 'example' },
            ],
          },
          {
            say: "The model on the board shows protons and electrons only, so neutrons will not appear. Carbon fourteen has six protons and eight neutrons. Please build a neutral carbon fourteen atom.",
            board: [
              { type: 'callout', text: 'Changing neutrons changes the isotope, not the element.', tone: 'tip' },
            ],
            widget: { type: 'bohr', props: { protons: 1 } },
            check: {
              prompt: 'Build a neutral atom of carbon fourteen.',
              expect: { protons: 6, electrons: 6 },
              hint: "Carbon always has six protons; the fourteen also counts neutrons. A neutral atom has as many electrons as protons.",
              praise: "Correct. Six protons and six electrons. The extra neutrons change the mass, not the element. Splendid.",
            },
          },
        ],
      },
      {
        id: '3.2',
        title: 'The Bohr Model and Electron Shells',
        objective: 'Arrange electrons into shells for the first twenty elements and explain how electron jumps produce emission spectra.',
        beats: [
          {
            say: "In the Bohr model, electrons occupy only certain allowed energy levels, called shells, around the nucleus. An electron may sit in shell one or shell two, but never in between. The closer the shell is to the nucleus, the lower its energy.",
            board: [
              { type: 'heading', text: 'The Bohr model' },
              { type: 'bullets', items: ['Electrons occupy fixed energy levels (n = 1, 2, 3, …)', 'Energy is quantized: no in-between orbits', 'Inner shells have lower energy'] },
            ],
          },
          {
            say: "Electrons fill the innermost shell first. The first shell holds two, and for the first twenty elements we fill the next shells with eight, then eight, then two. So oxygen, with eight electrons, has two in the first shell and six in the second, and sodium has two, eight, and one.",
            board: [
              { type: 'formula', text: 'Max electrons per shell = 2n² (2, 8, 18, …)' },
              { type: 'bullets', items: ['O (8 e⁻): 2, 6', 'Na (11 e⁻): 2, 8, 1', 'K (19 e⁻): 2, 8, 8, 1'] },
            ],
          },
          {
            say: "The electrons in the outermost shell are the valence electrons, and they decide how an atom reacts. Elements in the same group have the same number of valence electrons, which is why they behave like members of one family. Please treat valence electrons as the main dish; the inner shells are just the plate.",
            board: [
              { type: 'term', term: 'Valence electrons', def: 'Electrons in the outermost occupied shell. They take part in bonding.' },
              { type: 'callout', text: 'Li (2,1), Na (2,8,1), K (2,8,8,1): one valence electron each → similar reactions.', tone: 'example' },
            ],
          },
          {
            say: "When an electron absorbs energy, it jumps to a higher shell. When it falls back down, it releases that exact energy as light of one particular color. That is why soup that boils over onto a gas flame turns it yellow: the sodium in the salt is giving off its signature light.",
            board: [
              { type: 'steps', items: ['Electron absorbs energy', 'Jumps to a higher shell (excited state)', 'Falls back and emits a photon'] },
              { type: 'callout', text: 'Flame tests: sodium → yellow-orange, strontium → red, copper → blue-green.', tone: 'example' },
            ],
          },
          {
            say: "Now please build an atom yourself. The atom I am thinking of has two electrons in the first shell, eight in the second, and five in the third. Build it as a neutral atom.",
            board: [
              { type: 'callout', text: 'Total electrons = 2 + 8 + 5. Neutral → protons = electrons.', tone: 'tip' },
            ],
            widget: { type: 'bohr', props: { protons: 1 } },
            check: {
              prompt: 'Build the neutral atom with shells two, eight, and five.',
              expect: { protons: 15, electrons: 15 },
              hint: "Add the electrons in all three shells. A neutral atom has the same number of protons as electrons.",
              praise: "Correct. Fifteen protons and fifteen electrons: phosphorus, with five valence electrons. A model answer.",
            },
          },
        ],
      },
      {
        id: '3.3',
        title: 'Periodic Trends',
        objective: "Use an element's position on the periodic table to predict its atomic radius, ionization energy, and electronegativity.",
        beats: [
          {
            say: "The periodic table is arranged by atomic number, and its pattern comes from electron shells. Each row, or period, adds a new shell, and each column, or group, shares the same number of valence electrons. That is why the table lets us predict properties we have never measured.",
            board: [
              { type: 'heading', text: 'Reading the periodic table' },
              { type: 'bullets', items: ['Period (row) = number of occupied shells', 'Group (column) = same valence electrons', 'Metals left, nonmetals right, metalloids on the staircase'] },
            ],
          },
          {
            say: "Atomic radius decreases from left to right across a period. Each step adds a proton, so the nucleus pulls the same shell more tightly. Moving down a group, the radius increases, because each period adds a whole new shell farther from the nucleus.",
            board: [
              { type: 'heading', text: 'Atomic radius' },
              { type: 'bullets', items: ['Across a period → smaller (more protons, same shell)', 'Down a group → larger (more shells, more shielding)'] },
            ],
          },
          {
            say: "Ionization energy is the energy needed to remove an outermost electron from a gaseous atom. Electronegativity is how strongly an atom attracts shared electrons in a bond. Both increase across a period and decrease down a group, and fluorine is the most electronegative element of all.",
            board: [
              { type: 'term', term: 'First ionization energy', def: 'Energy to remove one outermost electron from a gaseous atom.' },
              { type: 'term', term: 'Electronegativity', def: 'Attraction of an atom for shared electrons in a bond. Highest: fluorine (3.98).' },
              { type: 'callout', text: 'Both increase up and to the right. Noble gases are usually left out of electronegativity tables.', tone: 'tip' },
            ],
          },
          {
            say: "Here is how I remember it. A small atom holds its valence electrons close, the way I hold a meat bun with both hands, so it is very hard to take one away. A large atom holds its outer electrons at arm's length, so they are easy to snatch. ...I would never let anyone snatch my meat bun, of course.",
            board: [
              { type: 'callout', text: 'Small radius ↔ high ionization energy ↔ high electronegativity', tone: 'tip' },
              { type: 'bullets', items: ['Na (left of period 3): 496 kJ/mol', 'Ar (right of period 3): 1521 kJ/mol'] },
            ],
          },
          {
            say: "Let us apply the trend. Period three runs from atomic number eleven to atomic number eighteen, and one of those elements has the lowest first ionization energy. Please build a neutral atom of that element.",
            board: [
              { type: 'callout', text: 'Period 3: Z = 11 to 18', tone: 'example' },
            ],
            widget: { type: 'bohr', props: { protons: 1 } },
            check: {
              prompt: 'Build a neutral atom of the period three element with the lowest first ionization energy.',
              expect: { protons: 11, electrons: 11 },
              hint: "Ionization energy increases from left to right, so look at the very start of period three.",
              praise: "Correct. Sodium, with a single valence electron far from the nucleus. It gives that electron away very easily. Excellent.",
            },
          },
        ],
      },
      {
        id: '3.4',
        title: 'Ions and Chemical Bonding',
        objective: 'Predict ion charges from group number and distinguish ionic, covalent, and metallic bonds.',
        beats: [
          {
            say: "Atoms gain or lose electrons to reach a stable arrangement like the nearest noble gas, usually eight valence electrons. Metals lose electrons and become positive ions, called cations. Nonmetals gain electrons and become negative ions, called anions.",
            board: [
              { type: 'term', term: 'Cation', def: 'Positive ion; formed when an atom loses electrons (metals).' },
              { type: 'term', term: 'Anion', def: 'Negative ion; formed when an atom gains electrons (nonmetals).' },
              { type: 'callout', text: 'Na (2,8,1) → Na⁺ (2,8)     Cl (2,8,7) → Cl⁻ (2,8,8)', tone: 'example' },
            ],
          },
          {
            say: "The group number predicts the usual charge. Group one forms plus one ions, group two plus two, and group thirteen plus three. On the other side, group fifteen forms minus three, group sixteen minus two, and group seventeen minus one.",
            board: [
              { type: 'bullets', items: ['Group 1 → +1     Group 2 → +2     Group 13 → +3', 'Group 15 → −3     Group 16 → −2     Group 17 → −1', 'Group 18: already stable, rarely forms ions'] },
            ],
          },
          {
            say: "An ionic bond is the electrostatic attraction between cations and anions, usually a metal with a nonmetal. The ions stack into a crystal lattice, so ionic compounds like table salt have high melting points and conduct electricity when melted or dissolved. In the formula the charges must add up to zero, so magnesium chloride has two chloride ions for every magnesium ion.",
            board: [
              { type: 'term', term: 'Ionic bond', def: 'Attraction between oppositely charged ions; electrons are transferred.' },
              { type: 'bullets', items: ['Mg²⁺ + 2 Cl⁻ → MgCl₂', '2 Al³⁺ + 3 O²⁻ → Al₂O₃', 'High melting points; conduct when molten or dissolved'] },
            ],
          },
          {
            say: "When two nonmetals meet, neither can take electrons away, so they share pairs of electrons in a covalent bond, as in water or methane. If one atom is more electronegative, the sharing is unequal and the bond is polar, like two friends sharing a bento where one takes the bigger half. Metals instead pool their valence electrons into a shared sea, which is why they conduct electricity so well.",
            board: [
              { type: 'term', term: 'Covalent bond', def: 'Shared pair(s) of electrons between nonmetals, e.g. H₂O, CH₄.' },
              { type: 'term', term: 'Metallic bond', def: 'Metal cations in a sea of delocalized electrons.' },
              { type: 'callout', text: 'Unequal sharing (different electronegativities) → polar covalent bond.', tone: 'tip' },
            ],
          },
          {
            say: "Magnesium oxide is held together by ionic bonds. Please build the magnesium ion it contains. Decide first whether magnesium gains or loses electrons, and how many.",
            board: [
              { type: 'callout', text: 'Magnesium: group 2, Z = 12', tone: 'tip' },
            ],
            widget: { type: 'bohr', props: { protons: 1 } },
            check: {
              prompt: 'Build the magnesium ion found in magnesium oxide.',
              expect: { protons: 12, electrons: 10 },
              hint: "Magnesium is in group two. It gives away its two valence electrons but keeps all twelve protons.",
              praise: "Correct. Twelve protons and ten electrons, a charge of plus two, with the same shells as neon. Well done. This calls for a celebratory meat bun.",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 4,
    title: 'Reactions and Stoichiometry',
    lessons: [
      {
        id: '4.1',
        title: 'Balancing Chemical Equations',
        objective: 'Balance chemical equations by changing coefficients so every element has the same number of atoms on both sides.',
        beats: [
          {
            say: "In a chemical reaction, atoms are rearranged, never created or destroyed. This is the law of conservation of mass, and it means each element must have the same number of atoms on both sides of the equation. A recipe cannot produce more rice than you put in the pot, however much I might wish otherwise.",
            board: [
              { type: 'heading', text: 'Conservation of mass' },
              { type: 'formula', text: 'Reactants → Products' },
              { type: 'callout', text: 'Atoms in = atoms out, for every element.', tone: 'tip' },
            ],
          },
          {
            say: "We balance using coefficients, the large numbers in front of each formula. Never change the subscripts. Changing H two O to H two O two does not balance anything; it turns water into hydrogen peroxide, a completely different substance.",
            board: [
              { type: 'term', term: 'Coefficient', def: 'Number in front of a formula; it multiplies the whole molecule. 2H₂O = 4 H + 2 O.' },
              { type: 'callout', text: 'Never change subscripts: H₂O (water) ≠ H₂O₂ (hydrogen peroxide).', tone: 'warn' },
            ],
          },
          {
            say: "Let us balance hydrogen and oxygen forming water. Oxygen is two on the left but one on the right, so we place a two in front of the water. Now hydrogen is four on the right, so we place a two in front of the hydrogen, and every atom is balanced. Please try it on the balancer.",
            board: [
              { type: 'steps', items: ['H₂ + O₂ → H₂O   (O: 2 vs 1)', 'H₂ + O₂ → 2H₂O   (H: 2 vs 4)', '2H₂ + O₂ → 2H₂O   ✓'] },
            ],
            widget: { type: 'balancer', props: { equation: 'H2 + O2 -> H2O' } },
          },
          {
            say: "For combustion reactions, a reliable order is carbon first, then hydrogen, and oxygen last, because oxygen gas stands alone and is easy to adjust at the end. When you finish, make sure the coefficients are the smallest whole numbers possible. Count every atom once more before you call it done.",
            board: [
              { type: 'steps', items: ['Balance C', 'Balance H', 'Balance O last (O₂ stands alone)'] },
              { type: 'callout', text: 'Use the lowest whole-number ratio.', tone: 'tip' },
            ],
          },
          {
            say: "Now methane, the main gas in a kitchen stove, burns in oxygen to make carbon dioxide and water. Please balance it with the smallest whole numbers. Treat it like a recipe: each ingredient in exactly the right amount.",
            board: [
              { type: 'formula', text: 'CH₄ + O₂ → CO₂ + H₂O' },
            ],
            widget: { type: 'balancer', props: { equation: 'CH4 + O2 -> CO2 + H2O' } },
            check: {
              prompt: 'Balance the combustion of methane with the lowest whole-number coefficients.',
              expect: { equation: 'CH4 + O2 -> CO2 + H2O', coefficients: '1,2,1,2' },
              hint: "One carbon on each side. Four hydrogens need two waters. Then count the oxygen atoms on the right.",
              praise: "Correct. One methane and two oxygen make one carbon dioxide and two water, with four oxygen atoms on each side. Splendid.",
            },
          },
        ],
      },
      {
        id: '4.2',
        title: 'The Mole and Molar Mass',
        objective: 'Calculate molar masses from the periodic table and convert between grams, moles, and number of particles.',
        beats: [
          {
            say: "Atoms are far too small to count one by one, so chemists count them in moles. One mole is six point zero two two times ten to the twenty-third particles, which is called Avogadro's number. It is a counting unit like a dozen: a dozen meat buns is twelve, but a mole of meat buns is far more than even I could eat. ...That was not a challenge.",
            board: [
              { type: 'term', term: 'Mole (mol)', def: 'The amount of substance containing 6.022 × 10²³ particles.' },
              { type: 'formula', text: 'N_A = 6.022 × 10²³ particles per mole' },
            ],
          },
          {
            say: "Molar mass is the mass of one mole of a substance, in grams per mole. For an element, it equals the atomic mass on the periodic table. For a compound, add up the atoms: water has two hydrogens at one point zero zero eight and one oxygen at sixteen, for eighteen point zero two grams per mole.",
            board: [
              { type: 'term', term: 'Molar mass (M)', def: 'Mass of one mole, in g/mol.' },
              { type: 'formula', text: 'M(H₂O) = 2(1.008) + 16.00 = 18.02 g/mol' },
              { type: 'formula', text: 'M(CO₂) = 12.01 + 2(16.00) = 44.01 g/mol' },
            ],
          },
          {
            say: "To convert grams to moles, divide by the molar mass. To convert moles to particles, multiply by Avogadro's number. So thirty-six point zero four grams of water is two moles, which is about one point two times ten to the twenty-fourth molecules.",
            board: [
              { type: 'steps', items: ['grams', '÷ molar mass → moles', '× 6.022 × 10²³ → particles'] },
              { type: 'callout', text: '36.04 g H₂O ÷ 18.02 g/mol = 2.000 mol ≈ 1.204 × 10²⁴ molecules', tone: 'example' },
            ],
          },
          {
            say: "Glucose, the sugar in a sweet bun, is C six H twelve O six. Six carbons, twelve hydrogens, and six oxygens give a molar mass of about one hundred eighty point one six grams per mole. Therefore ninety point zero eight grams of glucose is exactly half a mole. Please keep the units in every line of your working.",
            board: [
              { type: 'formula', text: 'M(C₆H₁₂O₆) = 6(12.01) + 12(1.008) + 6(16.00) = 180.16 g/mol' },
              { type: 'callout', text: '90.08 g ÷ 180.16 g/mol = 0.5000 mol', tone: 'example' },
            ],
          },
          {
            say: "Now a problem for you. How many moles of carbon dioxide are in eighty-eight point zero two grams? We found its molar mass a moment ago.",
            board: [
              { type: 'formula', text: 'moles = mass ÷ molar mass' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'How many moles are in 88.02 g of CO₂ (M = 44.01 g/mol)?',
                options: ['0.500 mol', '132 mol', '3874 mol', '2.000 mol'],
                answer: 3,
              },
            },
            check: {
              prompt: 'Choose the number of moles of carbon dioxide.',
              expect: { choice: 3 },
              hint: "Divide the mass in grams by forty-four point zero one grams per mole.",
              praise: "Correct. Exactly two moles. Grams divided by grams per mole leaves moles, so the units confirm your answer. Excellent.",
            },
          },
        ],
      },
      {
        id: '4.3',
        title: 'Stoichiometric Ratios',
        objective: 'Use the coefficients of a balanced equation as mole ratios to convert between amounts of reactants and products.',
        beats: [
          {
            say: "A balanced equation is a recipe written in moles. In the Haber process, one mole of nitrogen reacts with three moles of hydrogen to make two moles of ammonia. Just as a curry recipe might call for one onion for every three potatoes, the coefficients fix the ratio.",
            board: [
              { type: 'formula', text: 'N₂ + 3H₂ → 2NH₃' },
              { type: 'term', term: 'Mole ratio', def: 'Ratio of coefficients in a balanced equation, e.g. 3 mol H₂ : 2 mol NH₃.' },
              { type: 'callout', text: 'Coefficients give mole ratios, not mass ratios.', tone: 'warn' },
            ],
          },
          {
            say: "To convert, multiply by a mole ratio with the wanted substance on top and the given substance on the bottom. Six moles of hydrogen times two moles of ammonia over three moles of hydrogen gives four moles of ammonia. Notice how the moles of hydrogen cancel, leaving moles of ammonia.",
            board: [
              { type: 'formula', text: '6.0 mol H₂ × (2 mol NH₃ ÷ 3 mol H₂) = 4.0 mol NH₃' },
              { type: 'callout', text: 'Wanted on top, given on the bottom.', tone: 'tip' },
            ],
          },
          {
            say: "For masses, we take three steps: grams to moles, moles to moles using the ratio, then moles back to grams. Twenty-eight point zero one grams of nitrogen is one mole, which makes two moles of ammonia. At seventeen point zero three grams per mole, that is thirty-four point zero six grams of ammonia.",
            board: [
              { type: 'steps', items: ['grams A → moles A (÷ M)', 'moles A → moles B (mole ratio)', 'moles B → grams B (× M)'] },
              { type: 'callout', text: '28.01 g N₂ → 1.000 mol N₂ → 2.000 mol NH₃ → 34.06 g NH₃', tone: 'example' },
            ],
          },
          {
            say: "Let us check with conservation of mass. One mole of nitrogen plus three moles of hydrogen weigh twenty-eight point zero one plus six point zero five, which is thirty-four point zero six grams, exactly the mass of ammonia produced. When the numbers agree like this, I feel almost as satisfied as after a large lunch.",
            board: [
              { type: 'formula', text: '28.01 g N₂ + 6.05 g H₂ = 34.06 g NH₃' },
              { type: 'callout', text: 'Mass in = mass out. Moles need not match: 4 mol in, 2 mol out.', tone: 'tip' },
            ],
          },
          {
            say: "Now a camping stove. Propane, C three H eight, burns in oxygen to make carbon dioxide and water. Please balance it with the smallest whole numbers, and then you will know how many moles of oxygen one mole of propane needs.",
            board: [
              { type: 'formula', text: 'C₃H₈ + O₂ → CO₂ + H₂O' },
            ],
            widget: { type: 'balancer', props: { equation: 'C3H8 + O2 -> CO2 + H2O' } },
            check: {
              prompt: 'Balance the combustion of propane with the lowest whole-number coefficients.',
              expect: { equation: 'C3H8 + O2 -> CO2 + H2O', coefficients: '1,5,3,4' },
              hint: "Three carbons make three carbon dioxides, and eight hydrogens make four waters. Then count the oxygen atoms on the right and halve that number.",
              praise: "Correct. One propane needs five oxygen and makes three carbon dioxide and four water. The mole ratio of oxygen to propane is five to one. Well done.",
            },
          },
        ],
      },
      {
        id: '4.4',
        title: 'Limiting Reactant and Percent Yield',
        objective: 'Identify the limiting reactant, calculate the theoretical yield, and find the percent yield of a reaction.',
        beats: [
          {
            say: "Suppose each plate of curry needs one portion of rice and two ladles of curry. If I have five portions of rice but only eight ladles of curry, I can serve just four plates, and one portion of rice is left over. The curry is the limiting reactant: it runs out first and decides how much product forms. ...Running out of curry is a tragedy, but a scientific one.",
            board: [
              { type: 'term', term: 'Limiting reactant', def: 'The reactant used up first; it determines the maximum amount of product.' },
              { type: 'term', term: 'Excess reactant', def: 'The reactant left over when the reaction stops.' },
              { type: 'callout', text: '5 rice + 8 ladles (2 per plate) → 4 plates; 1 rice left over.', tone: 'example' },
            ],
          },
          {
            say: "In chemistry we compare reactants in moles, never in grams. Take hydrogen burning to make water, with four moles of hydrogen and three moles of oxygen. Four moles of hydrogen can make four moles of water, but three moles of oxygen could make six, so hydrogen is the limiting reactant.",
            board: [
              { type: 'formula', text: '2H₂ + O₂ → 2H₂O' },
              { type: 'bullets', items: ['4.00 mol H₂ × (2 H₂O ÷ 2 H₂) = 4.00 mol H₂O', '3.00 mol O₂ × (2 H₂O ÷ 1 O₂) = 6.00 mol H₂O', 'Smaller amount → H₂ is limiting'] },
            ],
            widget: { type: 'balancer', props: { equation: 'H2 + O2 -> H2O' } },
          },
          {
            say: "The theoretical yield is the most product the limiting reactant allows. Four moles of water times eighteen point zero two grams per mole is seventy-two point one grams. Only two of the three moles of oxygen are used, so one mole of oxygen remains in excess.",
            board: [
              { type: 'term', term: 'Theoretical yield', def: 'Maximum product predicted from the limiting reactant.' },
              { type: 'formula', text: '4.00 mol × 18.02 g/mol = 72.1 g H₂O' },
              { type: 'callout', text: 'O₂ used: 2.00 mol; left over: 1.00 mol.', tone: 'tip' },
            ],
          },
          {
            say: "In a real laboratory we rarely collect the full amount, because of side reactions, incomplete reactions, or product lost during transfer. Percent yield equals the actual yield divided by the theoretical yield, times one hundred percent. If we collect sixty-four point nine grams of water, the percent yield is ninety percent.",
            board: [
              { type: 'formula', text: 'percent yield = (actual ÷ theoretical) × 100%' },
              { type: 'callout', text: '(64.9 g ÷ 72.1 g) × 100% = 90.0%', tone: 'example' },
              { type: 'callout', text: 'Over 100% usually means the product is wet or impure.', tone: 'warn' },
            ],
          },
          {
            say: "Now please identify the limiting reactant yourself. This time we have six moles of hydrogen and two moles of oxygen. Calculate how much water each reactant could make, and choose the smaller amount.",
            board: [
              { type: 'callout', text: 'Compare in moles of product, using the mole ratios.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: '2H₂ + O₂ → 2H₂O with 6.0 mol H₂ and 2.0 mol O₂. Which is limiting, and how much water forms?',
                options: ['O₂ is limiting; 4.0 mol H₂O', 'H₂ is limiting; 6.0 mol H₂O', 'O₂ is limiting; 2.0 mol H₂O', 'H₂ is limiting; 3.0 mol H₂O'],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the limiting reactant and the amount of water.',
              expect: { choice: 0 },
              hint: "Each mole of oxygen makes two moles of water, and each mole of hydrogen makes one.",
              praise: "Correct. Oxygen runs out first, giving four moles of water, with two moles of hydrogen left over. A model answer.",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 5,
    title: 'Cellular Energetics and Genetics',
    lessons: [
      {
        id: '5.1',
        title: 'Photosynthesis',
        objective: 'Describe how chloroplasts convert light energy into chemical energy stored in glucose, and trace where the reactants and products go.',
        beats: [
          {
            say: "Photosynthesis converts light energy into chemical energy stored in sugar. Plants take in six carbon dioxide molecules and six water molecules and, using light, make one glucose and six oxygen molecules. In other words, plants cook their own meals from air and water. I find that deeply admirable.",
            board: [
              { type: 'heading', text: 'Photosynthesis' },
              { type: 'formula', text: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂' },
              { type: 'callout', text: 'Light energy → chemical energy stored in the bonds of glucose.', tone: 'tip' },
            ],
          },
          {
            say: "Photosynthesis happens in the chloroplast. Inside are stacks of flattened sacs called thylakoids, whose membranes hold chlorophyll, and around them is a fluid called the stroma. Chlorophyll absorbs mostly red and blue light and reflects green, which is why leaves look green.",
            board: [
              { type: 'term', term: 'Thylakoid', def: 'Membrane sac containing chlorophyll; stacked into grana. Site of the light-dependent reactions.' },
              { type: 'term', term: 'Stroma', def: 'Fluid around the thylakoids. Site of the Calvin cycle.' },
            ],
          },
          {
            say: "In the light-dependent reactions, light energizes electrons in chlorophyll, and water is split to replace them. Splitting water releases oxygen gas as a by-product. The energized electrons pass along an electron transport chain, which helps produce ATP and NADPH, the energy carriers for the next stage.",
            board: [
              { type: 'heading', text: 'Light-dependent reactions (thylakoid membrane)' },
              { type: 'steps', items: ['Light excites electrons in photosystems II and I', 'Water is split → O₂ released', 'ATP and NADPH are made'] },
            ],
          },
          {
            say: "The Calvin cycle takes place in the stroma. The enzyme rubisco attaches carbon dioxide to a five-carbon sugar, and the cycle spends ATP and NADPH to build a three-carbon sugar called G three P, which the plant uses to make glucose. The light reactions charge the batteries; the Calvin cycle does the actual cooking.",
            board: [
              { type: 'heading', text: 'Calvin cycle (stroma)' },
              { type: 'bullets', items: ['Carbon fixation: rubisco adds CO₂ to RuBP', 'ATP + NADPH reduce it to G3P', 'G3P → glucose and other sugars'] },
              { type: 'callout', text: 'It needs no light directly, but it depends on ATP and NADPH made in the light.', tone: 'tip' },
            ],
          },
          {
            say: "Now a question that many students miss. When a plant releases oxygen gas, which molecule did those oxygen atoms come from? Think back to what was split in the thylakoids.",
            board: [
              { type: 'heading', text: 'Follow the atoms' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'The O₂ released during photosynthesis comes from which molecule?',
                options: ['Water', 'Carbon dioxide', 'Glucose', 'Chlorophyll'],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the source of the oxygen gas.',
              expect: { choice: 0 },
              hint: "The oxygen is released when the light-dependent reactions split a molecule in the thylakoid.",
              praise: "Correct. The oxygen comes from water, while the carbon from carbon dioxide ends up in the sugar. Splendid.",
            },
          },
        ],
      },
      {
        id: '5.2',
        title: 'Cellular Respiration',
        objective: 'Trace how glycolysis, the Krebs cycle, and oxidative phosphorylation release the energy in glucose as ATP.',
        beats: [
          {
            say: "Cellular respiration is how cells release the energy stored in food. Glucose and oxygen become carbon dioxide and water, and the energy released is captured as ATP, the energy currency of the cell. It is photosynthesis in reverse, and yes, it is the process that turns meat buns into study power.",
            board: [
              { type: 'formula', text: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP)' },
              { type: 'term', term: 'ATP', def: 'Adenosine triphosphate: the molecule cells spend for energy.' },
            ],
          },
          {
            say: "Stage one is glycolysis, in the cytoplasm. One glucose is split into two pyruvate molecules, giving a net gain of two ATP and two NADH. Glycolysis does not need oxygen, which makes it very ancient and very reliable.",
            board: [
              { type: 'heading', text: 'Glycolysis (cytoplasm)' },
              { type: 'bullets', items: ['Glucose → 2 pyruvate', 'Net: 2 ATP + 2 NADH', 'No oxygen required'] },
            ],
          },
          {
            say: "Next, in the mitochondrial matrix, each pyruvate is converted to acetyl coenzyme A, and the Krebs cycle, also called the citric acid cycle, breaks it down completely. Carbon dioxide is released here, and the cycle loads electrons onto NADH and FADH two. Only two more ATP are made directly in this stage.",
            board: [
              { type: 'heading', text: 'Pyruvate oxidation + Krebs cycle (matrix)' },
              { type: 'bullets', items: ['Pyruvate → acetyl-CoA + CO₂', 'Krebs cycle releases the remaining carbon as CO₂', 'Per glucose: 2 ATP, 8 NADH, 2 FADH₂, 6 CO₂'] },
            ],
          },
          {
            say: "The final stage, oxidative phosphorylation, happens on the inner mitochondrial membrane. The electron transport chain uses electrons from NADH and FADH two to pump hydrogen ions, which flow back through ATP synthase and make most of the ATP, about thirty to thirty-two per glucose in total. At the end of the chain, oxygen accepts the electrons and forms water.",
            board: [
              { type: 'heading', text: 'Oxidative phosphorylation (inner membrane)' },
              { type: 'steps', items: ['ETC pumps H⁺ into the intermembrane space', 'H⁺ flows back through ATP synthase (chemiosmosis)', 'O₂ + electrons + H⁺ → H₂O'] },
              { type: 'callout', text: 'Total: about 30–32 ATP per glucose.', tone: 'tip' },
            ],
          },
          {
            say: "Without oxygen, the chain stops, and cells fall back on fermentation, which regenerates the molecules glycolysis needs. Yeast fermentation releases the carbon dioxide that makes bread dough rise, and your muscles make lactic acid during a hard sprint. Now, please tell me exactly what oxygen does in respiration.",
            board: [
              { type: 'callout', text: 'Fermentation: yeast → ethanol + CO₂ (bread rises); muscle → lactic acid.', tone: 'example' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'What is the role of O₂ in cellular respiration?',
                options: [
                  'It is the final electron acceptor of the electron transport chain',
                  'It splits glucose during glycolysis',
                  'It is released by the Krebs cycle',
                  'It provides the carbon atoms for CO₂',
                ],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the role of oxygen.',
              expect: { choice: 0 },
              hint: "Oxygen appears at the very end of the electron transport chain, and it ends up in water.",
              praise: "Correct. Oxygen is the final electron acceptor. Without it the whole chain backs up, like a cafeteria line with no one at the register. Excellent.",
            },
          },
        ],
      },
      {
        id: '5.3',
        title: 'DNA Replication and Protein Synthesis',
        objective: "Explain how DNA copies itself and how a gene's code is transcribed into mRNA and translated into a protein.",
        beats: [
          {
            say: "DNA is a double helix made of nucleotides. Each nucleotide has a sugar, a phosphate, and one of four bases, and the bases pair by a strict rule: adenine with thymine, and guanine with cytosine. The two strands run in opposite directions, which we call antiparallel.",
            board: [
              { type: 'heading', text: 'DNA structure' },
              { type: 'bullets', items: ['Nucleotide = deoxyribose + phosphate + base', 'Base pairs: A–T, G–C', 'Strands are antiparallel (5′→3′ beside 3′→5′)'] },
            ],
          },
          {
            say: "Before a cell divides, it copies its DNA. Helicase unzips the helix, and DNA polymerase builds a new strand against each old one, adding nucleotides only in the five prime to three prime direction. Each new double helix keeps one old strand and one new strand, so replication is called semiconservative.",
            board: [
              { type: 'steps', items: ['Helicase unzips the helix', 'Primase lays an RNA primer', 'DNA polymerase builds 5′→3′', 'Ligase joins Okazaki fragments on the lagging strand'] },
              { type: 'term', term: 'Semiconservative replication', def: 'Each new DNA molecule keeps one original strand and one new strand.' },
            ],
          },
          {
            say: "The central dogma says information flows from DNA to RNA to protein. In transcription, RNA polymerase reads the template strand of a gene and builds a complementary messenger RNA. RNA uses uracil instead of thymine, so an adenine in DNA pairs with uracil in the message.",
            board: [
              { type: 'formula', text: 'DNA → mRNA → protein' },
              { type: 'term', term: 'Transcription', def: 'RNA polymerase builds mRNA from a DNA template strand (in the nucleus). U replaces T.' },
              { type: 'callout', text: 'In eukaryotes, introns are spliced out before the mRNA leaves the nucleus.', tone: 'tip' },
            ],
          },
          {
            say: "In translation, a ribosome reads the messenger RNA three bases at a time, and each group of three is a codon. Transfer RNA brings the matching amino acid, using its anticodon to pair with the codon. Translation begins at the start codon A U G, for methionine, and ends at a stop codon. DNA is the recipe book, messenger RNA is the copied recipe card, and the ribosome is the kitchen.",
            board: [
              { type: 'term', term: 'Codon', def: 'Three mRNA bases that code for one amino acid (or stop).' },
              { type: 'bullets', items: ['Start: AUG (methionine)', 'Stop: UAA, UAG, UGA', 'tRNA anticodon pairs with the codon'] },
            ],
          },
          {
            say: "Now please transcribe a short gene. The template strand reads T A C, then G G C, from the three prime end to the five prime end. Pair each base carefully, and remember the rule about thymine.",
            board: [
              { type: 'callout', text: 'Template → mRNA: A → U, T → A, G → C, C → G', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'A DNA template strand reads 3′-TAC GGC-5′. Which mRNA is transcribed (written 5′→3′)?',
                options: ['UAC GGC', 'AUG CCG', 'ATG CCG', 'TAC GGC'],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose the messenger RNA sequence.',
              expect: { choice: 1 },
              hint: "Pair each base with its partner, and write uracil wherever the template has adenine.",
              praise: "Correct. A U G, then C C G: the start codon for methionine, followed by proline. You transcribed it like a careful scribe.",
            },
          },
        ],
      },
      {
        id: '5.4',
        title: 'Mendelian Genetics and Punnett Squares',
        objective: 'Use Punnett squares to predict the genotype and phenotype ratios of offspring from single-gene crosses.',
        beats: [
          {
            say: "A gene is a stretch of DNA for a trait, and alleles are the different versions of that gene. Your genotype is the pair of alleles you carry, and your phenotype is the trait you actually show. A dominant allele, written with a capital letter, masks a recessive allele, written in lowercase.",
            board: [
              { type: 'term', term: 'Genotype', def: 'The alleles an organism carries, e.g. PP, Pp, pp.' },
              { type: 'term', term: 'Phenotype', def: 'The observable trait, e.g. purple or white flowers.' },
              { type: 'bullets', items: ['Homozygous: two identical alleles (PP or pp)', 'Heterozygous: two different alleles (Pp)'] },
            ],
          },
          {
            say: "Gregor Mendel studied pea plants and found two laws. By the law of segregation, the two alleles for a gene separate during meiosis, so each gamete carries only one. By the law of independent assortment, genes on different chromosomes are sorted into gametes independently of each other.",
            board: [
              { type: 'term', term: 'Law of segregation', def: 'Each gamete receives one allele of each gene.' },
              { type: 'term', term: 'Law of independent assortment', def: 'Alleles of different genes (on different chromosomes) separate independently.' },
            ],
          },
          {
            say: "A Punnett square organizes every combination. Put one parent's alleles along the top and the other parent's down the side, then fill each box like a bento compartment. For two heterozygous purple plants, we get one P P, two P p, and one p p, so three purple plants for every one white.",
            board: [
              { type: 'heading', text: 'Pp × Pp' },
              { type: 'bullets', items: ['Boxes: PP, Pp, Pp, pp', 'Genotype ratio 1 PP : 2 Pp : 1 pp', 'Phenotype ratio 3 purple : 1 white'] },
            ],
          },
          {
            say: "If a purple plant could be P P or P p, we perform a test cross with a homozygous recessive plant. If any white offspring appear, the purple parent must be heterozygous. For two genes at once, multiply the probabilities: the chance of a double recessive from two double heterozygotes is one quarter times one quarter, or one sixteenth.",
            board: [
              { type: 'term', term: 'Test cross', def: 'Cross an organism showing the dominant phenotype with a homozygous recessive (pp).' },
              { type: 'formula', text: 'AaBb × AaBb → 9 : 3 : 3 : 1' },
              { type: 'formula', text: 'P(aabb) = ¼ × ¼ = 1/16' },
            ],
          },
          {
            say: "Now a test cross for you. A heterozygous purple plant, P p, is crossed with a white plant, p p. What fraction of the offspring should have white flowers?",
            board: [
              { type: 'callout', text: 'Draw the 2 × 2 square: P and p along the top, p and p down the side.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Purple (P) is dominant to white (p). Pp × pp: what fraction of the offspring is expected to be white?',
                options: ['0', '1/4', '1/2', '3/4'],
                answer: 2,
              },
            },
            check: {
              prompt: 'Choose the expected fraction of white offspring.',
              expect: { choice: 2 },
              hint: "The p p parent can only pass on p. The P p parent passes on P half the time and p half the time.",
              praise: "Correct. One half: two boxes of P p and two of p p. Your square was as neat as a well-packed bento.",
            },
          },
        ],
      },
    ],
  },
]
