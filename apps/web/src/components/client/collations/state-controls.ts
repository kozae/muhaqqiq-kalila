import { BehaviorSubject, Subject } from "rxjs";

export const collationData = new BehaviorSubject<any>(null);

export const idToSiglum = new BehaviorSubject<Record<string, string>>({});

export const matchPattern = new BehaviorSubject<{ pattern: RegExp; units: Set<number>, columns: Set<number> }>({
    pattern: /^(?!.*).$/,
    units: new Set(),
    columns: new Set(),
});

export interface Update {
    mediumId: string;
    segmentId: string;
    unitId: string;
    pageNumber: number;
    lineNumber: number;
    original: string;
}

export const updateStream = new Subject<Update>();

