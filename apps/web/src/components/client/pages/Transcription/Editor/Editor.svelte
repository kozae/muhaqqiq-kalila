<script lang="ts">
  import Codemirror from "./CodeMirror.svelte";
  import { requestAction, requestState, source } from "@client/pages/store";
  import {
    Subject,
    Subscription,
    combineLatest,
    debounceTime,
    filter,
    map,
    tap,
    withLatestFrom,
  } from "rxjs";
  import { getContext, onDestroy } from "svelte";
  import { selectedTextClass } from "../selected-text-class";
  import Loading from "@client/reusable/Loading.svelte";
  import { segmentsEnabledToggle } from "../segment-markers-toggle";
  import { locateSegments, segmentWatcher } from "../segment-watcher";

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
  const changeSub = Subscription.EMPTY;

  const units = source.selectUnits.pipe(
    tap(() => {
      render = Date.now();
    }),
  );

  const ids$ = combineLatest([source.selectLineIds, selectedTextClass]).pipe(
    map(([ids, selected]) =>
      selected === "Body" ? ids.body : ids.glosses[selected],
    ),
  );

  $: {
    segmentWatcher.next(locateSegments($data?.segments ?? []));
    render = Date.now();
  }

  changes
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
          units={$units?.units.filter((u) => u.segment === undefined) ?? []}
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
