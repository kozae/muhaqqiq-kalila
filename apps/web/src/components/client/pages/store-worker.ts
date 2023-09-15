import { StoreWorkerEvent } from "pages-tool-store-worker";

const storeWorker = new Worker(
  new URL("pages-tool-store-worker/worker.ts", import.meta.url),
  {
    type: "module",
  },
);

const ready = new Promise<void>((resolve) => {
  storeWorker.onmessage = (event) => {
    if (event.data === StoreWorkerEvent.READY) {
      resolve();
    }
  };
});

await ready;

export default storeWorker;
