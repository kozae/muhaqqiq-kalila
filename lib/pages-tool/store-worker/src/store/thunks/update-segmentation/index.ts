import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ThunkApi,

  SegmentEntity,
  UnitMark,

} from "../..";
import { selectAllOpenSegments, selectAllSegments } from "../../base-selectors";
import { createSgementByUnitIdMap, findEndPositionOfSegmentFromPreviousPage, processMark } from "./seg-util";
import { findLast, orderBy } from 'lodash';



export const updateSegmentation = createAsyncThunk<
  { segments: SegmentEntity[], openSegments: SegmentEntity[] },
  { marks: UnitMark[], doc: string },
  ThunkApi
>("updateSegmentation", async ({ marks, doc }, { getState }) => {
  const state = getState();
  const currSegments = createSgementByUnitIdMap(selectAllSegments(state.segments));
  const currOpenSegments = orderBy(selectAllOpenSegments(state.openSegments), 'startPage', 'asc');
  const segments: SegmentEntity[] = [];
  const openSegments: SegmentEntity[] = [];


  marks.forEach((mark, index) => {
    if (mark.type === "close") {
      return;
    }
    const res = processMark(mark, index, marks, doc, currSegments, state.info?.number!);
    if (res) {
      segments.push(res);
    }
  });

  const nearestOpenSegment = findLast(currOpenSegments, openSegment => openSegment.startPage < state.info!.number!);
  if (nearestOpenSegment && marks.length > 0 && marks[0].position > 0) {
    const res = findEndPositionOfSegmentFromPreviousPage(nearestOpenSegment, marks, doc, state.info!.number!);
    if (res) {
      segments.push(res);
    } else {
      openSegments.push(nearestOpenSegment);
    }
  }

  currOpenSegments.forEach(openSegment => {
    if (openSegment.id !== nearestOpenSegment?.id) {
      openSegments.push(openSegment);
    }
  });


  return { segments, openSegments };
});
