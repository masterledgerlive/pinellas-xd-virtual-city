import { MUNICIPALITIES, type Municipality } from '@/data/municipalities'

type CivicGeometry = {
  type: string
  coordinates: unknown
}

export type CivicFeatureCollection = {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    id?: string
    properties: Record<string, unknown>
    geometry: CivicGeometry
  }>
}

const TIGER_PLACES =
  'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/4/query'

function byName(): Map<string, Municipality> {
  return new Map(MUNICIPALITIES.map((m) => [m.name.toLowerCase(), m]))
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function decorate(muni: Municipality, geometry: CivicGeometry) {
  return {
    type: 'Feature' as const,
    id: muni.id,
    properties: {
      id: muni.id,
      name: muni.name,
      kind: muni.kind,
      region: muni.region,
      note: muni.note,
      pop: muni.pop,
      color: muni.color,
      lng: muni.lng,
      lat: muni.lat,
    },
    geometry,
  }
}

export async function loadMunicipalitiesGeojson(): Promise<CivicFeatureCollection> {
  const local = (await fetchJson('/geojson/municipalities.geojson')) as CivicFeatureCollection | null
  if (local?.features?.length) return local

  const names = MUNICIPALITIES.map((m) => `BASENAME='${m.name.replaceAll("'", "''")}'`).join(' OR ')
  const url = new URL(TIGER_PLACES)
  url.searchParams.set('where', `STATE='12' AND (${names})`)
  url.searchParams.set('outFields', 'NAME,BASENAME,GEOID,STATE')
  url.searchParams.set('outSR', '4326')
  url.searchParams.set('f', 'geojson')

  const remote = (await fetchJson(url.toString())) as CivicFeatureCollection | null
  const lookup = byName()
  const features = (remote?.features ?? [])
    .map((feature) => {
      const base = String(feature.properties?.BASENAME ?? feature.properties?.NAME ?? '')
        .replace(/ (city|town)$/i, '')
        .trim()
        .toLowerCase()
      const muni = lookup.get(base)
      if (!muni || !feature.geometry) return null
      return decorate(muni, feature.geometry)
    })
    .filter((f): f is ReturnType<typeof decorate> => Boolean(f))

  return { type: 'FeatureCollection', features }
}

export async function loadBuildingsGeojson(): Promise<CivicFeatureCollection> {
  const local = (await fetchJson('/geojson/buildings.geojson')) as CivicFeatureCollection | null
  if (local?.features?.length) return local
  return syntheticBuildings()
}

export function syntheticBuildings(): CivicFeatureCollection {
  const features: CivicFeatureCollection['features'] = []
  for (const m of MUNICIPALITIES) {
    for (let i = 0; i < 8; i += 1) {
      const dx = ((i % 4) - 1.5) * 0.0036
      const dy = (Math.floor(i / 4) - 0.5) * 0.0036
      const w = 0.0011
      const lng = m.lng + dx
      const lat = m.lat + dy
      features.push({
        type: 'Feature',
        properties: {
          height: 16 + i * 6,
          base_height: 0,
          color_index: i % 6,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [lng - w, lat - w],
              [lng + w, lat - w],
              [lng + w, lat + w],
              [lng - w, lat + w],
              [lng - w, lat - w],
            ],
          ],
        },
      })
    }
  }
  return { type: 'FeatureCollection', features }
}
