<script lang="ts">
  import {
    createEventDispatcher,
    getContext,
    onDestroy,
    onMount,
  } from "svelte";
  import { EditorView, ViewUpdate } from "@codemirror/view";
  import { EditorState } from "@codemirror/state";
  import { minimalSetup } from "./setup";
  import { editorTheme } from "./editor-theme";
  import { editorKeymap } from "./editor-keymap";
  import { editorHighlights } from "./editor-highlights";
  import { getStatistics } from "../utils";
  import { actions, editorStats, sgementWidgetEvents } from "../event-hubs";
  import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";
  import { Subscription } from "rxjs";
  import type { Segment } from "kalila-graphql";

  import { unitInsertionExtension } from "./unit-insertion-extension";
  import { deleteWidgetEffect, unitsInTextFields } from "./unit-in-text-widget";

  import type { UnitEntity } from "pages-tool-store-worker";
  import { cleanUpExtension } from "./cleanup-extension";
  import { deleteClosingWidgetEffect } from "./unit-in-text-widget/effects";

  let klass = "";
  export { klass as class };

  export let segmentsEnabled = false;
  export let doc = "";
  export let segments: (Segment & {
    position: number;
    close?: number;
    isStatic?: boolean;
  })[] = [];
  export let units: UnitEntity[] = [];

  let parent: HTMLDivElement;

  let view: EditorView;

  const worker: Worker = getContext("worker");
  const dispatch = createEventDispatcher();

  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged) {
      const doc = vu.state.doc;
      const value = doc.toString();
      dispatch("docChange", value);
      worker.postMessage({
        type: TranscriptionWorkerEvent.VALUE_CHANGE,
        payload: value,
      });
    }

    const data = getStatistics(vu.state);
    editorStats.next(data);
    worker.postMessage({
      type: TranscriptionWorkerEvent.STATISTICS,
      payload: data,
    });
  });

  let sub: Subscription | undefined = undefined;
  let widgetEventSub: Subscription | undefined = undefined;
  onMount(() => {
    const extensions = [
      minimalSetup,
      editorTheme,
      editorKeymap,
      editorHighlights,
      updateListener,
      cleanUpExtension(),
    ];

    if (segmentsEnabled) {
      extensions.push(
        unitsInTextFields(segments, (marks, doc) => {
          dispatch("segmentationChange", { marks, doc });
        }),
      );
      extensions.push(unitInsertionExtension(units));
    }

    const state = EditorState.create({
      doc,
      extensions,
    });

    view = new EditorView({
      state,
      parent,
      root: document,
    });
    const data = getStatistics(view.state);
    worker.postMessage({
      type: TranscriptionWorkerEvent.STATISTICS,
      payload: data,
    });
    worker.postMessage({
      type: TranscriptionWorkerEvent.VALUE_CHANGE,
      payload: doc,
    });

    if (segmentsEnabled) {
      widgetEventSub = sgementWidgetEvents.subscribe((e) => {
        if (e.type === "delete") {
          view.dispatch({
            effects: deleteWidgetEffect.of({ id: e.payload.id }),
          });
        } else if (e.type === "deleteEnd") {
          view.dispatch({
            effects: deleteClosingWidgetEffect.of({ id: e.payload.id }),
          });
        }
      });
    }

    sub = actions.subscribe((a) => {
      if (a.type === "insert") {
        view.dispatch({
          changes: {
            from: view.state.selection.main.from,
            insert: a.payload,
          },
        });
      } else {
        const selectedText = view.state.selection.ranges.map((r) =>
          state.sliceDoc(r.from, r.to),
        );
        view.dispatch({
          changes: {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to,
            insert: selectedText[0].replace(/[^ \n\u0600-\u06FF]/g, ""),
          },
        });
      }
    });
  });

  onDestroy(() => {
    view.destroy();
    if (sub) {
      sub.unsubscribe();
    }
    if (widgetEventSub) {
      widgetEventSub.unsubscribe();
    }
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
    color: #767015;
    font-weight: bold;
  }
</style>
