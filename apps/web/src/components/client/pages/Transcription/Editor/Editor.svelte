<script lang="ts">
  import Codemirror from "./CodeMirror.svelte";
  import { requestAction, source } from "@client/pages/store";
  import { combineLatest, filter, first, map } from "rxjs";
  import { getContext } from "svelte";
  import { selectedTextClass } from "../selected-text-class";
  import Loading from "@client/reusable/Loading.svelte";

  const id = getContext("id");
  let ids: string[] = [];
  const data = combineLatest([
    source.selectTranscriptionPanelData,
    selectedTextClass,
  ]).pipe(
    filter(([data, _]) => data.id === id),
    map(([data, selected]) =>
      selected === "Body"
        ? { doc: data.body.text.join("\n"), ids: data.body.ids }
        : {
            doc: data.glosses[selected].text.join("\n"),
            ids: data.glosses[selected].ids,
          },
    ),
  );
  $: ids = $data?.ids;

  const handleChanges = (e: any) => {
    requestAction("updateTranscription", { doc: e.detail, ids });
  };
</script>

{#if $data}
  {#key $selectedTextClass}
    <div class="editor-container">
      <Codemirror doc={$data.doc} on:change={handleChanges} />
    </div>
  {/key}
{:else}
  <Loading />
{/if}

<style>
  .editor-container {
    flex-grow: 1;
    min-height: 80%;
    max-height: 100%;
    overflow: auto;
  }
</style>
