import { createSelector } from "@reduxjs/toolkit";
import lodash from "lodash";
import { type RootState, type LineEntity } from ".";
import { selectAllLines, selectAllTextElements } from "./base-selectors";
import { rootSelector } from "./selectors/root-selector";

export const selectLinesAfterTextElementOrderValue = createSelector(
  [rootSelector, (state: RootState, v: number) => v],
  (state, order) => {
    const lineList = selectAllLines(state.lines);
    const textList = lodash.orderBy(selectAllTextElements(state.text), "order");
    const groupedLines = lodash.groupBy([...lineList], "elementId");
    let lines: LineEntity[] = [];
    for (const el of textList) {
      if (el.order > order) {
        lines = [...lines, ...lodash.orderBy(groupedLines[el!.id], "order")];
      }
    }
    return lines;
  },
);

export const selectLastTextElementOrderValue = createSelector(
  rootSelector,
  (state) => {
    const textList = lodash.orderBy(selectAllTextElements(state.text), "order");
    return Math.max(...textList.map((t) => t.order));
  },
);

export const selectElementLines = createSelector(
  [rootSelector, (state: RootState, id: string) => id],
  (state, id) => {
    const lineList = selectAllLines(state.lines);

    return lineList.filter((l) => l.elementId === id);
  },
);

export const selectGroupedLines = createSelector(
  rootSelector,
  (state) => {
    const textList = selectAllTextElements(state.text)
    const lines = {
      body: [] as LineEntity[],
      margin: [] as LineEntity[],
    }

    for (const el of textList) {
      const elementLines = selectElementLines(state, el.id);
      if (el.position?.includes('main')) {
        lines.body = [...lines.body, ...elementLines]
      } else {
        lines.margin = [...lines.margin, ...elementLines]
      }
    }

    return lines;
  },
);

