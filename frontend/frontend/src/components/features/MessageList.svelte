<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, Card, Spinner } from '../ui';
  import type { Message } from '../../types';
  
  export let messages: Message[] = [];
  export let loading = false;
  export let error: string | null = null;
  export let deletingMessageId: number | null = null;
  export let accent: any;
  
  const dispatch = createEventDispatcher();
  
  function confirmDelete(id: number) {
    dispatch('delete', { id });
  }
  
  function refresh() {
    dispatch('refresh');
  }
</script>

<Card className="overflow-hidden border border-white/10">
  <div class="border-b border-white/10 p-4 sm:p-5 flex items-center justify-between">
    <h2 class="font-semibold">Messages</h2>
    <Button
      variant="secondary"
      size="sm"
      disabled={loading}
      on:click={refresh}
    >
      {loading ? 'Loading' : 'Refresh'}
    </Button>
  </div>

  {#if loading}
    <div class="p-5">
      <div class="animate-pulse space-y-3">
        {#each Array(3) as _, i}
          <div class="space-y-2">
            <div class="h-4 w-40 rounded bg-white/10" />
            <div class="h-4 w-[85%] rounded bg-white/10" />
          </div>
        {/each}
      </div>
    </div>
  {:else if error}
    <div class="p-5">
      <div class="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
        Failed to load messages: {error}
      </div>
    </div>
  {:else if messages.length === 0}
    <div class="p-10 text-center text-sm text-zinc-300">No messages yet. Be the first to post!</div>
  {:else}
    <ul class="divide-y divide-white/10">
      {#each messages as m, index (m.id)}
        <li class="p-4 sm:p-5 animate-slide-in-up" style="animation-delay: {index * 0.1}s">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <p class="text-sm sm:text-base text-zinc-100">{m.content}</p>
              <p class="mt-1 text-xs text-zinc-400">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                on:click={() => confirmDelete(m.id)}
                disabled={deletingMessageId === m.id}
                class="btn-hover rounded-lg p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete message"
              >
                {#if deletingMessageId === m.id}
                  <Spinner size="sm" className="text-rose-400" />
                {:else}
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                {/if}
              </button>
              <div class={`h-9 w-9 rounded-full opacity-70 ring-1 ring-white/10 bg-gradient-to-br ${accent.gradient}`} />
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="border-t border-white/10 p-4 sm:p-5 flex items-center justify-between">
    <span class="text-xs text-zinc-300">{!loading && !error ? `${messages.length} message${messages.length === 1 ? '' : 's'}` : '—'}</span>
    <span class="text-xs text-zinc-400">Svelte • Tailwind • Fiber • Postgres</span>
  </div>
</Card>
