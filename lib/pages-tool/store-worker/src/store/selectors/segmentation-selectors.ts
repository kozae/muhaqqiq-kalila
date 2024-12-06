import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "./root-selector";
import { selectAllUnits } from "../base-selectors";


export const selectUnits = createSelector(rootSelector, (state) => {
  const units = selectAllUnits(state.units);
  return {
    chapter: state.chapter,
    units,
    currentPage: state.info?.number,
    bookId: units[0]?.bookId,
    parentId: units[0]?.parentId,
  };
});
