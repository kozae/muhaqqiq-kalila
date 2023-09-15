import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

const selectPageInfoState = (state: RootState) => state.info;

export const selectPageInfo = createSelector(selectPageInfoState, (info) => {
  return info;
});
