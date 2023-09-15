import { infoSelectors } from "./info";
import { hubSelectors } from "./hub";

export const selectors = {
  ...infoSelectors,
  ...hubSelectors,
  // ...textSelectors
};

export type SelectorName = keyof typeof selectors;
export type SelectorPayload<T extends SelectorName> = Parameters<
  (typeof selectors)[T]
>[0];

export type SelectorReturnType<T extends SelectorName> = ReturnType<
  (typeof selectors)[T]
>;
