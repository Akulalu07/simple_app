<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, Input } from '../ui';
  
  export let submitting = false;
  // accent prop is used in the template but not in script
  
  const dispatch = createEventDispatcher();
  
  let newMessage = '';
  
  $: charCount = newMessage.trim().length;
  $: submitDisabled = submitting || charCount === 0 || charCount > 280;
  
  function handleSubmit() {
    if (submitDisabled) return;
    dispatch('submit', { content: newMessage.trim() });
    newMessage = '';
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="card backdrop-blur-beautiful p-4 sm:p-5 space-y-3 animate-slide-in-up border border-white/10">
  <label for="message-input" class="block text-sm font-medium text-zinc-300">New message</label>
  <div class="flex items-start gap-3">
    <Input
      id="message-input"
      bind:value={newMessage}
      placeholder="What's on your mind?"
      variant="dark"
      rows={3}
      className="flex-1 resize-none"
    />
    <div class="flex flex-col items-end gap-2">
      <Button 
        type="submit" 
        variant="primary"
        size="md"
        loading={submitting}
        disabled={submitDisabled}
      >
        {submitting ? 'Sending…' : 'Post'}
      </Button>
      <div class={`text-xs ${charCount > 280 ? 'text-rose-300' : 'text-white/60'}`}>
        {charCount}/280
      </div>
    </div>
  </div>
</form>
