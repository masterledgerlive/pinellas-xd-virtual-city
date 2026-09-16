import { AgentPanel } from '@/components/AgentPanel'
import { Explainer } from '@/components/Explainer'
import { Header } from '@/components/Header'
import { LayerPanel } from '@/components/LayerPanel'
import { LedgerPanel } from '@/components/LedgerPanel'
import { MapCanvas } from '@/components/MapCanvas'
import { SkinSwitcher } from '@/components/SkinSwitcher'
import { defaultLayerState, type LayerId } from '@/data/layers'
import { MUNICIPALITIES } from '@/data/municipalities'
import { SKINS, type SkinId } from '@/data/skins'
import { cn } from '@/lib/cn'
import { Layers, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Drawer = 'none' | 'layers' | 'agent'

export function ExplorePage() {
  const [skin, setSkin] = useState<SkinId>('realistic')
  const [layers, setLayers] = useState(defaultLayerState)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focusedLayer, setFocusedLayer] = useState<LayerId | null>('transit')
  const [orbit, setOrbit] = useState(true)
  const [drawer, setDrawer] = useState<Drawer>('none')

  useEffect(() => {
    document.documentElement.dataset.skin = skin
  }, [skin])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const idx = Number(e.key) - 1
      if (idx >= 0 && idx < SKINS.length) setSkin(SKINS[idx].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const skinClass = useMemo(() => (skin === 'lego' ? 'studs' : ''), [skin])

  return (
    <div className={cn('fixed inset-0 overflow-hidden', skinClass)}>
      <MapCanvas
        skin={skin}
        layers={layers}
        selectedId={selectedId}
        orbit={orbit}
        onSelect={(id) => {
          setSelectedId(id)
          if (id) setFocusedLayer(null)
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 p-3 md:p-4">
        <Header orbit={orbit} onToggleOrbit={() => setOrbit((o) => !o)} mapControls />

        <div className="relative flex min-h-0 flex-1 gap-3">
          <div
            className={cn(
              'pointer-events-auto w-[min(100%,300px)] shrink-0 flex-col gap-3 overflow-y-auto md:flex',
              drawer === 'layers'
                ? 'absolute top-24 bottom-24 left-3 z-20 flex md:static'
                : 'hidden md:flex',
            )}
          >
            <SkinSwitcher value={skin} onChange={setSkin} />
            <LayerPanel
              value={layers}
              onToggle={(id) => setLayers((s) => ({ ...s, [id]: !s[id] }))}
              focused={focusedLayer}
              onFocus={setFocusedLayer}
            />
            <label className="glass pointer-events-auto rounded-3xl p-3 text-sm">
              <span className="mb-1 block text-[11px] text-[var(--muted)]">Jump to a municipality</span>
              <select
                className="w-full rounded-2xl border border-[var(--stroke)] bg-[var(--panel-2)] px-2 py-2"
                value={selectedId ?? ''}
                onChange={(e) => setSelectedId(e.target.value || null)}
              >
                <option value="">Pinellas County overview</option>
                {MUNICIPALITIES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-end gap-3">
            <div className="pointer-events-auto flex gap-2 md:hidden">
              <button
                className="glass rounded-full px-3 py-2 text-sm"
                onClick={() => setDrawer((d) => (d === 'layers' ? 'none' : 'layers'))}
              >
                <Layers className="mr-1 inline h-4 w-4" />
                Skins & layers
              </button>
              <button
                className="glass rounded-full px-3 py-2 text-sm"
                onClick={() => setDrawer((d) => (d === 'agent' ? 'none' : 'agent'))}
              >
                <Sparkles className="mr-1 inline h-4 w-4" />
                Agents & pass
              </button>
            </div>
            <Explainer
              districtId={selectedId}
              layerId={focusedLayer}
              onClose={() => {
                setSelectedId(null)
                setFocusedLayer(null)
              }}
            />
          </div>

          <div
            className={cn(
              'pointer-events-auto w-[min(100%,340px)] shrink-0 flex-col gap-3 overflow-y-auto md:flex',
              drawer === 'agent'
                ? 'absolute top-24 bottom-24 right-3 z-20 flex md:static'
                : 'hidden md:flex',
            )}
          >
            <AgentPanel districtId={selectedId} layers={layers} />
            <LedgerPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
