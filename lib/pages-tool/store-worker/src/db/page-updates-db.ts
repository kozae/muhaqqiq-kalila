import Dexie, { type Table } from "dexie";
import type {
  ImageEntity,
  LineEntity,
  PageState,
  SegmentEntity,
  TextEntity,
} from "../store";

export interface StoredUpdate<T = any> {
  id: string; // pageId
  version: number;
  data?: Partial<T>[];
}

export interface IStoredPageUpdates {
  text?: Partial<TextEntity>[];
  images?: Partial<ImageEntity>[];
  lines?: Partial<LineEntity>[];
  segments?: Partial<SegmentEntity>[];
  info?: Partial<PageState>;
}

export class PageUpdatesDexie extends Dexie {
  text!: Table<StoredUpdate<TextEntity>>;
  images!: Table<StoredUpdate<ImageEntity>>;
  lines!: Table<StoredUpdate<LineEntity>>;
  segments!: Table<StoredUpdate<SegmentEntity>>;
  info!: Table<{ id: string; version: number; data: Partial<PageState> }>;

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
