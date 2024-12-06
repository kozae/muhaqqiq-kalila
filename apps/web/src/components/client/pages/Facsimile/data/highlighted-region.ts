import { hoveredRegion$ } from "@client/pages/facsimile-events";
import { combineLatest, map, startWith } from "rxjs";
import regions$ from "./region-data";
import preview$ from "./preview-data";

const highlightedRegion = combineLatest([
  hoveredRegion$,
  regions$.pipe(startWith([])),
  preview$.pipe(startWith([])),
]).pipe(
  map(([id, regions, preview]) => {
    if (id) {
      const regionFromRegions = regions.find((region) => region.id === id);
      const regionFromPreview = preview.find((region) => region.id === id);
      if (regionFromRegions) {
        return regionFromRegions;
      } else if (regionFromPreview) {
        return regionFromPreview;
      }
    }
  }),
);

export default highlightedRegion;
