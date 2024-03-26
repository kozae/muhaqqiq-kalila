import type { UnitEntity, UnitSegmentInfo } from "pages-tool-store-worker";
import { ReplaySubject, Subject } from "rxjs";

export const segmentWatcher = new ReplaySubject<
  Record<string, UnitSegmentInfo>
>(1);

export const insertSegment = new Subject<{
  operation: string;
  unit: UnitEntity;
}>();
