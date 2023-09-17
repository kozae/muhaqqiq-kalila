<script lang="ts">
  import { onMount } from "svelte";

  import { EditorView } from "@codemirror/view";
  import { EditorState, type Extension } from "@codemirror/state";
  import { basicSetup } from "./setup.js";
  let klass = "";
  export { klass as class };

  export let doc = "";
  export let extensions: Extension | undefined = undefined;
  let parent: HTMLDivElement;

  let view: EditorView;

  onMount(() => {
    view = new EditorView({
      state: EditorState.create({
        doc,
        extensions: extensions ?? basicSetup,
      }),
      parent,
    });
  });
</script>

<div bind:this={parent} class={`editor ${klass}`} />

<style>
  .editor {
    direction: rtl;
    height: 100%;
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
  .highlight-invalid {
    color: red !important;
  }

  .edition-symbol {
    color: #4d4d0a;
    font-weight: bold;
  }
</style>
