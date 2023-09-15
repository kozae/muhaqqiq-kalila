export * from "./config";
export * from "./model";
export * from "./request-actions";
import * as selectors from "./selectors";

export type SelectorName = keyof typeof selectors;
export type SelectorPayload<T extends SelectorName> = Parameters<
  (typeof selectors)[T]
>[1];

export type SelectorReturnType<T extends SelectorName> = ReturnType<
  (typeof selectors)[T]
>;

export { selectors };
