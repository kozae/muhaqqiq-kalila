import type { PayloadAction } from "@reduxjs/toolkit";
import type { LineEntity, TextEntity } from "..";
import { linesAdapter, type WritableState } from "../initial-state";

export const updateLines = (
  state: WritableState,
  action: PayloadAction<(LineEntity | TextEntity)[]>,
) => {
  const elements = action.payload;
  let elementId = elements[0].id;
  const lines: LineEntity[] = [];
  for (let i = 1; i < elements.length; i++) {
    if (elements[i].position !== "line") {
      elementId = elements[i].id;
    } else {
      lines.push({ ...elements[i], elementId } as LineEntity);
    }
  }
  state.lines = linesAdapter.setAll(state.lines, lines);
  state.changed.lines = true;
  state.stateId = Date.now();
};

export const assignDetectedRegions = (
  state: WritableState,
  action: PayloadAction<LineEntity[]>,
) => {
  const updates = action.payload.map((line) => ({
    id: line.id,
    changes: { region: line.region },
  }));

  state.lines = linesAdapter.updateMany(state.lines, updates);
  state.changed.lines = true;
  state.stateId = Date.now();
};
