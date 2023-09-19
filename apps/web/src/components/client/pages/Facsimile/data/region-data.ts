import activeTool$ from "@client/pages/active-tool";
import imageData$ from "./image-data";
import { derived, source } from "@client/pages/store";
import { combineLatest, map } from "rxjs";
import { getScale } from "../helpers/scale";

const regions$ = combineLatest([
  source.selectLayout,
  activeTool$,
  imageData$,
]).pipe(
  map(([data, tool, imageData]) => {
    if (!imageData) return [];
    const scale = getScale(imageData.scaleRatio);
    if (tool === "layout") {
      return scale(data.elements);
    }
    if (tool === "lines" || tool === "transcription") {
      return scale(data.lines);
    }
    return [];
  }),
);

export default regions$;
