import * as thunks from "./thunks";
import { slice } from "./slice";

const requestActions = { ...thunks, ...slice.actions };

export type RequestActionName = keyof typeof requestActions;
export type RequestActionPayload<T extends RequestActionName> = Parameters<
  (typeof requestActions)[T]
>[0];

export { requestActions };
