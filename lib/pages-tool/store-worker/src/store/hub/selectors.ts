import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../config";

const selectHubState = (state: RootState) => state.hub;

export const selectHasChanges = createSelector(
  selectHubState,
  (hub) => hub.hasChanges,
);

export const selectFetched = createSelector(
  selectHubState,
  (hub) => hub.fetched,
);
