import { useWallet } from '@/context/WalletContext'
import { DEMO_BALANCES, DEMO_PASS, formatCents } from '@/data/ledger'
import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'

export function LedgerPanel() {
  const { session, txs } = useWallet()
  const passBalance = txs.reduce((sum, tx) => sum + (tx.kind === 'grant' ? 0 : tx.cents), 0)
  const dataPay = txs.filter((tx) => tx.kind === 'data-pay').reduce((sum, tx) => sum + tx.cents, 0)
  const ballots = txs.filter((tx) => tx.kind === 'vote').length
  const voteWeight = session?.role === 'resident' ? 1.35 : session?.role === 'city-ops' ? 0 : 0.4

  return (
    <section className="glass pointer-events-auto rounded-3xl p-3" aria-labelledby="ledger-heading">
      <h2 id="ledger-heading" className="display text-base font-bold">
        Civic pass · DEMO ledger
      </h2>
      <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
        {session?.passId ?? DEMO_PASS.id}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">{DEMO_PASS.networkNote}</p>

      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <Stat label="Pass balance" value={formatCents(session ? passBalance : DEMO_BALANCES.pxdCents)} />
        <Stat
          label="Vote weight"
          value={`${(session ? voteWeight : DEMO_BALANCES.voteWeight).toFixed(2)}×`}
        />
        <Stat label="Ballots cast" value={String(session ? ballots : DEMO_BALANCES.ballotsCast)} />
        <Stat
          label="Data-pay earned"
          value={formatCents(session ? dataPay : DEMO_BALANCES.dataPayCents)}
        />
      </dl>

      <p className="mt-3 text-[11px] leading-snug text-[var(--muted)]">
        Bind Phantom, an EVM wallet, or a DEMO pass on the landing page. Fares, data dividends, votes,
        and public spend stay on this one list. Votes are weighted by role — never by buying influence.
      </p>
      <Link to="/wallet" className="mt-2 inline-block text-xs underline underline-offset-2">
        {session ? 'Open civic wallet' : 'Connect a civic wallet'}
      </Link>

      <h3 className="mt-3 text-xs font-semibold tracking-wide uppercase">Every DEMO cent</h3>
      <ul className="panel-scroll mt-1 max-h-48 space-y-1 overflow-y-auto pr-1 font-mono text-[11px]">
        {txs.map((tx) => (
          <li
            key={tx.id}
            className="flex items-start justify-between gap-2 rounded-xl border border-[var(--stroke)] px-2 py-1.5"
          >
            <div className="min-w-0">
              <div className="truncate text-[var(--ink)]">{tx.memo}</div>
              <div className="text-[10px] text-[var(--muted)]">
                {tx.t} · {tx.actor}
              </div>
            </div>
            <span
              className={cn(
                'shrink-0',
                tx.cents < 0 ? 'text-[var(--danger)]' : tx.cents > 0 ? 'text-emerald-400' : 'opacity-60',
              )}
            >
              {tx.cents === 0 ? tx.kind : formatCents(tx.cents)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--panel-2)] px-3 py-2">
      <dt className="text-[10px] tracking-wide text-[var(--muted)] uppercase">{label}</dt>
      <dd className="font-mono text-sm">{value}</dd>
    </div>
  )
}
