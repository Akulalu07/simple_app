<script lang="ts">
  import { onMount } from 'svelte'
  import { Header, Footer } from './components/layout'
  import { MessageForm, MessageList, StatusIndicator, ConfirmDialog } from './components/features'
  import { currentTheme } from './stores/theme'
  import { api } from './utils/api'
  import { ErrorHandler } from './utils/errorHandler'
  import type { Message } from './types'

  let hello = ''
  let loadingHello = true
  let helloError = ''

  let messages: Message[] = []
  let messagesLoading = true
  let messagesError = ''

  let submitting = false
  let deletingMessageId: number | null = null
  let showConfirmDialog = false
  let messageToDelete: number | null = null

  // Theme management
  $: accent = $currentTheme

  async function loadHello() {
    loadingHello = true
    helloError = ''
    try {
      const data = await api.health()
      hello = data.message || 'Hello world'
    } catch (e) {
      helloError = ErrorHandler.handle(e, 'Failed to connect to backend')
    } finally {
      loadingHello = false
    }
  }

  async function loadMessages() {
    messagesLoading = true
    messagesError = ''
    try {
      messages = await api.messages.getAll()
    } catch (e) {
      messagesError = ErrorHandler.handle(e, 'Failed to load messages')
    } finally {
      messagesLoading = false
    }
  }

  async function submitMessage(event: CustomEvent) {
    const { content } = event.detail
    submitting = true
    try {
      await api.messages.create(content)
      await loadMessages()
    } catch (e) {
      messagesError = ErrorHandler.handle(e, 'Failed to create message')
    } finally {
      submitting = false
    }
  }

  function handleDelete(event: CustomEvent) {
    const { id } = event.detail
    messageToDelete = id
    showConfirmDialog = true
  }

  function cancelDelete() {
    showConfirmDialog = false
    messageToDelete = null
  }

  async function confirmDeleteMessage() {
    if (!messageToDelete) return
    
    deletingMessageId = messageToDelete
    showConfirmDialog = false
    
    try {
      await api.messages.delete(messageToDelete)
      await loadMessages()
    } catch (e) {
      messagesError = ErrorHandler.handle(e, 'Failed to delete message')
    } finally {
      deletingMessageId = null
      messageToDelete = null
    }
  }

  function handleThemeChange(event: CustomEvent) {
    const { theme } = event.detail
    currentTheme.set(theme)
  }

  onMount(() => {
    loadHello()
    loadMessages()
  })
</script>

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
  <Header currentTheme={accent} on:change={handleThemeChange} />

  <!-- Main -->
  <main class="container py-10 space-y-6">
    <!-- Welcome / status -->
    <StatusIndicator 
      loading={loadingHello}
      error={helloError}
      message={hello}
      on:refresh={loadHello}
    />

    <!-- Composer -->
    <MessageForm 
      {submitting}
      on:submit={submitMessage}
    />

    <!-- Messages -->
    <MessageList 
      {messages}
      loading={messagesLoading}
      error={messagesError}
      {deletingMessageId}
      {accent}
      on:delete={handleDelete}
      on:refresh={loadMessages}
    />
  </main>

  <Footer />
</div>

<!-- Confirmation Dialog -->
<ConfirmDialog
  isOpen={showConfirmDialog}
  title="Delete Message"
  message="Are you sure you want to delete this message? This action cannot be undone."
  confirmText="Delete Message"
  cancelText="Cancel"
  variant="danger"
  on:confirm={confirmDeleteMessage}
  on:cancel={cancelDelete}
/>