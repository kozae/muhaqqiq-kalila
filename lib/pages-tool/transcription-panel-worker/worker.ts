import { findSyntaxErrors } from "pages-tool-transcription-panel-wasm";
import { TranscriptionWorkerEvent } from ".";

console.log("transcription worker loaded");

let currentLine = -1;
self.onmessage = async (e: MessageEvent<{ type: any; payload: any }>) => {
  switch (e.data.type) {
    case TranscriptionWorkerEvent.VALUE_CHANGE:
      const error = findSyntaxErrors(e.data.payload);
      if (error.length !== 0) {
        self.postMessage({
          type: TranscriptionWorkerEvent.ERROR,
          payload: error,
        });
      } else {
        self.postMessage({ type: TranscriptionWorkerEvent.NO_ERROR });
      }
      break;
    case TranscriptionWorkerEvent.STATISTICS:
      if (e.data.payload.line.number !== currentLine) {
        currentLine = e.data.payload.line.number;
        self.postMessage({
          type: TranscriptionWorkerEvent.LINE_CHANGE,
          payload: currentLine,
        });
      }
      break;
    default:
      break;
  }
};
