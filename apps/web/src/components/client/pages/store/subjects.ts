import type { SelectorName, SelectorReturnType } from "pages-tool-store-worker";
import { ReplaySubject, Subject, map } from "rxjs";

export type AppSubject<E extends SelectorName> = ReplaySubject<
  SelectorReturnType<E>
>;

export type AppSubjects = Record<SelectorName, AppSubject<SelectorName>>;

function createReplaySubject<E extends SelectorName>(buffer = 1) {
  return new ReplaySubject<SelectorReturnType<E>>(buffer);
}

function createSubject<E extends SelectorName>() {
  return new Subject<SelectorReturnType<E>>();
}

export const source = {
  selectHasChanges: createReplaySubject<"selectHasChanges">(),
  selectImageDataUrl: createReplaySubject<"selectImageDataUrl">(),
  selectSummary: createReplaySubject<"selectSummary">(),
  selectPageInfo: createReplaySubject<"selectPageInfo">(),
  selectBasicInfo: createReplaySubject<"selectBasicInfo">(),
  selectLayout: createReplaySubject<"selectLayout">(),
  selectLayoutPanelData: createReplaySubject<"selectLayoutPanelData">(),
  selectLinePanelData: createReplaySubject<"selectLinePanelData">(),
  selectTranscriptionPanelData:
    createReplaySubject<"selectTranscriptionPanelData">(),
};

export const derived = {
  ready: source.selectBasicInfo.pipe(map((info) => info?.id)),
};

export const discard = new Subject<void>();
