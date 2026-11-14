// Ichika Nakano — Mathematics course (numbered lessons + live whiteboard).
// Format: see ./README.md. Lesson ids are permanent once shipped: never renumber or reuse one.

export default [
  {
    unit: 1,
    title: "Linear Functions and Inequalities",
    lessons: [
      {
        id: "1.1",
        title: "Slope as a Rate of Change",
        objective: "Compute slope from two points or a context, interpret it as a rate of change, and graph a line from its slope and initial value.",
        beats: [
          {
            say: "Welcome to rehearsal~ Our first scene is slope, which tells you how fast one quantity changes compared to another. Slope is rise over run: the change in y divided by the change in x. Onee-san likes to call it the tempo of the line.",
            board: [
              { type: "heading", text: "Slope = rate of change" },
              { type: "formula", text: "m = (y₂ − y₁) / (x₂ − x₁) = Δy / Δx" },
              { type: "term", term: "Rate of change", def: "How much the output changes for each 1-unit increase in the input." },
            ],
          },
          {
            say: "Let's run a line together. Take the point where x is 1 and y is 2, and the point where x is 4 and y is 8. The rise is 6 and the run is 3, so the slope is 2: every step right, y climbs by two, like a steady drumbeat.",
            board: [
              { type: "steps", items: ["(1, 2) and (4, 8)", "rise: 8 − 2 = 6", "run: 4 − 1 = 3", "m = 6 ÷ 3 = 2"] },
              { type: "callout", text: "Subtract in the same order on top and bottom.", tone: "warn" },
            ],
          },
          {
            say: "A positive slope climbs as you read left to right, and a negative slope falls. Zero slope is a flat horizontal line. A vertical line has an undefined slope because its run is zero, fufu, the actress who refuses to cross the stage.",
            board: [
              { type: "bullets", items: ["m > 0: increasing", "m < 0: decreasing", "m = 0: horizontal line y = c", "undefined: vertical line x = c"] },
            ],
          },
          {
            say: "In a story problem, slope carries units. If a taxi charges 3 dollars to start plus 2 dollars per mile, the slope is 2 dollars per mile. The starting value, the cost at zero miles, is 3 dollars, and that is the y-intercept, where the line crosses the y-axis.",
            board: [
              { type: "formula", text: "cost = 2 · miles + 3" },
              { type: "term", term: "Initial value (y-intercept)", def: "The output when the input is 0: the point (0, b)." },
            ],
            widget: { type: "coordPlane", props: { mode: "linear", initial: { m: 1, b: 0 } } },
          },
          {
            say: "Your turn on stage. A line passes through the point zero, negative 3 and the point 4, 5. Find its rise over run, notice where it crosses the y-axis, and set the sliders on the board.",
            board: [
              { type: "callout", text: "Points: (0, −3) and (4, 5)", tone: "example" },
              { type: "formula", text: "m = (5 − (−3)) / (4 − 0)" },
            ],
            check: {
              prompt: "Make the line through (0, −3) and (4, 5): set its slope m and y-intercept b.",
              expect: { mode: "linear", m: 2, b: -3 },
              hint: "The rise is 5 minus negative 3, which is 8, over a run of 4. The point where x is zero gives you the y-intercept.",
              praise: "Slope 2, intercept negative 3. Perfect take, no reshoots needed~",
            },
          },
        ],
      },
      {
        id: "1.2",
        title: "Slope-Intercept and Point-Slope Form",
        objective: "Write the equation of a line in slope-intercept or point-slope form from a slope and a point, from two points, or from a parallel or perpendicular condition.",
        beats: [
          {
            say: "Scene two, and the script reads y equals m x plus b. The m is the slope and the b is the y-intercept, so the whole graph is written right there. For y equals negative 2 x plus 5, start at 5 on the y-axis, then go down 2 for every 1 step right.",
            board: [
              { type: "formula", text: "y = mx + b" },
              { type: "bullets", items: ["m = slope", "b = y-intercept, the point (0, b)", "y = −2x + 5: start at (0, 5), down 2, right 1"] },
            ],
          },
          {
            say: "When the director hands you a slope and any point, not just the intercept, use point-slope form. It reads y minus y one equals m times the quantity x minus x one, where x one, y one is your known point. Watch the signs: a negative coordinate turns that minus into a plus.",
            board: [
              { type: "formula", text: "y − y₁ = m(x − x₁)" },
              { type: "callout", text: "Point (−2, 3), m = 4 → y − 3 = 4(x + 2)", tone: "example" },
            ],
          },
          {
            say: "Given two points, find the slope first, then plug either point into point-slope form and simplify. Through 1, 3 and 3, 7, the slope is 4 over 2, which is 2. Then y minus 3 equals 2 times x minus 1, so y equals 2 x plus 1.",
            board: [
              { type: "steps", items: ["(1, 3), (3, 7) → m = 4/2 = 2", "y − 3 = 2(x − 1)", "y = 2x − 2 + 3", "y = 2x + 1"] },
            ],
          },
          {
            say: "Two more casting rules. Parallel lines share the same slope, like twins in matching costumes. Perpendicular lines have slopes that are negative reciprocals: flip the fraction, change the sign, and their product is negative 1.",
            board: [
              { type: "bullets", items: ["Parallel: m₁ = m₂", "Perpendicular: m₁ · m₂ = −1", "m = 2 is perpendicular to m = −½"] },
            ],
            widget: { type: "coordPlane", props: { mode: "linear", initial: { m: 1, b: 0 } } },
          },
          {
            say: "Final scene for this lesson. Build the line that passes through the point negative 1, 4 and is perpendicular to y equals 2 x plus 7. Flip, change the sign, then let point-slope form find the intercept for you.",
            board: [
              { type: "callout", text: "Perpendicular to y = 2x + 7, through (−1, 4)", tone: "example" },
              { type: "formula", text: "y − 4 = m(x + 1)" },
            ],
            check: {
              prompt: "Graph the line through (−1, 4) that is perpendicular to y = 2x + 7.",
              expect: { mode: "linear", m: -0.5, b: 3.5 },
              hint: "The perpendicular slope is negative one half. Then y minus 4 equals negative one half times x plus 1, so the intercept is 4 minus one half.",
              praise: "Slope negative one half, intercept three point five. Fufu, you followed the stage directions perfectly~",
            },
          },
        ],
      },
      {
        id: "1.3",
        title: "Solving Systems of Linear Equations",
        objective: "Solve a system of two linear equations by graphing, substitution, or elimination, and decide whether it has one, no, or infinitely many solutions.",
        beats: [
          {
            say: "A system is two equations sharing the same stage, and a solution is an ordered pair that makes both true at once. On a graph, that is exactly where the two lines cross. Think of it as the one moment two actors hit the same mark.",
            board: [
              { type: "term", term: "Solution of a system", def: "An ordered pair (x, y) that makes every equation in the system true." },
              { type: "heading", text: "Graphically: the intersection point" },
            ],
          },
          {
            say: "Method one is substitution. If one equation already says y equals something, slide that expression into the other equation. With y equals 2 x minus 1 and x plus y equals 5, we get 3 x minus 1 equals 5, so x is 2 and y is 3.",
            board: [
              { type: "steps", items: ["y = 2x − 1 and x + y = 5", "x + (2x − 1) = 5", "3x = 6 → x = 2", "y = 2(2) − 1 = 3 → (2, 3)"] },
            ],
          },
          {
            say: "Method two is elimination. Line the equations up, then add or subtract them so one variable disappears. Adding x plus y equals 5 to x minus y equals 1 cancels y, giving 2 x equals 6, so x is 3 and y is 2.",
            board: [
              { type: "formula", text: "(x + y) + (x − y) = 5 + 1 → 2x = 6" },
              { type: "callout", text: "If nothing cancels yet, multiply one equation by a constant first.", tone: "tip" },
            ],
          },
          {
            say: "Not every scene ends with a meeting. Different slopes give exactly one solution, equal slopes with different intercepts give parallel lines and no solution, and the same line twice gives infinitely many. In algebra, no solution shows up as a false statement like 0 equals 4, and infinitely many shows up as 0 equals 0.",
            board: [
              { type: "bullets", items: ["Different slopes → exactly one solution", "Same slope, different b → no solution", "Same line → infinitely many solutions"] },
            ],
          },
          {
            say: "Now combine your skills. Take the system x plus y equals 5 and x minus y equals 1 that we just solved. Graph the line with slope one point five that passes through its solution.",
            board: [
              { type: "callout", text: "Slope 1.5, through the solution of x + y = 5 and x − y = 1", tone: "example" },
            ],
            widget: { type: "coordPlane", props: { mode: "linear", initial: { m: 0, b: 0 } } },
            check: {
              prompt: "Graph the line with slope 1.5 through the solution of x + y = 5 and x − y = 1.",
              expect: { mode: "linear", m: 1.5, b: -2.5 },
              hint: "The solution of the system is the point 3, 2. Use y minus 2 equals one point five times x minus 3, and one point five times 3 is four point five.",
              praise: "Slope one point five, intercept negative two point five. Two methods, one flawless performance~",
            },
          },
        ],
      },
      {
        id: "1.4",
        title: "Linear Inequalities in Two Variables",
        objective: "Graph a linear inequality with the correct boundary line and shading, verify with a test point, and reverse the symbol when multiplying or dividing by a negative.",
        beats: [
          {
            say: "An inequality is a scene with a whole crowd of solutions, not just one. The graph of y greater than 2 x minus 1 is every point above the line y equals 2 x minus 1. That line is the boundary, the edge of the stage.",
            board: [
              { type: "formula", text: "y > 2x − 1" },
              { type: "term", term: "Boundary line", def: "The line y = 2x − 1, which separates solutions from non-solutions." },
            ],
            widget: { type: "coordPlane", props: { mode: "linear", initial: { m: 2, b: -1 } } },
          },
          {
            say: "Strict symbols, greater than or less than, get a dashed boundary because points on the line are not solutions. The or-equal-to symbols get a solid line. Once y is isolated, greater than shades above the line and less than shades below.",
            board: [
              { type: "bullets", items: ["< or > : dashed line", "≤ or ≥ : solid line", "y > … shade above · y < … shade below"] },
            ],
          },
          {
            say: "If you are ever unsure, try a test point that is not on the line, and the origin is onee-san's favorite. For y greater than 2 x minus 1, plugging in zero, zero gives 0 greater than negative 1, which is true. So the side containing the origin gets shaded.",
            board: [
              { type: "steps", items: ["Test (0, 0)", "0 > 2(0) − 1 → 0 > −1", "True → shade the side containing (0, 0)"] },
            ],
          },
          {
            say: "Here is the plot twist every exam loves. When you multiply or divide both sides of an inequality by a negative number, the symbol reverses. Dividing negative 3 x less than 12 by negative 3 gives x greater than negative 4.",
            board: [
              { type: "callout", text: "Multiply or divide by a negative → flip the symbol.", tone: "warn" },
              { type: "formula", text: "−3x < 12 → x > −4" },
            ],
          },
          {
            say: "Your audition piece. Solve this inequality for y, and do not forget the plot twist when you divide by a negative number.",
            board: [
              { type: "formula", text: "−2y > 6x − 8" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Solve −2y > 6x − 8 for y.",
                options: ["y > −3x + 4", "y < −3x + 4", "y < 3x − 4", "y > 3x + 4"],
                answer: 1,
              },
            },
            check: {
              prompt: "Pick the inequality you get after solving for y.",
              expect: { choice: 1 },
              hint: "Divide every term by negative 2. Six x over negative 2 is negative 3 x, negative 8 over negative 2 is 4, and the symbol flips.",
              praise: "Y is less than negative 3 x plus 4. You caught the plot twist, bravo~",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 2,
    title: "Quadratic Functions and Equations",
    lessons: [
      {
        id: "2.1",
        title: "Vertex Form and Transformations of Quadratic Functions",
        objective: "Read and write a quadratic in vertex form y = a(x − h)² + k and describe how a, h, and k transform the parent graph y = x².",
        beats: [
          {
            say: "New act: the parabola. The parent function is y equals x squared, a U shape with its vertex at the origin and the y-axis as its line of symmetry. Every quadratic is this same actress in a different costume.",
            board: [
              { type: "formula", text: "y = x²" },
              { type: "bullets", items: ["Vertex (0, 0)", "Axis of symmetry: x = 0", "Opens up"] },
            ],
            widget: { type: "coordPlane", props: { mode: "quadratic", initial: { a: 1, h: 0, k: 0 } } },
          },
          {
            say: "Vertex form is y equals a times the quantity x minus h, squared, plus k. The vertex sits at the point h, k, and the axis of symmetry is the vertical line x equals h. Careful, x minus 3 inside moves the graph right 3, and x plus 3 moves it left 3.",
            board: [
              { type: "formula", text: "y = a(x − h)² + k" },
              { type: "term", term: "Vertex", def: "(h, k): the minimum or maximum point of the parabola." },
              { type: "callout", text: "Inside the parentheses the shift reads opposite: (x − 3)² moves right 3.", tone: "warn" },
            ],
          },
          {
            say: "The a value is the director's stretch. If a is negative, the parabola reflects over the x-axis and opens down. If the absolute value of a is greater than 1, it is a vertical stretch and looks narrower, and between 0 and 1 it is a compression and looks wider.",
            board: [
              { type: "bullets", items: ["a > 0: opens up (minimum)", "a < 0: opens down (maximum)", "|a| > 1: narrower · 0 < |a| < 1: wider"] },
            ],
          },
          {
            say: "Let's read one together. Negative one half times the quantity x plus 4, squared, plus 6 has its vertex at negative 4, 6. It opens down and is wider than the parent, so its maximum value is 6.",
            board: [
              { type: "steps", items: ["y = −½(x + 4)² + 6", "h = −4, k = 6 → vertex (−4, 6)", "a = −½ → opens down, wider", "Maximum value: 6"] },
            ],
          },
          {
            say: "Now you direct. Take the parent parabola, reflect it over the x-axis, stretch it vertically by a factor of 2, then shift it right 3 and down 2. Set a, h, and k to match.",
            board: [
              { type: "steps", items: ["Reflect + stretch × 2 → a", "Right 3 → h", "Down 2 → k"] },
            ],
            check: {
              prompt: "Transform y = x²: reflect over the x-axis, stretch vertically by 2, shift right 3 and down 2.",
              expect: { mode: "quadratic", a: -2, h: 3, k: -2 },
              hint: "Reflecting and stretching by 2 makes a equal to negative 2. Right 3 means h is positive 3, and down 2 means k is negative 2.",
              praise: "Vertex at 3, negative 2, opening down and narrow. Fufu, it hit its mark perfectly~",
            },
          },
        ],
      },
      {
        id: "2.2",
        title: "Factoring Quadratics and Finding Zeros",
        objective: "Factor quadratic expressions, use the zero product property to find the zeros of a quadratic function, and locate its vertex from the zeros.",
        beats: [
          {
            say: "The zeros of a function are the x values that make y equal zero. On the graph they are the x-intercepts, where the parabola meets the x-axis. Zeros, roots, solutions, and x-intercepts are four stage names for the same role.",
            board: [
              { type: "term", term: "Zeros (roots)", def: "Values of x where f(x) = 0; the x-intercepts of the graph." },
              { type: "heading", text: "Zero product property: if AB = 0, then A = 0 or B = 0" },
            ],
          },
          {
            say: "To factor x squared plus b x plus c, find two numbers that multiply to c and add to b. For x squared minus 6 x plus 8, negative 2 and negative 4 multiply to 8 and add to negative 6. So it factors as x minus 2 times x minus 4, and the zeros are 2 and 4.",
            board: [
              { type: "steps", items: ["x² − 6x + 8 = 0", "product 8, sum −6 → −2 and −4", "(x − 2)(x − 4) = 0", "x = 2 or x = 4"] },
            ],
          },
          {
            say: "A few more patterns from the script. Always pull out the greatest common factor first. X squared minus 25 is a difference of squares, x plus 5 times x minus 5. And when the leading coefficient is not 1, 2 x squared plus 7 x plus 3 factors as 2 x plus 1 times x plus 3.",
            board: [
              { type: "bullets", items: ["GCF first: 3x² − 12x = 3x(x − 4)", "Difference of squares: a² − b² = (a + b)(a − b)", "2x² + 7x + 3 = (2x + 1)(x + 3) → x = −½ or −3"] },
            ],
          },
          {
            say: "Factored form, y equals a times x minus r times x minus s, shows the zeros r and s directly. The axis of symmetry sits exactly halfway between them, so the vertex's x coordinate is their average. Plug that x back in to find the vertex's height.",
            board: [
              { type: "formula", text: "y = a(x − r)(x − s)" },
              { type: "formula", text: "Axis of symmetry: x = (r + s) / 2" },
            ],
            widget: { type: "coordPlane", props: { mode: "quadratic", initial: { a: 1, h: 0, k: 0 } } },
          },
          {
            say: "Your scene. Factor x squared minus 6 x plus 5 to find its zeros, place the vertex halfway between them, and build the parabola on the board.",
            board: [
              { type: "formula", text: "y = x² − 6x + 5" },
            ],
            check: {
              prompt: "Build y = x² − 6x + 5 on the board by setting a, h, and k.",
              expect: { mode: "quadratic", a: 1, h: 3, k: -4 },
              hint: "It factors as x minus 1 times x minus 5, so the zeros are 1 and 5. The midpoint is 3, and 9 minus 18 plus 5 is negative 4.",
              praise: "Vertex at 3, negative 4, with zeros at 1 and 5. Onee-san is a little impressed~",
            },
          },
        ],
      },
      {
        id: "2.3",
        title: "The Quadratic Formula and the Discriminant",
        objective: "Solve any quadratic equation with the quadratic formula and use the discriminant to predict the number of real solutions and x-intercepts.",
        beats: [
          {
            say: "Some quadratics refuse to factor nicely, so we call the understudy who can play every role: the quadratic formula. First write the equation in standard form, a x squared plus b x plus c equals zero. Then x equals negative b, plus or minus the square root of b squared minus 4 a c, all over 2 a.",
            board: [
              { type: "formula", text: "ax² + bx + c = 0" },
              { type: "formula", text: "x = (−b ± √(b² − 4ac)) / 2a" },
              { type: "callout", text: "It comes from completing the square on the standard form.", tone: "tip" },
            ],
          },
          {
            say: "Let's rehearse with 2 x squared plus 3 x minus 2 equals zero. Here a is 2, b is 3, and c is negative 2, so b squared minus 4 a c is 9 plus 16, which is 25. Its square root is 5, so x is negative 3 plus or minus 5, over 4, giving one half or negative 2.",
            board: [
              { type: "steps", items: ["a = 2, b = 3, c = −2", "b² − 4ac = 9 − 4(2)(−2) = 25", "x = (−3 ± 5) / 4", "x = ½ or x = −2"] },
            ],
          },
          {
            say: "The part under the square root, b squared minus 4 a c, is the discriminant, and it reveals the ending before the curtain falls. Positive means two real solutions, zero means one repeated real solution, and negative means no real solutions, only two complex ones.",
            board: [
              { type: "term", term: "Discriminant", def: "D = b² − 4ac" },
              { type: "bullets", items: ["D > 0: two real roots (crosses the x-axis twice)", "D = 0: one repeated root (vertex on the x-axis)", "D < 0: no real roots (never touches the x-axis)"] },
            ],
          },
          {
            say: "Connect it to the graph. For x squared minus 4 x plus 5, the discriminant is 16 minus 20, which is negative 4, so the parabola never touches the x-axis. In vertex form it is the quantity x minus 2, squared, plus 1, floating with its vertex at 2, 1.",
            board: [
              { type: "formula", text: "x² − 4x + 5: D = 16 − 20 = −4 < 0" },
              { type: "formula", text: "x² − 4x + 5 = (x − 2)² + 1" },
            ],
            widget: { type: "coordPlane", props: { mode: "quadratic", initial: { a: 1, h: 2, k: 1 } } },
          },
          {
            say: "Your turn. Build a parabola that opens upward, has its axis of symmetry at x equals negative 4, and has a discriminant of exactly zero. Think about where the vertex has to sit.",
            board: [
              { type: "callout", text: "Opens up · axis x = −4 · D = 0", tone: "example" },
            ],
            check: {
              prompt: "Build an upward-opening parabola with axis of symmetry x = −4 whose discriminant is 0.",
              expect: { mode: "quadratic", a: { min: 0.5 }, h: -4, k: 0 },
              hint: "A discriminant of zero means exactly one real root, so the vertex must sit right on the x-axis. That makes k zero, and h is negative 4.",
              praise: "The vertex touches the x-axis at negative 4. One repeated root, beautifully staged~",
            },
          },
        ],
      },
      {
        id: "2.4",
        title: "Modeling with Quadratic Functions",
        objective: "Build and interpret quadratic models for projectile motion and area, using the vertex for maximum values and the zeros for landing times.",
        beats: [
          {
            say: "Quadratics appear whenever something is thrown, launched, or optimized. A ball's height in meters after t seconds is about negative 5 t squared, plus its starting upward speed times t, plus its starting height. The negative 5 is half of gravity's nine point eight, rounded.",
            board: [
              { type: "formula", text: "h(t) = −5t² + v₀t + h₀" },
              { type: "bullets", items: ["−5 ≈ −½g, with g ≈ 9.8 m/s²", "v₀ = initial upward velocity", "h₀ = initial height"] },
            ],
          },
          {
            say: "The vertex is the peak of the scene. Its time coordinate is negative b over 2 a, and plugging that time back in gives the maximum height. Completing the square gives the same answer in vertex form.",
            board: [
              { type: "formula", text: "t = −b / 2a" },
              { type: "term", term: "Maximum", def: "When a < 0, the vertex (h, k) is the highest point: height k at time h." },
            ],
          },
          {
            say: "The zeros tell you when the ball hits the ground, because that is when the height is zero. Only the positive root makes sense, since time before the throw is not part of our story. Always check that your answer fits the context's domain.",
            board: [
              { type: "callout", text: "h(t) = 0 → landing time; reject t < 0.", tone: "warn" },
              { type: "bullets", items: ["Domain: 0 ≤ t ≤ landing time", "Range: 0 ≤ h ≤ maximum height"] },
            ],
          },
          {
            say: "Area problems are the other classic. With 20 meters of fence around a rectangle, the area is x times 10 minus x, a downward parabola with zeros at 0 and 10. The vertex sits halfway at x equals 5, so a 5 by 5 square gives the maximum area, 25 square meters.",
            board: [
              { type: "steps", items: ["Perimeter 20 → length + width = 10", "A(x) = x(10 − x)", "Zeros 0 and 10 → vertex at x = 5", "Max area = 5 · 5 = 25 m²"] },
            ],
            widget: { type: "coordPlane", props: { mode: "quadratic", initial: { a: -1, h: 0, k: 0 } } },
          },
          {
            say: "Final take. A ball is tossed from 3 meters up with an upward speed of 10 meters per second, so its height is negative 5 t squared plus 10 t plus 3. Rewrite it in vertex form and set the parabola so its vertex shows the peak.",
            board: [
              { type: "formula", text: "h(t) = −5t² + 10t + 3" },
              { type: "callout", text: "Complete the square: factor −5 out of the first two terms.", tone: "tip" },
            ],
            check: {
              prompt: "Set a, h, and k so the graph matches h(t) = −5t² + 10t + 3 in vertex form.",
              expect: { mode: "quadratic", a: -5, h: 1, k: 8 },
              hint: "The peak time is negative 10 over negative 10, which is 1 second. Plug in 1: negative 5 plus 10 plus 3 is 8 meters.",
              praise: "Peak at 1 second, 8 meters high. That throw deserves a standing ovation~",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 3,
    title: "Exponential and Logarithmic Functions",
    lessons: [
      {
        id: "3.1",
        title: "Exponential Growth and Decay",
        objective: "Distinguish linear from exponential change and write exponential growth and decay models from a percent rate or a half-life.",
        beats: [
          {
            say: "Linear functions add the same amount each step, but exponential functions multiply by the same factor each step. Adding 5 every year is linear, while growing by 5 percent every year is exponential. In the long run, exponential growth always steals the spotlight.",
            board: [
              { type: "bullets", items: ["Linear: constant difference (+d each step)", "Exponential: constant ratio (×b each step)"] },
              { type: "formula", text: "y = a · bˣ" },
            ],
          },
          {
            say: "In y equals a times b to the x, a is the starting amount and b is the growth factor. If the rate is r as a decimal, growth uses b equals 1 plus r, and decay uses b equals 1 minus r. So growing 8 percent means multiplying by one point zero eight each time.",
            board: [
              { type: "formula", text: "Growth: b = 1 + r (b > 1)" },
              { type: "formula", text: "Decay: b = 1 − r (0 < b < 1)" },
              { type: "callout", text: "8% growth → b = 1.08 · 8% decay → b = 0.92", tone: "example" },
            ],
          },
          {
            say: "Half-life is decay with a dramatic twist: the amount is cut in half every fixed time period. An 80 milligram dose with a half-life of 3 hours follows 80 times one half to the power t over 3. After 9 hours that is three halvings, so 10 milligrams remain.",
            board: [
              { type: "formula", text: "A(t) = 80 · (½)^(t/3)" },
              { type: "steps", items: ["t = 9 → 9 ÷ 3 = 3 half-lives", "80 → 40 → 20 → 10 mg"] },
            ],
          },
          {
            say: "An exponential graph has a horizontal asymptote, usually the x-axis, that it approaches but never touches. Growth curves rise steeply to the right, and decay curves sink toward the asymptote. The y-intercept is always the starting amount a.",
            board: [
              { type: "bullets", items: ["y-intercept: (0, a)", "Horizontal asymptote: y = 0", "Domain: all real numbers · Range: y > 0 (for a > 0)"] },
            ],
          },
          {
            say: "Audition time. A car is worth 20,000 dollars and loses 15 percent of its value every year. Pick the function that models its value after t years.",
            board: [
              { type: "heading", text: "Which model fits?" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A $20,000 car loses 15% of its value each year. Which function gives its value V after t years?",
                options: ["V = 20000(0.85)ᵗ", "V = 20000(1.15)ᵗ", "V = 20000(0.15)ᵗ", "V = 20000 − 0.15t"],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the correct depreciation model.",
              expect: { choice: 0 },
              hint: "Losing 15 percent means the car keeps 85 percent of its value each year. So the decay factor is 1 minus zero point one five.",
              praise: "Zero point eight five, the decay factor. Fufu, you read that script like a pro~",
            },
          },
        ],
      },
      {
        id: "3.2",
        title: "Compound and Continuous Interest",
        objective: "Use the compound interest formula A = P(1 + r/n)^(nt) and the continuous formula A = Pe^(rt) to compute and compare balances.",
        beats: [
          {
            say: "Money has its own little drama. Simple interest pays only on the original amount, but compound interest also pays interest on your interest. That snowball effect is exponential growth.",
            board: [
              { type: "formula", text: "Simple interest: I = Prt" },
              { type: "term", term: "Compound interest", def: "Interest is added to the balance, so later interest is earned on it too." },
            ],
          },
          {
            say: "The compound interest formula is A equals P times the quantity 1 plus r over n, raised to the n t power. P is the principal, r is the annual rate as a decimal, n is the number of compoundings per year, and t is the number of years. Monthly means n is 12, and quarterly means n is 4.",
            board: [
              { type: "formula", text: "A = P(1 + r/n)^(nt)" },
              { type: "bullets", items: ["P = principal", "r = annual rate (decimal)", "n = compoundings per year", "t = years"] },
            ],
          },
          {
            say: "Let's run the numbers. Investing 500 dollars at 4 percent compounded quarterly for 3 years gives 500 times one point zero one to the twelfth power. That is about 563 dollars and 41 cents.",
            board: [
              { type: "steps", items: ["P = 500, r = 0.04, n = 4, t = 3", "A = 500(1 + 0.04/4)^(4·3)", "A = 500(1.01)¹²", "A ≈ $563.41"] },
            ],
          },
          {
            say: "As compounding gets more frequent, the balance approaches a limit built on the number e, about two point seven one eight. Continuous compounding is A equals P times e to the r t. More compounding always helps, but only a little, so don't expect miracles from the fine print.",
            board: [
              { type: "formula", text: "A = Pe^(rt)" },
              { type: "term", term: "e", def: "≈ 2.71828, the limit of (1 + 1/n)ⁿ as n → ∞" },
            ],
          },
          {
            say: "Your scene. You invest 1,000 dollars at 6 percent annual interest, compounded monthly, for 2 years. Choose the final balance, and watch out for the impostors on the list.",
            board: [
              { type: "callout", text: "P = $1,000 · r = 6% · monthly · t = 2 years", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "$1,000 at 6% annual interest, compounded monthly, for 2 years. What is the balance?",
                options: ["$1,120.00", "$1,123.60", "$1,127.16", "$1,127.50"],
                answer: 2,
              },
            },
            check: {
              prompt: "Pick the balance after 2 years.",
              expect: { choice: 2 },
              hint: "Monthly means n is 12, so the rate per month is zero point zero zero five and there are 24 periods. Raise one point zero zero five to the 24th power and multiply by 1,000.",
              praise: "1,127 dollars and 16 cents! The others were the simple, yearly, and continuous impostors. Bravo~",
            },
          },
        ],
      },
      {
        id: "3.3",
        title: "Logarithms as Inverses of Exponential Functions",
        objective: "Convert between exponential and logarithmic form, evaluate logarithms, and apply the product, quotient, and power properties.",
        beats: [
          {
            say: "A logarithm answers one question: what exponent do I need? Log base b of x equals y means exactly the same thing as b to the y equals x. So log base 2 of 8 is 3, because 2 cubed is 8.",
            board: [
              { type: "formula", text: "log_b(x) = y  ⟺  bʸ = x" },
              { type: "callout", text: "log₂ 8 = 3 because 2³ = 8", tone: "example" },
            ],
          },
          {
            say: "The logarithm is the exponential function's mirror image, its inverse. Their graphs reflect across the line y equals x, so log base b of x has a vertical asymptote at x equals zero and accepts only positive inputs. You can never take the log of zero or of a negative number.",
            board: [
              { type: "bullets", items: ["f(x) = bˣ and f⁻¹(x) = log_b x", "Graphs reflect across y = x", "Domain of log_b x: x > 0 · asymptote x = 0"] },
            ],
          },
          {
            say: "Two logs have their own stage names. A log with no base written means base 10, the common log, and l n means base e, the natural log. So log of 1,000 is 3, and the natural log of e squared is 2.",
            board: [
              { type: "term", term: "Common log", def: "log x = log₁₀ x" },
              { type: "term", term: "Natural log", def: "ln x = logₑ x" },
              { type: "formula", text: "log 1000 = 3 · ln e² = 2" },
            ],
          },
          {
            say: "Since logs are exponents, they follow the exponent rules in disguise. The log of a product is the sum of the logs, the log of a quotient is the difference, and the log of a power brings the exponent down in front. For example, log base 2 of 32 equals log base 2 of 4 plus log base 2 of 8, which is 2 plus 3.",
            board: [
              { type: "formula", text: "log_b(MN) = log_b M + log_b N" },
              { type: "formula", text: "log_b(M/N) = log_b M − log_b N" },
              { type: "formula", text: "log_b(Mᵖ) = p · log_b M" },
            ],
          },
          {
            say: "Last scene for this lesson. Evaluate the expression on the board by asking what exponent each base needs. Remember that a fraction like one ninth needs a negative exponent.",
            board: [
              { type: "formula", text: "log₂ 32 + log₃ (1/9)" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Evaluate log₂ 32 + log₃ (1/9).",
                options: ["7", "3", "−3", "5"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the value of the expression.",
              expect: { choice: 1 },
              hint: "Two to the fifth is 32, so the first log is 5. Three to the negative 2 is one ninth, so the second log is negative 2.",
              praise: "Five plus negative two is three. A perfect read of the script~",
            },
          },
        ],
      },
      {
        id: "3.4",
        title: "Solving Exponential Equations",
        objective: "Solve exponential equations by rewriting both sides with a common base or by taking logarithms, using the change of base formula.",
        beats: [
          {
            say: "Method one: rewrite both sides with the same base, then set the exponents equal. For 4 to the x plus 1 equals 8 to the x, both sides are powers of 2, so 2 x plus 2 equals 3 x. That gives x equals 2.",
            board: [
              { type: "steps", items: ["4^(x+1) = 8ˣ", "(2²)^(x+1) = (2³)ˣ", "2x + 2 = 3x", "x = 2"] },
            ],
          },
          {
            say: "Before anything else, isolate the exponential part, the way you clear the stage before the lead walks on. In 3 times 2 to the x, plus 5, equals 53, subtract 5 and divide by 3 to get 2 to the x equals 16. Then x is 4.",
            board: [
              { type: "steps", items: ["3 · 2ˣ + 5 = 53", "3 · 2ˣ = 48", "2ˣ = 16 = 2⁴", "x = 4"] },
              { type: "callout", text: "Don't multiply 3 · 2 first: the exponent belongs only to the 2.", tone: "warn" },
            ],
          },
          {
            say: "When the bases will not match, take the log of both sides and use the power property to bring the exponent down. For 5 to the x equals 40, we get x times log 5 equals log 40. So x is log 40 divided by log 5, about two point two nine.",
            board: [
              { type: "steps", items: ["5ˣ = 40", "log 5ˣ = log 40", "x · log 5 = log 40", "x = log 40 / log 5 ≈ 2.29"] },
              { type: "formula", text: "Change of base: log_b a = log a / log b" },
            ],
          },
          {
            say: "Now a real script. A colony of 200 bacteria doubles every hour, and we want to know when it reaches 5,000. Solve 200 times 2 to the t equals 5,000: divide to get 2 to the t equals 25, so t is log 25 over log 2, about four point six four hours.",
            board: [
              { type: "formula", text: "200 · 2ᵗ = 5000 → 2ᵗ = 25" },
              { type: "formula", text: "t = log 25 / log 2 ≈ 4.64 hours" },
            ],
          },
          {
            say: "Your final take. Five hundred dollars earns 8 percent interest compounded once a year. How long until the money doubles?",
            board: [
              { type: "formula", text: "500(1.08)ᵗ = 1000" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "How long until $500 at 8% compounded annually doubles?",
                options: ["About 12.5 years", "About 9.0 years", "About 0.11 years", "About 25 years"],
                answer: 1,
              },
            },
            check: {
              prompt: "Pick the doubling time.",
              expect: { choice: 1 },
              hint: "Divide both sides by 500 to get one point zero eight to the t equals 2. Then t is log 2 divided by the log of one point zero eight.",
              praise: "About nine years. Fufu, that even matches the rule of 72, since 72 divided by 8 is 9~",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 4,
    title: "Trigonometric Functions",
    lessons: [
      {
        id: "4.1",
        title: "Right-Triangle Trigonometry",
        objective: "Use the sine, cosine, and tangent ratios and their inverses to find missing sides and angles in right triangles.",
        beats: [
          {
            say: "Trigonometry starts with a right triangle and one acute angle, our lead, called theta. The hypotenuse is the longest side, across from the right angle. The opposite side faces theta, and the adjacent side stands right next to it.",
            board: [
              { type: "term", term: "Hypotenuse", def: "The side opposite the right angle; always the longest side." },
              { type: "bullets", items: ["Opposite: across from θ", "Adjacent: next to θ (not the hypotenuse)"] },
            ],
          },
          {
            say: "Here is the line every actress memorizes: SOH CAH TOA. Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent. These ratios depend only on the angle, because all right triangles with that angle are similar.",
            board: [
              { type: "formula", text: "sin θ = opposite / hypotenuse" },
              { type: "formula", text: "cos θ = adjacent / hypotenuse" },
              { type: "formula", text: "tan θ = opposite / adjacent" },
            ],
          },
          {
            say: "Two special triangles appear in almost every scene. In a 45, 45, 90 triangle the sides are in the ratio 1 to 1 to the square root of 2. In a 30, 60, 90 triangle they are 1 to the square root of 3 to 2, with the short side across from the 30 degree angle.",
            board: [
              { type: "bullets", items: ["45°-45°-90°: 1 : 1 : √2", "30°-60°-90°: 1 : √3 : 2"] },
              { type: "formula", text: "sin 30° = ½ · cos 30° = √3/2 · tan 45° = 1" },
            ],
          },
          {
            say: "To find an angle instead of a side, use the inverse functions. If the opposite side is 5 and the adjacent side is 12, the tangent is 5 over 12, and the inverse tangent gives about twenty two point six degrees. Make sure your calculator is in degree mode for this scene.",
            board: [
              { type: "formula", text: "θ = tan⁻¹(5/12) ≈ 22.6°" },
              { type: "callout", text: "Angle of elevation: measured up from the horizontal.", tone: "tip" },
            ],
          },
          {
            say: "Audition piece. A 10 meter ladder leans against a wall and makes a 60 degree angle with the ground. How high up the wall does the top of the ladder reach?",
            board: [
              { type: "callout", text: "Hypotenuse 10 m · angle with the ground 60° · find the height", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A 10 m ladder makes a 60° angle with the ground. How high up the wall does it reach?",
                options: ["5 m", "10√3 ≈ 17.32 m", "5√3 ≈ 8.66 m", "20 m"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the height the ladder reaches.",
              expect: { choice: 2 },
              hint: "The height is opposite the 60 degree angle and the ladder is the hypotenuse, so use sine. The sine of 60 degrees is the square root of 3 over 2.",
              praise: "Five root three, about eight point six six meters. Right on cue~",
            },
          },
        ],
      },
      {
        id: "4.2",
        title: "Radian Measure and the Unit Circle",
        objective: "Convert between degrees and radians and use the unit circle to find exact sine and cosine values of special angles in all four quadrants.",
        beats: [
          {
            say: "Degrees are fine for the rehearsal room, but on the big stage we use radians. One radian is the central angle whose arc length equals the radius. A full turn is 2 pi radians, which is 360 degrees, so pi radians is 180 degrees.",
            board: [
              { type: "term", term: "Radian", def: "The central angle that cuts off an arc equal in length to the radius." },
              { type: "formula", text: "2π rad = 360° · π rad = 180°" },
            ],
          },
          {
            say: "To convert degrees to radians, multiply by pi over 180. To go back, multiply by 180 over pi. So 60 degrees is pi over 3 radians, and 3 pi over 4 radians is 135 degrees.",
            board: [
              { type: "steps", items: ["60° · π/180 = π/3", "3π/4 · 180/π = 135°"] },
            ],
          },
          {
            say: "The unit circle has radius 1 and is centered at the origin. Turn an angle theta from the positive x-axis, and the point where it lands is cosine theta, sine theta. Cosine is the x coordinate and sine is the y coordinate, onee-san's favorite costume change.",
            board: [
              { type: "formula", text: "(x, y) = (cos θ, sin θ)" },
              { type: "bullets", items: ["π/6 → (√3/2, ½)", "π/4 → (√2/2, √2/2)", "π/3 → (½, √3/2)"] },
            ],
          },
          {
            say: "In the other quadrants, find the reference angle, the acute angle to the x-axis, then choose the signs. In quadrant two, x is negative and y is positive, so cosine is negative and sine is positive. The wave on the board is sine, the y coordinate, traced out as theta circles around.",
            board: [
              { type: "bullets", items: ["QI: all positive", "QII: sin positive", "QIII: tan positive", "QIV: cos positive"] },
              { type: "callout", text: "Reference angle of 5π/6 is π/6, so sin(5π/6) = ½.", tone: "example" },
            ],
            widget: { type: "coordPlane", props: { mode: "trig", initial: { A: 1, B: 1, C: 0 } } },
          },
          {
            say: "Your scene. Find the exact value of cosine of 2 pi over 3. Start with the reference angle, then decide the sign from the quadrant.",
            board: [
              { type: "formula", text: "cos(2π/3) = ?" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "What is the exact value of cos(2π/3)?",
                options: ["½", "−½", "√3/2", "−√3/2"],
                answer: 1,
              },
            },
            check: {
              prompt: "Pick the exact value.",
              expect: { choice: 1 },
              hint: "Two pi over 3 is 120 degrees, in quadrant two, with a reference angle of pi over 3. Cosine of pi over 3 is one half, and cosine is negative in quadrant two.",
              praise: "Negative one half! You found your mark in the right quadrant. Bravo~",
            },
          },
        ],
      },
      {
        id: "4.3",
        title: "Graphing Sine and Cosine: Amplitude, Period, and Midline",
        objective: "Graph y = A sin(Bx) + C and identify its amplitude, period, and midline from an equation or from its maximum and minimum values.",
        beats: [
          {
            say: "The parent wave, y equals sine x, starts at zero, rises to 1, falls to negative 1, and repeats every 2 pi. That repeat length is the period, and the center line is the midline, y equals zero. It is the most reliable performer on stage, the same show every night.",
            board: [
              { type: "bullets", items: ["Period: 2π", "Amplitude: 1", "Midline: y = 0", "Range: −1 ≤ y ≤ 1"] },
            ],
            widget: { type: "coordPlane", props: { mode: "trig", initial: { A: 1, B: 1, C: 0 } } },
          },
          {
            say: "In y equals A sine of B x, plus C, the A controls the amplitude, the distance from the midline to a peak. Amplitude 3 means the wave reaches 3 above and 3 below the midline. A bigger A is a louder performance, not a longer one.",
            board: [
              { type: "formula", text: "y = A sin(Bx) + C" },
              { type: "term", term: "Amplitude", def: "|A| = (max − min) / 2" },
            ],
          },
          {
            say: "The B value squeezes or stretches the wave horizontally. The period is 2 pi divided by B, so B equals 2 makes the wave repeat every pi, twice as fast. B equals one half makes it repeat every 4 pi.",
            board: [
              { type: "formula", text: "Period = 2π / B" },
              { type: "bullets", items: ["B = 2 → period π", "B = ½ → period 4π"] },
            ],
          },
          {
            say: "The C value shifts the whole wave up or down, so the midline becomes y equals C, halfway between the maximum and minimum. And cosine is the same wave with a different entrance: cosine of x equals sine of x plus pi over 2, so it starts at its peak.",
            board: [
              { type: "formula", text: "Midline: y = C = (max + min) / 2" },
              { type: "formula", text: "cos x = sin(x + π/2)" },
            ],
          },
          {
            say: "Now you direct the wave. It needs a maximum of 4, a minimum of negative 2, and a period of pi. Work out A, B, and C, then set them on the board.",
            board: [
              { type: "callout", text: "max = 4 · min = −2 · period = π", tone: "example" },
            ],
            check: {
              prompt: "Build the sine wave with maximum 4, minimum −2, and period π.",
              expect: { mode: "trig", A: 3, B: 2, C: 1 },
              hint: "The amplitude is 4 minus negative 2, over 2, which is 3. The midline is 4 plus negative 2, over 2, which is 1, and a period of pi means B is 2.",
              praise: "Three sine of 2 x, plus 1. The wave hits every mark, standing ovation~",
            },
          },
        ],
      },
      {
        id: "4.4",
        title: "Fundamental Trigonometric Identities",
        objective: "Use the reciprocal, quotient, Pythagorean, cofunction, and even-odd identities to simplify expressions and find exact trigonometric values.",
        beats: [
          {
            say: "An identity is an equation that is true for every angle where both sides are defined, not just for one special value. Think of it as a costume swap: the expression looks different, but the character underneath is the same. Our first swaps are the quotient and reciprocal identities.",
            board: [
              { type: "formula", text: "tan θ = sin θ / cos θ" },
              { type: "bullets", items: ["csc θ = 1 / sin θ", "sec θ = 1 / cos θ", "cot θ = 1 / tan θ = cos θ / sin θ"] },
            ],
          },
          {
            say: "The star of the show is the Pythagorean identity. On the unit circle, x squared plus y squared equals 1, and since x is cosine and y is sine, sine squared theta plus cosine squared theta equals 1. Divide every term by cosine squared and you get 1 plus tangent squared equals secant squared.",
            board: [
              { type: "formula", text: "sin²θ + cos²θ = 1" },
              { type: "formula", text: "1 + tan²θ = sec²θ" },
            ],
          },
          {
            say: "Two short scenes next. The cofunction identities say the sine of an angle equals the cosine of its complement, so sine of 30 degrees equals cosine of 60 degrees. And cosine is even while sine is odd: cosine of negative theta is cosine theta, but sine of negative theta is negative sine theta.",
            board: [
              { type: "formula", text: "sin(90° − θ) = cos θ" },
              { type: "formula", text: "cos(−θ) = cos θ · sin(−θ) = −sin θ" },
            ],
          },
          {
            say: "Let's simplify one together. One minus sine squared theta is cosine squared theta, so that expression divided by cosine theta is just cosine theta. Rewriting everything in sines and cosines is the director's favorite trick.",
            board: [
              { type: "steps", items: ["(1 − sin²θ) / cos θ", "= cos²θ / cos θ", "= cos θ"] },
              { type: "callout", text: "Stuck? Rewrite everything in terms of sin and cos.", tone: "tip" },
            ],
          },
          {
            say: "Final scene. The sine of theta is three fifths, and theta lives in quadrant two. Use the Pythagorean identity to find cosine, choose its sign, then find the tangent.",
            board: [
              { type: "callout", text: "sin θ = 3/5 · θ in Quadrant II", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "If sin θ = 3/5 and θ is in Quadrant II, what is tan θ?",
                options: ["−3/4", "3/4", "−4/3", "−4/5"],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the value of tan θ.",
              expect: { choice: 0 },
              hint: "Cosine squared is 1 minus 9 over 25, which is 16 over 25, so cosine is negative four fifths in quadrant two. Then tangent is sine divided by cosine.",
              praise: "Negative three fourths. You swapped costumes and kept the character, bravo~",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 5,
    title: "Geometry: Angles, Figures, and Circles",
    lessons: [
      {
        id: "5.1",
        title: "Angle Relationships and Polygon Angle Sums",
        objective: "Use vertical, supplementary, and parallel-line angle relationships and the polygon angle-sum formulas to find unknown angles.",
        beats: [
          {
            say: "Geometry act, scene one: angle pairs. Complementary angles add to 90 degrees, supplementary angles add to 180, and two angles forming a straight line are a linear pair, so they are supplementary. Vertical angles, across from each other where two lines cross, are always equal.",
            board: [
              { type: "bullets", items: ["Complementary: sum 90°", "Supplementary / linear pair: sum 180°", "Vertical angles: congruent"] },
            ],
          },
          {
            say: "When a transversal cuts two parallel lines, the angles repeat like a choreographed routine. Corresponding angles are equal, and so are alternate interior angles. Same-side interior angles are supplementary, adding to 180 degrees.",
            board: [
              { type: "term", term: "Transversal", def: "A line that crosses two or more other lines." },
              { type: "bullets", items: ["Corresponding: ≅", "Alternate interior / alternate exterior: ≅", "Same-side interior: sum 180°"] },
            ],
          },
          {
            say: "The angles of any triangle add to 180 degrees. An exterior angle of a triangle equals the sum of the two remote interior angles. So if two angles of a triangle are 50 and 70 degrees, the exterior angle at the third vertex is 120 degrees.",
            board: [
              { type: "formula", text: "∠A + ∠B + ∠C = 180°" },
              { type: "formula", text: "Exterior angle = sum of the two remote interior angles" },
            ],
          },
          {
            say: "From one vertex, a polygon with n sides splits into n minus 2 triangles, so its interior angles add to n minus 2, times 180 degrees. A regular polygon shares that sum equally among its n angles. And the exterior angles of any convex polygon, one at each vertex, always add to 360 degrees.",
            board: [
              { type: "formula", text: "Interior sum = (n − 2) · 180°" },
              { type: "formula", text: "Regular: each interior angle = (n − 2) · 180° / n" },
              { type: "formula", text: "Exterior sum = 360°" },
            ],
          },
          {
            say: "Your turn under the spotlight. Each interior angle of a regular polygon measures 140 degrees. How many sides does it have?",
            board: [
              { type: "callout", text: "Shortcut: each exterior angle = 180° − interior angle.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Each interior angle of a regular polygon is 140°. How many sides does it have?",
                options: ["7", "8", "9", "10"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the number of sides.",
              expect: { choice: 2 },
              hint: "Each exterior angle is 180 minus 140, which is 40 degrees. The exterior angles add to 360, so divide 360 by 40.",
              praise: "Nine sides, a nonagon! Onee-san is a little impressed~",
            },
          },
        ],
      },
      {
        id: "5.2",
        title: "Congruence and Similarity of Triangles",
        objective: "Prove triangles congruent or similar with the standard criteria and use a scale factor to find lengths, perimeters, and areas.",
        beats: [
          {
            say: "Congruent figures are exact twins: one lands perfectly on the other using only rigid motions, which are translations, reflections, and rotations. Those moves keep every length and angle the same. So corresponding parts of congruent triangles are congruent.",
            board: [
              { type: "term", term: "Congruent (≅)", def: "Same size and shape; one maps onto the other by rigid motions." },
              { type: "bullets", items: ["Translation (slide)", "Reflection (flip)", "Rotation (turn)"] },
            ],
          },
          {
            say: "You do not need all six parts to prove two triangles congruent. Side side side, side angle side, angle side angle, angle angle side, and hypotenuse leg for right triangles all work. But beware the impostors: side side angle and angle angle angle do not prove congruence.",
            board: [
              { type: "bullets", items: ["SSS · SAS · ASA · AAS", "HL (right triangles only)"] },
              { type: "callout", text: "SSA and AAA do NOT prove congruence.", tone: "warn" },
            ],
          },
          {
            say: "Similar figures have the same shape but possibly a different size, related by a dilation plus rigid motions. Triangles are similar by angle angle, by side angle side similarity, or by side side side similarity. Corresponding angles stay equal, and corresponding sides are proportional.",
            board: [
              { type: "term", term: "Similar (~)", def: "Same shape: corresponding angles equal, corresponding sides in a constant ratio k." },
              { type: "bullets", items: ["AA~", "SAS~", "SSS~"] },
            ],
          },
          {
            say: "If the scale factor is k, then lengths and perimeters scale by k, areas by k squared, and volumes by k cubed. Double every side, and the area becomes four times as large, not two. That is the trap examiners love to set.",
            board: [
              { type: "bullets", items: ["Lengths and perimeters: × k", "Areas: × k²", "Volumes: × k³"] },
              { type: "callout", text: "k = 2 → area × 4, volume × 8", tone: "example" },
            ],
          },
          {
            say: "Your audition. Two similar triangles have corresponding sides of 6 and 9, and the smaller one has an area of 24 square units. Find the area of the larger triangle.",
            board: [
              { type: "callout", text: "Corresponding sides 6 and 9 · smaller area 24", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Two similar triangles have corresponding sides 6 and 9. The smaller has area 24. What is the area of the larger?",
                options: ["36", "54", "81", "48"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the area of the larger triangle.",
              expect: { choice: 1 },
              hint: "The scale factor is 9 over 6, which is three halves. Areas scale by its square, nine fourths, so multiply 24 by nine fourths.",
              praise: "Fifty-four square units. You squared the scale factor like a pro~",
            },
          },
        ],
      },
      {
        id: "5.3",
        title: "Area and Volume of Plane and Solid Figures",
        objective: "Compute areas of plane figures and volumes of prisms, cylinders, pyramids, cones, and spheres, and explain where the one-third factor comes from.",
        beats: [
          {
            say: "Let's set the stage with area. A triangle is one half base times height, a trapezoid is one half the sum of the bases times the height, and a circle is pi r squared. The height is always measured perpendicular to the base, never along a slanted side.",
            board: [
              { type: "formula", text: "Triangle: A = ½bh" },
              { type: "formula", text: "Trapezoid: A = ½(b₁ + b₂)h" },
              { type: "formula", text: "Circle: A = πr²" },
            ],
          },
          {
            say: "For prisms and cylinders, volume is the base area times the height, like stacking identical slices. A cylinder with radius 2 and height 5 has volume pi times 4 times 5, which is 20 pi. Cavalieri's principle says a slanted stack with the same base and height has the same volume.",
            board: [
              { type: "formula", text: "Prism or cylinder: V = Bh" },
              { type: "formula", text: "Cylinder: V = πr²h" },
              { type: "term", term: "Cavalieri's principle", def: "Solids with equal heights and equal cross-sectional areas at every level have equal volumes." },
            ],
          },
          {
            say: "Pyramids and cones come to a point, so they hold exactly one third of the matching prism or cylinder. Their volume is one third times base area times height. Three cones of water fill one cylinder with the same base and height.",
            board: [
              { type: "formula", text: "Pyramid or cone: V = ⅓Bh" },
              { type: "formula", text: "Cone: V = ⅓πr²h" },
            ],
          },
          {
            say: "The sphere is the diva of solids. Its volume is four thirds pi r cubed, and its surface area is 4 pi r squared. Keep your units straight: area is in square units and volume is in cubic units.",
            board: [
              { type: "formula", text: "Sphere: V = (4/3)πr³" },
              { type: "formula", text: "Sphere: SA = 4πr²" },
              { type: "callout", text: "Area → units² · Volume → units³", tone: "tip" },
            ],
          },
          {
            say: "Final scene. A cone has radius 3 and height 4. Choose its volume, and do not let the slant height of 5 steal the scene.",
            board: [
              { type: "callout", text: "Cone: r = 3, h = 4 (slant height 5)", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "What is the volume of a cone with radius 3 and height 4?",
                options: ["36π", "15π", "48π", "12π"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the volume of the cone.",
              expect: { choice: 3 },
              hint: "Use one third times pi r squared times h. That is one third times pi times 9 times 4.",
              praise: "Twelve pi cubic units! The matching cylinder would be 36 pi, and you remembered the one third. Bravo~",
            },
          },
        ],
      },
      {
        id: "5.4",
        title: "Circles: Arcs, Chords, and the Equation of a Circle",
        objective: "Relate central and inscribed angles to their arcs, apply chord and tangent properties, find arc length, and write the equation of a circle by completing the square.",
        beats: [
          {
            say: "Our final act is the circle. A chord connects two points on the circle, and a diameter is the longest chord, passing through the center. A central angle has its vertex at the center, and its measure equals the measure of the arc it cuts off.",
            board: [
              { type: "term", term: "Chord", def: "A segment whose endpoints both lie on the circle." },
              { type: "formula", text: "Central angle = intercepted arc" },
            ],
          },
          {
            say: "An inscribed angle has its vertex on the circle, and it measures half of its intercepted arc. So an inscribed angle that cuts off a 100 degree arc measures 50 degrees. Any angle inscribed in a semicircle is a right angle, a plot twist that rescues many proofs.",
            board: [
              { type: "formula", text: "Inscribed angle = ½ · intercepted arc" },
              { type: "callout", text: "Inscribed in a semicircle → 90°", tone: "tip" },
            ],
          },
          {
            say: "A radius drawn perpendicular to a chord bisects that chord. A tangent line touches the circle at exactly one point and is perpendicular to the radius there. Those right angles let you call in the Pythagorean theorem as a guest star.",
            board: [
              { type: "bullets", items: ["Radius ⟂ chord → bisects the chord", "Tangent ⟂ radius at the point of tangency", "Two tangent segments from one outside point are congruent"] },
            ],
          },
          {
            say: "Arc length is a fraction of the circumference: the central angle over 360, times 2 pi r. In radians it is simply r times theta. With radius 6 and a 60 degree angle, the arc is one sixth of 12 pi, which is 2 pi, and the sector area is 6 pi.",
            board: [
              { type: "formula", text: "Arc length = (θ/360°) · 2πr = rθ (θ in radians)" },
              { type: "formula", text: "Sector area = (θ/360°) · πr²" },
            ],
          },
          {
            say: "Last scene. A circle with center h, k and radius r has the equation, the quantity x minus h, squared, plus the quantity y minus k, squared, equals r squared, which is just the Pythagorean theorem. To read an equation in general form, complete the square on x and on y.",
            board: [
              { type: "formula", text: "(x − h)² + (y − k)² = r²" },
              { type: "formula", text: "x² + y² − 6x + 4y − 3 = 0" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Find the center and radius of x² + y² − 6x + 4y − 3 = 0.",
                options: ["Center (−3, 2), radius 4", "Center (3, −2), radius 16", "Center (3, −2), radius 4", "Center (3, −2), radius √3"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the center and radius.",
              expect: { choice: 2 },
              hint: "Group x squared minus 6 x and add 9, then y squared plus 4 y and add 4. The right side becomes 3 plus 9 plus 4, which is 16, so take its square root for the radius.",
              praise: "Center 3, negative 2, radius 4. That's a wrap on the whole course, curtain call~",
            },
          },
        ],
      },
    ],
  },
]
