import { ReactNode, createContext, useContext } from "react";
import { Page, TextElement, ImageElement, Line } from "aws-backend";
import { StoreApi, UseBoundStore, create } from "zustand";

export interface IColoredRegion {
  color?: string;
}

export interface State {
  page: Omit<
    Page,
    "__typename" | "text" | "images" | "createdAt" | "updatedAt"
  >;
  text: Array<(Omit<TextElement, "lines"> & IColoredRegion) | null>;
  lines: Array<
    | (Omit<Line, "tokens" | "states"> & IColoredRegion & { position?: string })
    | null
    | undefined
  >;
  images: Array<(ImageElement & IColoredRegion) | null>;
  imageDataUrl: string;
}

const StoreContext = createContext<UseBoundStore<StoreApi<State>> | null>(null);

export function usePageDataStore() {
  return useContext(StoreContext) as UseBoundStore<StoreApi<State>>;
}

export const highlightColors = [
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

export function DataProivder({
  page,
  children,
  imageDataUrl,
}: {
  page: Page;
  imageDataUrl: string;
  children: ReactNode;
}) {
  const { text, images, ...data } = page;

  const textElements: Array<
    (Omit<TextElement, "Lines"> & IColoredRegion) | null
  > = [];
  const allLines: Array<
    | (Omit<Line, "tokens" | "states"> & IColoredRegion & { position?: string })
    | null
  > = [];

  if (text) {
    for (const element of text.items) {
      if (element) {
        const { lines, ...rest } = element;
        if (lines) {
          allLines.push(
            ...lines.items.map((l) => ({ ...l, elementID: element.id } as Line))
          );
        }

        textElements.push(rest);
      }
    }
  }

  const store = create<State>()(() => ({
    page: data,
    imageDataUrl,
    text: textElements.map((l, i) => ({
      ...l!,
      color: highlightColors[i % 13],
    })),
    images:
      images?.items?.map((l, i) => ({
        ...l!,
        color: highlightColors[(i + 5) % 13],
      })) ?? [],
    lines: allLines.map((l, i) => ({
      ...l!,
      color: highlightColors[i % 13],
      position: "line",
    })),
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
