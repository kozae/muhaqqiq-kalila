import storeWorker from "@client/pages/store-worker";
import {
  StoreWorkerEvent,
  type StoreWorkerMessage,
} from "pages-tool-store-worker";
import * as state$ from "./subjects";

function handlers() {
  storeWorker.onmessage = (message: StoreWorkerMessage) => {
    const { event, payload } = message.data;
    switch (event) {
      case StoreWorkerEvent.STATE_LOADED:
        state$.ready$.next(payload.id);
        state$.title$.next(payload.title);
        state$.hasChanges$.next(payload.hasChanges);
        break;
      case StoreWorkerEvent.STATE_CHANGED:
        state$.hasChanges$.next(payload);
        break;
      case StoreWorkerEvent.INFO_STATE:
        state$.info$.next(payload);
        break;
      case StoreWorkerEvent.SUMMARY:
        state$.summary$.next(payload);
        break;
      case StoreWorkerEvent.IMAGE_DATA_URL:
        state$.imageDataUrl$.next(payload);
        break;
      case StoreWorkerEvent.LAYOUT:
        state$.layout$.next(payload);
        break;
      default:
        break;
    }
  };
}

handlers();
