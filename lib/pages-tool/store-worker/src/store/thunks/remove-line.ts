import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LineEntity, ThunkApi } from "..";
import {
  selectAllLines,
  selectLineById,
  selectTextElementsById,
} from "../base-selectors";
import { selectLinesGroupedByArea } from "../selectors/layout-selectors";
import lodash from "lodash";
import { selectElementLines } from "../internal-selectors";

export const removeLine = createAsyncThunk<LineEntity[], string, ThunkApi>(
  "removeLine",
  async (lineId, { getState }) => {
    const state = getState();
    const lines = selectAllLines(state.lines);
    const lineToDelete = selectLineById(state.lines, lineId);
    const elementId = lineToDelete!.elementId;
    const element = selectTextElementsById(state.text, elementId);

    const { body, margins } = selectLinesGroupedByArea(state);
    if (element?.position?.startsWith("main")) {
      const updatedBodyLines = lodash
        .orderBy(body, "order")
        .filter((l) => l.id !== lineId)
        .map((l, i) => ({ ...l, order: i }));
      return [...updatedBodyLines, ...margins];
    } else {
      const updatedMargins = margins.filter((l) => l.elementId !== elementId);
      const updatedElementLines = selectElementLines(state, elementId)
        .filter((l) => l.id !== lineId)
        .map((l, i) => ({ ...l, order: i }));
      return [...body, ...updatedMargins, ...updatedElementLines];
    }
  },
);
