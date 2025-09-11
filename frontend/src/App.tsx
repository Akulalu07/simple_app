import { useEffect, useMemo, useState } from 'react'

interface ApiResponse {
  message: string
}

interface Message {
  id: number
  content: string
  createdAt: string
}

function App() {
  const [hello, setHello] = useState<string>('')
  const [loadingHello, setLoadingHello] = useState<boolean>(true)
  const [helloError, setHelloError] = useState<string>('')

  const [messages, setMessages] = useState<Message[]>([])
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true)
  const [messagesError, setMessagesError] = useState<string>('')

  const [newMessage, setNewMessage] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)

  const loadHello = async () => {
    setLoadingHello(true)
    setHelloError('')
    try {
      const res = await fetch('/api/hello')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ApiResponse = await res.json()
      setHello(data.message || 'Hello world')
    } catch (e: unknown) {
      const err = e as Error
      setHelloError(err.message)
    } finally {
      setLoadingHello(false)
    }
  }

  const loadMessages = async () => {
    setMessagesLoading(true)
    setMessagesError('')
    try {
      const res = await fetch('/api/messages')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Message[] = await res.json()
      setMessages(data)
    } catch (e: unknown) {
      const err = e as Error
      setMessagesError(err.message)
    } finally {
      setMessagesLoading(false)
    }
  }

  useEffect(() => {
    loadHello()
    loadMessages()
  }, [])

  const isSubmitDisabled = useMemo(() => {
    return submitting || newMessage.trim().length === 0 || newMessage.trim().length > 280
  }, [submitting, newMessage])

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitDisabled) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage.trim() })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setNewMessage('')
      await loadMessages()
    } catch (e: unknown) {
      const err = e as Error
      setMessagesError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div className="font-semibold tracking-tight">Simple App</div>
          </div>
          <div className="text-sm text-zinc-500 hidden sm:block">Go Fiber • React • Postgres</div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome / status */}
        <div className="mb-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <div className="text-sm sm:text-base font-medium">
                  {loadingHello ? 'Connecting…' : helloError ? 'Backend unreachable' : hello}
                </div>
              </div>
              <button
                onClick={loadHello}
                className="text-xs sm:text-sm rounded-lg border border-zinc-300 px-3 py-1.5 hover:bg-zinc-50 disabled:opacity-50"
                disabled={loadingHello}
              >
                {loadingHello ? 'Loading' : 'Refresh'}
              </button>
            </div>
            {helloError && (
              <div className="mt-3 text-xs sm:text-sm text-red-600">{helloError}</div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="mb-6">
          <form onSubmit={submitMessage} className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
            <label className="block text-sm font-medium text-zinc-700 mb-2">New message</label>
            <div className="flex items-start gap-3">
              <textarea
                rows={3}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="What’s on your mind?"
                className="flex-1 resize-none rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
              <div className="flex flex-col items-end gap-2">
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600"
                >
                  {submitting ? 'Sending…' : 'Post'}
                </button>
                <div className={`text-xs ${newMessage.trim().length > 280 ? 'text-red-600' : 'text-zinc-500'}`}>
                  {newMessage.trim().length}/280
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Messages */}
        <section className="rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 p-4 sm:p-5">
            <h2 className="font-semibold">Messages</h2>
          </div>

          {/* Loading state */}
          {messagesLoading && (
            <div className="p-5">
              <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-40 rounded bg-zinc-200" />
                    <div className="h-4 w-[85%] rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {!messagesLoading && messagesError && (
            <div className="p-5">
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                Failed to load messages: {messagesError}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!messagesLoading && !messagesError && messages.length === 0 && (
            <div className="p-10 text-center text-sm text-zinc-500">No messages yet. Be the first to post!</div>
          )}

          {/* List */}
          {!messagesLoading && !messagesError && messages.length > 0 && (
            <ul className="divide-y divide-zinc-100">
              {messages.map((m) => (
                <li key={m.id} className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm sm:text-base text-zinc-800">{m.content}</p>
                      <p className="mt-1 text-xs text-zinc-500">{new Date(m.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-20" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Footer actions */}
          <div className="border-t border-zinc-200 p-4 sm:p-5 flex items-center justify-between">
            <span className="text-xs text-zinc-500">{!messagesLoading && !messagesError ? `${messages.length} message${messages.length === 1 ? '' : 's'}` : '—'}</span>
            <button
              onClick={loadMessages}
              className="text-xs sm:text-sm rounded-lg border border-zinc-300 px-3 py-1.5 hover:bg-zinc-50 disabled:opacity-50"
              disabled={messagesLoading}
            >
              {messagesLoading ? 'Loading' : 'Refresh'}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        Built with React, Tailwind, Fiber, and PostgreSQL.
      </footer>
    </div>
  )
}

export default App
