import {
  type Page,
  type TextElement,
  type Line,
  type Segment,
  type Image,
  type Unit,
  type SegmentUnitConnection,
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

export type UnitSegmentInfo = {
  title: string;
  display: string;
  page: number;
  end: number;
  line: number;
  token: number;
  id: string;
  hasEnd: boolean;
};

export type UnitEntity = Omit<Unit, "segments" | "children"> & {
  displayOrder: string;
  segment?: UnitSegmentInfo;
};
export type UnitsState = Array<SegmentEntity>;

export interface FetchedState {
  info?: PageState;
  siglum?: string;
  imageDataUrl?: string;
  text: TextState;
  lines: LinesState;
  images: ImagesState;
  segments: SegmentsState;
  openSegments: SegmentsState;
}

export type PageInfoUpdate = {
  commentary?: string | null;
  foliation?: string | null;
  pagination?: number | null;
  tags?: string[] | null;
};

export interface ILayoutElement {
  id: string;
  region: Array<number>;
  color: string;
  order: number;
  position?: string;
}

export interface IChangeTracker {
  info: boolean;
  text: boolean;
  images: boolean;
  lines: boolean;
  segments: boolean;
}


export interface UnitMark {
  unit: SegmentUnitConnection,
  position: number,
  type: "open" | "close"
}
