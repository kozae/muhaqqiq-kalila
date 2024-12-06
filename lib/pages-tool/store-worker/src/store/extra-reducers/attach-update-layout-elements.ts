import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import {
  type State,
  textAdapter,
  imagesAdapter,
  linesAdapter,
} from "../initial-state";
import { updateLayoutElements } from "../thunks";

export function attachUpdateLayoutElements(
  builder: ActionReducerMapBuilder<State>,
) {
  builder.addMatcher(isFulfilled(updateLayoutElements), (state, action) => {
    const { text, images, lines } = action.payload;

    textAdapter.setAll(state.text, text);
    state.changed.text = true;

    imagesAdapter.setAll(state.images, images);
    state.changed.images = true;

    linesAdapter.setAll(state.lines, lines);
    state.changed.lines = true;

    state.stateId = Date.now();
    state.lastAction = 'updateLayoutElements';
  });
}
