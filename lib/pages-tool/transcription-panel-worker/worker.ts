import { tokenize } from "pages-tool-transcription-panel-wasm";
import { TranscriptionWorkerEvent } from ".";
import { Subject, debounceTime } from "rxjs";

console.log("transcription worker loaded");

interface TranscriptionError {
  token: string;
  line: number;
  page: number;
  order_in_line: number;
  page_repr: string;
  span: [number, number];
  message: string;
}

const config = `
[[page]]
prefix = "fol."
suffix = "r"

[[page]]
prefix = "fol."
suffix = "v"

[[word]]
label = "Arabic"
char_range = [0x600, 0x60FF]
additional_chars = []
default_state = "sound"


[[prefix]]
symbol = "|"
label = "verse"


[[prefix]]
symbol = "*"
label = "emendation"

[[prefix]]
symbol = "?"
label = "unintelligible"

[[prefix]]
symbol = "؟"
label = "unintelligible"

[[prefix]]
symbol = "!"
label = "error"

[[prefix]]
symbol = "†"
label = "corrupt"

[[brackets]]
open = "("
close = ")"
label = "title"


[[brackets]]
open = "["
close = "]"
label = "superfluous"
skip = true

[[brackets]]
precedence = 0
open = "[["
close = "]]"
label = "cross-out"
skip = true


[[brackets]]
open = "{"
close = "}"
label = "suppletion"


[[brackets]]
open = "<"
close = ">"
label = "added"


[[tag]]
symbol = "***"
label = "lacuna"


[[tag]]
symbol = "..."
label = "damage"
`


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
      const { tokens, errors } = tokenize(e.data.payload.trim(), config);
      if (errors.length !== 0) {
        self.postMessage({
          type: TranscriptionWorkerEvent.ERROR,
          payload: errors.map((e: number) => ({
            type: tokens[e].Error.message,
            string_error: tokens[e].Error.message,
            line: tokens[e].Error.line,
          })),
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
