import { Header } from '@/components/Header'
import { useWallet } from '@/context/WalletContext'
import { formatCents } from '@/data/ledger'
import { detectWallets, shortAddress, type CivicRole } from '@/lib/wallet'
import { cn } from '@/lib/cn'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const ROLES: { id: CivicRole; label: string; blurb: string }[] = [
  { id: 'visitor', label: 'Visitor', blurb: 'Time-bounded pass. Votes have low weight.' },
  { id: 'resident', label: 'Resident', blurb: 'Proven Pinellas presence. Full weighted ballot.' },
  { id: 'city-ops', label: 'City ops (demo)', blurb: 'See spend as staff would — still DEMO money.' },
]

const ACTIONS = [
  {
    id: 'vote',
    title: 'Cast a weighted vote',
    body: 'YES on Bayfront shade sails — listed to the cent, weight from role not wealth.',
    cents: 0,
    kind: 'vote' as const,
    memo: 'Weighted vote: YES on Bayfront shade (civic wallet)',
  },
  {
    id: 'fare',
    title: 'Ride the SunRunner',
    body: 'DEMO fare St. Pete Beach → downtown. Same $2.25 idea as PSTA, posted here.',
    cents: -225,
    kind: 'debit' as const,
    memo: 'PSTA SunRunner DEMO fare via civic wallet',
  },
  {
    id: 'datapay',
    title: 'Share a flood ping',
    body: 'Opt-in, de-identified. A tiny data dividend lands on the pass.',
    cents: 17,
    kind: 'data-pay' as const,
    memo: 'Household data-pay · opt-in flood ping',
  },
  {
    id: 'spend',
    title: 'Publish a city line item',
    body: 'City-ops view: post a DEMO invoice so the public ledger moves in the open.',
    cents: -4800,
    kind: 'grant' as const,
    memo: 'Municipal DEMO spend · trail light repair invoice',
  },
]

export function WalletPage() {
  const { session, connect, disconnect, setRole, act, txs, busy, error } = useWallet()
  const [available, setAvailable] = useState({ phantom: false, evm: false })

  useEffect(() => {
    document.documentElement.dataset.skin = 'realistic'
    setAvailable(detectWallets())
  }, [])

  const balance = useMemo(
    () => txs.reduce((sum, tx) => sum + (tx.kind === 'grant' ? 0 : tx.cents), 0),
    [txs],
  )

  return (
    <div className="min-h-full bg-[var(--bg)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-3 md:p-6">
        <Header />
        <section className="glass rounded-3xl p-6 md:p-8">
          <p className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase">Civic wallet</p>
          <h1 className="display mt-1 text-4xl font-bold">Interact with the city</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Bind a wallet to a Pinellas XD pass, then use the same credential for votes, fares,
            data-pay, and public spend. Money here is DEMO. The pattern is real: one ledger, every
            interaction.
          </p>

          {!session ? (
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              <ConnectCard
                title="Phantom"
                detail={available.phantom ? 'Ready to connect' : 'Extension not found'}
                disabled={busy}
                onClick={() => void connect('phantom')}
              />
              <ConnectCard
                title="MetaMask / EVM"
                detail={available.evm ? 'Ready to connect' : 'Extension not found'}
                disabled={busy}
                onClick={() => void connect('evm')}
              />
              <ConnectCard
                title="DEMO civic pass"
                detail="No wallet required"
                disabled={busy}
                onClick={() => void connect('demo')}
              />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <dl className="grid gap-2 sm:grid-cols-2">
                <Stat label="Pass" value={session.passId} />
                <Stat
                  label="Wallet"
                  value={`${session.label} · ${shortAddress(session.address)}`}
                />
                <Stat label="Signature" value={session.signedIn ? 'Civic-bind signed' : 'Connected only'} />
                <Stat label="Pass balance (DEMO)" value={formatCents(balance)} />
              </dl>
              <div>
                <p className="mb-2 text-xs tracking-wide text-[var(--muted)] uppercase">Role</p>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setRole(role.id)}
                      className={cn(
                        'rounded-2xl border px-3 py-2 text-left text-sm',
                        session.role === role.id
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                          : 'border-[var(--stroke)] bg-[var(--panel-2)]',
                      )}
                    >
                      <div className="font-semibold">{role.label}</div>
                      <div className="text-[11px] opacity-80">{role.blurb}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={disconnect} className="text-sm underline">
                Disconnect
              </button>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          {ACTIONS.map((action) => (
            <article key={action.id} className="glass rounded-3xl p-5">
              <h2 className="display text-xl font-bold">{action.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{action.body}</p>
              <button
                type="button"
                disabled={!session}
                onClick={() => act(action.memo, action.cents, action.kind)}
                className="mt-4 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] disabled:opacity-40"
              >
                {session ? 'Post to DEMO ledger' : 'Connect first'}
              </button>
            </article>
          ))}
        </section>

        <p className="text-center text-sm">
          <Link to="/map" className="underline underline-offset-2">
            Take this pass onto the 3D map
          </Link>
        </p>

        <section className="glass rounded-3xl p-5">
          <h2 className="display text-xl font-bold">Every DEMO cent</h2>
          <ul className="panel-scroll mt-3 max-h-80 space-y-1 overflow-y-auto font-mono text-[11px]">
            {txs.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between gap-3 rounded-xl border border-[var(--stroke)] px-2 py-1.5"
              >
                <span className="min-w-0">
                  <span className="block truncate">{tx.memo}</span>
                  <span className="text-[var(--muted)]">
                    {tx.t} · {tx.actor}
                  </span>
                </span>
                <span className={tx.cents < 0 ? 'text-[var(--danger)]' : ''}>
                  {tx.cents === 0 ? tx.kind : formatCents(tx.cents)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function ConnectCard({
  title,
  detail,
  disabled,
  onClick,
}: {
  title: string
  detail: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-2xl border border-[var(--stroke)] bg-[var(--panel-2)] px-4 py-3 text-left text-sm disabled:opacity-50"
    >
      <div className="font-semibold">{title}</div>
      <div className="text-[var(--muted)]">{detail}</div>
    </button>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--panel-2)] px-3 py-2">
      <dt className="text-[10px] tracking-wide text-[var(--muted)] uppercase">{label}</dt>
      <dd className="font-mono text-sm break-all">{value}</dd>
    </div>
  )
}
