import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LineEntity, ThunkApi } from "..";
import { selectAllLines, selectTextElementsById } from "../base-selectors";
import { v4 as uuidv4 } from "uuid";
import { selectLinesGroupedByArea } from "../selectors/layout-selectors";
import {
  selectElementLines,
  selectLastTextElementOrderValue,
  selectLinesAfterTextElementOrderValue,
} from "../internal-selectors";
import { highlightColors } from "../util";


function getPointAtAdistanceAndAngle(x: number, y: number, distance: number, angle: number) {
  const angleInRadians = angle * Math.PI / 180;
  const X = x + distance * Math.cos(angleInRadians);
  const Y = y + distance * Math.sin(angleInRadians);
  return [X, Y];
}


function getSubRegion(points: number[], top: number, left: number, width: number, height: number) {
  const [X0, Y0, X1, Y1, X2, Y2, X3, Y3, R] = points;
  const [x0, y0] = getPointAtAdistanceAndAngle(X0, Y0, Math.sqrt(Math.pow(top, 2) + Math.pow(left, 2)), R + 90);
  const [x1, y1] = getPointAtAdistanceAndAngle(x0, y0, width, R);
  const [x2, y2] = getPointAtAdistanceAndAngle(x1, y1, height, R + 90);
  const [x3, y3] = getPointAtAdistanceAndAngle(x0, y0, height, R + 90);

  return [
    Math.round(x0),
    Math.round(y0),
    Math.round(x1),
    Math.round(y1),
    Math.round(x2),
    Math.round(y2),
    Math.round(x3),
    Math.round(y3),
    R
  ];
}

function getDistance(p1: [number, number], p2: [number, number]) {
  return Math.round(
    Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
  );
}


function divideTextElementsIntoEqualLineRegions(textElementRegion: number[], lineCount: number): Record<number, number[]> {
  const [x0, y0, x1, y1, x2, y2, x3, y3, r] = textElementRegion;

  // Calculate the height of the text element region
  const height = getDistance([x0, y0], [x3, y3]);
  const width = getDistance([x0, y0], [x1, y1]);

  // Calculate the height of each line region
  const lineHeight = Math.round(height / lineCount);

  // Create an object to store the line regions
  const lineRegions: Record<number, number[]> = {};

  // Calculate and store the region for each line
  for (let i = 0; i < lineCount; i++) {
    const topY = i * lineHeight;

    lineRegions[i] = getSubRegion(textElementRegion, topY, 0, width, lineHeight);
  }

  return lineRegions;
}

export const addLines = createAsyncThunk<LineEntity[], { elementId: string, count: number }, ThunkApi>(
  "addLines",
  async ({ elementId, count }, { getState }) => {

    const state = getState();
    const lines = selectAllLines(state.lines);
    const element = selectTextElementsById(state.text, elementId);
    const elementLines = selectElementLines(state, elementId);
    const { body, margins } = selectLinesGroupedByArea(state);
    const createNewLine = (order: number, region?: number[]) =>
      ({
        id: uuidv4(),
        elementId,
        order: order,
        tokens: [],
        states: [],
        position: "line",
        color: highlightColors[order % 13],
        region,
        __typename: "Line",
      }) as LineEntity;

    const lineRegions = divideTextElementsIntoEqualLineRegions(element.region as number[], count);

    if (element?.position?.startsWith("main")) {
      if (element.order === 0) {
        const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(elementLines.length + index, lineRegions[index]));
        const updatedBodyLines = body
          .filter((l) => l.elementId !== element.id)
          .map((l) => ({ ...l, order: l.order + count }));

        return [...elementLines, ...newLines, ...updatedBodyLines, ...margins];
      } else if (element.order === selectLastTextElementOrderValue(state)) {
        const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(body.length + index, lineRegions[index]));
        return [...newLines, ...body, ...margins];
      } else {
        const shiftedLines = selectLinesAfterTextElementOrderValue(
          state,
          element.order,
        ).map((l) => ({ ...l, order: l.order + count }));
        const unaffectedLines = body.filter((l) =>
          shiftedLines.every((sl) => sl.id !== l.id),
        );
        const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(unaffectedLines.length + index, lineRegions[index]));

        return [...unaffectedLines, ...newLines, ...shiftedLines, ...margins];
      }
    } else {
      const newLines: LineEntity[] = Array.from({ length: count }).map((_, index) => createNewLine(elementLines.length + index, lineRegions[index]));

      console.log(newLines);

      return [...lines, ...newLines];
    }
  },
);
