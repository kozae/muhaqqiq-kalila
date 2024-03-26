import { selectAllSegments } from "./../base-selectors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchedState, ThunkApi } from "..";
import {
  selectAllImageElements,
  selectAllLines,
  selectAllTextElements,
} from "../base-selectors";

export const saveUpdates = createAsyncThunk<FetchedState, {}, ThunkApi>(
  "saveUpdates",
  async ({ }, { getState }) => {
    const state = getState();

    const payload = {
      info: state.info,
      siglum: state.siglum,
      imageDataUrl: state.imageDataUrl,
      text: selectAllTextElements(state.text),
      lines: selectAllLines(state.lines),
      images: selectAllImageElements(state.images),
      segments: selectAllSegments(state.segments),
      openSegments: selectAllSegments(state.openSegments),
    };


    return payload;
  }
);

