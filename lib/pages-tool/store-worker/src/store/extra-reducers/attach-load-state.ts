import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import {
  type State,
  textAdapter,
  imagesAdapter,
  linesAdapter,
  segmentsAdapter,
  openSegmentsAdapter,
} from "../initial-state";
import { loadState } from "../thunks";

export function attachLoadState(builder: ActionReducerMapBuilder<State>) {
  builder.addMatcher(isFulfilled(loadState), (state, action) => {
    const {
      text,
      images,
      lines,
      segments,
      openSegments,
      siglum,
      imageDataUrl,
      info,
    } = action.payload.load;
    state.info = info;
    state.siglum = siglum!;
    state.imageDataUrl = imageDataUrl;
    state.text = textAdapter.setAll(state.text, text);
    state.images = imagesAdapter.setAll(state.images, images);
    state.lines = linesAdapter.setAll(state.lines, lines);
    state.segments = segmentsAdapter.setAll(state.segments, segments);
    state.openSegments = openSegmentsAdapter.setAll(
      state.openSegments,
      openSegments,
    );
    state.fetched = action.payload.fetched;
    state.changed = action.payload.changed;
    state.stateId = info?.number!;
  });
}
