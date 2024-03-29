import { StateEffect } from "@codemirror/state";
import type { SegmentUnitConnection } from "kalila-graphql";

export const updateWidgetEffect = StateEffect.define<{ id: string, update: SegmentUnitConnection & { position: number } }>();
export const addWidgetEffect = StateEffect.define<{ segment: SegmentUnitConnection, position: number }>();
export const deleteWidgetEffect = StateEffect.define<{ id: string }>();
export const dropInCloseWidgetEffect = StateEffect.define<{ position: number }>();

