import { type ILayoutElement, highlightColors } from "pages-tool-store-worker";
import type { DetectedRegions } from "../facsimile-events";
import { getSubRegion } from "../math-helpers/polygon.helper";

export function EtlDetectedRegions(data: DetectedRegions) {
  let result: ILayoutElement[] = [];

  for (const regionData of Object.values(data)) {
    result = [
      ...result,
      ...transformKrakenLines(
        [...regionData.points, regionData.rotation],
        regionData.boxes,
      ),
    ];
  }

  return result;
}

function transformKrakenLines(region: number[], lineRegions: number[][]) {
  const lines: ILayoutElement[] = [];
  lineRegions.forEach((lineRegion) => {
    lines.push({
      id: `generated_${Math.floor(Math.random() * 10000)}`,
      order: -1,
      color: highlightColors[lines.length % 13],
      region: getSubRegion(region, region[8], {
        top: lineRegion[0],
        left: lineRegion[1],
        width: lineRegion[2] - lineRegion[0],
        height: lineRegion[3] - lineRegion[1],
      }),
    });
  });

  return lines;
}
