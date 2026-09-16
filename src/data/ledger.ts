export type LedgerTx = {
  id: string
  t: string
  actor: string
  memo: string
  cents: number
  kind: 'credit' | 'debit' | 'vote' | 'grant' | 'data-pay'
}

export const DEMO_PASS = {
  id: 'PXD-VISITOR-7F3A-DEMO',
  holder: 'Gulf visitor (demo)',
  chain: 'Pinellas XD Ledger',
  networkNote:
    'DEMO-labeled municipal ledger. Wallets may sign a civic-bind message. No mainnet city money.',
  issued: '2026-09-16',
  expires: '2026-09-23',
  status: 'active-demo',
} as const

export const DEMO_BALANCES = {
  pxdCents: 12847,
  voteWeight: 1.35,
  ballotsCast: 3,
  dataPayCents: 412,
  municipalVisibleCents: 4_128_900,
}

export const DEMO_TX: LedgerTx[] = [
  {
    id: 'tx-001',
    t: '2026-09-16 09:04:01',
    actor: 'Visitor mint',
    memo: 'Issue time-bounded visitor pass (7 days)',
    cents: 0,
    kind: 'credit',
  },
  {
    id: 'tx-002',
    t: '2026-09-16 09:04:02',
    actor: 'PXD treasury (demo)',
    memo: 'Welcome stipend — beach + transit day pass',
    cents: 2500,
    kind: 'credit',
  },
  {
    id: 'tx-003',
    t: '2026-09-16 10:12:44',
    actor: 'PSTA SunRunner (demo fare)',
    memo: 'St. Pete Beach → downtown St. Petersburg',
    cents: -225,
    kind: 'debit',
  },
  {
    id: 'tx-004',
    t: '2026-09-16 11:03:09',
    actor: 'Household data-pay · Gulfport cluster',
    memo: 'Opt-in flood-sensor report (de-identified)',
    cents: 17,
    kind: 'data-pay',
  },
  {
    id: 'tx-005',
    t: '2026-09-16 12:40:18',
    actor: 'City of St. Petersburg (demo spend)',
    memo: 'Shade-sail install · Bayfront playground — public line item',
    cents: -184500,
    kind: 'grant',
  },
  {
    id: 'tx-006',
    t: '2026-09-16 13:15:00',
    actor: 'You',
    memo: 'Weighted vote: YES on Bayfront shade (weight 1.35)',
    cents: 0,
    kind: 'vote',
  },
  {
    id: 'tx-007',
    t: '2026-09-16 16:02:33',
    actor: 'Clearwater Beach trolly (demo)',
    memo: 'Visitor hop-on',
    cents: -50,
    kind: 'debit',
  },
  {
    id: 'tx-008',
    t: '2026-09-16 15:44:02',
    actor: 'Household data-pay · Palm Harbor',
    memo: 'Opt-in heat-index reading',
    cents: 9,
    kind: 'data-pay',
  },
  {
    id: 'tx-009',
    t: '2026-09-16 16:10:55',
    actor: 'Pinellas County Utilities (demo spend)',
    memo: 'Reclaimed-water meter replacement batch — 42 accounts',
    cents: -128847,
    kind: 'grant',
  },
  {
    id: 'tx-010',
    t: '2026-09-16 16:11:01',
    actor: 'You',
    memo: 'Weighted vote: HOLD on meter batch pending night-work plan',
    cents: 0,
    kind: 'vote',
  },
  {
    id: 'tx-011',
    t: '2026-09-16 17:22:07',
    actor: 'Treasure Island (demo)',
    memo: 'Visitor pier access — accountable microcharge',
    cents: -75,
    kind: 'debit',
  },
  {
    id: 'tx-012',
    t: '2026-09-16 18:01:19',
    actor: 'PXD treasury (demo)',
    memo: 'Inclusion top-up: youth + senior fare equity pool',
    cents: 400,
    kind: 'credit',
  },
  {
    id: 'tx-013',
    t: '2026-09-16 18:45:40',
    actor: 'Forward Pinellas (demo spend)',
    memo: 'SunRunner station lighting study — open invoice',
    cents: -9900,
    kind: 'grant',
  },
  {
    id: 'tx-014',
    t: '2026-09-16 19:03:12',
    actor: 'You',
    memo: 'Weighted vote: YES on lighting study (weight 1.35)',
    cents: 0,
    kind: 'vote',
  },
  {
    id: 'tx-015',
    t: '2026-09-16 19:40:00',
    actor: 'Household data-pay · Lealman',
    memo: 'Opt-in transit wait-time diary (3 trips)',
    cents: 36,
    kind: 'data-pay',
  },
]

export function formatCents(cents: number): string {
  const sign = cents < 0 ? '−' : ''
  const abs = Math.abs(cents)
  const dollars = Math.floor(abs / 100)
  const rem = abs % 100
  return `${sign}$${dollars}.${rem.toString().padStart(2, '0')}`
}
