<script lang="ts">
  import { onMount } from 'svelte'

  type ApiResponse = { message: string }
  type Message = { id: number; content: string; createdAt: string }

  let hello = ''
  let loadingHello = true
  let helloError = ''

  let messages: Message[] = []
  let messagesLoading = true
  let messagesError = ''

  let newMessage = ''
  let submitting = false

  // Accent theme using Tailwind utilities only
  type Accent = { name: string; gradient: string; ring: string; dotOk: string; dotWarn: string }
  const accents: Accent[] = [
    { name: 'Indigo', gradient: 'from-indigo-500 to-fuchsia-500', ring: 'focus:ring-indigo-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
    { name: 'Cyan', gradient: 'from-cyan-500 to-blue-500', ring: 'focus:ring-cyan-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
    { name: 'Rose', gradient: 'from-rose-500 to-pink-500', ring: 'focus:ring-rose-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
    { name: 'Violet', gradient: 'from-violet-500 to-fuchsia-500', ring: 'focus:ring-violet-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
    { name: 'Emerald', gradient: 'from-emerald-500 to-teal-500', ring: 'focus:ring-emerald-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' }
  ]
  let accent: Accent = accents[0]

  function countValidChars(v: string) {
    return v.trim().length
  }

  $: charCount = countValidChars(newMessage)
  $: submitDisabled = submitting || charCount === 0 || charCount > 280

  async function loadHello() {
    loadingHello = true
    helloError = ''
    try {
      const res = await fetch('/api/hello')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ApiResponse = await res.json()
      hello = data.message || 'Hello world'
    } catch (e) {
      helloError = (e as Error).message
    } finally {
      loadingHello = false
    }
  }

  async function loadMessages() {
    messagesLoading = true
    messagesError = ''
    try {
      const res = await fetch('/api/messages')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Message[] = await res.json()
      messages = data
    } catch (e) {
      messagesError = (e as Error).message
    } finally {
      messagesLoading = false
    }
  }

  async function submitMessage(e: Event) {
    e.preventDefault()
    if (submitDisabled) return
    submitting = true
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage.trim() })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      newMessage = ''
      await loadMessages()
    } catch (e) {
      messagesError = (e as Error).message
    } finally {
      submitting = false
    }
  }

  onMount(() => {
    loadHello()
    loadMessages()
  })
</script>

<style>
  .fade-in { animation: fade-in .35s ease-out both; }
  @keyframes fade-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }
  .pop { animation: pop .2s ease-out both; }
  @keyframes pop { from { transform: scale(.98) } to { transform: scale(1) } }
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
</style>

