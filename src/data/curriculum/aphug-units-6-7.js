// Miku Nakano · AP Human Geography course
// Unit 6: Cities and Urban Land-Use Patterns and Processes (CED topics 6.1–6.11)
// Unit 7: Industrial and Economic Development Patterns and Processes (CED topics 7.1–7.8)
// Lesson ids match the CED topic numbers. Never renumber or reuse an id once shipped.

export default [
  {
    unit: 6,
    title: "Cities and Urban Land-Use Patterns and Processes",
    lessons: [
      {
        id: "6.1",
        title: "The Origin and Influences of Urbanization",
        objective: "Explain how site and situation shape where cities begin and grow, and how transportation, communication, migration, economic development, and government policy drive urbanization and suburbanization.",
        beats: [
          {
            say: "...Mm. Every city answers two questions. Site is the ground it sits on: the river, the hill, the harbor. Situation is where it sits relative to everything else: the roads, the trade routes, the neighbors.",
            board: [
              { type: "heading", text: "Two questions every city answers" },
              { type: "term", term: "Site", def: "The physical characteristics of the place itself: landforms, water supply, soil, climate, defensibility." },
              { type: "term", term: "Situation", def: "The place's location relative to other places: trade routes, rivers, resources, other cities." },
            ],
          },
          {
            say: "Sengoku lords picked castle sites for defense, on high ground beside water. Osaka Castle stood on a plateau above a river delta. That is site. But Osaka grew into a great merchant city because of its situation, at the head of the Inland Sea, linked by river to Kyoto.",
            board: [
              { type: "callout", tone: "example", text: "Osaka — site: a defensible plateau above a river delta. Situation: head of the Seto Inland Sea, linked by the Yodo River to Kyoto." },
              { type: "callout", tone: "example", text: "Singapore — site: a small island with a deep natural harbor. Situation: on the Strait of Malacca, a chokepoint between the Indian Ocean and the South China Sea." },
            ],
          },
          {
            say: "The first cities appeared where farming produced a surplus, in river valleys like Mesopotamia, the Nile, the Indus, and the Huang He. Extra food freed people for other work: priests, soldiers, traders, rulers. So cities became centers of trade, religion, and government.",
            board: [
              { type: "steps", items: ["Agricultural surplus", "Specialized, non-farm jobs", "Social classes and leaders", "Centers of trade, religion, government"] },
              { type: "callout", tone: "tip", text: "Early urban hearths: Mesopotamia, Nile Valley, Indus Valley, Huang He, Mesoamerica, Andes." },
            ],
          },
          {
            say: "What makes cities grow today? Better transportation and communication stretch a city's reach. Rural to urban migration and new jobs pull people in. And policy matters. In the United States after 1945, highways and federally backed mortgages pulled families out to the suburbs.",
            board: [
              { type: "bullets", items: ["Transportation: streetcars, cars, the 1956 Interstate Highway Act", "Communication: telephone and internet let offices decentralize", "Migration: rural push factors, urban pull factors", "Economic development: factory and service jobs", "Government policy: FHA/VA mortgages, highways, zoning"] },
              { type: "term", term: "Suburbanization", def: "Movement of people and businesses from the central city to the surrounding area." },
            ],
          },
          {
            say: "A site almost never changes. A situation changes all the time. A new railroad or a rerouted trade route can make a city rise or fall on the very same ground.",
            board: [
              { type: "callout", tone: "tip", text: "Site rarely changes. Situation changes with technology, trade, and politics." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "For centuries a river port thrived as its region's trading center. After a new railroad bypassed it, the port's trade and population declined, even though the river and harbor were unchanged. This best illustrates a change in the port's",
                options: [
                  "site, because its physical setting lost value",
                  "situation, because its connections to other places changed",
                  "primacy, because it became the country's largest city",
                  "threshold, because fewer services were needed",
                ],
                answer: 1,
              },
            },
            check: {
              prompt: "Pick the answer that best explains the port's decline.",
              expect: { choice: 1 },
              hint: "...The river did not move. What changed was how the port connected to other places.",
              praise: "Mm. Situation. The ground stayed the same, the connections changed. Well read.",
            },
          },
        ],
      },
      {
        id: "6.2",
        title: "Cities Across the World",
        objective: "Describe the global distribution of megacities and metacities and explain how suburbanization and decentralization create new urban forms such as edge cities, boomburbs, and exurbs.",
        beats: [
          {
            say: "More than half of all people now live in urban areas. Core countries urbanized long ago, so most new urban growth is happening in periphery and semi-periphery countries, especially in Africa and South Asia. ...The map of big cities is moving.",
            board: [
              { type: "term", term: "Urbanization", def: "The process by which a growing share of a population lives in cities, through migration and natural increase." },
              { type: "callout", tone: "tip", text: "Percent urban is highest in core countries. Urban GROWTH is fastest in periphery and semi-periphery countries." },
            ],
          },
          {
            say: "A megacity has more than ten million people. A metacity has more than twenty million. Tokyo, Delhi, Shanghai, and Dhaka are metacities. Most megacities and metacities today are in semi-periphery and periphery countries, not in the core.",
            board: [
              { type: "term", term: "Megacity", def: "Urban area with more than 10 million people (e.g., Lagos, Istanbul, Lima, Paris)." },
              { type: "term", term: "Metacity", def: "Urban area with more than 20 million people (e.g., Tokyo, Delhi, Shanghai, Dhaka, São Paulo)." },
              { type: "callout", tone: "example", text: "Fast-growing megacities such as Lagos, Kinshasa, and Karachi often have large informal settlements." },
            ],
          },
          {
            say: "In the United States, cars, highways, and cheap mortgages moved people outward after World War Two. Shopping malls and offices followed them. That is decentralization. When growth spreads at low density over farmland, we call it sprawl.",
            board: [
              { type: "term", term: "Decentralization", def: "Movement of people, jobs, and services out of the central city toward the suburbs." },
              { type: "term", term: "Urban sprawl", def: "Low-density, car-dependent development spreading over rural land at the urban edge." },
            ],
          },
          {
            say: "Decentralization made new kinds of places. An edge city is a cluster of offices and shopping at a highway junction, far from downtown, like Tysons in Virginia. A boomburb is a fast-growing suburb of more than a hundred thousand people, like Mesa in Arizona. An exurb is semi-rural land beyond the suburbs, where people still commute to the city.",
            board: [
              { type: "term", term: "Edge city", def: "Concentration of office space and retail outside the old CBD, usually at a highway interchange (Tysons, VA)." },
              { type: "term", term: "Boomburb", def: "Rapidly growing suburban city of 100,000+ that is not the region's core city (Mesa, AZ; Henderson, NV)." },
              { type: "term", term: "Exurb", def: "Low-density, semi-rural area beyond the suburbs whose residents commute into the metro area." },
            ],
          },
          {
            say: "...Mm. These three are easy to mix up. Edge city means jobs and shopping. Boomburb means a big, fast-growing suburb. Exurb means thin, semi-rural commuter land.",
            board: [
              { type: "callout", tone: "tip", text: "Edge city = jobs/retail node. Boomburb = 100k+ fast-growing suburb. Exurb = semi-rural commuter belt." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A suburb near Phoenix grew from about 20,000 residents to more than 500,000 in a few decades. It remains mostly residential and car-oriented, and it is not the region's central city. This place is best classified as",
                options: ["an edge city", "a primate city", "a boomburb", "an exurb"],
                answer: 2,
              },
            },
            check: {
              prompt: "Classify the suburb.",
              expect: { choice: 2 },
              hint: "...Count the people. Half a million is too many for semi-rural land, and it is mostly homes, not offices.",
              praise: "Correct. A boomburb. Big, fast, still suburban. You see the difference now.",
            },
          },
        ],
      },
      {
        id: "6.3",
        title: "Cities and Globalization",
        objective: "Explain how world cities function as command centers of the global economy and how networks link them at the top of the urban hierarchy.",
        beats: [
          {
            say: "Some cities matter far beyond their own country. A world city is a command center for the global economy. Decisions made in London, New York, or Tokyo move money and jobs everywhere.",
            board: [
              { type: "term", term: "World city (global city)", def: "A major node of the global economy, with financial markets, corporate headquarters, and worldwide political and cultural influence." },
              { type: "callout", tone: "example", text: "Top-tier world cities: London, New York, Tokyo, Paris." },
            ],
          },
          {
            say: "What makes a world city? Stock exchanges and banks. Headquarters of transnational corporations, and the lawyers and accountants who serve them. Hub airports, media, and international organizations. Its power comes from connections, not just size.",
            board: [
              { type: "bullets", items: ["Financial centers: stock exchanges, banks, insurance", "Headquarters of transnational corporations", "Producer services: law, accounting, advertising", "Hub airports and communication links", "Political and cultural power: UN, media, universities, the arts"] },
            ],
          },
          {
            say: "World cities sit at the top of the urban hierarchy, above national and regional cities and small towns. They are tied to each other through networks of money, flights, and information. Sometimes London is more connected to New York than to a small English town.",
            board: [
              { type: "steps", items: ["Leading world cities (London, New York)", "Other major world cities (Tokyo, Paris, Singapore, Shanghai)", "National and regional cities", "Small cities and towns"] },
              { type: "term", term: "Time-space compression", def: "The shrinking importance of distance as transportation and communication technology connect places faster." },
            ],
          },
          {
            say: "Be careful. A megacity is defined by population. A world city is defined by its function and its connections. Globalization is adding new world cities in the semi-periphery, like Shanghai, Mumbai, and Dubai.",
            board: [
              { type: "callout", tone: "tip", text: "Megacity = POPULATION. World city = FUNCTION + CONNECTIONS. Lagos is a megacity but not a top-tier world city." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which characteristic most clearly distinguishes a world city from a megacity?",
                options: [
                  "A population of more than 10 million",
                  "Location in a semi-periphery country",
                  "Very high population density",
                  "Its role as a node of global finance, corporate control, and culture",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the defining feature of a world city.",
              expect: { choice: 3 },
              hint: "...Size is a trap here. Think about what world cities do, and who they connect to.",
              praise: "Mm. Function, not size. You read the question carefully.",
            },
          },
        ],
      },
      {
        id: "6.4",
        title: "The Size and Distribution of Cities",
        objective: "Apply the rank-size rule, the primate city concept, the gravity model, and Christaller's central place theory to explain the size and spacing of cities.",
        beats: [
          {
            say: "The rank-size rule says the second largest city has half the population of the largest. The third has one third, the fourth one quarter. Countries close to this pattern, like the United States, have many large cities and no single one dominates.",
            board: [
              { type: "term", term: "Rank-size rule", def: "The nth-largest city has 1/n the population of the largest city." },
              { type: "formula", text: "Pₙ = P₁ ÷ n" },
              { type: "callout", tone: "example", text: "Largest city 12 million → 2nd ≈ 6 million → 3rd ≈ 4 million → 4th ≈ 3 million." },
            ],
          },
          {
            say: "A primate city breaks that rule. It is more than twice as big as the next city, and it dominates the country's economy, politics, and culture. Bangkok, Lima, Paris, and London are classic examples. ...Mm. Many were colonial or royal capitals, where power and investment piled up.",
            board: [
              { type: "term", term: "Primate city", def: "A country's largest city, more than twice the size of the next largest, dominating its economic, political, and cultural life." },
              { type: "callout", tone: "example", text: "Bangkok, Thailand · Lima, Peru · Paris, France · London, UK" },
            ],
          },
          {
            say: "The gravity model predicts how much two places interact. Multiply their populations, then divide by the distance between them, squared. Big cities close together interact the most: more trade, more migration, more travel.",
            board: [
              { type: "formula", text: "Interaction = (P₁ × P₂) ÷ d²" },
              { type: "callout", tone: "tip", text: "Larger populations increase interaction; distance decreases it (distance decay). Some textbooks divide by d instead of d²." },
            ],
          },
          {
            say: "Christaller's central place theory explains how settlements are spaced. Each central place serves a market area around it. Threshold is the minimum number of customers a service needs to survive. Range is the farthest distance people will travel to get it.",
            board: [
              { type: "term", term: "Threshold", def: "Minimum number of people needed to support a good or service." },
              { type: "term", term: "Range", def: "Maximum distance people will travel to obtain a good or service." },
              { type: "callout", tone: "tip", text: "Market areas form hexagons (no gaps, no overlaps). Few large cities offer high-order goods; many small towns offer low-order goods." },
            ],
          },
          {
            say: "High order goods, like a specialist hospital, need a large threshold, and people travel far for them. Low order goods, like gas or groceries, need only a few nearby customers. That is why there are many small towns and only a few large cities.",
            board: [
              { type: "steps", items: ["Hamlet: low-order goods (gas, groceries)", "Town", "City", "Regional city: high-order goods (specialist hospital, stadium)"] },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A specialized cancer hospital is found only in a large regional city, while gas stations are found in every small town. According to central place theory, the hospital",
                options: [
                  "has a larger threshold and a larger range than a gas station",
                  "has a smaller threshold and a smaller range than a gas station",
                  "has a larger threshold but a smaller range than a gas station",
                  "follows the rank-size rule rather than central place theory",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Explain the hospital's location with central place theory.",
              expect: { choice: 0 },
              hint: "...How many people must a specialist hospital serve to stay open? And how far will a patient travel to reach one?",
              praise: "Correct. Large threshold, large range. That is why only big central places have them.",
            },
          },
        ],
      },
      {
        id: "6.5",
        title: "The Internal Structure of Cities",
        objective: "Explain how the concentric zone, sector, multiple nuclei, galactic city, and regional urban models describe the internal structure of cities, and identify their limits.",
        beats: [
          {
            say: "Now we look inside the city. Ernest Burgess drew 1920s Chicago as rings around the central business district. Next to it, a zone of transition with factories, poor housing, and new immigrants. Then working class homes, middle class homes, and commuters at the edge, so wealth rises as you move outward.",
            board: [
              { type: "heading", text: "Burgess concentric zone model (1925, Chicago)" },
              { type: "steps", items: ["CBD", "Zone of transition", "Working-class homes", "Middle-class residences", "Commuter zone"] },
              { type: "callout", tone: "tip", text: "Invasion and succession: new immigrant groups move into the inner zones; established groups move outward as they gain wealth." },
            ],
            widget: { type: "urbanModels", props: { model: "burgess" } },
          },
          {
            say: "Homer Hoyt saw cities growing in wedges, not rings. Sectors follow transportation lines outward from the center. Industry runs along the railroad or river, with low income housing beside it. The wealthy sector follows the most attractive corridor: high ground, a lakeshore, a grand avenue.",
            board: [
              { type: "term", term: "Hoyt sector model (1939)", def: "The city grows in wedge-shaped sectors along transportation corridors radiating from the CBD." },
              { type: "callout", tone: "tip", text: "High-income sector extends outward along an amenity corridor; low-income housing lies beside the industrial sector." },
            ],
            widget: { type: "urbanModels", props: { model: "hoyt" } },
          },
          {
            say: "Chauncy Harris and Edward Ullman said a city has many centers, not one. In the car era, nodes grow around an airport, a university, a port, or an outlying business district. Similar activities cluster together, and activities that clash, like heavy industry and wealthy housing, stay apart.",
            board: [
              { type: "term", term: "Harris and Ullman multiple nuclei model (1945)", def: "The city develops around several separate nuclei, not only the CBD." },
              { type: "bullets", items: ["Similar activities cluster (universities, industrial parks)", "Incompatible uses repel: heavy industry is far from high-class housing", "Fits car-dependent cities with several business districts"] },
            ],
            widget: { type: "urbanModels", props: { model: "harris-ullman" } },
          },
          {
            say: "The galactic city, also called the peripheral model, is the modern American metropolis. The old central city is surrounded by a beltway. Suburbs, office parks, and edge cities grow at the highway interchanges, and many people rarely need downtown at all.",
            board: [
              { type: "term", term: "Galactic city / peripheral model (Chauncy Harris)", def: "A central city surrounded by a ring road (beltway); suburbs, office parks, and edge cities grow at its interchanges." },
              { type: "callout", tone: "warn", text: "Limit of all four U.S. models: built from North American cities; they ignore culture, colonial history, and planning elsewhere." },
            ],
            widget: { type: "urbanModels", props: { model: "galactic" } },
          },
          {
            say: "Cities elsewhere follow other logic. In Southeast Asia, McGee found the old colonial port at the center instead of a classic business district, with separate zones for government, foreign merchants, and squatters. In sub-Saharan Africa, de Blij found three business districts: a colonial one, a traditional one, and an open air market zone.",
            board: [
              { type: "term", term: "McGee model (Southeast Asia, 1967)", def: "Colonial port zone at the core; separate Western and alien (often Chinese) commercial zones and a government zone; suburbs, squatter areas, market gardening, and industrial estates at the edge." },
              { type: "term", term: "de Blij model (sub-Saharan Africa)", def: "Three CBDs (colonial, traditional, market zone); ethnic and mixed neighborhoods; mining and manufacturing zone; squatter settlements at the edge." },
            ],
          },
          {
            say: "In Latin America, Griffin and Ford drew a business district with a commercial spine running out from it, lined by an elite residential sector. Wealth falls as you move away from the center, except along the spine, and squatter settlements ring the edge. ...It reminds me of a castle town, where the highest ranking samurai lived closest to the castle.",
            board: [
              { type: "term", term: "Griffin-Ford model (Latin America, 1980)", def: "CBD + commercial spine with an elite residential sector; zone of maturity → zone of in situ accretion → periphery of squatter settlements; disamenity zones of extreme poverty." },
              { type: "callout", tone: "tip", text: "The spine is a Hoyt-style sector. Elites live near the center, the reverse of Burgess." },
            ],
            widget: { type: "urbanModels", props: { model: "hoyt" } },
            check: {
              prompt: "The elite spine borrows an idea from Hoyt. On the Hoyt model, click the zone it resembles.",
              expect: { model: "hoyt", zone: "high" },
              hint: "...Find the wedge that runs outward along the best corridor, far from the factories.",
              praise: "Mm. The high income sector. Griffin and Ford borrowed Hoyt's wedge. You see how the models connect.",
            },
          },
        ],
      },
      {
        id: "6.6",
        title: "Density and Land Use",
        objective: "Explain how bid-rent theory and the era of development produce low-, medium-, and high-density residential land use across a city.",
        beats: [
          {
            say: "Why do towers rise downtown while big lawns spread at the edge? Bid-rent theory. Land near the center is the most accessible, so it is the most expensive. The user who profits most from that access outbids everyone else.",
            board: [
              { type: "term", term: "Bid-rent theory", def: "Land users compete for sites; rent and land value fall with distance from the CBD, so each zone goes to the use willing to pay the most there." },
              { type: "steps", items: ["Commercial / retail (CBD)", "Industrial", "Residential", "Agriculture"] },
            ],
          },
          {
            say: "Expensive land gets used intensively. Near the center, builders go up: apartment towers, high density. Farther out come rowhouses and townhouses, medium density. At the edge, single family houses on big lots, low density.",
            board: [
              { type: "bullets", items: ["High density: mid-rise and high-rise apartments near the CBD", "Medium density: rowhouses, townhouses, duplexes, low-rise apartments", "Low density: detached single-family homes on large lots in suburbs and exurbs"] },
              { type: "callout", tone: "tip", text: "Density usually declines with distance from the CBD: the density gradient." },
            ],
          },
          {
            say: "Density also records when a place was built. Old walking cities were packed tight. Streetcar suburbs lined up rowhouses along the tracks. After 1945 the car let homes spread out, and zoning laws often required single family lots.",
            board: [
              { type: "steps", items: ["Walking city: dense, mixed uses", "Streetcar suburbs: rowhouses along transit lines", "Automobile suburbs: detached homes, cul-de-sacs"] },
              { type: "term", term: "Zoning", def: "Laws that set which land uses are allowed where, and at what density." },
            ],
          },
          {
            say: "...Mm. This is old logic. Von Thünen used the same bid-rent idea for farms in 1826, with the market town at the center. Try the transport slider. Expensive transport pulls every use toward the center, and cheap transport lets the rings stretch outward, the way cars stretched our suburbs.",
            board: [
              { type: "callout", tone: "example", text: "Von Thünen (1826) is bid-rent for farms: the use that earns the most per acre near the market wins that land." },
              { type: "formula", text: "Location rent = Y(p − c) − Y·f·d" },
            ],
            widget: { type: "vonThunen", props: {} },
          },
          {
            say: "Look at the first ring outside the market. It goes to the farm use that can pay the most for land right next to the town. Its products are perishable, heavy, and valuable per acre.",
            board: [
              { type: "callout", tone: "tip", text: "Same rule in the city: the CBD goes to offices and shops because they gain the most from accessibility." },
            ],
            check: {
              prompt: "Click the farm ring that outbids every other farm use for the land right beside the market.",
              expect: { ring: "dairy" },
              hint: "...Which product spoils fastest? Fresh milk could not travel far before refrigeration.",
              praise: "Correct. Dairy and market gardening win the inner ring, just as offices win the CBD. Same bid-rent, two scales.",
            },
          },
        ],
      },
      {
        id: "6.7",
        title: "Infrastructure",
        objective: "Explain how the location and quality of infrastructure shape patterns of economic and social development within cities.",
        beats: [
          {
            say: "Infrastructure is the skeleton of a city. Roads, transit, water and sewer pipes, electricity, internet. Where it is built, and how good it is, decides where people and businesses can thrive.",
            board: [
              { type: "term", term: "Infrastructure", def: "The physical and organizational systems a city needs to function: transportation, water and sewer, power, communications, schools, hospitals." },
            ],
          },
          {
            say: "Transportation shapes growth most visibly. Highways pulled homes and offices to the suburbs, and edge cities grew at the interchanges. Rail and subway stations attract dense development around them, which we call transit oriented development.",
            board: [
              { type: "bullets", items: ["Highways → suburbs and edge cities at interchanges", "Rail and metro stations → dense, mixed-use nodes (transit-oriented development)", "Airports and ports → logistics and industrial zones", "Fiber and power grids → offices and data centers"] },
            ],
          },
          {
            say: "...Tokugawa Ieyasu understood this. He set up post stations along the Tōkaidō road, and towns grew at each one. Infrastructure can also divide. Many American urban highways were built straight through Black neighborhoods, splitting them apart.",
            board: [
              { type: "callout", tone: "example", text: "Tōkaidō post towns: settlements grew at the stations Tokugawa Ieyasu set up along the Edo–Kyoto road from 1601." },
              { type: "callout", tone: "warn", text: "Many U.S. urban highways were routed through Black and immigrant neighborhoods, displacing residents and cutting communities apart." },
            ],
          },
          {
            say: "In many fast-growing cities, people arrive faster than pipes and power lines can be built. Informal settlements at the edge often lack clean water, sewers, and paved roads. Unequal infrastructure becomes unequal health, jobs, and schooling.",
            board: [
              { type: "bullets", items: ["Good infrastructure → investment, jobs, higher property values", "Missing infrastructure → disease, long commutes, few jobs", "Uneven infrastructure reinforces segregation and inequality"] },
            ],
          },
          {
            say: "So infrastructure is never neutral. Where a city builds, it invests. Where it does not, it leaves people behind.",
            board: [
              { type: "callout", tone: "tip", text: "FRQ habit: link infrastructure to a specific outcome, such as jobs, health, segregation, or property values." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Many informal settlements on the edges of rapidly growing cities in periphery countries lack piped water, sewers, and paved roads. Which explanation is best supported?",
                options: [
                  "Residents choose not to connect to city services",
                  "Bid-rent theory makes peripheral land the most expensive in the city",
                  "Rapid in-migration has outpaced the government's capacity to build infrastructure, and the settlements often lack legal recognition",
                  "Strict zoning laws require all peripheral land to remain agricultural",
                ],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the best explanation.",
              expect: { choice: 2 },
              hint: "...Compare two speeds: how fast people arrive, and how fast pipes are laid. Then ask whether the city even counts those homes as legal.",
              praise: "Mm. Growth outran infrastructure, and without legal title, services rarely come. That is a complete answer.",
            },
          },
        ],
      },
      {
        id: "6.8",
        title: "Urban Sustainability",
        objective: "Explain how smart growth, new urbanism, mixed-use development, greenbelts, and slow-growth policies aim to make cities sustainable, and evaluate their benefits and drawbacks.",
        beats: [
          {
            say: "Sprawl uses a lot of land, a lot of fuel, and a lot of driving. Urban sustainability asks how a city can grow without eating its farmland or its future. Planners answer with design and with zoning.",
            board: [
              { type: "term", term: "Smart growth", def: "Policies that steer growth into compact, walkable, transit-served areas and protect open space and farmland." },
            ],
          },
          {
            say: "New urbanism designs neighborhoods like old towns. Narrow streets, front porches, shops within walking distance, and different kinds of housing side by side. Mixed use zoning lets homes, offices, and stores share the same block.",
            board: [
              { type: "term", term: "New urbanism", def: "Design movement for walkable, compact neighborhoods with mixed uses, varied housing, and public spaces (Seaside, Florida)." },
              { type: "term", term: "Mixed-use development", def: "Residential, commercial, and office uses combined in the same building or block." },
              { type: "term", term: "Transit-oriented development", def: "Dense, walkable development built around a transit station." },
            ],
          },
          {
            say: "A greenbelt is a ring of protected open land around a city. London built one in the middle of the twentieth century to stop sprawl. Slow growth cities, like Portland in Oregon, draw an urban growth boundary and keep new building inside it.",
            board: [
              { type: "term", term: "Greenbelt", def: "A ring of parks, farms, or undeveloped land around a city where development is restricted (London)." },
              { type: "term", term: "Slow-growth city / urban growth boundary", def: "A line limiting where urban development may occur (Portland, Oregon, since 1979)." },
            ],
          },
          {
            say: "The praise: less sprawl, more walking and transit, more housing choices, and protected farmland. The criticism: limiting land can push housing prices up. Rising prices can displace poorer residents, and redevelopment can erase a neighborhood's historic character.",
            board: [
              { type: "heading", text: "Praise vs. criticism" },
              { type: "bullets", items: ["+ Less sprawl; farmland and open space preserved", "+ Walkability and transit; less car dependence", "+ More diverse housing; livable neighborhoods"] },
              { type: "bullets", items: ["− Higher land and housing costs", "− Displacement and de facto segregation", "− Loss of historic or cultural character"] },
            ],
          },
          {
            say: "...On the exam, never only praise a policy. Name a benefit, then a cost, and say who pays it.",
            board: [
              { type: "callout", tone: "tip", text: "FRQ habit: one benefit + one drawback + who is affected." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Critics argue that a city's urban growth boundary has made housing less affordable. Which reasoning best supports this criticism?",
                options: [
                  "Restricting the supply of developable land while demand grows raises land and housing prices inside the boundary",
                  "Growth boundaries lower land values in the central city",
                  "Growth boundaries require all new housing to be built in the CBD",
                  "Growth boundaries increase the land available for suburban sprawl",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Pick the reasoning that supports the critics.",
              expect: { choice: 0 },
              hint: "...Supply and demand. What happens to price when land is limited but more people want to live there?",
              praise: "Correct. Less land, same demand, higher prices. You argued it like an economist.",
            },
          },
        ],
      },
      {
        id: "6.9",
        title: "Urban Data",
        objective: "Explain how quantitative data such as the census and qualitative data such as interviews and field studies are used to analyze changes in urban areas.",
        beats: [
          {
            say: "To study a city, we need evidence. Quantitative data is numbers. In the United States, the census counts everyone every ten years, and the American Community Survey updates estimates every year.",
            board: [
              { type: "term", term: "Quantitative data", def: "Numerical data: population, age, race and ethnicity, income, rent, commute time, density." },
              { type: "term", term: "Census tract", def: "Small statistical area (about 4,000 people) used to map change at the neighborhood scale." },
            ],
          },
          {
            say: "Census data shows how a city's population changes in size and composition. Map it by tract, and patterns appear: rising rents, an aging population, a new immigrant neighborhood. ...Mm. Numbers show what changed, and where.",
            board: [
              { type: "bullets", items: ["Population growth or decline", "Changing age, race, ethnicity, and income", "Housing values, rents, vacancy", "Commuting patterns"] },
              { type: "callout", tone: "example", text: "Mapping median rent by census tract from 2010 to 2020 can reveal where gentrification is happening." },
            ],
          },
          {
            say: "Qualitative data is not numbers. Interviews, field observations, photographs, oral histories. It tells us how people feel about change, what a place means to them, and why they stay or leave.",
            board: [
              { type: "term", term: "Qualitative data", def: "Non-numerical data such as interviews, field studies, photographs, and oral histories that reveal attitudes and perceptions of urban change." },
            ],
          },
          {
            say: "Each kind has limits. The census can undercount homeless and undocumented people, and it ages between counts. Interviews capture only a few voices. Strong studies use both.",
            board: [
              { type: "callout", tone: "warn", text: "Limits: the census undercounts some groups and is taken only every 10 years; tract averages hide variation; interviews may not be representative." },
              { type: "callout", tone: "tip", text: "Mixed methods: the census shows rents rose; interviews show how long-time residents experienced it." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A geographer wants to understand how long-time residents feel about new luxury apartments being built in their neighborhood. Which source of data would be most useful?",
                options: [
                  "Decennial census population counts by tract",
                  "Satellite images of new building footprints",
                  "Median household income by census tract",
                  "Recorded interviews with long-time residents",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Choose the best data source for this research question.",
              expect: { choice: 3 },
              hint: "...The question asks how people feel. Can a count or a satellite image tell you that?",
              praise: "Mm. Interviews. Feelings are qualitative. Always match the data to the question.",
            },
          },
        ],
      },
      {
        id: "6.10",
        title: "Challenges of Urban Changes",
        objective: "Explain how redlining, blockbusting, filtering, gentrification, and squatter settlements create economic and social challenges in cities, and describe responses to them.",
        beats: [
          {
            say: "Some urban patterns were made on purpose. In the 1930s, federal maps outlined Black and immigrant neighborhoods in red as hazardous, and banks refused to lend there. That is redlining. Blockbusting was when real estate agents frightened white owners into selling cheaply, then resold the homes to Black families at high prices.",
            board: [
              { type: "term", term: "Redlining", def: "Refusing loans or insurance in neighborhoods marked 'hazardous' (often Black and immigrant areas) on 1930s HOLC maps; caused disinvestment." },
              { type: "term", term: "Blockbusting", def: "Agents stoke fear of racial change so white owners sell cheaply, then resell to Black families at inflated prices." },
              { type: "callout", tone: "warn", text: "Result: segregation, disinvestment, and wealth gaps that persist today." },
            ],
          },
          {
            say: "As houses age and wealthier owners leave, homes filter down to poorer residents, often split into rentals. When jobs vanish, whole areas can be abandoned, like parts of Detroit. In Latin American cities, the poorest disamenity zones lack even basic services.",
            board: [
              { type: "term", term: "Filtering", def: "Housing passes to lower-income occupants as it ages and higher-income residents move away." },
              { type: "term", term: "Zone of abandonment", def: "Area left largely empty after job loss and population decline (parts of Detroit)." },
              { type: "term", term: "Disamenity zone", def: "The poorest areas of Latin American cities, often on steep slopes or floodplains, with few services." },
            ],
          },
          {
            say: "Gentrification runs the other way. Higher income residents move into a lower income neighborhood, renovate, and property values rise. The area gains investment and tax revenue, but rising rents can push out long time residents, and the neighborhood's culture can be lost.",
            board: [
              { type: "term", term: "Gentrification", def: "Higher-income people move into a lower-income area, renovating housing and raising property values and rents." },
              { type: "bullets", items: ["+ Investment, renovated housing, larger tax base", "− Displacement of long-time, often minority, residents", "− Loss of affordable housing and cultural character"] },
            ],
          },
          {
            say: "In many periphery cities, migrants build homes on land they do not own. These squatter settlements include the favelas of Brazil. Responses include inclusionary zoning, which requires affordable units in new buildings, and local food movements in neighborhoods without grocery stores.",
            board: [
              { type: "term", term: "Squatter settlement", def: "Informal housing on land the residents do not legally own, usually lacking water, sewers, and electricity (favelas in Brazil, barriadas in Peru)." },
              { type: "bullets", items: ["Inclusionary zoning: new developments must include affordable units", "Local food movements: community gardens and farmers markets in food deserts", "Upgrading informal settlements: water, sanitation, land titles"] },
            ],
          },
          {
            say: "...Mm. When you see a policy on the exam, ask what problem it answers. Then ask who benefits.",
            board: [
              { type: "callout", tone: "tip", text: "Problem → policy: displacement → inclusionary zoning; food desert → local food movement; no services → settlement upgrading." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A city requires that 20 percent of the units in every new apartment building be rented below market rate. This policy most directly responds to which urban challenge?",
                options: [
                  "Blockbusting by real estate agents",
                  "Displacement and loss of affordable housing as neighborhoods gentrify",
                  "Suburban sprawl onto farmland",
                  "Deindustrialization of the central city",
                ],
                answer: 1,
              },
            },
            check: {
              prompt: "Name the challenge this policy targets.",
              expect: { choice: 1 },
              hint: "...Below-market rents. Who is struggling to afford the neighborhood as new buildings go up?",
              praise: "Correct. Inclusionary zoning fights displacement. Problem, then policy. Good.",
            },
          },
        ],
      },
      {
        id: "6.11",
        title: "Challenges of Urban Sustainability",
        objective: "Explain the environmental challenges cities face and evaluate responses such as regional planning, brownfield remediation, urban growth boundaries, and farmland protection.",
        beats: [
          {
            say: "Cities face environmental limits too. Sprawl eats farmland and forces driving. Sanitation systems strain as populations grow, air and water quality suffer, and cities use huge amounts of energy.",
            board: [
              { type: "bullets", items: ["Suburban sprawl: lost farmland, car dependence", "Sanitation: sewage, garbage, clean water", "Air and water pollution", "Energy use and climate change"] },
              { type: "term", term: "Ecological footprint", def: "The area of land and water needed to supply a population's resources and absorb its wastes." },
            ],
          },
          {
            say: "Climate change hits cities hard. Pavement and buildings absorb heat, so cities are warmer than the countryside around them. And many big cities sit on coasts and deltas, exposed to rising seas and flooding.",
            board: [
              { type: "term", term: "Urban heat island", def: "Cities are warmer than nearby rural areas because pavement and buildings absorb heat and vegetation is scarce." },
              { type: "callout", tone: "example", text: "Coastal cities at high flood risk: Jakarta, Dhaka, Lagos, Miami." },
            ],
          },
          {
            say: "Responses work at different scales. Regional planning coordinates the many governments of a metro area. Brownfield remediation cleans polluted old industrial land so it can be reused. Urban growth boundaries and farmland protection keep the edge from spreading.",
            board: [
              { type: "term", term: "Brownfield", def: "Abandoned or underused industrial or commercial land with real or suspected contamination." },
              { type: "bullets", items: ["Regional planning across city and suburban governments", "Remediation and redevelopment of brownfields", "Urban growth boundaries", "Farmland protection policies (e.g., buying development rights)"] },
            ],
          },
          {
            say: "...Mm. Reusing old land inside the city is usually greener than building on new land at the edge. That new land is called a greenfield site.",
            board: [
              { type: "term", term: "Greenfield site", def: "Previously undeveloped land, often farmland, at the urban edge." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A city removes contaminated soil from an abandoned rail yard and redevelops the site with apartments and a park. Which sustainability goal does this most directly advance?",
                options: [
                  "Raising the city's rank in the urban hierarchy",
                  "Expanding low-density development at the urban edge",
                  "Increasing residents' ecological footprint through new construction",
                  "Reusing already developed land, which reduces pressure to build on farmland at the edge",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Identify the goal this project advances.",
              expect: { choice: 3 },
              hint: "...This land was used before. If the city builds here, where does it not have to build?",
              praise: "Correct. Brownfield remediation. Build inside, and the farmland at the edge survives.",
            },
          },
        ],
      },
    ],
  },
  {
    unit: 7,
    title: "Industrial and Economic Development Patterns and Processes",
    lessons: [
      {
        id: "7.1",
        title: "The Industrial Revolution",
        objective: "Explain how the Industrial Revolution began in Great Britain, diffused outward, changed societies and food supply, and increased demand for raw materials that fueled colonialism and imperialism.",
        beats: [
          {
            say: "The Industrial Revolution began in Great Britain in the late seventeen hundreds. Britain had coal and iron, money from trade and colonies, and workers freed from farms by the Second Agricultural Revolution. Then came the steam engine and machines for spinning and weaving cotton.",
            board: [
              { type: "heading", text: "Hearth: Great Britain, late 1700s" },
              { type: "bullets", items: ["Coal and iron ore deposits", "Capital from trade and colonies", "Surplus labor from the Second Agricultural Revolution", "New technology: steam engine (Watt), mechanized textiles"] },
            ],
          },
          {
            say: "Industry diffused first to Belgium, France, and Germany, along their coalfields, then to the United States. Japan industrialized quickly after the Meiji Restoration in 1868, long after my Sengoku warlords. In the twentieth century it spread to East Asia, Latin America, and beyond.",
            board: [
              { type: "steps", items: ["Great Britain (late 1700s)", "Western Europe: Belgium, France, Germany (1800s)", "United States, Russia, Japan after 1868", "East Asia, Latin America, South Asia (1900s)"] },
            ],
          },
          {
            say: "Industry changed how people lived. Workers crowded into factory cities, so urbanization surged. A new middle class grew. And city workers needed food, which pushed farming to become more mechanized and commercial.",
            board: [
              { type: "bullets", items: ["Rapid urbanization and crowded tenements", "Growth of a middle class and a factory working class", "Pollution, child labor, long hours, then labor reforms", "Larger, mechanized food supply for urban workers"] },
            ],
          },
          {
            say: "Factories were hungry. They needed raw materials like cotton, rubber, and copper, and new markets to sell to. Industrial powers took colonies to secure both, and colonies were made to export raw materials and buy manufactured goods.",
            board: [
              { type: "steps", items: ["Factories need raw materials and markets", "Colonies supply cotton, rubber, minerals", "Colonies buy manufactured goods", "Core–periphery inequality persists"] },
              { type: "callout", tone: "tip", text: "This link between industry and imperialism sets up world-system and dependency theory in 7.5." },
            ],
          },
          {
            say: "...So the Industrial Revolution was not only machines. It reorganized the world into places that make goods and places that supply them.",
            board: [
              { type: "term", term: "Imperialism", def: "A state's control over territory and people beyond its borders, often to secure resources and markets." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which factor most directly explains why industrialization intensified European colonization of Africa and Asia in the 1800s?",
                options: [
                  "Europe's population was declining and needed new settlers",
                  "Colonies already had more advanced factories than Europe",
                  "Factories needed reliable sources of raw materials and new markets for manufactured goods",
                  "Industrialization reduced Europe's need for imported resources",
                ],
                answer: 2,
              },
            },
            check: {
              prompt: "Pick the most direct cause.",
              expect: { choice: 2 },
              hint: "...What did the factories consume, and where did they sell what they made?",
              praise: "Mm. Raw materials and markets. Industry and empire marched together.",
            },
          },
        ],
      },
      {
        id: "7.2",
        title: "Economic Sectors and Patterns",
        objective: "Explain how employment shifts across the five economic sectors with development, and how Weber's least cost theory, bulk-gaining and bulk-reducing industries, and agglomeration explain industrial location.",
        beats: [
          {
            say: "Every job belongs to a sector. Primary jobs take resources from the earth, and secondary jobs process and manufacture. Tertiary jobs provide services. Quaternary jobs handle information and knowledge, and quinary jobs make the highest level decisions.",
            board: [
              { type: "bullets", items: ["Primary: extracting resources (farming, mining, fishing, forestry)", "Secondary: manufacturing and processing", "Tertiary: services (retail, transportation, health care)", "Quaternary: information and knowledge (finance, research, IT)", "Quinary: top-level decision-making (executives, senior officials)"] },
            ],
          },
          {
            say: "As a country develops, workers shift sectors. Periphery countries have most workers in the primary sector. Industrializing countries grow their secondary sector, and core countries employ most people in tertiary and quaternary jobs.",
            board: [
              { type: "steps", items: ["Periphery: most workers in primary", "Semi-periphery: secondary grows", "Core: most workers in tertiary + quaternary"] },
              { type: "callout", tone: "tip", text: "The sectoral structure of employment is also a measure of development (7.3)." },
            ],
          },
          {
            say: "Alfred Weber asked where a factory should go. His answer, least cost theory: wherever total costs are lowest. Transportation matters most, then labor, then agglomeration, the savings from clustering near other firms.",
            board: [
              { type: "term", term: "Weber's least cost theory (1909)", def: "A firm locates where the combined costs of transportation, labor, and agglomeration are lowest; transportation matters most." },
              { type: "term", term: "Agglomeration", def: "Clustering of firms to share infrastructure, skilled labor, suppliers, and ideas, which lowers costs (Silicon Valley)." },
              { type: "callout", tone: "example", text: "Locational triangle: two raw-material sources and the market. The factory sits where moving everything costs least." },
            ],
          },
          {
            say: "If the product weighs less than its inputs, like smelted copper, the industry is bulk reducing, so it locates near the raw materials. If the product gains weight or bulk, like bottled soda, it is bulk gaining, so it locates near the market. Break of bulk points, such as ports, are also attractive.",
            board: [
              { type: "term", term: "Bulk-reducing industry", def: "Output weighs less than inputs (copper smelting, lumber milling, raw-sugar milling) → locate near raw materials." },
              { type: "term", term: "Bulk-gaining industry", def: "Output weighs more or is bulkier than inputs (soft-drink bottling, brewing, auto assembly) → locate near the market." },
              { type: "term", term: "Break-of-bulk point", def: "A place where goods transfer between modes of transport, such as a port." },
            ],
          },
          {
            say: "...Mm. Ask one question first. Does the product get heavier or lighter as it is made? That tells you where the factory goes.",
            board: [
              { type: "steps", items: ["Heavier or bulkier output → near the market", "Lighter output → near the raw materials"] },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "A soft-drink company ships concentrated syrup to bottling plants in many metropolitan areas, where water is added and the product is bottled. According to Weber's least cost theory, the plants locate this way because bottling is",
                options: [
                  "a bulk-reducing activity, so it locates near raw materials",
                  "a bulk-gaining activity, so it locates near the market",
                  "a quaternary activity, so it locates near universities",
                  "a labor-intensive activity, so it locates where wages are lowest",
                ],
                answer: 1,
              },
            },
            check: {
              prompt: "Explain the location of the bottling plants.",
              expect: { choice: 1 },
              hint: "...Water is heavy. Does the product get heavier or lighter at the plant?",
              praise: "Correct. Bulk gaining, so stay close to the customers. You think like Weber now.",
            },
          },
        ],
      },
      {
        id: "7.3",
        title: "Measures of Development",
        objective: "Explain how GDP, GNP, GNI per capita, sectoral structure, income distribution, the Gini coefficient, social indicators, the HDI, and the GII are used to compare levels of development.",
        beats: [
          {
            say: "Start with money. Gross domestic product is the value of all goods and services produced inside a country in a year. Gross national income also counts income its residents and companies earn abroad. Divide by population, per capita, to compare countries fairly.",
            board: [
              { type: "term", term: "GDP", def: "Total value of goods and services produced within a country's borders in a year." },
              { type: "term", term: "GNP / GNI", def: "Output or income of a country's residents and firms, including earnings from abroad; income sent home by foreign-owned firms is excluded." },
              { type: "formula", text: "Per capita = total ÷ population   (PPP adjusts for local prices)" },
            ],
          },
          {
            say: "Averages can hide a lot. The sectoral structure shows what work people do, and income distribution shows who gets the money. The Gini coefficient runs from zero, perfect equality, to one, where one person has everything.",
            board: [
              { type: "term", term: "Gini coefficient", def: "Measures income inequality: 0 = perfect equality, 1 = perfect inequality (South Africa ≈ 0.63; Nordic countries ≈ 0.25–0.30)." },
              { type: "callout", tone: "warn", text: "GDP misses the informal economy (street vendors, unpaid household work) and says nothing about who receives the income." },
            ],
          },
          {
            say: "Development is not only income. We also look at fertility rates, infant mortality, literacy, and access to health care. The United Nations combines health, education, and income into the Human Development Index, from zero to one, where higher means more developed.",
            board: [
              { type: "bullets", items: ["Fertility rate and infant mortality rate", "Literacy and years of schooling", "Access to health care and life expectancy"] },
              { type: "term", term: "Human Development Index (HDI)", def: "UN composite of life expectancy, education (mean and expected years of schooling), and GNI per capita (PPP); 0–1, higher = more developed." },
            ],
          },
          {
            say: "The Gender Inequality Index measures gaps between women and men in reproductive health, empowerment, and the labor market. ...Mm. Careful. For this index, a higher number means more inequality, the opposite direction from the HDI.",
            board: [
              { type: "term", term: "Gender Inequality Index (GII)", def: "UN measure of gender gaps in reproductive health (maternal mortality, adolescent births), empowerment (parliament seats, secondary education), and labor-force participation." },
              { type: "callout", tone: "warn", text: "GII: higher = MORE inequality. HDI: higher = MORE development." },
            ],
          },
          {
            say: "Now use the Gini coefficient. Two countries can have the same average income and very different lives.",
            board: [
              { type: "callout", tone: "tip", text: "Match the measure to the question: output (GDP), income (GNI per capita), distribution (Gini), well-being (HDI), gender (GII)." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Two countries have nearly identical GNI per capita. Country A has a Gini coefficient of 0.60, and Country B has a Gini coefficient of 0.27. Which conclusion is best supported by these data?",
                options: [
                  "Country A has a higher Human Development Index",
                  "Country B has a larger informal economy",
                  "Country A has a higher total GDP",
                  "Income is distributed more unequally in Country A",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Pick the conclusion the data support.",
              expect: { choice: 3 },
              hint: "...The Gini measures only one thing: how evenly income is shared.",
              praise: "Correct. Same average, different shares. And you did not claim more than the data show.",
            },
          },
        ],
      },
      {
        id: "7.4",
        title: "Women and Economic Development",
        objective: "Explain how women's economic roles change with development and how microloans, wage gaps, and gaps in political representation affect women's opportunities.",
        beats: [
          {
            say: "As countries develop, women's roles in the economy change. More girls finish school, more women work for wages in the formal economy, and fertility falls. In many periphery countries much of women's work is unpaid or informal, so GDP never counts it.",
            board: [
              { type: "steps", items: ["More schooling for girls", "More women in paid, formal jobs", "Later marriage, lower fertility", "More income and political voice"] },
              { type: "callout", tone: "tip", text: "Unit 2 link: female education and employment help move countries into Stage 3 of the DTM." },
            ],
          },
          {
            say: "But gaps remain, even in core countries. Women are often paid less than men for comparable work, and they hold only about a quarter of the seats in national parliaments worldwide. Many jobs are still divided by gender.",
            board: [
              { type: "bullets", items: ["Gender wage gap: lower average pay for women", "Under-representation in legislatures and top management", "Occupational segregation and the 'double burden' of paid and unpaid work"] },
            ],
          },
          {
            say: "Microloans are small loans to people who cannot get credit from banks, often women with no property to offer as collateral. Muhammad Yunus built the Grameen Bank in Bangladesh on this idea, and they shared the Nobel Peace Prize in 2006. A small loan can buy a sewing machine and start a business.",
            board: [
              { type: "term", term: "Microloans (microcredit)", def: "Small loans to low-income borrowers without collateral, often women, to start or expand small businesses." },
              { type: "callout", tone: "example", text: "Grameen Bank, Bangladesh: founded by Muhammad Yunus; Nobel Peace Prize 2006." },
              { type: "callout", tone: "warn", text: "Critiques: high interest rates, risk of debt, and small businesses that rarely scale up." },
            ],
          },
          {
            say: "Globalization also hired women in huge numbers. Garment factories in Bangladesh and maquiladoras in Mexico employ many young women. The jobs bring income and independence, but wages are low and conditions can be dangerous.",
            board: [
              { type: "callout", tone: "example", text: "Bangladesh's garment industry employs millions, a large share of them women; the 2013 Rana Plaza collapse killed more than 1,100 workers." },
            ],
          },
          {
            say: "...Mm. Think about who has collateral, and where money goes after it is earned. That is the logic behind microloans.",
            board: [
              { type: "term", term: "Collateral", def: "Property a borrower pledges to a lender to secure a loan." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Microloan programs such as Bangladesh's Grameen Bank lend mostly to women. Which reasoning best explains this choice?",
                options: [
                  "Women often lack access to formal credit, and their earnings tend to be spent on household needs and children's education",
                  "Women usually hold land titles that can be used as collateral",
                  "Microloans are designed to finance large export factories",
                  "Women in rural areas are less likely than men to start small businesses",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the best explanation.",
              expect: { choice: 0 },
              hint: "...Banks want collateral. Who usually does not have it? And who spends new income on the family?",
              praise: "Correct. Shut out of banks, and investing in the next generation. That is why the loans go to women.",
            },
          },
        ],
      },
      {
        id: "7.5",
        title: "Theories of Development",
        objective: "Explain and compare Rostow's stages of economic growth, Wallerstein's world-system theory, dependency theory, and commodity dependence as explanations of uneven development.",
        beats: [
          {
            say: "Walt Rostow said every country climbs the same five stages. A traditional society, then the preconditions for take-off, then take-off, the drive to maturity, and finally high mass consumption. It is a ladder, and anyone can climb it.",
            board: [
              { type: "heading", text: "Rostow's stages of economic growth (1960)" },
              { type: "steps", items: ["1 Traditional society", "2 Preconditions for take-off", "3 Take-off", "4 Drive to maturity", "5 Age of high mass consumption"] },
            ],
          },
          {
            say: "...Mm. Critics say the ladder is too simple. Rostow based it on Britain and the United States. It ignores colonial history, and it assumes poor countries can simply copy rich ones.",
            board: [
              { type: "callout", tone: "warn", text: "Critiques of Rostow: Eurocentric; one linear path; ignores colonialism and the global system; assumes every country can grow by exporting at once." },
            ],
          },
          {
            say: "Immanuel Wallerstein saw a single world economy instead. Core countries control capital, technology, and high-value production. The periphery supplies cheap labor and raw materials. The semi-periphery sits between, exploited by the core while exploiting the periphery.",
            board: [
              { type: "term", term: "Core", def: "Wealthy; high-skill, high-wage, capital-intensive production (United States, Germany, Japan)." },
              { type: "term", term: "Semi-periphery", def: "Industrializing; exploited by the core while exploiting the periphery (Brazil, China, India, Mexico)." },
              { type: "term", term: "Periphery", def: "Low wages; raw-material and primary-sector exports; dependent on the core (Chad, Haiti)." },
            ],
          },
          {
            say: "Dependency theory says the periphery is poor because of its relationship with the core, first through colonialism, then through trade that keeps it exporting raw materials. A country that depends on one or two commodities, like copper or cocoa, suffers whenever world prices fall.",
            board: [
              { type: "term", term: "Dependency theory", def: "Underdevelopment results from political and economic relationships with the core, rooted in colonialism, that keep the periphery exporting cheap raw materials." },
              { type: "term", term: "Commodity dependence", def: "An economy relies on a few primary exports, so price swings shake the whole economy (Zambia: copper; Côte d'Ivoire: cocoa; Nigeria: oil)." },
            ],
          },
          {
            say: "Rostow looks inside a country, moving up step by step. Wallerstein and dependency theory look at relationships between countries. Keep that difference clear.",
            board: [
              { type: "callout", tone: "tip", text: "Rostow: internal, linear; any country can rise. Wallerstein: relational, interdependent; moving between tiers is possible but constrained." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which statement best distinguishes Wallerstein's world-system theory from Rostow's stages of economic growth?",
                options: [
                  "Wallerstein argues that every country passes through the same five stages",
                  "Rostow divides the world into core, semi-periphery, and periphery",
                  "Wallerstein explains development through a country's position in an interdependent global economy, while Rostow describes a single linear path every country can follow",
                  "Both theories argue that colonialism had no lasting effect on development",
                ],
                answer: 2,
              },
            },
            check: {
              prompt: "Choose the statement that contrasts the two theories correctly.",
              expect: { choice: 2 },
              hint: "...One model is a ladder. The other is a web. Which one is which?",
              praise: "Mm. A ladder versus a web. You will not mix them up on the exam.",
            },
          },
        ],
      },
      {
        id: "7.6",
        title: "Trade and the World Economy",
        objective: "Explain how complementarity, comparative advantage, neoliberal policies, trade organizations, OPEC, and international debt shape trade and global economic interdependence.",
        beats: [
          {
            say: "Why do countries trade? Complementarity: one place has a surplus of something another place needs. And comparative advantage: a country should specialize in what it gives up the least to produce, even if another country is better at everything.",
            board: [
              { type: "term", term: "Complementarity", def: "When one place has a surplus of a good or resource that another place demands." },
              { type: "term", term: "Comparative advantage", def: "A country gains by specializing in what it produces at a lower opportunity cost than others, then trading." },
            ],
          },
          {
            say: "Since the 1980s, many governments have followed neoliberal policies: lower tariffs, free trade, privatization, and less regulation. They built free trade blocs and the World Trade Organization, which sets trade rules and settles disputes.",
            board: [
              { type: "term", term: "Neoliberalism", def: "Policies that shrink government's economic role: free trade, privatization, deregulation, lower tariffs." },
              { type: "bullets", items: ["WTO (1995): trade rules and dispute settlement", "Regional blocs: EU, USMCA (replaced NAFTA), Mercosur, ASEAN", "Supporters: growth, cheaper goods. Critics: job losses, weaker labor and environmental protections"] },
            ],
          },
          {
            say: "Some countries cooperate to control a commodity. OPEC is a group of oil exporting countries that coordinates production to influence world oil prices. In 1973 its Arab members cut off oil to the United States and others, and prices roughly quadrupled.",
            board: [
              { type: "term", term: "OPEC", def: "Organization of the Petroleum Exporting Countries (e.g., Saudi Arabia, Iran, Venezuela, Nigeria): coordinates oil production to influence prices." },
              { type: "callout", tone: "example", text: "1973 oil embargo: oil prices roughly quadrupled, showing how interdependent the world economy is." },
            ],
          },
          {
            say: "Trade also brings debt. Many periphery countries borrowed from the IMF and the World Bank, and the loans often came with structural adjustment: cut spending, privatize, open markets. Critics say this weakened health care and schools and deepened dependence.",
            board: [
              { type: "term", term: "Structural adjustment", def: "IMF/World Bank loan conditions requiring spending cuts, privatization, and open markets." },
              { type: "callout", tone: "example", text: "Debt relief: the Heavily Indebted Poor Countries (HIPC) initiative (1996) reduced debt for dozens of low-income countries, mostly in Africa." },
            ],
          },
          {
            say: "...Mm. Being better at everything does not mean making everything. Opportunity cost decides.",
            board: [
              { type: "callout", tone: "tip", text: "Absolute advantage = more output from the same resources. Comparative advantage = lower opportunity cost. Trade follows comparative advantage." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Country X can produce both cars and textiles more efficiently than Country Y. Yet Country X exports cars and imports textiles from Country Y. Which concept best explains this pattern?",
                options: ["Absolute advantage", "Comparative advantage", "Commodity dependence", "Break-of-bulk location"],
                answer: 1,
              },
            },
            check: {
              prompt: "Name the concept behind this trade pattern.",
              expect: { choice: 1 },
              hint: "...Country X is better at both. So ask what it gives up to make textiles instead of cars.",
              praise: "Correct. Comparative advantage. Even a strong general sends troops only where they matter most.",
            },
          },
        ],
      },
      {
        id: "7.7",
        title: "Changes as a Result of the World Economy",
        objective: "Explain how outsourcing, deindustrialization, the shift from Fordist to post-Fordist production, and special economic zones, free-trade zones, and maquiladoras reshape where economic activity happens.",
        beats: [
          {
            say: "Globalization changed where things are made. Transnational corporations moved factory work to countries with lower wages. That is outsourcing, and it created a new international division of labor: design and decisions stay in the core, assembly moves to the semi-periphery and periphery.",
            board: [
              { type: "term", term: "Outsourcing", def: "A firm moves production or services to another company or country, often to cut labor costs (offshoring when abroad)." },
              { type: "term", term: "New international division of labor", def: "High-skill, high-pay work concentrates in the core; low-wage manufacturing shifts to semi-periphery and periphery countries." },
            ],
          },
          {
            say: "In the core, factories closed. That is deindustrialization. Cities in the American Rust Belt and northern England lost jobs and people, and their economies shifted toward services. Many communities never fully recovered.",
            board: [
              { type: "term", term: "Deindustrialization", def: "Decline of manufacturing employment in a region as production moves elsewhere or is automated." },
              { type: "callout", tone: "example", text: "Detroit, Pittsburgh, Manchester: job loss and population decline, then a shift to services, health care, and education." },
            ],
          },
          {
            say: "Henry Ford's factories made one standard product in huge numbers on an assembly line. That is Fordism. Post-Fordism is flexible: small batches, many suppliers around the world, and just in time delivery, a system Toyota made famous.",
            board: [
              { type: "term", term: "Fordism", def: "Mass production of standardized goods on assembly lines with large, often unionized workforces; economies of scale." },
              { type: "term", term: "Post-Fordism", def: "Flexible production in small batches for specific markets, with outsourcing and global supply chains." },
              { type: "term", term: "Just-in-time delivery", def: "Parts arrive exactly when needed, cutting inventory costs (Toyota production system)." },
            ],
          },
          {
            say: "Governments compete for this investment. Special economic zones, free trade zones, and export processing zones offer tax breaks, low tariffs, and fewer regulations. Mexico's maquiladoras near the United States border import parts duty free, assemble them, and export the finished goods.",
            board: [
              { type: "term", term: "Special economic zone (SEZ)", def: "Area with special tax and trade rules to attract foreign investment (Shenzhen, China, 1980)." },
              { type: "term", term: "Free-trade zone / export-processing zone", def: "Area where goods can be imported, manufactured, and re-exported without the usual tariffs." },
              { type: "term", term: "Maquiladora", def: "Factory in Mexico, mostly near the U.S. border, that assembles imported parts duty-free for export." },
            ],
          },
          {
            say: "...Mm. Firms also cluster where suppliers and skilled workers already are. That is agglomeration, and governments try to start it by drawing special zones on the map.",
            board: [
              { type: "callout", tone: "tip", text: "Once a zone attracts firms, suppliers and workers follow: agglomeration and economies of scale lower costs for everyone." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Beginning in 1980, Shenzhen grew from a small border town into a major manufacturing city after China's government offered foreign firms tax breaks and relaxed regulations there. This growth is best explained by",
                options: [
                  "deindustrialization of China's interior",
                  "Rostow's traditional society stage",
                  "the spread of Fordist mass production by Chinese state firms alone",
                  "the creation of a special economic zone to attract foreign direct investment",
                ],
                answer: 3,
              },
            },
            check: {
              prompt: "Explain Shenzhen's growth.",
              expect: { choice: 3 },
              hint: "...A government drew a zone and changed the rules inside it. What is that zone called?",
              praise: "Correct. A special economic zone. One line on a map, and a megacity followed.",
            },
          },
        ],
      },
      {
        id: "7.8",
        title: "Sustainable Development",
        objective: "Explain the environmental problems caused by industrialization and evaluate sustainable development approaches, including ecotourism and the UN Sustainable Development Goals.",
        beats: [
          {
            say: "Industrialization brought wealth, and also damage. Resources are being used up, mass consumption creates waste, pollution fills the air and water, and the climate is warming. Sustainable development tries to keep the gains without the damage.",
            board: [
              { type: "bullets", items: ["Natural resource depletion", "Mass consumption and waste", "Air, water, and soil pollution", "Climate change from greenhouse gases"] },
              { type: "term", term: "Sustainable development", def: "Development that meets present needs without compromising future generations' ability to meet theirs (Brundtland Report, 1987)." },
            ],
          },
          {
            say: "Responses work at every scale. Cities build transit and recycle. Countries invest in renewable energy and protect forests. And globally, agreements like the Paris Agreement set targets for cutting emissions.",
            board: [
              { type: "steps", items: ["Local: transit, recycling, green building", "National: renewable energy, emission rules, protected areas", "Global: Paris Agreement (2015), UN goals"] },
            ],
          },
          {
            say: "Ecotourism is travel to natural areas that conserves the environment and supports local people. Costa Rica earns a great deal from visitors to its rainforests and parks. But too many visitors can damage the very places they come to see.",
            board: [
              { type: "term", term: "Ecotourism", def: "Responsible tourism to natural areas that conserves the environment and benefits local communities." },
              { type: "callout", tone: "example", text: "Costa Rica: about a quarter of its land is protected; tourism revenue helps fund conservation." },
              { type: "callout", tone: "warn", text: "Limits: overcrowding, habitat damage, and profits that may flow to foreign-owned companies." },
            ],
          },
          {
            say: "In 2015 the United Nations adopted seventeen Sustainable Development Goals, to be reached by 2030. They include ending poverty and hunger, gender equality, clean water, clean energy, and climate action. They replaced the earlier Millennium Development Goals.",
            board: [
              { type: "term", term: "UN Sustainable Development Goals (SDGs)", def: "17 goals adopted in 2015 for 2030: e.g., no poverty, zero hunger, gender equality, clean water and sanitation, affordable clean energy, climate action." },
              { type: "callout", tone: "tip", text: "The SDGs succeeded the Millennium Development Goals (2000–2015) and apply to ALL countries, not only the periphery." },
            ],
          },
          {
            say: "...Mm. Every strategy has limits. On the exam, judge how well it works, for whom, and at what scale.",
            board: [
              { type: "callout", tone: "tip", text: "Evaluate: who benefits, what is protected, at what scale, and what could go wrong." },
            ],
            widget: {
              type: "boardQuiz",
              props: {
                q: "Which of the following best describes a limitation of ecotourism as a strategy for sustainable development?",
                options: [
                  "Large numbers of visitors can degrade the ecosystems that attract them, and profits may flow to foreign-owned firms rather than local communities",
                  "Ecotourism cannot generate any revenue for local communities",
                  "Ecotourism requires heavy industrialization of protected areas",
                  "Ecotourism is possible only in core countries",
                ],
                answer: 0,
              },
            },
            check: {
              prompt: "Choose the most accurate limitation.",
              expect: { choice: 0 },
              hint: "...Ecotourism does earn money. So what goes wrong when it becomes too popular, and who keeps the profits?",
              praise: "Correct. Ecotourism can protect a forest, or wear it down. ...You judged it fairly.",
            },
          },
        ],
      },
    ],
  },
]
