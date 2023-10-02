<script lang="ts">
  import Tooltip from "@client/reusable/Tooltip.svelte";
  import type { SegmentEndMark } from "pages-tool-store-worker";

  export let dragDisabled: boolean = false;
  export let item: SegmentEndMark;

  function startDrag(e: any) {
    e.preventDefault();
    dragDisabled = false;
  }
  function startDragWithDefault(e: any) {
    dragDisabled = false;
  }
  function handleKeyDown(e: any) {
    if ((e.key === "Enter" || e.key === " ") && dragDisabled)
      dragDisabled = false;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="text-sm font-extralight text-white bg-secondary-700 px-1 rounded ml-1 flex items-center justify-center hover:cursor-grab active:active:cursor-grabbing"
  on:mousedown={startDrag}
  on:touchstart|passive={startDragWithDefault}
  on:keydown={handleKeyDown}
  tabindex={dragDisabled ? 0 : -1}
>
  <Tooltip message={item.title} top="6" translate="" cursor="auto" icon={false}>
    <p>
      End.{item.display}
    </p>
  </Tooltip>
</div>
