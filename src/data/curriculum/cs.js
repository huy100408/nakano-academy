/* Yotsuba Nakano · Computer Science course (AP CSP big ideas + AP CSA core topics) */

export default [
  /* ───────────────────────── Unit 1 ───────────────────────── */
  {
    unit: 1,
    title: 'Digital Information & Number Systems',
    lessons: [
      {
        id: '1.1',
        title: 'Binary & Bit Representation',
        objective: 'Convert between binary and decimal with place values, and explain why n bits can represent 2ⁿ different values.',
        beats: [
          {
            say: "Shishishi! Welcome to warm-ups, team! Every photo, song and message on a computer is stored as bits, tiny switches that are either zero or one. The same row of bits can mean a number, a letter or a colour, depending on how the program reads it!",
            board: [
              { type: 'heading', text: 'Everything is bits' },
              { type: 'term', term: 'Bit', def: 'A binary digit: 0 or 1. The smallest unit of data.' },
              { type: 'term', term: 'Byte', def: '8 bits grouped together.' },
            ],
          },
          {
            say: "Binary is base two, so each place is worth double the place to its right, just like laps that double every round! From the right, the places are one, two, four, eight, sixteen, thirty two, sixty four and one hundred twenty eight. To read one zero one one, add the places that hold a one: eight plus two plus one makes eleven!",
            board: [
              { type: 'formula', text: 'Place values:  128  64  32  16  8  4  2  1' },
              { type: 'formula', text: '1011₂ = 8 + 0 + 2 + 1 = 11' },
            ],
            widget: { type: 'binary', props: { start: 11 } },
          },
          {
            say: "Now let's run it the other way, decimal to binary! Grab the biggest place value that fits, subtract it, and keep going with what's left. Forty five is thirty two, plus eight, plus four, plus one, so the bits are zero zero one zero one one zero one!",
            board: [
              { type: 'steps', items: ['45 − 32 = 13 → 32s bit on', '13 − 8 = 5 → 8s bit on', '5 − 4 = 1 → 4s bit on', '1 − 1 = 0 → 1s bit on'] },
              { type: 'formula', text: '45 = 00101101₂' },
            ],
          },
          {
            say: "Here's the big rule! Every extra bit doubles how many values you can make, so n bits give two to the power n values. One byte has 256 different patterns, from zero up to 255. Careful at the finish line: 255 is the biggest number, but 256 is how many values there are!",
            board: [
              { type: 'formula', text: 'n bits → 2ⁿ values (0 to 2ⁿ − 1)' },
              { type: 'bullets', items: ['4 bits: 16 values (0–15)', '8 bits: 256 values (0–255)', '9 bits: 512 values (0–511)'] },
              { type: 'callout', text: 'Exam tip: adding 1 bit doubles the number of values; it does not just add one.', tone: 'tip' },
            ],
          },
          {
            say: "Your turn, partner! Flip the switches on the board until the bits make the number 37. Biggest place value first, then work your way down. Ganbarou!",
            board: [
              { type: 'heading', text: 'Challenge: build 37' },
              { type: 'callout', text: 'Start with the largest place value that is not bigger than 37.', tone: 'tip' },
            ],
            widget: { type: 'binary', props: { start: 0 } },
            check: {
              prompt: 'Flip the bits so the binary number equals 37.',
              expect: { decimal: 37 },
              hint: 'Thirty two fits first. Then you have five left over, which is four plus one.',
              praise: 'YESSS! Thirty two plus four plus one is thirty seven! Gold medal bits! Shishishi!',
            },
          },
        ],
      },
      {
        id: '1.2',
        title: 'Hexadecimal & Base Conversions',
        objective: 'Convert between binary, decimal and hexadecimal, using the fact that one hex digit stands for exactly four bits.',
        beats: [
          {
            say: "Long strings of bits are hard to read, so programmers use hexadecimal, which is base sixteen! It uses the digits zero to nine, then the letters A to F for ten to fifteen. You see it in colour codes, like my favourite green, one zero B nine eight one!",
            board: [
              { type: 'term', term: 'Hexadecimal (base 16)', def: 'Digits 0–9, then A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.' },
              { type: 'callout', text: 'Colour #10B981: red 10₁₆ = 16, green B9₁₆ = 185, blue 81₁₆ = 129.', tone: 'example' },
            ],
          },
          {
            say: "Hex places go up by sixteen each time: ones, sixteens, two hundred fifty sixes. So three C means three sixteens plus twelve ones. Forty eight plus twelve is sixty! Easy pace, right?",
            board: [
              { type: 'formula', text: 'Places:  256  16  1' },
              { type: 'formula', text: '3C₁₆ = 3 × 16 + 12 = 60' },
            ],
          },
          {
            say: "Here's the relay trick! One hex digit is exactly four bits, so you split the binary into teams of four and convert each team. One one zero one is thirteen, which is D, and zero one one zero is six. So that whole byte is D six!",
            board: [
              { type: 'steps', items: ['11010110₂', 'Split: 1101 | 0110', '1101 = 13 = D, 0110 = 6', 'Answer: D6₁₆ = 214'] },
              { type: 'callout', text: 'One hex digit = 4 bits (a nibble). Two hex digits = 1 byte.', tone: 'tip' },
            ],
            widget: { type: 'binary', props: { start: 214, showHex: true } },
          },
          {
            say: "Going from decimal to hex? Divide by sixteen! Two hundred divided by sixteen is twelve with eight left over, and twelve is C, so two hundred is C eight. When a question compares numbers in different bases, convert them all to decimal first, then race them!",
            board: [
              { type: 'formula', text: '200 ÷ 16 = 12 remainder 8 → C8₁₆' },
              { type: 'formula', text: '200 = C8₁₆ = 1100 1000₂' },
              { type: 'callout', text: 'Comparing 1010₂, 11, and B₁₆? Convert all to decimal: 10, 11, 11.', tone: 'example' },
            ],
          },
          {
            say: "Final lap for this lesson! Set the bits so the hex display reads two F. Work one team of four bits at a time. You've got this!",
            board: [
              { type: 'heading', text: 'Challenge: make 2F₁₆' },
              { type: 'formula', text: '2F₁₆ = ???? ????₂' },
            ],
            widget: { type: 'binary', props: { start: 0, showHex: true } },
            check: {
              prompt: 'Set the bits so the hex value shows 2F.',
              expect: { hex: '2F' },
              hint: 'The left four bits make two, which is zero zero one zero. F is fifteen, so the right four bits are all on.',
              praise: 'Perfect handoff! Zero zero one zero, one one one one is two F, which is forty seven in decimal! Shishishi!',
            },
          },
        ],
      },
      {
        id: '1.3',
        title: 'Data Compression, Overflow & Round-off Errors',
        objective: 'Choose between lossless and lossy compression, and explain how a fixed number of bits causes overflow and round-off errors.',
        beats: [
          {
            say: "Compression means using fewer bits to store or send the same data, like packing your gym bag tighter! Lossless compression shrinks the file and still lets you rebuild the original perfectly. Run length encoding is a simple example: six white pixels and three black pixels become six W, three B!",
            board: [
              { type: 'term', term: 'Lossless compression', def: 'Reduces the number of bits with no loss of information. The original can always be fully reconstructed.' },
              { type: 'formula', text: 'Run-length encoding: WWWWWWBBB → 6W3B' },
              { type: 'bullets', items: ['ZIP files', 'PNG images', 'Text, code, spreadsheets'] },
            ],
          },
          {
            say: "Lossy compression throws away details people barely notice, so you can only rebuild an approximation of the original. In return, it usually shrinks files much more than lossless can! Pick lossless when every bit matters, and lossy when small size or fast streaming matters more.",
            board: [
              { type: 'term', term: 'Lossy compression', def: 'Removes some data. Usually much smaller files, but only an approximation can be reconstructed.' },
              { type: 'bullets', items: ['JPEG photos, MP3 music, streaming video', 'Lossless: medical scans, legal documents, source code', 'Lossy: photos for a website, video calls'] },
            ],
          },
          {
            say: "Now a danger zone! Computers often store numbers in a fixed number of bits. If a result needs more bits than that, you get an overflow error. With eight bits, 255 plus one needs a ninth bit, so the extra bit falls off and the result wraps around to zero!",
            board: [
              { type: 'term', term: 'Overflow error', def: 'A result is too large for the fixed number of bits available.' },
              { type: 'formula', text: '11111111₂ (255) + 1 → 1|00000000 → 00000000₂ (0)' },
              { type: 'callout', text: 'Java int is 32 bits: Integer.MAX_VALUE + 1 wraps to −2147483648. Python ints grow as needed.', tone: 'warn' },
            ],
          },
          {
            say: "Real numbers with decimals have a different problem called round-off error. Many decimals, like one tenth, can't be stored exactly in binary, so the computer keeps a very close approximation. That's why point one plus point two prints a long, slightly wrong number in Python!",
            board: [
              { type: 'term', term: 'Round-off error', def: 'A real number is stored as an approximation because only a limited number of bits are available.' },
              { type: 'formula', text: '>>> 0.1 + 0.2\n0.30000000000000004' },
              { type: 'callout', text: 'Compare decimals with a tolerance: abs(a - b) < 1e-9', tone: 'tip' },
            ],
          },
          {
            say: "Quiz time, champion! A counter uses only four bits and is already full of ones. Think about what happens when the program adds one more lap!",
            board: [
              { type: 'formula', text: '4-bit counter: 1111₂ (15)\ncounter = counter + 1' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'A 4-bit unsigned counter holds 1111 (15). The program adds 1. What is stored?',
                options: ['10000, which is 16', '0000, an overflow error', '15.999, a round-off error', '1111 compressed with lossy compression'],
                answer: 1,
              },
            },
            check: {
              prompt: 'Pick what the 4-bit counter stores after adding 1.',
              expect: { choice: 1 },
              hint: 'Sixteen needs five bits. What happens to a bit that has no room?',
              praise: 'Bullseye! The fifth bit has nowhere to go, so the counter wraps to zero. That is overflow! Shishishi!',
            },
          },
        ],
      },
    ],
  },

  /* ───────────────────────── Unit 2 ───────────────────────── */
  {
    unit: 2,
    title: 'Boolean Logic, Conditionals & Control Flow',
    lessons: [
      {
        id: '2.1',
        title: 'Variables, Data Types & Assignment',
        objective: 'Trace assignment statements step by step and identify integer, float, string, Boolean and list values.',
        beats: [
          {
            say: "A variable is a named box that holds one value at a time, like a locker with your name on it! Assignment stores the value on the right side into the variable on the left side. On the AP pseudocode sheet it's written with a left arrow, and in Python and Java it's a single equals sign!",
            board: [
              { type: 'term', term: 'Variable', def: 'A named reference to a value that can change while the program runs.' },
              { type: 'formula', text: 'Python:  score = 10\nAP CSP:  score ← 10\nJava:    int score = 10;' },
              { type: 'callout', text: 'In code, = means "store". To compare, use ==.', tone: 'warn' },
            ],
          },
          {
            say: "Every value has a data type! Integers are whole numbers, floats have decimals, strings are text in quotes, and Booleans are just true or false. Watch out: seven plus three is ten, but the string seven plus the string three glues them into seventy three!",
            board: [
              { type: 'bullets', items: ['int: 7', 'float: 7.0', 'str: "7"', 'bool: True / False', 'list: [7, 8, 9]'] },
              { type: 'formula', text: '7 + 3      → 10\n"7" + "3"  → "73"' },
            ],
          },
          {
            say: "Division has a trap too! In Python, seven divided by two is three point five, but double slash division drops the remainder and gives three. Java does that same whole number division when both numbers are ints. The mod operator gives the remainder, so seventeen mod five is two!",
            board: [
              { type: 'formula', text: 'Python: 7 / 2 → 3.5    7 // 2 → 3\nJava:   7 / 2 → 3      7.0 / 2 → 3.5' },
              { type: 'formula', text: '17 % 5 → 2     (AP CSP: 17 MOD 5)' },
            ],
          },
          {
            say: "Tracing is like counting laps, one line at a time! When we set y equal to x, y gets a copy of the value five, not a link to x. So when x changes to seven later, y is still five!",
            board: [
              { type: 'formula', text: 'x = 5\ny = x\nx = x + 2' },
              { type: 'steps', items: ['x = 5', 'y = 5 (copy of x)', 'x = 7, y stays 5'] },
            ],
          },
          {
            say: "Race time! Trace this code line by line and keep a little table of a and b. Update a box only when its name is on the left side!",
            board: [
              { type: 'formula', text: 'a = 4\nb = a * 2\na = b - 1\nb = a + b\nprint(a, b)' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'What does this code print?', options: ['7 15', '4 8', '7 8', '3 11'], answer: 0 },
            },
            check: {
              prompt: 'Trace the code and choose what it prints.',
              expect: { choice: 0 },
              hint: 'a starts at four, so b becomes eight. Then a becomes seven, and b adds the new a to the old b.',
              praise: 'YESSS! A is seven and b is fifteen! You traced it like a pro runner!',
            },
          },
        ],
      },
      {
        id: '2.2',
        title: "Logic Gates & De Morgan's Laws",
        objective: "Evaluate AND, OR, NOT and XOR from truth tables, and use De Morgan's laws to rewrite negated expressions.",
        beats: [
          {
            say: "Booleans are true or false, which computers store as one or zero! The AND gate outputs one only when both inputs are one. The OR gate outputs one when at least one input is one. Try flipping the inputs on the board and watch the light!",
            board: [
              { type: 'formula', text: 'A B | A AND B | A OR B\n0 0 |    0    |   0\n0 1 |    0    |   1\n1 0 |    0    |   1\n1 1 |    1    |   1' },
              { type: 'callout', text: 'AND: both runners must finish. OR: at least one runner finishes.', tone: 'tip' },
            ],
            widget: { type: 'logicGates', props: { gate: 'AND' } },
          },
          {
            say: "NOT is the simplest gate: it just flips the input, so one becomes zero and zero becomes one. Logic gates are tiny circuits built from transistors, and every adder and memory cell in a processor is made by chaining them together. Teamwork at the smallest scale!",
            board: [
              { type: 'term', term: 'Logic gate', def: 'A circuit that takes one or more bits in and produces one bit out according to a Boolean rule.' },
              { type: 'formula', text: 'NOT 0 → 1\nNOT 1 → 0' },
            ],
          },
          {
            say: "XOR means exclusive or: it outputs one only when the inputs are different! It's like a baton handoff, exactly one runner holds it, never both and never nobody. XOR is how a computer makes the sum bit when it adds two bits.",
            board: [
              { type: 'formula', text: 'A B | A XOR B\n0 0 |    0\n0 1 |    1\n1 0 |    1\n1 1 |    0' },
              { type: 'formula', text: 'A XOR B = (A OR B) AND NOT (A AND B)' },
            ],
            widget: { type: 'logicGates', props: { gate: 'XOR' } },
          },
          {
            say: "De Morgan's laws are a flip and swap move! To push a NOT inside, negate each piece and swap AND with OR. So not A and B becomes not A or not B. And remember, the opposite of greater than is less than or equal to!",
            board: [
              { type: 'formula', text: 'NOT (A AND B) ≡ (NOT A) OR (NOT B)\nNOT (A OR B)  ≡ (NOT A) AND (NOT B)' },
              { type: 'formula', text: 'not (x > 5 and y > 5)  ≡  x <= 5 or y <= 5' },
              { type: 'callout', text: 'NAND = NOT (A AND B): it outputs 0 only when both inputs are 1.', tone: 'example' },
            ],
            widget: { type: 'logicGates', props: { gate: 'NAND' } },
          },
          {
            say: "Back to the XOR gate for your challenge! Set the two inputs so the output lights up with a one. Remember the baton rule. Ganbarou!",
            board: [
              { type: 'heading', text: 'Challenge: make XOR output 1' },
            ],
            widget: { type: 'logicGates', props: { gate: 'XOR' } },
            check: {
              prompt: 'Set the inputs so the XOR gate outputs 1.',
              expect: { gate: 'XOR', out: 1 },
              hint: 'XOR only outputs one when the two inputs are different. Turn on exactly one of them.',
              praise: 'Clean handoff! One input on and one input off, so XOR lights up! Shishishi!',
            },
          },
        ],
      },
      {
        id: '2.3',
        title: 'Conditional Branching & Nested Selection',
        objective: 'Trace if, elif and else chains and nested conditionals to predict exactly which branch runs.',
        beats: [
          {
            say: "An if statement checks a Boolean condition, and its block runs only when the condition is true! Conditions use comparison operators like equal to, not equal to, less than and greater than or equal to. It's like a coach saying, if your time beats sixty seconds, you make the team!",
            board: [
              { type: 'formula', text: 'if time < 60:\n    print("You made the team!")' },
              { type: 'bullets', items: ['==  equal', '!=  not equal', '<  <=  >  >='] },
              { type: 'callout', text: 'AP CSP pseudocode: IF (condition) { ... } ELSE { ... }', tone: 'tip' },
            ],
          },
          {
            say: "With if, elif and else, Python checks the conditions from the top, and only the first true branch runs! That means order matters. If you check sixty or more before ninety or more, a ninety five gets a D. Oops!",
            board: [
              { type: 'formula', text: 'score = 95\nif score >= 60:\n    grade = "D"\nelif score >= 90:\n    grade = "A"   # never reached!' },
              { type: 'callout', text: 'Bug: grade is "D". Check the most restrictive condition first.', tone: 'warn' },
            ],
          },
          {
            say: "Nested selection means an if statement inside another if statement! The inner check only happens if the outer one is true. Here, a seventeen year old with a time of sixty three passes the age check, fails the time check, and lands on the JV team.",
            board: [
              { type: 'formula', text: 'if age >= 16:\n    if time < 60:\n        print("Varsity")\n    else:\n        print("JV")\nelse:\n    print("Youth")' },
              { type: 'steps', items: ['age = 17, time = 63', '17 >= 16 → True, go inside', '63 < 60 → False → else', 'Prints JV'] },
            ],
          },
          {
            say: "Python and Java use short-circuit evaluation! With and, if the left side is false, the right side is never checked at all. That makes it safe to test that x is not zero before you divide by x. Smart pacing!",
            board: [
              { type: 'formula', text: 'if x != 0 and 10 / x > 2:\n    print("big")' },
              { type: 'bullets', items: ['A and B: if A is False, B is skipped', 'A or B: if A is True, B is skipped'] },
            ],
          },
          {
            say: "Your turn! Trace this one carefully. Check the outer condition first, then go inside only if it's true, and remember that only one branch of a chain ever runs!",
            board: [
              { type: 'formula', text: 'x = 7\nif x > 5:\n    if x % 2 == 0:\n        print("A")\n    else:\n        print("B")\nelif x > 2:\n    print("C")\nelse:\n    print("D")' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'What does this code print?', options: ['A', 'B', 'C', 'B and then C'], answer: 1 },
            },
            check: {
              prompt: 'Choose what the program prints.',
              expect: { choice: 1 },
              hint: 'Seven is greater than five, so go inside. Is seven even? And once the first branch runs, does the elif still run?',
              praise: 'Gold medal! Seven is odd, so it prints B, and the elif is skipped completely! Shishishi!',
            },
          },
        ],
      },
    ],
  },

  /* ───────────────────────── Unit 3 ───────────────────────── */
  {
    unit: 3,
    title: 'Iteration, Functions & Code Tracing',
    lessons: [
      {
        id: '3.1',
        title: 'While & For Loops',
        objective: 'Trace while and for loops, count their iterations, and spot off-by-one and infinite-loop bugs.',
        beats: [
          {
            say: "A loop is just running laps! A while loop keeps repeating its body as long as its condition is true. Here, laps starts at zero and goes up by one each time, so the loop stops after three laps!",
            board: [
              { type: 'formula', text: 'laps = 0\nwhile laps < 3:\n    laps = laps + 1\nprint(laps)   # 3' },
              { type: 'callout', text: 'AP CSP: REPEAT UNTIL (condition) stops when the condition becomes TRUE, the opposite of while.', tone: 'warn' },
            ],
          },
          {
            say: "A for loop is perfect when you know how many laps to run! In Python, range stops right before the stop value, so range of five gives zero through four, which is five laps. You can add a step too, so range from two to ten stepping by three gives two, five and eight!",
            board: [
              { type: 'formula', text: 'range(5)        → 0, 1, 2, 3, 4\nrange(2, 10, 3) → 2, 5, 8' },
              { type: 'formula', text: 'AP CSP: REPEAT 5 TIMES { ... }\nJava:   for (int i = 0; i < 5; i++) { ... }' },
            ],
          },
          {
            say: "The accumulator pattern is a classic! Start a total at zero, then add to it every lap. Keep a trace table, one row per lap, and you'll never lose count. Here the loop adds the odd numbers one, three, five and seven, so the total is sixteen!",
            board: [
              { type: 'formula', text: 'total = 0\nfor i in range(1, 8, 2):\n    total = total + i' },
              { type: 'steps', items: ['i = 1, total = 1', 'i = 3, total = 4', 'i = 5, total = 9', 'i = 7, total = 16'] },
            ],
          },
          {
            say: "Two classic bugs to watch for! An infinite loop happens when nothing inside the loop ever makes the condition false, so you run forever. An off-by-one error runs one lap too many or one too few, often from mixing up less than with less than or equal to.",
            board: [
              { type: 'formula', text: 'n = 10\nwhile n > 0:\n    print(n)      # n never changes → infinite loop' },
              { type: 'callout', text: 'Off-by-one: range(1, 10) runs 9 times, not 10.', tone: 'warn' },
            ],
          },
          {
            say: "Trace this loop and count the laps! Each lap, n is cut in half with whole number division, and count goes up by one. Stop the moment the condition fails!",
            board: [
              { type: 'formula', text: 'count = 0\nn = 20\nwhile n > 1:\n    n = n // 2\n    count = count + 1\nprint(count)' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'What does this code print?', options: ['4', '5', '10', '20'], answer: 0 },
            },
            check: {
              prompt: 'Count the iterations and choose the printed value.',
              expect: { choice: 0 },
              hint: 'Write down n each lap: twenty, ten, five, two, one. How many times did it change?',
              praise: 'YESSS! Four laps until n reaches one! And halving like that is a sneak peek at log n! Shishishi!',
            },
          },
        ],
      },
      {
        id: '3.2',
        title: 'Functions, Parameters & Return Values',
        objective: 'Define and call functions with parameters, trace nested calls, and tell the difference between returning and printing a value.',
        beats: [
          {
            say: "A function, which AP CSP calls a procedure, is a named block of code you can run again and again! It's a great abstraction, because you can use it without thinking about the details inside. Write it once, call it every lap!",
            board: [
              { type: 'term', term: 'Function / procedure', def: 'A named group of instructions that may take parameters and may return a value.' },
              { type: 'formula', text: 'def lap_distance(laps):\n    return laps * 400\n\nlap_distance(3)   → 1200' },
            ],
          },
          {
            say: "Parameters are the names in the definition line, and arguments are the actual values you pass in when you call it. Think of parameters as lane assignments and arguments as the runners who show up! Here, meters gets four hundred and seconds gets eighty.",
            board: [
              { type: 'formula', text: 'def pace(meters, seconds):\n    return meters / seconds\n\npace(400, 80)   → 5.0' },
              { type: 'bullets', items: ['Parameters: meters, seconds', 'Arguments: 400, 80'] },
            ],
          },
          {
            say: "Return and print are different teammates! Return passes the value back to the caller and ends the function right away. Print only shows the value on the screen. A Python function with no return statement gives back None!",
            board: [
              { type: 'formula', text: 'def double_print(x):\n    print(x * 2)\n\ndef double_return(x):\n    return x * 2\n\na = double_print(3)    # shows 6, a is None\nb = double_return(3)   # b is 6' },
              { type: 'callout', text: 'Variables made inside a function are local: they do not exist outside it.', tone: 'tip' },
            ],
          },
          {
            say: "When calls are nested, run the inner one first, like passing the baton from the inside out! Add lap of four returns five, then double of five returns ten. Then print shows ten!",
            board: [
              { type: 'formula', text: 'def add_lap(n):\n    return n + 1\n\ndef double(n):\n    return n * 2\n\nprint(double(add_lap(4)))' },
              { type: 'steps', items: ['add_lap(4) → 5', 'double(5) → 10', 'prints 10'] },
            ],
          },
          {
            say: "Final sprint! Trace each call to mystery separately, then add the two results. Remember that the first return the function reaches ends it!",
            board: [
              { type: 'formula', text: 'def mystery(a, b):\n    if a > b:\n        return a - b\n    return b - a\n\nprint(mystery(3, 10) + mystery(9, 4))' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'What does this code print?', options: ['12', '2', '-2', '7'], answer: 0 },
            },
            check: {
              prompt: 'Trace both calls and choose the printed value.',
              expect: { choice: 0 },
              hint: 'The function always returns the bigger number minus the smaller one. Find each result, then add them.',
              praise: 'Victory lap! Seven plus five is twelve. You read that function like a playbook!',
            },
          },
        ],
      },
      {
        id: '3.3',
        title: 'Recursion & Call Stack Tracing',
        objective: 'Identify the base case and recursive case of a recursive function and trace its calls and returns on the call stack.',
        beats: [
          {
            say: "Recursion is a relay race! A recursive function calls itself on a smaller version of the problem, passing the baton down the line. It needs a base case that stops the race, and a recursive case that moves closer to that base case every call.",
            board: [
              { type: 'formula', text: 'def fact(n):\n    if n == 0:          # base case\n        return 1\n    return n * fact(n - 1)   # recursive case' },
              { type: 'term', term: 'Base case', def: 'The condition where the function returns without calling itself.' },
            ],
          },
          {
            say: "Every call gets its own frame pushed onto the call stack. Fact of three waits for fact of two, which waits for fact of one, which waits for fact of zero. When the base case returns one, the frames pop off in reverse order and the answers multiply back up to six!",
            board: [
              { type: 'steps', items: ['fact(3) waits: 3 * fact(2)', 'fact(2) waits: 2 * fact(1)', 'fact(1) waits: 1 * fact(0)', 'fact(0) returns 1', 'unwind: 1 → 1 → 2 → 6'] },
            ],
          },
          {
            say: "Forget the base case, and the calls never stop! The stack keeps growing until it runs out of room, which is called a stack overflow. Python stops it with a recursion error after about a thousand calls.",
            board: [
              { type: 'formula', text: 'def countdown(n):\n    print(n)\n    countdown(n - 1)   # no base case!' },
              { type: 'callout', text: 'RecursionError: maximum recursion depth exceeded', tone: 'warn' },
            ],
          },
          {
            say: "Here's a tracing secret! Code after the recursive call runs on the way back up the stack, so it happens in reverse order. Relay of three goes all the way down to zero, prints Go first, then prints one, two, three as each frame finishes!",
            board: [
              { type: 'formula', text: 'def relay(n):\n    if n == 0:\n        print("Go!")\n        return\n    relay(n - 1)\n    print(n)\n\nrelay(3)' },
              { type: 'formula', text: 'Output: Go!  1  2  3' },
            ],
          },
          {
            say: "Your turn to run the relay! Write down each call, find where it hits the base case, then add everything on the way back up. Ganbarou!",
            board: [
              { type: 'formula', text: 'def f(n):\n    if n <= 1:\n        return 1\n    return n + f(n - 2)\n\nprint(f(7))' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'What does this code print?', options: ['16', '15', '28', '13'], answer: 0 },
            },
            check: {
              prompt: 'Trace the recursive calls and choose the printed value.',
              expect: { choice: 0 },
              hint: 'F of seven calls f of five, then f of three, then f of one, which returns one. Add seven, five, three and one.',
              praise: 'Shishishi! Seven plus five plus three plus one is sixteen! The whole relay team crossed the line!',
            },
          },
        ],
      },
    ],
  },

  /* ───────────────────────── Unit 4 ───────────────────────── */
  {
    unit: 4,
    title: 'Data Structures',
    lessons: [
      {
        id: '4.1',
        title: '1D & 2D Arrays and Lists',
        objective: 'Access, update and traverse 1D and 2D lists by index, including row-by-row traversal with nested loops.',
        beats: [
          {
            say: "A list, or array, stores many values in order under one name! Each value has an index, and in Python and Java the first index is zero, so the last index is the length minus one. Big warning: on the AP CSP exam's pseudocode, lists start at index one!",
            board: [
              { type: 'formula', text: 'times = [52, 48, 55, 50]\ntimes[0] → 52\ntimes[3] → 50\nlen(times) → 4\ntimes[4] → IndexError' },
              { type: 'callout', text: 'AP CSP pseudocode: the first element is at index 1. Python and Java: index 0.', tone: 'warn' },
            ],
          },
          {
            say: "Traversing means visiting every element, one lap per item! To find the fastest time, start with the first one as the best, then compare each time and keep the smaller one. After the loop, best is forty eight!",
            board: [
              { type: 'formula', text: 'best = times[0]\nfor t in times:\n    if t < best:\n        best = t\n# best → 48' },
              { type: 'bullets', items: ['Python: append, insert, pop, len', 'AP CSP: APPEND, INSERT, REMOVE, LENGTH', 'Java: int[] fixed size; ArrayList grows'] },
            ],
          },
          {
            say: "A 2D list is a list of lists, like a grid of seats in a stadium! You pick the row first, then the column. So grid of one, zero means row one, column zero, which is four.",
            board: [
              { type: 'formula', text: 'grid = [[1, 2, 3],\n        [4, 5, 6]]\n\ngrid[1][0] → 4\nlen(grid) → 2 rows\nlen(grid[0]) → 3 columns' },
              { type: 'callout', text: 'Always grid[row][col]: row first, column second.', tone: 'tip' },
            ],
          },
          {
            say: "To visit every cell, use nested loops! The outer loop walks the rows and the inner loop walks the columns in each row. That's called row-major order, and here it adds up all six values to twenty one!",
            board: [
              { type: 'formula', text: 'total = 0\nfor row in grid:\n    for val in row:\n        total += val\n# total → 21' },
              { type: 'formula', text: 'Java: int[][] grid = new int[2][3];\ngrid.length → rows, grid[0].length → columns' },
            ],
          },
          {
            say: "Quick challenge! Find the value at row one, column two in this grid. Count from zero for both the row and the column!",
            board: [
              { type: 'formula', text: 'grid = [[3, 8, 1],\n        [6, 2, 9],\n        [4, 7, 5]]\n\nprint(grid[1][2])' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'What does print(grid[1][2]) show?', options: ['9', '7', '8', '2'], answer: 0 },
            },
            check: {
              prompt: 'Choose the value printed by the code.',
              expect: { choice: 0 },
              hint: 'Row one is the middle row, six, two, nine. Column two is the third value in that row.',
              praise: 'Bullseye! Middle row, last seat, nine! Your indexing form is perfect!',
            },
          },
        ],
      },
      {
        id: '4.2',
        title: 'Stacks (LIFO) & Queues (FIFO)',
        objective: 'Simulate push and pop on a stack and enqueue and dequeue on a queue, and choose the right one for a task.',
        beats: [
          {
            say: "A stack is like a pile of gym mats: the last mat you put on is the first one you take off! That's called last in, first out. You push to add to the top, pop to remove from the top, and peek to look at the top without removing it.",
            board: [
              { type: 'term', term: 'Stack (LIFO)', def: 'Last in, first out. push, pop and peek all happen at the top.' },
              { type: 'formula', text: 'mats = ["red", "blue"]\nmats.append("green")   # push\nmats.pop()             # → "green"' },
              { type: 'bullets', items: ['Undo button', 'Browser back button', 'The call stack from recursion'] },
            ],
          },
          {
            say: "A queue is the line at the water fountain: first come, first served! That's first in, first out. You enqueue at the back and dequeue from the front. Queues hold print jobs, packets waiting inside a router, and players waiting for a match!",
            board: [
              { type: 'term', term: 'Queue (FIFO)', def: 'First in, first out. Enqueue at the back, dequeue from the front.' },
              { type: 'formula', text: 'from collections import deque\nline = deque()\nline.append("Ichika")   # enqueue\nline.popleft()          # dequeue → "Ichika"' },
              { type: 'callout', text: 'Use deque.popleft(): list.pop(0) has to shift every item, which is O(n).', tone: 'tip' },
            ],
          },
          {
            say: "Let's trace a stack together! Push one, push two, pop, push three, push four, pop. Each pop takes the newest item, so we end with one on the bottom and three on top.",
            board: [
              { type: 'steps', items: ['push 1 → [1]', 'push 2 → [1, 2]', 'pop → [1]', 'push 3, push 4 → [1, 3, 4]', 'pop → [1, 3]'] },
            ],
          },
          {
            say: "Stacks are great for checking brackets in code! Push every opening bracket, and when you see a closing one, pop and make sure it matches. If every pair matches and the stack is empty at the end, the brackets are balanced!",
            board: [
              { type: 'steps', items: ['"( [ ] )": push (', 'push [', '] matches [ → pop', ') matches ( → pop', 'stack empty → balanced'] },
              { type: 'callout', text: '"( [ ) ]" fails: ) arrives while [ is on top.', tone: 'example' },
            ],
          },
          {
            say: "My sisters are lining up for the water fountain! Trace the queue carefully and figure out who is at the front at the end. First in, first out!",
            board: [
              { type: 'formula', text: 'q = deque()\nq.append("Ichika")\nq.append("Nino")\nq.append("Miku")\nq.popleft()\nq.append("Yotsuba")\nprint(q[0])' },
            ],
            widget: {
              type: 'boardQuiz',
              props: { q: 'Who is printed?', options: ['Ichika', 'Nino', 'Miku', 'Yotsuba'], answer: 1 },
            },
            check: {
              prompt: 'Choose who is at the front of the queue.',
              expect: { choice: 1 },
              hint: 'Popleft removes whoever arrived first. Yotsuba joins at the back, not the front.',
              praise: 'YESSS! Ichika got her drink and left, so Nino is at the front! First in, first out! Shishishi!',
            },
          },
        ],
      },
      {
        id: '4.3',
        title: 'Hash Maps, Trees & Graphs',
        objective: 'Explain how hash maps, trees and graphs organise data, and insert values into a binary search tree.',
        beats: [
          {
            say: "A hash map, which Python calls a dictionary, stores key and value pairs! A hash function turns each key into a bucket number, so looking something up usually takes constant time, no matter how big the map gets. Keys must be unique, like jersey numbers on a team!",
            board: [
              { type: 'formula', text: 'best = {"Yotsuba": 11.8, "Miku": 14.2}\nbest["Yotsuba"] → 11.8' },
              { type: 'term', term: 'Hash function', def: 'Turns a key into an index (bucket) where its value is stored.' },
              { type: 'callout', text: 'Two keys in one bucket = a collision. Average lookup O(1), worst case O(n).', tone: 'tip' },
            ],
          },
          {
            say: "A tree stores data in a hierarchy! There's one root at the top, each node can have children, and nodes with no children are leaves. Folders on your computer and the parts of a web page are both trees, and trees never loop back on themselves.",
            board: [
              { type: 'steps', items: ['Root: the top node', 'Parent → children', 'Leaves: nodes with no children'] },
              { type: 'bullets', items: ['File folders', 'HTML page structure', 'Tournament brackets'] },
            ],
          },
          {
            say: "A binary search tree is a special tree where each node has at most two children. Everything smaller goes to the left, and everything bigger goes to the right. So to insert a value, you start at the root and go left or right at each node until you find an empty spot!",
            board: [
              { type: 'term', term: 'Binary search tree (BST)', def: 'Left subtree < node < right subtree. Balanced BSTs search in O(log n).' },
              { type: 'formula', text: '        50\n       /  \\\n     30    70\n    /  \\\n  20    40' },
            ],
          },
          {
            say: "A graph is the most flexible of all! It has nodes, also called vertices, connected by edges, and unlike a tree it can have loops. Road maps, social networks and the routers of the internet are all graphs, and edges can have directions or weights like distance!",
            board: [
              { type: 'term', term: 'Graph', def: 'Vertices (nodes) connected by edges. May be directed, weighted, and contain cycles.' },
              { type: 'bullets', items: ['Breadth-first search uses a queue', 'Depth-first search uses a stack', 'Every tree is a graph, but not every graph is a tree'] },
            ],
          },
          {
            say: "Tree challenge! Insert fifty, then thirty, then seventy, then twenty into an empty binary search tree. Where does twenty end up? Start at the root every time!",
            board: [
              { type: 'formula', text: 'Insert in order: 50, 30, 70, 20' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'After inserting 50, 30, 70, 20 into an empty BST, where is 20?',
                options: ['Right child of 50', 'Left child of 30', 'Right child of 30', 'Left child of 70'],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose where 20 is placed.',
              expect: { choice: 1 },
              hint: 'Twenty is smaller than fifty, so go left to thirty. Is twenty smaller or bigger than thirty?',
              praise: 'Perfect path! Left at fifty, left at thirty, and twenty settles in! Gold medal!',
            },
          },
        ],
      },
    ],
  },

  /* ───────────────────────── Unit 5 ───────────────────────── */
  {
    unit: 5,
    title: 'Algorithms & Big-O',
    lessons: [
      {
        id: '5.1',
        title: 'Linear Search vs Binary Search',
        objective: 'Compare linear and binary search, trace the midpoints binary search checks, and explain why it needs sorted data.',
        beats: [
          {
            say: "Linear search, also called sequential search, checks every item from the start until it finds the target. It works on any list, sorted or not! But in the worst case, a list of n items takes n checks.",
            board: [
              { type: 'formula', text: 'def linear_search(items, target):\n    for i in range(len(items)):\n        if items[i] == target:\n            return i\n    return -1' },
            ],
            widget: { type: 'search', props: { array: [4, 9, 13, 21, 30, 36, 42, 57, 63], target: 42, mode: 'linear' } },
          },
          {
            say: "Binary search is way faster, but the list must be sorted first! It checks the middle element, then throws away the half that can't hold the target. It keeps halving until it finds the target or runs out of items, like guessing a finish time with higher or lower!",
            board: [
              { type: 'steps', items: ['Check the middle', 'Target bigger? Keep the right half', 'Target smaller? Keep the left half', 'Repeat until found or empty'] },
              { type: 'callout', text: 'Binary search only works on sorted data.', tone: 'warn' },
            ],
          },
          {
            say: "The middle index is low plus high, divided by two, rounded down. Searching for thirty one in seven items, the first middle is index three, which holds eighteen. Thirty one is bigger, so low moves to four, the next middle is index five, and there it is!",
            board: [
              { type: 'formula', text: 'mid = (low + high) // 2' },
              { type: 'formula', text: '[3, 7, 12, 18, 25, 31, 40], target 31\nmid = (0 + 6) // 2 = 3 → 18 < 31 → low = 4\nmid = (4 + 6) // 2 = 5 → 31 found!' },
            ],
          },
          {
            say: "Here's why binary search wins on big lists! Each check cuts the list in half, so a thousand items take at most about ten checks, and a million items take about twenty. Linear search might need a million checks for that same list!",
            board: [
              { type: 'bullets', items: ['n = 1,000: linear ≤ 1,000 checks, binary ≤ 10', 'n = 1,000,000: linear ≤ 1,000,000, binary ≤ 20', 'Linear: O(n). Binary: O(log n)'] },
              { type: 'callout', text: 'If the data is unsorted and you search only once, linear search may be the better choice.', tone: 'tip' },
            ],
          },
          {
            say: "Starting line, everyone! This sorted list has thirteen numbers. Click the very first index that binary search checks. Low is zero and high is twelve!",
            board: [
              { type: 'heading', text: 'Challenge: first binary search check' },
              { type: 'formula', text: 'low = 0, high = 12\nmid = (low + high) // 2' },
            ],
            widget: { type: 'search', props: { array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 72, 81, 94], target: 67, mode: 'binary' } },
            check: {
              prompt: 'Click the first index binary search checks.',
              expect: { picked: 6 },
              hint: 'Add low and high, zero plus twelve, then divide by two. That index is the middle.',
              praise: 'YESSS! Index six, the value thirty eight, right in the middle! Sixty seven is bigger, so the left half is out! Shishishi!',
            },
          },
        ],
      },
      {
        id: '5.2',
        title: 'Sorting: Selection, Insertion & Merge Sort',
        objective: 'Trace passes of selection sort, insertion sort and merge sort and compare their efficiency.',
        beats: [
          {
            say: "Selection sort is like picking the fastest runner for the front of the line! Each pass finds the smallest value in the unsorted part and swaps it to the front of that part. It always makes about n squared over two comparisons, even if the list is already sorted.",
            board: [
              { type: 'steps', items: ['[29, 10, 14, 37, 13]', 'Pass 1: swap 10 ↔ 29 → [10, 29, 14, 37, 13]', 'Pass 2: swap 13 ↔ 29 → [10, 13, 14, 37, 29]', 'Pass 3: 14 already in place', 'Pass 4: swap 29 ↔ 37 → [10, 13, 14, 29, 37]'] },
            ],
          },
          {
            say: "Insertion sort works like sorting cards in your hand! Take the next item and slide it left until it fits into the sorted part. On a list that's nearly sorted, it barely has to move anything, so it can run in linear time!",
            board: [
              { type: 'steps', items: ['[29, 10, 14, 37, 13]', 'Insert 10 → [10, 29, 14, 37, 13]', 'Insert 14 → [10, 14, 29, 37, 13]', 'Insert 37 → no move', 'Insert 13 → [10, 13, 14, 29, 37]'] },
            ],
          },
          {
            say: "Merge sort is a divide and conquer relay! Split the list in half again and again until each piece has one item, then merge the sorted pieces back together. It takes n log n time every single time, but it needs extra memory for the merging.",
            board: [
              { type: 'steps', items: ['[38, 27, 43, 3]', 'Split → [38, 27] [43, 3]', 'Split → [38] [27] [43] [3]', 'Merge → [27, 38] [3, 43]', 'Merge → [3, 27, 38, 43]'] },
              { type: 'callout', text: 'Merge sort is usually written with recursion, just like Lesson 3.3.', tone: 'tip' },
            ],
          },
          {
            say: "Let's line up the scoreboard! Selection sort is n squared every time. Insertion sort is n squared in the worst case but fast on nearly sorted data. Merge sort is n log n, which wins big on large lists!",
            board: [
              { type: 'bullets', items: ['Selection: O(n²) always, O(1) extra space', 'Insertion: O(n²) worst, O(n) nearly sorted, O(1) extra space', 'Merge: O(n log n) always, O(n) extra space'] },
              { type: 'callout', text: "Python's sorted() uses Timsort, a hybrid of merge sort and insertion sort.", tone: 'example' },
            ],
          },
          {
            say: "Your sorting sprint! Run selection sort on this list for exactly two passes. Find the smallest value in the unsorted part, swap it forward, then do it once more!",
            board: [
              { type: 'formula', text: 'Selection sort, 2 passes:\n[5, 8, 1, 9, 2, 7]' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'What is the list after two passes of selection sort on [5, 8, 1, 9, 2, 7]?',
                options: ['[1, 2, 5, 9, 8, 7]', '[1, 5, 8, 9, 2, 7]', '[1, 8, 5, 9, 2, 7]', '[1, 2, 5, 7, 8, 9]'],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the list after two selection sort passes.',
              expect: { choice: 0 },
              hint: 'Pass one swaps the one into index zero. Pass two finds the smallest of what is left, which is two, and swaps it into index one.',
              praise: 'Gold medal sort! One and two are locked in at the front, and the rest is still waiting its turn!',
            },
          },
        ],
      },
      {
        id: '5.3',
        title: 'Big-O Time & Space Complexity',
        objective: 'Rank growth rates from constant to exponential, estimate the Big-O of code from its loops, and tell reasonable from unreasonable running times.',
        beats: [
          {
            say: "Big O describes how an algorithm's work grows as the input size n grows! We only care about the fastest growing part, so we drop constants and smaller terms. Three n squared plus five n plus two is just Big O of n squared!",
            board: [
              { type: 'term', term: 'Big-O notation', def: 'An upper bound on how the number of steps grows with input size n, usually for the worst case.' },
              { type: 'formula', text: '3n² + 5n + 2  →  O(n²)\n2n + 100      →  O(n)' },
            ],
          },
          {
            say: "Here's the growth ladder from fastest to slowest! Constant, log n, n, n log n, n squared, and two to the n. Slide n on the board and watch how fast the n squared bar takes off compared to log n!",
            board: [
              { type: 'steps', items: ['O(1): list index', 'O(log n): binary search', 'O(n): linear search', 'O(n log n): merge sort', 'O(n²): selection sort', 'O(2ⁿ): try every subset'] },
            ],
            widget: { type: 'bigO', props: { n: 10 } },
          },
          {
            say: "You can often read Big O right off the loops! One loop over n items is n. A loop inside a loop is n squared. And a loop that cuts n in half every lap is log n, just like our halving loop in lesson three point one!",
            board: [
              { type: 'formula', text: 'for i in range(n):          # O(n)\n    ...\n\nfor i in range(n):          # O(n²)\n    for j in range(n):\n        ...\n\nwhile n > 1:                # O(log n)\n    n = n // 2' },
            ],
          },
          {
            say: "Space complexity measures how much extra memory an algorithm needs as n grows! Selection sort and insertion sort sort in place, so they use constant extra space. Merge sort needs a helper list, so it uses Big O of n extra space. Sometimes you trade memory for speed!",
            board: [
              { type: 'bullets', items: ['O(1) space: a few variables, sort in place', 'O(n) space: a copy or helper list of size n', 'Recursion uses stack space: one frame per call'] },
            ],
          },
          {
            say: "AP CSP calls polynomial or better algorithms reasonable, and exponential ones unreasonable, because they blow up so fast. At n equals thirty, n squared is only nine hundred, but two to the n is over a billion! Now drag n until the n squared count passes one hundred thousand operations!",
            board: [
              { type: 'formula', text: 'n = 30:  n² = 900   2ⁿ = 1,073,741,824' },
              { type: 'callout', text: 'Reasonable: polynomial or better. Unreasonable: exponential or factorial. Heuristics find good-enough answers fast.', tone: 'tip' },
            ],
            widget: { type: 'bigO', props: { n: 10 } },
            check: {
              prompt: 'Drag n until the quadratic algorithm needs at least 100,000 operations.',
              expect: { quadratic: { min: 100000 } },
              hint: 'Three hundred squared is ninety thousand, so you need a little more than three hundred.',
              praise: 'Shishishi! Around three hundred seventeen, n squared passes one hundred thousand while linear is still tiny! That is why growth rate matters!',
            },
          },
        ],
      },
    ],
  },

  /* ───────────────────────── Unit 6 ───────────────────────── */
  {
    unit: 6,
    title: 'Networks, Internet & Cybersecurity',
    lessons: [
      {
        id: '6.1',
        title: 'Packets, Routers & Fault Tolerance',
        objective: 'Explain how data travels as packets through routers and why redundant paths make the internet fault-tolerant.',
        beats: [
          {
            say: "A computer network is a group of connected devices that can send and receive data, and the internet is a network of networks! Routing is the process of finding a path from the sender to the receiver. Bandwidth is the most data that can be sent in a fixed amount of time, measured in bits per second!",
            board: [
              { type: 'term', term: 'Routing', def: 'Finding a path from sender to receiver.' },
              { type: 'term', term: 'Bandwidth', def: 'The maximum amount of data sent in a fixed amount of time, usually measured in bits per second.' },
            ],
          },
          {
            say: "Data doesn't travel as one giant chunk. It's split into packets, and each packet carries a piece of the data plus metadata, like the destination address and its position in the message. Packets can arrive in order, out of order, or not at all, so the receiver puts them back together!",
            board: [
              { type: 'formula', text: 'Packet = [ header: from, to, #3 of 8 ] + [ chunk of data ]' },
              { type: 'steps', items: ['Split the message into packets', 'Each packet is routed on its own', 'Reassemble by sequence number'] },
            ],
          },
          {
            say: "Routers are the relay runners of the internet! Each router looks at a packet's destination address and passes it to the next hop that gets it closer. Routes are chosen as the packets travel, so two packets from the same message can take different roads!",
            board: [
              { type: 'term', term: 'Router', def: 'A device that forwards packets toward their destination, one hop at a time.' },
              { type: 'callout', text: 'Packet switching: no single fixed path is reserved for the whole message.', tone: 'tip' },
            ],
          },
          {
            say: "Redundancy means adding extra components, like extra paths between routers, so a failure doesn't stop everything. A system that keeps working when parts fail is fault-tolerant, and the internet was designed that way on purpose! The trade-off is that redundancy costs extra resources.",
            board: [
              { type: 'term', term: 'Fault tolerance', def: 'A system can support failures and still continue to function.' },
              { type: 'callout', text: 'Router B fails → packets reroute A → C → D. Redundancy costs more, but nothing stops.', tone: 'example' },
            ],
          },
          {
            say: "Network challenge! Look at the connections between routers A, B, C and D. Count the smallest number of connections that would have to break before A can't reach D at all!",
            board: [
              { type: 'formula', text: 'Connections: A–B, A–C, B–C, B–D, C–D' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'What is the minimum number of connections that must fail before A can no longer reach D?',
                options: ['1', '2', '3', '5'],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose the minimum number of failed connections that cuts A off from D.',
              expect: { choice: 1 },
              hint: 'Try breaking just one connection. Can A still find another path? Then look at how many connections A itself has.',
              praise: 'YESSS! A has only two connections, so breaking both cuts it off, but any single failure gets routed around. That is fault tolerance!',
            },
          },
        ],
      },
      {
        id: '6.2',
        title: 'TCP/IP, UDP, HTTP & the DNS Hierarchy',
        objective: 'Describe the jobs of IP, TCP, UDP, HTTP and DNS and trace how a web request uses each one.',
        beats: [
          {
            say: "A protocol is an agreed-upon set of rules for how data is sent and received. The internet runs on open protocols, so any device that follows the rules can join the team! They stack in layers, and each layer has one job.",
            board: [
              { type: 'term', term: 'Protocol', def: 'An agreed-upon set of rules that specify the behavior of a system.' },
              { type: 'steps', items: ['Application: HTTP, DNS', 'Transport: TCP, UDP', 'Internet: IP', 'Link: Wi-Fi, Ethernet'] },
            ],
          },
          {
            say: "IP, the Internet Protocol, handles addressing and routing, so every device gets an IP address, like a bib number! The old version, IPv4, uses thirty two bits, which gives only about four point three billion addresses. IPv6 uses one hundred twenty eight bits, so we'll basically never run out!",
            board: [
              { type: 'formula', text: 'IPv4: 32 bits → 2³² ≈ 4.3 billion addresses\nIPv6: 128 bits → 2¹²⁸ ≈ 3.4 × 10³⁸ addresses' },
              { type: 'formula', text: 'IPv4: 192.168.1.10' },
            ],
          },
          {
            say: "TCP and UDP both carry data on top of IP, but they race differently! TCP sets up a connection, numbers the packets, and resends any that get lost, so it's reliable but slower. UDP just sends and never looks back, so it's faster, and live video and online games use it.",
            board: [
              { type: 'bullets', items: ['TCP: connection, ordering, acknowledgments, resends lost packets', 'UDP: no guarantees, less overhead, faster', 'TCP: web pages, email, downloads', 'UDP: video calls, games, live streams'] },
            ],
          },
          {
            say: "The World Wide Web is a system of linked pages and files that runs on the internet, and HTTP is its protocol! The internet is the roads, and the web is one kind of traffic on them. HTTPS is HTTP with encryption, so nobody along the route can read your data.",
            board: [
              { type: 'term', term: 'HTTP', def: 'HyperText Transfer Protocol: how browsers request pages and servers respond. Classic HTTP runs on TCP; HTTP/3 runs on QUIC over UDP.' },
              { type: 'callout', text: 'The Internet ≠ the Web. The Web is a service that uses the Internet.', tone: 'warn' },
            ],
          },
          {
            say: "DNS turns names like example dot com into IP addresses, and it's organised as a hierarchy! With nothing cached, the resolver asks a root server, which points to the dot com server, which points to the name server for example dot com, which finally gives the address. Which one gets asked first?",
            board: [
              { type: 'steps', items: ['Resolver: "Where is www.example.com?"', 'Root server → ask the .com servers', '.com TLD server → ask example.com', 'Authoritative server → IP address (e.g. 203.0.113.7)'] },
              { type: 'callout', text: 'Answers are cached, so most lookups never reach the root.', tone: 'tip' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Nothing is cached. Which DNS server does the resolver ask FIRST for www.example.com?',
                options: ['A root name server', 'The .com top-level domain server', "example.com's authoritative server", 'The web server at www.example.com'],
                answer: 0,
              },
            },
            check: {
              prompt: 'Choose the first DNS server the resolver contacts.',
              expect: { choice: 0 },
              hint: 'DNS is a tree read from the top down. What sits above dot com?',
              praise: 'Gold medal! The root points to dot com, dot com points to example dot com, and the address comes home! Shishishi!',
            },
          },
        ],
      },
      {
        id: '6.3',
        title: 'Symmetric vs Public Key Encryption & Cybersecurity',
        objective: 'Compare symmetric and public key encryption, explain certificates and multifactor authentication, and recognize phishing and malware.',
        beats: [
          {
            say: "Encryption scrambles data so only someone with the key can read it, and decryption unscrambles it! In symmetric encryption, the same key locks and unlocks the message. A Caesar cipher that shifts every letter by three is a tiny example, but real systems like AES use huge keys!",
            board: [
              { type: 'term', term: 'Symmetric key encryption', def: 'One key is used for both encryption and decryption.' },
              { type: 'formula', text: 'Caesar shift 3: GANBAROU → JDQEDURX' },
              { type: 'callout', text: 'Problem: how do you share the secret key safely in the first place?', tone: 'warn' },
            ],
          },
          {
            say: "Public key encryption fixes that! Each person has a key pair: a public key that anyone can use to encrypt, and a private key that only the owner uses to decrypt. It's like handing out open padlocks: anyone can snap one shut, but only you have the key that opens it!",
            board: [
              { type: 'term', term: 'Public key encryption', def: 'Pairs a public key for encryption with a private key for decryption. The sender never needs the private key.' },
              { type: 'steps', items: ['Itsuki shares her public key', 'Yotsuba encrypts with it', "Only Itsuki's private key decrypts"] },
            ],
          },
          {
            say: "Real websites use both on the same team! HTTPS uses public key encryption to agree on a shared symmetric key, then switches to symmetric encryption because it's much faster. Certificate authorities issue digital certificates that prove a public key really belongs to that website!",
            board: [
              { type: 'bullets', items: ['Public key: safe key exchange', 'Symmetric key: fast bulk encryption', 'Certificate authority: vouches for who owns a public key'] },
            ],
          },
          {
            say: "Now let's guard the goal! Phishing tricks you into giving up personal information, often with a fake message that says hurry. Malware is harmful software, like a virus that copies itself. Multifactor authentication stops many attacks because a stolen password alone isn't enough!",
            board: [
              { type: 'bullets', items: ['Phishing: fake messages that steal logins', 'Keylogging: records your keystrokes', 'Malware and viruses: harmful programs', 'Rogue access point: fake Wi-Fi'] },
              { type: 'term', term: 'Multifactor authentication', def: 'At least two of: something you know (password), something you have (phone), something you are (fingerprint).' },
            ],
          },
          {
            say: "Last lap of the whole course, partner! Nino wants to send Miku a secret message with public key encryption. Which key should Nino lock it with?",
            board: [
              { type: 'formula', text: 'Nino → encrypt → network → decrypt → Miku' },
            ],
            widget: {
              type: 'boardQuiz',
              props: {
                q: 'Nino sends Miku a secret message using public key encryption. Which key encrypts it?',
                options: ["Nino's private key", "Miku's public key", "Miku's private key", "Nino's public key"],
                answer: 1,
              },
            },
            check: {
              prompt: 'Choose the key Nino uses to encrypt the message.',
              expect: { choice: 1 },
              hint: 'Only Miku should be able to open it, so use the key that Miku shares with everyone.',
              praise: "YESSS! Nino locks it with Miku's public key, and only Miku's private key can open it! You finished the whole course! Shishishi!",
            },
          },
        ],
      },
    ],
  },
]
