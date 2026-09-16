import { SKINS, type SkinId } from '@/data/skins'
import { cn } from '@/lib/cn'

type Props = {
  value: SkinId
  onChange: (id: SkinId) => void
}

export function SkinSwitcher({ value, onChange }: Props) {
  return (
    <section className="glass pointer-events-auto rounded-3xl p-3" aria-labelledby="skin-heading">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h2 id="skin-heading" className="display text-base font-bold">
          Style skins
        </h2>
        <p className="text-[11px] text-[var(--muted)]">Instant restyle</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
        {SKINS.map((skin) => (
          <button
            key={skin.id}
            type="button"
            onClick={() => onChange(skin.id)}
            aria-label={skin.label}
            aria-pressed={value === skin.id}
            className={cn(
              'rounded-2xl border px-3 py-2 text-left transition',
              value === skin.id
                ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                : 'border-[var(--stroke)] bg-[var(--panel-2)] hover:border-[var(--accent)]',
            )}
          >
            <div className="text-sm font-semibold">{skin.label}</div>
            <div className="text-[11px] opacity-80">{skin.kidLabel}</div>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] leading-snug text-[var(--muted)]">
        {SKINS.find((s) => s.id === value)?.blurb}
      </p>
    </section>
  )
}
