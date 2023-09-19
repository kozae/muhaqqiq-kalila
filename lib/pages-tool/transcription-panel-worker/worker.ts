import { findSyntaxErrors } from "pages-tool-transcription-panel-wasm";
import { TranscriptionWorkerEvent } from ".";
import { Subject, debounceTime } from "rxjs";

console.log("transcription worker loaded");

const lineWatcher = new Subject<number>();

lineWatcher.pipe(debounceTime(200)).subscribe((line) => {
  self.postMessage({
    type: TranscriptionWorkerEvent.LINE_CHANGE,
    payload: line,
  });
});

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
      const currentLine = e.data.payload.line.number;
      lineWatcher.next(currentLine);

      break;
    default:
      break;
  }
};
