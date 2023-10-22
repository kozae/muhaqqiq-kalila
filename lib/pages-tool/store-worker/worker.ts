import { Subject, distinctUntilChanged, filter } from "rxjs";
import { discardStoredUpdates, getDB } from "./src/db";
import {
  type RequestActionName,
  type SelectorName,
  store,
  selectors,
  requestActions,
  type RootState,
} from "./src/store";
import type { BrowserMessage } from "./src/worker-message.models";
import { selectLayout } from "./src/store/selectors";
import { initStoragePersistence } from "./src/db/persistence";

import {
  selectAllImageElements,
  selectAllLines,
  selectAllSegments,
  selectAllTextElements,
} from "./src/store/base-selectors";

const dispatch = (event: any) => self.postMessage(event);

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

const refreshFacsimileSpaceData = (data: RootState) => {
  dispatch({ name: "selectLayout", payload: selectLayout(data) });
};

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

    if (stateId > 0 && stateId !== data.info?.number) {
      // when the state id is the page number, this means it is the initailly fetched state
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

    if (data.lastAction === "discardUpdates") {
      self.postMessage('discard')
    }
  });

infoStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.info) {
      await getDB().info.put({
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
      await getDB().lines.put({
        id: data.info!.id,
        version,
        data: selectAllLines(data.lines),
      });
    }
  });

textStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.text) {
      refreshFacsimileSpaceData(data);
      await getDB().text.put({
        id: data.info!.id,
        version,
        data: selectAllTextElements(data.text),
      });
    }
  });

imagesStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.images) {
      refreshFacsimileSpaceData(data);
      await getDB().images.put({
        id: data.info!.id,
        version,
        data: selectAllImageElements(data.images),
      });
    }
  });
segmentsStateChangedListner
  .pipe(distinctUntilChanged())
  .subscribe(async (version) => {
    const data = store.getState();
    if (data.changed.segments) {
      await getDB().segments.put({
        id: data.info!.id,
        version,
        data: selectAllSegments(data.segments),
      });
    }
  });

await initStoragePersistence();

self.postMessage("READY");
