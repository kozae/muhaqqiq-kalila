import { getDB } from "./page-updates-db";

export const discardStoredUpdates = (id: string) => {
  const updatesDB = getDB();
  return updatesDB.transaction(
    "rw",
    updatesDB.info,
    updatesDB.text,
    updatesDB.lines,
    updatesDB.images,
    updatesDB.segments,
    async () => {
      await updatesDB.info.delete(id);
      await updatesDB.text.delete(id);
      await updatesDB.lines.delete(id);
      await updatesDB.images.delete(id);
      await updatesDB.segments.delete(id);
    },
  );
};
