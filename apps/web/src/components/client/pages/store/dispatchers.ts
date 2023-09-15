import {
  StoreBrowserEvent,
  type PagesToolState,
  type StoreBrowserMessageData,
  type StateAggregations,
} from "pages-tool-store-worker";
import storeWorker from "@client/pages/store-worker";

export function postToWorker(message: StoreBrowserMessageData) {
  storeWorker.postMessage(message);
}

export function requestState(key: keyof PagesToolState) {
  postToWorker({ event: StoreBrowserEvent.REQUEST_STATE, payload: key });
}

export function requestAggregation(key: StateAggregations) {
  postToWorker({ event: StoreBrowserEvent.REQUEST_AGGREGATION, payload: key });
}
