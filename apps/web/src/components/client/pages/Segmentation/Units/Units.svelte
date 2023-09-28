<script lang="ts">
  import type { IChapter } from "../chapters";
  import ChapterSelector from "./ChapterSelector.svelte";
  let currentChapter: IChapter | undefined = undefined;
</script>

<div
  class="animate-fade-in w-5/12 h-full scale-90 rounded bg-red-100 opacity-0 flex flex-col"
>
  <div class="flex w-full justify-center font-bold">
    <ChapterSelector
      text={currentChapter
        ? `${currentChapter.abbr} - ${currentChapter.name}`
        : "Select Chapter"}
      on:selected={(e) => (currentChapter = e.detail)}
    />
  </div>
</div>
