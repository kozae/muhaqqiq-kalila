import { Page, TextElement, Line, Segment, Image } from "kalila-graphql";
import { StoreWorkerEvent } from "pages-tool-store-worker";

export interface IColoredRegion {
  color?: string;
}

export type PageState = Omit<
  Page,
  "__typename" | "text" | "images" | "version"
>;

export type TextEntity = Omit<TextElement, "lines"> & IColoredRegion;
export type TextState = Array<TextEntity | null>;

export type LinesState = Array<
  (Line & IColoredRegion & { position?: string }) | null | undefined
>;

export type ImageEntity = Image & IColoredRegion;
export type ImagesState = Array<ImageEntity | null>;

export type SegmentsState = Array<Segment | null>;

export interface PageSlice {
  page: PageState;
  imageDataUrl: string;
  resetPage: () => void;
}

export interface TextSlice {
  text: TextState;
  addTextElement: (position: string) => void;
  reorderLayoutElements: (updates: Record<string, number>) => void;
  updateTextElement: (id: string, changes: Partial<TextEntity>) => void;
  removeTextElement: (id: string) => void;
  replaceAllTextElements: (text: TextState) => void;
  resetText: () => void;
}

export interface ImagesSlice {
  images: ImagesState;
  addImageElement: (position: string) => void;
  updateImageElement: (id: string, changes: Partial<ImageEntity>) => void;
  removeImageElement: (id: string) => void;
  replaceAllImageElements: (images: ImagesState) => void;
  resetImages: () => void;
}

export interface LinesSlice {
  lines: LinesState;
  addLineElement: (elementId: string) => void;
  updateLine: (id: string, changes: Partial<Line>) => void;
  removeLine: (id: string) => void;
  replaceAllLines: (lines: LinesState) => void;
  resetLines: () => void;
}

export interface SegmentsSlice {
  segments: SegmentsState;
  addSegment: (unitId: string, start: [number, number, number]) => void;
  updateSegment: (id: string, changes: Partial<Segment>) => void;
  removeSegment: (id: string) => void;
  replaceAllSegments: (segments: SegmentsState) => void;
  resetSegments: () => void;
}

export interface ChangeTrackingSlice {
  hasChanges: boolean;
}

export interface State
  extends PageSlice,
    TextSlice,
    LinesSlice,
    ImagesSlice,
    SegmentsSlice,
    ChangeTrackingSlice {
  messageStoreWorker: (eventType: StoreWorkerEvent, value: any) => void;
  reset: () => void;
}
