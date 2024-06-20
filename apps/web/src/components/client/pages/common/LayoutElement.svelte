<script lang="ts">
  import type {
    ILayoutElement,
    ImageEntity,
    LineEntity,
    TextEntity,
  } from "pages-tool-store-worker";
  import { createEventDispatcher, getContext } from "svelte";
  import PhotoIcon from "@icons/PhotoIcon.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import TrashIcon from "@icons/TrashIcon.svelte";
  import EyeIcon from "@icons/EyeIcon.svelte";
  import PencilSquareIcon from "@icons/PencilSquareIcon.svelte";
  import HighlightIcon from "@icons/HighlightIcon.svelte";
  import HideImageIcon from "@icons/HideImageIcon.svelte";
  import Tooltip from "@client/reusable/Tooltip.svelte";
  import { regionUrl, requestRegion } from "../facsimile-worker";
  import { filter, map, skipWhile } from "rxjs";
  import Moveable from "svelte-moveable";
  import RegionPreview from "./RegionPreview.svelte";
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import Menu from "@client/reusable/Menu.svelte";
  import { imageElementTypes, textElementTypes } from "./element-types";

  export let el: TextEntity | ImageEntity | LineEntity | undefined;
  export let canDelete: boolean = false;
  export let idle: boolean = false;
  const pageId: string = getContext("id");
  requestRegion(el! as ILayoutElement, pageId);

  let showPreview = false;
  let previewTraget: HTMLElement | null = null;
  const throttleDrag = 1;
  const edgeDraggable = false;
  const startDragRotate = 0;
  const throttleDragRotate = 0;

  const regionIshovered = hoveredRegion$.pipe(map((v) => v === el?.id));
  const url = regionUrl.pipe(
    skipWhile((v) => v.pageId !== pageId),
    filter((v) => v.id === el?.id),
    map((v) => v.region),
  );

  const dispatch = createEventDispatcher();

  function toggleHighlightedRegion(id?: string) {
    hoveredRegion$.next(id);
  }

  function toggleZoomedRegion(id: string | undefined) {
    dispatch("toggleZoomedRegion", id);
    showPreview = !showPreview;
  }

  function editRegion(id?: string) {
    dispatch("editRegion", id);
  }

  function changeType(newType?: string) {
    dispatch("changeType", newType);
  }

  function deleteElement(id?: string) {
    dispatch("deleteElement", id);
  }
  const twCLass = "m-1 flex items-center  rounded p-1";
  const borderColor = `rgba(${el?.color ?? "240,239,60"}, 0.6)`;
  const backgroundColor = `rgba(${el?.color ?? "240,239,60"}, 0.3)`;
  const imageMask = idle
    ? "rgba(255,255,255, 0.5)"
    : ` rgba(${el?.color ?? "240,239,60"}, 0.5)`;
  const style = idle
    ? "border: thick solid black"
    : `border: solid 3px ${borderColor}; background-color: ${backgroundColor}`;

  function copyIdToClipboard() {
    navigator.clipboard.writeText(el?.id ?? "");
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={twCLass}
  {style}
  on:mouseenter={() => !idle && toggleHighlightedRegion(el?.id)}
  on:mouseleave={() => !idle && toggleHighlightedRegion(undefined)}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="flex items-center" on:click={() => copyIdToClipboard()}>
    {#if el?.position?.startsWith("image")}
      <PhotoIcon className="text-primary-500 mr-2 h-8 w-8 rounded" />
    {:else}
      <DocumentTextIcon className="text-primary-500 t mr-2 h-8 w-8 rounded " />
    {/if}
    <h1 class="text-xl">
      {(el?.order ?? 0) + 1}. {el?.position}
    </h1>
    {#if el?.position !== "line" && !idle}
      <Menu
        hoverBg=""
        bg=""
        items={canDelete || el?.position?.startsWith("image")
          ? [...textElementTypes, ...imageElementTypes]
          : textElementTypes}
        on:itemClick={(event) => changeType(event.detail)}
      >
        <PencilSquareIcon
          slot="prefixIcon"
          className="text-primary-500 hover:text-secondary-700 mr-2 h-4 w-4 rounded"
        />
      </Menu>
    {/if}
  </div>

  <div class="{idle ? 'h-24' : 'h-12'} grow mx-2 flex justify-center relative">
    <div
      class={$regionIshovered
        ? "h-full w-full rounded-full"
        : "h-full w-1/2 rounded-full"}
      style={`background-image: url(${$url}); background-position: center; background-repeat: no-repeat;`}
    >
      <div
        class="h-full w-full rounded-full"
        style={!$regionIshovered ? `background-color: ${imageMask}` : undefined}
      ></div>
    </div>
  </div>

  <div class="flex items-center">
    {#if !idle && canDelete}
      <button on:click={() => deleteElement(el?.id)}>
        <TrashIcon
          className="hover:text-secondary-700 mr-2 h-4 w-4 rounded text-red-500"
        />
      </button>
    {/if}

    <slot name="dragHandle" />

    {#if !el?.region}
      <Tooltip message="no facsimile region defined">
        <HideImageIcon className="mr-2  h-8 w-8 rounded text-gray-500" />
      </Tooltip>
    {/if}

    {#if el?.region}
      <button on:click={() => toggleZoomedRegion(el?.id)}>
        <EyeIcon
          className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
        />
      </button>
      {#if showPreview}
        <div
          bind:this={previewTraget}
          class="fixed top-0 left-0 z-50 h-fit w-fit"
          style="border: none;"
        >
          <RegionPreview
            element={el}
            image={$url}
            on:close={() => (showPreview = false)}
          />
        </div>
        <Moveable
          target={previewTraget}
          origin={false}
          edge={false}
          draggable={true}
          {throttleDrag}
          {edgeDraggable}
          {startDragRotate}
          {throttleDragRotate}
          on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
          }}
        ></Moveable>
      {/if}
    {/if}
    {#if !idle}
      <button on:click={() => editRegion(el?.id)}>
        <HighlightIcon
          className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
        />
      </button>
    {/if}
  </div>
</div>
