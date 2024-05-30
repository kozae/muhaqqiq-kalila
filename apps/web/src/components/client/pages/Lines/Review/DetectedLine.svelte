<script lang="ts">
  import type {
    ILayoutElement,
    LineEntity,
    TextEntity,
  } from "pages-tool-store-worker";

  import ArrowLeftInBox from "@icons/ArrowLeftInBox.svelte";
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import { regionUrl, requestRegion } from "@client/pages/facsimile-worker";
  import { createEventDispatcher, getContext } from "svelte";
  import { skipWhile, filter, map } from "rxjs";
  import TrashIcon from "@icons/TrashIcon.svelte";

  export let el: ILayoutElement;
  export let correspondsTo: LineEntity | TextEntity | undefined;
  const pageId: string = getContext("id");
  requestRegion(el! as ILayoutElement, pageId);

  const regionIshovered = hoveredRegion$.pipe(map((v) => v === el?.id));

  const url = regionUrl.pipe(
    skipWhile((v) => v.pageId !== pageId),
    filter((v) => v.id === el?.id),
    map((v) => v.region),
  );

  function toggleHighlightedRegion(id?: string) {
    hoveredRegion$.next(id);
  }

  const twCLass: string =
    "flex items-center h-12 justify-start w-full rounded p-1 mt-1 mb-1";

  const borderColor = `rgba(${el?.color ?? "240,239,60"}, 0.6)`;
  const backgroundColor = `rgba(${el?.color ?? "240,239,60"}, 0.3)`;
  const style = `border: solid 3px ${borderColor}; background-color: ${backgroundColor}`;
  const imageMask = ` rgba(${el?.color ?? "240,239,60"}, 0.5)`;

  const dispatch = createEventDispatcher();
  const handleDiscard = () => {
    dispatch("discard");
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={twCLass}
  {style}
  on:mouseenter={() => toggleHighlightedRegion(el?.id)}
  on:mouseleave={() => toggleHighlightedRegion(undefined)}
>
  {#if correspondsTo}
    <div class="flex items-center mr-4">
      <ArrowLeftInBox className="w-6 h-6 text-primary-600 p-0" />
      <h1 class="text-l">assign</h1>
    </div>
  {:else}
    <div class="flex items-center mr-4">
      <h1 class="text-l">(discard)</h1>
    </div>
  {/if}

  <slot name="dragHandle" />

  <div class="h-8 grow mx-2 flex justify-center relative">
    <div
      class={$regionIshovered
        ? "h-full w-full rounded-full"
        : "h-full w-1/2 rounded-full"}
      style={`background-image: url(${$url}); background-position: top right; background-repeat: no-repeat;`}
    >
      <div
        class="h-full w-full rounded-full"
        style={!$regionIshovered ? `background-color: ${imageMask}` : undefined}
      ></div>
    </div>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={handleDiscard}>
    <TrashIcon className="w-6 h-6 text-red-600 p-0 cursor-pointer" />
  </div>
</div>
