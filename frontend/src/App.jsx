import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setMessage(data.message || 'Hello from API')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Hello, World ✨</h1>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">React + Tailwind</span>
        </div>

        <p className="text-white/90 text-lg">
          {loading && 'Loading message...'}
          {!loading && !error && (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              {message}
            </span>
          )}
          {!loading && error && (
            <span className="text-red-200">Failed to load: {error}</span>
          )}
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a className="group rounded-xl border border-white/20 bg-white/5 px-4 py-3 hover:bg-white/10 transition" href="https://react.dev" target="_blank" rel="noreferrer">
            <div className="font-semibold">React Docs</div>
            <div className="text-sm text-white/80 group-hover:text-white/90">Learn modern React</div>
          </a>
          <a className="group rounded-xl border border-white/20 bg-white/5 px-4 py-3 hover:bg-white/10 transition" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
            <div className="font-semibold">Tailwind Docs</div>
            <div className="text-sm text-white/80 group-hover:text-white/90">Build beautiful UIs fast</div>
          </a>
        </div>

        <div className="mt-6 text-xs text-white/70">Powered by Fiber API at <code className="bg-black/30 px-1 py-0.5 rounded">/api/hello</code></div>
      </div>
    </div>
  )
}

export default App
