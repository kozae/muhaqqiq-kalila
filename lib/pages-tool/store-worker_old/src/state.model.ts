import {
  type Page,
  type TextElement,
  type Line,
  type Segment,
  type Image,
} from "kalila-graphql";

export interface IColoredRegion {
  color?: string;
}

export interface StoredState<T = any> {
  id: string; // pageId
  version?: number | null;
  data: T;
}

export type PageState = Omit<
  Page,
  "__typename" | "text" | "images" | "segments"
>;

export type TextEntity = Omit<TextElement, "lines"> & IColoredRegion;
export type TextState = Map<string, TextEntity>;

export type LineEntity = Line & IColoredRegion & { position?: string };

export type LinesState = Map<string, LineEntity>;

export type ImageEntity = Image & IColoredRegion;
export type ImagesState = Map<string, ImageEntity>;

export type SegmentEntity = Segment;
export type SegmentsState = Map<string, SegmentEntity>;

export interface PagesToolState {
  page?: PageState;
  siglum?: string;
  imageDataUrl?: string;
  text: TextState;
  lines: LinesState;
  images: ImagesState;
  segments: SegmentsState;
  hasChanges: boolean;
}
