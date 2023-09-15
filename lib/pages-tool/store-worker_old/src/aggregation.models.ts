import type { PageState } from "./state.model";

export interface PageSummary {
  info: PageState;
  imageDataUrl: string;
  textElements: number;
  images: number;
  lines: number;
  segments: string[];
  transcripedLinesCount: number;
  transcripedTokensCount: number;
}

export interface ILayoutElement {
  id: string;
  region: Array<number>;
  color: string;
  order: number;
}

export interface ILayout {
  lines: ILayoutElement[];
  elements: ILayoutElement[];
}
