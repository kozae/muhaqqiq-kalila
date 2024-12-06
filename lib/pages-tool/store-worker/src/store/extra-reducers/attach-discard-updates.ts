import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import { imagesAdapter, initialState, linesAdapter, segmentsAdapter, textAdapter, type State } from "../initial-state";
import { discardUpdates } from "../thunks";

export function attachDisacrdUpdates(builder: ActionReducerMapBuilder<State>) {
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
        state.changed = { ...initialState.changed };
        state.stateId = Date.now();
        state.lastAction = 'discardUpdates';
    });
}
