import { BehaviorSubject, Subject } from "rxjs";

export const hoveredRegion$ = new Subject<string | undefined>();
export const regionUnderEdit$ = new Subject<string | undefined>();
const initialPoints: number[] = [100, 100, 250, 100, 250, 250, 100, 250];
export const editRegionPoints$ = new BehaviorSubject<number[]>(initialPoints);
