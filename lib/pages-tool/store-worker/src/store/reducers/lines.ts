import type { PayloadAction, Update } from "@reduxjs/toolkit";
import { determineTokenState, type LineEntity, type TextEntity } from "..";
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

export const updateTranscription = (
  state: WritableState,
  action: PayloadAction<{ doc: string; ids: string[] }>,
) => {
  const updates: Update<LineEntity>[] = [];
  const text = action.payload.doc.replace(/\s{2,}/g, " ").split("\n");
  text.forEach((line, index) => {
    const processed = line
      .split(" ")
      .map((token) => determineTokenState(token.trim()));
    const tokens = processed.map((t) => t.token);
    const states = processed.map((t) => t.state);
    updates.push({
      id: action.payload.ids[index],
      changes: { tokens, states },
    });
  });
  state.lines = linesAdapter.updateMany(state.lines, updates);
  state.changed.lines = true;
  state.stateId = Date.now();
};
