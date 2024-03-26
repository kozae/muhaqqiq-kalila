import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ThunkApi,
  SegmentationToken,
  SegmentEntity,
  RootState,
  SegmentStartMark,
  SegmentEndFromPreviousPageMark,
  OpenSegmentPreviousPageMark,
} from "..";
import lodash from "lodash";
import { selectAllOpenSegments, selectOpenSegmentById, selectSegmentById, selectUnitById } from "../base-selectors";
import type { SegmentUnitConnection } from "kalila-graphql";

type Mark = {
  unitId: string;
  page: number;
  line: number;
  token: number;
  id: string;
};

const createSegment = (
  lastOpenMark: Mark,
  endLine: number,
  endToken: number,
  state: RootState,
  endPage?: number,
) => {
  let unit = selectUnitById(state.units, lastOpenMark.unitId) as
    | SegmentUnitConnection
    | null
    | undefined;
  if (!unit) {
    const segment = selectSegmentById(state.segments, lastOpenMark.id) || selectOpenSegmentById(state.openSegments, lastOpenMark.id);
    unit = segment?.unit;
  }
  return {
    id: lastOpenMark.id,
    unitId: lastOpenMark.unitId,
    startLine: lastOpenMark.line,
    startToken: lastOpenMark.token,
    endLine,
    endToken,
    __typename: "Segment",
    startPage: lastOpenMark.page,
    endPage: endPage ?? state.info!.number,
    mediumId: state.info!.mediumId,
    unit,
  } as SegmentEntity;
};

const updateLastOpenMark = (
  token:
    | SegmentStartMark
    | SegmentEndFromPreviousPageMark
    | OpenSegmentPreviousPageMark,

  currentLineTokenCount: number,
  state: RootState,
) => {
  const id = token.id.split("_")[1];
  let line = token.line;
  let tokenNumber = currentLineTokenCount;
  let page = state.info!.number;
  if (token.type === "endFromPrev") {
    const original = selectSegmentById(state.segments, id);
    if (original) {
      line = original.startLine;
      tokenNumber = original.startToken;
      page = original.startPage;
    }
  }
  if (token.type === "open") {
    const original = selectOpenSegmentById(state.openSegments, id);
    if (original) {
      line = original.startLine;
      tokenNumber = original.startToken;
      page = original.startPage;
    }
  }
  return {
    unitId: token.unitId,
    page,
    line,
    token: tokenNumber,
    id,
  };
};

export const updateSegmentation = createAsyncThunk<
  { segments: SegmentEntity[], openSegments: SegmentEntity[] },
  SegmentationToken[][],
  ThunkApi
>("updateSegmentation", async (tokens, { getState }) => {
  const state = getState();
  const body = lodash.flatten(tokens);
  let currentLine = 0,
    currentLineTokenCount = 0,
    lastOpenMark: Mark | null = null;
  const lineLastToken: Record<number, number> = {};
  const segments: Record<string, SegmentEntity> = {};

  for (const token of body) {
    if (currentLine !== token.line) {
      lineLastToken[currentLine] = currentLineTokenCount;
      currentLine = token.line;
      currentLineTokenCount = 0;
    }
    if (token.type === "token") {
      currentLineTokenCount++;
    } else if (token.type !== "end") {
      if (!lastOpenMark) {
        lastOpenMark = updateLastOpenMark({ ...token }, currentLineTokenCount, state);
      } else {
        const endLine =
          currentLineTokenCount === 0 ? token.line - 1 : token.line;
        const endToken =
          currentLineTokenCount === 0
            ? lineLastToken[endLine]
            : currentLineTokenCount - 1;
        segments[lastOpenMark.id] = createSegment(lastOpenMark, endLine, endToken, state);
        lastOpenMark = updateLastOpenMark({ ...token }, currentLineTokenCount, state);
      }
    } else if (lastOpenMark) {

      segments[lastOpenMark.id] =
        createSegment(lastOpenMark, token.line, currentLineTokenCount, state)
      lastOpenMark = null;
    }
  }

  if (lastOpenMark) {
    const original = selectSegmentById(state.segments, lastOpenMark.id);
    let endLine = -1 as number,
      endToken = -1 as number | null | undefined,
      endPage = -1 as number | undefined;
    if (original && (original.endPage !== state.info!.number || (original.endPage === state.info!.number && (original.endLine ?? -1) >= lastOpenMark.line))) {
      endLine = original ? original.endLine! : -1;
      endToken = original ? original.endToken : -1;
      endPage = original ? original.endPage : -1;
    }
    segments[lastOpenMark.id] =
      createSegment(lastOpenMark, endLine!, endToken!, state, endPage)
  }
  const previouslyOpenSegments = selectAllOpenSegments(state.openSegments);
  const openSegments = [] as SegmentEntity[];

  for (const segment of previouslyOpenSegments) {
    let item = segments[segment.id];
    if (item && item.startPage !== state.info!.number && item.endPage === -1) {
      openSegments.push(segments[segment.id]);
      delete segments[segment.id];
    }
  }

  console.log(Object.values(segments));
  console.log(openSegments);

  return { segments: Object.values(segments), openSegments };
});
