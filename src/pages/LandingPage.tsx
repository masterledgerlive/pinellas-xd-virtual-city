import { Header } from '@/components/Header'
import { useWallet } from '@/context/WalletContext'
import { detectWallets } from '@/lib/wallet'
import { ArrowRight, Landmark, Map, Shield, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const GATES = [
  {
    title: 'Visitor pass',
    body: 'A time-bounded civic credential. Fares, pier access, and welcome stipends post to the same DEMO ledger.',
  },
  {
    title: 'Weighted votes',
    body: 'Residents weigh in on shade, night buses, and lighting — by proven presence and opted-in data, never by buying ballots.',
  },
  {
    title: 'Public spend',
    body: 'Every DEMO cent of municipal line items is listed. The city does not hide invoices behind a PDF.',
  },
  {
    title: 'Household data-pay',
    body: 'Opt-in flood, heat, and wait-time reports can earn a dividend. Services still work if you never sell a byte.',
  },
]

export function LandingPage() {
  const { session, connect, busy, error } = useWallet()
  const [available, setAvailable] = useState({ phantom: false, evm: false })

  useEffect(() => {
    document.documentElement.dataset.skin = 'realistic'
    setAvailable(detectWallets())
  }, [])

  return (
    <div className="min-h-full bg-[var(--bg)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-3 md:p-6">
        <Header />
        <section className="glass overflow-hidden rounded-3xl p-6 md:p-10">
          <p className="text-xs tracking-[0.22em] text-[var(--muted)] uppercase">
            Pinellas County, Florida · open civic door
          </p>
          <h1 className="display mt-2 max-w-3xl text-4xl font-bold md:text-6xl">
            The city in your wallet. The pipes on the map.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Pinellas XD is the public front door for an agentic smart city: connect a wallet or a DEMO
            civic pass, then vote, ride, and watch every cent as you walk the 3D county.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/wallet"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)]"
            >
              <Wallet className="h-4 w-4" />
              {session ? 'Open civic wallet' : 'Connect a civic wallet'}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] px-5 py-2.5 text-sm font-semibold"
            >
              <Map className="h-4 w-4" />
              Enter the 3D map
            </Link>
          </div>
          {!session && (
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => void connect('phantom')}
                className="rounded-2xl border border-[var(--stroke)] bg-[var(--panel-2)] px-4 py-3 text-left text-sm"
              >
                <div className="font-semibold">Phantom</div>
                <div className="text-[var(--muted)]">
                  {available.phantom ? 'Solana extension detected' : 'Install Phantom, or use DEMO'}
                </div>
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void connect('evm')}
                className="rounded-2xl border border-[var(--stroke)] bg-[var(--panel-2)] px-4 py-3 text-left text-sm"
              >
                <div className="font-semibold">MetaMask / EVM</div>
                <div className="text-[var(--muted)]">
                  {available.evm ? 'Browser wallet detected' : 'Install an EVM wallet, or use DEMO'}
                </div>
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void connect('demo')}
                className="rounded-2xl border border-[var(--stroke)] bg-[var(--panel-2)] px-4 py-3 text-left text-sm"
              >
                <div className="font-semibold">DEMO civic pass</div>
                <div className="text-[var(--muted)]">No extension. Same ledger, labeled play money.</div>
              </button>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}
          <p className="mt-4 text-xs text-[var(--muted)]">
            Connecting signs a civic-bind message only. City funds, fares, and votes in this app stay
            DEMO-labeled. No mainnet transfers. Not official county credentials.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {GATES.map((gate) => (
            <article key={gate.title} className="glass rounded-3xl p-5">
              <h2 className="display text-2xl font-bold">{gate.title}</h2>
              <p className="mt-2 text-[var(--ink)]/90">{gate.body}</p>
            </article>
          ))}
        </section>

        <section className="glass grid gap-6 rounded-3xl p-6 md:grid-cols-3 md:p-8">
          <div>
            <Landmark className="h-5 w-5" />
            <h2 className="display mt-2 text-xl font-bold">One ledger, every interaction</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Visitor mint, SunRunner fare, shade vote, reclaimed-water invoice — the same list. That is
              how the city “interacts in all ways” without a second set of books.
            </p>
          </div>
          <div>
            <Shield className="h-5 w-5" />
            <h2 className="display mt-2 text-xl font-bold">Parents stay parents</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Kids can play the map. Wallets are optional. Nobody is left behind if they never install an
              extension.
            </p>
          </div>
          <div>
            <h2 className="display text-xl font-bold">Open source · MIT</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Fork it, host it, audit it.{' '}
              <a
                href="https://github.com/masterledgerlive/pinellas-xd-virtual-city"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                github.com/masterledgerlive/pinellas-xd-virtual-city
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
