import { Header } from '@/components/Header'
import { CITIES, THEMES, type CityTheme } from '@/data/cities'
import { cn } from '@/lib/cn'
import { useMemo, useState } from 'react'

export function ReferencesPage() {
  const [theme, setTheme] = useState<CityTheme | 'all'>('all')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CITIES.filter((c) => {
      const themeOk = theme === 'all' || c.themes.includes(theme)
      const text = `${c.name} ${c.country} ${c.headline} ${c.works.join(' ')}`.toLowerCase()
      return themeOk && (!q || text.includes(q))
    })
  }, [theme, query])

  return (
    <div className="min-h-full bg-[var(--bg)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-3 md:p-6">
        <Header />
        <section className="glass rounded-3xl p-5 md:p-8">
          <p className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase">World studio wall</p>
          <h1 className="display mt-1 text-4xl font-bold md:text-5xl">What already works</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            {CITIES.length} reference cities — not a trophy shelf. Each card is a working pattern Pinellas
            can steal, plus the failure modes we refuse to repeat. Rankings (IMD and others) mix resident
            surveys with infrastructure; they are cited as indexes, not gospel. Numbers we could not verify
            are omitted.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm',
                  theme === t.id
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'bg-[var(--panel-2)] hover:border-[var(--accent)]',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Search cities</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Singapore, Sentilo, digital twin…"
              className="w-full rounded-full border border-[var(--stroke)] bg-[var(--panel-2)] px-4 py-2"
            />
          </label>
        </section>

        <p className="text-sm text-[var(--muted)]">
          Showing {rows.length} of {CITIES.length}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((city, i) => (
            <article key={city.id} className="glass rounded-3xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] text-[var(--muted)]">
                    {String(i + 1).padStart(2, '0')} · {city.country}
                  </p>
                  <h2 className="display text-2xl font-bold">{city.name}</h2>
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {city.themes.map((th) => (
                    <span
                      key={th}
                      className="rounded-full bg-[var(--panel-2)] px-2 py-0.5 text-[10px] tracking-wide uppercase"
                    >
                      {th.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm font-medium">{city.headline}</p>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-[var(--muted)]">
                {city.works.map((w) => (
                  <li key={w.slice(0, 40)} className="text-[var(--ink)]/90">
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-2xl bg-[var(--panel-2)] px-3 py-2 text-sm">
                <span className="font-semibold">For Pinellas: </span>
                {city.pinellasTake}
              </p>
              {city.caution && (
                <p className="mt-2 text-sm text-[var(--danger)]">Watch-out: {city.caution}</p>
              )}
              <ul className="mt-3 space-y-1 text-sm">
                {city.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {rows.length === 0 && (
          <p className="glass rounded-3xl p-8 text-center">No cities match that filter. Try another theme.</p>
        )}
      </div>
    </div>
  )
}
