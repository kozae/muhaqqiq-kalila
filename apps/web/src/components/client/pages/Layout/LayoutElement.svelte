<script lang="ts">
  import type { ImageEntity, TextEntity } from "pages-tool-store-worker";
  import { createEventDispatcher } from "svelte";
  import PhotoIcon from "@icons/PhotoIcon.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import TrashIcon from "@icons/TrashIcon.svelte";
  import ArrowsUpDownIcon from "@icons/ArrowsUpDownIcon.svelte";
  import EyeIcon from "@icons/EyeIcon.svelte";
  import HighlightIcon from "@icons/HighlightIcon.svelte";
  import HideImageIcon from "@icons/HideImageIcon.svelte";
  import Tooltip from "@client/reusable/Tooltip.svelte";

  export let el: TextEntity | ImageEntity | undefined;
  //   export let index: number;
  //   export let highlightedRegion: string | undefined;
  export let canDelete: boolean = false;

  console.log(el);

  const dispatch = createEventDispatcher();

  function toggleHighlightedRegion(id?: string) {
    dispatch("toggleHighlightedRegion", id);
  }

  function toggleZoomedRegion(id: string | undefined) {
    dispatch("toggleZoomedRegion", id);
  }

  function editRegion(id: string) {
    dispatch("editRegion", id);
  }
</script>

<div
  class="m-1 flex items-center justify-between rounded p-4"
  style="border: solid 3px  {`rgba(${
    el?.color ?? '240,239,60'
  }, 0.6)`}; background-color: {`rgba(${el?.color ?? '240,239,60'}, 0.3)`}"
>
  <div class="flex items-center">
    {#if el?.position?.startsWith("image")}
      <PhotoIcon className="text-primary-500 mr-2 h-8 w-8 rounded" />
    {:else}
      <DocumentTextIcon className="text-primary-500 t mr-2 h-8 w-8 rounded " />
    {/if}
    <h1 class="text-xl">
      {(el?.order ?? 0) + 1}. &nbsp; {el?.position}
    </h1>
  </div>

  <div class="flex items-center">
    {#if canDelete}
      <button on:click={() => console.log("removing")}>
        <TrashIcon
          className="hover:text-secondary-700 mr-2 h-4 w-4 rounded text-red-500"
        />
      </button>
    {/if}
    {#if !el?.region}
      <Tooltip message="no facsimile region defined">
        <HideImageIcon className="mr-2  h-8 w-8 rounded text-gray-500" />
      </Tooltip>
    {/if}
    <div class="hover:cursor-grab active:active:cursor-grabbing">
      <ArrowsUpDownIcon className="text-primary-500 mr-2 h-8 w-8 rounded" />
    </div>

    {#if el?.region}
      <button on:click={() => toggleZoomedRegion(el?.id)}>
        <EyeIcon
          className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
        />
      </button>
    {/if}
    <button on:click={() => {}}>
      <HighlightIcon
        className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
      />
    </button>
  </div>
</div>
