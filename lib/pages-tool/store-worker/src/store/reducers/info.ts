import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageInfoUpdate, PageState } from "..";
import type { WritableState } from "../initial-state";

export const updatePageInfo = (
  state: WritableState,
  action: PayloadAction<PageInfoUpdate>,
) => {
  const { commentary, foliation, pagination, tags } = action.payload;
  if (!state.info) {
    state.info = {} as PageState;
  }
  state.info.commentary = commentary
    ? commentary.split("\n")
    : state.info.commentary;
  state.info.foliation = foliation;
  state.info.pagination = pagination;
  state.info.tags = tags ? tags : state.info.tags;
  state.changed.info = true;
  state.stateId = Date.now();
  state.lastAction = "updatePageInfo";
};
