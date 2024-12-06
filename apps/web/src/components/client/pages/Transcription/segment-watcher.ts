import type { Segment } from "kalila-graphql";
import type { UnitEntity, UnitSegmentInfo } from "pages-tool-store-worker";
import { ReplaySubject, Subject } from "rxjs";

export const segmentWatcher = new ReplaySubject<
  Record<string, UnitSegmentInfo>
>(1);



export function locateSegments(segments: Segment[]): Record<string, UnitSegmentInfo> {
  const segmentInfoMap: Record<string, UnitSegmentInfo> = {};
  segments.forEach((segment) => {
    if (segment.unit && segment.unit.title) {
      const hasEnd = segment.endLine !== null && segment.endToken !== null;
      const segmentInfo: UnitSegmentInfo = {
        title: segment.unit.title,
        display: segment.unit.commentary || "",
        page: segment.startPage,
        end: segment.endPage,
        line: segment.startLine,
        token: segment.startToken,
        id: segment.id,
        hasEnd: hasEnd,
      };

      segmentInfoMap[segment.unit.id] = segmentInfo;
    }
  });

  return segmentInfoMap;

}