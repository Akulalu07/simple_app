<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { themes } from '../../stores/theme';
  
  export let currentTheme: any;
  
  const dispatch = createEventDispatcher();
  
  function selectTheme(theme: any) {
    dispatch('change', { theme });
  }
</script>

<div class="flex items-center gap-2">
  {#each themes as theme}
    <button
      class={`h-6 w-6 rounded-full border border-white/20 hover:scale-110 transition bg-gradient-to-br ${theme.gradient} ${
        currentTheme.name === theme.name ? 'ring-2 ring-white/50' : ''
      }`}
      aria-label={`Accent ${theme.name}`}
      on:click={() => selectTheme(theme)}
      title={theme.name}
    />
  {/each}
</div>
