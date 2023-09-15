import { infoSlice } from "./info";
import { textSlice } from "./text";
import { hubSlice } from "./hub";

export const actions = {
  ...infoSlice.actions,
  ...textSlice.actions,
  ...hubSlice.actions,
};

export type ActionName = keyof typeof actions;
export type ActionPayload<T extends ActionName> = Parameters<
  (typeof actions)[T]
>[0];
