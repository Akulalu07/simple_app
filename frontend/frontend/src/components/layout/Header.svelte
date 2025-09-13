<script lang="ts">
  import { ThemeSwitcher } from '../features';
  
  export let currentTheme: any;
</script>

<header class="border-b border-white/10 bg-zinc-900/60 backdrop-blur">
  <div class="container h-16 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class={`h-9 w-9 rounded-lg bg-gradient-to-br ${currentTheme.gradient}`}></div>
      <div class="font-semibold tracking-tight gradient-text text-shadow">Simple App</div>
    </div>
    <ThemeSwitcher {currentTheme} on:change />
  </div>
</header>
