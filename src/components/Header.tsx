import { Button } from '@/components/ui/Button'
import { useWallet } from '@/context/WalletContext'
import { cn } from '@/lib/cn'
import { shortAddress } from '@/lib/wallet'
import { BookOpen, Heart, Home, Map, Orbit, Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'

type Props = {
  orbit?: boolean
  onToggleOrbit?: () => void
  mapControls?: boolean
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-3 py-1.5 text-sm',
    isActive ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'hover:bg-[var(--panel-2)]',
  )

export function Header({ orbit = false, onToggleOrbit, mapControls = false }: Props) {
  const { session } = useWallet()

  return (
    <header className="glass pointer-events-auto flex flex-col gap-2 rounded-3xl px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-4 sm:py-3">
      <div className="flex min-w-0 items-center gap-3 sm:flex-1">
        <NavLink
          to="/"
          aria-label="Pinellas XD home"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[var(--accent)] text-[var(--accent-ink)] sm:h-10 sm:w-10"
        >
          <Map className="h-5 w-5" />
        </NavLink>
        <div className="min-w-0">
          <p className="display truncate text-base leading-tight font-bold tracking-tight sm:text-lg md:text-xl">
            Pinellas XD Virtual City
          </p>
          <p className="hidden truncate text-xs text-[var(--muted)] sm:block">
            Pinellas County, Florida — civic door, wallets, and the 3D map.
          </p>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-1 sm:justify-end" aria-label="Primary">
        <NavLink to="/" className={linkClass} end>
          <span className="inline-flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            Home
          </span>
        </NavLink>
        <NavLink to="/map" className={linkClass}>
          Map
        </NavLink>
        <NavLink to="/wallet" className={linkClass}>
          <span className="inline-flex items-center gap-1">
            <Wallet className="h-3.5 w-3.5" />
            Wallet
          </span>
        </NavLink>
        <NavLink to="/references" className={linkClass}>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            References
          </span>
        </NavLink>
        <NavLink to="/safety" className={linkClass}>
          <span className="inline-flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            Safety
          </span>
        </NavLink>
        {session && (
          <NavLink
            to="/wallet"
            className="rounded-full border border-[var(--stroke)] bg-[var(--panel-2)] px-3 py-1.5 font-mono text-xs"
            title={session.address}
          >
            {session.kind === 'demo' ? session.passId : shortAddress(session.address)}
          </NavLink>
        )}
        {mapControls && onToggleOrbit && (
          <Button
            variant={orbit ? 'primary' : 'outline'}
            onClick={onToggleOrbit}
            aria-pressed={orbit}
            title="Gentle camera orbit"
          >
            <Orbit className="h-4 w-4" />
            <span className="hidden sm:inline">Orbit</span>
          </Button>
        )}
      </nav>
    </header>
  )
}
