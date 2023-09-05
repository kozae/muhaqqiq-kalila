import { StoreWorkerEvent } from "pages-tool-store-worker";
import { ImagesState, State, TextState } from "./state.model";

export function replaceStoredImages(
  state: State,
  images: ImagesState,
  version: number
) {
  state.messageStoreWorker(StoreWorkerEvent.IMAGE_STATE_UPDATE, {
    id: state.page.id,
    version: version,
    data: images,
  });
}

export function replaceStoredText(
  state: State,
  text: TextState,
  version: number
) {
  state.messageStoreWorker(StoreWorkerEvent.TEXT_STATE_UPDATE, {
    id: state.page.id,
    version: version,
    data: text,
  });
}
