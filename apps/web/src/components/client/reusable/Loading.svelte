<script lang="ts">
  export let classes = "";
  export let dimensions = "h-12 w-12";
  export let color = "secondary-900";
  export let todo = false;
  export let soon = false;
</script>

<div class={`flex flex-col h-full items-center justify-center ${classes}`}>
  <div
    class="border-{color} {dimensions} animate-spin rounded-full border-t-4"
  ></div>
  {#if todo}
    <p class="animate-pulse p-1 text-center text-{color}">todo!</p>
  {/if}
  {#if soon}
    <p class="animate-pulse p-1 text-center text-{color}">coming soon!</p>
  {/if}
</div>
