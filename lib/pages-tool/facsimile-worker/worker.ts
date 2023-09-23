import { FacsimileWorkerEvent } from ".";
import { FacsimileCropper } from "./cropper";

let cropper: any;
let regionCache: Map<string, any> = new Map(); // Cache for regions
self.onmessage = async (e: MessageEvent<{ type: any; payload: any }>) => {
  switch (e.data.type) {
    case FacsimileWorkerEvent.LOAD:
      if (e.data.payload) {
        cropper = FacsimileCropper.new(base46(e.data.payload));
        regionCache = new Map();
      }

      break;
    case FacsimileWorkerEvent.PREVIEW:
      if (cropper && e.data.payload) {
        const { p, r, frameColor, padding, id, pageId } = e.data.payload;
        const rotation = isNaN(r) ? 0 : r;
        const cacheKey = id;
        let region;
        if (regionCache.has(cacheKey)) {
          region = regionCache.get(cacheKey); // Get region from cache if it exists
        } else {
          const points = new Uint32Array(p);
          const color = new Uint32Array(frameColor);
          region = cropper.get_region(points, rotation, color, padding);
          if (!cacheKey.includes("preview")) {
            regionCache.set(cacheKey, region); // Store region in cache
          }
        }
        self.postMessage({ id, region, pageId });
      }
      break;

    case FacsimileWorkerEvent.REMOVE_FROM_CACHE:
      regionCache.delete(e.data.payload);
      break;

    case FacsimileWorkerEvent.RESET_CACHE:
      console.log("resetting cache");
      regionCache = new Map();
      break;

    default:
      break;
  }
};

const base46 = (data: string) =>
  data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

self.postMessage("READY");
