<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let className = "";
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch("click")}
  type="button"
  class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-lg font-semibold hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 {className}"
>
  <slot />
</button>
