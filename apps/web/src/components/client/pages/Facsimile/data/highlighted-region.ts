import { hoveredRegion$ } from "@client/pages/facsimile-events";
import { combineLatest, map } from "rxjs";
import regions$ from "./region-data";

const highlightedRegion = combineLatest([hoveredRegion$, regions$]).pipe(
  map(([id, regions]) =>
    id && regions ? regions.find((region) => region.id === id) : undefined,
  ),
);

export default highlightedRegion;
