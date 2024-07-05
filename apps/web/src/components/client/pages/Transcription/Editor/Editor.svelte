<script lang="ts">
  import Codemirror from "./CodeMirror.svelte";
  import { requestAction, requestState, source } from "@client/pages/store";
  import {
    Subject,
    Subscription,
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    startWith,
    tap,
    withLatestFrom,
  } from "rxjs";
  import { getContext, onDestroy } from "svelte";
  import { selectedTextClass } from "../selected-text-class";
  import Loading from "@client/reusable/Loading.svelte";
  import { segmentsEnabledToggle } from "../segment-markers-toggle";
  import { locateSegments, segmentWatcher } from "../segment-watcher";
  import { sgementWidgetEvents } from "../event-hubs";
  import { insertableUnitWatcher } from "./insertable-unit-watcher";
  import type { Segment } from "kalila-graphql";
  import { sortBy } from "lodash";

  const id = getContext("id");
  let render = Date.now();
  const data = combineLatest([
    source.selectTranscriptionPanelData,
    selectedTextClass,
  ]).pipe(
    filter(([data, _]) => data.id === id),
    map(([data, selected]) =>
      selected === "Body"
        ? {
            doc: data.body.text.join("\n"),
            ids: data.body.ids,
            segments: data.segments,
          }
        : {
            doc: data.glosses[selected].text.join("\n"),
            ids: data.glosses[selected].ids,
          },
    ),
  );
  const changes = new Subject<string>();

  const units = source.selectUnits;

  const chapterSub = units
    .pipe(
      map((units) => units.chapter),
      distinctUntilChanged(),
    )
    .subscribe(() => {
      requestState("selectTranscriptionPanelData");
      requestState("selectLineIds");
    });

  const unitsSub = combineLatest([
    units,
    sgementWidgetEvents.pipe(startWith({ type: "dummy", payload: {} })),
  ])
    .pipe(withLatestFrom(insertableUnitWatcher))
    .subscribe(([[loaded, event], present]) => {
      if (
        present.chapter !== loaded.chapter ||
        present.units[0]?.frame !== present.chapter
      ) {
        insertableUnitWatcher.next({
          chapter: loaded.chapter ?? "",
          units: loaded.units.filter((u) => u.segment === undefined),
        });
      } else {
        if (event.type === "add") {
          const inserted = event.payload as { segment: Segment };
          insertableUnitWatcher.next({
            chapter: loaded.chapter ?? "",
            units: present.units.filter((u) => u.id !== inserted.segment.id),
          });
        } else if (event.type === "delete") {
          const deleted = event.payload as { id: string };
          const deletedUnit = loaded.units.find((u) => u.id === deleted.id)!;
          if (deletedUnit && !present.units.find((u) => u.id === deleted.id)) {
            const allUnits = sortBy(
              [...present.units, deletedUnit],
              (u) => u.order,
            );
            insertableUnitWatcher.next({
              chapter: loaded.chapter ?? "",
              units: allUnits,
            });
          }
        }
      }
    });

  const ids$ = combineLatest([source.selectLineIds, selectedTextClass]).pipe(
    map(([ids, selected]) =>
      selected === "Body" ? ids.body : ids.glosses[selected],
    ),
  );

  $: {
    segmentWatcher.next(locateSegments($data?.segments ?? []));
    render = Date.now();
  }

  const changeSub = changes
    .pipe(
      debounceTime(10),
      withLatestFrom(ids$),
      map(([doc, ids]) => ({ doc, ids })),
    )
    .subscribe(({ doc, ids }) => {
      requestAction("updateTranscription", { doc, ids });
      requestState("selectLineIds");
    });

  const handleSegmentationChange = (e: any) => {
    requestAction("updateSegmentation", e.detail);
  };

  onDestroy(() => {
    changeSub.unsubscribe();
    unitsSub.unsubscribe();
    chapterSub.unsubscribe();
  });
</script>

{#key render}
  {#if $data}
    {#key `${$selectedTextClass}_${$segmentsEnabledToggle ? "withSegments" : "noSegments"}_${$units ? $units.chapter : "noUnits"}`}
      <div class="editor-container">
        <Codemirror
          doc={$data.doc}
          on:docChange={(e) => changes.next(e.detail)}
          on:segmentationChange={handleSegmentationChange}
          segments={$data.segments}
          segmentsEnabled={$segmentsEnabledToggle}
        />
      </div>
    {/key}
  {:else}
    <Loading />
  {/if}
{/key}

<style>
  .editor-container {
    flex-grow: 1;
    min-height: 80%;
    max-height: 100%;
    overflow: auto;
  }
</style>
