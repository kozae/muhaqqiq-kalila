import { createSelector } from "@reduxjs/toolkit";
import { rootSelector, type ILayoutElement } from "..";
import { imagesAdapter, linesAdapter, textAdapter } from "../slice";

export const selectLayout = createSelector(rootSelector, (state) => {
  const lineList = linesAdapter.getSelectors().selectAll(state.lines);
  const lines = lineList
    .filter((l) => l?.region !== undefined)
    .map((l) => ({
      id: l!.id,
      region: l!.region,
      color: l!.color,
      order: l!.order,
    }));
  const textList = textAdapter.getSelectors().selectAll(state.text);
  const text = textList.map((e) => ({
    id: e!.id,
    region: e!.region,
    color: e!.color,
    order: e!.order,
  }));

  const imageList = imagesAdapter.getSelectors().selectAll(state.images);

  const images = imageList.map((e) => ({
    id: e!.id,
    region: e!.region,
    color: e!.color,
    order: e!.order,
  }));
  return {
    lines: lines as ILayoutElement[],
    elements: [...text, ...images] as ILayoutElement[],
  };
});
