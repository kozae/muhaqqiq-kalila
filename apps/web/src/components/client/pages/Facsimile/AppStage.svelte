<script lang="ts">
  import { Stage } from "svelte-konva";
  export let width: number;
  export let height: number;
</script>

<Stage
  class="border-secondary-100 border-2 border-solid shadow-lg w-fit h-fit"
  config={{ width, height }}
>
  <slot />
</Stage>
