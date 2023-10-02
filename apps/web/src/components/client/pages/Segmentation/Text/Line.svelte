<script lang="ts">
  import type {
    SegmentEndMark,
    SegmentStartMark,
    TextToken,
  } from "pages-tool-store-worker";
  import { createEventDispatcher } from "svelte";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import StartMark from "./Marks/StartMark.svelte";
  import EndMark from "./Marks/EndMark.svelte";

  export let items: (TextToken | SegmentStartMark | SegmentEndMark)[] = [];
  export let index: number;

  const color = index % 2 === 0 ? "bg-gray-100" : "bg-white";
  const dispatch = createEventDispatcher();

  let dragDisabled = true;
  const flipDurationMs = 200;

  function handleConsider(e: any) {
    const {
      items: newItems,
      info: { source, trigger, id },
    } = e.detail;

    dispatch("consider", { items: newItems, trigger, id, index });

    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      dragDisabled = true;
    }
  }

  function handleFinalize(e: any) {
    const {
      items: newItems,
      info: { source, trigger, id },
    } = e.detail;

    dispatch("finalize", { items: newItems, trigger, id, index });

    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
  }
</script>

<div class="flex min-w-fit self-stretch {color} py-2">
  <div
    class="text-lg font-bold w-8 text-center border-l-2 border-secondary-900 ml-1"
  >
    {index + 1}
  </div>
  <div
    class="flex w-auto"
    on:consider={handleConsider}
    use:dndzone={{ items, dragDisabled, flipDurationMs }}
    on:finalize={handleFinalize}
  >
    {#each items as item (item.id)}
      {#if item.type === "token"}
        <div class="text-lg ml-1 font-semibold font-arabicnoto">
          {item.raw}
        </div>
      {:else if item.type === "start"}
        <StartMark {item} bind:dragDisabled />
      {:else if item.type === "end"}
        <EndMark {item} bind:dragDisabled />
      {/if}
    {/each}
  </div>
</div>
