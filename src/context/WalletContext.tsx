import { DEMO_TX, type LedgerTx } from '@/data/ledger'
import {
  connectDemo,
  connectEvm,
  connectPhantom,
  loadSession,
  saveSession,
  type CivicRole,
  type CivicSession,
} from '@/lib/wallet'
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type WalletContextValue = {
  session: CivicSession | null
  txs: LedgerTx[]
  error: string | null
  busy: boolean
  connect: (kind: 'demo' | 'phantom' | 'evm') => Promise<void>
  disconnect: () => void
  setRole: (role: CivicRole) => void
  act: (memo: string, cents: number, kind: LedgerTx['kind']) => void
}

const WalletContext = createContext<WalletContextValue | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CivicSession | null>(() =>
    typeof window === 'undefined' ? null : loadSession(),
  )
  const [txs, setTxs] = useState<LedgerTx[]>(DEMO_TX)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const value = useMemo<WalletContextValue>(
    () => ({
      session,
      txs,
      error,
      busy,
      async connect(kind) {
        setBusy(true)
        setError(null)
        try {
          const next =
            kind === 'phantom'
              ? await connectPhantom()
              : kind === 'evm'
                ? await connectEvm()
                : connectDemo()
          setSession(next)
          saveSession(next)
          setTxs((prev) => [
            {
              id: crypto.randomUUID(),
              t: new Date().toISOString().replace('T', ' ').slice(0, 19),
              actor: next.label,
              memo: `Wallet bound to civic pass ${next.passId}${next.signedIn ? ' (signed)' : ' (connected, unsigned)'}`,
              cents: 0,
              kind: 'credit',
            },
            ...prev,
          ])
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Could not connect that wallet.')
        } finally {
          setBusy(false)
        }
      },
      disconnect() {
        setSession(null)
        saveSession(null)
        setError(null)
      },
      setRole(role) {
        setSession((prev) => {
          if (!prev) return prev
          const next = { ...prev, role }
          saveSession(next)
          return next
        })
      },
      act(memo, cents, kind) {
        if (!session) return
        setTxs((prev) => [
          {
            id: crypto.randomUUID(),
            t: new Date().toISOString().replace('T', ' ').slice(0, 19),
            actor: session.passId,
            memo,
            cents,
            kind,
          },
          ...prev,
        ])
      },
    }),
    [busy, error, session, txs],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used inside WalletProvider')
  return ctx
}
