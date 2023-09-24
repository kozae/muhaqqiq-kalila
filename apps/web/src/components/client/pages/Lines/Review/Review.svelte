<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import type {
    ILayoutElement,
    LineEntity,
    TextEntity,
  } from "pages-tool-store-worker";
  import DetectedLine from "./DetectedLine.svelte";
  import StoredLine from "./StoredLine.svelte";
  import InfoAlert from "@client/reusable/InfoAlert.svelte";
  import SmallButton from "@client/reusable/SmallButton.svelte";
  import lodash from "lodash";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import ArrowsUpDownIcon from "@icons/ArrowsUpDownIcon.svelte";
  import { createEventDispatcher } from "svelte";

  export let elements: (TextEntity | LineEntity)[] = [];
  export let detectedLines: ILayoutElement[] = [];

  let items: ILayoutElement[] = [];
  items = [...lodash.orderBy(detectedLines, "region.1")];
  elements.forEach((el, index) => {
    if (el.position !== "line") {
      items.splice(index, 0, el as ILayoutElement);
    }
  });

  function processNewItems(newItems: ILayoutElement[]) {
    let processed = [...newItems].filter(
      (el: any) => el.position === undefined,
    );
    elements.forEach((el, index) => {
      if (el.position !== "line") {
        processed.splice(index, 0, el as ILayoutElement);
      }
    });
    return processed;
  }

  let dragDisabled = true;
  const flipDurationMs = 200;
  function handleConsider(e: any) {
    const {
      items: newItems,
      info: { source, trigger },
    } = e.detail;

    items = processNewItems(newItems);
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
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

  function handleFinalize(e: any) {
    const {
      items: newItems,
      info: { source },
    } = e.detail;

    items = processNewItems(newItems);

    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
  }

  const dispatch = createEventDispatcher();
  function handleDone() {
    const assignedLines: LineEntity[] = [];
    elements.forEach((el, index) => {
      if (el.position === "line") {
        assignedLines.push({
          ...el,
          region: items[index].region,
        } as LineEntity);
      }
    });
    dispatch("reviewDone", assignedLines);
  }
</script>

<CommandBarContainer>
  <div class="w-full flex justify-start">
    <InfoAlert
      width="w-fit"
      message="Assign detected regions to sored lines."
    />
    <SmallButton on:click={handleDone}>Done</SmallButton>
  </div>
</CommandBarContainer>

<PanelContainer classes="w-full">
  <div class="flex w-full h-fit">
    <div class="flex flex-col w-1/6">
      {#each elements as el}
        {#if el.position === "line"}
          <StoredLine {el} />
        {:else}
          <div class="h-16 flex items-center justify-center w-full rounded p-1">
            <h1 class="text-m">
              {(el?.order ?? 0) + 1}. {el?.position}
            </h1>
          </div>
        {/if}
      {/each}
    </div>
    <div
      class="flex flex-col w-5/6"
      on:consider={handleConsider}
      use:dndzone={{ items, dragDisabled, flipDurationMs }}
      on:finalize={handleFinalize}
    >
      {#each items as el, index (el.id)}
        <div animate:flip={{ duration: flipDurationMs }}>
          {#if el.id.startsWith("generated")}
            <DetectedLine {el} correspondsTo={elements[index]}>
              <svelte:fragment slot="dragHandle">
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
              </svelte:fragment>
            </DetectedLine>
          {:else}
            <div
              class="h-16 flex items-center justify-center w-full rounded p-1"
            ></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</PanelContainer>
