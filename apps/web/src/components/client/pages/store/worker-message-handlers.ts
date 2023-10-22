import storeWorker from "@client/pages/store-worker";
import { type SelectorName, type WorkerMessage } from "pages-tool-store-worker";
import { discardFinished, source } from ".";
import type { ReplaySubject } from "rxjs";

function handlers() {
  storeWorker.onmessage = (message: WorkerMessage<SelectorName> | 'discard') => {
    //@ts-ignore
    if (message.data === 'discard') {
      discardFinished.next();
    } else {
      //@ts-ignore
      const { name, payload } = message.data;
      //@ts-ignore
      const subject = source[name] as ReplaySubject<any>;
      subject.next(payload);
    }

  };
}

handlers();
