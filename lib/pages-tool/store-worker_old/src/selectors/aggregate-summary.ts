import type { PageSummary } from "../aggregation.models";
import type { SelectorFn } from "../base-types";
import type { PagesToolState } from "../state.model";
import lodash from "lodash";

export const aggregateSummary: SelectorFn<PagesToolState, PageSummary, void> =
  () => (state: PagesToolState) => {
    const textElements = state.text ? state.text.size : 0;
    const images = state.images ? state.images.size : 0;
    const lines = state.lines
      ? Array.from(state.lines.values()).filter((l) => l?.region !== undefined)
          .length
      : 0;
    const transcripedLines = state.lines
      ? Array.from(state.lines.values()).filter((l) => l?.tokens !== undefined)
      : [];
    const transcripedLinesCount = transcripedLines.length;
    const transcripedTokensCount = lodash.flatten(
      transcripedLines.map((l) => l!.tokens),
    ).length;

    const segments = state.segments
      ? Array.from(state.segments.values()).map(
          (s) => `(${s?.unit?.frame}.${s?.unit?.order}) ${s?.unit?.title}`,
        )
      : [];
    return {
      info: state.page!,
      imageDataUrl: state.imageDataUrl ? state.imageDataUrl : "",
      textElements: textElements,
      images: images,
      lines: lines,
      segments: segments,
      transcripedLinesCount: transcripedLinesCount,
      transcripedTokensCount: transcripedTokensCount,
    };
  };
