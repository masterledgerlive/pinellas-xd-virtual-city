export const SKIN_IDS = ['realistic', 'kids', 'roblox', 'lego', 'blueprint'] as const
export type SkinId = (typeof SKIN_IDS)[number]

export type SkinPaint = {
  background: string
  water: string
  land: string
  park: string
  road: string
  roadCasing: string
  building: string
  buildingHi: string
  muniFill: number
  muniLine: string
  extrusionOpacity: number
  label: string
  halo: string
  toy: string[]
  point: string
}

export type Skin = {
  id: SkinId
  label: string
  kidLabel: string
  blurb: string
  paint: SkinPaint
}

export const SKINS: Skin[] = [
  {
    id: 'realistic',
    label: 'Realistic',
    kidLabel: 'Real map',
    blurb: 'OpenStreetMap geography with Gulf-coast light, 3D buildings, and planning overlays.',
    paint: {
      background: '#d7ece8',
      water: '#7eb8d6',
      land: '#e7f0e8',
      park: '#b7d4a8',
      road: '#f7f3ea',
      roadCasing: '#d4cbb8',
      building: '#c9b8a4',
      buildingHi: '#8f7b66',
      muniFill: 0.22,
      muniLine: '#0f766e',
      extrusionOpacity: 0.38,
      label: '#134e4a',
      halo: '#f4fffb',
      toy: ['#cbd5e1', '#94a3b8', '#78716c', '#a8a29e', '#64748b', '#d6d3d1'],
      point: '#0f766e',
    },
  },
  {
    id: 'kids',
    label: 'Kids',
    kidLabel: 'Playground',
    blurb: 'Candy-colored county you can read like a picture book — still the same real places.',
    paint: {
      background: '#fff4d6',
      water: '#5ad0ff',
      land: '#b6f5a8',
      park: '#7dff9a',
      road: '#ffe08a',
      roadCasing: '#ff8fab',
      building: '#ffb4e6',
      buildingHi: '#ff6b6b',
      muniFill: 0.35,
      muniLine: '#7c3aed',
      extrusionOpacity: 0.55,
      label: '#3b0764',
      halo: '#ffffff',
      toy: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b', '#cc5de8'],
      point: '#7c3aed',
    },
  },
  {
    id: 'roblox',
    label: 'Roblox-like',
    kidLabel: 'Blocky',
    blurb: 'Chunky neon blocks on a night sky — same districts, game-world materials.',
    paint: {
      background: '#12081f',
      water: '#1b3b7a',
      land: '#22143a',
      park: '#14532d',
      road: '#2a1b4a',
      roadCasing: '#f472b6',
      building: '#22d3ee',
      buildingHi: '#f0abfc',
      muniFill: 0.28,
      muniLine: '#22d3ee',
      extrusionOpacity: 0.62,
      label: '#f5d0fe',
      halo: '#14061f',
      toy: ['#22d3ee', '#f472b6', '#a3e635', '#facc15', '#818cf8', '#fb7185'],
      point: '#a3e635',
    },
  },
  {
    id: 'lego',
    label: 'Lego-like',
    kidLabel: 'Bricks',
    blurb: 'Primary bricks and stud-bright land. Snap a district, stack a city.',
    paint: {
      background: '#f4d35e',
      water: '#1e90ff',
      land: '#f6e27a',
      park: '#22c55e',
      road: '#f8fafc',
      roadCasing: '#111827',
      building: '#dc2626',
      buildingHi: '#2563eb',
      muniFill: 0.32,
      muniLine: '#111827',
      extrusionOpacity: 0.7,
      label: '#111827',
      halo: '#fde68a',
      toy: ['#dc2626', '#2563eb', '#eab308', '#16a34a', '#f97316', '#0ea5e9'],
      point: '#dc2626',
    },
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    kidLabel: 'Engineer',
    blurb: 'Under-the-hood drafting view: cyan ink on navy, made for peeling pipes and grids.',
    paint: {
      background: '#082044',
      water: '#0a3a66',
      land: '#0b2a4a',
      park: '#0f3d4a',
      road: '#123a66',
      roadCasing: '#7dd3fc',
      building: '#7dd3fc',
      buildingHi: '#e0f2fe',
      muniFill: 0.12,
      muniLine: '#7dd3fc',
      extrusionOpacity: 0.28,
      label: '#e0f2fe',
      halo: '#082044',
      toy: ['#7dd3fc', '#38bdf8', '#bae6fd', '#67e8f9', '#22d3ee', '#e0f2fe'],
      point: '#7dd3fc',
    },
  },
]

export const SKIN_MAP = Object.fromEntries(SKINS.map((s) => [s.id, s])) as Record<
  SkinId,
  Skin
>
