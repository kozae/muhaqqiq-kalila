<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";

  import { EditorView, ViewUpdate } from "@codemirror/view";
  import { EditorState } from "@codemirror/state";
  import { minimalSetup } from "./setup";
  import { editorTheme } from "./editor-theme";
  import { editorKeymap } from "./editor-keymap";
  import { editorHighlights } from "./editor-highlights";
  import { getStatistics } from "./utils";
  import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";
  let klass = "";
  export { klass as class };

  export let doc = "";
  let parent: HTMLDivElement;

  let view: EditorView;

  const worker: Worker = getContext("worker");

  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged) {
      const doc = vu.state.doc;
      const value = doc.toString();
      worker.postMessage({
        type: TranscriptionWorkerEvent.VALUE_CHANGE,
        payload: value,
      });
    }

    const data = getStatistics(vu);
    worker.postMessage({
      type: TranscriptionWorkerEvent.STATISTICS,
      payload: data,
    });
  });

  onMount(() => {
    view = new EditorView({
      state: EditorState.create({
        doc,
        extensions: [
          minimalSetup,
          editorTheme,
          editorKeymap,
          editorHighlights,
          updateListener,
        ],
      }),
      parent,
      root: document,
    });
  });

  onDestroy(() => {
    view.destroy();
  });
</script>

<div bind:this={parent} class={`editor ${klass}`} />

<style lang="scss">
  .editor {
    height: 100%;
    direction: rtl;
  }

  .editor * {
    direction: rtl;
  }

  :global(.cm-line) {
    font-family: "Noto Naskh Arabic", serif !important;
    line-height: 2;
    font-size: 1.3rem;
  }

  :global(.cm-gutterElement) {
    font-family: "Noto Sans Display", sans-serif !important;
    line-height: 2;
    text-align: center;
    vertical-align: middle;
    font-weight: bold;
    font-size: 1.3rem;
  }

  :global(.cm-activeLineGutter) {
    color: white;
    background-color: #0a0f13 !important;
  }
  :global(.highlight-invalid) {
    color: red !important;
  }

  :global(.edition-symbol) {
    color: #4d4d0a;
    font-weight: bold;
  }
  :global(.cm-line:nth-child(odd)) {
    background-color: rgb(243 244 246) !important;
  }
</style>
