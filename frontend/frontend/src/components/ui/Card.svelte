<script lang="ts">
  export let variant: 'default' | 'light' = 'default';
  export let className: string = '';
  export let hover = true;
  
  const baseClasses = 'card';
  const variantClasses = {
    default: '',
    light: 'card-light'
  };
  
  $: classes = `${baseClasses} ${variantClasses[variant]} ${hover ? 'hover-lift' : ''} ${className}`;
</script>

<div class={classes}>
  <slot />
</div>
