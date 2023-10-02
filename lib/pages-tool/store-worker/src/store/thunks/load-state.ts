import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkApi } from "..";
import type { Line, Page } from "kalila-graphql";
import { highlightColors } from "../util";
import { loadStoredUpdates, type IStoredPageUpdates } from "../../db";
import type {
  TextEntity,
  LineEntity,
  ImageEntity,
  FetchedState,
  IChangeTracker,
} from "../model";

function merge(fetched: FetchedState, stored: IStoredPageUpdates) {
  return {
    ...fetched,
    ...Object.fromEntries(
      Object.entries(stored ?? {}).filter(([_, value]) => value !== undefined),
    ),
  };
}

function prepareInitialState(
  page: Page & { imageDataUrl: string; siglum: string },
) {
  const { text, images, segments, imageDataUrl, siglum, ...data } = page;

  const textElements: Array<TextEntity> = [];
  const allLines: Array<LineEntity> = [];

  if (text) {
    for (const element of text) {
      if (element) {
        const { lines, ...rest } = element;
        if (lines) {
          lines.forEach((l) => {
            allLines.push({ ...l, elementId: element.id } as Line);
          });
        }

        textElements.push(rest);
      }
    }
  }

  const coloredTextElements = textElements.map((l, i) => {
    return { ...l, color: highlightColors[i % 13] };
  });

  const coloredImages = images
    ? images.map(
        (l, i) => (
          l!.id,
          {
            ...l,
            color: highlightColors[(i + 5) % 13],
          } as ImageEntity
        ),
      )
    : [];

  const coloredLines = allLines.map((l, i) => {
    return { ...l, color: highlightColors[i % 13], position: "line" };
  });

  return {
    info: data,
    imageDataUrl,
    text: coloredTextElements,
    siglum,
    images: coloredImages,
    lines: coloredLines,
    segments,
  } as FetchedState;
}

type Payload = Page & { imageDataUrl: string; siglum: string };
export type LoadedState = {
  fetched: FetchedState;
  load: FetchedState;
  changed: IChangeTracker;
};

export const loadState = createAsyncThunk<LoadedState, Payload, ThunkApi>(
  "loadState",
  async (data) => {
    console.log(data);

    const stored = await loadStoredUpdates(data.id, data.version!);

    const changed = {
      info: stored.info !== undefined,
      text: stored.text !== undefined,
      images: stored.images !== undefined,
      lines: stored.lines !== undefined,
      segments: stored.segments !== undefined,
    };

    const fetchedState = prepareInitialState(data);
    const toolState = merge(fetchedState, stored);

    return {
      fetched: fetchedState,
      changed,
      load: toolState,
    };
  },
);
