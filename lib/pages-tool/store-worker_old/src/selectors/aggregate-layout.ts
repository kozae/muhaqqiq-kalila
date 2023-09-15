import type { ILayout } from "../aggregation.models";
import type { SelectorFn } from "../base-types";
import type { PagesToolState } from "../state.model";

export const aggregateLayout: SelectorFn<PagesToolState, ILayout, void> =
  () => (state) => {
    const lines = state.lines
      ? Array.from(state.lines.values())
          .filter((l) => l?.region !== undefined)
          .map((l) => ({
            id: l!.id,
            region: l!.region,
            color: l!.color,
            order: l!.order,
          }))
      : [];
    const text = state.text
      ? Array.from(state.text.values()).map((e) => ({
          id: e!.id,
          region: e!.region,
          color: e!.color,
          order: e!.order,
        }))
      : [];

    const images = state.images
      ? Array.from(state.images.values()).map((e) => ({
          id: e!.id,
          region: e!.region,
          color: e!.color,
          order: e!.order,
        }))
      : [];
    return {
      lines: lines,
      elements: [...text, ...images],
    } as ILayout;
  };
