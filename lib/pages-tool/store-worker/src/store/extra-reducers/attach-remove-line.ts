import {
  type ActionReducerMapBuilder,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { type State, linesAdapter } from "../initial-state";
import { removeLine } from "../thunks";

export function attachRemove(builder: ActionReducerMapBuilder<State>) {
  builder.addMatcher(isFulfilled(removeLine), (state, action) => {
    const lines = action.payload;


    linesAdapter.setAll(state.lines, lines);
    state.changed.lines = true;

    state.stateId = Date.now();
    state.lastAction = 'removeLine';

  });

  builder.addMatcher(isRejected(removeLine), (state, action) => {
    console.log(action.error);
  });
}
