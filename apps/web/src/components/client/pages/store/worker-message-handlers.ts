import storeWorker from "@client/pages/store-worker";
import { type SelectorName, type WorkerMessage } from "pages-tool-store-worker";
import { source } from ".";
import type { ReplaySubject } from "rxjs";

function handlers() {
  storeWorker.onmessage = (message: WorkerMessage<SelectorName>) => {
    const { name, payload } = message.data;
    const subject = source[name] as ReplaySubject<any>;
    subject.next(payload);
  };
}

handlers();
