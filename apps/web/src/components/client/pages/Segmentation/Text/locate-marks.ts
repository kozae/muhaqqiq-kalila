import type {
  SegmentationToken,
  UnitSegmentInfo,
} from "pages-tool-store-worker";

export function locateSegmentStartMarks(
  currenText: SegmentationToken[][],
  pageNumber: number,
) {
  let segmentStarts: Record<string, UnitSegmentInfo> = {};
  let segmentEnds: Set<string> = new Set<string>();
  currenText.forEach((line) => {
    line.forEach((token) => {
      if (token.type === "end") {
        segmentEnds.add(token.unitId);
      }
    });
  });
  currenText.forEach((line, lineIndex) => {
    line.forEach((token, tokenIndex) => {
      if (token.type === "start") {
        segmentStarts[token.unitId] = {
          display: token.display,
          title: token.title,
          page: pageNumber,
          end: pageNumber,
          line: lineIndex,
          token: tokenIndex,
          id: token.id,
          hasEnd: segmentEnds.has(token.unitId),
        };
      }
      if (token.type === "endFromPrev") {
        segmentStarts[token.unitId] = {
          display: token.display,
          title: token.title,
          page: pageNumber - 1,
          end: pageNumber,
          line: lineIndex,
          token: tokenIndex,
          id: token.id,
          hasEnd: segmentEnds.has(token.unitId),
        };
      }
    });
  });
  return segmentStarts;
}
