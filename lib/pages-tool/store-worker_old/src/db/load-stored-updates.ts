import type { Page } from "kalila-graphql";
import {
  updatesDB,
  type IStoredPageUpdates,
  type StoredUpdate,
} from "./page-updates-db";

function keepIfNew(el: StoredUpdate | undefined, version: number) {
  if (el) {
    if (el.version > version!) {
      return el.data;
    }
  }

  return undefined;
}

function keepInfoIfNew(
  el: { id: string; version: number; data: Partial<Page> } | undefined,
  version: number,
) {
  if (el) {
    if (el.version > version!) {
      return el.data;
    }
  }

  return undefined;
}

export const loadStoredUpdates = async (id: string, version: number) => {
  const [info, text, lines, images, segments] = await Promise.all([
    updatesDB.info.get(id),
    updatesDB.text.get(id),
    updatesDB.lines.get(id),
    updatesDB.images.get(id),
    updatesDB.segments.get(id),
  ]);
  return {
    text: keepIfNew(text, version),
    images: keepIfNew(images, version),
    lines: keepIfNew(lines, version),
    segments: keepIfNew(segments, version),
    info: keepInfoIfNew(info, version),
  } satisfies IStoredPageUpdates;
};
