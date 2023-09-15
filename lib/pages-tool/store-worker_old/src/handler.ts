import type { PagesToolState } from "./state.model";
import * as selectors from "./selectors";
import * as actions from "./actions";

const handlers = { ...actions, ...selectors };

export type HandlerName = keyof typeof handlers;
export type SelectorName = keyof typeof selectors;
export type ActionName = keyof typeof actions;

export type MessageData<E extends HandlerName> = {
  event: E;
  payload: Parameters<(typeof handlers)[E]>;
};

export type ResponseData<E extends HandlerName> = {
  event: E;
  payload: ReturnType<ReturnType<(typeof handlers)[E]>>;
};

const handler = async <E extends HandlerName>(
  messageData: MessageData<E>,
  state: PagesToolState,
  dispatch: (data: ResponseData<E>) => void,
) => {
  const { event, payload } = messageData;
  if (!handlers[event]) {
    throw new Error(`Handler for ${event} not found`);
  }
  if (event in actions) {
    const data = await (handlers[event] as any)(...payload)(state);
    dispatch({ event, payload: data as any });
  } else {
    const data = (handlers[event] as any)(...payload)(state);
    dispatch({ event, payload: data as any });
  }
};

export default handler;
