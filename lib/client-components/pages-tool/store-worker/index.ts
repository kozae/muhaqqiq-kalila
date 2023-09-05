export * from "./page-state-db";

export enum StoreWorkerEvent {
  TEXT_STATE_UPDATE = 1,
  IMAGE_STATE_UPDATE = 2,
  LINE_STATE_UPDATE = 3,
  SEGMENT_STATE_UPDATE = 4,
  DISCARD_ALL = 5,
  FETCH_STATE = 6,
  POST_STATE = 7,
}
