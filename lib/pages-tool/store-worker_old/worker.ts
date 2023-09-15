import { enableMapSet } from "immer";
import handler, { type HandlerName, type ResponseData } from "./src/handler";
import store from "./src/store";

enableMapSet();

console.log("Worker loaded");

const dispatch: <E extends HandlerName>(data: ResponseData<E>) => void = <
  E extends HandlerName,
>(
  data: ResponseData<E>,
) => {
  self.postMessage(data);
};
self.onmessage = async (message: any) =>
  await handler(message.data, store.state, dispatch);

self.postMessage("READY");
