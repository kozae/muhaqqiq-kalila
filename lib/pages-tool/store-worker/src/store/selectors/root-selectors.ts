import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "../config";
import { linesAdapter, segmentsAdapter } from "../slice";
import lodash from "lodash";

export const selectHasChanges = createSelector(
  rootSelector,
  (state) => state.changed.length > 0,
);

export const selectBasicInfo = createSelector(
  rootSelector,
  (state) =>
    state.info && {
      id: state.info!.id,
      title: `${state.siglum} (p.${state.info!.number})`,
      hasChanges: state.changed.length > 0,
    },
);

export const selectImageDataUrl = createSelector(
  rootSelector,
  (state) => state.imageDataUrl,
);

export const selectSummary = createSelector(rootSelector, (state) => {
  const textElements = state.text ? state.text.ids.length : 0;
  const images = state.images ? state.images.ids.length : 0;
  const lineList = linesAdapter.getSelectors().selectAll(state.lines);
  const lines = lineList.filter((l) => l?.region !== undefined).length;
  const transcripedLines = lineList.filter((l) => l?.tokens !== undefined);

  const transcripedLinesCount = transcripedLines.length;
  const transcripedTokensCount = lodash.flatten(
    transcripedLines.map((l) => l!.tokens),
  ).length;
  const segmentList = segmentsAdapter.getSelectors().selectAll(state.segments);
  const segments = segmentList.map(
    (s) => `(${s?.unit?.frame}.${s?.unit?.order}) ${s?.unit?.title}`,
  );
  return {
    info: state.info!,
    imageDataUrl: state.imageDataUrl ? state.imageDataUrl : "",
    textElements: textElements,
    images: images,
    lines: lines,
    segments: segments,
    transcripedLinesCount: transcripedLinesCount,
    transcripedTokensCount: transcripedTokensCount,
  };
});
