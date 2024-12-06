import imageData$ from "./image-data";
import { combineLatest, map } from "rxjs";
import { getScale } from "../../math-helpers/scale";
import { detectedRegions$ } from "@client/pages/facsimile-events";

const regions$ = combineLatest([detectedRegions$, imageData$]).pipe(
  map(([data, imageData]) => {
    if (!imageData) return [];
    const scale = getScale(imageData.scaleRatio);
    return scale(data);
  }),
);

export default regions$;
