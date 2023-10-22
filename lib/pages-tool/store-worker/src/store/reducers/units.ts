import type { PayloadAction } from "@reduxjs/toolkit";
import type { UnitEntity, UnitSegmentInfo } from "..";
import { unitsAdapter, type WritableState } from "../initial-state";
import type { ListUnitsQuery, Unit } from "kalila-graphql";

type Payload = Required<ListUnitsQuery>["listUnits"];

function getDescendants(unit: Unit, parentDisplayOrder?: string): UnitEntity[] {
  const displayOrder = parentDisplayOrder
    ? `${parentDisplayOrder}.${unit.order}`
    : `${unit.order}`;
  let segment: UnitSegmentInfo | undefined = undefined;
  if (unit.segments && unit.segments.length > 0) {
    const {
      startPage: page,
      startLine: line,
      id,
      startToken: token,
      endPage: end,
    } = unit.segments[0]!;
    segment = {
      page,
      line,
      token,
      id,
      title: unit.title,
      display: `${unit.frame}.${unit.order}`,
      end,
      hasEnd: false,
    };
  }
  let descendants: UnitEntity[] = [{ ...unit, segment, displayOrder }];

  if (unit.children) {
    for (const child of unit.children.items) {
      if (child) {
        descendants = [...descendants, ...getDescendants(child, displayOrder)];
      }
    }
  }

  return descendants;
}

export const loadChapter = (
  state: WritableState,
  action: PayloadAction<{ chapter: string; units: Payload }>,
) => {
  const { chapter, units } = action.payload;
  state.chapter = chapter;

  let unitEntities: UnitEntity[] = [];
  for (const unit of units!.items) {
    if (unit) {
      unitEntities = [...unitEntities, ...getDescendants(unit)];
    }
  }
  unitsAdapter.setAll(state.units, unitEntities);

  state.lastAction = "loadChapter";
};
