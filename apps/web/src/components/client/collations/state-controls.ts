import { BehaviorSubject } from "rxjs";

export const collationData = new BehaviorSubject<any>(null);

export const idToSiglum = new BehaviorSubject<Record<string, string>>({});