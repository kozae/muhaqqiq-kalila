import { ReplaySubject, Subject } from "rxjs";
import type { Statistics } from "./utils";
import type { Segment } from "kalila-graphql";

export const editorStats = new ReplaySubject<Statistics>(1);

export const editorActions = new Subject<{ type: string; payload?: any }>();


export type WidgetEffect = { type: "update", payload: { id: string, update: Segment & { position: number } } }
    | { type: "add", payload: { segment: Segment, position: number } }
    | { type: "delete", payload: { id: string } }
    | { type: "deleteEnd", payload: { id: string } }
    | { type: "dummy", payload: {} };

export const sgementWidgetEvents = new Subject<WidgetEffect>();

