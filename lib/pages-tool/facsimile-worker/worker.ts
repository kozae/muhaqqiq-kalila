import { FacsimileCropper } from "./facsimile-util";

let cropper: any;
let regionCache: Map<string, any> = new Map(); // Cache for regions
console.log("facsimile worker loaded");
self.onmessage = async (e: MessageEvent<{ type: any; payload: any }>) => {
  switch (e.data.type) {
    case 1:
      if (e.data.payload) {
        cropper = FacsimileCropper.new(base46(e.data.payload));
        console.log("cropper loaded");
        regionCache = new Map();
      }

      break;
    case 2:
      if (cropper && e.data.payload) {
        const { p, r, frameColor, padding, id } = e.data.payload;
        const rotation = isNaN(r) ? 0 : r;
        const cacheKey = id;
        let region;
        if (regionCache.has(cacheKey)) {
          region = regionCache.get(cacheKey); // Get region from cache if it exists
        } else {
          const points = new Uint32Array(p);
          const color = new Uint32Array(frameColor);
          region = cropper.get_region(points, rotation, color, padding);
          regionCache.set(cacheKey, region); // Store region in cache
        }
        self.postMessage({ id, region });
      }
      break;

    default:
      break;
  }
};

const base46 = (data: string) =>
  data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

self.postMessage("READY");
