<script lang="ts">
  export let classes = "";
  export let todo = false;
  export let soon = false;
</script>

<div class={`flex flex-col h-full items-center justify-center ${classes}`}>
  <div
    class="border-secondary-900 h-12 w-12 animate-spin rounded-full border-t-4"
  ></div>
  {#if todo}
    <p class="animate-pulse p-1 text-center text-secondary-900">todo!</p>
  {/if}
  {#if soon}
    <p class="animate-pulse p-1 text-center text-secondary-900">coming soon!</p>
  {/if}
</div>
