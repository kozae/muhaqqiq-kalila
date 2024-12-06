import type {
  RequestActionName,
  RequestActionPayload,
  SelectorName,
  SelectorPayload,
  SelectorReturnType,
} from "./store";

export type BrowserActionEvent<E extends RequestActionName> = {
  name: E;
  payload: RequestActionPayload<E>;
};
export type BrowserSelectEvent<E extends SelectorName> = {
  name: E;
  payload: SelectorPayload<E>;
};
export type BrowserEvent<E extends RequestActionName, T extends SelectorName> =
  | BrowserActionEvent<E>
  | BrowserSelectEvent<T>;
export type BrowserMessage<
  E extends RequestActionName,
  T extends SelectorName,
> = MessageEvent<BrowserEvent<E, T>>;

export type WorkerEvent<E extends SelectorName> = {
  name: E;
  payload: SelectorReturnType<E>;
};

export type WorkerMessage<E extends SelectorName> = MessageEvent<
  WorkerEvent<E>
>;
