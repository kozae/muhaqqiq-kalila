import type { PageState } from "..";
import type { ILayout, PageSummary } from "./aggregation.models";

export enum StoreWorkerEvent {
  READY,
  STATE_LOADED,
  STATE_CHANGED,
  INFO_STATE,
  SUMMARY,
  IMAGE_DATA_URL,
  LAYOUT,
}

export type InfoStateInit = {
  event: StoreWorkerEvent.INFO_STATE;
  payload: PageState;
};

export type StateLoaded = {
  event: StoreWorkerEvent.STATE_LOADED;
  payload: { id: string; title: string; hasChanges: boolean };
};

export type StateChanged = {
  event: StoreWorkerEvent.STATE_CHANGED;
  payload: boolean;
};
export type Summary = {
  event: StoreWorkerEvent.SUMMARY;
  payload: PageSummary;
};

export type ImageDataUrl = {
  event: StoreWorkerEvent.IMAGE_DATA_URL;
  payload: string;
};

export type Layout = {
  event: StoreWorkerEvent.LAYOUT;
  payload: ILayout;
};

export type StoreWorkerMessageData =
  | InfoStateInit
  | StateLoaded
  | StateChanged
  | Summary
  | ImageDataUrl
  | Layout;

export type StoreWorkerMessage = MessageEvent<StoreWorkerMessageData>;
