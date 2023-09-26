import lodash from "lodash";
import type { ILayoutElement } from "pages-tool-store-worker";
import { ReplaySubject } from "rxjs";
import { FacsimileWorkerEvent } from "pages-tool-facsimile-worker";

const facsimileWorker = new Worker(
  new URL("pages-tool-facsimile-worker/worker.ts", import.meta.url),
  {
    type: "module",
  },
);

const ready = new Promise<void>((resolve) => {
  facsimileWorker.onmessage = (event) => {
    if (event.data === "READY") {
      resolve();
    }
  };
});

await ready;

export function requestRegion(el: ILayoutElement, pageId: string, padding = 0) {
  if (!el.region) return;
  facsimileWorker.postMessage({
    type: FacsimileWorkerEvent.PREVIEW,
    payload: {
      id: el.id,
      p: el.region.slice(0, -1),
      r: lodash.last(el.region) || 0,
      padding,
      frameColor: [246, 246, 204],
      pageId,
    },
  });
}

export function removeFromCache(id: string) {
  facsimileWorker.postMessage({
    type: FacsimileWorkerEvent.REMOVE_FROM_CACHE,
    payload: id,
  });
}

export const regionUrl = new ReplaySubject<{
  id: string;
  region: string;
  pageId: string;
}>(1);

export function resetRegionFacsimileCache() {
  facsimileWorker.postMessage({
    type: FacsimileWorkerEvent.RESET_CACHE,
  });
}

facsimileWorker.onmessage = (event) => {
  if (event.data.id) {
    regionUrl.next({
      id: event.data.id,
      region: event.data.region,
      pageId: event.data.pageId,
    });
  }
};

export default facsimileWorker;
