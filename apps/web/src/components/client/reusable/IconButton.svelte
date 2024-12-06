<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let color = "primary-500";
  let klass = "";
  export { klass as class };
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch("click")}
  class="{klass} text-{color} rounded px-1 hover:bg-{color} hover:text-white transition-colors duration-300 ease-in-out active:bg-{color} active:text-white active:scale-90 active:opacity-75"
>
  <slot />
</button>
