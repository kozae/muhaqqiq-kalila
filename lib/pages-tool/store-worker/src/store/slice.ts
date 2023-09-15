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
} from "./model";
import { loadState, discardUpdates } from "./thunks";

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
  changed: [] as string[],
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
      if (state.changed.indexOf("info") === -1) {
        state.changed.push("info");
      }
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
    });

    builder.addMatcher(isFulfilled(discardUpdates), (state, action) => {
      const { text, images, lines, segments, siglum, imageDataUrl, info } =
        action.payload;
      state.info = info;
      state.siglum = siglum!;
      state.imageDataUrl = imageDataUrl;
      state.text = textAdapter.setAll(state.text, text);
      state.images = imagesAdapter.setAll(state.images, images);
      state.lines = linesAdapter.setAll(state.lines, lines);
      state.segments = segmentsAdapter.setAll(state.segments, segments);
      state.changed = [];
    });
  },
});
