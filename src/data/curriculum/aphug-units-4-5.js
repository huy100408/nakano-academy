// Miku Nakano · AP Human Geography · Units 4–5
// Topic numbers and titles follow the College Board AP Human Geography CED (effective Fall 2020).
// Lesson ids are stored with progress: never renumber or reuse them.

export default [
  {
    unit: 4,
    title: "Political Patterns and Processes",
    lessons: [
      // ───────────────────────────────────────────── 4.1
      {
        id: "4.1",
        title: "Introduction to Political Geography",
        objective: "Distinguish states, nations, nation-states, multinational states, multistate nations, stateless nations, and autonomous regions, and explain sovereignty.",
        beats: [
          {
            say: "...Mm. People mix up these two words all the time. A state is political. It is a territory with borders, a permanent population, a government, and sovereignty. A nation is cultural. It is a people who feel they belong together.",
            board: [
              { type: "heading", text: "State ≠ Nation" },
              { type: "term", term: "State", def: "A politically organized territory with defined borders, a permanent population, a government, and sovereignty, recognized by other states." },
              { type: "term", term: "Nation", def: "A group of people who share a culture (language, religion, history, ethnicity) and see themselves as one people, often seeking self-rule." },
            ],
          },
          {
            say: "Sovereignty is the right to govern your own territory, with no outside power above you. Other states have to recognize it. ...That is why Taiwan is a hard case. It governs itself, but only a few states formally recognize it.",
            board: [
              { type: "term", term: "Sovereignty", def: "A state's ultimate authority to govern its people and territory without outside interference." },
              { type: "callout", text: "Recognition matters: Taiwan has its own government, military, and currency, but limited formal recognition.", tone: "example" },
            ],
          },
          {
            say: "When one nation fills one state, you get a nation-state. Japan and Iceland are the usual examples, though even Japan has Ainu and Ryukyuan minorities. When one state holds several nations, it is a multinational state, like Russia, Canada, or the United Kingdom.",
            board: [
              { type: "term", term: "Nation-state", def: "A state whose population is overwhelmingly one nation. e.g., Japan, Iceland." },
              { type: "term", term: "Multinational state", def: "One state containing two or more nations. e.g., Russia, Canada, the United Kingdom." },
            ],
          },
          {
            say: "Now the reverse. A multistate nation is one people spread across several states. A stateless nation has no state of its own at all. The Kurds are the classic case, more than thirty million people across Turkey, Iraq, Iran, and Syria. And some regions inside a state govern themselves partly, like American Indian reservations.",
            board: [
              { type: "term", term: "Multistate nation", def: "One nation living in two or more states. e.g., Hungarians in Hungary, Romania, and Slovakia." },
              { type: "term", term: "Stateless nation", def: "A nation without a state of its own. e.g., Kurds, Basques." },
              { type: "term", term: "Autonomous / semi-autonomous region", def: "An area with some self-government inside a state. e.g., American Indian reservations, Greenland (Denmark)." },
            ],
          },
          {
            say: "Let's test it. Read the stimulus carefully. Ask yourself: is this a people, or a territory?",
            board: [
              { type: "heading", text: "Check: name the political entity" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "The Korean nation is divided between North Korea and South Korea, and a large Korean minority lives in northeast China. Which concept does this best illustrate?",
                options: ["Stateless nation", "Multistate nation", "Multinational state", "Autonomous region"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the concept that best describes the Korean nation.",
              expect: { choice: 1 },
              hint: "...Koreans do have states. More than one, actually. Which term describes one people across several states?",
              praise: "Mm. A multistate nation. One people, many states. You read the terrain well.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.2
      {
        id: "4.2",
        title: "Political Processes",
        objective: "Explain how colonialism, imperialism, independence movements, and devolution have shaped contemporary political boundaries.",
        beats: [
          {
            say: "Colonialism means a state claims land abroad and rules it directly, often sending settlers. Imperialism is broader. It is any extension of power over other peoples, through force, money, or culture. Every colony is imperialism, but imperialism does not always need colonies.",
            board: [
              { type: "term", term: "Colonialism", def: "A state claiming and directly ruling territory abroad, often with settlers, to control land and resources." },
              { type: "term", term: "Imperialism", def: "Extending a state's control over other territories and peoples, politically, economically, or culturally, with or without settlement." },
            ],
          },
          {
            say: "Colonialism came in waves. First, European powers took the Americas. Then in the eighteen hundreds, with steamships, railroads, and the telegraph, they carved up Africa and Asia. At the Berlin Conference, Europeans divided Africa, and no African ruler was at the table.",
            board: [
              { type: "steps", items: ["1500s–1700s: Americas (Spain, Portugal, Britain, France)", "1800s–1914: Africa & Asia (Berlin Conference, 1884–85)", "1945–1970s: decolonization"] },
              { type: "callout", text: "Technology enabled empire: steamships, railroads, the telegraph, and quinine.", tone: "tip" },
            ],
          },
          {
            say: "After World War Two, the empires could not hold. Colonized peoples demanded self-determination, the right to choose their own government. India and Pakistan became independent in 1947, and seventeen African states in 1960 alone. Then in 1991 the Soviet Union broke into fifteen countries.",
            board: [
              { type: "term", term: "Self-determination", def: "The right of a people to choose their own government and political status." },
              { type: "bullets", items: ["India & Pakistan, 1947", "1960, 'Year of Africa': 17 new African states", "USSR dissolves, 1991 → 15 independent states", "Democratization reshapes the map after the Cold War"] },
            ],
          },
          {
            say: "Devolution along national lines changed the map too. When Yugoslavia broke apart in the 1990s, new borders followed national groups. ...Mm. And many conflicts today trace back to colonial borders, drawn by outsiders who ignored who actually lived there.",
            board: [
              { type: "term", term: "Devolution", def: "Transfer of power from a central government to regions; at the extreme, a state breaking apart." },
              { type: "callout", text: "Colonial borders often split ethnic groups or forced rivals together, fueling later conflict (e.g., Nigeria's Biafran War, 1967–70).", tone: "warn" },
            ],
          },
          {
            say: "Now apply it. Think about who drew the lines, and when.",
            board: [
              { type: "heading", text: "Check: explain the pattern" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Many borders in Africa cut across ethnic homelands and place rival groups within the same state. Which process best explains this pattern?",
                options: ["Devolution after independence", "Supranational agreements made by the African Union", "Irredentist claims after the Cold War", "European colonialism and the Berlin Conference"],
                answer: 3,
              },
            },
            check: {
              prompt: "Pick the process that best explains Africa's border pattern.",
              expect: { choice: 3 },
              hint: "...Who sat at the table in Berlin? And who was missing?",
              praise: "Correct. Outsiders drew lines on a map they had never walked. You're becoming a strategist.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.3
      {
        id: "4.3",
        title: "Political Power and Territoriality",
        objective: "Describe how political power is expressed geographically as control over people, land, and resources, through territoriality, neocolonialism, shatterbelts, and choke points.",
        beats: [
          {
            say: "For a geographer, political power means control. Control of people, land, and resources. Territoriality is the bond between a people, their culture, their economy, and their land. And the urge to defend it.",
            board: [
              { type: "term", term: "Political power (geographic)", def: "Control over people, land, and resources." },
              { type: "term", term: "Territoriality", def: "The connection of people, their culture, and their economic systems to the land, and their effort to control it." },
            ],
          },
          {
            say: "Colonies mostly ended, but control did not disappear. Neocolonialism is power without the flag. Through debt, investment, trade, or culture, a stronger country still shapes a weaker country's choices.",
            board: [
              { type: "term", term: "Neocolonialism", def: "Indirect control of a less powerful state through economic, political, or cultural pressure rather than direct rule." },
              { type: "bullets", items: ["Loans with policy conditions attached", "Foreign ownership of mines, oil, plantations", "Exports tied to a former colonizer's market"] },
              { type: "callout", text: "Often cited: the CFA franc, long backed by the French treasury.", tone: "example" },
            ],
          },
          {
            say: "A shatterbelt is a region caught between rival outside powers, and already divided inside. Outside pressure plus internal splits means conflict again and again. Eastern Europe and the Balkans are the classic cases. ...Like Shinano province, fought over by Takeda and Uesugi, battle after battle.",
            board: [
              { type: "term", term: "Shatterbelt", def: "A region of internal ethnic, religious, or political division caught between stronger outside powers; prone to repeated conflict." },
              { type: "bullets", items: ["Eastern Europe & the Balkans", "The Middle East", "Southeast Asia during the Cold War"] },
              { type: "callout", text: "Context: Mackinder's Heartland theory (1904) said whoever rules Eastern Europe commands the Eurasian heartland; Spykman's Rimland theory said power lies on Eurasia's coastal edge.", tone: "tip" },
            ],
          },
          {
            say: "A choke point is a narrow passage that a lot of traffic must squeeze through. The Strait of Hormuz carries about a fifth of the world's oil. Whoever can close a choke point holds leverage over everyone who uses it.",
            board: [
              { type: "term", term: "Choke point", def: "A narrow route, such as a strait, canal, or mountain pass, where control gives leverage over trade or military movement." },
              { type: "bullets", items: ["Strait of Hormuz (~1/5 of world oil)", "Strait of Malacca", "Suez & Panama Canals", "Bab-el-Mandeb"] },
            ],
          },
          {
            say: "The exam likes to put all three terms in the answer choices. Match each example to its mechanism.",
            board: [
              { type: "heading", text: "Check: which expression of power?" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which of the following best illustrates political power expressed through control of a choke point?",
                options: ["Iran threatening to restrict tanker traffic through the Strait of Hormuz", "A former colony that still sells most of its exports to its former colonizer", "Rival ethnic groups in the Balkans backed by competing outside powers", "A central government assigning legislative seats to provinces"],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the best example of power through a choke point.",
              expect: { choice: 0 },
              hint: "...Look for a narrow passage. Which option is about a route that traffic cannot avoid?",
              praise: "Mm. Hormuz. Hold the narrow pass, and the whole road answers to you.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.4
      {
        id: "4.4",
        title: "Defining Political Boundaries",
        objective: "Classify political boundaries as antecedent, subsequent, consequent, superimposed, geometric, or relic.",
        beats: [
          {
            say: "Some boundary types are about timing. An antecedent boundary was drawn before most people settled there. A subsequent boundary was drawn after settlement, and adjusted as the cultural landscape grew.",
            board: [
              { type: "term", term: "Antecedent", def: "Drawn before an area was densely settled. e.g., the western US–Canada border along the 49th parallel." },
              { type: "term", term: "Subsequent", def: "Drawn after settlement, as the cultural landscape developed. e.g., the China–Vietnam border, adjusted over centuries." },
            ],
          },
          {
            say: "A consequent boundary is a subsequent one drawn on purpose to follow cultural lines, such as language, religion, or ethnicity. A superimposed boundary is the opposite in spirit. Outside powers force it onto people already living there, ignoring them. Much of Africa's map came this way.",
            board: [
              { type: "term", term: "Consequent", def: "A type of subsequent boundary drawn to match existing cultural divisions. e.g., the 1947 India–Pakistan partition along religious lines." },
              { type: "term", term: "Superimposed", def: "Imposed on an existing cultural landscape by an outside power. e.g., African borders after the Berlin Conference." },
            ],
          },
          {
            say: "Geometric boundaries are about shape. Straight lines, often along latitude or longitude, like Egypt's border with Sudan. A relic boundary no longer works as a border, but you can still see it on the landscape. Pieces of the Berlin Wall... a line the land remembers.",
            board: [
              { type: "term", term: "Geometric", def: "A straight line, often of latitude or longitude, ignoring physical and cultural features. e.g., Egypt–Sudan (22°N)." },
              { type: "term", term: "Relic", def: "A former boundary that no longer functions but still marks the landscape. e.g., the Berlin Wall, Hadrian's Wall, the Great Wall." },
            ],
          },
          {
            say: "...Mm. Here is how I sort them. Ask when it was drawn, who drew it and why, what shape it has, and whether it still works. One border can answer more than one question. The 49th parallel is antecedent and geometric at the same time.",
            board: [
              { type: "steps", items: ["When was it drawn? → antecedent / subsequent", "Who drew it, and why? → consequent / superimposed", "What shape is it? → geometric", "Does it still function? → relic"] },
              { type: "callout", text: "One boundary can be two types at once: the 49th parallel is antecedent AND geometric.", tone: "tip" },
            ],
          },
          {
            say: "A new example now. Focus on why the line was placed where it is.",
            board: [
              { type: "heading", text: "Check: classify the boundary" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "When Czechoslovakia split peacefully in 1993, the new border between the Czech Republic and Slovakia followed the existing divide between Czech and Slovak regions. Based on why it was drawn there, this boundary is best classified as",
                options: ["Consequent", "Antecedent", "Relic", "Geometric"],
                answer: 0,
              },
            },
            check: {
              prompt: "Classify the Czech–Slovak border by why it was drawn.",
              expect: { choice: 0 },
              hint: "...The line follows where two peoples already lived. Which type is drawn to match cultural divisions?",
              praise: "Correct. Consequent. The line followed the people, not the other way around.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.5
      {
        id: "4.5",
        title: "The Function of Political Boundaries",
        objective: "Explain how boundaries are defined, delimited, demarcated, and administered, why they are contested, and how UNCLOS divides maritime space.",
        beats: [
          {
            say: "A boundary is made in four steps. First it is defined in words, in a treaty. Then it is delimited, drawn on a map. Then demarcated, marked on the ground with posts, fences, or walls. Finally it is administered, guarded and managed day to day.",
            board: [
              { type: "steps", items: ["Define: legal description in a treaty", "Delimit: drawn on a map", "Demarcate: marked on the ground (posts, fences, walls)", "Administer: enforced and managed (customs, patrols)"] },
            ],
          },
          {
            say: "Boundaries mark the limits of sovereignty, so states argue about them. They dispute the wording, the location, how the border operates, and resources that cross it. Boundaries can also open or close interaction. In Europe's Schengen Area, people cross freely. Across the Korean Demilitarized Zone, almost no one does.",
            board: [
              { type: "bullets", items: ["Definitional: over the treaty's wording", "Locational: over where the line actually lies", "Operational: over how the border works (migration, trade)", "Allocational: over shared resources (oil, water)"] },
              { type: "callout", text: "Borders shape interaction and identity: Schengen Area (open) vs. the Korean DMZ (sealed by a 1953 armistice).", tone: "example" },
            ],
          },
          {
            say: "At sea, the rules come from UNCLOS, the United Nations Convention on the Law of the Sea. Measured from the coast, the first twelve nautical miles are territorial sea, fully sovereign. Out to twenty-four is the contiguous zone, for customs and immigration enforcement. Out to two hundred is the exclusive economic zone, where only that state may fish or drill.",
            board: [
              { type: "term", term: "UNCLOS (1982)", def: "UN treaty defining states' rights and responsibilities at sea: territorial seas, EEZs, and the high seas." },
              { type: "steps", items: ["Baseline (coast)", "0–12 nm: territorial sea (full sovereignty; innocent passage allowed)", "12–24 nm: contiguous zone (customs, immigration, pollution laws)", "to 200 nm: EEZ (exclusive rights to fish, oil, gas, minerals)", "Beyond: high seas (open to all)"] },
            ],
          },
          {
            say: "...Mm. This is why tiny islands matter. An island that can sustain people generates its own exclusive economic zone, with the fish and oil inside it. In the South China Sea, several states' claims overlap, and in 2016 a tribunal under UNCLOS rejected China's broadest claim.",
            board: [
              { type: "callout", text: "South China Sea: overlapping claims by China, Vietnam, the Philippines, Malaysia, Brunei, and Taiwan; a 2016 UNCLOS tribunal found no legal basis for China's 'nine-dash line.'", tone: "warn" },
              { type: "callout", text: "Exam tip: a habitable island can generate a 200 nm EEZ; a bare rock gets only a 12 nm territorial sea.", tone: "tip" },
            ],
          },
          {
            say: "Picture the zones going out from the shore. Then decide which one applies.",
            board: [
              { type: "heading", text: "Check: which maritime zone?" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A foreign fishing fleet operates 150 nautical miles off a country's coast without permission. Under UNCLOS, the coastal country's right to stop the fleet rests on which zone?",
                options: ["Territorial sea", "Contiguous zone", "Exclusive economic zone", "High seas"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the UNCLOS zone that covers 150 nautical miles offshore.",
              expect: { choice: 2 },
              hint: "...Twelve, twenty-four, two hundred. Where does one hundred fifty fall? And which zone is about resources?",
              praise: "Mm. The exclusive economic zone. The fish out there belong to that coast. Well done.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.6
      {
        id: "4.6",
        title: "Internal Boundaries",
        objective: "Explain how voting districts, redistricting, and gerrymandering, through packing and cracking, affect election results.",
        beats: [
          {
            say: "Internal boundaries divide a state into smaller units. Provinces, counties, voting districts. In the United States, after every ten-year census, the four hundred thirty-five House seats are reassigned among the states. Then district lines are redrawn so each district holds about the same number of people.",
            board: [
              { type: "term", term: "Reapportionment", def: "Reassigning the 435 US House seats among states based on census population." },
              { type: "term", term: "Redistricting", def: "Redrawing electoral district lines, in the US after each census, so districts have roughly equal population." },
            ],
          },
          {
            say: "When lines are drawn to help one party or group win, that is gerrymandering. The name comes from an 1812 Massachusetts district, signed by Governor Elbridge Gerry, that looked like a salamander. ...Mm. Same voters, different lines, different winners.",
            board: [
              { type: "term", term: "Gerrymandering", def: "Drawing district boundaries to give one party or group an advantage." },
              { type: "callout", text: "Named for Gov. Elbridge Gerry's salamander-shaped Massachusetts district (1812).", tone: "example" },
            ],
          },
          {
            say: "There are two main tactics. Packing crams the other side's voters into a few districts, so they win those by huge margins and waste votes. Cracking splits them across many districts, so they fall just short everywhere. Try moving the lines on the board.",
            board: [
              { type: "term", term: "Packing", def: "Concentrating the opponent's voters into a few districts they win by huge, 'wasted' margins." },
              { type: "term", term: "Cracking", def: "Spreading the opponent's voters across many districts so they are a minority in each." },
            ],
            widget: { type: "gerrymander", props: {} },
          },
          {
            say: "So a party can win fewer votes but more seats. Districts must be nearly equal in population and are usually contiguous, and courts can strike down maps that dilute minority voters by race. Some states now give the job to independent commissions instead of legislators.",
            board: [
              { type: "callout", text: "Effect: seat share can differ sharply from vote share.", tone: "warn" },
              { type: "bullets", items: ["Equal population per district", "Usually contiguous (one connected piece)", "Voting Rights Act: no diluting minority votes by race", "Independent commissions (e.g., California, Arizona)"] },
            ],
          },
          {
            say: "Now you draw. Blue has fifteen of the twenty-five voters, a clear majority. Let's see if the lines can beat the votes.",
            board: [
              { type: "heading", text: "Check: gerrymander the grid" },
              { type: "callout", text: "Goal: red wins at least 3 of 5 seats with only 10 of 25 voters.", tone: "tip" },
            ],
            check: {
              prompt: "Redraw the five districts so red wins at least three seats, while every district stays valid.",
              expect: { redSeats: { min: 3 }, valid: true },
              hint: "...Pack the blue voters tightly into two districts. Then spread red so it holds a narrow three to two edge in the other three.",
              praise: "Mm... Blue has sixty percent of the voters, and only two seats. That is packing and cracking. Now you see why the lines matter.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.7
      {
        id: "4.7",
        title: "Forms of Governance",
        objective: "Compare unitary and federal states and explain how each distributes power across territory.",
        beats: [
          {
            say: "In a unitary state, power sits at the center. The national government makes the key decisions, and local governments carry them out. France, Japan, and China work this way.",
            board: [
              { type: "term", term: "Unitary state", def: "Power concentrated in the central government; a top-down, centralized form of governance. e.g., France, Japan, China." },
            ],
          },
          {
            say: "In a federal state, power is shared. Regional governments, like American states or Canadian provinces, hold real authority of their own, protected by the constitution. The United States, Germany, India, Brazil, and Nigeria are federal.",
            board: [
              { type: "term", term: "Federal state", def: "Power divided between national and regional governments; more locally based, dispersed power centers. e.g., USA, Germany, India, Brazil, Nigeria." },
            ],
          },
          {
            say: "Geography shapes the choice. Small, culturally similar states often stay unitary. Large states with many nations often choose federalism, giving each group a regional voice. But these are tendencies, not rules. China is enormous, and still unitary.",
            board: [
              { type: "bullets", items: ["Unitary is common in: small, compact, culturally homogeneous states", "Federal is common in: large states with many ethnic or linguistic groups", "Federalism can ease devolutionary pressure by granting regional autonomy"] },
              { type: "callout", text: "Tendencies, not rules: China is huge and unitary; Belgium is small and federal.", tone: "warn" },
            ],
          },
          {
            say: "States can also shift along the spectrum. The United Kingdom is unitary, but since the late 1990s Scotland, Wales, and Northern Ireland have had their own legislatures. ...Mm. Even the Tokugawa shogun let his daimyo run their own domains, while he kept control of war and foreign affairs.",
            board: [
              { type: "callout", text: "UK: unitary, but devolved legislatures in Scotland, Wales, and Northern Ireland since 1998–99.", tone: "example" },
              { type: "callout", text: "Tokugawa Japan: daimyo ran their domains; the shogun held foreign policy and military power.", tone: "example" },
            ],
          },
          {
            say: "Read the stimulus, then match the structure to the reason.",
            board: [
              { type: "heading", text: "Check: form of governance" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "India's constitution divides power between the national government and 28 states, many of which were drawn along linguistic lines. Which statement best describes India's governance?",
                options: ["Unitary: power flows from the center, and states only carry out national policy", "Unitary: linguistic states make the central government weaker", "Federal: regional governments share power, accommodating many linguistic groups", "Federal: a single dominant language group allows power to be dispersed"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the statement that best describes India's form of governance.",
              expect: { choice: 2 },
              hint: "...Who holds power here, only the center, or the center and the states together? And why would a diverse country want that?",
              praise: "Correct. Federal, so many peoples can each have a voice. Like a general who knows the terrain.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.8
      {
        id: "4.8",
        title: "Defining Devolutionary Factors",
        objective: "Explain how physical geography, ethnic separatism, ethnic cleansing, terrorism, economic and social problems, and irredentism can lead to devolution.",
        beats: [
          {
            say: "Devolution is power flowing from the center out to regions. Sometimes regions win autonomy, like Catalonia in Spain or Flanders in Belgium. Sometimes the state breaks apart, like the Soviet Union, or Sudan, when South Sudan became independent in 2011.",
            board: [
              { type: "term", term: "Devolution", def: "Transfer of power from the central government to regional governments, or, at the extreme, the breakup of a state." },
              { type: "bullets", items: ["Autonomous regions: Spain, Belgium, Canada (Quebec), Nigeria", "Disintegration: USSR (1991), Ethiopia → Eritrea (1993), Sudan → South Sudan (2011)"] },
            ],
          },
          {
            say: "Some causes are physical. When water, mountains, or distance separate a region from its capital, ties weaken. East Pakistan sat across India from West Pakistan, and in 1971 it became Bangladesh. Other causes are cultural, like ethnic separatism, a group demanding its own state.",
            board: [
              { type: "callout", text: "Physical division: East and West Pakistan were ~1,600 km apart → Bangladesh, 1971.", tone: "example" },
              { type: "term", term: "Ethnic separatism", def: "An ethnic group's push for autonomy or independence from the state. e.g., Catalans, Basques, Québécois." },
            ],
          },
          {
            say: "Some causes are violent. Ethnic cleansing forcibly removes a group so a territory belongs to one people, as in Bosnia in the 1990s. Some separatist groups used terrorism, like ETA in Spain's Basque Country. ...These are hard cases. But you should be able to name them clearly.",
            board: [
              { type: "term", term: "Ethnic cleansing", def: "Forcibly removing an ethnic group from an area, by expulsion or killing, to create an ethnically uniform territory. e.g., Bosnia (1990s), Rohingya in Myanmar." },
              { type: "term", term: "Terrorism", def: "Violence against civilians to pressure a government; used by some separatist groups. e.g., ETA (Basque), the IRA." },
            ],
          },
          {
            say: "Money divides too. Wealthy Catalonia resents sending its taxes to Madrid, while neglected regions feel abandoned. Irredentism is different. It is a state claiming land in another state because people of its own nation live there, as Russia did in Crimea in 2014.",
            board: [
              { type: "bullets", items: ["Economic & social problems: rich regions resent subsidizing poorer ones (Catalonia, northern Italy); poor regions feel neglected"] },
              { type: "term", term: "Irredentism", def: "A state's claim to territory in another state inhabited by its ethnic kin. e.g., Russia's annexation of Crimea (2014)." },
            ],
          },
          {
            say: "One more case. Pay attention to who is acting: a group inside a state, or a state reaching outward.",
            board: [
              { type: "heading", text: "Check: name the devolutionary factor" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "In 1977, Somalia invaded Ethiopia's Ogaden region, seeking to annex land inhabited largely by ethnic Somalis. This action is best described as",
                options: ["Ethnic separatism", "Supranationalism", "Neocolonialism", "Irredentism"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the term that best describes Somalia's action.",
              expect: { choice: 3 },
              hint: "...Somalia is a state reaching across a border for land where its own people live. Which term means that?",
              praise: "Mm. Irredentism. A state claiming its kin's land next door. You got it.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.9
      {
        id: "4.9",
        title: "Challenges to Sovereignty",
        objective: "Explain how devolution, supranationalism, and advances in communication technology challenge state sovereignty.",
        beats: [
          {
            say: "Sovereignty gets pressed from two directions. From below, regions push for devolution. From above, states hand some power to supranational organizations, groups of states that cooperate for shared goals.",
            board: [
              { type: "bullets", items: ["From below: devolution, separatist movements", "From above: supranational organizations", "Across borders: global flows of money, migrants, information"] },
              { type: "term", term: "Supranationalism", def: "Three or more states giving up some sovereignty to a shared organization for economic, political, military, or environmental goals." },
            ],
          },
          {
            say: "Why would a state give up any power? Bigger markets, shared defense, and problems no state can solve alone, like pollution or climate change that cross borders. ...Mm. Like rival clans forming an alliance. Each gives up a little freedom, and all grow stronger.",
            board: [
              { type: "bullets", items: ["Economies of scale & trade agreements", "Military alliances", "Transnational & environmental challenges"] },
            ],
          },
          {
            say: "Know these six for the exam. The United Nations, the European Union, NATO, ASEAN, the African Union, and the Arctic Council. The EU goes furthest. Many members share the euro, people move freely, and EU law can override national law.",
            board: [
              { type: "bullets", items: ["UN (1945): global peace & cooperation", "EU: single market, the euro, Schengen free movement", "NATO (1949): collective defense (Article 5)", "ASEAN: Southeast Asian trade & stability", "African Union (2002): 55 members", "Arctic Council: Arctic environment & development"] },
            ],
          },
          {
            say: "The tension is real. In 2016, British voters chose to leave the EU, partly to take back control of borders and laws, and the UK left in 2020. Technology adds pressure too. The internet helps separatists, supranational groups, and democracy movements all organize across borders.",
            board: [
              { type: "callout", text: "Brexit: 2016 referendum; the UK left the EU in 2020, citing sovereignty over laws, borders, and trade.", tone: "example" },
              { type: "callout", text: "Communication technology has facilitated devolution, supranationalism, AND democratization (e.g., social media in the Arab Spring).", tone: "tip" },
            ],
          },
          {
            say: "Look for the case where a higher authority limits what a state can do on its own.",
            board: [
              { type: "heading", text: "Check: sovereignty from above" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which situation best illustrates a supranational organization limiting a member state's sovereignty?",
                options: ["Scotland holding a referendum on independence from the United Kingdom", "An EU member changing its national law to comply with an EU environmental directive", "Russia annexing Crimea to protect ethnic Russians", "A US state legislature redrawing its congressional districts"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the best example of supranationalism limiting sovereignty.",
              expect: { choice: 1 },
              hint: "...Scotland is pressure from below. Which option has power coming from above the state?",
              praise: "Correct. The EU's rule reaches inside the state. That is sovereignty pooled from above.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 4.10
      {
        id: "4.10",
        title: "Consequences of Centrifugal and Centripetal Forces",
        objective: "Explain how centrifugal forces can lead to failed states, uneven development, and ethnic nationalist movements, and how centripetal forces build unity.",
        beats: [
          {
            say: "Centrifugal forces pull a state apart. Centripetal forces hold it together. Every state has both, all the time. The question is which side is winning.",
            board: [
              { type: "term", term: "Centrifugal forces", def: "Factors that divide a state: ethnic, religious, or language divisions, uneven development, weak infrastructure, distance from the core." },
              { type: "term", term: "Centripetal forces", def: "Factors that unify a state: shared identity and symbols, a strong economy, infrastructure, a common external threat." },
            ],
          },
          {
            say: "When centrifugal forces win, the results are serious. A failed state can no longer control its territory or provide basic services, as in Somalia in the 1990s. Development grows uneven, and stateless nations launch ethnic nationalist movements.",
            board: [
              { type: "heading", text: "Centrifugal → may lead to" },
              { type: "bullets", items: ["Failed states (government loses control of territory and services; e.g., Somalia, Yemen)", "Uneven development: rich core, neglected periphery", "Stateless nations & ethnic nationalist movements (e.g., Kurds)"] },
            ],
          },
          {
            say: "When centripetal forces win, a state grows more unified. Shared language, schools, and symbols build cultural cohesion. Tanzania promoted Swahili to bind more than a hundred ethnic groups together. And infrastructure that reaches every region spreads development more fairly.",
            board: [
              { type: "heading", text: "Centripetal → can lead to" },
              { type: "bullets", items: ["Ethnonationalism: strong attachment to the nation-state", "More equitable infrastructure development", "Increased cultural cohesion"] },
              { type: "callout", text: "Tanzania promoted Swahili as a shared national language across 120+ ethnic groups.", tone: "example" },
            ],
          },
          {
            say: "Careful. One factor can push either way. Religion helps unify Poland, but in Northern Ireland it divided Protestants and Catholics. ...Shingen's Fūrinkazan banner gave his warriors one identity. A flag can be a centripetal force too.",
            board: [
              { type: "callout", text: "Same factor, different effect: religion is centripetal in Poland, centrifugal in Northern Ireland.", tone: "tip" },
              { type: "callout", text: "Ethnonationalism cuts both ways: it unifies a nation-state but can exclude minorities.", tone: "warn" },
            ],
          },
          {
            say: "Last one for this unit. Sort each option: does it divide, or unify?",
            board: [
              { type: "heading", text: "Check: consequences of forces" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which of the following is most likely a consequence of strong centrifugal forces?",
                options: ["Increased cultural cohesion through a shared national language", "More equitable infrastructure linking the core and periphery", "A failed state whose government cannot control much of its territory", "Ethnonationalism attached to the whole nation-state"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the most likely consequence of strong centrifugal forces.",
              expect: { choice: 2 },
              hint: "...Three of these hold a state together. Find the one where the state is coming apart.",
              praise: "Mm. A failed state. The center could not hold. ...You finished the unit. I'm a little proud.",
            },
          },
        ],
      },
    ],
  },

  {
    unit: 5,
    title: "Agriculture and Rural Land-Use Patterns and Processes",
    lessons: [
      // ───────────────────────────────────────────── 5.1
      {
        id: "5.1",
        title: "Introduction to Agriculture",
        objective: "Explain how physical geography and climate shape agricultural practices, and distinguish intensive from extensive farming.",
        beats: [
          {
            say: "Agriculture starts with the land. Climate, soil, slope, and water decide what can grow. Rice needs heat and flooded fields, so it dominates monsoon Asia. Wheat tolerates cooler, drier plains.",
            board: [
              { type: "bullets", items: ["Climate: temperature, rainfall, length of growing season", "Soil fertility & terrain (slope)", "Water: rivers, rainfall, irrigation"] },
              { type: "callout", text: "Rice: warm + standing water → monsoon Asia. Wheat: cooler, drier → the Great Plains, the Russian steppe.", tone: "example" },
            ],
          },
          {
            say: "Intensive agriculture puts a lot of labor or capital into a small piece of land, to get high output from it. The course names three examples. Market gardening, plantation agriculture, and mixed crop and livestock systems.",
            board: [
              { type: "term", term: "Intensive agriculture", def: "High inputs of labor and/or capital per unit of land → high output per acre." },
              { type: "bullets", items: ["Market gardening (truck farming)", "Plantation agriculture", "Mixed crop & livestock systems"] },
            ],
          },
          {
            say: "Extensive agriculture is the reverse. Little labor or capital per acre, spread over lots of land. Shifting cultivation, nomadic herding, and ranching. Output per acre is low, but the land is cheap, or the environment allows little else.",
            board: [
              { type: "term", term: "Extensive agriculture", def: "Low inputs of labor and capital per unit of land, spread over large areas → lower output per acre." },
              { type: "bullets", items: ["Shifting cultivation (slash-and-burn)", "Nomadic herding (pastoral nomadism)", "Ranching"] },
            ],
          },
          {
            say: "...Mm. In Sengoku Japan, a lord's strength was counted in koku of rice, about what feeds one person for a year. Farmland was power. And remember, intensive or extensive is about inputs per acre, not the size of the farm.",
            board: [
              { type: "callout", text: "Intensive vs. extensive = inputs per unit of land, NOT farm size or profit.", tone: "tip" },
              { type: "callout", text: "Koku: a daimyo's domain was ranked by its rice yield; 1 koku ≈ rice to feed one person for a year.", tone: "example" },
            ],
          },
          {
            say: "Quick check. Match each practice to its type.",
            board: [
              { type: "heading", text: "Check: intensive or extensive?" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which pairing correctly matches a farming practice with its type?",
                options: ["Ranching: intensive", "Market gardening: intensive", "Plantation agriculture: extensive", "Shifting cultivation: intensive"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the correct practice and type pairing.",
              expect: { choice: 1 },
              hint: "...Which practice squeezes the most labor into a small plot near the city?",
              praise: "Correct. Market gardening is intensive. Small plots, a lot of work, high output.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.2
      {
        id: "5.2",
        title: "Settlement Patterns and Survey Methods",
        objective: "Identify clustered, dispersed, and linear rural settlement patterns and the metes and bounds, township and range, and long-lot survey methods.",
        beats: [
          {
            say: "Rural settlements come in three patterns. Clustered, where farm families live together in a village and walk out to their fields. Dispersed, where each farmhouse sits alone on its own land. Linear, where homes line up along a road, river, or coast.",
            board: [
              { type: "term", term: "Clustered", def: "Homes grouped in a village with fields around it; shared services and defense. e.g., traditional European and Asian farm villages." },
              { type: "term", term: "Dispersed", def: "Farmhouses spread out, each on its own land. e.g., the US Midwest." },
              { type: "term", term: "Linear", def: "Homes arranged along a line: a road, river, canal, or coast." },
            ],
          },
          {
            say: "Survey methods are how land gets divided. Metes and bounds uses landmarks, like a stream, an oak tree, or a large rock, plus distances and directions. The plots come out irregular. You see it in the original thirteen colonies.",
            board: [
              { type: "term", term: "Metes and bounds", def: "Property lines described by natural features, distances, and directions → irregular plots. e.g., the original 13 colonies." },
            ],
          },
          {
            say: "Township and range is a grid. After 1785, the United States divided its western lands into townships six miles on a side, each cut into thirty-six sections of one square mile. Fly over Kansas, and you see a checkerboard.",
            board: [
              { type: "term", term: "Township and range", def: "US grid survey (Land Ordinance of 1785): 6 × 6 mile townships of 36 one-square-mile sections (640 acres each)." },
              { type: "callout", text: "Result: checkerboard fields, straight roads, and dispersed farmsteads across the Midwest and Great Plains.", tone: "example" },
            ],
          },
          {
            say: "Long lots come from French settlers. Each farm is a thin strip running back from a river, so every family gets a piece of the shore. You still see them along the St. Lawrence in Quebec, and in Louisiana.",
            board: [
              { type: "term", term: "Long lot", def: "Long, narrow parcels extending back from a river or road, giving each farm water access. e.g., French Quebec and Louisiana." },
              { type: "callout", text: "Long lots → linear settlement. Township and range → dispersed settlement. Metes and bounds → irregular plots.", tone: "tip" },
            ],
          },
          {
            say: "Imagine you are looking down from a plane. Read the landscape.",
            board: [
              { type: "heading", text: "Check: read the aerial view" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "An aerial photo of rural Louisiana shows narrow farm plots stretching back from the Mississippi River, with farmhouses lined up along the riverbank. Which survey method and settlement pattern does this show?",
                options: ["Township and range; dispersed", "Metes and bounds; clustered", "Long lot; linear", "Township and range; linear"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the survey method and settlement pattern shown.",
              expect: { choice: 2 },
              hint: "...Thin strips, each touching the river. Who settled Louisiana first, and how did they divide land?",
              praise: "Mm. Long lots, in a line along the river. You read it like a battle map.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.3
      {
        id: "5.3",
        title: "Agricultural Origins and Diffusions",
        objective: "Identify early hearths of plant and animal domestication and explain how agriculture diffused, including through the Columbian Exchange.",
        beats: [
          {
            say: "About ten to twelve thousand years ago, people began to domesticate plants and animals. Geographers call it the First Agricultural Revolution, or the Neolithic Revolution. A food surplus meant permanent villages, then cities, then states.",
            board: [
              { type: "term", term: "First Agricultural Revolution (Neolithic Revolution)", def: "~10,000–12,000 years ago: the shift from hunting and gathering to domesticating plants and animals." },
              { type: "steps", items: ["Domestication", "Food surplus", "Permanent settlement", "Population growth, cities, states"] },
            ],
          },
          {
            say: "The course names the Fertile Crescent first, plus the Indus River Valley, Southeast Asia, and Central America. Wheat, barley, sheep, and goats came from the Fertile Crescent. Maize, beans, and squash came from Mesoamerica. Other hearths existed too, in China, the Andes, and West Africa.",
            board: [
              { type: "bullets", items: ["Fertile Crescent (SW Asia): wheat, barley, lentils; sheep, goats, cattle", "Indus River Valley: cotton, zebu cattle", "Southeast Asia: taro, yams, bananas; chickens", "Mesoamerica (Central America): maize, beans, squash"] },
              { type: "callout", text: "Also: China (millet, rice), the Andes (potato, llama), West Africa (sorghum, yams).", tone: "tip" },
            ],
          },
          {
            say: "After 1492, crops and animals crossed the oceans. This is the Columbian Exchange. Horses, cattle, wheat, and sugarcane went to the Americas, along with deadly diseases like smallpox. Maize, potatoes, tomatoes, and cacao went to Europe, Africa, and Asia.",
            board: [
              { type: "term", term: "Columbian Exchange", def: "The transfer of crops, animals, people, and diseases between the Eastern and Western Hemispheres after 1492." },
              { type: "bullets", items: ["To the Americas: wheat, rice, sugarcane, horses, cattle, pigs, smallpox", "To Afro-Eurasia: maize, potatoes, tomatoes, cacao, cassava"] },
            ],
          },
          {
            say: "Diffusion changed whole societies. The Andean potato fed Europe's growing population, until Ireland depended on it so heavily that blight caused a famine. ...Mm. The American sweet potato even reached Japan, through the Ryukyu Islands, just after the Sengoku era ended.",
            board: [
              { type: "callout", text: "Potato → Europe's population boom; Irish dependence + blight → the Great Famine (1845–52).", tone: "warn" },
              { type: "callout", text: "Maize became a staple across much of Africa; sweet potatoes reached Japan via the Ryukyus in the early 1600s.", tone: "example" },
            ],
          },
          {
            say: "Now match a crop to its home. Think about which hemisphere first.",
            board: [
              { type: "heading", text: "Check: crops and hearths" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which crop is correctly matched with the hearth where it was first domesticated?",
                options: ["Wheat: Southeast Asia", "Potato: the Fertile Crescent", "Cacao: the Indus River Valley", "Maize: Mesoamerica"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the correct crop and hearth pairing.",
              expect: { choice: 3 },
              hint: "...Potatoes and cacao are from the Americas. Wheat is from Southwest Asia. Which pairing is left?",
              praise: "Correct. Maize, from Mesoamerica. ...Swift as the wind.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.4
      {
        id: "5.4",
        title: "The Second Agricultural Revolution",
        objective: "Explain the advances of the Second Agricultural Revolution and how it led to better diets, longer life expectancy, and more workers for industry.",
        beats: [
          {
            say: "The Second Agricultural Revolution began in Britain and Western Europe in the seventeen hundreds. It moved alongside the Industrial Revolution. Farms produced more food with fewer workers.",
            board: [
              { type: "term", term: "Second Agricultural Revolution", def: "~1700s–1800s, starting in Britain: new tools, techniques, and crop systems that raised yields while needing fewer farmworkers." },
            ],
          },
          {
            say: "Look at the innovations. Jethro Tull's seed drill planted in neat rows instead of scattering seed. The four-field rotation of wheat, turnips, barley, and clover kept soil fertile without leaving fields empty. Breeders raised bigger, more productive livestock.",
            board: [
              { type: "bullets", items: ["Seed drill (Jethro Tull, 1701)", "Four-field rotation: wheat, turnips, barley, clover (no fallow year)", "Selective breeding of livestock"] },
            ],
          },
          {
            say: "Enclosure fenced off open fields and common land into larger private farms. Many rural families lost access to land and moved to the cities. Later, steel plows, mechanical reapers, railroads, and refrigeration pushed output and markets even further.",
            board: [
              { type: "term", term: "Enclosure movement", def: "Consolidating open fields and common lands into private, fenced farms (Britain, 1700s–1800s)." },
              { type: "bullets", items: ["Steel plow (John Deere, 1837); mechanical reaper (McCormick, 1830s)", "Railroads & refrigerated transport reach distant markets", "Chemical fertilizers (later 1800s)"] },
            ],
          },
          {
            say: "Here is the chain the exam wants. More food meant better diets and longer lives. Fewer farmers were needed, so rural people moved to cities. Those people became the factory workers of the Industrial Revolution.",
            board: [
              { type: "steps", items: ["More, cheaper food", "Better diets → longer life expectancy", "Fewer farm jobs → rural-to-urban migration", "Workers for factories → industrialization"] },
              { type: "callout", text: "Link to Unit 2: falling death rates pushed Europe into DTM Stage 2.", tone: "tip" },
            ],
          },
          {
            say: "Find the consequence that belongs to this revolution, and not to a different one.",
            board: [
              { type: "heading", text: "Check: consequences" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which of the following was a direct consequence of the Second Agricultural Revolution in Western Europe?",
                options: ["The first domestication of wheat and barley", "Widespread planting of genetically modified seeds", "A surplus of rural labor that moved to industrial cities", "A shift from commercial to subsistence farming"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the direct consequence of the Second Agricultural Revolution.",
              expect: { choice: 2 },
              hint: "...Domestication was the first revolution. GMOs came much later. Where did the farmworkers go?",
              praise: "Mm. Farms needed fewer hands, and factories needed more. That is the link. Well done.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.5
      {
        id: "5.5",
        title: "The Green Revolution",
        objective: "Explain the technologies of the Green Revolution and evaluate its positive and negative consequences for people and the environment in the developing world.",
        beats: [
          {
            say: "The Green Revolution spread high-yield seeds, chemical fertilizer, pesticides, irrigation, and machinery to developing countries. It began in Mexico in the 1940s with Norman Borlaug's wheat. In the 1960s it reached India, Pakistan, and the Philippines.",
            board: [
              { type: "term", term: "Green Revolution", def: "From the 1940s: the spread of high-yield seed varieties, chemical fertilizers and pesticides, irrigation, and mechanization to the developing world." },
              { type: "callout", text: "Norman Borlaug: high-yield, disease-resistant dwarf wheat (Mexico → India & Pakistan, 1960s). IR8 'miracle rice' (Philippines, 1966).", tone: "example" },
            ],
          },
          {
            say: "The results were huge. Grain yields in Mexico and South Asia doubled or more, and India went from fearing famine to feeding itself. ...Mm. Many millions of people did not go hungry because of it.",
            board: [
              { type: "heading", text: "Positive consequences" },
              { type: "bullets", items: ["Grain yields doubled or tripled", "Famine averted in South Asia; India self-sufficient in grain by the 1970s", "Cheaper food supported a growing population"] },
            ],
          },
          {
            say: "But there were costs. Chemicals polluted water, irrigation drained aquifers and salted soils, and a few seed varieties replaced many. Seeds and fertilizer cost money, so wealthier farmers gained the most, and poorer ones often fell into debt.",
            board: [
              { type: "heading", text: "Negative consequences" },
              { type: "bullets", items: ["Environment: fertilizer runoff, pesticide pollution, aquifer depletion, soil salinization", "Biodiversity loss: monocultures of a few varieties", "Society: costly inputs → debt; larger farms benefit most"] },
            ],
          },
          {
            say: "It worked least in sub-Saharan Africa. Its staple crops, like sorghum, millet, and cassava, got less research, and many farms lacked irrigation and roads. On a free response, name the technology and its exact effect. Not just good or bad.",
            board: [
              { type: "callout", text: "Limited reach in sub-Saharan Africa: staple crops less researched, little irrigation, weak infrastructure.", tone: "warn" },
              { type: "callout", text: "FRQ tip: pair a specific technology with a specific effect (e.g., irrigation → aquifer depletion).", tone: "tip" },
            ],
          },
          {
            say: "Careful. The question asks for a cost, and only the environmental kind.",
            board: [
              { type: "heading", text: "Check: evaluate the Green Revolution" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which of the following is a NEGATIVE environmental consequence of the Green Revolution?",
                options: ["Higher grain yields per hectare in South Asia", "Reduced risk of famine in India", "Lower food prices in Mexico", "Depletion of groundwater from expanded irrigation"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the negative environmental consequence.",
              expect: { choice: 3 },
              hint: "...Three of these are benefits. Which one harms the land or water?",
              praise: "Correct. The wells ran deeper every year. You weighed both sides, like a strategist.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.6
      {
        id: "5.6",
        title: "Agricultural Production Regions",
        objective: "Explain how subsistence and commercial practices, climate, and land costs under bid-rent theory define agricultural production regions.",
        beats: [
          {
            say: "Production regions are defined first by purpose. Subsistence farmers grow food mainly to feed their own families. Commercial farmers grow it to sell, often one crop over huge areas, with machines and chemicals. Many regions mix both.",
            board: [
              { type: "term", term: "Subsistence agriculture", def: "Growing food mainly for the farmer's household or community, with little surplus to sell." },
              { type: "term", term: "Commercial agriculture", def: "Growing crops and livestock for sale off the farm, often as monocultures with machinery and chemical inputs." },
            ],
          },
          {
            say: "Climate draws the rest of the map. Wet tropics support shifting cultivation and plantations. Dry lands support herding and ranching. Monsoon Asia grows intensive wet rice, and Mediterranean climates grow grapes, olives, and citrus.",
            board: [
              { type: "bullets", items: ["Tropical wet: shifting cultivation; plantations (coffee, bananas, palm oil)", "Arid / semi-arid: pastoral nomadism, ranching", "Monsoon Asia: intensive subsistence wet rice", "Mediterranean: grapes, olives, citrus", "Humid mid-latitude: mixed crop & livestock, dairy, grain"] },
            ],
          },
          {
            say: "Land cost matters too. Bid-rent theory says land near the market costs the most, because access is worth money. So farmers near cities use land intensively, squeezing every acre. Far away, land is cheap, so extensive uses like ranching make sense.",
            board: [
              { type: "term", term: "Bid-rent theory", def: "Land value and rent fall with distance from the market; users who gain most from access outbid others for nearby land." },
              { type: "callout", text: "Expensive land near markets → intensive farming. Cheap, distant land → extensive farming.", tone: "tip" },
            ],
          },
          {
            say: "You can see it near any big city. Vegetable farms and dairies crowd close, while cattle ranches spread across the cheap, dry West. Now try one.",
            board: [
              { type: "callout", text: "New Jersey, 'the Garden State,' grows vegetables for New York City; cattle ranches spread across the cheap, dry West.", tone: "example" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Farmland next to a growing city sells for ten times the price of farmland 300 kilometers away. According to bid-rent theory, which land use is most likely on the land closest to the city?",
                options: ["Cattle ranching", "Nomadic herding", "Shifting cultivation", "Market gardening"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the land use bid-rent theory predicts closest to the city.",
              expect: { choice: 3 },
              hint: "...Expensive land has to earn a lot per acre. Which use is the most intensive?",
              praise: "Mm. Market gardening. High rent, high output. You understand the trade-off.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.7
      {
        id: "5.7",
        title: "Spatial Organization of Agriculture",
        objective: "Explain how agribusiness, economies of scale, and commodity chains shape where and how food is produced.",
        beats: [
          {
            say: "Modern farming is a business system, not just a field. Agribusiness links seeds, chemicals, farming, processing, shipping, and the grocery store. In the United States, the number of farms fell from almost seven million in 1935 to under two million today, while the average farm grew much larger.",
            board: [
              { type: "term", term: "Agribusiness", def: "The integrated system of food production, from seeds and chemicals to farming, processing, distribution, and retail, often run by large corporations." },
              { type: "callout", text: "Large commercial operations are replacing small family farms: US farms 6.8 million (1935) → ~1.9 million (2022).", tone: "example" },
            ],
          },
          {
            say: "Why bigger? Economies of scale. A combine harvester costs the same whether it works a hundred acres or ten thousand, so big farms produce each bushel more cheaply. Technology has also raised the carrying capacity of the land, how many people it can feed.",
            board: [
              { type: "term", term: "Economies of scale", def: "Cost per unit falls as production grows: machinery and bulk inputs spread across more output." },
              { type: "callout", text: "Technology (machinery, GPS-guided equipment, biotech) increases economies of scale and the land's carrying capacity.", tone: "tip" },
            ],
          },
          {
            say: "A commodity chain follows a product from seed to plate. Coffee grows in Ethiopia or Colombia, gets roasted and packaged in Europe or North America, and is sold in a café near you. Each link adds value, and most of the profit goes to the later links, not the farmer.",
            board: [
              { type: "term", term: "Commodity chain", def: "The linked network of processes, firms, and places that turn a raw product into a consumer good." },
              { type: "steps", items: ["Inputs (seed, fertilizer, machinery)", "Farm production", "Processing", "Distribution & shipping", "Retail → consumer"] },
            ],
          },
          {
            say: "Big firms often own several links at once. That is vertical integration. In American poultry, one company may own the chicks, the feed, the processing plant, and the brand, while farmers raise the birds under contract.",
            board: [
              { type: "term", term: "Vertical integration", def: "One company controlling multiple stages of a commodity chain." },
              { type: "callout", text: "Contract farming: US poultry growers raise company-owned birds to company specifications.", tone: "example" },
            ],
          },
          {
            say: "Now explain a pattern. Think about cost per unit.",
            board: [
              { type: "heading", text: "Check: explain the trend" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which factor best explains why the number of US farms has fallen while the average farm size has grown?",
                options: ["Rising bid-rent on remote rural land", "Economies of scale from mechanization and technology", "The spread of shifting cultivation", "Expansion of township and range surveys"],
                answer: 1,
              },
            },
            check: {
              prompt: "Choose the best explanation for fewer, larger farms.",
              expect: { choice: 1 },
              hint: "...If one machine can work far more land, what happens to the cost of each bushel on a big farm?",
              praise: "Correct. Economies of scale. Bigger farms, cheaper bushels. ...That made me happy.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.8
      {
        id: "5.8",
        title: "Von Thünen Model",
        objective: "Describe how the von Thünen model uses transportation cost and distance from the market to explain rural land use, and identify its limits.",
        beats: [
          {
            say: "Johann Heinrich von Thünen was a German landowner and economist. In 1826 he imagined an isolated state, a flat, uniform plain with one market city in the middle. Each farmer chooses the crop that earns the most after paying to haul it to market. The result is rings.",
            board: [
              { type: "term", term: "Von Thünen model (1826)", def: "Rural land use forms rings around a single market city, based on transportation cost and land rent." },
              { type: "bullets", items: ["Isolated state with one market city", "Flat, uniform land (isotropic plain)", "Farmers maximize profit; transport cost rises with distance"] },
            ],
            widget: { type: "vonThunen", props: {} },
          },
          {
            say: "The first ring, closest to the city, is market gardening and dairy. Milk and fresh vegetables spoil quickly, and there was no refrigeration then. So they had to be grown near the market, on the most expensive land.",
            board: [
              { type: "term", term: "Ring 1: Market gardening & dairy", def: "Perishable, high-value products (milk, vegetables, fruit) that must reach market fast; worth the costly land." },
            ],
            widget: { type: "vonThunen", props: { highlight: "dairy" } },
          },
          {
            say: "...Mm. This is the ring students miss. The second ring is forest. Cities then burned wood for heat and cooking, and wood is heavy and bulky. Hauling it far was too expensive, so the forest stayed close.",
            board: [
              { type: "term", term: "Ring 2: Forest", def: "Firewood and timber: heavy, bulky, needed daily, and costly to transport." },
              { type: "callout", text: "Common trap: forest is ring 2, not the outer ring.", tone: "warn" },
            ],
            widget: { type: "vonThunen", props: { highlight: "forest" } },
          },
          {
            say: "The third ring is grain, which stores well and is cheaper to ship. The fourth is ranching, because animals can walk to market and need lots of cheap land. Today, trucks and refrigeration stretch the rings, even across oceans. But the trade-off between land cost and transport cost still shapes farming.",
            board: [
              { type: "bullets", items: ["Ring 3: Grain & field crops (light, store well, cheap to ship)", "Ring 4: Ranching (animals walk to market; needs cheap land)", "Beyond: wilderness, too far to profit"] },
              { type: "callout", text: "Limits: refrigeration, rail, trucks, and global trade distort the rings, but the logic still applies at regional and global scales.", tone: "tip" },
            ],
            widget: { type: "vonThunen", props: { highlight: "grain" } },
          },
          {
            say: "Your turn. Think about what a city in 1826 needed every day, and how hard it was to move.",
            board: [
              { type: "heading", text: "Check: place the land use" },
            ],
            widget: { type: "vonThunen", props: {} },
            check: {
              prompt: "Click the ring where von Thünen placed the product that is heavy, bulky, and burned daily in the city for fuel.",
              expect: { ring: "forest" },
              hint: "...It is not the outer ring. Heavy things cost the most to haul, so they stay close to the city.",
              praise: "Mm. The forest ring. Heavy wood stays close. Most people miss that one.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.9
      {
        id: "5.9",
        title: "The Global System of Agriculture",
        objective: "Explain the interdependence among regions of agricultural production and consumption in the global food system.",
        beats: [
          {
            say: "Your breakfast is a world map. Bananas from Ecuador, coffee from Brazil or Vietnam, winter grapes from Chile. Food today moves through a global supply chain, and regions depend on each other.",
            board: [
              { type: "term", term: "Global supply chain", def: "Worldwide networks that move food from where it is grown, to where it is processed, to where it is eaten." },
              { type: "callout", text: "A winter supermarket: grapes from Chile, avocados from Mexico, bananas from Ecuador, coffee from Brazil.", tone: "example" },
            ],
          },
          {
            say: "Some countries depend heavily on one or two export crops. Côte d'Ivoire and Ghana grow more than half of the world's cocoa. When prices crash, or disease hits the trees, the whole economy suffers. Many of these patterns began as colonial plantation economies.",
            board: [
              { type: "term", term: "Export commodity dependence", def: "Relying on one or a few agricultural exports for most export income; vulnerable to price swings, weather, and pests." },
              { type: "bullets", items: ["Côte d'Ivoire & Ghana: cocoa", "Ethiopia: coffee", "Often a legacy of colonial plantation economies"] },
            ],
          },
          {
            say: "Who sells food to whom depends on three things. Political relationships, like trade deals and sanctions. Infrastructure, like ports, roads, and cold storage. And patterns of world trade, including subsidies rich countries pay their own farmers.",
            board: [
              { type: "bullets", items: ["Political relationships: trade agreements (e.g., USMCA), tariffs, sanctions, embargoes", "Infrastructure: ports, roads, storage, refrigerated 'cold chains'", "Patterns of world trade: US & EU farm subsidies lower world prices for competitors"] },
            ],
          },
          {
            say: "...Mm. Japan is a good example. It grows only about thirty-eight percent of the calories its people eat, so it imports wheat, soybeans, and corn. Interdependence goes both ways. Exporters need buyers, and importers need suppliers.",
            board: [
              { type: "callout", text: "Japan's calorie-based food self-sufficiency is ~38%; it imports wheat, soybeans, and corn from the US, Canada, Australia, and Brazil.", tone: "example" },
              { type: "callout", text: "2022: war closed Ukraine's Black Sea ports → world wheat prices spiked.", tone: "warn" },
            ],
          },
          {
            say: "Read the stimulus. Then ask what it shows about the whole system, not just one country.",
            board: [
              { type: "heading", text: "Check: the global system" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "In 2022, the war in Ukraine disrupted Black Sea grain shipments, and bread prices rose sharply in Egypt and Lebanon. This best illustrates which feature of the global agricultural system?",
                options: ["Interdependence between regions of production and consumption", "Economies of scale on large commercial farms", "Bid-rent theory near urban markets", "Export dependence on a single cash crop"],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the feature of the global food system this illustrates.",
              expect: { choice: 0 },
              hint: "...A problem in one region changed prices in another. What connects them?",
              praise: "Correct. Interdependence. A war on one coast reached tables far away. You see the whole map now.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.10
      {
        id: "5.10",
        title: "Consequences of Agricultural Practices",
        objective: "Explain how agricultural practices alter the landscape and cause environmental effects such as pollution, land cover change, desertification, and soil salinization.",
        beats: [
          {
            say: "Every farming system leaves marks on the land. Terraces carve steps into mountainsides, like the rice terraces of the Philippines. Irrigation turns deserts green, and draining wetlands turns marsh into fields. Slash-and-burn and herding change land cover too.",
            board: [
              { type: "heading", text: "Practices that alter the landscape" },
              { type: "bullets", items: ["Slash-and-burn & shifting cultivation", "Terracing", "Irrigation", "Draining wetlands", "Deforestation", "Pastoral nomadism"] },
            ],
          },
          {
            say: "Deforestation is the biggest land cover change. In the Amazon, most cleared land becomes cattle pasture or soy fields. In Indonesia and Malaysia, rainforest becomes palm oil plantations. Even slash-and-burn can be sustainable, but only when fields rest long enough to recover.",
            board: [
              { type: "term", term: "Deforestation", def: "Clearing forest for crops or pasture. e.g., the Amazon (cattle, soy); Indonesia & Malaysia (palm oil)." },
              { type: "callout", text: "Slash-and-burn is sustainable at low density with long fallow periods; population pressure shortens fallow and degrades soil.", tone: "tip" },
            ],
          },
          {
            say: "In dry lands, there are two dangers. Desertification is semi-arid land degrading into desert, often from overgrazing and overplowing, as in Africa's Sahel. Salinization happens when irrigation water evaporates and leaves salt behind, until the soil can no longer grow crops.",
            board: [
              { type: "term", term: "Desertification", def: "Degradation of semi-arid land into desert-like conditions from overgrazing, overcultivation, deforestation, and drought. e.g., the Sahel." },
              { type: "term", term: "Soil salinization", def: "Salt buildup when irrigation water evaporates in dry climates. e.g., the Aral Sea basin, ancient Mesopotamia." },
            ],
          },
          {
            say: "Fertilizer that washes downstream feeds algae, which use up the oxygen in the water. The Mississippi carries it to a dead zone in the Gulf of Mexico. Farmers fight back with conservation, like contour plowing, no-till farming, and crop rotation.",
            board: [
              { type: "bullets", items: ["Pollution: fertilizer runoff → algal blooms & dead zones", "Pesticides and animal waste from feedlots contaminate water", "Conservation: contour plowing, no-till, crop rotation, buffer strips, terracing"] },
            ],
          },
          {
            say: "One more scenario. Look at what the stimulus says about water, and what it left behind.",
            board: [
              { type: "heading", text: "Check: identify the consequence" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Farmers in an arid region irrigate heavily for decades. Yields begin to fall as a white crust forms on the surface of their fields. Which consequence is most likely occurring?",
                options: ["Desertification from overgrazing", "Deforestation", "Soil salinization", "Draining of wetlands"],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the consequence that matches the stimulus.",
              expect: { choice: 2 },
              hint: "...Irrigation water evaporates in the heat. What stays behind on the soil?",
              praise: "Mm. Salinization. The water left, and the salt stayed. Quiet as the forest, and just as sharp.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.11
      {
        id: "5.11",
        title: "Challenges of Contemporary Agriculture",
        objective: "Explain debates over biotechnology, GMOs, and aquaculture, the food-choice movements that shape production, and challenges of food access such as food deserts.",
        beats: [
          {
            say: "Biotechnology changes crops at the level of their genes. Genetically modified corn can resist insects, and some soybeans tolerate herbicides. Supporters point to higher yields and less insecticide. Critics worry about lost biodiversity, resistant weeds, and companies owning seed patents.",
            board: [
              { type: "term", term: "Genetically modified organism (GMO)", def: "An organism whose DNA has been altered in a lab. e.g., insect-resistant Bt corn, herbicide-tolerant soybeans, Golden Rice." },
              { type: "bullets", items: ["For: higher yields, less insecticide, drought tolerance, added nutrients", "Against: reduced biodiversity, herbicide-resistant weeds, corporate seed patents, consumer concerns"] },
            ],
          },
          {
            say: "Aquaculture is fish farming, and it now supplies more than half of the seafood people eat. It eases pressure on wild fisheries, but crowded pens can pollute water and spread disease. The exam frames all of these innovations as debates, over sustainability, soil and water use, biodiversity, and chemical use.",
            board: [
              { type: "term", term: "Aquaculture", def: "Farming fish, shellfish, or seaweed in ponds, tanks, or ocean pens; now more than half of aquatic food for people." },
              { type: "callout", text: "Debates: sustainability, soil & water use, biodiversity loss, heavy fertilizer & pesticide use.", tone: "tip" },
            ],
          },
          {
            say: "Consumers push back with their choices. Organic farming avoids synthetic chemicals. Local food and community supported agriculture shorten the commodity chain. Fair trade tries to pay farmers in poorer countries a fairer price.",
            board: [
              { type: "bullets", items: ["Organic farming: no synthetic fertilizers or pesticides", "Local food & community-supported agriculture (CSA): buy shares of a nearby farm's harvest", "Urban farming: rooftops, community gardens", "Fair trade: better prices for producers in developing countries", "Value-added specialty crops & dietary shifts (e.g., plant-based diets)"] },
            ],
          },
          {
            say: "The world grows enough calories, yet hunger remains. Often the problem is access. Food insecurity means lacking reliable access to enough nutritious food. A food desert is an area with no affordable, healthy grocery store nearby, often a low-income neighborhood.",
            board: [
              { type: "term", term: "Food desert", def: "An area, often low-income urban or rural, with poor access to affordable, nutritious food." },
              { type: "bullets", items: ["Food insecurity: no reliable access to enough nutritious food", "Distribution problems, adverse weather, conflict", "Farmland lost to suburbanization"] },
            ],
          },
          {
            say: "Now solve a problem, not just name it. Which option actually reaches the people who need food?",
            board: [
              { type: "heading", text: "Check: address the challenge" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A low-income urban neighborhood has many convenience stores and fast-food outlets but no full-service supermarket within a mile. Which action would most directly address this challenge?",
                options: ["Opening a full-service grocery store or urban farm in the neighborhood", "Expanding aquaculture in coastal waters", "Increasing exports of a single cash crop", "Converting nearby farmland to suburban housing"],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the action that most directly addresses this food desert.",
              expect: { choice: 0 },
              hint: "...The problem is access, right here. Which option puts healthy food inside the neighborhood?",
              praise: "Correct. Bring the food to the people. ...An AP reader would nod at that.",
            },
          },
        ],
      },

      // ───────────────────────────────────────────── 5.12
      {
        id: "5.12",
        title: "Women in Agriculture",
        objective: "Explain geographic variations in women's roles in food production, distribution, and consumption.",
        beats: [
          {
            say: "Women grow a huge share of the world's food. In developing countries, they make up about forty-three percent of farm labor, and more in parts of Africa and Asia. Much of that work is unpaid family labor, and women usually prepare the family's food too.",
            board: [
              { type: "bullets", items: ["~43% of the agricultural labor force in developing countries (FAO)", "Planting, weeding, harvesting, processing, marketing", "Often unpaid family labor; primary role in household food preparation"] },
            ],
          },
          {
            say: "Roles change with place and type of farming. In much of sub-Saharan Africa, women do most of the subsistence work, and West African market women dominate local food trade. When farming turns commercial and mechanized, men often take over the cash crops and machines. In the United States, women are now about a third of farm producers.",
            board: [
              { type: "bullets", items: ["Sub-Saharan Africa & South/Southeast Asia: large share of subsistence farming and food processing", "West Africa: women traders run many local food markets", "Commercial, mechanized farming: men often control cash crops", "USA: women ~36% of farm producers (2022 Census of Agriculture)"] },
              { type: "callout", text: "Women's roles vary by place AND by type of production.", tone: "tip" },
            ],
          },
          {
            say: "Women face real barriers. They hold fewer than one in five farmland titles worldwide, and get less access to credit, fertilizer, and training. The FAO estimates that equal access could raise yields on women's farms by twenty to thirty percent. ...Mm. That is a lot of food left unharvested.",
            board: [
              { type: "bullets", items: ["Fewer than 20% of agricultural landholders are women (FAO)", "Less access to credit, seeds, fertilizer, training, and extension services", "Inheritance laws and customs often favor sons"] },
              { type: "callout", text: "FAO: equal access to resources could raise yields on women's farms 20–30%.", tone: "example" },
            ],
          },
          {
            say: "Change often starts small. Microcredit lenders, like Bangladesh's Grameen Bank, make small loans mostly to women, for seeds, tools, or a cow. Cooperatives let women share equipment and sell together. When women farmers earn more, families tend to spend more on food and schooling.",
            board: [
              { type: "term", term: "Microcredit", def: "Small loans to people without access to banks. e.g., Grameen Bank (Bangladesh), which lends mostly to women." },
              { type: "bullets", items: ["Women's cooperatives: shared tools, joint marketing", "Land-title reforms in some countries"] },
            ],
          },
          {
            say: "Last question of the unit. Look for the explanation that is about access, not ability.",
            board: [
              { type: "heading", text: "Check: explain the gap" },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which of the following best explains why crop yields on women-managed farms in many developing countries are often lower than on men-managed farms?",
                options: ["Women-managed farms are usually located in colder climates", "Women-managed farms rely more heavily on mechanization", "Women mainly grow commercial export crops", "Women have less access to land, credit, fertilizer, and training"],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the best explanation for the yield gap.",
              expect: { choice: 3 },
              hint: "...The FAO says the gap closes when resources are equal. So what is unequal?",
              praise: "Mm. Access, not ability. ...You finished the unit. Want some matcha soda? As a reward.",
            },
          },
        ],
      },
    ],
  },
]
