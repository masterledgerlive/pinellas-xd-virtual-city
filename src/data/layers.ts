export const LAYER_IDS = [
  'municipal',
  'sewage',
  'water',
  'power',
  'transit',
  'iot',
  'drone',
  'flying',
  'plasma',
  'datapay',
  'voting',
] as const

export type LayerId = (typeof LAYER_IDS)[number]

export type LayerDef = {
  id: LayerId
  label: string
  kidLabel: string
  group: 'civic' | 'utility' | 'mobility' | 'concept'
  color: string
  geojson?: string
  defaultOn: boolean
  realBasis: string
  explainer: string
  caution?: string
}

export const LAYERS: LayerDef[] = [
  {
    id: 'municipal',
    label: 'Municipal boundaries',
    kidLabel: 'City borders',
    group: 'civic',
    color: '#2dd4bf',
    defaultOn: true,
    realBasis:
      'Pinellas County lists 24 incorporated municipalities. Unincorporated areas are served directly by the County. Boundaries here are simplified US Census TIGERweb place polygons.',
    explainer:
      'Every colored plateau is a real city or town. Click one to meet its infrastructure agent. The leftover land — Palm Harbor, East Lake, Lealman, and others — is unincorporated Pinellas, where county government is the local government.',
  },
  {
    id: 'sewage',
    label: 'Sewage & reclamation',
    kidLabel: 'Pipes that clean water',
    group: 'utility',
    color: '#d97706',
    geojson: '/geojson/layers/sewage.geojson',
    defaultOn: false,
    realBasis:
      'PLANPinellas and Pinellas County Utilities describe a split system: the William E. Dunn Advanced Water Reclamation Facility serves north county; South Cross Bayou serves south county. Several cities run their own collection (St. Petersburg, Clearwater, Largo, Dunedin, Tarpon Springs, Oldsmar). Beach towns often send flow to PCU or St. Petersburg. Lines on this map are schematic, not as-built GIS.',
    explainer:
      'Wastewater is not one pipe. North flows toward Dunn; south toward South Cross Bayou; some cities keep their own plants. Reclaimed water is already a real Pinellas product — PCU reports tens of thousands of reclaimed accounts, including many beach communities.',
    caution: 'Schematic overlay for learning. Not a construction or locate drawing.',
  },
  {
    id: 'water',
    label: 'Drinking & reclaimed water',
    kidLabel: 'Water we drink',
    group: 'utility',
    color: '#0ea5e9',
    geojson: '/geojson/layers/water.geojson',
    defaultOn: false,
    realBasis:
      'Tampa Bay Water has been the regional wholesale supplier to member governments (including Pinellas County and St. Petersburg) since 1998. Cities then retail water to taps. PCU also runs a large reclaimed-water network.',
    explainer:
      'Drinking water arrives regionally, then each utility finishes the last mile. Reclaimed water is a parallel “purple pipe” idea: treated wastewater used for irrigation so drinking water stays drinking water. Peel this layer to see the wholesale-to-retail story.',
  },
  {
    id: 'power',
    label: 'Power grid',
    kidLabel: 'Lights and chargers',
    group: 'utility',
    color: '#facc15',
    geojson: '/geojson/layers/power.geojson',
    defaultOn: false,
    realBasis:
      'Duke Energy Florida is the investor-owned electric utility in this territory. In 2022 PSTA approved a 10-year agreement with Duke Energy Sustainable Solutions to install and operate electric-bus charging infrastructure — a real grid-meets-transit project.',
    explainer:
      'The yellow spines follow major rights-of-way (US 19, I-275, Ulmerton). They are not Duke’s confidential system map. They show how a smart-city layer would talk to substations, bus chargers, and household meters — with public ledgers for spend, not secret diagrams of critical assets.',
    caution: 'Conceptual corridors only. Precise grid maps are restricted for safety.',
  },
  {
    id: 'transit',
    label: 'Transit',
    kidLabel: 'Buses & the SunRunner',
    group: 'mobility',
    color: '#22c55e',
    geojson: '/geojson/layers/transit.geojson',
    defaultOn: true,
    realBasis:
      'The Pinellas Suncoast Transit Authority (PSTA) operates countywide bus service. The SunRunner is Tampa Bay’s first bus rapid transit line, running about 10 miles from St. Pete Beach to downtown St. Petersburg; passenger service began 21 October 2022. Forward Pinellas is the county’s transportation planning agency. Route geometry here is schematic.',
    explainer:
      'The bright green line is the SunRunner — dedicated-lane BRT with frequent service. Other lines are conceptual trunks along US 19, Gulf Boulevard, and the Pinellas Trail (the trail is a rail-trail, shown because mobility is more than buses).',
  },
  {
    id: 'iot',
    label: 'IoT sensor mesh',
    kidLabel: 'City senses',
    group: 'civic',
    color: '#a78bfa',
    geojson: '/geojson/layers/iot.geojson',
    defaultOn: false,
    realBasis:
      'Cities such as Barcelona (Sentilo) and Amsterdam (living labs) already run open sensor platforms. Pinellas agencies publish GIS and open data, but this mesh is a demo of what a county-scale, household-accountable sensor layer could look like.',
    explainer:
      'Each purple pin is a pretend sensor: air, flood, traffic, heat, noise, or water pressure. In the Pinellas XD model, sensor streams would be public by default, personal data would be opt-in, and households could be paid when their consented data trains city models.',
    caution: 'Demo pins. Not a live county telemetry feed.',
  },
  {
    id: 'drone',
    label: 'Drone delivery corridors',
    kidLabel: 'Sky paths for packages',
    group: 'concept',
    color: '#fb7185',
    geojson: '/geojson/layers/drone.geojson',
    defaultOn: false,
    realBasis:
      'FAA remote-ID rules and BVLOS waivers govern US drone operations. Singapore has trialled ship-to-shore drones and published Asia-Pacific eVTOL/UAS safety reference materials (CAAS). These Pinellas lines are not FAA-approved routes.',
    explainer:
      'Low corridors hug US 19, the Gandy/I-275 medical hop, and the barrier islands — the idea of last-mile packages and hospital hops without buzzing playgrounds. Parent-stress-free design means geofenced no-fly over schools and beaches unless an emergency.',
    caution: 'Concept only. Not authorized airspace.',
  },
  {
    id: 'flying',
    label: 'Flying-car / eVTOL lanes',
    kidLabel: 'Future sky roads',
    group: 'concept',
    color: '#38bdf8',
    geojson: '/geojson/layers/flying.geojson',
    defaultOn: false,
    realBasis:
      'Passenger eVTOL is in certification and limited pilots worldwide (for example Dubai and several US cities have announced vertiport/air-taxi partnerships). Singapore’s transport ministry has described a conservative path: drones first, eVTOL later. No certified passenger eVTOL service was operating in Pinellas at the time this demo was researched.',
    explainer:
      'Higher lanes stay over water and the US 19 trunk, with concept vertiports at PIE, downtown St. Pete, Clearwater Beach, and Tarpon Springs. The agent will tell you this is a planning sketch so kids can see “where the sky cars would go” without pretending they fly today.',
    caution: 'Concept only. Not an aviation chart.',
  },
  {
    id: 'plasma',
    label: 'Plasma / blood-bank nodes',
    kidLabel: 'Help-your-neighbors pins',
    group: 'concept',
    color: '#f43f5e',
    geojson: '/geojson/layers/plasma.geojson',
    defaultOn: false,
    realBasis:
      'Licensed blood and plasma collection already exists in the US under FDA rules. This layer does not list operating hours, does not recruit donors, and is not medical advice. Pins sit near well-known hospital clusters as a civic-participation concept.',
    explainer:
      'In the Pinellas XD model, lawful collection is individual and brokered: a person chooses to participate, gets paid by the real operator (not by this app), and may optionally share de-identified participation data back to the household ledger. The map only shows that a civic node could live next to hospitals — never how, when, or whether you should donate.',
    caution:
      'Conceptual civic layer only. Not medical advice, not a clinic directory, not a marketplace.',
  },
  {
    id: 'datapay',
    label: 'Household data-pay',
    kidLabel: 'Families get paid for data',
    group: 'concept',
    color: '#34d399',
    geojson: '/geojson/layers/datapay.geojson',
    defaultOn: false,
    realBasis:
      'No Pinellas program currently pays households for civic data. The concept borrows from open-data cities (London Datastore, Vienna OGD) plus a dividend idea: if the city uses your consented data, you see the cent on the visitor/resident ledger.',
    explainer:
      'Green clusters are demo household nodes. Code and information are king: if a model trains on neighborhood travel or flood reports, the payment is public, tiny, and listed to the cent. Nobody is left behind — participation is opt-in, and services work even if you never sell a byte.',
  },
  {
    id: 'voting',
    label: 'Weighted voting nodes',
    kidLabel: 'Fair city votes',
    group: 'civic',
    color: '#818cf8',
    geojson: '/geojson/layers/voting.geojson',
    defaultOn: false,
    realBasis:
      'Pinellas municipal elections are nonpartisan. This layer does not replace the Supervisor of Elections. It sketches a complementary, in-system vote on municipal spend where weight comes from proven residency and consented civic data — not from money.',
    explainer:
      'Each node is a city-hall-scale place where a visitor pass or resident pass can cast a weighted ballot. Weight is earned by living here and by sharing verified, opted-in city data — never by buying votes. Every ballot and every related cent of spend is a DEMO ledger line.',
    caution: 'DEMO civic model. Not an official ballot.',
  },
]

export const LAYER_MAP = Object.fromEntries(LAYERS.map((l) => [l.id, l])) as Record<
  LayerId,
  LayerDef
>

export const defaultLayerState = (): Record<LayerId, boolean> =>
  Object.fromEntries(LAYERS.map((l) => [l.id, l.defaultOn])) as Record<LayerId, boolean>
