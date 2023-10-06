import { createSlice } from "@reduxjs/toolkit";

import {
  imagesAdapter,
  initialState,
  linesAdapter,
  segmentsAdapter,
  textAdapter,
} from "./initial-state";

import * as reducers from "./reducers";
import * as extraReducers from "./extra-reducers";

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    ...reducers,
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
    Object.values(extraReducers).forEach((reducer) => reducer(builder));
  },
});
