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
export type TextState = Array<TextEntity>;

export type LineEntity = Line & IColoredRegion & { position?: string };

export type LinesState = Array<LineEntity>;

export type ImageEntity = Image & IColoredRegion;
export type ImagesState = Array<ImageEntity>;

export type SegmentEntity = Segment;
export type SegmentsState = Array<SegmentEntity>;

export interface FetchedState {
  info?: PageState;
  siglum?: string;
  imageDataUrl?: string;
  text: TextState;
  lines: LinesState;
  images: ImagesState;
  segments: SegmentsState;
}

export type PageInfoUpdate = {
  commentary?: string | null;
  foliation?: string | null;
  pagination?: number | null;
  tags?: string | null;
};

export interface ILayoutElement {
  id: string;
  region: Array<number>;
  color: string;
  order: number;
}
