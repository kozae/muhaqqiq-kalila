import { Subject, ReplaySubject } from "rxjs";

export const hoveredRegion$ = new Subject<string | undefined>();
export const regionUnderEdit$ = new ReplaySubject<string | undefined>(1);
export const initialPoints: number[] = [
  100, 100, 250, 100, 250, 250, 100, 250, 0,
];
export const editRegionPoints$ = new ReplaySubject<number[]>();
