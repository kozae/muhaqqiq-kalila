import { updatesDB } from "./page-updates-db";

export const discardStoredUpdates = (id: string) => {
  return Promise.all([
    updatesDB.info.delete(id),
    updatesDB.text.delete(id),
    updatesDB.lines.delete(id),
    updatesDB.images.delete(id),
    updatesDB.segments.delete(id),
  ]);
};
