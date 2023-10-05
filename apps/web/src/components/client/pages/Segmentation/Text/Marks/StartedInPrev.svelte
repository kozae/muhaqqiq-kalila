<script lang="ts">
  import Tooltip from "@client/reusable/Tooltip.svelte";
  import type { SegmentEndFromPreviousPageMark } from "pages-tool-store-worker";

  export let item: SegmentEndFromPreviousPageMark;
</script>

<div
  class="text-sm font-extralight text-secondary-900 border-[2px] border-secondary-900 rounded ml-1 px-1 flex items-center justify-center cursor-default"
>
  <Tooltip message={item.title} top="6" translate="" cursor="auto" icon={false}>
    <p>
      ...{item.display}
    </p>
  </Tooltip>
</div>
