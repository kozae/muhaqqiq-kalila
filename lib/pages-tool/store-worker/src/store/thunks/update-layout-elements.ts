import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ImageEntity, TextEntity, LineEntity, ThunkApi } from "..";
import { selectElementLines } from "../internal-selectors";

export const updateLayoutElements = createAsyncThunk<
  {
    text: TextEntity[];
    lines: LineEntity[];
    images: ImageEntity[];
  },
  (ImageEntity | TextEntity)[],
  ThunkApi
>("updateLayoutElements", async (elements, { getState }) => {
  const text: TextEntity[] = [];
  let bodyLines: LineEntity[] = [];
  let marginLines: LineEntity[] = [];
  const images: ImageEntity[] = [];
  const state = getState();
  let lineCounter = 0;
  for (const element of elements) {
    if (element.position?.includes("image") || element.position === "blank") {
      images.push(element as ImageEntity);
    } else {
      text.push(element as TextEntity);
      const elementLines = selectElementLines(state, element.id);
      if (element.position?.startsWith("main")) {
        for (const line of elementLines) {
          bodyLines.push({ ...line, order: lineCounter });
          lineCounter++;
        }
      } else {
        marginLines = [...marginLines, ...elementLines];
      }
    }
  }

  return { text, lines: [...bodyLines, ...marginLines], images };
});
