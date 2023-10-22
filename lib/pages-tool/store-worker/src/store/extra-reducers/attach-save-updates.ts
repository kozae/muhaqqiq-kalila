import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import { initialState, type State } from "../initial-state";
import { saveUpdates } from "../thunks";

export function attachSaveUpdates(builder: ActionReducerMapBuilder<State>) {
  builder.addMatcher(isFulfilled(saveUpdates), (state, action) => {
    state.fetched = action.payload;
    state.changed = { ...initialState.changed };
    state.stateId = Date.now();
    state.lastAction = 'saveUpdates';
  });
}
