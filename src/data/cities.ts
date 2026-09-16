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
]
