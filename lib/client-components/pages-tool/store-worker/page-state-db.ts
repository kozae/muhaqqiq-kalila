import Dexie, { Table } from "dexie";
import { Image, Line, Page, Segment, TextElement } from "kalila-graphql";

export interface StordElement<T = any> {
  id: string; // pageId
  version: number;
  data?: Partial<T>[];
}

export interface IStoredState {
  text: Partial<TextElement>[];
  images: Partial<Image>[];
  lines: Partial<Line>[];
  sgements: Partial<Segment>[];
  info: Partial<Page>[];
}

export class PagesDexie extends Dexie {
  text!: Table<StordElement<TextElement>>;
  images!: Table<StordElement<Image>>;
  lines!: Table<StordElement<Line>>;
  sgements!: Table<StordElement<Segment>>;
  info!: Table<StordElement<Page>>;

  constructor() {
    super("PagesDatabase");
    this.version(1).stores({
      text: "&id, version",
      images: "&id, version",
      lines: "&id, version",
      sgements: "&id, version",
      info: "&id, version",
    });
  }
}
