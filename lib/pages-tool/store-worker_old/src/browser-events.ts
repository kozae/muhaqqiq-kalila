import type { Page } from "kalila-graphql";
import type { PagesToolState } from "..";

export type PageInfoUpdate = {
  commentary?: string | null;
  foliation?: string | null;
  pagination?: number | null;
  tags?: string | null;
};
export enum StoreBrowserEvent {
  LOAD_STATE,
  DISCARD_CHANGES,
  REQUEST_STATE,
  REQUEST_AGGREGATION,
  UPDATE_INFO,
}

export type LoadState = {
  event: StoreBrowserEvent.LOAD_STATE;
  payload?: Page & { imageDataUrl: string; siglum: string };
};

export type DiscardChanges = {
  event: StoreBrowserEvent.DISCARD_CHANGES;
};

export type RequestState = {
  event: StoreBrowserEvent.REQUEST_STATE;
  payload: keyof PagesToolState;
};

export type StateAggregations = "summary" | "layout" | "page-elements";

export type RequestAggregation = {
  event: StoreBrowserEvent.REQUEST_AGGREGATION;
  payload: StateAggregations;
};

export type UpdateInfo = {
  event: StoreBrowserEvent.UPDATE_INFO;
  payload: PageInfoUpdate;
};

export type StoreBrowserMessageData =
  | LoadState
  | DiscardChanges
  | RequestState
  | RequestAggregation
  | UpdateInfo;
export type StoreBrowserMessage = MessageEvent<StoreBrowserMessageData>;
