import { Subject, distinctUntilChanged } from "rxjs";
import { updatesDB } from "./src/db";
import {
  type RequestActionName,
  type SelectorName,
  store,
  selectors,
  requestActions,
} from "./src/store";
import type { BrowserMessage } from "./src/worker-message.models";

console.log("Worker loaded");

const dispatch = (event: any) => self.postMessage(event);

self.onmessage = <E extends RequestActionName, T extends SelectorName>(
  message: BrowserMessage<E, T>,
) => {
  // console.log(message.data);
  if (message.data.name in requestActions) {
    const action = requestActions[message.data.name as E];
    if (typeof action === "function") {
      store.dispatch(action(message.data.payload! as any) as any);
    }
  }

  if (message.data.name in selectors) {
    const select = selectors[message.data.name as T];
    if (typeof select === "function") {
      const result = select(store.getState());
      dispatch({ name: message.data.name as T, payload: result as any });
    }
  }
};

const stateListner = new Subject<number>();

store.subscribe(async () => {
  const data = store.getState();
  stateListner.next(data.stateId);
  if (!data.info) return;
});

stateListner.pipe(distinctUntilChanged()).subscribe(() => {
  const data = store.getState();
  if (!data.info) return;
  self.postMessage({
    name: "selectBasicInfo",
    payload: {
      id: data.info!.id,
      title: `${data.siglum} (p.${data.info!.number})`,
      hasChanges: data.changed.length > 0,
    },
  });

  if (data.changed.includes("info")) {
    const version = Date.now();
    updatesDB.info.put({
      id: data.info!.id,
      version,
      data: data.info!,
    });
  }
});

self.postMessage("READY");
