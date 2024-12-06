import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "../root-selector";
import { buildTranscriptionData } from "./text-data-processing";
import { buildSegmentationData } from "./segmentatation-processing";
import { selectAllLines, selectAllTextElements } from "../../base-selectors";
import type { LineEntity } from "../../model";
import { toTitleCase } from "../../util";
import type { TranscriptionData } from "./models";
import { groupLinesByElementId } from "./util";


export const selectTranscriptionPanelData = createSelector(
  rootSelector,
  (state) => {

    const transcriptionData = buildTranscriptionData(state);
    const segmentationData = buildSegmentationData(state);

    return {
      id: state.info?.id ?? "",
      ...transcriptionData,
      ...segmentationData,
    };
  },
);



export const selectLineIds = createSelector(
  rootSelector,
  (state) => {

    const lineList = selectAllLines(state.lines);
    const textList = selectAllTextElements(state.text);

    const grouped = groupLinesByElementId(lineList);

    const body: string[] = []
    const glosses: Record<string, string[]> = {};
    for (const el of textList) {
      if (grouped[el.id]) {
        if (el?.position?.startsWith("main")) {
          for (const line of grouped[el.id]) {
            body.push(line.id);
          }
        } else {
          const gloss: string[] = []
          for (const line of grouped[el.id]) {
            gloss.push(line.id);
          }
          glosses[`${el?.order + 1}. ${toTitleCase(el?.position ?? "")}`] = gloss;
        }
      }
    }


    return { body, glosses, hasGloss: Object.keys(glosses).length > 0 };
  },
);



