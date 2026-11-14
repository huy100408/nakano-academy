// Miku Nakano · AP Human Geography · Units 1–3
// Topic numbers, titles, and content follow the College Board AP Human Geography
// Course and Exam Description (Effective Fall 2020). Format: src/data/curriculum/README.md

export default [
  // ───────────────────────────── UNIT 1 ─────────────────────────────
  {
    unit: 1,
    title: "Thinking Geographically",
    lessons: [
      {
        id: "1.1",
        title: "Introduction to Maps",
        objective: "Identify reference and thematic maps, read the spatial patterns they show, and explain how the Mercator, Gall-Peters, and Robinson projections distort the Earth.",
        beats: [
          {
            say: "...Mm. Every map is a choice. It shows some things and leaves others out, on purpose. A general's battle map shows roads and rivers, not flowers. Today we learn what maps show, and what they hide.",
            board: [
              { type: "heading", text: "Two kinds of maps" },
              { type: "term", term: "Reference map", def: "Shows locations for general use: political borders, physical features, roads, cities. Example: a road atlas or topographic map." },
              { type: "term", term: "Thematic map", def: "Shows the spatial pattern of one topic or variable. Example: median income by county." },
            ],
          },
          {
            say: "Thematic maps come in a few styles. A choropleth map shades areas by a value, like the percent of people over 65 in each state. Dot maps show where things cluster. Isolines connect points of equal value, like elevation or temperature.",
            board: [
              { type: "bullets", items: ["Choropleth: areas shaded by a rate or ratio", "Dot distribution: each dot = a set number of things", "Graduated symbol: bigger symbol = bigger amount", "Isoline: lines join equal values (elevation, temperature)", "Cartogram: areas resized to show a variable"] },
              { type: "callout", text: "Exam tip: choropleths should map rates (per capita, %), not raw totals.", tone: "tip" },
            ],
          },
          {
            say: "Maps also show patterns. Absolute distance is measured in kilometers or miles. Relative distance is measured in time, cost, or connection, like two hours by train. When things bunch together, that is clustering. When they spread apart, that is dispersal.",
            board: [
              { type: "term", term: "Absolute vs. relative distance", def: "Absolute: measured in physical units (km, mi). Relative: measured in time, cost, or connectivity." },
              { type: "term", term: "Absolute vs. relative direction", def: "Absolute: cardinal directions (N, S, E, W). Relative: left, right, 'out west', 'up north'." },
              { type: "bullets", items: ["Clustering: features grouped closely", "Dispersal: features spread out", "Elevation: height above sea level (contours, shading)"] },
            ],
          },
          {
            say: "The Earth is round, and paper is flat. So every projection distorts something: shape, area, distance, or direction. Mercator keeps shapes and compass directions true, which is why sailors used it. But it swells land near the poles... Greenland looks as big as Africa, which is about fourteen times larger.",
            board: [
              { type: "callout", text: "Every flat map distorts shape, area, distance, or direction. No projection keeps all four.", tone: "warn" },
              { type: "term", term: "Mercator", def: "Conformal: true local shape and straight compass bearings. Area is greatly inflated toward the poles." },
            ],
          },
          {
            say: "Gall-Peters is an equal-area projection. Area is correct, so Africa looks properly huge, but shapes stretch and squash. Robinson is a compromise. A little wrong everywhere... very wrong nowhere.",
            board: [
              { type: "term", term: "Gall-Peters", def: "Equal-area: true relative size of landmasses. Shapes distorted (stretched near the equator, squashed near the poles)." },
              { type: "term", term: "Robinson", def: "Compromise projection: slight distortion of shape, area, distance, and direction; none is exact. Common in classrooms and atlases." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A researcher wants to compare the true land area of countries in Africa and Europe on a world map. Which projection is the best choice?",
                options: [
                  "Mercator, because it preserves shape",
                  "Gall-Peters, because it preserves relative area",
                  "Robinson, because it preserves exact distances",
                  "Any projection, because all projections preserve area",
                ],
                answer: 1,
              },
            },
            check: {
              prompt: "Pick the projection that fits the researcher's goal.",
              expect: { choice: 1 },
              hint: "...Ask what the researcher needs. Size. Which map keeps size honest?",
              praise: "Mm. Gall-Peters. Equal area, so the comparison is fair. Good eye.",
            },
          },
        ],
      },
      {
        id: "1.2",
        title: "Geographic Data",
        objective: "Identify the ways geographers collect data, from fieldwork and written accounts to GIS, satellite navigation, and remote sensing.",
        beats: [
          {
            say: "Before a battle, a good general sends scouts to read the land. Geographers do the same. Data can be gathered in the field, by organizations or by individuals. Some of it is numbers... some of it is words.",
            board: [
              { type: "heading", text: "Where geographic data comes from" },
              { type: "bullets", items: ["Fieldwork: surveys, counts, observation", "Organizations: census bureaus, the UN, companies", "Individuals: researchers, citizen scientists"] },
            ],
          },
          {
            say: "GIS stands for geographic information system. It stacks layers of data on one map, like roads, flood zones, and hospitals, so you can see how they relate. ...Mm. It is the most powerful tool on this list.",
            board: [
              { type: "term", term: "GIS (geographic information system)", def: "Computer system that stores, analyzes, and displays layers of spatial data." },
              { type: "steps", items: ["Layer: roads", "Layer: flood zones", "Layer: hospitals", "Overlay: which hospitals are at risk?"] },
            ],
          },
          {
            say: "Remote sensing means collecting data from a distance, usually by satellites, aircraft, or drones. It can show crop health, city growth, or forest loss without anyone standing there. GPS is different. It uses a network of satellites to find one exact location on the ground.",
            board: [
              { type: "term", term: "Remote sensing", def: "Gathering images or data about Earth's surface from a distance (satellites, aircraft, drones)." },
              { type: "term", term: "GPS / satellite navigation", def: "Satellite system that determines the absolute location (coordinates) of a point." },
              { type: "callout", text: "Remote sensing = images of an area. GPS = coordinates of a point. Online mapping tools combine both.", tone: "tip" },
            ],
          },
          {
            say: "Not all data comes from satellites. Interviews, travel narratives, media reports, policy documents, and photographs hold spatial information too. They tell you how people experience a place, which numbers alone cannot.",
            board: [
              { type: "heading", text: "Written & visual sources" },
              { type: "bullets", items: ["Field observations", "Personal interviews", "Travel narratives", "Media reports & policy documents", "Landscape analysis & photo interpretation"] },
            ],
          },
          {
            say: "Let's test it. Read the scenario, then ask yourself: is this an image of an area, a single point, or people's own words? ...Take your time.",
            board: [
              { type: "callout", text: "Quantitative + qualitative data together give the fullest picture of a place.", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A geographer compares satellite images of the Amazon Basin from 2000 and 2020 to measure how much forest was cleared. Which method of data collection is this?",
                options: ["Remote sensing", "GPS", "Personal interviews", "Census enumeration"],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the data collection method in the scenario.",
              expect: { choice: 0 },
              hint: "Satellite images of a whole region, taken from far above. Not one point, not people's words.",
              praise: "...Remote sensing. Reading the land from the sky. Correct.",
            },
          },
        ],
      },
      {
        id: "1.3",
        title: "The Power of Geographic Data",
        objective: "Explain how census data, satellite imagery, and other geographic data shape decisions by individuals, businesses, and governments, and the effects those decisions have on places.",
        beats: [
          {
            say: "Data is not just pictures. People make decisions with it, and those decisions change places. Individuals, businesses, and governments all use geographic data, at every scale.",
            board: [
              { type: "heading", text: "Data → decisions → geographic effects" },
              { type: "bullets", items: ["Personal: choosing a route, a home, a school", "Business: where to open a store or factory", "Government: where to build, what to fund, how to draw districts"] },
            ],
          },
          {
            say: "A census counts every person in a country. In the United States, it happens every ten years. That count decides how many House seats each state gets, how district lines are drawn, and where federal money goes.",
            board: [
              { type: "term", term: "Census", def: "An official count of a population, usually with data on age, sex, household, and more." },
              { type: "callout", text: "U.S. census (every 10 years) → apportionment of House seats, redistricting, federal funding.", tone: "example" },
            ],
          },
          {
            say: "In 1854, cholera struck London. Doctor John Snow mapped the deaths and saw them cluster around one water pump on Broad Street. The pump handle was removed, and his map became key evidence that cholera spreads through water. ...One map changed public health.",
            board: [
              { type: "heading", text: "John Snow, London, 1854" },
              { type: "steps", items: ["Map cholera deaths", "Deaths cluster near the Broad Street pump", "Pump handle removed", "Evidence: cholera is waterborne"] },
            ],
          },
          {
            say: "Satellite imagery works the same way. After a flood or earthquake, governments compare images to send help where damage is worst. But data can also mislead. If a group is undercounted, it loses representation and funding.",
            board: [
              { type: "bullets", items: ["Disaster response: before/after satellite images", "Business site selection: traffic, income, competitors", "Public health: mapping disease clusters"] },
              { type: "callout", text: "An undercount means fewer seats, fewer services, less money for that place.", tone: "warn" },
            ],
          },
          {
            say: "...Mm. On the exam, always connect the data to its effect on a real place. Who gains, and who is left out?",
            board: [
              { type: "callout", text: "Exam tip: name the decision, the scale, and the effect on the place.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A state government uses census data to decide where to build new hospitals. Which statement best describes the geographic effect of this decision?",
                options: [
                  "Census data cannot be used for local decisions",
                  "It is an example of remote sensing",
                  "It changes which places gain access to health care, so an undercount can leave areas underserved",
                  "It has no spatial effect because hospitals serve everyone equally",
                ],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the best description of the decision's geographic effect.",
              expect: { choice: 2 },
              hint: "Hospitals are built in specific places. What happens to places the data missed?",
              praise: "Correct. Data decides where services go. ...You're thinking like a planner now.",
            },
          },
        ],
      },
      {
        id: "1.4",
        title: "Spatial Concepts",
        objective: "Define and apply absolute and relative location, space, place, flows, distance decay, time-space compression, and pattern.",
        beats: [
          {
            say: "Location comes in two kinds. Absolute location is an exact position, like 35 degrees north, 139 degrees east... that is Tokyo. Relative location describes a place by what is around it. Kai, Takeda Shingen's home province, lies west of Tokyo, beyond the mountains.",
            board: [
              { type: "term", term: "Absolute location", def: "Exact position using coordinates (latitude & longitude) or a street address." },
              { type: "term", term: "Relative location", def: "Position described in relation to other places." },
            ],
          },
          {
            say: "Space is the area between things, and how things are arranged in it. Place is a location with meaning, the identity and feelings people attach to it. Flows are the movements of people, goods, money, and ideas between places.",
            board: [
              { type: "bullets", items: ["Space: area and arrangement", "Place: location + human meaning", "Pattern: clustered, dispersed, linear", "Flows: movement of people, goods, money, ideas"] },
            ],
          },
          {
            say: "Now watch this. Distance decay means interaction gets weaker as distance grows. Near things are more related than distant things. ...Press play, and see how the idea is strongest close to its source.",
            board: [
              { type: "term", term: "Distance decay", def: "Interaction between two places declines as the distance between them increases." },
              { type: "callout", text: "Tobler's First Law: everything is related, but near things are more related than distant things.", tone: "tip" },
            ],
            widget: { type: "diffusion", props: { mode: "contagious" } },
          },
          {
            say: "Technology fights distance decay. Time-space compression means places feel closer because transportation and communication get faster. A message that took days by horse now takes one second. The distance is the same... its friction is weaker.",
            board: [
              { type: "term", term: "Time-space compression", def: "The reduced relative distance between places as transportation and communication speed up." },
              { type: "steps", items: ["Horse messenger: days", "Telegraph: minutes", "Internet: seconds"] },
            ],
          },
          {
            say: "Back to the model. In contagious diffusion, the idea spreads to neighbors first, so the pattern shows distance decay. Step it forward and watch the outer edge fill in last.",
            board: [
              { type: "callout", text: "Strong near the source, weak at the edge = distance decay.", tone: "example" },
            ],
            widget: { type: "diffusion", props: { mode: "contagious" } },
            check: {
              prompt: "Keep the model in contagious mode and advance it to step 5 or later. Watch adoption thin out with distance.",
              expect: { mode: "contagious", step: { min: 5, max: 8 } },
              hint: "...Stay on contagious. Then keep stepping forward until you reach at least step 5.",
              praise: "Mm. See? The center adopted first, the edges last. That is distance decay, drawn in real time.",
            },
          },
        ],
      },
      {
        id: "1.5",
        title: "Human–Environmental Interaction",
        objective: "Explain how sustainability, natural resources, and land use connect people and environment, and how geographic thought moved from environmental determinism to possibilism.",
        beats: [
          {
            say: "People change the environment, and the environment shapes people. Three ideas sit at the center of that relationship: natural resources, land use, and sustainability.",
            board: [
              { type: "term", term: "Natural resources", def: "Materials from nature that people use. Renewable (solar, wind, managed forests) vs. nonrenewable (oil, coal, minerals)." },
              { type: "term", term: "Land use", def: "How people use an area of land: farming, housing, industry, conservation." },
              { type: "term", term: "Sustainability", def: "Meeting present needs without compromising the ability of future generations to meet theirs." },
            ],
          },
          {
            say: "Long ago, some geographers said the environment decides everything. Hot climates make people lazy, cool climates make them clever. This is environmental determinism. ...It was used to justify racism and colonialism, and geographers rejected it.",
            board: [
              { type: "term", term: "Environmental determinism", def: "Theory that the physical environment determines human culture and development." },
              { type: "callout", text: "Discredited: used to justify racism and imperialism (Ellen Semple, Ellsworth Huntington).", tone: "warn" },
            ],
          },
          {
            say: "Possibilism says the environment sets limits and offers options, but people choose. Culture and technology decide what we do with the land. ...Mm. The mountains of Kai did not decide Shingen's fate. He chose how to use them.",
            board: [
              { type: "term", term: "Possibilism", def: "The environment sets limits and offers possibilities; humans choose among them using culture and technology." },
              { type: "steps", items: ["Environmental determinism", "Critique", "Possibilism"] },
            ],
          },
          {
            say: "On the exam, connect these ideas to real choices. Terracing hillsides, building polders, damming rivers... each is a decision with costs. Then ask whether that land use can last. That is sustainability.",
            board: [
              { type: "bullets", items: ["Terraced rice fields: farming steep slopes", "Dutch polders: land reclaimed from the sea", "Dams: power and water, but displaced people and damaged ecosystems"] },
            ],
          },
          {
            say: "Read the scenario. Is the environment in charge here, or are people choosing what to do with it?",
            board: [
              { type: "callout", text: "Possibilism = human choice within environmental limits.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "The Netherlands has turned large areas of seabed into farmland using dikes, canals, and pumps. Which concept does this best illustrate?",
                options: ["Environmental determinism", "Distance decay", "Time-space compression", "Possibilism"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the concept the Dutch polders illustrate.",
              expect: { choice: 3 },
              hint: "The sea set a limit. People used technology to choose another path. Which theory says humans choose?",
              praise: "...Possibilism. The land set the challenge, people answered it. Well done.",
            },
          },
        ],
      },
      {
        id: "1.6",
        title: "Scales of Analysis",
        objective: "Define global, regional, national, and local scales of analysis and explain how changing the scale reveals different patterns and interpretations of data.",
        beats: [
          {
            say: "Scale has two meanings. Map scale is the ratio between distance on a map and distance on the ground. Scale of analysis is the level you study: global, regional, national, or local. ...The exam loves to mix them up.",
            board: [
              { type: "term", term: "Map scale", def: "Ratio of map distance to ground distance, e.g., 1:24,000." },
              { type: "term", term: "Scale of analysis", def: "The level at which data is examined: global, regional, national, local." },
            ],
          },
          {
            say: "A large-scale map shows a small area in great detail, like one valley. A small-scale map shows a large area with little detail, like the whole world. It sounds backward. Think of the fraction: one over twenty-four thousand is bigger than one over ten million.",
            board: [
              { type: "bullets", items: ["Large scale (1:24,000): small area, lots of detail", "Small scale (1:10,000,000): large area, little detail"] },
              { type: "callout", text: "Large-scale map ≠ large area. It means a large fraction.", tone: "warn" },
            ],
          },
          {
            say: "Scales of analysis run from the whole world down to one neighborhood. A pattern that is clear at one scale can disappear at another. So always ask: what scale is this data?",
            board: [
              { type: "steps", items: ["Global", "Regional (e.g., Southeast Asia)", "National", "Local (city, county, neighborhood)"] },
            ],
          },
          {
            say: "Take a United States presidential election. On a state map, each state looks completely red or completely blue. At the county scale, cities vote one way and rural areas another. Same election... a different story.",
            board: [
              { type: "callout", text: "State scale: solid blocks of color. County scale: urban–rural divide appears.", tone: "example" },
              { type: "callout", text: "National averages hide regional and local inequality.", tone: "tip" },
            ],
          },
          {
            say: "Now an exam question. Compare the two maps in your head, then decide what the comparison proves.",
            board: [
              { type: "heading", text: "Patterns change with scale" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A map shows that Brazil's national average income is moderate. A second map of income by municipality reveals extremely rich and extremely poor areas. What does this comparison demonstrate?",
                options: [
                  "Large-scale maps always show less detail",
                  "Map projections distort area",
                  "Changing the scale of analysis can reveal patterns hidden at another scale",
                  "Income data cannot be mapped accurately",
                ],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose what the two maps demonstrate.",
              expect: { choice: 2 },
              hint: "Same country, same data. Only the level of detail changed. What concept is that?",
              praise: "Mm. Zoom in, and the hidden pattern appears. ...You check the scale first. Good habit.",
            },
          },
        ],
      },
      {
        id: "1.7",
        title: "Regional Analysis",
        objective: "Describe formal, functional, and perceptual/vernacular regions and explain why regional boundaries are transitional, contested, and overlapping.",
        beats: [
          {
            say: "A region is an area united by something: a shared characteristic, or a pattern of activity. Geographers draw regions to make a complex world easier to compare. ...But every line we draw is a simplification.",
            board: [
              { type: "term", term: "Region", def: "An area defined by one or more unifying characteristics or by patterns of activity." },
              { type: "callout", text: "Regional analysis works at local, national, and global scales.", tone: "tip" },
            ],
          },
          {
            say: "A formal region, also called a uniform region, shares a trait everywhere inside it. A country, the Corn Belt, or the area where Spanish is the official language. The trait is measurable.",
            board: [
              { type: "term", term: "Formal (uniform) region", def: "Defined by a shared, measurable trait: language, crop, climate, government." },
              { type: "callout", text: "Examples: Japan, the U.S. Corn Belt, Francophone Africa.", tone: "example" },
            ],
          },
          {
            say: "A functional region, or nodal region, is organized around a center. Activity flows to and from that node, like a pizza delivery zone, a TV market, or an airport hub. It weakens toward the edge... distance decay again.",
            board: [
              { type: "term", term: "Functional (nodal) region", def: "Defined by a central node and the flows and connections around it." },
              { type: "steps", items: ["Node (hub)", "Flows: commuters, signals, deliveries", "Edge: interaction fades"] },
            ],
          },
          {
            say: "A perceptual region, or vernacular region, exists in people's minds. The American South. The Middle East. There is no official line, so everyone draws it a little differently. And in all regions, boundaries can be fuzzy, disputed, and overlapping.",
            board: [
              { type: "term", term: "Perceptual (vernacular) region", def: "Defined by people's shared sense of identity or feeling about a place." },
              { type: "bullets", items: ["Transitional: traits fade gradually", "Contested: people disagree where it ends", "Overlapping: one place can sit in many regions"] },
            ],
          },
          {
            say: "One question. Look for the clue: is there a center that everything connects to?",
            board: [
              { type: "callout", text: "Formal = same trait. Functional = connected to a node. Perceptual = how people feel.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A city newspaper's readership is highest downtown and declines steadily toward the suburbs and rural areas. The area it serves is best described as a",
                options: ["formal region", "perceptual region", "functional region", "climate region"],
                answer: 2,
              },
            },
            check: {
              prompt: "Classify the newspaper's service area.",
              expect: { choice: 2 },
              hint: "...There is a center, and the connection weakens with distance. Which region is built around a node?",
              praise: "Functional. A node and its flows. ...Like a castle town and the roads leading to it.",
            },
          },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 2 ─────────────────────────────
  {
    unit: 2,
    title: "Population and Migration Patterns and Processes",
    lessons: [
      {
        id: "2.1",
        title: "Population Distribution",
        objective: "Identify the physical and human factors that shape where people live and calculate and compare arithmetic, physiological, and agricultural density.",
        beats: [
          {
            say: "People are not spread evenly across the Earth. Most live in a few clusters: East Asia, South Asia, Europe, and Southeast Asia. The part of Earth that people permanently live on is called the ecumene.",
            board: [
              { type: "term", term: "Ecumene", def: "The portion of Earth's surface permanently inhabited by humans." },
              { type: "bullets", items: ["East Asia", "South Asia", "Europe", "Southeast Asia"] },
            ],
          },
          {
            say: "Why there? Physical factors: mild climates, flat land, rivers, and coasts. Human factors: culture, economics, history, and politics. ...And the factors change with scale. Globally it is climate. Inside one city, it might be the price of rent.",
            board: [
              { type: "bullets", items: ["Physical: climate, landforms, water bodies", "Human: culture, economics, history, politics"] },
              { type: "callout", text: "The factors that explain distribution vary by scale of analysis.", tone: "tip" },
            ],
          },
          {
            say: "Density measures crowding, in three ways. Arithmetic density is the total population divided by total land area. Physiological density is the population divided by arable land, land that can grow crops. It shows pressure on farmland.",
            board: [
              { type: "formula", text: "Arithmetic density = population ÷ total land area" },
              { type: "formula", text: "Physiological density = population ÷ arable land" },
            ],
          },
          {
            say: "Agricultural density is farmers divided by arable land. A high number usually means less mechanized farming, often in less developed countries. Egypt shows why the method matters. Its overall density looks moderate, but almost everyone lives along the Nile, so its physiological density is very high.",
            board: [
              { type: "formula", text: "Agricultural density = farmers ÷ arable land" },
              { type: "callout", text: "Egypt: ~110 people/km² overall, but under 4% of land is arable → physiological density in the thousands per km².", tone: "example" },
            ],
          },
          {
            say: "Now apply it. Compare the two numbers in the question, then think about what the gap between them means.",
            board: [
              { type: "callout", text: "Physiological ≫ arithmetic → little arable land for the population.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Country A's physiological density is many times higher than its arithmetic density. What can you conclude?",
                options: [
                  "Most of its people are farmers",
                  "Its population is evenly distributed",
                  "It is highly urbanized",
                  "Only a small share of its land is arable",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the conclusion the density data supports.",
              expect: { choice: 3 },
              hint: "Physiological density divides by arable land only. If that number is huge, how much arable land must there be?",
              praise: "...Correct. Little farmland, many people. That is pressure on the land.",
            },
          },
        ],
      },
      {
        id: "2.2",
        title: "Consequences of Population Distribution",
        objective: "Explain how population distribution and density affect political, economic, and social processes, the environment, and carrying capacity.",
        beats: [
          {
            say: "Where people live changes everything else. Dense places and empty places face different problems. Today we look at the consequences.",
            board: [
              { type: "heading", text: "Distribution & density affect..." },
              { type: "bullets", items: ["Political: representation, districts, power", "Economic: labor supply, markets, infrastructure", "Social: access to services like medical care"] },
            ],
          },
          {
            say: "Services follow people. A dense city can support hospitals, transit, and universities. A sparse rural area may have one clinic for hundreds of kilometers. ...So people there travel far for care.",
            board: [
              { type: "heading", text: "Density & services" },
              { type: "callout", text: "Australia: the Royal Flying Doctor Service flies medical care to the sparsely populated Outback.", tone: "example" },
            ],
          },
          {
            say: "Population also means political power. Growing regions gain seats in a legislature, and shrinking ones lose them. Businesses follow people too, because the customers and workers are there.",
            board: [
              { type: "callout", text: "After the 2020 U.S. census, Texas gained 2 House seats and Florida gained 1.", tone: "example" },
            ],
          },
          {
            say: "Then the environment. Carrying capacity is the largest population an area can support without damage. Push past it, and you see overused water, cleared forests, and worn-out soil. ...Technology and trade can raise carrying capacity, but not forever.",
            board: [
              { type: "term", term: "Carrying capacity", def: "The maximum population an environment can sustain given its resources and technology." },
              { type: "callout", text: "Overpopulation is relative: it depends on resources, technology, and consumption, not just headcount.", tone: "warn" },
            ],
          },
          {
            say: "Read this scenario like an AP free-response prompt. What problem does the population pattern create, and what fixes that problem directly?",
            board: [
              { type: "callout", text: "Match the solution to the consequence of distribution.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A sparsely populated rural region has an aging population and long travel distances to the nearest hospital. Which policy most directly addresses this consequence of its population distribution?",
                options: [
                  "Expanding telemedicine and mobile clinics",
                  "Building more highways between major cities",
                  "Raising the national retirement age",
                  "Increasing agricultural density",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the policy that best fits the problem.",
              expect: { choice: 0 },
              hint: "The problem is distance to medical care. Which choice brings care to the people?",
              praise: "Mm. Bring the service to where the people are. ...A good strategist adapts to the terrain.",
            },
          },
        ],
      },
      {
        id: "2.3",
        title: "Population Composition",
        objective: "Read population pyramids and sex ratios to describe a population's age structure and predict its future growth and needs.",
        beats: [
          {
            say: "Population composition is who lives in a place: their ages and their sex. Geographers map it at every scale, from countries to single neighborhoods. ...The best tool for it is the population pyramid.",
            board: [
              { type: "term", term: "Age structure", def: "The number or share of people in each age group." },
              { type: "term", term: "Sex ratio", def: "The number of males per 100 females." },
            ],
          },
          {
            say: "Each bar is a five-year age group, with males usually on the left and females on the right. A wide base means many young people and high birth rates. This is an expansive pyramid... think of Niger or Chad.",
            board: [
              { type: "term", term: "Expansive pyramid", def: "Wide base, narrow top: high birth rates, rapid growth (e.g., Niger)." },
            ],
            widget: { type: "pyramid", props: { preset: "expansive" } },
          },
          {
            say: "When the bars stay nearly equal until old age, the pyramid is stationary. Births and deaths are balanced, and growth is slow. It looks more like a column than a pyramid.",
            board: [
              { type: "term", term: "Stationary pyramid", def: "Roughly equal bars until old age: low birth and death rates, slow or zero growth." },
            ],
            widget: { type: "pyramid", props: { preset: "stationary" } },
          },
          {
            say: "A constrictive pyramid has a base narrower than its middle. Fewer births, an aging population, like Japan. Bulges and notches tell stories too: a baby boom, a war, or in Qatar, a huge bulge of working-age men who came as guest workers.",
            board: [
              { type: "term", term: "Constrictive pyramid", def: "Narrow base, wide middle and top: falling births, aging, possible decline (e.g., Japan)." },
              { type: "callout", text: "Qatar / UAE: large male bulge ages 20–44 = guest workers.", tone: "example" },
              { type: "callout", text: "Pyramids predict markets: schools & diapers (wide base) vs. health care & pensions (wide top).", tone: "tip" },
            ],
            widget: { type: "pyramid", props: { preset: "constrictive" } },
          },
          {
            say: "Now you build one. Picture a country in stage 2 of the demographic transition, with very high birth rates and a young population. Choose the shape, then set the birth rate to match.",
            board: [
              { type: "callout", text: "Shape first, then the birth rate.", tone: "tip" },
            ],
            widget: { type: "pyramid", props: { preset: "stationary" } },
            check: {
              prompt: "Build the pyramid of a fast-growing country like Niger: choose the right shape and set the birth rate to 40 or higher.",
              expect: { preset: "expansive", birthRate: { min: 40, max: 50 } },
              hint: "...Fast growth means many babies, so a wide base. Then push the birth rate slider past 40.",
              praise: "Mm. Wide base, high births. An expansive pyramid... heavy at the front, like a formation ready to charge.",
            },
          },
        ],
      },
      {
        id: "2.4",
        title: "Population Dynamics",
        objective: "Calculate and interpret CBR, CDR, NIR, doubling time, TFR, and IMR, and explain how fertility, mortality, and migration change a population.",
        beats: [
          {
            say: "A population changes in only three ways. Births add people, deaths remove them, and migration moves them in or out. Fertility, mortality, migration. Everything else in this unit grows from these three.",
            board: [
              { type: "formula", text: "Population change = (births − deaths) + (immigrants − emigrants)" },
              { type: "callout", text: "Social, cultural, political, and economic factors drive fertility, mortality, and migration.", tone: "tip" },
            ],
          },
          {
            say: "Crude birth rate is births per thousand people per year. Crude death rate is deaths per thousand people per year. Subtract deaths from births, divide by ten, and you get the rate of natural increase, as a percent.",
            board: [
              { type: "term", term: "Crude Birth Rate (CBR)", def: "Live births per 1,000 people per year." },
              { type: "term", term: "Crude Death Rate (CDR)", def: "Deaths per 1,000 people per year." },
              { type: "formula", text: "NIR (%) = (CBR − CDR) ÷ 10" },
            ],
          },
          {
            say: "Say the birth rate is 30 and the death rate is 10. Thirty minus ten is twenty, and twenty divided by ten is two percent. To estimate doubling time, divide 70 by the growth rate. Seventy divided by two... about 35 years.",
            board: [
              { type: "formula", text: "Doubling time ≈ 70 ÷ NIR (%)" },
              { type: "callout", text: "CBR 30, CDR 10 → NIR 2% → population doubles in ~35 years.", tone: "example" },
            ],
          },
          {
            say: "Two more. Total fertility rate is the average number of children a woman has in her lifetime, and about 2.1 is replacement level. Infant mortality rate is deaths of babies under age one per thousand live births. It is one of the best signs of a country's health care.",
            board: [
              { type: "term", term: "Total Fertility Rate (TFR)", def: "Average number of children born per woman over her lifetime. Replacement level ≈ 2.1." },
              { type: "term", term: "Infant Mortality Rate (IMR)", def: "Deaths of infants under age 1 per 1,000 live births." },
            ],
          },
          {
            say: "These rates change together over time, and the demographic transition model shows how. ...Find the stage where the gap between births and deaths is widest.",
            board: [
              { type: "callout", text: "NIR is the gap between the CBR and CDR lines.", tone: "tip" },
            ],
            widget: { type: "dtm", props: { stage: 1 } },
            check: {
              prompt: "Set the slider to the stage where the rate of natural increase is highest.",
              expect: { stage: 2 },
              hint: "Natural increase is births minus deaths. Look for the stage with the widest gap between the two lines.",
              praise: "Mm... Stage 2. Deaths fell, births did not. The population surges.",
            },
          },
        ],
      },
      {
        id: "2.5",
        title: "The Demographic Transition Model",
        objective: "Explain each stage of the demographic transition model and how the epidemiological transition explains changing causes of death.",
        beats: [
          {
            say: "The demographic transition model shows how birth and death rates change as a society develops. In stage 1, both are high, so growth is slow. Famine and disease keep deaths high. ...No country is in stage 1 today.",
            board: [
              { type: "heading", text: "Stage 1: high CBR, high CDR" },
              { type: "callout", text: "Low, unstable growth. No country today; only some isolated groups.", tone: "tip" },
            ],
            widget: { type: "dtm", props: { stage: 1 } },
          },
          {
            say: "In stage 2, death rates drop fast because of a better food supply, clean water, and vaccines. But birth rates stay high, so the population explodes. Some countries, like Niger and Chad, are still here.",
            board: [
              { type: "heading", text: "Stage 2: CDR falls, CBR stays high" },
              { type: "bullets", items: ["Improved food supply", "Clean water & sanitation", "Vaccines & medicine"] },
            ],
            widget: { type: "dtm", props: { stage: 2 } },
          },
          {
            say: "In stage 3, birth rates finally fall. In cities, children cost more and work less, and women gain education, jobs, and contraception. Growth slows... India and Mexico are in late stage 3.",
            board: [
              { type: "heading", text: "Stage 3: CBR falls" },
              { type: "bullets", items: ["Urbanization: children become an economic cost", "Women's education & employment", "Access to contraception"] },
            ],
            widget: { type: "dtm", props: { stage: 3 } },
          },
          {
            say: "In stage 4, both rates are low and growth is close to zero, like in the United States or France. Some geographers add stage 5, where births fall below deaths and the population shrinks. Japan and Italy are there.",
            board: [
              { type: "bullets", items: ["Stage 4: low CBR, low CDR → slow or zero growth", "Stage 5: CBR < CDR → decline (Japan, Italy)"] },
            ],
            widget: { type: "dtm", props: { stage: 5 } },
          },
          {
            say: "Death rates fall because the causes of death change. This is the epidemiological transition. First pestilence and famine, then receding pandemics, then degenerative diseases like heart disease and cancer. Later stages add delayed degenerative disease, and the return of infections through antibiotic resistance.",
            board: [
              { type: "term", term: "Epidemiological transition", def: "The shift in a society's main causes of death from infectious disease to chronic and degenerative disease." },
              { type: "steps", items: ["Pestilence & famine", "Receding pandemics", "Degenerative & human-caused diseases", "Delayed degenerative diseases", "Reemergence of infectious disease"] },
            ],
          },
          {
            say: "One more. Read the description carefully, then move the slider. ...Quiet as the forest.",
            board: [
              { type: "callout", text: "Deaths fall in Stage 2. Births fall in Stage 3.", tone: "tip" },
            ],
            widget: { type: "dtm", props: { stage: 1 } },
            check: {
              prompt: "A country's death rate is already low, but its birth rate is now falling quickly as people move to cities and girls stay in school longer. Set the model to its stage.",
              expect: { stage: 3 },
              hint: "Deaths have already dropped. Births are falling now, but are not yet low. Which stage is that?",
              praise: "Stage 3. Cities and schools pull births down. ...You read the terrain well.",
            },
          },
        ],
      },
      {
        id: "2.6",
        title: "Malthusian Theory",
        objective: "Explain Malthus's theory of population and food supply and evaluate its critiques, including neo-Malthusian views.",
        beats: [
          {
            say: "In 1798, Thomas Malthus warned that population would outgrow food. He said population grows geometrically: 1, 2, 4, 8. Food grows only arithmetically: 1, 2, 3, 4. Sooner or later, people outrun their food.",
            board: [
              { type: "formula", text: "Population: 1 → 2 → 4 → 8 → 16 (geometric)" },
              { type: "formula", text: "Food: 1 → 2 → 3 → 4 → 5 (arithmetic)" },
              { type: "callout", text: "An Essay on the Principle of Population (1798)", tone: "example" },
            ],
          },
          {
            say: "Malthus said two kinds of checks would stop growth. Preventive checks lower birth rates, like marrying later. Positive checks raise death rates: famine, disease, and war. ...Grim, I know.",
            board: [
              { type: "bullets", items: ["Preventive checks: lower births (delayed marriage, moral restraint)", "Positive checks: raise deaths (famine, disease, war)"] },
            ],
          },
          {
            say: "His critics say he missed a lot. He did not foresee the Green Revolution, which multiplied crop yields, or the falling birth rates of stages 3 and 4. And hunger today is mostly about poverty, war, and distribution, not a global lack of food.",
            board: [
              { type: "bullets", items: ["Technology raised food output (Green Revolution)", "Fertility fell with development (DTM stages 3–4)", "Famine is often about access, conflict & poverty, not total supply"] },
              { type: "callout", text: "Ester Boserup: population pressure pushes farmers to intensify, so more people can mean more food.", tone: "tip" },
            ],
          },
          {
            say: "Still, his worry lives on. Neo-Malthusians, like Paul Ehrlich, who wrote The Population Bomb in 1968, look beyond food to water, energy, and the environment. They argue that growth plus high consumption can strain the whole planet.",
            board: [
              { type: "term", term: "Neo-Malthusians", def: "Modern thinkers who extend Malthus's concern to resource depletion and environmental limits (e.g., Paul Ehrlich)." },
            ],
          },
          {
            say: "Exam question. Which event made Malthus's math stop working?",
            board: [
              { type: "callout", text: "Malthus assumed food supply grows slowly. What changed that?", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which development most directly challenges Malthus's prediction about population and food supply?",
                options: [
                  "Rising rates of disease in the 1800s",
                  "The Green Revolution's large increase in crop yields",
                  "Rapid population growth in Stage 2 countries",
                  "Wars over farmland",
                ],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the development that most challenges Malthus.",
              expect: { choice: 1 },
              hint: "Malthus said food grows slowly. Look for the choice where food grew fast.",
              praise: "...The Green Revolution. Food kept pace, so the prediction failed. Correct.",
            },
          },
        ],
      },
      {
        id: "2.7",
        title: "Population Policies",
        objective: "Explain the intent and effects of pronatalist, antinatalist, and immigration policies on population size and composition.",
        beats: [
          {
            say: "Governments try to steer their populations. Pronatalist policies encourage births. Antinatalist policies discourage them. And immigration policies decide who can move in.",
            board: [
              { type: "term", term: "Pronatalist policy", def: "Encourages higher birth rates (cash bonuses, parental leave, child care)." },
              { type: "term", term: "Antinatalist policy", def: "Discourages births (birth limits, family planning campaigns)." },
              { type: "term", term: "Immigration policy", def: "Controls who may enter and settle: quotas, points systems, guest worker programs." },
            ],
          },
          {
            say: "The most famous antinatalist policy is China's one-child policy, from 1980 to 2015. Births fell sharply. But a preference for sons skewed the sex ratio, and now China is aging fast. In 2016 it allowed two children, and in 2021, three.",
            board: [
              { type: "callout", text: "China (1980–2015): sex ratio at birth peaked near 120 boys per 100 girls; rapid aging; '4-2-1' families.", tone: "example" },
            ],
          },
          {
            say: "Countries with very low fertility try the opposite. France pays family allowances and supports child care. South Korea spends heavily on incentives, yet its fertility rate is still among the lowest on Earth. ...Money alone rarely changes how many children people want.",
            board: [
              { type: "bullets", items: ["France: family allowances, subsidized child care", "Hungary: tax breaks for mothers of several children", "South Korea: cash incentives, yet TFR below 0.8"] },
            ],
          },
          {
            say: "Singapore did both. In the 1970s it told families to stop at two, and by 1987 fertility had fallen so far that it switched to pronatalist incentives. Immigration policy is the third tool. Canada uses a points system to choose skilled workers.",
            board: [
              { type: "callout", text: "Singapore: 'Stop at Two' (1970s) → 'Have Three or More, if You Can Afford It' (1987).", tone: "example" },
              { type: "term", term: "Points-based immigration", def: "Applicants scored on skills, education, language, and age (Canada, Australia)." },
            ],
          },
          {
            say: "Now think ahead in time. A policy works for one generation, then its effects show up in the pyramid for decades. ...What did China's policy leave behind?",
            board: [
              { type: "callout", text: "Policies change population size AND composition (age, sex).", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which outcome is the most likely long-term consequence of China's one-child policy?",
                options: [
                  "A rapidly growing labor force",
                  "A shrinking share of elderly people",
                  "An imbalanced sex ratio and an aging population",
                  "A total fertility rate above 3",
                ],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the long-term consequence of the one-child policy.",
              expect: { choice: 2 },
              hint: "Fewer babies for 35 years, plus a preference for sons. What happens to the age structure and the sex ratio?",
              praise: "Mm. Fewer young people, more elders, more men than women. You saw the whole battlefield.",
            },
          },
        ],
      },
      {
        id: "2.8",
        title: "Women and Demographic Change",
        objective: "Explain how women's access to education, employment, health care, and contraception changes fertility, mortality, and migration patterns.",
        beats: [
          {
            say: "When the role of women changes, the whole population changes. Education, jobs, health care, and contraception give women more choices. Almost everywhere, more choice means fewer children.",
            board: [
              { type: "bullets", items: ["Education", "Employment", "Health care", "Contraception"] },
              { type: "callout", text: "→ Lower fertility rates in most parts of the world.", tone: "tip" },
            ],
          },
          {
            say: "Each extra year of school tends to delay marriage and first births. Women with careers often have fewer children, later. And better health care lowers infant mortality, so families no longer need many births to be sure some children survive.",
            board: [
              { type: "steps", items: ["Girls stay in school", "Marriage & childbirth delayed", "Women join paid workforce", "TFR falls"] },
            ],
          },
          {
            say: "Look at Kerala, a state in India. Incomes there are modest, but female literacy is very high, and its fertility rate fell below replacement level in the 1990s. ...Investing in people, not just money, changes births.",
            board: [
              { type: "callout", text: "Kerala, India: female literacy over 90% → TFR below replacement since the 1990s.", tone: "example" },
            ],
          },
          {
            say: "Changing roles also shape migration. Ravenstein noticed in the 1880s that women moved more than men over short distances, and men more over long distances. Today, women are nearly half of all international migrants, many working in nursing and domestic care.",
            board: [
              { type: "term", term: "Ravenstein on gender", def: "Females more migratory over short (internal) distances; males more over long distances." },
              { type: "callout", text: "Philippines: many women migrate abroad as nurses and domestic workers and send remittances home.", tone: "example" },
            ],
          },
          {
            say: "An AP-style prediction. Follow the chain from school to family size.",
            board: [
              { type: "callout", text: "More education for girls → later marriage → fewer births.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "In a country where the share of girls completing secondary school rises sharply, which demographic change is most likely over the next generation?",
                options: [
                  "The total fertility rate falls",
                  "The total fertility rate rises",
                  "The crude death rate rises",
                  "The sex ratio becomes heavily male",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the most likely demographic change.",
              expect: { choice: 0 },
              hint: "School delays marriage and first births. What happens to the average number of children per woman?",
              praise: "...Correct. Education is one of the strongest forces on fertility. Mm, I like that one.",
            },
          },
        ],
      },
      {
        id: "2.9",
        title: "Aging Populations",
        objective: "Explain the causes of population aging and its political, social, and economic consequences, including the dependency ratio.",
        beats: [
          {
            say: "A population ages when birth rates fall and people live longer. Fewer babies at the bottom, more elders at the top. In Japan, nearly 3 in 10 people are 65 or older.",
            board: [
              { type: "heading", text: "Causes of aging" },
              { type: "bullets", items: ["Low birth rates (low TFR)", "Low death rates", "Rising life expectancy"] },
            ],
            widget: { type: "pyramid", props: { preset: "constrictive" } },
          },
          {
            say: "The dependency ratio compares people who are usually not working to those who are. Take children under 15 plus adults 65 and older, divide by people aged 15 to 64, and multiply by one hundred. A high ratio means each worker supports more people.",
            board: [
              { type: "formula", text: "Dependency ratio = (ages 0–14 + ages 65+) ÷ ages 15–64 × 100" },
              { type: "callout", text: "Expansive pyramid → high youth dependency. Constrictive → high elderly dependency.", tone: "tip" },
            ],
          },
          {
            say: "An aging society faces hard choices. Pensions and health care cost more, while fewer workers pay taxes. Labor shortages appear. ...And older voters become a powerful political group.",
            board: [
              { type: "bullets", items: ["Economic: pension & health costs rise, labor shortages", "Social: elder care, school closures, empty rural towns", "Political: older voters shape policy"] },
            ],
          },
          {
            say: "Governments respond in a few ways. They raise the retirement age, admit immigrant workers, or invest in robots and automation. Japan does some of all three. Germany relies more on immigration.",
            board: [
              { type: "bullets", items: ["Raise the retirement age", "Admit immigrant & guest workers", "Automation & robotics", "Pronatalist incentives"] },
            ],
          },
          {
            say: "Now build an aging country, like Japan or Italy. Choose the shape, then lower the birth rate to match a very old population.",
            board: [
              { type: "callout", text: "Aging = narrow base, wide top.", tone: "tip" },
            ],
            widget: { type: "pyramid", props: { preset: "expansive" } },
            check: {
              prompt: "Build the pyramid of a rapidly aging country: choose the right shape and set the birth rate to 10 or lower.",
              expect: { preset: "constrictive", birthRate: { min: 5, max: 10 } },
              hint: "...Aging means a narrow base. Pick that shape, then pull the birth rate slider down to 10 or below.",
              praise: "Mm. Narrow base, heavy top. That is Japan's shape... a castle with few new recruits.",
            },
          },
        ],
      },
      {
        id: "2.10",
        title: "Causes of Migration",
        objective: "Explain how push and pull factors, intervening obstacles and opportunities, and Ravenstein's laws account for migration.",
        beats: [
          {
            say: "Migration is a permanent or long-term move to a new place. Push factors drive people away from home. Pull factors draw them toward a destination. Most moves have both.",
            board: [
              { type: "term", term: "Push factor", def: "A condition that drives people to leave a place." },
              { type: "term", term: "Pull factor", def: "A condition that attracts people to a place." },
            ],
          },
          {
            say: "The exam sorts these factors into five types: cultural, demographic, economic, environmental, and political. War is political. Drought is environmental. A job offer is economic.",
            board: [
              { type: "bullets", items: ["Cultural: religious freedom, language, ethnicity", "Demographic: young or crowded population", "Economic: jobs, wages", "Environmental: drought, floods, climate", "Political: war, persecution, freedom"] },
            ],
          },
          {
            say: "Between home and destination, things get in the way. Intervening obstacles are barriers like oceans, mountains, borders, visas, or cost. An intervening opportunity is a closer place that offers what the migrant wanted, so they stop there instead.",
            board: [
              { type: "term", term: "Intervening obstacle", def: "A barrier that hinders migration: physical, political, economic." },
              { type: "term", term: "Intervening opportunity", def: "An attractive option closer than the original destination." },
            ],
          },
          {
            say: "In the 1880s, Ernst Ravenstein studied migration in Britain and wrote his laws. Most migrants move short distances. Long-distance migrants usually head to big cities. And every migration stream creates a counterstream flowing back.",
            board: [
              { type: "bullets", items: ["Most migrants move short distances", "Long-distance migrants go to major cities", "Migration often happens in steps", "Every stream produces a counterstream", "Economic motives dominate"] },
              { type: "callout", text: "Gravity model: interaction ∝ (pop₁ × pop₂) ÷ distance", tone: "tip" },
            ],
          },
          {
            say: "Exam question. Name the push, then the pull. ...Swift as the wind, but read carefully.",
            board: [
              { type: "callout", text: "Classify each factor: cultural, demographic, economic, environmental, political.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A family leaves rural Guatemala after years of drought ruin their harvests, and moves to a city where relatives have found factory jobs. Which pair correctly classifies the push and pull factors?",
                options: [
                  "Push: political; Pull: cultural",
                  "Push: economic; Pull: environmental",
                  "Push: demographic; Pull: political",
                  "Push: environmental; Pull: economic",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the correct classification of the push and pull factors.",
              expect: { choice: 3 },
              hint: "Drought comes from nature. Factory jobs are about money. Match each one to its category.",
              praise: "Correct. Drought pushes, jobs pull. ...You sorted them cleanly.",
            },
          },
        ],
      },
      {
        id: "2.11",
        title: "Forced and Voluntary Migration",
        objective: "Describe forced migration (slavery, refugees, internally displaced persons, asylum seekers) and voluntary migration (transnational, transhumance, internal, chain, step, guest worker, rural-to-urban).",
        beats: [
          {
            say: "Migration falls on a spectrum. In forced migration, people are made to move by violence, persecution, or enslavement. In voluntary migration, people choose to move, usually for opportunity. ...Real life is often somewhere in between.",
            board: [
              { type: "term", term: "Forced migration", def: "Movement compelled by violence, persecution, disaster, or coercion." },
              { type: "term", term: "Voluntary migration", def: "Movement by choice, usually for economic or social opportunity." },
            ],
          },
          {
            say: "The Atlantic slave trade forced over twelve million Africans across the ocean. Today, a refugee has crossed an international border to escape persecution or conflict. An internally displaced person fled the same dangers but stayed inside their own country. An asylum seeker has asked another country for protection and is waiting for a decision.",
            board: [
              { type: "bullets", items: ["Slavery: e.g., the Atlantic slave trade", "Refugee: crossed a border, fleeing persecution or conflict", "IDP: displaced, but still within own country", "Asylum seeker: applied for protection, awaiting a decision"] },
            ],
          },
          {
            say: "Voluntary moves come in many forms. Transnational migration crosses an international border. Internal migration stays within one country. Rural to urban migration, from farms to cities, is one of the biggest flows today, especially in China and India.",
            board: [
              { type: "bullets", items: ["Transnational: across international borders", "Internal: within one country (interregional, intraregional)", "Rural-to-urban: countryside → city"] },
            ],
          },
          {
            say: "Chain migration means following family or friends who moved first. Step migration is a series of smaller moves, village to town to city. Guest workers move temporarily for jobs, like Turkish workers in West Germany in the 1960s. And transhumance is seasonal herding between highland and lowland pastures.",
            board: [
              { type: "bullets", items: ["Chain: follows earlier migrants from the same family or community", "Step: a series of shorter moves", "Guest worker: temporary labor migration", "Transhumance: seasonal movement of herders & livestock"] },
            ],
          },
          {
            say: "Read the scenario. Ask two things: did they cross an international border, and did they choose to leave?",
            board: [
              { type: "callout", text: "Refugee = crossed a border. IDP = did not.", tone: "warn" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "After a civil war breaks out, thousands of families flee their villages for camps in another part of the same country. These migrants are best classified as",
                options: ["refugees", "asylum seekers", "internally displaced persons", "guest workers"],
                answer: 2,
              },
            },
            check: {
              prompt: "Classify the families fleeing the civil war.",
              expect: { choice: 2 },
              hint: "...They were forced to move, but they never left their own country. Which term fits?",
              praise: "Internally displaced persons. Forced, but no border crossed. ...Exactly right.",
            },
          },
        ],
      },
      {
        id: "2.12",
        title: "Effects of Migration",
        objective: "Explain the historical and contemporary political, economic, and cultural effects of migration on sending and receiving places.",
        beats: [
          {
            say: "Migration changes two places at once: the one people leave, and the one they arrive in. The effects are political, economic, and cultural. On the exam, name the place and the type of effect.",
            board: [
              { type: "bullets", items: ["Political", "Economic", "Cultural"] },
              { type: "callout", text: "Always specify: sending place or receiving place?", tone: "tip" },
            ],
          },
          {
            say: "Migrants often send money home. These payments are called remittances. For some countries they are a huge part of the economy. In Nepal, Tonga, and Tajikistan, remittances equal more than a fifth of GDP.",
            board: [
              { type: "term", term: "Remittances", def: "Money migrants send back to family in their home country." },
              { type: "callout", text: "Nepal, Tonga, Tajikistan: remittances > 20% of GDP.", tone: "example" },
            ],
          },
          {
            say: "Brain drain is the loss of educated, skilled workers who leave for better pay. The sending country loses doctors, nurses, and engineers it paid to train. The receiving country gains them... that is brain gain.",
            board: [
              { type: "term", term: "Brain drain", def: "Emigration of highly skilled or educated people from a place." },
              { type: "term", term: "Brain gain", def: "The arrival of skilled migrants, benefiting the receiving place." },
            ],
          },
          {
            say: "In receiving places, migrants fill labor shortages and pay taxes. They bring food, language, and religion, and build ethnic neighborhoods. Politically, migration can spark debates over borders and policy, and sometimes nativist backlash.",
            board: [
              { type: "bullets", items: ["Economic: labor supply, taxes, new businesses", "Cultural: ethnic enclaves, new foods, languages, religions", "Political: immigration debates, nativism, changing electorate"] },
              { type: "callout", text: "Sending regions may age and develop skewed sex ratios as young men leave.", tone: "example" },
            ],
          },
          {
            say: "Last question for this unit. Focus on the sending country, not the receiving one.",
            board: [
              { type: "callout", text: "Losses and gains can happen together.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Many doctors trained in Nigeria now work in the United Kingdom. What is the most likely effect on Nigeria?",
                options: [
                  "Brain gain that expands its health care system",
                  "A shortage of medical professionals, partly offset by remittances",
                  "A rise in its rate of natural increase",
                  "Cultural convergence with the United Kingdom's health system",
                ],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the most likely effect on Nigeria.",
              expect: { choice: 1 },
              hint: "Nigeria trained the doctors, then lost them. What does it lose, and what money might flow back?",
              praise: "Mm. Brain drain, softened by remittances. Two effects at once... like a general who loses a castle but gains tribute.",
            },
          },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 3 ─────────────────────────────
  {
    unit: 3,
    title: "Cultural Patterns and Processes",
    lessons: [
      {
        id: "3.1",
        title: "Introduction to Culture",
        objective: "Define culture and culture traits, and distinguish cultural relativism from ethnocentrism.",
        beats: [
          {
            say: "Culture is the shared practices, technologies, attitudes, and behaviors that a society passes on. It is learned, not inborn. You learned to bow, or to shake hands, from the people around you.",
            board: [
              { type: "term", term: "Culture", def: "The shared practices, technologies, attitudes, and behaviors transmitted by a society." },
            ],
          },
          {
            say: "A culture trait is a single element, like a food preference, a style of architecture, or a way of using land. Related traits combine into a culture complex. ...Rice farming, rice at every meal, and harvest festivals together make one complex.",
            board: [
              { type: "term", term: "Culture trait", def: "A single element of culture: food preference, architecture, land use, clothing." },
              { type: "term", term: "Culture complex", def: "A group of related culture traits that occur together." },
            ],
          },
          {
            say: "Some culture you can touch, like tools, clothing, and buildings. That is material culture. Beliefs, language, and values are nonmaterial culture. And a culture hearth is the place where a trait first began.",
            board: [
              { type: "bullets", items: ["Material culture: architecture, food, clothing, tools", "Nonmaterial culture: language, religion, values, customs"] },
              { type: "term", term: "Culture hearth", def: "The place of origin of a culture trait or culture." },
            ],
          },
          {
            say: "Now attitudes. Ethnocentrism is judging other cultures by your own standards, often believing your own is better. Cultural relativism means understanding a culture on its own terms. Geographers try to practice relativism.",
            board: [
              { type: "term", term: "Ethnocentrism", def: "Evaluating other cultures by the standards of one's own, often assuming one's own is superior." },
              { type: "term", term: "Cultural relativism", def: "Understanding a culture's practices within that culture's own context." },
            ],
          },
          {
            say: "A quick check. Is the traveler judging, or trying to understand?",
            board: [
              { type: "callout", text: "Relativism = understand first. Ethnocentrism = judge by your own rules.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A traveler in Ethiopia learns why people eat injera with their right hand from a shared plate, instead of calling the custom impolite. This attitude is best described as",
                options: ["cultural relativism", "ethnocentrism", "assimilation", "environmental determinism"],
                answer: 0,
              },
            },
            check: {
              prompt: "Name the traveler's attitude.",
              expect: { choice: 0 },
              hint: "...The traveler did not judge. They tried to understand the custom on its own terms.",
              praise: "Cultural relativism. Mm. That is how a geographer travels.",
            },
          },
        ],
      },
      {
        id: "3.2",
        title: "Cultural Landscapes",
        objective: "Describe the features of cultural landscapes, including sequent occupance, and explain how attitudes toward ethnicity and gender shape the use of space.",
        beats: [
          {
            say: "The cultural landscape is the natural landscape changed by people. The geographer Carl Sauer said culture is the agent, nature is the medium, and the landscape is the result. ...Every field, temple, and road is a clue.",
            board: [
              { type: "term", term: "Cultural landscape", def: "The visible imprint of human activity on the natural landscape." },
              { type: "callout", text: "Carl Sauer: culture (agent) + natural area (medium) → cultural landscape (result).", tone: "tip" },
            ],
          },
          {
            say: "Read a landscape in layers. Physical features. Farms and factories. Religious buildings and the language on signs. Architecture, from traditional to postmodern.",
            board: [
              { type: "bullets", items: ["Physical features", "Agricultural & industrial practices", "Religious & linguistic features (temples, signs)", "Traditional vs. postmodern architecture", "Land-use patterns"] },
            ],
          },
          {
            say: "Sequent occupance means each group that lives in a place leaves a layer behind. Osaka Castle stands where the Ishiyama Hongan-ji temple fortress once stood, the one Nobunaga besieged for ten years. Temple, then castle, then a modern museum. ...One site, many rulers.",
            board: [
              { type: "term", term: "Sequent occupance", def: "Successive societies leave their cultural imprints on a place, each layer adding to the landscape." },
              { type: "callout", text: "Istanbul's Hagia Sophia: Byzantine church → Ottoman mosque → museum → mosque.", tone: "example" },
            ],
          },
          {
            say: "Attitudes toward ethnicity and gender shape space too. Ethnic neighborhoods like Chinatowns have their own signs, shops, and temples. Indigenous lands, like reservations, have their own landscapes. And gender roles shape who uses which spaces, like women-only train cars in Tokyo at rush hour.",
            board: [
              { type: "bullets", items: ["Ethnic neighborhoods: Chinatown, Little Saigon", "Indigenous communities & lands: reservations, reserves", "Gender: women in the workforce, women-only train cars (Tokyo)"] },
            ],
          },
          {
            say: "Picture the scene in the question. Three eras, standing side by side. What concept explains it?",
            board: [
              { type: "callout", text: "Layers from different eras in one place = sequent occupance.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "In Mexico City, the ruins of the Aztec Templo Mayor sit beside a Spanish colonial cathedral, surrounded by modern office towers. Which concept does this landscape best illustrate?",
                options: ["Stimulus diffusion", "Time-space compression", "Sequent occupance", "Environmental determinism"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the concept the Mexico City landscape illustrates.",
              expect: { choice: 2 },
              hint: "Aztec, then Spanish, then modern. Each group left a layer. What is that called?",
              praise: "...Sequent occupance. You read the layers like rings in a tree. Good.",
            },
          },
        ],
      },
      {
        id: "3.3",
        title: "Cultural Patterns",
        objective: "Explain how regional patterns of language, religion, and ethnicity create a sense of place, support placemaking, and act as centripetal or centrifugal forces.",
        beats: [
          {
            say: "Language, religion, and ethnicity form regional patterns you can map. These patterns give each place its character. ...That feeling of a place is called sense of place.",
            board: [
              { type: "term", term: "Sense of place", def: "The meaning and emotional attachment people give a place, shaped by its culture and landscape." },
            ],
          },
          {
            say: "Placemaking is when a community shapes public space to reflect who they are. Murals, festivals, street names, a plaza where people gather. A Koreatown with Korean signs, restaurants, and churches is placemaking in action.",
            board: [
              { type: "term", term: "Placemaking", def: "Shaping public spaces to strengthen the connection between people and the places they share." },
              { type: "callout", text: "Examples: murals, bilingual street signs, festivals, community plazas.", tone: "example" },
            ],
          },
          {
            say: "These same traits can unite or divide a country. A centripetal force pulls people together: a shared language, a common religion, national pride. In Japan, one shared language has long been a strong centripetal force.",
            board: [
              { type: "term", term: "Centripetal force", def: "A force that unifies a state: shared language, religion, ethnicity, national identity." },
            ],
          },
          {
            say: "A centrifugal force pulls a country apart. In Belgium, Dutch-speaking Flanders and French-speaking Wallonia are divided by language. In Canada, French-speaking Quebec has voted twice on independence. ...Same traits, opposite direction.",
            board: [
              { type: "term", term: "Centrifugal force", def: "A force that divides a state: linguistic, religious, or ethnic differences." },
              { type: "bullets", items: ["Belgium: Flemish (Dutch) vs. Walloon (French)", "Canada: Québec referendums (1980, 1995)", "Kurds: an ethnic group spread across several states"] },
            ],
          },
          {
            say: "Exam question. Are language and religion holding this country together, or pulling it apart?",
            board: [
              { type: "callout", text: "Centripetal = toward the center. Centrifugal = away from it.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "In one country, the northern region speaks a different language and follows a different religion from the capital region, and a separatist party there is gaining support. Language and religion are acting as",
                options: ["centripetal forces", "centrifugal forces", "placemaking", "sequent occupance"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose how language and religion are acting in this country.",
              expect: { choice: 1 },
              hint: "...A separatist movement is growing. Are these traits pulling people toward the center, or away?",
              praise: "Centrifugal. Retainers in the far provinces, drifting away from the castle. ...Correct.",
            },
          },
        ],
      },
      {
        id: "3.4",
        title: "Types of Diffusion",
        objective: "Define and distinguish relocation diffusion and the three types of expansion diffusion: contagious, hierarchical, and stimulus.",
        beats: [
          {
            say: "Diffusion is how ideas, traits, and innovations spread from their hearth. There are two big families. In relocation diffusion, people physically move and carry the trait with them. ...The trait travels with the migrant.",
            board: [
              { type: "term", term: "Relocation diffusion", def: "A trait spreads when people who hold it move to a new place." },
              { type: "callout", text: "Example: Chinese cuisine spreading to the U.S. with Chinese immigrants.", tone: "example" },
            ],
            widget: { type: "diffusion", props: { mode: "relocation" } },
          },
          {
            say: "In expansion diffusion, the trait spreads outward while staying strong at home. Contagious diffusion moves person to person, neighbor to neighbor, like a rumor running through camp. Distance decay is strong here.",
            board: [
              { type: "term", term: "Expansion diffusion", def: "A trait spreads outward from its hearth and remains strong there." },
              { type: "term", term: "Contagious diffusion", def: "Rapid spread to nearby people regardless of status, like a disease." },
            ],
            widget: { type: "diffusion", props: { mode: "contagious" } },
          },
          {
            say: "Hierarchical diffusion moves through important people or big places first. Orders go from the daimyo to his generals, then to the soldiers. A fashion trend moves from Tokyo to Osaka, then to small towns. ...It skips the space in between.",
            board: [
              { type: "term", term: "Hierarchical diffusion", def: "Spread from larger or more influential places or people to smaller or less influential ones." },
              { type: "callout", text: "Reverse hierarchical: starts low and moves up (e.g., Walmart spread from small towns to big cities).", tone: "tip" },
            ],
            widget: { type: "diffusion", props: { mode: "hierarchical" } },
          },
          {
            say: "Stimulus diffusion spreads the underlying idea, but the trait changes to fit the new culture. McDonald's in India serves no beef, so you get the McAloo Tikki, a potato burger. ...The core idea survives, the details change.",
            board: [
              { type: "term", term: "Stimulus diffusion", def: "The underlying principle spreads, but the trait is modified by the receiving culture." },
              { type: "bullets", items: ["McDonald's India: McAloo Tikki, no beef", "Sequoyah's Cherokee syllabary: inspired by the idea of writing"] },
            ],
            widget: { type: "diffusion", props: { mode: "stimulus" } },
          },
          {
            say: "Let's test you. Read the scenario, then set the model to match it. Did people move, did it spread to neighbors, did it jump between big places, or did it change along the way?",
            board: [
              { type: "callout", text: "Relocation = people move. Contagious = neighbors. Hierarchical = big nodes first. Stimulus = idea adapts.", tone: "tip" },
            ],
            widget: { type: "diffusion", props: { mode: "relocation" } },
            check: {
              prompt: "A new smartphone launches first in Tokyo, Seoul, and New York, then reaches smaller cities months later. Set the model to that type of diffusion.",
              expect: { mode: "hierarchical" },
              hint: "...It started in the biggest cities and jumped between them before reaching smaller ones. Which type moves down a ladder of importance?",
              praise: "Mm. Hierarchical. Big nodes first, then down the ladder. Like orders passing from the daimyo outward.",
            },
          },
        ],
      },
      {
        id: "3.5",
        title: "Historical Causes of Diffusion",
        objective: "Explain how colonialism, imperialism, and trade shaped today's cultural patterns and produced new forms such as creoles and lingua francas.",
        beats: [
          {
            say: "Today's cultural map was drawn by history. Colonialism, imperialism, and trade carried languages, religions, and customs across oceans. ...To explain where a trait is now, ask who ruled, and who traded, there before.",
            board: [
              { type: "bullets", items: ["Colonialism: settling and controlling territory abroad", "Imperialism: extending power and influence over other peoples", "Trade: exchange routes carry goods and ideas"] },
            ],
          },
          {
            say: "Spain and Portugal brought Catholicism and their languages to Latin America. That is why Brazil speaks Portuguese while most of its neighbors speak Spanish. Britain spread English, cricket, and its legal system across its empire.",
            board: [
              { type: "callout", text: "Treaty of Tordesillas (1494) → Brazil Portuguese-speaking; most of Latin America Spanish-speaking.", tone: "example" },
              { type: "callout", text: "British Empire → English as an official language from India to Nigeria.", tone: "example" },
            ],
          },
          {
            say: "Trade spread culture more quietly. Buddhism traveled the Silk Road into China. Muslim merchants on Indian Ocean routes helped bring Islam to what is now Indonesia, today the country with the most Muslims in the world.",
            board: [
              { type: "bullets", items: ["Silk Road: Buddhism → China, then Korea & Japan", "Indian Ocean trade: Islam → Indonesia & Malaysia"] },
            ],
          },
          {
            say: "When cultures meet, new forms appear. A lingua franca is a shared language used between people with different native languages, like Swahili in East Africa, or English today. Creolization blends cultures into something new. Haitian Creole grew from French and West African languages, and became a mother tongue.",
            board: [
              { type: "term", term: "Lingua franca", def: "A common language used for communication among speakers of different native languages." },
              { type: "term", term: "Creolization", def: "The blending of cultures or languages into a new form; a creole becomes a native language." },
              { type: "callout", text: "Pidgin: simplified contact language, no native speakers. Creole: becomes a mother tongue.", tone: "tip" },
            ],
          },
          {
            say: "Exam question. Is this a new mother tongue, or a bridge between different mother tongues?",
            board: [
              { type: "callout", text: "Lingua franca = a bridge language.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Swahili is used for trade and government among speakers of many different native languages across Kenya, Tanzania, and Uganda. In this role, Swahili functions as",
                options: ["a creole", "a lingua franca", "a language isolate", "a dialect of Arabic"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the role Swahili plays in East Africa.",
              expect: { choice: 1 },
              hint: "...People with different first languages use it to talk to each other. What is a shared bridge language called?",
              praise: "Lingua franca. The language of the marketplace. ...Mm, correct.",
            },
          },
        ],
      },
      {
        id: "3.6",
        title: "Contemporary Causes of Diffusion",
        objective: "Explain how globalization, urbanization, media, and communication technology accelerate diffusion and produce cultural convergence and divergence.",
        beats: [
          {
            say: "Today, culture spreads faster than ever. Globalization connects economies and people. Urbanization brings different groups together in cities. Media and technology carry it all, almost instantly.",
            board: [
              { type: "term", term: "Globalization", def: "The increasing interconnection of people, economies, and cultures worldwide." },
              { type: "bullets", items: ["Urbanization", "Media & entertainment", "Technological change", "Politics, economics & social relationships"] },
            ],
          },
          {
            say: "The internet and fast travel shrink the time between places. This is time-space convergence. A K-pop video posted in Seoul is watched in São Paulo the same hour. ...Shingen's messengers needed days just to cross Kai.",
            board: [
              { type: "term", term: "Time-space convergence", def: "The decrease in travel or communication time between places due to new technology." },
              { type: "callout", text: "K-pop, anime, and memes diffuse globally within hours.", tone: "example" },
            ],
          },
          {
            say: "One result is the spread of English, the main language of business, science, and the internet. Another is the loss of indigenous languages. About forty percent of the world's roughly seven thousand languages are endangered.",
            board: [
              { type: "bullets", items: ["Rising use of English worldwide", "Loss of indigenous languages (~40% of ~7,000 endangered)"] },
              { type: "callout", text: "Ainu, Japan's indigenous language, is critically endangered.", tone: "warn" },
            ],
          },
          {
            say: "Cultural convergence is when cultures become more alike, through the same brands, music, and media. Cultural divergence is when cultures grow apart, or push back to protect themselves. France, for example, requires radio stations to play a large share of French-language songs.",
            board: [
              { type: "term", term: "Cultural convergence", def: "Cultures becoming more similar through shared traits and interaction." },
              { type: "term", term: "Cultural divergence", def: "Cultures becoming more different, or resisting outside influence." },
              { type: "callout", text: "France: radio quota of ~40% French-language songs.", tone: "example" },
            ],
          },
          {
            say: "Exam question. Are these three cities growing more alike, or more different?",
            board: [
              { type: "callout", text: "Convergence = coming together. Divergence = moving apart.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Global fast-food chains, streaming platforms, and clothing brands make shopping streets in Tokyo, London, and Toronto look increasingly similar. This trend is best described as",
                options: ["cultural divergence", "relocation diffusion", "sequent occupance", "cultural convergence"],
                answer: 3,
              },
            },
            check: {
              prompt: "Name the trend described in the question.",
              expect: { choice: 3 },
              hint: "...The cities are becoming more alike. Which term means cultures coming together?",
              praise: "Cultural convergence. Same brands, same screens, everywhere. ...You saw it.",
            },
          },
        ],
      },
      {
        id: "3.7",
        title: "Diffusion of Religion and Language",
        objective: "Explain how universalizing and ethnic religions and language families such as Indo-European diffused from their hearths.",
        beats: [
          {
            say: "Religions spread in different ways. Universalizing religions try to appeal to everyone and actively seek converts: Christianity, Islam, Buddhism, and Sikhism. They spread by both expansion and relocation diffusion.",
            board: [
              { type: "term", term: "Universalizing religion", def: "Seeks converts and appeals to all people, regardless of place or ethnicity." },
              { type: "bullets", items: ["Christianity: hearth in the Levant (Jerusalem)", "Islam: Mecca, Arabian Peninsula", "Buddhism: northeast India & southern Nepal", "Sikhism: Punjab"] },
            ],
          },
          {
            say: "Ethnic religions are tied to one group of people and one homeland. Hinduism and Judaism are examples, and so is Shinto in Japan. They rarely seek converts, so they stay near their hearth, or spread by relocation when believers migrate.",
            board: [
              { type: "term", term: "Ethnic religion", def: "Tied to a particular ethnic group and place; generally found near its hearth." },
              { type: "callout", text: "Hinduism → relocation with the Indian diaspora (Fiji, Trinidad). Judaism → diaspora.", tone: "example" },
            ],
          },
          {
            say: "Japan shows this clearly. Christianity arrived with Francis Xavier in 1549. Some daimyo converted, and their retainers and villagers often followed. ...Hierarchical diffusion, until the Tokugawa banned it in 1614.",
            board: [
              { type: "steps", items: ["1549: Francis Xavier arrives", "Daimyo convert (e.g., Ōmura Sumitada)", "Retainers & villages follow", "1614: Tokugawa ban"] },
              { type: "callout", text: "Top-down conversion = hierarchical diffusion.", tone: "tip" },
            ],
          },
          {
            say: "Languages diffuse too. Indo-European is the largest language family, spoken by nearly half the world, from Hindi to Spanish. Its hearth is debated. One theory says horse-riding herders spread it from the steppes north of the Black Sea, and another says early farmers carried it out of Anatolia.",
            board: [
              { type: "steps", items: ["Family: Indo-European", "Branch: Romance", "Language: Spanish", "Dialect: Mexican Spanish"] },
              { type: "bullets", items: ["Kurgan hypothesis: steppe pastoralists, conquest", "Anatolian hypothesis: spread with agriculture"] },
              { type: "callout", text: "Toponyms trace diffusion: Los Angeles, San Antonio → Spanish colonization.", tone: "example" },
            ],
          },
          {
            say: "Exam question. Look at the map in your mind: mostly near the hearth, with a few distant islands of believers. What explains that shape?",
            board: [
              { type: "callout", text: "Ethnic religion: near the hearth + relocation. Universalizing: expansion + relocation.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Hinduism is concentrated in South Asia, with smaller communities in places such as Fiji and Trinidad. Which statement best explains this pattern?",
                options: [
                  "As an ethnic religion, Hinduism stayed near its hearth and spread mostly through relocation diffusion",
                  "As a universalizing religion, Hinduism spread mainly through missionary expansion",
                  "Hinduism spread through hierarchical diffusion from European capitals",
                  "Hinduism diffused by stimulus diffusion along the Silk Road",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the best explanation for the distribution of Hinduism.",
              expect: { choice: 0 },
              hint: "...Hinduism does not seek converts. So how did it reach islands far from India? People carried it.",
              praise: "Correct. An ethnic religion, carried by migrants. ...You know this terrain now.",
            },
          },
        ],
      },
      {
        id: "3.8",
        title: "Effects of Diffusion",
        objective: "Explain how diffusion produces acculturation, assimilation, syncretism, and multiculturalism and changes the cultural landscape.",
        beats: [
          {
            say: "When cultures meet, four outcomes appear on the exam: acculturation, assimilation, syncretism, and multiculturalism. ...They sound alike. Let's separate them carefully.",
            board: [
              { type: "heading", text: "Effects of diffusion" },
              { type: "bullets", items: ["Acculturation", "Assimilation", "Syncretism", "Multiculturalism"] },
            ],
          },
          {
            say: "Acculturation is adopting some traits of another culture while keeping your own, like a family that speaks English at work and Vietnamese at home. Assimilation goes further. The original culture is mostly lost, often by the third generation.",
            board: [
              { type: "term", term: "Acculturation", def: "Adopting some traits of another (often dominant) culture while keeping one's own." },
              { type: "term", term: "Assimilation", def: "Absorption into the dominant culture, losing most original traits." },
              { type: "callout", text: "Assimilation can be forced: boarding schools for Native American children; Meiji-era policies toward the Ainu.", tone: "warn" },
            ],
          },
          {
            say: "Syncretism blends two traits into something new. In Japan, Shinto and Buddhism mixed for about a thousand years, with shrines and temples sharing the same grounds, until the government separated them in 1868. Tex-Mex food is syncretic too.",
            board: [
              { type: "term", term: "Syncretism", def: "The blending of two or more cultural traits into a new one." },
              { type: "bullets", items: ["Shinbutsu-shūgō: Shinto + Buddhism (separated 1868)", "Vodou (Haiti): West African religion + Catholicism", "Tex-Mex cuisine"] },
            ],
          },
          {
            say: "Multiculturalism is when many cultures live side by side and keep their distinct identities. Canada made it official policy in 1971. ...Not a melting pot. More like a mosaic.",
            board: [
              { type: "term", term: "Multiculturalism", def: "Multiple cultures coexisting within a society, each keeping its distinct identity." },
              { type: "callout", text: "Melting pot → assimilation. Mosaic → multiculturalism.", tone: "tip" },
            ],
          },
          {
            say: "Final question of the unit. Two traditions, joined into one ceremony. Which effect is that?",
            board: [
              { type: "callout", text: "Blend into something new = syncretism.", tone: "tip" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "In Cuba, practitioners of Santería honor Yoruba deities who are identified with Catholic saints, in ceremonies that combine both traditions. This is an example of",
                options: ["assimilation", "acculturation", "multiculturalism", "syncretism"],
                answer: 3,
              },
            },
            check: {
              prompt: "Name the effect of diffusion shown by Santería.",
              expect: { choice: 3 },
              hint: "...Neither tradition was lost. They fused into something new. Which term means blending?",
              praise: "Syncretism. Two traditions, one new form. ...Mm. You finished Unit 3. I'm proud of you.",
            },
          },
        ],
      },
    ],
  },
]
