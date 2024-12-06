import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import { linesAdapter, textAdapter, type State } from "../initial-state";
import { updateTranscription } from "../thunks";

export function attachUpdateTranscription(
    builder: ActionReducerMapBuilder<State>,
) {
    builder.addMatcher(isFulfilled(updateTranscription), (state, action) => {

        const { lineUpdates } = action.payload;

        if (lineUpdates.length !== 0) {
            state.lines = linesAdapter.updateMany(state.lines, lineUpdates);
            state.changed.lines = true;
        }

        if (action.payload.newLines.length !== 0) {
            state.lines = linesAdapter.addMany(state.lines, action.payload.newLines);
            state.changed.lines = true;
        }

        if (action.payload.newTextElemnt) {
            state.text = textAdapter.addOne(state.text, action.payload.newTextElemnt);
            state.changed.text = true;
        }



        state.stateId = Date.now();
        state.lastAction = "updateTranscription";

    });
}
