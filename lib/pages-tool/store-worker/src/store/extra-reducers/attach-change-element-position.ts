import { type ActionReducerMapBuilder, isFulfilled } from "@reduxjs/toolkit";
import {
  type State,
  textAdapter,
  imagesAdapter,
  linesAdapter,
} from "../initial-state";

import { changeLayoutElementPosition } from "../thunks/change-element-position";

export function attachChangeLayoutElementPosition(
  builder: ActionReducerMapBuilder<State>,
) {
  builder.addMatcher(
    isFulfilled(changeLayoutElementPosition),
    (state, action) => {
      const { text, images, lines } = action.payload;
      console.log({ text });
      if (text) {
        textAdapter.updateOne(state.text, {
          id: text.id,
          changes: { position: text.position },
        });
        state.changed.text = true;
      }

      if (images) {
        imagesAdapter.updateOne(state.images, {
          id: images.id,
          changes: { position: images.position },
        });
        state.changed.images = true;
      }

      if (lines.length !== 0) {
        linesAdapter.setAll(state.lines, lines);
        state.changed.lines = true;
      }

      state.stateId = Date.now();
    },
  );
}
