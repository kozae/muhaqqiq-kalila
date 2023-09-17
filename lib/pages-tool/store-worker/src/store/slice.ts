import {
  createEntityAdapter,
  createSlice,
  isFulfilled,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  TextEntity,
  ImageEntity,
  LineEntity,
  SegmentEntity,
  PageState,
  FetchedState,
  PageInfoUpdate,
  IChangeTracker,
} from "./model";
import { loadState } from "./thunks";

export const textAdapter = createEntityAdapter<TextEntity>();
export const imagesAdapter = createEntityAdapter<ImageEntity>();
export const linesAdapter = createEntityAdapter<LineEntity>();
export const segmentsAdapter = createEntityAdapter<SegmentEntity>();

const initialState = {
  info: undefined as PageState | undefined,
  imageDataUrl: "" as string | undefined,
  siglum: "",
  text: textAdapter.getInitialState(),
  images: imagesAdapter.getInitialState(),
  lines: linesAdapter.getInitialState(),
  segments: segmentsAdapter.getInitialState(),
  fetched: undefined as FetchedState | undefined,
  changed: {
    info: false,
    text: false,
    images: false,
    lines: false,
    segments: false,
  } as IChangeTracker,
  stateId: -1,
};

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    updatePageInfo: (state, action: PayloadAction<PageInfoUpdate>) => {
      const { commentary, foliation, pagination, tags } = action.payload;
      if (!state.info) {
        state.info = {} as PageState;
      }
      state.info.commentary = commentary
        ? commentary.split("\n")
        : state.info.commentary;
      state.info.foliation = foliation;
      state.info.pagination = pagination;
      state.info.tags = tags ? tags.split(", ") : state.info.tags;
      state.changed.info = true;
      state.stateId = Date.now();
    },
    updateLines: (
      state,
      action: PayloadAction<(LineEntity | TextEntity)[]>,
    ) => {
      const elements = action.payload;
      let elementId = elements[0].id;
      const lines: LineEntity[] = [];
      for (let i = 1; i < elements.length; i++) {
        if (elements[i].position !== "line") {
          elementId = elements[i].id;
        } else {
          lines.push({ ...elements[i], elementId } as LineEntity);
        }
      }
      state.lines = linesAdapter.setAll(state.lines, lines);
      state.changed.lines = true;
      state.stateId = Date.now();
    },
    discardUpdates: (state) => {
      const { text, images, lines, segments, siglum, imageDataUrl, info } =
        state.fetched!;
      state.info = info;
      state.siglum = siglum!;
      state.imageDataUrl = imageDataUrl;
      state.text = textAdapter.setAll(state.text, text);
      state.images = imagesAdapter.setAll(state.images, images);
      state.lines = linesAdapter.setAll(state.lines, lines);
      state.segments = segmentsAdapter.setAll(state.segments, segments);
      state.changed = { ...initialState.changed };
      state.stateId = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(loadState), (state, action) => {
      const { text, images, lines, segments, siglum, imageDataUrl, info } =
        action.payload.load;
      state.info = info;
      state.siglum = siglum!;
      state.imageDataUrl = imageDataUrl;
      state.text = textAdapter.setAll(state.text, text);
      state.images = imagesAdapter.setAll(state.images, images);
      state.lines = linesAdapter.setAll(state.lines, lines);
      state.segments = segmentsAdapter.setAll(state.segments, segments);
      state.fetched = action.payload.fetched;
      state.changed = action.payload.changed;
      state.stateId = 0;
    });
  },
});
