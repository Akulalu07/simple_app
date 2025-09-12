<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Modal, Button } from '../ui';
  
  export let isOpen = false;
  export let title: string = 'Confirm Action';
  export let message: string = 'Are you sure you want to proceed?';
  export let confirmText: string = 'Confirm';
  export let cancelText: string = 'Cancel';
  export let variant: 'danger' | 'warning' | 'info' = 'danger';
  
  const dispatch = createEventDispatcher();
  
  function confirm() {
    dispatch('confirm');
    isOpen = false;
  }
  
  function cancel() {
    dispatch('cancel');
    isOpen = false;
  }
  
  const iconClasses = {
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  };
  
  const buttonVariant = variant === 'danger' ? 'danger' : 'primary';
</script>

<Modal {isOpen} {title} on:close={cancel}>
  <div class="flex items-center gap-3 mb-4">
    <div class={`h-10 w-10 rounded-full bg-${variant === 'danger' ? 'red' : variant === 'warning' ? 'yellow' : 'blue'}-100 flex items-center justify-center`}>
      <svg class={`h-5 w-5 ${iconClasses[variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <div>
      <h3 class="font-semibold text-gray-900">{title}</h3>
      <p class="text-sm text-gray-500">This action cannot be undone</p>
    </div>
  </div>
  
  <p class="text-gray-700 mb-6">
    {message}
  </p>
  
  <div slot="actions">
    <Button
      variant="ghost"
      size="sm"
      on:click={cancel}
    >
      {cancelText}
    </Button>
    <Button
      variant={buttonVariant}
      size="sm"
      on:click={confirm}
    >
      {confirmText}
    </Button>
  </div>
</Modal>
