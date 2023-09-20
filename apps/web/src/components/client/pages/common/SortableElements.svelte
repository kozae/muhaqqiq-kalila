<script lang="ts">
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import LayoutElement from "@client/pages/common/LayoutElement.svelte";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import type {
    ImageEntity,
    LineEntity,
    TextEntity,
  } from "pages-tool-store-worker";
  import { flip } from "svelte/animate";
  import ArrowsUpDownIcon from "@icons/ArrowsUpDownIcon.svelte";
  import { createEventDispatcher } from "svelte";

  export let items: (TextEntity | ImageEntity | LineEntity)[] = [];
  export let canDelete: Record<string, boolean> = {};
  export let draggables: string[] | undefined = undefined;
  const dispatch = createEventDispatcher();

  let dragDisabled = true;
  const flipDurationMs = 200;

  const isIdle = (el: TextEntity | ImageEntity | LineEntity) =>
    draggables && !draggables.includes(el.position ?? "");

  function handleConsider(e: any) {
    const {
      items: newItems,
      info: { source, trigger },
    } = e.detail;
    if (draggables && !isIdle(newItems[0])) return;
    items = newItems;
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      dragDisabled = true;
    }
  }
  function handleFinalize(e: any) {
    const {
      items: newItems,
      info: { source },
    } = e.detail;
    if (draggables && !isIdle(newItems[0])) return;
    if (draggables) {
      const processedItems = [newItems[0]];
      let lastIdleIndex = 0;
      let order = 0;
      for (let i = 1; i < newItems.length; i++) {
        if (isIdle(newItems[i])) {
          processedItems.push(newItems[i]);
          lastIdleIndex++;
          order = 0;
        } else {
          processedItems.push({ ...newItems[i], order });
          order++;
        }
      }
      items = processedItems;
    } else {
      items = newItems.map((el: any, i: number) => ({ ...el, order: i }));
    }

    dispatch("orderChanged", items);
    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
  }
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

<PanelContainer>
  <section
    on:consider={handleConsider}
    use:dndzone={{ items, dragDisabled, flipDurationMs }}
    on:finalize={handleFinalize}
  >
    {#each items as el (el.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <LayoutElement
          {el}
          canDelete={canDelete[el.id]}
          idle={isIdle(el)}
          on:toggleHighlightedRegion={(e) =>
            dispatch("toggleHighlightedRegion", e.detail)}
          on:toggleZoomedRegion={(e) =>
            dispatch("toggleZoomedRegion", e.detail)}
          on:editRegion={(e) => dispatch("editRegion", e.detail)}
          on:deleteElement={(e) => dispatch("deleteElement", e.detail)}
        >
          <svelte:fragment slot="dragHandle">
            {#if !draggables || draggables.includes(el.position ?? "")}
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <div
                class="hover:cursor-grab active:active:cursor-grabbing"
                style={dragDisabled ? "cursor: grab" : "cursor: grabbing"}
                on:mousedown={startDrag}
                on:touchstart|passive={startDragWithDefault}
                on:keydown={handleKeyDown}
                tabindex={dragDisabled ? 0 : -1}
              >
                <ArrowsUpDownIcon
                  className="text-primary-500 mr-2 h-8 w-8 rounded"
                />
              </div>
            {/if}
          </svelte:fragment>
        </LayoutElement>
      </div>
    {/each}
  </section>
</PanelContainer>
