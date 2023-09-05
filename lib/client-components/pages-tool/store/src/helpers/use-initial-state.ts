import { Line, Page, TextElement } from "kalila-graphql";
import { highlightColors } from "./highlight-colors";
import { IColoredRegion } from "../slices";

export function useInitialState(page: Page, imageDataUrl: string) {
  const { text, images, segments, ...data } = page;

  const textElements: Array<
    (Omit<TextElement, "Lines"> & IColoredRegion) | null
  > = [];
  const allLines: Array<
    (Line & IColoredRegion & { position?: string }) | null
  > = [];

  if (text) {
    for (const element of text) {
      if (element) {
        const { lines, ...rest } = element;
        if (lines) {
          allLines.push(
            ...lines.map((l) => ({ ...l, elementID: element.id } as Line))
          );
        }

        textElements.push(rest);
      }
    }
  }

  return {
    page: data,
    imageDataUrl,
    text: textElements.map((l, i) => ({
      ...l!,
      color: highlightColors[i % 13],
    })),
    images:
      images?.map((l, i) => ({
        ...l!,
        color: highlightColors[(i + 5) % 13],
      })) ?? [],
    lines: allLines.map((l, i) => ({
      ...l!,
      color: highlightColors[i % 13],
      position: "line",
    })),
    segments: segments ?? [],
  };
}
