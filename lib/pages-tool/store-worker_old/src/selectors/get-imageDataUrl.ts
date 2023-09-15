import type { SelectorFn } from "../base-types";
import type { PagesToolState } from "../state.model";

export const getImageDataUrl: SelectorFn<
  PagesToolState,
  string | undefined,
  void
> = () => (state) => state.imageDataUrl;
