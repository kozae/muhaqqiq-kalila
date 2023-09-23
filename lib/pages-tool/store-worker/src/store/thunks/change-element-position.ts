import { createAsyncThunk } from "@reduxjs/toolkit";
import lodash from "lodash";
import type { LineEntity, ThunkApi } from "..";
import {
  selectTextElementsById,
  selectAllLines,
  selectImageElementsById,
} from "../base-selectors";
import { selectLinesGroupedByArea } from "../selectors";
import {
  selectLastTextElementOrderValue,
  selectLinesAfterTextElementOrderValue,
} from "../internal-selectors";

export const changeLayoutElementPosition = createAsyncThunk<
  {
    text?: { position: string; id: string };
    lines: LineEntity[];
    images?: { position: string; id: string };
  },
  { position: string; id: string },
  ThunkApi
>("changeLayoutElementPosition", async ({ id, position }, { getState }) => {
  const state = getState();
  const text = selectTextElementsById(state.text, id);
  let updatedLines: LineEntity[] = [];
  let updatedText: { position: string; id: string } | undefined = undefined;
  let updatedImage: { position: string; id: string } | undefined = undefined;
  if (text) {
    updatedText = { position, id };
    const fromMainToMargin =
      text.position?.includes("main") && !position.includes("main");
    const fromMarginToMain =
      !text.position?.includes("main") && position.includes("main");
    const allLines = selectAllLines(state.lines);
    const elementLines = allLines.filter((l) => l.elementId === text.id);
    const { body, margins } = selectLinesGroupedByArea(state);

    // TODO move the segments as well
    if (fromMainToMargin) {
      const updatedElementLines = lodash
        .chain(elementLines)
        .sortBy("order")
        .map((l, i) => ({ ...l, order: i }))
        .value();

      const updatedMainLines = body
        .filter((l) => l.elementId !== id)
        .map((l, i) => ({ ...l, order: i }));

      updatedLines = [...updatedMainLines, ...updatedElementLines, ...margins];
    }

    if (fromMarginToMain) {
      const updatedMargins = margins.filter((l) => l.elementId !== id);

      let updatedElementLines: LineEntity[] = elementLines;
      let updatedBodyLines = body;

      if (text.order === 0) {
        const baseCount = elementLines.length;
        updatedBodyLines = body.map((l, i) => ({ ...l, order: baseCount + i }));
      } else if (text.order === selectLastTextElementOrderValue(state)) {
        const baseCount = body.length;
        updatedElementLines = elementLines.map((l, i) => ({
          ...l,
          order: baseCount + i,
        }));
      } else {
        const shiftedLines = selectLinesAfterTextElementOrderValue(
          state,
          text.order,
        );
        const unaffectedLines = body.filter((l) =>
          shiftedLines.every((sl) => sl.id !== l.id),
        );
        updatedBodyLines = [
          ...unaffectedLines,
          ...elementLines,
          ...shiftedLines,
        ].map((l, i) => ({ ...l, order: i }));
      }

      updatedLines = [
        ...updatedBodyLines,
        ...updatedMargins,
        ...updatedElementLines,
      ];
    }
  } else {
    const image = selectImageElementsById(state.images, id);
    if (image) {
      updatedImage = { position, id };
    }
  }

  return {
    text: updatedText,
    lines: updatedLines,
    image: updatedImage,
  };
});
