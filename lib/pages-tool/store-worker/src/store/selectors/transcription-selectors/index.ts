import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "../root-selector";
import { buildTranscriptionData } from "./text-data-processing";
import { buildSegmentationData } from "./segmentatation-processing";


export const selectTranscriptionPanelData = createSelector(
  rootSelector,
  (state) => {

    const transcriptionData = buildTranscriptionData(state);
    const segmentationData = buildSegmentationData(state);

    return {
      id: state.info!.id,
      ...transcriptionData,
      ...segmentationData,
    };
  },
);



