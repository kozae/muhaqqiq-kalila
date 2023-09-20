import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

const selectPageInfoState = (state: RootState) => state.info;

export const selectPageInfo = createSelector(selectPageInfoState, (info) => {
  const tags: Record<string, boolean> = {};
  (info?.tags ?? []).forEach((tag) => {
    if (tag) tags[tag] = true;
  });
  return { ...info, tags, tagList: info?.tags ?? [], version: Date.now() };
});
