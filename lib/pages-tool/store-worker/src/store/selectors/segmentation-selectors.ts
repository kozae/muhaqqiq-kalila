import { createSelector } from "@reduxjs/toolkit";
import { rootSelector } from "./root-selector";
import {
  selectAllOpenSegments,
  selectAllSegments,
  selectAllUnits,
} from "../base-selectors";
import lodash from "lodash";
import {
  formatTokens,
  type LineEntity,
  type SegmentEndMark,
  type SegmentEntity,
  type SegmentStartMark,
  type TextToken,
} from "..";
import { selectAllLines, selectAllTextElements } from "../base-selectors";

const getGroupedLines = (lineList: any) => {
  return lodash.groupBy(lodash.orderBy(lineList, "order"), "elementId");
};

const getSegmentsInLine = (segments: SegmentEntity[], line: LineEntity) => {
  const segmentsStartInLine = segments.filter(
    (segment) => segment.startLine === line.order,
  );
  const segmentsEndInLine = segments.filter(
    (segment) => segment.endLine === line.order,
  );
  return { segmentsStartInLine, segmentsEndInLine };
};

const formatText = (line: LineEntity) => {
  return formatTokens(line!.tokens! as string[], line!.states! as string[]).map(
    (token) => ({
      raw: token,
      id: Math.floor(Math.random() * 100000),
      type: "token" as const,
    }),
  );
};

const insertSegmentMarks = (
  text: (TextToken | SegmentStartMark | SegmentEndMark)[],
  segment: SegmentEntity,
  type: "start" | "end",
  tokenIndex: number,
) => {
  return [
    ...text.slice(0, tokenIndex),
    {
      type: type,
      id: `${type}_${segment.id}`,
      unitId: segment.unitId,
      title: segment.unit!.title,
      display: `${segment.unit!.frame}.${segment.unit!.order}`,
    },
    ...text.slice(tokenIndex),
  ];
};

export const selectSegementationData = createSelector(rootSelector, (state) => {
  const lineList = selectAllLines(state.lines);
  const textList = selectAllTextElements(state.text);
  const segments = selectAllSegments(state.segments);

  const grouped = getGroupedLines(lineList);
  const body = {
    text: [] as (TextToken | SegmentStartMark | SegmentEndMark)[][],
    ids: [] as string[],
  };

  for (const el of textList) {
    if (el?.position?.startsWith("main") && grouped[el.id]) {
      for (const line of grouped[el.id]) {
        const { segmentsStartInLine, segmentsEndInLine } = getSegmentsInLine(
          segments,
          line,
        );
        let text: (TextToken | SegmentStartMark | SegmentEndMark)[] =
          formatText(line);

        let markCount = 0;
        for (const segment of segmentsStartInLine) {
          text = insertSegmentMarks(
            text,
            segment,
            "start",
            segment.startToken + markCount,
          );
          markCount++;
        }

        for (const segment of segmentsEndInLine) {
          if (
            segmentsStartInLine.every(
              (s) => s.startToken !== segment.endToken! + 1,
            )
          ) {
            text = insertSegmentMarks(
              text,
              segment,
              "end",
              segment.endToken! + 1 + markCount,
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
  return {
    chapter: state.chapter,
    units: selectAllUnits(state.units),
    currentPage: state.info?.number,
  };
});
