import { LAYERS, type LayerId } from '@/data/layers'
import { cn } from '@/lib/cn'

type Props = {
  value: Record<LayerId, boolean>
  onToggle: (id: LayerId) => void
  focused: LayerId | null
  onFocus: (id: LayerId) => void
}

export function LayerPanel({ value, onToggle, focused, onFocus }: Props) {
  return (
    <section className="glass pointer-events-auto rounded-3xl p-3" aria-labelledby="layers-heading">
      <h2 id="layers-heading" className="display mb-1 text-base font-bold">
        Under-the-hood layers
      </h2>
      <p className="mb-2 text-[11px] text-[var(--muted)]">
        Peel infrastructure that already exists in planning — plus clearly marked concepts.
      </p>
      <ul className="panel-scroll max-h-[42vh] space-y-1 overflow-y-auto pr-1 md:max-h-[52vh]">
        {LAYERS.map((layer) => (
          <li key={layer.id}>
            <div
              className={cn(
                'flex items-start gap-2 rounded-2xl border px-2 py-2',
                focused === layer.id ? 'border-[var(--accent)] bg-[var(--panel-2)]' : 'border-transparent',
              )}
            >
              <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                  checked={value[layer.id]}
                  onChange={() => onToggle(layer.id)}
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: layer.color }}
                      aria-hidden
                    />
                    {layer.label}
                  </span>
                  <span className="block text-[11px] text-[var(--muted)]">{layer.kidLabel}</span>
                </span>
              </label>
              <button
                type="button"
                className="shrink-0 text-[11px] underline decoration-[var(--stroke)]"
                onClick={() => onFocus(layer.id)}
              >
                Why?
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
