<script lang="ts">
  import CloudArrowDownIcon from "@icons/CloudArrowDownIcon.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import MagnifyingGlassMinusIcon from "@icons/MagnifyingGlassMinusIcon.svelte";
  import MagnifyingGlassPlusIcon from "@icons/MagnifyingGlassPlusIcon.svelte";
  import PhotoIcon from "@icons/PhotoIcon.svelte";
  import XMarkIcon from "@icons/XMarkIcon.svelte";
  import type {
    TextEntity,
    ImageEntity,
    LineEntity,
  } from "pages-tool-store-worker";
  import { createEventDispatcher } from "svelte";
  const MIN_WIDTH = 500;
  const MAX_WIDTH = 1000;
  export let element: TextEntity | ImageEntity | LineEntity;
  export let image: string | undefined;
  let width = MIN_WIDTH;
  const handleDownload = (imageUrl: string) => {
    if (element && document) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${element.order! + 1}_${element.position}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const dispatch = createEventDispatcher();
</script>

<div
  class="bg-secondary-50 flex flex-col items-center rounded shadow-lg h-fit"
  style="width: {width}px"
>
  <div
    class="text-primary-600 flex w-full flex-wrap items-center justify-between p-2"
  >
    <span class="isolate inline-flex rounded-md shadow-sm">
      <button
        on:click={() => (width = MIN_WIDTH)}
        disabled={width <= MIN_WIDTH}
        type="button"
        class={width <= MIN_WIDTH
          ? "relative inline-flex items-center rounded-l-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
          : "relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"}
      >
        Min
      </button>
      <button
        disabled={width <= MIN_WIDTH}
        on:click={() => (width -= 100)}
        type="button"
        class={width <= MIN_WIDTH
          ? "relative -ml-px inline-flex items-center bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
          : "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"}
      >
        <MagnifyingGlassMinusIcon className="h-5 w-5" />
      </button>
      <button
        disabled={width >= MAX_WIDTH}
        on:click={() => (width += 100)}
        type="button"
        class={width >= MAX_WIDTH
          ? "relative -ml-px inline-flex items-center bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
          : "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"}
      >
        <MagnifyingGlassPlusIcon className="h-5 w-5" />
      </button>
      <button
        disabled={width >= MAX_WIDTH}
        type="button"
        on:click={() => (width = MAX_WIDTH)}
        class={width >= MAX_WIDTH
          ? "relative -ml-px inline-flex items-center rounded-r-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
          : "relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"}
      >
        Max
      </button>
    </span>
    <div class="flex items-center">
      {#if element?.position?.startsWith("image")}
        <PhotoIcon className="mr-2 h-8 w-8 rounded" />
      {:else}
        <DocumentTextIcon className=" t mr-2 h-8 w-8 rounded " />
      {/if}
      <h1 class="text-lg capitalize">
        {element.order + 1}.&nbsp;{element.position}&nbsp;
      </h1>
      <button
        on:click={() => image && handleDownload(image)}
        type="button"
        class="bg-secondary-50 hover:bg-secondary-100 focus-visible:outline-secondary-100 text-primary-600 rounded-full p-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <CloudArrowDownIcon className="h-5 w-5" />
      </button>
    </div>

    <button
      on:click={() => dispatch("close")}
      type="button"
      class="bg-secondary-50 hover:bg-secondary-100 focus-visible:outline-secondary-100 text-primary-600 rounded-full p-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <XMarkIcon className="h-6 w-6" />
    </button>
  </div>

  {#if image}
    <img
      class="rounded"
      style="pointer-events: none"
      width="100%"
      height="auto"
      src={image}
      alt="failed"
    />
  {/if}
</div>
