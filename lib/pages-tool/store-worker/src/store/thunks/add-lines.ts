import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LineEntity, ThunkApi } from "..";
import { selectAllLines, selectTextElementsById } from "../base-selectors";
import { v4 as uuidv4 } from "uuid";
import { selectLinesGroupedByArea } from "../selectors/layout-selectors";
import {
  selectElementLines,
  selectLastTextElementOrderValue,
  selectLinesAfterTextElementOrderValue,
} from "../internal-selectors";
import { highlightColors } from "../util";

export const addLines = createAsyncThunk<LineEntity[], { elementId: string, count: number }, ThunkApi>(
  "addLines",
  async ({ elementId, count }, { getState }) => {

    console.log(elementId, count);
    const state = getState();
    const lines = selectAllLines(state.lines);
    const element = selectTextElementsById(state.text, elementId);
    const elementLines = selectElementLines(state, elementId);
    const { body, margins } = selectLinesGroupedByArea(state);
    const createNewLine = (order: number) =>
      ({
        id: uuidv4(),
        elementId,
        order: order,
        tokens: [],
        states: [],
        position: "line",
        color: highlightColors[order % 13],
        __typename: "Line",
      }) as LineEntity;

    if (element?.position?.startsWith("main")) {
      if (element.order === 0) {
        const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(elementLines.length + index));
        const updatedBodyLines = body
          .filter((l) => l.elementId !== element.id)
          .map((l) => ({ ...l, order: l.order + count }));

        return [...elementLines, ...newLines, ...updatedBodyLines, ...margins];
      } else if (element.order === selectLastTextElementOrderValue(state)) {
        const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(body.length + index));
        return [...newLines, ...body, ...margins];
      } else {
        const shiftedLines = selectLinesAfterTextElementOrderValue(
          state,
          element.order,
        ).map((l) => ({ ...l, order: l.order + count }));
        const unaffectedLines = body.filter((l) =>
          shiftedLines.every((sl) => sl.id !== l.id),
        );
        const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(unaffectedLines.length + index));

        return [...unaffectedLines, ...newLines, ...shiftedLines, ...margins];
      }
    } else {
      const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(elementLines.length + index));

      return [...lines, ...newLines];
    }
  },
);
