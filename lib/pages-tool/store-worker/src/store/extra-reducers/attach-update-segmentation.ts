import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import { type State, segmentsAdapter } from "../initial-state";
import { updateSegmentation } from "../thunks";

export function attachUpdateSegmentation(
  builder: ActionReducerMapBuilder<State>,
) {
  builder.addMatcher(isFulfilled(updateSegmentation), (state, action) => {
    segmentsAdapter.setAll(state.segments, action.payload);
    state.changed.segments = true;
    state.stateId = Date.now();
  });
}
