import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "./root-selector";
import { selectAllUnits } from "../base-selectors";

export const selectUnits = createSelector(rootSelector, (state) => {
  return { chapter: state.chapter, units: selectAllUnits(state.units) };
});
