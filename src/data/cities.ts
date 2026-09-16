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
  }
]
