import type { UnitEntity } from "pages-tool-store-worker";
import { BehaviorSubject } from "rxjs";



export const insertableUnitWatcher = new BehaviorSubject<{ chapter: string; units: UnitEntity[] }>({
    chapter: "",
    units: [],
});