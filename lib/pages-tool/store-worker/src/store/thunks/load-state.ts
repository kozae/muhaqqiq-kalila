import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkApi } from "..";
import type { Line, Page, TextElement } from "kalila-graphql";
import { highlightColors } from "../util";
import { loadStoredUpdates } from "../../db";
import type {
  TextEntity,
  LineEntity,
  ImageEntity,
  FetchedState,
} from "../model";

function merge(
  data: Page & { imageDataUrl: string; siglum: string },
  stored: any,
) {
  const firstMerge = {
    ...data,
    ...(stored.info ?? {}),
    ...Object.fromEntries(
      Object.entries(stored ?? {}).filter(
        ([key, value]) => key !== "info" && value !== undefined,
      ),
    ),
  } as Page & { imageDataUrl: string; siglum: string };

  if (stored.text) {
    const text: TextElement[] = [];
    if (stored.lines) {
      for (const el of stored.text) {
        const lines = stored.lines.filter((l: Line) => l.elementId === el.id);
        text.push({ ...el, lines });
      }
    } else {
      for (const el of data!.text!) {
        const storedEl = stored.text.find(
          (item: TextElement) => item.id === el!.id,
        );
        text.push({ ...storedEl, lines: el?.lines });
      }
    }

    return { ...firstMerge, text } as Page & {
      imageDataUrl: string;
      siglum: string;
    };
  }

  return firstMerge;
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
            allLines.push({ ...l, elementID: element.id } as Line);
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
  changed: string[];
};

export const loadState = createAsyncThunk<LoadedState, Payload, ThunkApi>(
  "loadState",
  async (data) => {
    const stored = await loadStoredUpdates(data.id, data.version!);
    const changed = Object.entries(stored)
      .filter(([_, el]) => !!el)
      .map(([key, _]) => key);

    const fetchedState = prepareInitialState(data);
    const toolState = prepareInitialState(merge(data, stored));
    return {
      fetched: fetchedState,
      changed,
      load: toolState,
    };
  },
);
