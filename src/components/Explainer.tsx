import { LAYER_MAP, type LayerId } from '@/data/layers'
import { MUNICIPALITY_MAP } from '@/data/municipalities'
import { X } from 'lucide-react'

type Props = {
  districtId: string | null
  layerId: LayerId | null
  onClose: () => void
}

export function Explainer({ districtId, layerId, onClose }: Props) {
  const district = districtId ? MUNICIPALITY_MAP[districtId] : null
  const layer = layerId ? LAYER_MAP[layerId] : null
  if (!district && !layer) return null

  return (
    <aside className="glass pointer-events-auto max-h-[40vh] overflow-y-auto rounded-3xl p-4 md:max-h-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
            {district ? 'District dossier' : 'Layer explainer'}
          </p>
          <h2 className="display text-xl font-bold">
            {district?.name ?? layer?.label}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 hover:bg-[var(--panel-2)]"
          aria-label="Close explainer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {district && (
        <div className="mt-2 space-y-2 text-sm">
          <p className="text-[var(--muted)]">
            {district.kind} · {district.region} Pinellas · {district.pop}
          </p>
          <p>{district.note}</p>
        </div>
      )}
      {layer && (
        <div className="mt-3 space-y-2 text-sm">
          <p>{layer.explainer}</p>
          <p className="text-[13px] text-[var(--muted)]">
            <span className="font-semibold text-[var(--ink)]">What already exists: </span>
            {layer.realBasis}
          </p>
          {layer.caution && (
            <p className="rounded-2xl bg-[var(--panel-2)] px-3 py-2 text-[12px]">{layer.caution}</p>
          )}
        </div>
      )}
    </aside>
  )
}
