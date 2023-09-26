<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let className: string = "";
  export let disabled: boolean = false;
  const dispatch = createEventDispatcher();
  export let bgcolor: string = "bg-white";
</script>

<button
  {disabled}
  on:click={() => dispatch("click")}
  class="inline-flex items-center gap-x-1.5 rounded-md {bgcolor} px-2.5 py-1.5 text-sm font-semibold {!disabled &&
    'hover:bg-gray-200'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 {className}"
>
  <slot />
</button>
