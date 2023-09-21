import type { Page } from "kalila-graphql";
import {
  getDB,
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
  const updatesDB = getDB();
  let info, text, lines, images, segments;
  await updatesDB.transaction(
    "r",
    updatesDB.info,
    updatesDB.text,
    updatesDB.lines,
    updatesDB.images,
    updatesDB.segments,
    async () => {
      info = await updatesDB.info.get(id);
      text = await updatesDB.text.get(id);
      lines = await updatesDB.lines.get(id);
      images = await updatesDB.images.get(id);
      segments = await updatesDB.segments.get(id);
    },
  );
  return {
    text: keepIfNew(text, version),
    images: keepIfNew(images, version),
    lines: keepIfNew(lines, version),
    segments: keepIfNew(segments, version),
    info: keepInfoIfNew(info, version),
  } satisfies IStoredPageUpdates;
};
