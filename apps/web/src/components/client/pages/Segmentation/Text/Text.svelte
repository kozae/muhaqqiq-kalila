<script lang="ts">
  import Line from "./Line.svelte";
  import type {
    SegmentStartMark,
    SegmentEndMark,
    SegmentationToken,
    UnitEntity,
    UnitSegmentInfo,
  } from "pages-tool-store-worker";
  import type { Segment } from "kalila-graphql";
  import { onDestroy } from "svelte";
  import { insertSegment, segmentWatcher } from "../segment-watcher";
  import { v4 } from "uuid";
  import { withLatestFrom } from "rxjs";
  import { tagPlacementErrors } from "./check-errors";
  import { locateSegmentStartMarks } from "./locate-marks";
  import { requestAction } from "@client/pages/store";

  export let data: {
    body: {
      text: SegmentationToken[][];
      ids: string[];
    };
    id: string;
    segments: Segment[];
    pageNumber: number;
  };
  let errors: string[] = [];
  const text: SegmentationToken[][] = data.body.text;

  segmentWatcher.next(locateSegmentStartMarks(text, data.pageNumber));

  function handleConsider(e: any) {
    const { items: newItems, index } = e.detail;

    text[index] = [...newItems];
    errors = tagPlacementErrors(text);
    segmentWatcher.next(locateSegmentStartMarks(text, data.pageNumber));
  }

  function handleFinalize(e: any) {
    const { items: newItems, index } = e.detail;

    text[index] = [...newItems];
    errors = tagPlacementErrors(text);
    segmentWatcher.next(locateSegmentStartMarks(text, data.pageNumber));
    requestAction("updateSegmentation", text);
  }

  function createSegmentStartMark(unit: UnitEntity) {
    return {
      type: "start",
      id: `start_${v4()}`,
      unitId: unit.id,
      title: unit.title,
      display: `${unit.frame}.${unit.order}`,
    } satisfies SegmentStartMark;
  }

  function createSegmentEndMark(unit: UnitEntity, closing: UnitSegmentInfo) {
    return {
      type: "end",
      id: `end_${closing.id}`,
      unitId: unit.id,
      title: unit.title,
      display: `${unit.frame}.${unit.order}`,
    } satisfies SegmentEndMark;
  }

  function insertSegmentStartMark(unit: UnitEntity) {
    const newLine = [createSegmentStartMark(unit), ...text[0]];
    text[0] = [...newLine];
  }

  function closeSegment(unit: UnitEntity) {
    const closing = unit.segment!;
    const line = closing.line;
    const index = closing.token + 2;
    const newLine: SegmentationToken[] = [];
    text[line].forEach((token, i) => {
      if (i === index) {
        newLine.push(createSegmentEndMark(unit, closing));
      } else {
        newLine.push(token);
      }
    });
    if (index === text[line].length) {
      newLine.push(createSegmentEndMark(unit, closing));
    }
    text[line] = newLine;
  }

  function replaceSegment(
    unit: UnitEntity,
    segments: Record<string, UnitSegmentInfo>,
    id: string,
  ) {
    const replacing = segments[id];
    const index = text[replacing.line].findIndex(
      (token) => token.id === replacing.id,
    );
    const newLine: SegmentationToken[] = [];
    text[replacing.line].forEach((token, i) => {
      if (i === index) {
        newLine.push(createSegmentStartMark(unit));
      } else {
        newLine.push(token);
      }
    });
    text[replacing.line] = newLine;
  }

  function removeSegment(unit: UnitEntity) {
    const removing = unit.segment!;
    const index = text[removing.line].findIndex(
      (token) => token.id === removing.id,
    );
    const newLine: SegmentationToken[] = [...text[removing.line]].filter(
      (_, i) => i !== index,
    );
    text[removing.line] = newLine;

    text.forEach((line, lineIndex) => {
      const endIndex = line.findIndex(
        (token) => token.type === "end" && token.unitId === unit.id,
      );
      if (endIndex !== -1) {
        const newLine: SegmentationToken[] = [...line].filter(
          (_, i) => i !== endIndex,
        );
        text[lineIndex] = newLine;
      }
    });
  }

  const insertSub = insertSegment
    .pipe(withLatestFrom(segmentWatcher))
    .subscribe(([{ operation, unit }, segments]) => {
      if (operation === "insert") {
        insertSegmentStartMark(unit);
      } else if (operation === "close") {
        closeSegment(unit);
      } else if (operation === "remove") {
        removeSegment(unit);
      } else {
        replaceSegment(unit, segments, operation);
      }

      segmentWatcher.next(locateSegmentStartMarks(text, data.pageNumber));
      errors = tagPlacementErrors(text);
      requestAction("updateSegmentation", text);
    });

  onDestroy(() => {
    insertSub.unsubscribe();
  });
</script>

<div
  class="animate-fade-in w-6/12 h-full flex flex-col scale-90 rounded opacity-0 conatiner"
>
  <div class="w-full overflow-auto grow min-h-[80%] max-h-[100%]">
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
  {#if errors.length > 0}
    <ul class="h-[20%] w-full bg-red-50 error-conatiner">
      {#each errors as error}
        <li class="p-2 font-bold text-red-700">- {error}</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .conatiner {
    direction: rtl;
  }

  .error-conatiner {
    direction: ltr;
  }
</style>
