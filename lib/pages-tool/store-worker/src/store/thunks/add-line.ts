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

export const addLine = createAsyncThunk<LineEntity[], string, ThunkApi>(
  "addLine",
  async (elementId, { getState }) => {
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
        const newLine: LineEntity = createNewLine(elementLines.length);
        const updatedBodyLines = body
          .filter((l) => l.elementId !== element.id)
          .map((l) => ({ ...l, order: l.order + 1 }));

        return [...elementLines, newLine, ...updatedBodyLines, ...margins];
      } else if (element.order === selectLastTextElementOrderValue(state)) {
        const newLine: LineEntity = createNewLine(body.length);
        return [newLine, ...body, ...margins];
      } else {
        const shiftedLines = selectLinesAfterTextElementOrderValue(
          state,
          element.order,
        ).map((l) => ({ ...l, order: l.order + 1 }));
        const unaffectedLines = body.filter((l) =>
          shiftedLines.every((sl) => sl.id !== l.id),
        );
        const newLine: LineEntity = createNewLine(unaffectedLines.length);

        return [...unaffectedLines, newLine, ...shiftedLines, ...margins];
      }
    } else {
      const newLine: LineEntity = createNewLine(elementLines.length);

      return [...lines, newLine];
    }
  },
);
