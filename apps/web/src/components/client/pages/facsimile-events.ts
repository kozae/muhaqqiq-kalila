import type { ILayoutElement } from "pages-tool-store-worker";
import { Subject, ReplaySubject } from "rxjs";

export const hoveredRegion$ = new Subject<string | undefined>();
export const regionUnderEdit$ = new ReplaySubject<string | undefined>(1);
export const initialPoints: number[] = [
  100, 100, 250, 100, 250, 250, 100, 250, 0,
];
export const editRegionPoints$ = new ReplaySubject<number[]>();
export interface DetectedRegions {
  lines: {
    [key: string]: {
      boxes: [number, number, number, number][];
      rotation: number;
      points: number[];
    };
  };
  parameters: {
    text_direction: string;
    threshold: number;
  };
}

export const detectedRegions$ = new ReplaySubject<ILayoutElement[]>(1);
