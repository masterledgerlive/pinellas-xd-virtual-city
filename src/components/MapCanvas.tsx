import {
  Map as MapLibreMap,
  NavigationControl,
  Popup,
  ScaleControl,
  setWorkerUrl,
} from 'maplibre-gl'
import type { MapLayerMouseEvent, MapMouseEvent } from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { LAYERS, type LayerId } from '@/data/layers'
import { MUNICIPALITY_MAP } from '@/data/municipalities'
import { SKIN_MAP, type SkinId } from '@/data/skins'
import 'maplibre-gl/dist/maplibre-gl.css'

setWorkerUrl('/maplibre/maplibre-gl-worker.mjs')

const CENTER: [number, number] = [-82.73, 27.91]
const MAX_BOUNDS: [[number, number], [number, number]] = [
  [-83.05, 27.52],
  [-82.4, 28.28],
]
const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'
const FALLBACK_STYLE = {
  version: 8 as const,
  name: 'Pinellas XD fallback',
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {},
  layers: [
    {
      id: 'background',
      type: 'background' as const,
      paint: { 'background-color': '#07131f' },
    },
  ],
}

type Props = {
  skin: SkinId
  layers: Record<LayerId, boolean>
  selectedId: string | null
  orbit: boolean
  onSelect: (id: string | null) => void
}

function toyColorExpr(colors: string[]) {
  return [
    'match',
    ['%', ['coalesce', ['get', 'color_index'], 0], 6],
    0,
    colors[0],
    1,
    colors[1],
    2,
    colors[2],
    3,
    colors[3],
    4,
    colors[4],
    colors[5],
  ]
}

function safePaint(map: MapLibreMap, id: string, prop: string, value: unknown) {
  try {
    if (map.getLayer(id)) map.setPaintProperty(id, prop as never, value as never)
  } catch {
    /* layer may not support the property */
  }
}

function restyleBasemap(map: MapLibreMap, skin: SkinId) {
  const p = SKIN_MAP[skin].paint
  const style = map.getStyle()
  if (!style?.layers) return
  for (const layer of style.layers) {
    const id = layer.id
    const low = id.toLowerCase()
    const src =
      'source-layer' in layer && layer['source-layer']
        ? String(layer['source-layer']).toLowerCase()
        : ''
    try {
      if (layer.type === 'background') {
        map.setPaintProperty(id, 'background-color', p.background)
      }
      if (layer.type === 'fill' && (low.includes('water') || src === 'water')) {
        map.setPaintProperty(id, 'fill-color', p.water)
      }
      if (layer.type === 'fill' && (low.includes('park') || src === 'park' || src === 'landcover')) {
        map.setPaintProperty(id, 'fill-color', p.park)
      }
      if (layer.type === 'fill' && (low.includes('landuse') || src === 'landuse')) {
        map.setPaintProperty(id, 'fill-color', p.land)
        map.setPaintProperty(id, 'fill-opacity', 0.55)
      }
      if (layer.type === 'line' && (low.includes('road') || src === 'transportation')) {
        if (low.includes('casing') || low.includes('case')) {
          map.setPaintProperty(id, 'line-color', p.roadCasing)
        } else {
          map.setPaintProperty(id, 'line-color', p.road)
        }
      }
      if (layer.type === 'symbol') {
        map.setPaintProperty(id, 'text-color', p.label)
        map.setPaintProperty(id, 'text-halo-color', p.halo)
        if ((src === 'place' || src === 'poi' || low.includes('place_')) && !id.startsWith('muni') && !id.startsWith('uninc')) {
          map.setLayoutProperty(id, 'visibility', 'none')
        }
      }
    } catch {
      /* skip incompatible paint */
    }
  }
  safePaint(map, 'county-fill', 'fill-color', p.water)
  safePaint(map, 'county-fill', 'fill-opacity', 0.18)
  safePaint(map, 'county-line', 'line-color', p.muniLine)
  safePaint(map, 'muni-line', 'line-color', p.muniLine)
  safePaint(map, 'muni-extrusion', 'fill-extrusion-opacity', p.extrusionOpacity)
  safePaint(map, 'muni-fill', 'fill-opacity', p.muniFill)
  safePaint(map, 'muni-label', 'text-color', p.label)
  safePaint(map, 'muni-label', 'text-halo-color', p.halo)
  safePaint(map, 'uninc-label', 'text-color', p.label)
  safePaint(map, 'uninc-label', 'text-halo-color', p.halo)
  safePaint(map, 'buildings-3d', 'fill-extrusion-color', toyColorExpr(p.toy))
  safePaint(map, 'osm-3d-buildings', 'fill-extrusion-color', [
    'interpolate',
    ['linear'],
    ['coalesce', ['get', 'render_height'], ['get', 'height'], 10],
    0,
    p.building,
    80,
    p.buildingHi,
  ])
}

