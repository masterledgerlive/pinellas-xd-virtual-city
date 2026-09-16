export type WalletKind = 'demo' | 'phantom' | 'evm'
export type CivicRole = 'visitor' | 'resident' | 'city-ops'

export type CivicSession = {
  kind: WalletKind
  address: string
  label: string
  role: CivicRole
  passId: string
  connectedAt: string
  signedIn: boolean
}

export type CivicActionId = 'pass' | 'vote' | 'fare' | 'datapay' | 'spend'

type PhantomProvider = {
  isPhantom?: boolean
  connect: () => Promise<{ publicKey: { toString: () => string } }>
  disconnect?: () => Promise<void>
  signMessage?: (message: Uint8Array, encoding?: string) => Promise<{ signature: Uint8Array }>
}

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
}

declare global {
  interface Window {
    solana?: PhantomProvider
    ethereum?: Eip1193Provider
  }
}

const STORAGE_KEY = 'pxd-civic-session'

export const CIVIC_MESSAGE =
  'Pinellas XD Virtual City — bind this wallet to a DEMO civic pass. This signs a message only. No funds move. No mainnet city money. Not an official Pinellas County credential.'

export function shortAddress(address: string): string {
  if (address.length < 12) return address
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function passIdFor(kind: WalletKind, address: string): string {
  const tail = address.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase() || 'DEMO'
  const prefix = kind === 'demo' ? 'VISITOR' : kind === 'phantom' ? 'SOL' : 'EVM'
  return `PXD-${prefix}-${tail}`
}

export function detectWallets(): { phantom: boolean; evm: boolean } {
  return {
    phantom: Boolean(window.solana?.isPhantom),
    evm: Boolean(window.ethereum),
  }
}

export function loadSession(): CivicSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CivicSession
  } catch {
    return null
  }
}

export function saveSession(session: CivicSession | null) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export async function connectPhantom(): Promise<CivicSession> {
  const provider = window.solana
  if (!provider?.isPhantom) {
    throw new Error('Phantom is not installed. Install the Phantom extension, or use a DEMO pass.')
  }
  const resp = await provider.connect()
  const address = resp.publicKey.toString()
  let signedIn = false
  try {
    if (provider.signMessage) {
      await provider.signMessage(new TextEncoder().encode(CIVIC_MESSAGE), 'utf8')
      signedIn = true
    }
  } catch {
    signedIn = false
  }
  return {
    kind: 'phantom',
    address,
    label: 'Phantom (Solana)',
    role: 'visitor',
    passId: passIdFor('phantom', address),
    connectedAt: new Date().toISOString(),
    signedIn,
  }
}

export async function connectEvm(): Promise<CivicSession> {
  const provider = window.ethereum
  if (!provider) {
    throw new Error('No EVM wallet found. Install MetaMask or a similar wallet, or use a DEMO pass.')
  }
  const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as string[]
  const address = accounts[0]
  if (!address) throw new Error('The wallet did not return an account.')
  let signedIn = false
  try {
    await provider.request({
      method: 'personal_sign',
      params: [CIVIC_MESSAGE, address],
    })
    signedIn = true
  } catch {
    signedIn = false
  }
  return {
    kind: 'evm',
    address,
    label: 'EVM wallet',
    role: 'visitor',
    passId: passIdFor('evm', address),
    connectedAt: new Date().toISOString(),
    signedIn,
  }
}

export function connectDemo(): CivicSession {
  return {
    kind: 'demo',
    address: 'demo-gulf-visitor',
    label: 'DEMO civic pass',
    role: 'visitor',
    passId: 'PXD-VISITOR-7F3A-DEMO',
    connectedAt: new Date().toISOString(),
    signedIn: true,
  }
}
