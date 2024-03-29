<script lang="ts">
  import Codemirror from "./CodeMirror.svelte";
  import { requestAction, source } from "@client/pages/store";
  import { combineLatest, filter, map, tap } from "rxjs";
  import { getContext } from "svelte";
  import { selectedTextClass } from "../selected-text-class";
  import Loading from "@client/reusable/Loading.svelte";
  import { segmentsEnabledToggle } from "../segment-markers-toggle";
  import { locateSegments, segmentWatcher } from "../segment-watcher";

  const id = getContext("id");
  let ids: string[] = [];
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
            segFromPrevPage: data.segFromPrevPage,
            segments: data.segments,
          }
        : {
            doc: data.glosses[selected].text.join("\n"),
            ids: data.glosses[selected].ids,
          },
    ),
  );

  const units = source.selectUnits.pipe(
    tap(() => {
      render = Date.now();
    }),
  );

  $: {
    ids = $data?.ids;
    segmentWatcher.next(locateSegments($data?.segments ?? []));
    render = Date.now();
  }

  const handleChanges = (e: any) => {
    requestAction("updateTranscription", { doc: e.detail, ids });
  };
</script>

{#key render}
  {#if $data}
    {#key `${$selectedTextClass}_${$segmentsEnabledToggle ? "withSegments" : "noSegments"}_${$units ? $units.chapter : "noUnits"}`}
      <div class="editor-container">
        <Codemirror
          doc={$data.doc}
          on:change={handleChanges}
          segFromPrevPage={$data.segFromPrevPage}
          segments={$data.segments}
          segmentsEnabled={$segmentsEnabledToggle}
          units={$units.units.filter((u) => u.segment === undefined)}
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
