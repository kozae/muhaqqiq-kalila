import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import { type State, linesAdapter } from "../initial-state";
import { redistributeLines } from '../thunks/redistribute-lines';

export function attachRedistributeLines(builder: ActionReducerMapBuilder<State>) {
  builder.addMatcher(isFulfilled(redistributeLines), (state, action) => {
    const lines = action.payload;
    if (lines.length !== 0) {
      linesAdapter.setAll(state.lines, lines);
      state.changed.lines = true;

      state.stateId = Date.now();
      state.lastAction = 'redistributeLines';
    }
  });
}
