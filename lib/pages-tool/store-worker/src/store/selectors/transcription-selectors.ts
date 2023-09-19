import { createSelector } from "@reduxjs/toolkit";
import lodash from "lodash";
import { rootSelector, type LineEntity } from "..";
import { linesAdapter, textAdapter } from "../slice";

export const selectTranscriptionPanelData = createSelector(
  rootSelector,
  (state) => {
    const lineList = linesAdapter.getSelectors().selectAll(state.lines);
    const textList = textAdapter.getSelectors().selectAll(state.text);

    const grouped = lodash.groupBy(
      lodash.orderBy(lineList, "order"),
      "elementId",
    );
    const bodyLines = [];
    const colors = [];
    const ids = [];
    const points = [];
    const rotations = [];

    for (const el of textList) {
      if (el?.position?.startsWith("main") && grouped[el.id]) {
        for (const line of grouped[el.id]) {
          bodyLines.push(line?.tokens?.join(" "));
          colors.push(line?.color ?? "#fff");
          ids.push(line?.id ?? "");
          points.push(line?.region?.slice(0, -1) ?? []);
          rotations.push(lodash.last(line?.region) ?? 0);
        }
      }
    }

    const lines: Record<string, LineEntity> = {};
    lineList
      .filter((l) => l?.region !== undefined)
      .forEach((l) => {
        lines[l!.id] = l;
      });

    return {
      bodyLines,
      colors,
      ids,
      points,
      rotations,
      id: state.info!.id,
      lines,
    };
  },
);
