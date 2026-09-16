import { Button } from '@/components/ui/Button'
import { initialMessages, proposeSuggestion, type ChatMessage } from '@/data/agent'
import type { LayerId } from '@/data/layers'
import { MUNICIPALITY_MAP } from '@/data/municipalities'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'

type Props = {
  districtId: string | null
  layers: Record<LayerId, boolean>
}

export function AgentPanel({ districtId, layers }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const district = districtId ? MUNICIPALITY_MAP[districtId] : null

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [messages])

  async function send(prompt: string) {
    const text = prompt.trim()
    if (!text && !districtId) return
    const userMsg: ChatMessage | null = text
      ? { id: crypto.randomUUID(), role: 'user', text }
      : null
    if (userMsg) setMessages((m) => [...m, userMsg])
    setBusy(true)
    setDraft('')
    const reply = await proposeSuggestion({ districtId, layers, prompt: text })
    setMessages((m) => [...m, reply])
    setBusy(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send(draft)
  }

  return (
    <section className="glass pointer-events-auto flex min-h-0 flex-1 flex-col rounded-3xl p-3" aria-labelledby="agent-heading">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h2 id="agent-heading" className="display flex items-center gap-2 text-base font-bold">
            <Sparkles className="h-4 w-4" />
            City agents
          </h2>
          <p className="text-[11px] text-[var(--muted)]">
            {district ? `Workspace: ${district.name}` : 'Click a district — the map is the agent’s desk.'}
          </p>
        </div>
        <Button
          variant="outline"
          className="text-xs"
          disabled={busy}
          onClick={() => void send(district ? `What should we try in ${district.name}?` : 'What should Pinellas try first?')}
        >
          Suggest
        </Button>
      </div>
      <div className="chat-scroll min-h-[140px] flex-1 space-y-2 overflow-y-auto pr-1 text-sm">
        {messages.map((m) => (
          <article
            key={m.id}
            className={
              m.role === 'user'
                ? 'ml-8 rounded-2xl bg-[var(--accent)] px-3 py-2 text-[var(--accent-ink)]'
                : 'mr-4 rounded-2xl bg-[var(--panel-2)] px-3 py-2 whitespace-pre-wrap'
            }
          >
            {m.agent && (
              <p className="mb-1 text-[10px] font-semibold tracking-wide uppercase opacity-70">{m.agent}</p>
            )}
            {m.text}
          </article>
        ))}
        {busy && <p className="text-xs text-[var(--muted)]">Agents are sketching on the map…</p>}
        <div ref={endRef} />
      </div>
      <form onSubmit={onSubmit} className="mt-2 flex gap-2">
        <label className="sr-only" htmlFor="agent-input">
          Message city infrastructure agents
        </label>
        <input
          id="agent-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about pipes, buses, votes…"
          className="min-w-0 flex-1 rounded-full border border-[var(--stroke)] bg-[var(--panel-2)] px-3 py-2 text-sm"
        />
        <Button type="submit" disabled={busy}>
          Send
        </Button>
      </form>
    </section>
  )
}
