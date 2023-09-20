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
import { imagesAdapter, linesAdapter, textAdapter } from "./src/store/slice";
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
      //@ts-ignore
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

const infoStateChangedListner = new Subject<number>();
const textStateChangedListner = new Subject<number>();
const linesStateChangedListner = new Subject<number>();
const imagesStateChangedListner = new Subject<number>();
const segmentsStateChangedListner = new Subject<number>();

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
    });

    self.postMessage({
      name: "selectBasicInfo",
      payload: {
        id: data.info!.id,
        title: `${data.siglum} (p.${data.info!.number})`,
        hasChanges: Object.values(data.changed).some((v) => v),
      },
    });

    if (stateId > 0) {
      infoStateChangedListner.next(data.stateId);
      textStateChangedListner.next(data.stateId);
      linesStateChangedListner.next(data.stateId);
      imagesStateChangedListner.next(data.stateId);
      segmentsStateChangedListner.next(data.stateId);

      if (!Object.values(data.changed).some((v) => v)) {
        refreshFacsimileSpaceData(data);
        await discardStoredUpdates(data.info!.id);
      }
    }
  });

infoStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.info) {
      await updatesDB.info.put({
        id: data.info!.id,
        version,
        data: data.info!,
      });
    }
  });

linesStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.lines) {
      refreshFacsimileSpaceData(data);
      await updatesDB.lines.put({
        id: data.info!.id,
        version,
        data: linesAdapter.getSelectors().selectAll(data.lines),
      });
    }
  });

textStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.text) {
      refreshFacsimileSpaceData(data);
      await updatesDB.text.put({
        id: data.info!.id,
        version,
        data: textAdapter.getSelectors().selectAll(data.text),
      });
    }
  });

imagesStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.images) {
      refreshFacsimileSpaceData(data);
      await updatesDB.images.put({
        id: data.info!.id,
        version,
        data: imagesAdapter.getSelectors().selectAll(data.images),
      });
    }
  });

self.postMessage("READY");
