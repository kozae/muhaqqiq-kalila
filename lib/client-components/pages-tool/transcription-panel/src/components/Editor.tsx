import { useRef, useState } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorTheme } from "@helpers/editor-theme";
import { usePageDataStore } from "pages-tool-store";
import { groupBy, orderBy } from "lodash";
import "./Editor.css";
import { useTranscriptionWorker } from "pages-tool-store";
import { editorHighlights } from "@helpers/editor-highlights";
import { editorKeymap } from "@helpers/editor-keymap";
import { editorSetupOptions } from "@helpers/editor-setup-options";
import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";

function ArabicEditor() {
  const store = usePageDataStore();
  const worker = useTranscriptionWorker();
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const [bodyLines, colors] = store(({ lines, text }) => {
    const grouped = groupBy(orderBy(lines, "order"), "elementId");
    const bodyLines = [];
    const colors = [];

    for (const el of text) {
      if (el?.position?.startsWith("main") && grouped[el.id]) {
        for (const line of grouped[el.id]) {
          bodyLines.push(line?.tokens?.join(" "));
          colors.push(line?.color ?? "#fff");
        }
      }
    }

    return [bodyLines, colors];
  });

  const [value, setValue] = useState(bodyLines.join("\n"));

  const onChange = (value: string) => {
    setValue(value);
    worker.postMessage({
      type: TranscriptionWorkerEvent.VALUE_CHANGE,
      payload: value,
    });
  };

  const style = colors
    .map(
      (color, index) => `
          .cm-line:nth-child(${index + 1}) {
            background-color: rgba(${color}, 0.2);
        }
  `
    )
    .join("\n");

  return (
    <div className="editor-container border-primary-500 border">
      <style>{style}</style>
      <CodeMirror
        ref={editorRef}
        className="editor"
        height="100%"
        value={value}
        basicSetup={editorSetupOptions}
        extensions={[editorHighlights, editorKeymap]}
        theme={EditorTheme}
        onChange={onChange}
        onStatistics={(data) => {
          worker.postMessage({
            type: TranscriptionWorkerEvent.STATISTICS,
            payload: data,
          });
        }}
      />
    </div>
  );
}

export default ArabicEditor;
