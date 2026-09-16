export type CityTheme =
  | 'digital-twin'
  | 'iot'
  | 'open-data'
  | 'mobility'
  | 'grid'
  | 'air'
  | 'participation'
  | 'caution'

export type RefCity = {
  id: string
  name: string
  country: string
  themes: CityTheme[]
  headline: string
  works: string[]
  pinellasTake: string
  caution?: string
  sources: { title: string; href: string }[]
}

export const THEMES: { id: CityTheme | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'digital-twin', label: 'Digital twins' },
  { id: 'iot', label: 'IoT' },
  { id: 'open-data', label: 'Open data' },
  { id: 'mobility', label: 'Mobility' },
  { id: 'grid', label: 'Energy / grid' },
  { id: 'air', label: 'Drones / UAM' },
  { id: 'participation', label: 'Participation' },
  { id: 'caution', label: 'Hard lessons' },
]

export const CITIES: RefCity[] = [
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    themes: ['digital-twin', 'mobility', 'iot', 'air'],
    headline: 'Smart Nation + Virtual Singapore — Asia’s usual benchmark, with a cautious sky.',
    works: [
      'IMD Smart City Index: 5th in 2024 (Asia’s top) and 9th in 2025, still first in Asia in that edition’s reporting.',
      'Virtual Singapore is a national-scale digital twin used for planning and test-bedding — often cited alongside Helsinki and Seoul as a complete urban twin.',
      'Intelligent transport and “lamppost as a platform” sensor programs are widely documented; they also draw privacy scrutiny, which Pinellas should treat as a design constraint, not a footnote.',
      'Ministry of Transport (2020s): drones already trialled for ship-to-shore port logistics; eVTOL treated conservatively. CAAS worked with 23 Asia-Pacific authorities on eVTOL/UAS safety reference materials (reported April 2025).',
    ],
    pinellasTake:
      'Copy the digital-twin-as-public-workspace idea, not the surveillance density. For sky lanes: drones and geofenced corridors before passenger flying cars — Singapore’s own sequencing.',
    sources: [
      { title: 'Straits Times on IMD 2024 ranking', href: 'https://www.straitstimes.com/singapore/singapore-is-5th-smartest-city-in-the-world-top-in-asia-global-index' },
      { title: 'IMD Smart City Index 2025 roundup', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
      { title: 'Singapore MOT on drones and eVTOL', href: 'https://www.mot.gov.sg/news-resources/newsroom/response-speech-to-the-adjournment-motion--low-altitude-economy--building-the-flying-car--air-tourism-and-drone-logistics-industry--by-senior-minister-of-state-for-transport-and-national-development-ms-sun-xueling/' },
    ],
  },
  {
    id: 'songdo',
    name: 'Songdo IBD',
    country: 'South Korea (Incheon)',
    themes: ['iot', 'grid', 'caution'],
    headline: 'Purpose-built ubiquitous city: pipes and sensors arrived on schedule; civic life is the hard part.',
    works: [
      'Songdo International Business District was designed as a greenfield smart city with integrated IoT for traffic, energy, water, and waste.',
      'Pneumatic (vacuum) waste collection was built into the district from the start — a cousin of Barcelona’s Olympic Village network and Stockholm Hammarby.',
      'ITU and other case studies describe autonomous-systems ambitions: AI + sensors to run urban services with less human intervention.',
      'Independent reviews often note a gap between infrastructure completeness and everyday occupancy / civic engagement.',
    ],
    pinellasTake:
      'Greenfield ubiquity is not available on a built-out Florida peninsula. Steal the integrated waste/energy/water dashboard idea; do not wait for a new city. Put people on the map first.',
    caution: 'Technology-first cities can feel empty if residents are an afterthought.',
    sources: [
      { title: 'ITU: Autonomous urban systems in Songdo', href: 'https://www.itu.int/epublications/publication/autonomous-urban-systems-in-songdo-republic-of-korea' },
      { title: 'Songdo pneumatic waste (contextual catalogue)', href: 'https://1001smartcities.org/projects/barcelona-pneumatic-waste/' },
    ],
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    themes: ['iot', 'open-data', 'digital-twin', 'participation'],
    headline: 'Open-source sensors (Sentilo), superblocks, and a supercomputer-backed twin.',
    works: [
      'Sentilo: city-sponsored open-source sensor/actuator middleware (IMI, from ~2012), reused by other Catalan administrations — vendor-neutral IoT.',
      'Superilles (superblocks) reclaim streets from cars; a later BSC digital-twin analysis found emissions impact of one scheme was smaller than hoped — a lesson in measuring after you build.',
      'Barcelona Supercomputing Center collaboration: digital twin / 15-minute-city accessibility maps on open data (OSM + municipal).',
      'District-scale pneumatic waste since the 1992 Olympic Village; 2023 inlet upgrades added fill-level sensors. Still not citywide after three decades.',
    ],
    pinellasTake:
      'Open IoT middleware + honest post-hoc measurement. Pinellas can run a Sentilo-like layer on county GIS without buying a closed “smart city OS.”',
    sources: [
      { title: 'Sentilo on Interoperable Europe', href: 'https://interoperable-europe.ec.europa.eu/collection/egovernment/document/sentilo-sensor-and-actuator-platform-smart-cities' },
      { title: 'BSC: 15-minute city digital twin', href: 'https://www.bsc.es/news/bsc-news/barcelona-tests-digital-twin-developed-bsc-if-it-15-minute-city' },
      { title: 'POLITICO on Barcelona’s twin', href: 'https://www.politico.eu/article/barcelona-digital-twin-future-city-planning/' },
    ],
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    themes: ['open-data', 'iot', 'mobility', 'participation'],
    headline: 'Open innovation network + city data portal + logistics that actually go zero-emission.',
    works: [
      'Amsterdam InChange (formerly Amsterdam Smart City) is a multi-stakeholder platform — government, firms, universities, civic groups — with a large public project catalogue.',
      'City Data (data.amsterdam.nl) consolidates departmental datasets and APIs; GovTech Singapore has highlighted IoT living labs (LoRaWAN / NB-IoT).',
      'Cycling infrastructure is treated as data, not décor: manuals and counters are shared so other cities can copy.',
      'A city-centre zero-emission urban logistics zone took effect 1 January 2025 (as reported by GovTech Singapore’s case write-up).',
    ],
    pinellasTake:
      'Stand up a Pinellas data portal that is as boring and complete as Amsterdam’s: addresses, trails, flood, bus GTFS, utility service areas. Living labs on the Trail and the beaches beat a single vendor dashboard.',
    sources: [
      { title: 'GovTech Singapore: Amsterdam case', href: 'https://www.tech.gov.sg/technews/smart-cities-around-the-world-amsterdam/' },
      { title: 'Amsterdam Smart City on City Data', href: 'https://amsterdamsmartcity.com/updates/news/city-data-a-treasure-full-of-data-about-the-city' },
    ],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    themes: ['digital-twin', 'grid', 'iot'],
    headline: 'Disaster is the product requirement: twins, alerts, and a grid that must survive the next quake.',
    works: [
      'Tokyo Metropolitan Government is building a 3D digital-twin viewer that overlays buildings, point clouds, buses, river levels, and traffic.',
      'The same viewer published Noto Peninsula earthquake damage assessment to help another prefecture recover — twins as mutual aid, not just marketing.',
      'Post-2011 energy planning pushed smarter distribution and public disaster parks with survival infrastructure (widely reported in smart-city roundups).',
    ],
    pinellasTake:
      'Hurricane, king-tide, and sinkhole twins matter more than skyline vanity models. Overlay evacuation sites on the same map as sewage lift stations — Tokyo’s instinct.',
    sources: [
      { title: 'TMG: Digital twin for urban challenges', href: 'https://www.english.metro.tokyo.lg.jp/w/110-101-005910' },
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    themes: ['air', 'iot', 'open-data'],
    headline: 'IMD 2025 top-five city; famous for paperless government and loud air-taxi ambitions.',
    works: [
      'IMD Smart City Index 2025 listed Dubai 4th globally (survey-based; 146 cities).',
      'Smart Dubai / Digital Dubai programmes have pushed paperless services, open/shared data, and AI in government — often cited in UAE strategy docs.',
      'The emirate has been a high-profile announcer of passenger air-taxi / vertiport partnerships. Treat announcements as intent, not as a present-day network.',
    ],
    pinellasTake:
      'Steal the “every government transaction has a digital receipt” instinct for the visitor ledger. Do not import desert-city air-taxi timelines onto a hurricane coast without FAA-grade corridors.',
    sources: [
      { title: 'IMD 2025 ranking recap', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
    ],
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    country: 'China',
    themes: ['iot', 'mobility'],
    headline: 'City Brain: video + multi-source data for traffic and incident response.',
    works: [
      'Alibaba Cloud’s ET City Brain, first associated with Hangzhou, fuses camera and other urban data to optimize signals and dispatch — one of the most cited AI-traffic systems.',
      'Chinese cities more broadly are piloting urban drone delivery, façade inspection, and traffic monitoring (noted as a reference point even by Singapore’s MOT).',
      'Governance and surveillance trade-offs are inseparable from the technical success; Pinellas should copy the operations-center idea, not the camera maximalism.',
    ],
    pinellasTake:
      'A county mobility brain on PSTA + FDOT + flood gauges is enough. Prefer open sensors over a single-vendor video panopticon.',
    caution: 'Efficiency gains can ride on intensive camera networks; set a privacy ceiling first.',
    sources: [
      { title: 'Singapore MOT noting Chinese urban drone/AI uses', href: 'https://www.mot.gov.sg/news-resources/newsroom/response-speech-to-the-adjournment-motion--low-altitude-economy--building-the-flying-car--air-tourism-and-drone-logistics-industry--by-senior-minister-of-state-for-transport-and-national-development-ms-sun-xueling/' },
    ],
  },
  {
    id: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    themes: ['mobility', 'grid', 'open-data'],
    headline: 'Bike-first streets plus a climate-plan culture; IMD 2025 top ten.',
    works: [
      'IMD Smart City Index 2025 placed Copenhagen 7th.',
      'The city is a global reference for bicycle modal share, green waves, and cycle-superhighway planning — mobility as default infrastructure, not an app.',
      'District heating and harbour swimming (after water-quality work) show “smart” as environmental engineering, not only software.',
    ],
    pinellasTake:
      'Treat the Pinellas Trail like Copenhagen treats a cycle superhighway: counted, lit, connected to buses, and funded as transportation rather than recreation-only.',
    sources: [
      { title: 'IMD 2025 ranking recap', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
    ],
  },
  {
    id: 'helsinki',
    name: 'Helsinki',
    country: 'Finland',
    themes: ['digital-twin', 'open-data', 'grid'],
    headline: 'Helsinki 3D+ — an open, downloadable twin that even has a Minecraft edition.',
    works: [
      'The City of Helsinki publishes 3D city models as a digital twin: IT services + open data + updating information, CC BY licensed.',
      'Energy and Climate Atlas uses the model for solar potential and retrofit analysis (on the order of a million surfaces in city descriptions).',
      'Kalasatama Digital Twins project (2018–2019) coined “design, test and build digitally first.”',
      'Minecraft-Helsinki3D+ covers the city — a kids-friendly skin with a serious open-data backbone.',
    ],
    pinellasTake:
      'This project’s Kids/Lego/Roblox skins are a Helsinki idea: the same geometry, many ways in. Publish Pinellas building/flood models as open data, not a closed vendor scene.',
    sources: [
      { title: 'City of Helsinki: Helsinki 3D', href: 'https://www.hel.fi/en/decision-making/information-on-helsinki/maps-and-geospatial-data/helsinki-3d' },
      { title: 'Helsinki 3D+ case (Bentley / city)', href: 'https://www.bentley.com/en/esdg/improving-the-environment-with-a-city-scale-digital-twin/' },
    ],
  },
  {
    id: 'tallinn',
    name: 'Tallinn',
    country: 'Estonia',
    themes: ['open-data', 'participation', 'digital-twin'],
    headline: 'A city sitting on national digital public infrastructure: e-ID, X-Road, once-only data.',
    works: [
      'Estonia’s X-Road and mandatory e-ID mean city services inherit national digital identity and interoperability — closer to “digital public infrastructure” than a municipal app store.',
      'e-Residency and i-voting are national, not municipal, but they set citizen expectations Tallinn must meet.',
      'FinEst Twins and related EU work have pushed urban digital twins in the Helsinki–Tallinn pairing.',
      'The lesson is legal/architectural: once-only data, citizen-owned identity, audit logs — not a prettier kiosk.',
    ],
    pinellasTake:
      'A visitor pass on a city ledger only works if identity is public-infrastructure, not a vendor login. Steal Estonia’s once-only and audit instincts; do not pretend Florida has e-ID tomorrow.',
    sources: [
      { title: 'Comparative DPI / twin discussion (academic PDF)', href: 'https://mibmparidnya.in/index.php/PARIDNYA/article/download/173232/117161' },
    ],
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen',
    country: 'China',
    themes: ['mobility', 'air', 'iot'],
    headline: 'Hardware capital of drones and EVs — a manufacturing-side smart city.',
    works: [
      'Shenzhen is home to DJI and a dense new-energy vehicle / charging ecosystem. It appears in IMD’s wider Asian list (2025 reporting placed it well outside the global top 20; treat ranks as perception indexes).',
      'Chinese urban drone logistics, façade inspection, and traffic pilots are often trialled in this hardware corridor.',
      'Metro-scale 5G and electric buses are frequently cited in industry coverage; prefer official city/MIIT notices before repeating headline numbers.',
    ],
    pinellasTake:
      'You do not need to become a drone OEM. You do need corridors, noise rules, and a public map of where machines may fly — the governance Shenzhen’s hardware outran in other cities.',
    sources: [
      { title: 'IMD 2025 Asian rankings recap', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
    ],
  },
  {
    id: 'masdar',
    name: 'Masdar City',
    country: 'UAE (Abu Dhabi)',
    themes: ['grid', 'mobility', 'iot'],
    headline: 'A sustainability free-zone city: solar, district cooling, PRT, and measured energy claims.',
    works: [
      'Masdar City markets buildings that use 40% less energy and water than comparable buildings, and construction with low-carbon cement plus a high share of recycled aluminium (90% on their site copy).',
      'A 10 MW photovoltaic plant, district cooling, smart-grid experiments, and an early personal rapid transit (PRT) system are part of the campus story.',
      'The Atlas of Urban Tech notes smart appliances and demand-response trials. The city is a district, not a full metro — scale honestly.',
    ],
    pinellasTake:
      'Steal district cooling / reclaimed water / solar-on-plants for South Cross Bayou and Dunn — industrial campuses Pinellas already owns. Do not wait for a walled eco-city.',
    sources: [
      { title: 'Masdar City official site', href: 'https://masdarcity.ae/' },
      { title: 'Atlas of Urban Tech: Masdar', href: 'https://atlasofurbantech.org/cases/are-masdar-city/' },
    ],
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    themes: ['digital-twin', 'iot', 'mobility', 'open-data'],
    headline: 'S-Map twin + TOPIS traffic + a City Data Hub on open standards.',
    works: [
      'Seoul’s S-Map is a city-scale 3D digital twin built from LiDAR and aerial photography; city materials describe metropolitan coverage expanding through the mid-2020s.',
      'TOPIS is the long-running traffic operations brain — cameras and sensors in service of buses and incidents, not a greenfield demo.',
      'City Data Hub work using NGSI-LD is cited in interoperability literature: APIs that other agencies can actually share.',
      'IMD 2025 placed Seoul 13th globally.',
    ],
    pinellasTake:
      'Pair a public 3D map (this repo’s job) with a real traffic/transit operations feed (PSTA + county signals). Standards (NGSI-LD / open GTFS) beat a custom data lake.',
    sources: [
      { title: 'IMD 2025 ranking recap', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
      { title: 'Comparative City Data Hub note', href: 'https://mibmparidnya.in/index.php/PARIDNYA/article/download/173232/117161' },
    ],
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    themes: ['open-data', 'mobility', 'participation'],
    headline: 'The Datastore habit: publish hundreds of datasets and let Citymapper happen.',
    works: [
      'The London Datastore is a free portal with hundreds of datasets (transport, housing, environment). Roundups often say “700+”; treat the exact count as changing.',
      'TfL’s open APIs enabled a generation of independent travel apps — the canonical “city as platform” success.',
      'IMD 2025 placed London 6th. Borough fragmentation remains the planning challenge; open data is how a 32-borough city still composes.',
    ],
    pinellasTake:
      '24 municipalities + the County is London-in-miniature. A Pinellas Datastore with GTFS, flood, parcel, and spend feeds is the highest-leverage copy.',
    sources: [
      { title: 'Verdict magazine smart-city roundup (Datastore)', href: 'https://magazine.verdict.co.uk/verdict_magazine_may21/smartest_cities' },
      { title: 'IMD 2025 ranking recap', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
    ],
  },
  {
    id: 'nyc',
    name: 'New York City',
    country: 'United States',
    themes: ['open-data', 'iot', 'mobility', 'caution'],
    headline: 'Open Data Law plus a messy, real megacity IoT stack — LinkNYC and all.',
    works: [
      'NYC’s Open Data Law requires agency datasets on the public portal — a legal stick, not a hackathon vibe.',
      'The city has used IoT in transportation, environmental monitoring, and connectivity kiosks. LinkNYC showed both the power of street furniture-as-a-platform and the backlash when privacy and advertising collide.',
      'OneNYC / subsequent strategic plans treat equity and climate as first-class, not add-ons.',
    ],
    pinellasTake:
      'Pass an open-data rule with teeth. Street furniture (bus shelters, beach Wi-Fi) can host sensors if the privacy policy is on the pole and kids’ data is off-limits.',
    caution: 'Connectivity kiosks taught the US that “free Wi-Fi” can become an ad-surveillance fight.',
    sources: [
      { title: 'NYC Open Data portal', href: 'https://opendata.cityofnewyork.us/' },
    ],
  },
  {
    id: 'toronto',
    name: 'Toronto (Sidewalk Labs / Quayside)',
    country: 'Canada',
    themes: ['caution', 'participation', 'iot'],
    headline: 'The most important smart-city failure of the 2010s: data governance was not a vendor extra.',
    works: [
      'Alphabet’s Sidewalk Labs cancelled the Quayside project on 7 May 2020, citing COVID-era economic uncertainty (Reuters, CBC). The project still lacked final approvals and had faced years of privacy opposition.',
      'The proposed Urban Data Trust was criticized by Ontario’s Information and Privacy Commissioner (Sept 2019) as overlapping existing regulators, lacking independent oversight, and ill-fit to MFIPPA/FIPPA.',
      'Scholars and civic groups argued Waterfront Toronto should not have co-written data/IP policy with a vendor. “Don’t make policy with a vendor” is the durable lesson.',
      'Sidewalk published a Digital Innovation Appendix and pledged no facial recognition / no ad use of personal data — still not enough to settle legitimacy.',
    ],
    pinellasTake:
      'Write data rules before RFPs. Public ledger + opt-in household data-pay is the opposite of a private urban data trust. If a vendor needs a new legal form, stop.',
    caution: 'Cancelled. Learn in public; do not re-run Quayside on the Gulf.',
    sources: [
      { title: 'CBC: Sidewalk Labs cancels Quayside', href: 'https://www.cbc.ca/news/canada/toronto/sidewalk-labs-cancels-project-1.5559370' },
      { title: 'Reuters: Alphabet cancels Toronto project', href: 'https://www.reuters.com/article/technology/alphabets-sidewalk-labs-cancels-toronto-smart-city-project-idUSKBN22K0GT/' },
      { title: 'Ontario IPC letter on the MIDP (2019 PDF)', href: 'https://www.ipc.on.ca/sites/default/files/legacy/2019/09/2019-09-24-ltr-stephen-diamond-waterfront_toronto-residewalk-proposal.pdf' },
    ],
  },
  {
    id: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    themes: ['open-data', 'iot', 'participation'],
    headline: 'WienBot + mandatory-feeling open data + a FIWARE urban data platform.',
    works: [
      'WienBot (launched Dec 2017) answers city questions from OGD, events, and Wiener Linien real-time APIs — an agent on top of the same data the public can use.',
      'Vienna publishes geodata, routing, air, and service hours; from 1 Sept 2025 Austria’s Information Freedom Act requires authorities to publish non-exempt data as OGD on data.gv.at.',
      'smartdata.wien uses FIWARE / open standards; Vienna is in the Open & Agile Smart Cities network and cites Minimum Interoperability Mechanisms (MIMs).',
    ],
    pinellasTake:
      'Our agent panel is a WienBot sketch: talk to the city on the same map and the same open layers. Prefer FIWARE/OASC-style interoperability over a custom chatbot silo.',
    sources: [
      { title: 'City of Vienna: WienBot', href: 'https://www.wien.gv.at/en/content/bot' },
      { title: 'Vienna Open Government Data', href: 'https://www.wien.gv.at/en/content/open-government-data' },
      { title: 'smartdata.wien', href: 'https://digitales.wien.gv.at/en/projekt/plattform-smartdata-wien/' },
    ],
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    themes: ['open-data', 'digital-twin', 'iot', 'mobility'],
    headline: 'Open street-level APIs, vacuum waste at Hammarby, and a Kista twin experiment.',
    works: [
      'Stockholm Traffic Office publishes OGC API Features / WMS/WFS for bikes, parking, signals, lighting, and more — operational GIS as open data.',
      'Hammarby Sjöstad’s underground vacuum waste network is a frequently cited eco-district system (property-owner run, with sorting as the failure mode).',
      'Digital Vision Kista is an explicit municipal path from IoT telemetry to a district digital twin and Agenda 2030 decisions.',
    ],
    pinellasTake:
      'Publish the boring layers (signals, bike parking, lift stations) as APIs. Build the twin on those, like Kista, instead of a pretty mesh with no pipes.',
    sources: [
      { title: 'Stockholm Trafikkontoret open data', href: 'https://openstreetgs.stockholm.se/home/Data' },
      { title: 'Digital Vision Kista', href: 'https://smartbuilt.se/in-english/projects/information-infrastructure/digital-vision-kista-stockholms-path-to-a-digital-twin/' },
    ],
  },
  {
    id: 'telaviv',
    name: 'Tel Aviv-Yafo',
    country: 'Israel',
    themes: ['participation', 'open-data', 'iot'],
    headline: 'A resident-card city: digital services for people who already live there.',
    works: [
      'Digital Tel Aviv / DigiTel is widely cited as a resident-engagement platform: a personal city account for services, culture, and targeted notices — closer to a civic membership than a tourist app.',
      'The city has a long startup/civic-tech overlay and publishes municipal data; treat marketing claims about “#1 smart city” awards as awards, not measurements.',
      'Mobility data (bike share, lanes) is part of the same digital-services bundle in public descriptions of the programme.',
    ],
    pinellasTake:
      'Visitor pass vs resident pass should feel different, like DigiTel vs a tourist SIM. Residents get weight on votes; visitors get a time-bounded ledger.',
    sources: [
      { title: 'City of Tel Aviv-Yafo', href: 'https://www.tel-aviv.gov.il/en/Pages/HomePage.aspx' },
    ],
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    themes: ['open-data', 'iot', 'digital-twin'],
    headline: 'Open data, urban forest, and a sensor-literate city government.',
    works: [
      'The City of Melbourne Open Data Portal publishes a large catalogue (the city has long advertised 200+ datasets; counts change). Pedestrian counters in the CBD are a famous, actually used sensor series.',
      'Urban Forest Visual and related tree-canopy work show a digital twin instinct applied to shade and heat — immediately relevant to Florida.',
      'Smart-city programme language in Australia often sits under federal/state digital strategies; prefer the portal and the sensors over slogans.',
    ],
    pinellasTake:
      'Count people in the shade. A Pinellas heat + tree + bus-stop twin would outperform a generic “innovation district.” Melbourne already proved counters can be public.',
    sources: [
      { title: 'City of Melbourne Open Data', href: 'https://data.melbourne.vic.gov.au/' },
    ],
  },
  {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    themes: ['open-data', 'digital-twin', 'grid'],
    headline: 'IMD’s #1 smart city in both 2024 and 2025 — boring excellence as the flex.',
    works: [
      'Zurich retained the top IMD Smart City Index rank in 2024 and 2025. IMD blends resident surveys (structures + technology across safety, mobility, activities, opportunity, governance) — it is perception-plus-data, not a sensor count.',
      'Swiss cities typically pair strong utilities, transit, and e-government rather than a single moonshot platform.',
      'The lesson for Pinellas: residents ranking sanitation, transit, and safety high is the index. Gadgets are optional.',
    ],
    pinellasTake:
      'Win the “did the bus come / did the tide flood / did the bill make sense” basics, then layer twins. Zurich’s rank is a vibe check on competence.',
    sources: [
      { title: 'Straits Times on IMD 2024 (Zurich #1)', href: 'https://www.straitstimes.com/singapore/singapore-is-5th-smartest-city-in-the-world-top-in-asia-global-index' },
      { title: 'IMD 2025 ranking recap (Zurich #1)', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
    ],
  },
  {
    id: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    themes: ['mobility', 'grid', 'open-data'],
    headline: 'IMD’s perennial #2: EVs, a climate budget, and a car-quiet centre.',
    works: [
      'IMD Smart City Index 2025 placed Oslo 2nd (after Zurich, before Geneva).',
      'Oslo is a global reference for battery-electric vehicle uptake, public charging, and using procurement + road pricing rather than a single “smart mobility app.”',
      'The city’s climate budget treats emissions like money — an accountability cousin of Pinellas XD’s “every cent” ledger, applied to carbon.',
    ],
    pinellasTake:
      'PSTA’s electric-bus charging deal with Duke Energy (2022) is already an Oslo-shaped move. Publish charger uptime and diesel-bus retirement on the public ledger.',
    sources: [
      { title: 'IMD 2025 ranking recap', href: 'https://www.humanresourcesonline.net/how-global-cities-rank-on-the-smart-city-index-2025' },
      { title: 'PSTA–Duke Energy charging agreement (context)', href: 'https://psta.net/press_releases/psta-continues-to-go-green/' },
    ],
  },
]