function addOsmBuildings(map: MapLibreMap) {
  if (map.getLayer('osm-3d-buildings')) return
  const sources = map.getStyle().sources ?? {}
  const vectorId = Object.keys(sources).find((k) => sources[k]?.type === 'vector')
  if (!vectorId) return
  const layers = map.getStyle().layers ?? []
  const before = layers.find((l) => l.type === 'symbol')?.id
  map.addLayer(
    {
      id: 'osm-3d-buildings',
      source: vectorId,
      'source-layer': 'building',
      type: 'fill-extrusion',
      minzoom: 13.5,
      filter: ['!=', ['get', 'hide_3d'], true],
      paint: {
        'fill-extrusion-color': '#c9b8a4',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          13.5,
          0,
          15.5,
          ['coalesce', ['get', 'render_height'], ['get', 'height'], 8],
        ],
        'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0],
        'fill-extrusion-opacity': 0.72,
      },
    },
    before,
  )
}

function addCityLayers(map: MapLibreMap) {
  if (map.getSource('municipalities')) return

  map.addSource('county', { type: 'geojson', data: '/geojson/county.geojson' })
  map.addSource('municipalities', {
    type: 'geojson',
    data: '/geojson/municipalities.geojson',
    promoteId: 'id',
  })
  map.addSource('buildings', { type: 'geojson', data: '/geojson/buildings.geojson' })
  map.addSource('unincorporated', { type: 'geojson', data: '/geojson/unincorporated.geojson' })

  map.addLayer({
    id: 'county-fill',
    type: 'fill',
    source: 'county',
    paint: { 'fill-color': '#7eb8d6', 'fill-opacity': 0.16 },
  })
  map.addLayer({
    id: 'county-line',
    type: 'line',
    source: 'county',
    paint: { 'line-color': '#0f766e', 'line-width': 2.2 },
  })
  map.addLayer({
    id: 'muni-extrusion',
    type: 'fill-extrusion',
    source: 'municipalities',
    paint: {
      'fill-extrusion-color': ['get', 'color'],
      'fill-extrusion-height': [
        'match',
        ['get', 'name'],
        'St. Petersburg',
        90,
        'Clearwater',
        70,
        'Largo',
        55,
        'Pinellas Park',
        48,
        28,
      ],
      'fill-extrusion-opacity': 0.38,
    },
  })
  map.addLayer({
    id: 'muni-fill',
    type: 'fill',
    source: 'municipalities',
    paint: {
      'fill-color': ['get', 'color'],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        0.5,
        ['boolean', ['feature-state', 'hover'], false],
        0.38,
        0.16,
      ],
    },
  })
  map.addLayer({
    id: 'muni-line',
    type: 'line',
    source: 'municipalities',
    paint: {
      'line-color': '#0f766e',
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        3.4,
        ['boolean', ['feature-state', 'hover'], false],
        2.4,
        1.2,
      ],
    },
  })
  try {
    map.addLayer({
      id: 'buildings-3d',
      type: 'fill-extrusion',
      source: 'buildings',
      minzoom: 10.4,
      paint: {
        'fill-extrusion-color': toyColorExpr([
          '#cbd5e1',
          '#94a3b8',
          '#78716c',
          '#a8a29e',
          '#64748b',
          '#d6d3d1',
        ]) as never,
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': ['get', 'base_height'],
        'fill-extrusion-opacity': 0.85,
      },
    })
  } catch (err) {
    console.warn('Skipping stylized buildings layer', err)
  }

  for (const layer of LAYERS) {
    if (!layer.geojson) continue
    map.addSource(layer.id, { type: 'geojson', data: layer.geojson })
    map.addLayer({
      id: `${layer.id}-line`,
      type: 'line',
      source: layer.id,
      filter: ['==', ['geometry-type'], 'LineString'],
      layout: { visibility: layer.defaultOn ? 'visible' : 'none' },
      paint: {
        'line-color': layer.color,
        'line-width': layer.id === 'transit' ? 4.2 : 2.6,
        'line-opacity': 0.92,
        ...(layer.group === 'concept' ? { 'line-dasharray': [1.4, 1.2] } : {}),
      },
    })
    map.addLayer({
      id: `${layer.id}-halo`,
      type: 'line',
      source: layer.id,
      filter: ['==', ['geometry-type'], 'LineString'],
      layout: { visibility: layer.defaultOn ? 'visible' : 'none' },
      paint: {
        'line-color': layer.color,
        'line-width': 10,
        'line-opacity': 0.16,
        'line-blur': 4,
      },
    })
    map.addLayer({
      id: `${layer.id}-pt`,
      type: 'circle',
      source: layer.id,
      filter: ['==', ['geometry-type'], 'Point'],
      layout: { visibility: layer.defaultOn ? 'visible' : 'none' },
      paint: {
        'circle-color': layer.color,
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 3.5, 14, 8],
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#fff',
        'circle-opacity': 0.95,
      },
    })
  }

  map.addLayer({
    id: 'muni-label',
    type: 'symbol',
    source: 'municipalities',
    minzoom: 9.4,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 9, 11, 13, 16],
      'text-font': ['Noto Sans Regular'],
      'text-variable-anchor': ['center', 'top', 'bottom'],
      'text-padding': 4,
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#134e4a',
      'text-halo-color': '#f4fffb',
      'text-halo-width': 1.4,
    },
  })
  map.addLayer({
    id: 'uninc-label',
    type: 'symbol',
    source: 'unincorporated',
    minzoom: 10.2,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 11,
      'text-font': ['Noto Sans Regular'],
    },
    paint: {
      'text-color': '#3f6b67',
      'text-halo-color': '#f4fffb',
      'text-halo-width': 1.2,
    },
  })
}

