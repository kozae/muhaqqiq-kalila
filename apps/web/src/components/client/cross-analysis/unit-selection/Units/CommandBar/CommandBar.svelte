<script lang="ts">
  import FunnelIcon from "@icons/FunnelIcon.svelte";
  import ChapterSelector from "./ChapterSelector.svelte";
  import { unitFilter } from "../queries";
  import type { IChapter } from "../../chapters";
  import { setQueryParam } from "../chapter-in-url";

  export let currentChapter: IChapter | undefined = undefined;
  function handleInput(e: any) {
    unitFilter.next(e.target?.value ?? "");
  }

  function onSelectedChapter(e: any) {
    currentChapter = e.detail;
    setQueryParam("chapter", e.detail.abbr);
  }
</script>

<div class="flex w-full justify-between font-bold h-fit items-center">
  <ChapterSelector
    text={currentChapter
      ? `${currentChapter.abbr} - ${currentChapter.name}`
      : "Select Chapter"}
    on:selected={onSelectedChapter}
  />
  {#if currentChapter}
    <div>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <FunnelIcon className="h-5 w-5 text-gray-400" />
        </div>
        <!-- @ts-ignore  -->
        <input
          type="text"
          name="text"
          id="text"
          on:input={handleInput}
          class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-900 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  {/if}
</div>
