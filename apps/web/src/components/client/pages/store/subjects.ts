import type { SelectorName, SelectorReturnType } from "pages-tool-store-worker";
import { ReplaySubject, map } from "rxjs";

export type AppSubject<E extends SelectorName> = ReplaySubject<
  SelectorReturnType<E>
>;

export type AppSubjects = Record<SelectorName, AppSubject<SelectorName>>;

function create<E extends SelectorName>(buffer = 1) {
  return new ReplaySubject<SelectorReturnType<E>>(buffer);
}

export const source = {
  selectHasChanges: create<"selectHasChanges">(),
  selectImageDataUrl: create<"selectImageDataUrl">(),
  selectSummary: create<"selectSummary">(),
  selectPageInfo: create<"selectPageInfo">(),
  selectBasicInfo: create<"selectBasicInfo">(),
  selectLayout: create<"selectLayout">(),
};

export const derived = {
  ready: source.selectBasicInfo.pipe(map((info) => info?.id)),
};
