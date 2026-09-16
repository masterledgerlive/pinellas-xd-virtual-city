import { Header } from '@/components/Header'
import { ETHOS } from '@/data/ethos'
import { Heart } from 'lucide-react'

export function SafetyPage() {
  return (
    <div className="min-h-full bg-[var(--bg)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 p-3 md:p-6">
        <Header />
        <section className="glass rounded-3xl p-6 md:p-10">
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
            <Heart className="h-4 w-4" /> Family ethos
          </p>
          <h1 className="display mt-2 text-4xl font-bold md:text-5xl">Safest city principles</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Pinellas XD is a kids-friendly map with a serious under-the-hood. The safety stance is not a
            surveillance slogan. It is how robots, parents, and public money share a peninsula.
          </p>
        </section>
        <div className="grid gap-4">
          {ETHOS.map((item) => (
            <article key={item.title} className="glass rounded-3xl p-5">
              <h2 className="display text-2xl font-bold">{item.title}</h2>
              <p className="mt-2 text-[var(--ink)]/90">{item.body}</p>
            </article>
          ))}
        </div>
        <section className="glass rounded-3xl p-5 text-sm text-[var(--muted)]">
          <h2 className="display text-xl font-bold text-[var(--ink)]">Conceptual layers, said plainly</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Plasma / blood-bank pins are civic-participation concepts sitting near hospital clusters. They
              are not medical advice, not a donor directory, and not a marketplace.
            </li>
            <li>
              Household data-pay is an opt-in dividend idea. City services work if you never sell a byte.
            </li>
            <li>
              Flying-car and drone corridors are planning sketches, not FAA charts. Kids can see them; pilots
              cannot use them.
            </li>
            <li>
              The civic ledger is DEMO-labeled. Wallets may sign a civic-bind message. No mainnet
              city money, and nobody is left behind if they never install an extension.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
