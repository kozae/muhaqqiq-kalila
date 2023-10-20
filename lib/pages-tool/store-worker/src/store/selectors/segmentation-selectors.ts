import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "./root-selector";
import { selectAllSegments, selectAllUnits } from "../base-selectors";
import lodash from "lodash";
import {
  formatTokens,
  type LineEntity,
  type SegmentationToken,
  type SegmentEntity,
} from "..";
import { selectAllLines, selectAllTextElements } from "../base-selectors";

const getGroupedLines = (lineList: any) => {
  return lodash.groupBy(lodash.orderBy(lineList, "order"), "elementId");
};

const getSegmentsInLine = (segments: SegmentEntity[], line: number, page: number) => {
  const segmentsStartInLine = segments.filter(
    (segment) => segment.startPage === page && segment.startLine === line,
  );
  const segmentsEndInLine = segments.filter(
    (segment) => segment.endPage === page && segment.endLine === line,
  );
  return { segmentsStartInLine, segmentsEndInLine };
};

const formatText = (line: LineEntity) => {
  return formatTokens(line!.tokens! as string[], line!.states! as string[]).map(
    (token) => ({
      raw: token,
      id: Math.floor(Math.random() * 10000000),
      type: "token" as const,
      line: line.order,
    }),
  );
};

const insertSegmentMarks = (
  text: SegmentationToken[],
  segment: SegmentEntity,
  type: "start" | "end" | "endFromPrev" | "open",
  tokenIndex: number,
  line: number,
) => {
  return [
    ...text.slice(0, tokenIndex),
    {
      type: type,
      id: `${type}_${segment.id}`,
      unitId: segment.unitId,
      title: segment.unit!.title,
      display: `${segment.unit!.frame}.${segment.unit!.order}`,
      line,
    },
    ...text.slice(tokenIndex),
  ];
};

export const selectSegementationData = createSelector(rootSelector, (state) => {
  const lineList = selectAllLines(state.lines);
  const textList = selectAllTextElements(state.text);
  const segments = selectAllSegments(state.segments);

  const lastLine = Math.max(...lineList.map((line) => line.order));

  const grouped = getGroupedLines(lineList);
  const body = {
    text: [] as SegmentationToken[][],
    ids: [] as string[],
  };

  for (const el of textList) {
    if (el?.position?.startsWith("main") && grouped[el.id]) {
      for (const line of grouped[el.id]) {
        const { segmentsStartInLine, segmentsEndInLine } = getSegmentsInLine(
          segments,
          line.order,
          state.info!.number,
        );
        let text: SegmentationToken[] = formatText(line);

        let markCount = 0;

        if (line.order === 0) {
          const segFromPrevPage = segments.find(seg => seg.startPage < state.info!.number);
          if (segFromPrevPage) {
            text = insertSegmentMarks(
              text,
              segFromPrevPage,
              "endFromPrev",
              0,
              line.order,
            );
            markCount++;
          }
        }

        for (const segment of segmentsStartInLine) {
          text = insertSegmentMarks(
            text,
            segment,
            "start",
            segment.startToken + markCount,
            line.order,
          );
          markCount++;
        }

        for (const segment of segmentsEndInLine) {
          if (
            segmentsStartInLine.every(
              (s) => s.startToken !== segment.endToken! + 1,
            )
          ) {
            if (segment.endPage !== state.info?.number) {
              continue;
            }
            if (line.order !== lastLine) {
              const { segmentsStartInLine: segmentsStartInNextLine } =
                getSegmentsInLine(segments, line.order + 1, state.info!.number);
              if (segmentsStartInNextLine.some((s) => s.startToken === 0)) {
                continue;
              }
            }
            text = insertSegmentMarks(
              text,
              segment,
              "end",
              segment.endToken! + 1 + markCount,
              line.order,
            );
            markCount++;
          }
        }
        body.text.push(text);
        body.ids.push(line?.id ?? "");
      }
    }
  }

  return {
    body,
    id: state.info!.id,
    pageNumber: state.info!.number,
    segments,
  };
});

export const selectUnits = createSelector(rootSelector, (state) => {
  const units = selectAllUnits(state.units);
  return {
    chapter: state.chapter,
    units,
    currentPage: state.info?.number,
    bookId: units[0]?.bookId,
    parentId: units[0]?.parentId,
  };
});
