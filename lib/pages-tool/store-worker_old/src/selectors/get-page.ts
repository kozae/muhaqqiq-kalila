import type { SelectorFn } from "../base-types";
import type { PageState, PagesToolState } from "../state.model";

export const getPage: SelectorFn<PagesToolState, PageState, void> =
  () => (state) =>
    state.page!;
