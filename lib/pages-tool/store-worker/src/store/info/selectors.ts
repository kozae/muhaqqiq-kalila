import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

const selectPageInfoState = (state: RootState) => state.info;

export const selectPageInfo = createSelector(selectPageInfoState, (state) => {
  const { imageDataUrl, ...rest } = state;
  return rest;
});

export const selectImageDataUrl = createSelector(
  selectPageInfoState,
  (state) => state.imageDataUrl,
);
