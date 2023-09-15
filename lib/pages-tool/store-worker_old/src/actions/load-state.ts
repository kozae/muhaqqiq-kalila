import type { Line, Page, TextElement } from "kalila-graphql";
import type { IStoredPageUpdates } from "../db/page-updates-db";
import type {
  TextEntity,
  LineEntity,
  ImageEntity,
  PagesToolState,
} from "../state.model";
import { produce } from "immer";
import store from "../store";
import { loadStoredUpdates } from "../db";
import type { ActionFn } from "../base-types";

const highlightColors = [
  "100,149,237",
  "192,57,43",
  "142,68,173",
  "22,160,133",
  "255,255,194",
  "86,101,115",
  "46,204,113",
  "0,32,194",
  "111,78,55",
  "231,116,113",
  "100,233,134",
  "200,162,200",
  "211,84,0",
  "127,82,93",
];

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

  const textElements: Map<string, TextEntity> = new Map();
  const allLines: Map<string, LineEntity> = new Map();

  if (text) {
    for (const element of text) {
      if (element) {
        const { lines, ...rest } = element;
        if (lines) {
          lines.forEach((l) => {
            allLines.set(l!.id, { ...l, elementID: element.id } as Line);
          });
        }

        textElements.set(element.id, rest);
      }
    }
  }

  const coloredTextElements = new Map(
    Array.from(textElements.entries()).map(([id, l], i) => {
      return [id, { ...l, color: highlightColors[i % 13] }];
    }),
  );

  const coloredImages = images
    ? new Map(
        images.map((l, i) => [
          l!.id,
          {
            ...l,
            color: highlightColors[(i + 5) % 13],
          } as ImageEntity,
        ]),
      )
    : new Map();

  const coloredLines = new Map(
    Array.from(allLines.entries()).map(([id, l], i) => {
      return [id, { ...l, color: highlightColors[i % 13], position: "line" }];
    }),
  );

  return {
    page: data,
    siglum,
    imageDataUrl,
    text: coloredTextElements,
    images: coloredImages,
    lines: coloredLines,
    segments: new Map(segments?.map((segment) => [segment!.id, segment]) || []),
    hasChanges: false,
  } as PagesToolState;
}

export const loadState: ActionFn<
  PagesToolState,
  { hasChanges: boolean; id: string; title: string },
  Page & { imageDataUrl: string; siglum: string }
> = (data) => async (state) => {
  const stored = await loadStoredUpdates(data.id, data.version!);
  const hasChanges = Object.values(stored).some((el) => el);
  const fetchedState = prepareInitialState(data);
  const toolState = prepareInitialState(merge(data, stored));
  state = produce(toolState, (draft) => {
    draft.hasChanges = hasChanges;
  });
  store.fetchedState = produce(fetchedState, (draft) => {});

  return {
    hasChanges,
    id: state.page!.id,
    title: `${state.siglum} (p.${state.page!.number})`,
  };
};
