import Dexie, { type Table } from "dexie";
import {
  type Image,
  type Line,
  type Page,
  type Segment,
  type TextElement,
} from "kalila-graphql";

export interface StoredUpdate<T = any> {
  id: string; // pageId
  version: number;
  data?: Partial<T>[];
}

export interface IStoredPageUpdates {
  text?: Partial<TextElement>[];
  images?: Partial<Image>[];
  lines?: Partial<Line>[];
  segments?: Partial<Segment>[];
  info?: Partial<Page>;
}

export class PageUpdatesDexie extends Dexie {
  text!: Table<StoredUpdate<TextElement>>;
  images!: Table<StoredUpdate<Image>>;
  lines!: Table<StoredUpdate<Line>>;
  segments!: Table<StoredUpdate<Segment>>;
  info!: Table<{ id: string; version: number; data: Partial<Page> }>;

  constructor() {
    super("PageUpdatesDB");
    this.version(1).stores({
      text: "&id, version",
      images: "&id, version",
      lines: "&id, version",
      segments: "&id, version",
      info: "&id, version",
    });
  }
}

export const updatesDB = new PageUpdatesDexie();
