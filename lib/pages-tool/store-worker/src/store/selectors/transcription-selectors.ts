import { createSelector } from "@reduxjs/toolkit";
import lodash from "lodash";
import { formatTokens, toTitleCase, type LineEntity } from "..";
import { selectAllLines, selectAllSegments, selectAllTextElements } from "../base-selectors";
import { rootSelector } from "./root-selector";
import type { Segment } from "kalila-graphql";

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
    const segments = selectAllSegments(state.segments);
    const segFromPrevPage = segments.find(seg => seg.startPage < state.info!.number && seg.endPage === state.info!.number);
    const pageSegments = segments.filter(seg => seg.startPage === state.info!.number);

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

    const lineLens: Record<number, number> = {};
    const tokenLens: Record<number, number[]> = {};
    const glosses: Record<string, TranscriptionData> = {};
    for (const el of textList) {
      if (el?.position?.startsWith("main") && grouped[el.id]) {
        for (const line of grouped[el.id]) {
          tokenLens[line.order] = line.tokens!.map((t) => t!.length);
          const lineText = formatTokens(
            line!.tokens! as string[],
            line!.states! as string[],
          ).join(" ");
          lineLens[line.order] = lineText.length;
          body.text.push(
            lineText
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

    const segmenstWithPositions: (Segment & { position: number })[] = []
    for (const segment of pageSegments) {
      let position = 0;
      for (let lineOrder = 0; lineOrder < segment.startLine; lineOrder++) {
        position += lineLens[lineOrder] ?? 0;
        position += 1; // for the line break
      }
      for (let tokenOrder = 0; tokenOrder < segment.startToken; tokenOrder++) {
        position += tokenLens[segment.startLine][tokenOrder] ?? 0;
        position += 1; // for the space
      }
      segmenstWithPositions.push({ ...segment, position })
    }
    return {
      body,
      glosses,
      id: state.info!.id,
      lines,
      hasGloss: Object.keys(glosses).length > 0,
      segFromPrevPage,
      segments: segmenstWithPositions
    };
  },
);
