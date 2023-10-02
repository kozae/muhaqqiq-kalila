import { createEntityAdapter, type Draft } from "@reduxjs/toolkit";
import type {
  TextEntity,
  ImageEntity,
  LineEntity,
  SegmentEntity,
  PageState,
  FetchedState,
  IChangeTracker,
  UnitEntity,
} from ".";

export const textAdapter = createEntityAdapter<TextEntity>();
export const imagesAdapter = createEntityAdapter<ImageEntity>();
export const linesAdapter = createEntityAdapter<LineEntity>();
export const segmentsAdapter = createEntityAdapter<SegmentEntity>();
export const openSegmentsAdapter = createEntityAdapter<SegmentEntity>();
export const unitsAdapter = createEntityAdapter<UnitEntity>();

export const initialState = {
  info: undefined as PageState | undefined,
  imageDataUrl: "" as string | undefined,
  siglum: "",
  text: textAdapter.getInitialState(),
  images: imagesAdapter.getInitialState(),
  lines: linesAdapter.getInitialState(),
  segments: segmentsAdapter.getInitialState(),
  openSegments: openSegmentsAdapter.getInitialState(),
  units: unitsAdapter.getInitialState(),
  chapter: undefined as string | undefined,
  fetched: undefined as FetchedState | undefined,
  changed: {
    info: false,
    text: false,
    images: false,
    lines: false,
    segments: false,
    units: false,
  } as IChangeTracker,
  stateId: -1,
};

export type WritableDraft<T> = { -readonly [K in keyof T]: Draft<T[K]> };

export type State = typeof initialState;

export type WritableState = WritableDraft<State>;
