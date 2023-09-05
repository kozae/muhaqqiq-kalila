import { StoreWorkerEvent } from ".";
import { PagesDexie } from "./page-state-db";

const db = new PagesDexie();

self.onmessage = async (
  e: MessageEvent<{ type: StoreWorkerEvent; payload: any }>
) => {
  switch (e.data.type) {
    case StoreWorkerEvent.TEXT_STATE_UPDATE:
      const textInDB = await db.text.get({ id: e.data.payload.id });
      if (textInDB) {
        await db.text.update(e.data.payload.id, e.data.payload);
      } else {
        await db.text.add(e.data.payload);
      }
      break;
    case StoreWorkerEvent.IMAGE_STATE_UPDATE:
      const imageInDB = await db.images.get({ id: e.data.payload.id });
      if (imageInDB) {
        await db.images.update(e.data.payload.id, e.data.payload);
      } else {
        await db.images.add(e.data.payload);
      }
      break;
    case StoreWorkerEvent.DISCARD_ALL:
      await db.images.clear();
      await db.info.clear();
      await db.text.clear();
      await db.lines.clear();
      await db.sgements.clear();
      break;
    default:
      break;
  }
};
