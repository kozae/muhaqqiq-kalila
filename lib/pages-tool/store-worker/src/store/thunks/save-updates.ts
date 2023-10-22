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

    const lemmas = await postPageForLemmatization({ page: { info: payload.info, lines: payload.lines } });

    console.log(lemmas);


    return payload;
  }
);

async function postPageForLemmatization(data: any) {
  const url = 'https://camel.kalila-and-dimna.de/lemmatize_page';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}