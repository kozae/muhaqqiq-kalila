import { createSelector } from "@reduxjs/toolkit";
import { type ILayoutElement, type LineEntity, type TextEntity } from "..";
import lodash from "lodash";

import {
  selectAllImageElements,
  selectAllLines,
  selectAllTextElements,
} from "../base-selectors";
import { rootSelector } from "./root-selector";

export const selectLayout = createSelector(rootSelector, (state) => {
  const lineList = selectAllLines(state.lines);
  const lines = lineList
    .filter((l) => l?.region !== undefined)
    .map((l) => ({
      id: l!.id,
      region: l!.region,
      color: l!.color,
      order: l!.order,
    }));
  const textList = selectAllTextElements(state.text);
  const text = textList.map((e) => ({
    id: e!.id,
    region: e!.region,
    color: e!.color,
    order: e!.order,
  }));

  const imageList = selectAllImageElements(state.images);

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
  const textList = selectAllTextElements(state.text);
  const imageList = selectAllImageElements(state.images);
  const canDelete: Record<string, boolean> = {};

  const lineList = selectAllLines(state.lines);
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
  const lineList = selectAllLines(state.lines);
  const textList = selectAllTextElements(state.text);
  const groupedLines = lodash.groupBy([...lineList], "elementId");
  const elements: (LineEntity | TextEntity)[] = [];
  const canDelete: Record<string, boolean> = {};
  for (const el of textList.filter((el) => el!.position!.includes("main"))) {
    elements.push(el);
    const lines = lodash.orderBy(groupedLines[el!.id], "order");
    for (const line of lines) {
      elements.push(line);
      canDelete[line.id] =
        line?.tokens === null ||
        line?.tokens === undefined ||
        (line?.tokens !== undefined && line?.tokens?.length === 0);
    }
  }

  for (const el of textList.filter((el) => !el!.position!.includes("main"))) {
    elements.push(el);
    const lines = lodash.orderBy(groupedLines[el!.id], "order");
    for (const line of lines) {
      elements.push(line);
      canDelete[line.id] =
        line?.tokens === null ||
        line?.tokens === undefined ||
        (line?.tokens !== undefined && line?.tokens?.length === 0);
    }
  }

  return {
    elements,
    id: state.info!.id,
    version: Date.now(),
    canDelete,
    pageNumber: state.info!.number,
    hasTextElementsRegions: textList.every(
      (el) =>
        el!.region !== undefined && el!.region !== null && el.region.length > 0,
    ),
  };
});

export const selectLinesGroupedByArea = createSelector(
  rootSelector,
  (state) => {
    const lineList = selectAllLines(state.lines);
    const textList = lodash.orderBy(selectAllTextElements(state.text), "order");
    const groupedLines = lodash.groupBy([...lineList], "elementId");
    let body: LineEntity[] = [];
    let margins: LineEntity[] = [];
    for (const el of textList) {
      const lines = lodash.orderBy(groupedLines[el!.id], "order");
      if (el.position!.includes("main")) {
        body = [...body, ...lines];
      } else {
        margins = [...margins, ...lines];
      }
    }
    return { body, margins };
  },
);
