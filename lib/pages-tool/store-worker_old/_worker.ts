import { updatesDB } from "./src/db/page-updates-db";
import {
  StoreBrowserEvent,
  type StoreBrowserMessage,
  type PagesToolState,
  StoreWorkerEvent as Event,
  type StoreWorkerMessageData,
  type UpdateInfo,
} from ".";
import { aggregateLayout } from "./src/selectors/aggregate-layout";
import { aggregateSummary } from "./src/selectors/aggregate-summary";
import { loadState } from "./src/actions/load-state";
import { enableMapSet, produce } from "immer";
import { discardStoredUpdates, loadStoredUpdates } from "./src/db";

enableMapSet();

console.log("Worker loaded");

let store: PagesToolState = {
  imageDataUrl: "",
  text: new Map(),
  lines: new Map(),
  images: new Map(),
  segments: new Map(),
  hasChanges: false,
};

let storedFetchedState: PagesToolState = {
  imageDataUrl: "",
  text: new Map(),
  lines: new Map(),
  images: new Map(),
  segments: new Map(),
  hasChanges: false,
};

function dispatch(message: StoreWorkerMessageData) {
  self.postMessage(message);
}

self.onmessage = async (message: StoreBrowserMessage) => {
  switch (message.data.event) {
    case StoreBrowserEvent.LOAD_STATE: {
      const { payload } = message.data;
      if (payload) {
        // const stored = await loadStoredUpdates(payload.id, payload.version!);
        // const hasChanges = Object.values(stored).some((el) => el);
        // const { toolState, fetchedState } = loadState(payload, stored);
        // store = produce(toolState, (draft) => {
        //   draft.hasChanges = hasChanges;
        // });
        // storedFetchedState = produce(fetchedState, (draft) => {});

        dispatch({
          event: Event.STATE_LOADED,
          payload: {
            id: payload.id,
            title: `${payload.siglum} (p.${payload.number})`,
            hasChanges: true,
          },
        });
      }
      break;
    }
    case StoreBrowserEvent.REQUEST_STATE: {
      const { payload } = message.data;
      switch (payload) {
        case "page":
          dispatch({
            event: Event.INFO_STATE,
            payload: store.page!,
          });
          break;
        case "siglum":
          break;
        case "imageDataUrl":
          dispatch({
            event: Event.IMAGE_DATA_URL,
            payload: store.imageDataUrl!,
          });
          break;
        case "text":
          break;
        case "lines":
          break;
        case "images":
          break;
        case "segments":
          break;
      }
      break;
    }

    case StoreBrowserEvent.DISCARD_CHANGES: {
      dispatch({
        event: Event.STATE_CHANGED,
        payload: false,
      });

      await discardStoredUpdates(store.page!.id);
      store = produce(storedFetchedState, (draft) => {});

      dispatch({
        event: Event.STATE_LOADED,
        payload: {
          id: store.page!.id,
          title: `${store.siglum} (p.${store.page!.number})`,
          hasChanges: false,
        },
      });

      break;
    }

    case StoreBrowserEvent.REQUEST_AGGREGATION: {
      const { payload } = message.data;
      switch (payload) {
        case "summary":
          dispatch({
            event: Event.SUMMARY,
            payload: aggregateSummary()(store),
          });
          break;
        case "layout":
          dispatch({
            event: Event.LAYOUT,
            payload: aggregateLayout()(store),
          });
          break;
      }
      break;
    }

    case StoreBrowserEvent.UPDATE_INFO: {
      console.log("updating info");
      const { payload } = message.data as UpdateInfo;
      store = produce(store, (draft) => {
        draft.page!.commentary =
          payload.commentary?.split("\n") ?? draft.page!.commentary;
        draft.page!.foliation = payload.foliation ?? draft.page!.foliation;
        draft.page!.pagination = payload.pagination ?? draft.page!.pagination;
        draft.page!.tags = payload.tags?.split(",") ?? draft.page!.tags;
        draft.hasChanges = true;
      });

      dispatch({
        event: Event.INFO_STATE,
        payload: store.page!,
      });
      dispatch({
        event: Event.STATE_CHANGED,
        payload: true,
      });

      const version = Date.now();
      updatesDB.info.put({ id: store.page!.id, version, data: store.page! });
      break;
    }

    default:
      break;
  }
};

self.postMessage(Event.READY);
