import {
  imagesAdapter,
  linesAdapter,
  segmentsAdapter,
  textAdapter,
  unitsAdapter,
} from "./initial-state";

const text = textAdapter.getSelectors();

export const selectAllTextElements = text.selectAll;
export const selectTextElementsById = text.selectById;
export const selectTextElementCount = text.selectTotal;

const images = imagesAdapter.getSelectors();

export const selectAllImageElements = images.selectAll;
export const selectImageElementsById = images.selectById;
export const selectImageElementCount = images.selectTotal;

const lines = linesAdapter.getSelectors();

export const selectAllLines = lines.selectAll;
export const selectLineById = lines.selectById;
export const selectLineslementCount = lines.selectTotal;

const segments = segmentsAdapter.getSelectors();

export const selectAllSegments = segments.selectAll;
export const selectSegmentById = segments.selectById;
export const selectSegmentsCount = segments.selectTotal;

const units = unitsAdapter.getSelectors();

export const selectAllUnits = units.selectAll;
export const selectUnitById = units.selectById;
export const selectUnitsCount = units.selectTotal;
