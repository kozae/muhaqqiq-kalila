<script lang="ts">
  import Line from "./Line.svelte";
  import type {
    TextToken,
    SegmentStartMark,
    SegmentEndMark,
    UnitSegmentInfo,
  } from "pages-tool-store-worker";
  import type { Segment } from "kalila-graphql";
  import { onDestroy } from "svelte";
  import { insertSegment, segmentWatcher } from "../segment-watcher";
  import { v4 } from "uuid";

  export let data: {
    body: {
      text: (TextToken | SegmentStartMark | SegmentEndMark)[][];
      ids: string[];
    };
    id: string;
    segments: Segment[];
    pageNumber: number;
  };
  let text: (TextToken | SegmentStartMark | SegmentEndMark)[][] =
    data.body.text;

  function locateSegmentStartMarks(
    currenText: (TextToken | SegmentStartMark | SegmentEndMark)[][],
  ) {
    let segmentStarts: Record<string, UnitSegmentInfo> = {};
    currenText.forEach((line, lineIndex) => {
      line.forEach((token) => {
        if (token.type === "start") {
          segmentStarts[token.unitId] = {
            page: data.pageNumber,
            line: lineIndex,
            id: token.id,
          };
        }
      });
    });
    return segmentStarts;
  }

  segmentWatcher.next(locateSegmentStartMarks(text));

  function handleConsider(e: any) {
    const { items: newItems, index } = e.detail;
    text[index] = [...newItems];
    segmentWatcher.next(locateSegmentStartMarks(text));
  }

  function handleFinalize(e: any) {
    const { items: newItems, index } = e.detail;
    text[index] = [...newItems];
    segmentWatcher.next(locateSegmentStartMarks(text));
  }

  const insertSub = insertSegment.subscribe((unit) => {
    const newLine = [
      {
        type: "start",
        id: v4(),
        unitId: unit.id,
        title: unit.title,
        display: `${unit.frame}.${unit.order}`,
      } satisfies SegmentStartMark,
      ...text[0],
    ];

    text[0] = [...newLine];
    segmentWatcher.next(locateSegmentStartMarks(text));
  });

  onDestroy(() => {
    console.log("destroyed");
    insertSub.unsubscribe();
  });
</script>

<div
  class="animate-fade-in w-6/12 h-full scale-90 rounded opacity-0 overflow-auto conatiner"
>
  <div class="flex flex-col min-w-fit">
    {#if text.length > 0}
      {#each text as items, index}
        <Line
          {items}
          {index}
          on:consider={handleConsider}
          on:finalize={handleFinalize}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .conatiner {
    direction: rtl;
  }
</style>
