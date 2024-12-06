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
  let bodyLineOrder = 0;
  let inMainBody = false;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].position !== "line") {
      elementId = elements[i].id;
      inMainBody = elements[i].position ? elements[i].position!.startsWith("main") : false;
    } else {

      if (inMainBody) {
        lines.push({ ...elements[i], order: bodyLineOrder, elementId } as LineEntity);
        bodyLineOrder += 1;
      } else {
        lines.push({ ...elements[i], elementId } as LineEntity);
      }

    }
  }
  state.lines = linesAdapter.setAll(state.lines, lines);
  state.changed.lines = true;
  state.stateId = Date.now();
  state.lastAction = "updateLines";
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
  state.lastAction = "assignDetectedRegions";
};

