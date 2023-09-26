import { createSelector } from "@reduxjs/toolkit";
import lodash from "lodash";
import { formatTokens, toTitleCase, type LineEntity } from "..";
import { selectAllLines, selectAllTextElements } from "../base-selectors";
import { rootSelector } from "./root-selector";

interface TranscriptionData {
  text: string[];
  colors: string[];
  ids: string[];
  points: number[][];
  rotations: number[];
}

export const selectTranscriptionPanelData = createSelector(
  rootSelector,
  (state) => {
    const lineList = selectAllLines(state.lines);
    const textList = selectAllTextElements(state.text);

    const grouped = lodash.groupBy(
      lodash.orderBy(lineList, "order"),
      "elementId",
    );
    const body = {
      text: [] as string[],
      colors: [] as string[],
      ids: [] as string[],
      points: [] as number[][],
      rotations: [] as number[],
    };

    const glosses: Record<string, TranscriptionData> = {};
    for (const el of textList) {
      if (el?.position?.startsWith("main") && grouped[el.id]) {
        for (const line of grouped[el.id]) {
          body.text.push(
            formatTokens(
              line!.tokens! as string[],
              line!.states! as string[],
            ).join(" "),
          );
          body.colors.push(line?.color ?? "#fff");
          body.ids.push(line?.id ?? "");
          body.points.push((line?.region?.slice(0, -1) ?? []) as number[]);
          body.rotations.push(lodash.last(line?.region) ?? 0);
        }
      } else {
        const gloss = {
          text: [] as string[],
          colors: [] as string[],
          ids: [] as string[],
          points: [] as number[][],
          rotations: [] as number[],
        };
        for (const line of grouped[el.id]) {
          gloss.text.push(
            formatTokens(
              line!.tokens! as string[],
              line!.states! as string[],
            ).join(" "),
          );
          gloss.colors.push(line?.color ?? "#fff");
          gloss.ids.push(line?.id ?? "");
          gloss.points.push((line?.region?.slice(0, -1) ?? []) as number[]);
          gloss.rotations.push(lodash.last(line?.region) ?? 0);
        }
        glosses[`${el?.order + 1}. ${toTitleCase(el?.position ?? "")}`] = gloss;
      }
    }

    const lines: Record<string, LineEntity> = {};
    lineList
      .filter((l) => l?.region !== undefined)
      .forEach((l) => {
        lines[l!.id] = l;
      });

    return {
      body,
      glosses,
      id: state.info!.id,
      lines,
      hasGloss: Object.keys(glosses).length > 0,
    };
  },
);
