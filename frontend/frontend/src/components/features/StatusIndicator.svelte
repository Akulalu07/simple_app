<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button } from '../ui';
  
  export let loading = false;
  export let error: string | null = null;
  export let message: string = '';
  
  const dispatch = createEventDispatcher();
  
  function refresh() {
    dispatch('refresh');
  }
</script>

<div class="card backdrop-blur-beautiful p-4 sm:p-5 animate-slide-in-up border border-white/10">
  <div class="flex items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class={`h-2.5 w-2.5 rounded-full ${loading || error ? 'bg-amber-500' : 'bg-emerald-500'}`} />
      <div class="text-sm sm:text-base font-medium">
        {#if loading}
          Connecting…
        {:else if error}
          Backend unreachable
        {:else}
          {message}
        {/if}
      </div>
    </div>
    <Button
      variant="secondary"
      size="sm"
      disabled={loading}
      on:click={refresh}
    >
      {loading ? 'Loading' : 'Refresh'}
    </Button>
  </div>
  {#if error}
    <div class="mt-3 text-xs sm:text-sm text-rose-300">{error}</div>
  {/if}
</div>
