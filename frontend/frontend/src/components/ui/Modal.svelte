<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  export let isOpen = false;
  export let title: string = '';
  export let className: string = '';
  
  const dispatch = createEventDispatcher();
  
  function close() {
    isOpen = false;
    dispatch('close');
  }
  
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      close();
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
    }
  }
  
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if isOpen}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && close()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    
    <!-- Modal -->
    <div class="relative card-light p-6 max-w-md w-full animate-scale-in {className}">
      {#if title}
        <div class="flex items-center gap-3 mb-4">
          <h3 id="modal-title" class="font-semibold text-gray-900">{title}</h3>
        </div>
      {/if}
      
      <div class="mb-6">
        <slot />
      </div>
      
      <div class="flex gap-3 justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
{/if}
