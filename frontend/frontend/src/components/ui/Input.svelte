<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let value: string = '';
  export let placeholder: string = '';
  // type is not used in the current implementation
  export let variant: 'default' | 'dark' = 'default';
  export let disabled = false;
  export let className: string = '';
  export let rows: number | undefined = undefined;
  export let id: string | undefined = undefined;
  
  const dispatch = createEventDispatcher();
  
  const baseClasses = 'input';
  const variantClasses = {
    default: '',
    dark: 'input-dark'
  };
  
  $: classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    value = target.value;
    dispatch('input', { value });
  }
</script>

{#if rows}
  <textarea
    {id}
    {rows}
    {placeholder}
    {disabled}
    class={classes}
    bind:value
    on:input={handleInput}
  />
{:else}
  <input
    {id}
    type="text"
    {placeholder}
    {disabled}
    class={classes}
    bind:value
    on:input={handleInput}
  />
{/if}