<div class="min-h-screen relative text-zinc-100 bg-zinc-950">
  <!-- Animated gradient background and orbs (Tailwind utilities only) -->
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.15),transparent_40%)]"></div>
    <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-indigo-500/40 to-fuchsia-500/40"></div>
    <div class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-rose-500/40 to-pink-500/40"></div>
    <div class="absolute top-1/3 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-emerald-500/40 to-teal-500/40"></div>
    <div class="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
  </div>

  <!-- Header -->
  <header class="border-b border-white/10 bg-zinc-900/60 backdrop-blur">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class={`h-9 w-9 rounded-lg bg-gradient-to-br ${accent.gradient}`}></div>
        <div class="font-semibold tracking-tight gradient-text text-shadow">Simple App</div>
      </div>
      <div class="flex items-center gap-2">
        {#each accents as a}
          <button
            class={`h-6 w-6 rounded-full border border-white/20 hover:scale-110 transition bg-gradient-to-br ${a.gradient}`}
            aria-label={`Accent ${a.name}`}
            on:click={() => accent = a}
            title={a.name}
          />
        {/each}
      </div>
    </div>
  </header>

  <!-- Main -->
  <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
    <!-- Welcome / status -->
    <div class="rounded-2xl card-glow backdrop-blur-beautiful p-4 sm:p-5 fade-in border border-white/10">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class={`h-2.5 w-2.5 rounded-full ${loadingHello || helloError ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          <div class="text-sm sm:text-base font-medium">
            {#if loadingHello}
              Connecting…
            {:else if helloError}
              Backend unreachable
            {:else}
              {hello}
            {/if}
          </div>
        </div>
        <button
          on:click={loadHello}
          class="btn-hover rounded-lg px-3 py-1.5 text-sm border border-white/15 bg-white/5 hover:bg-white/10"
          disabled={loadingHello}
        >
          {loadingHello ? 'Loading' : 'Refresh'}
        </button>
      </div>
      {#if helloError}
        <div class="mt-3 text-xs sm:text-sm text-rose-300">{helloError}</div>
      {/if}
    </div>

    <!-- Composer -->
    <form on:submit|preventDefault={submitMessage} class="rounded-2xl card-glow backdrop-blur-beautiful p-4 sm:p-5 space-y-3 pop border border-white/10">
      <label class="block text-sm font-medium text-zinc-300">New message</label>
      <div class="flex items-start gap-3">
        <textarea
          rows={3}
          bind:value={newMessage}
          placeholder="What’s on your mind?"
          class={`flex-1 resize-none rounded-lg border border-white/10 bg-black/30 text-zinc-100 px-3 py-2 focus:outline-none focus:ring-2 ${accent.ring}`}
        />
        <div class="flex flex-col items-end gap-2">
          <button
            type="submit"
            disabled={submitDisabled}
            class={`btn-hover rounded-lg px-4 py-2 text-white font-medium disabled:opacity-50 bg-gradient-to-br ${accent.gradient}`}
          >
            {#if submitting}
              <span class="inline-flex items-center gap-2"><span class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full spin" /> Sending…</span>
            {:else}
              Post
            {/if}
          </button>
          <div class={`text-xs ${charCount > 280 ? 'text-rose-300' : 'text-white/60'}`}>{charCount}/280</div>
        </div>
      </div>
    </form>

    <!-- Messages -->
    <section class="rounded-2xl card-glow backdrop-blur-beautiful overflow-hidden border border-white/10">
      <div class="border-b border-white/10 p-4 sm:p-5 flex items-center justify-between">
        <h2 class="font-semibold">Messages</h2>
        <button
          on:click={loadMessages}
          class="btn-hover rounded-lg px-3 py-1.5 text-sm border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-50"
          disabled={messagesLoading}
        >
          {messagesLoading ? 'Loading' : 'Refresh'}
        </button>
      </div>

      {#if messagesLoading}
        <div class="p-5">
          <div class="animate-pulse space-y-3">
            {#each Array(3) as _, i}
              <div class="space-y-2" key={i}>
                <div class="h-4 w-40 rounded bg-white/10" />
                <div class="h-4 w-[85%] rounded bg-white/10" />
              </div>
            {/each}
          </div>
        </div>
      {:else if messagesError}
        <div class="p-5">
          <div class="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            Failed to load messages: {messagesError}
          </div>
        </div>
      {:else if messages.length === 0}
        <div class="p-10 text-center text-sm text-zinc-300">No messages yet. Be the first to post!</div>
      {:else}
        <ul class="divide-y divide-white/10">
          {#each messages as m (m.id)}
            <li class="p-4 sm:p-5 fade-in">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm sm:text-base text-zinc-100">{m.content}</p>
                  <p class="mt-1 text-xs text-zinc-400">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div class={`h-9 w-9 rounded-full opacity-70 ring-1 ring-white/10 bg-gradient-to-br ${accent.gradient}`} />
              </div>
            </li>
          {/each}
        </ul>
      {/if}

      <div class="border-t border-white/10 p-4 sm:p-5 flex items-center justify-between">
        <span class="text-xs text-zinc-300">{!messagesLoading && !messagesError ? `${messages.length} message${messages.length === 1 ? '' : 's'}` : '—'}</span>
        <span class="text-xs text-zinc-400">Svelte • Tailwind • Fiber • Postgres</span>
      </div>
    </section>
  </main>

  <footer class="mt-12 py-8 text-center text-xs text-zinc-400">
    Built with Svelte, Tailwind, Fiber, and PostgreSQL.
  </footer>
</div>
