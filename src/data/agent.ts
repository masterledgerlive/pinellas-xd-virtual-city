import { LAYER_MAP, type LayerId } from '@/data/layers'
import { MUNICIPALITY_MAP } from '@/data/municipalities'

export type ChatRole = 'user' | 'agent' | 'system'

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  agent?: string
}

export const AGENT_ENDPOINT = import.meta.env.VITE_AGENT_URL as string | undefined

export const AGENTS = [
  { id: 'civic', name: 'Civic Agent', focus: 'districts, votes, inclusion' },
  { id: 'pipe', name: 'Pipe Agent', focus: 'water, sewage, reclaimed' },
  { id: 'grid', name: 'Grid Agent', focus: 'power, chargers, outages' },
  { id: 'mobility', name: 'Mobility Agent', focus: 'buses, trails, sky lanes' },
  { id: 'safety', name: 'Safety Agent', focus: 'families, robots, geofences' },
] as const

const greet: ChatMessage = {
  id: 'm0',
  role: 'system',
  text: 'City infrastructure agents are on the map. Click a district or ask a question. Responses in this MVP are local mocks — a real agent backend can plug in via VITE_AGENT_URL.',
}

export const initialMessages: ChatMessage[] = [greet]

function pickAgent(layers: Record<LayerId, boolean>, prompt: string): (typeof AGENTS)[number] {
  const p = prompt.toLowerCase()
  if (p.includes('vote') || p.includes('ledger') || p.includes('pass')) return AGENTS[0]
  if (p.includes('sew') || p.includes('water') || p.includes('pipe') || p.includes('reclaim'))
    return AGENTS[1]
  if (p.includes('power') || p.includes('grid') || p.includes('electric')) return AGENTS[2]
  if (p.includes('bus') || p.includes('drone') || p.includes('fly') || p.includes('transit'))
    return AGENTS[3]
  if (p.includes('safe') || p.includes('kid') || p.includes('robot') || p.includes('parent'))
    return AGENTS[4]
  if (layers.sewage || layers.water) return AGENTS[1]
  if (layers.power) return AGENTS[2]
  if (layers.drone || layers.flying || layers.transit) return AGENTS[3]
  return AGENTS[0]
}

export async function proposeSuggestion(opts: {
  districtId: string | null
  layers: Record<LayerId, boolean>
  prompt: string
}): Promise<ChatMessage> {
  if (AGENT_ENDPOINT) {
    try {
      const res = await fetch(AGENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      })
      if (res.ok) {
        const data = (await res.json()) as { text?: string; agent?: string }
        return {
          id: crypto.randomUUID(),
          role: 'agent',
          agent: data.agent ?? 'Remote agent',
          text: data.text ?? 'The remote agent returned an empty message.',
        }
      }
    } catch {
      // fall through to mock
    }
  }

  const district = opts.districtId ? MUNICIPALITY_MAP[opts.districtId] : null
  const agent = pickAgent(opts.layers, opts.prompt)
  const on = (Object.keys(opts.layers) as LayerId[]).filter((k) => opts.layers[k] && k !== 'municipal')
  const layerBits = on.length
    ? on.map((id) => LAYER_MAP[id].label).join(', ')
    : 'the base municipal map'

  const where = district
    ? `${district.name} (${district.kind}, ${district.region} Pinellas; ${district.pop})`
    : 'county-wide Pinellas'

  const local = district?.note ?? 'Unincorporated and municipal services share this peninsula.'

  let idea = ''
  switch (agent.id) {
    case 'pipe':
      idea = district
        ? `Map ${district.name}’s collection owner (city vs PCU) onto a public “whose pipe?” card so residents never guess who to call. Pair it with a reclaimed-water opt-in that pays a DEMO data dividend when a household reports irrigation hours.`
        : 'Publish a north-Dunn / south-South-Cross-Bayou cartoon diagram in every utility bill — same geography as PLANPinellas, readable by a fifth grader.'
      break
    case 'grid':
      idea =
        'Show PSTA charger uptime next to household outage tickets on the ledger. If a charger is down, the DEMO pass refunds the wait in cents — visible to everyone, not buried in a PDF.'
      break
    case 'mobility':
      idea = district?.region === 'beaches'
        ? `Treat Gulf Boulevard as a last-mile spine: SunRunner (real) + a geofenced drone corridor (concept) that skips school yards. ${district.name} gets a quiet-hours rule the Safety Agent can explain to parents.`
        : 'Extend the SunRunner idea as a US 19 trunk study — Forward Pinellas already plans corridors; the agent’s job is to show trade-offs on this same map.'
      break
    case 'safety':
      idea =
        'Parents stay parents: no extra app homework. Robots (buses, drones, future eVTOL) get hard geofences over playgrounds. Humans keep the sidewalk. Inclusion means Lealman and Palm Harbor see the same layer quality as downtown St. Pete.'
      break
    default:
      idea = `Open a weighted, residency-based vote on one small, real-feeling project in ${where} — shade, a water fountain, a night bus — and list every cent on the visitor ledger.`
  }

  const asked = opts.prompt.trim()
  const text = asked
    ? `${agent.name} heard “${asked.slice(0, 140)}” for ${where}.\n\nWhat already exists: ${local}\nLayers in view: ${layerBits}.\n\nSuggestion: ${idea}\n\nThis is a mock planner, not a live model and not advice.`
    : `${agent.name} on ${where}.\n\n${local}\n\nLooking at ${layerBits}. Suggestion: ${idea}`

  return { id: crypto.randomUUID(), role: 'agent', agent: agent.name, text }
}
