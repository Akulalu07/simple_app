import { useEffect, useState } from 'react'

interface ApiResponse {
  message: string
}

function App() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    fetch('/api/hello')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: ApiResponse = await res.json()
        setMessage(data.message || 'Hello world')
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 via-pink-900 to-rose-900">
      {/* Spectacular animated background */}
      <div className="absolute inset-0">
        {/* Multiple gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-transparent to-pink-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/20 via-transparent to-purple-500/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/20 via-transparent to-orange-500/20"></div>
        
        {/* Spectacular animated orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-6000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-8000"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          >
            <div className={`w-2 h-2 ${
              i % 6 === 0 ? 'bg-cyan-400' : 
              i % 6 === 1 ? 'bg-pink-400' : 
              i % 6 === 2 ? 'bg-yellow-400' : 
              i % 6 === 3 ? 'bg-emerald-400' :
              i % 6 === 4 ? 'bg-purple-400' : 'bg-orange-400'
            } rounded-full opacity-60 animate-pulse`}></div>
          </div>
        ))}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation Buttons - Spectacular */}
        <div className="w-full p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { 
                  name: 'React', 
                  icon: '⚛️', 
                  color: 'from-cyan-500 to-blue-500',
                  hoverColor: 'from-cyan-400 to-blue-400',
                  href: 'https://react.dev'
                },
                { 
                  name: 'Tailwind', 
                  icon: '🎨', 
                  color: 'from-emerald-500 to-teal-500',
                  hoverColor: 'from-emerald-400 to-teal-400',
                  href: 'https://tailwindcss.com'
                },
                { 
                  name: 'Bun', 
                  icon: '🥟', 
                  color: 'from-yellow-500 to-orange-500',
                  hoverColor: 'from-yellow-400 to-orange-400',
                  href: 'https://bun.sh'
                },
                { 
                  name: 'Go Fiber', 
                  icon: '🚀', 
                  color: 'from-purple-500 to-pink-500',
                  hoverColor: 'from-purple-400 to-pink-400',
                  href: 'https://docs.gofiber.io'
                }
              ].map((item, index) => (
                <a
                  key={item.name}
                  className={`group relative overflow-hidden transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition duration-500 animate-pulse`}></div>
                  <div className={`relative bg-gradient-to-br ${item.color}/20 hover:${item.hoverColor}/40 rounded-2xl px-8 py-4 border border-white/30 backdrop-blur-xl group-hover:border-white/60 transition-all duration-500 shadow-2xl`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:animate-bounce group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                      <span className="font-bold text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Spectacular Centered */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className={`w-full max-w-6xl text-center transition-all duration-1500 transform ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
          }`}>
            {/* Main Card - Spectacular */}
            <div className="relative group">
              {/* Multiple glow layers */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-rose-500 to-indigo-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
              
              <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-12 md:p-20 text-white overflow-hidden">
                {/* Animated background pattern inside card */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                                    radial-gradient(circle at 75% 75%, #ec4899 0%, transparent 50%),
                                    radial-gradient(circle at 50% 50%, #10b981 0%, transparent 50%)`,
                    animation: 'pattern-rotate 30s linear infinite'
                  }}></div>
                </div>

                {/* Spectacular Icon */}
                <div className="mb-12 relative z-10">
                  <div className="relative inline-block">
                    <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                    <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 via-rose-500 to-indigo-500 rounded-full blur-lg opacity-40"></div>
                    <div className="relative w-28 h-28 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                      <span className="text-5xl animate-spin-slow">✨</span>
                    </div>
                  </div>
                </div>

                {/* Spectacular Title */}
                <h1 className="text-7xl md:text-9xl font-black mb-8 relative z-10">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                    Hello World
                  </span>
                  <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-yellow-400 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                </h1>

                {/* Spectacular Subtitle */}
                <p className="text-2xl md:text-3xl text-white/80 mb-16 animate-fade-in-up relative z-10">
                  Welcome to the future of web development ✨
                </p>

                {/* Spectacular Message Display */}
                <div className="mb-16 relative z-10">
                  {loading && (
                    <div className="flex items-center justify-center gap-6 text-3xl">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin animation-delay-500"></div>
                      </div>
                      <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-bold">
                        Loading magic...
                      </span>
                    </div>
                  )}
                  
                  {!loading && !error && (
                    <div className="relative group">
                      {/* Multiple glow effects */}
                      <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000 animate-pulse"></div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-rose-500 to-indigo-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
                      
                      <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl p-12 border border-white/30 backdrop-blur-xl group-hover:scale-105 transition-all duration-500">
                        <div className="flex items-center justify-center gap-6">
                          <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
                          <span className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                            {message}
                          </span>
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-ping animation-delay-1000"></div>
                        </div>
                        <div className="mt-6 text-2xl text-white/70 animate-fade-in-up">
                          ✨ Powered by modern technology ✨
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!loading && error && (
                    <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/30 rounded-3xl p-12 backdrop-blur-xl">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl animate-bounce">⚠️</span>
                        <span className="text-2xl text-red-200">Failed to load: {error}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Spectacular Tech Stack Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
                  {[
                    { name: 'React + TypeScript', color: 'from-cyan-500 to-blue-500', icon: '⚛️' },
                    { name: 'Bun + Vite', color: 'from-yellow-500 to-orange-500', icon: '🥟' },
                    { name: 'Tailwind CSS', color: 'from-emerald-500 to-teal-500', icon: '🎨' },
                    { name: 'Go Fiber', color: 'from-purple-500 to-pink-500', icon: '🚀' }
                  ].map((tech, index) => (
                    <div
                      key={tech.name}
                      className={`group relative overflow-hidden transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className={`absolute -inset-2 bg-gradient-to-r ${tech.color} rounded-2xl blur opacity-0 group-hover:opacity-80 transition duration-500`}></div>
                      <div className={`relative bg-gradient-to-r ${tech.color}/20 group-hover:${tech.color}/40 rounded-2xl px-6 py-4 border border-white/30 backdrop-blur-sm group-hover:border-white/60 transition-all duration-500`}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:animate-bounce group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                          <span className="font-bold text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spectacular Footer */}
                <div className="text-center text-lg text-white/60 border-t border-white/20 pt-8 relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-xl">Powered by</span>
                    <code className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-4 py-2 rounded-xl text-purple-200 font-mono border border-purple-400/30 backdrop-blur-sm">
                      Fiber API
                    </code>
                    <span className="text-xl">at</span>
                    <code className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-4 py-2 rounded-xl text-cyan-200 font-mono border border-cyan-400/30 backdrop-blur-sm">
                      /api/hello
                    </code>
                  </div>
                  <div className="text-xl text-white/40 flex items-center justify-center gap-2">
                    <span>Built with</span>
                    <span className="animate-pulse text-2xl">❤️</span>
                    <span>using modern web technologies</span>
                  </div>
                  <div className="mt-4 text-sm text-white/30">
                    ✨ Experience the future of web development ✨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