export function MapCanvas({ skin, layers, selectedId, orbit, onSelect }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const hoverRef = useRef<string | null>(null)
  const selectedRef = useRef<string | null>(null)
  const onSelectRef = useRef(onSelect)
  const orbitRef = useRef(orbit)
  const skinRef = useRef(skin)
  const layersRef = useRef(layers)
  const interactingRef = useRef(false)
  const readyRef = useRef(false)

  useEffect(() => {
    onSelectRef.current = onSelect
    orbitRef.current = orbit
    skinRef.current = skin
    layersRef.current = layers
  })

  const applyLayerVisibility = (map: MapLibreMap) => {
    const current = layersRef.current
    for (const layer of LAYERS) {
      if (!layer.geojson) continue
      const vis = current[layer.id] ? 'visible' : 'none'
      for (const suffix of ['-line', '-halo', '-pt']) {
        const id = `${layer.id}${suffix}`
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', vis)
      }
    }
    const muniVis = current.municipal ? 'visible' : 'none'
    for (const id of ['muni-fill', 'muni-line', 'muni-extrusion', 'muni-label']) {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', muniVis)
    }
  }

  useEffect(() => {
    if (!hostRef.current || mapRef.current) return
    const map = new MapLibreMap({
      container: hostRef.current,
      style: STYLE_URL,
      center: CENTER,
      zoom: 10.15,
      pitch: 52,
      bearing: -22,
      maxBounds: MAX_BOUNDS,
      attributionControl: { compact: true },
      hash: false,
    })
    map.addControl(new NavigationControl({ visualizePitch: true }), 'bottom-right')
    map.addControl(new ScaleControl({ maxWidth: 110 }), 'bottom-left')
    mapRef.current = map
    const resize = () => map.resize()
    requestAnimationFrame(resize)
    window.addEventListener('resize', resize)

    const popup = new Popup({ closeButton: false, closeOnClick: false, offset: 12 })

    const onReady = () => {
      try {
        addCityLayers(map)
        addOsmBuildings(map)
        restyleBasemap(map, skinRef.current)
        applyLayerVisibility(map)
        readyRef.current = true
        map.resize()
      } catch (err) {
        console.error('Pinellas XD map layers failed', err)
      }
    }

    map.on('style.load', onReady)
    const fallbackTimer = window.setTimeout(() => {
      if (!map.getSource('municipalities')) {
        map.setStyle(FALLBACK_STYLE as never)
      }
    }, 8000)

    map.on('mousemove', 'muni-fill', (ev: MapLayerMouseEvent) => {
      map.getCanvas().style.cursor = 'pointer'
      const id = String(ev.features?.[0]?.properties?.id ?? '')
      if (hoverRef.current && hoverRef.current !== id) {
        map.setFeatureState({ source: 'municipalities', id: hoverRef.current }, { hover: false })
      }
      hoverRef.current = id
      if (id) map.setFeatureState({ source: 'municipalities', id }, { hover: true })
      const name = ev.features?.[0]?.properties?.name
      const pop = ev.features?.[0]?.properties?.pop
      if (name) {
        popup
          .setLngLat(ev.lngLat)
          .setHTML(
            `<strong>${name}</strong><div style="opacity:.75;font-size:12px">${pop ?? ''}</div><div style="opacity:.7;font-size:11px">Click to open district agents</div>`,
          )
          .addTo(map)
      }
    })
    map.on('mouseleave', 'muni-fill', () => {
      map.getCanvas().style.cursor = ''
      if (hoverRef.current) {
        map.setFeatureState({ source: 'municipalities', id: hoverRef.current }, { hover: false })
        hoverRef.current = null
      }
      popup.remove()
    })
    map.on('click', 'muni-fill', (ev: MapLayerMouseEvent) => {
      const f = ev.features?.[0]
      const id = String(f?.properties?.id ?? '')
      if (!id) return
      onSelectRef.current(id)
      const lng = Number(f?.properties?.lng)
      const lat = Number(f?.properties?.lat)
      if (Number.isFinite(lng) && Number.isFinite(lat)) {
        map.flyTo({ center: [lng, lat], zoom: Math.max(map.getZoom(), 12.4), pitch: 58, duration: 1100 })
      }
    })
    map.on('click', (ev: MapMouseEvent) => {
      const hits = map.queryRenderedFeatures(ev.point, { layers: ['muni-fill'] })
      if (!hits.length) onSelectRef.current(null)
    })

    const pause = () => {
      interactingRef.current = true
    }
    const resume = () => {
      window.setTimeout(() => {
        interactingRef.current = false
      }, 2500)
    }
    map.on('mousedown', pause)
    map.on('touchstart', pause)
    map.on('wheel', pause)
    map.on('mouseup', resume)
    map.on('touchend', resume)

    let raf = 0
    const spin = () => {
      if (orbitRef.current && !interactingRef.current && !map.isMoving()) {
        map.rotateTo(map.getBearing() - 0.07, { duration: 0 })
      }
      raf = requestAnimationFrame(spin)
    }
    raf = requestAnimationFrame(spin)

    return () => {
      window.removeEventListener('resize', resize)
      window.clearTimeout(fallbackTimer)
      cancelAnimationFrame(raf)
      popup.remove()
      map.remove()
      mapRef.current = null
      readyRef.current = false
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current) return
    restyleBasemap(map, skin)
  }, [skin])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current) return
    applyLayerVisibility(map)
  }, [layers])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current) return
    const prev = selectedRef.current
    if (prev) map.setFeatureState({ source: 'municipalities', id: prev }, { selected: false })
    selectedRef.current = selectedId
    if (selectedId) {
      map.setFeatureState({ source: 'municipalities', id: selectedId }, { selected: true })
    }
  }, [selectedId])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current || !selectedId) return
    const muni = MUNICIPALITY_MAP[selectedId]
    if (!muni) return
    map.flyTo({
      center: [muni.lng, muni.lat],
      zoom: Math.max(map.getZoom(), 12.2),
      pitch: 58,
      duration: 900,
    })
  }, [selectedId])

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 h-full w-full"
      role="application"
      aria-label="Interactive 3D map of Pinellas County, Florida"
    />
  )
}
