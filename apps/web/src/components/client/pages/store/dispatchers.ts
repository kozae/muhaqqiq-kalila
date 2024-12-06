import {
  type RequestActionName,
  type RequestActionPayload,
  type SelectorName,
  type SelectorPayload,
} from "pages-tool-store-worker";
import storeWorker from "@client/pages/store-worker";

export function requestState<T extends SelectorName>(
  name: T,
  payload?: SelectorPayload<T>,
) {
  storeWorker.postMessage({ name, payload });
}

export function requestAction<T extends RequestActionName>(
  name: T,
  payload: RequestActionPayload<T>,
) {
  storeWorker.postMessage({ name, payload });
}
