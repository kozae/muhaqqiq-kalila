import { createSelector } from "@reduxjs/toolkit";
import {
  rootSelector,
  type ILayoutElement,
  type LineEntity,
  type TextEntity,
} from "..";
import { imagesAdapter, linesAdapter, textAdapter } from "../slice";
import lodash from "lodash";

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
    id: state.info!.id,
  };
});

export const selectLayoutPanelData = createSelector(rootSelector, (state) => {
  const textList = textAdapter.getSelectors().selectAll(state.text);
  const imageList = imagesAdapter.getSelectors().selectAll(state.images);
  const canDelete: Record<string, boolean> = {};

  const lineList = linesAdapter.getSelectors().selectAll(state.lines);
  for (const image of imageList) {
    canDelete[image.id] = true;
  }

  for (const el of textList) {
    canDelete[el.id] = !lineList.some((l) => l.elementId === el.id);
  }

  return {
    elements: lodash.orderBy([...textList, ...imageList], "order"),
    id: state.info!.id,
    canDelete,
    version: Date.now(),
  };
});

export const selectLinePanelData = createSelector(rootSelector, (state) => {
  const lineList = linesAdapter.getSelectors().selectAll(state.lines);
  const textList = textAdapter.getSelectors().selectAll(state.text);
  const groupedLines = lodash.groupBy([...lineList], "elementId");
  const elements: (LineEntity | TextEntity)[] = [];
  for (const el of textList.filter((el) => el!.position!.includes("main"))) {
    elements.push(el);
    const lines = lodash.orderBy(groupedLines[el!.id], "order");
    for (const line of lines) {
      elements.push(line);
    }
  }

  for (const el of textList.filter((el) => !el!.position!.includes("main"))) {
    elements.push(el);
    const lines = lodash.orderBy(groupedLines[el!.id], "order");
    for (const line of lines) {
      elements.push(line);
    }
  }

  return { elements, id: state.info!.id };
});
