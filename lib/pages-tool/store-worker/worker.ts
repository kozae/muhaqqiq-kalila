import { Subject, distinctUntilChanged, filter } from "rxjs";
import { discardStoredUpdates, updatesDB } from "./src/db";
import {
  type RequestActionName,
  type SelectorName,
  store,
  selectors,
  requestActions,
  type RootState,
} from "./src/store";
import type { BrowserMessage } from "./src/worker-message.models";
import { linesAdapter } from "./src/store/slice";
import { selectLayout } from "./src/store/selectors";

console.log("Worker loaded");

const dispatch = (event: any) => self.postMessage(event);

const refreshFacsimileSpaceData = (data: RootState) => {
  dispatch({ name: "selectLayout", payload: selectLayout(data) });
};

self.onmessage = <E extends RequestActionName, T extends SelectorName>(
  message: BrowserMessage<E, T>,
) => {
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

const stateIdListner = new Subject<number>();

store.subscribe(async () => {
  const data = store.getState();
  stateIdListner.next(data.stateId);
});

const infoStateChangedListner = new Subject<boolean>();
const textStateChangedListner = new Subject<boolean>();
const linesStateChangedListner = new Subject<boolean>();
const imagesStateChangedListner = new Subject<boolean>();
const segmentsStateChangedListner = new Subject<boolean>();

stateIdListner
  .pipe(
    distinctUntilChanged(),
    filter((id) => id !== -1),
  )
  .subscribe(async (stateId) => {
    const data = store.getState();
    if (!data.info) return;

    self.postMessage({
      name: "selectBasicInfo",
      payload: {
        id: data.info!.id,
        title: `${data.siglum} (p.${data.info!.number})`,
        hasChanges: Object.values(data.changed).some((v) => v),
      },
    });

    if (stateId > 0) {
      infoStateChangedListner.next(data.changed.info);
      textStateChangedListner.next(data.changed.text);
      linesStateChangedListner.next(data.changed.lines);
      imagesStateChangedListner.next(data.changed.images);
      segmentsStateChangedListner.next(data.changed.segments);

      if (!Object.values(data.changed).some((v) => v)) {
        refreshFacsimileSpaceData(data);
        await discardStoredUpdates(data.info!.id);
      }
    }
  });

infoStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (changed) => {
    if (changed) {
      const data = store.getState();
      const version = Date.now();
      await updatesDB.info.put({
        id: data.info!.id,
        version,
        data: data.info!,
      });
    }
  });

linesStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (changed) => {
    if (changed) {
      const data = store.getState();
      const version = Date.now();

      refreshFacsimileSpaceData(data);
      await updatesDB.lines.put({
        id: data.info!.id,
        version,
        data: linesAdapter.getSelectors().selectAll(data.lines),
      });
    }
  });

self.postMessage("READY");
