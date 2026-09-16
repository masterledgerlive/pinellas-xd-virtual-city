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
