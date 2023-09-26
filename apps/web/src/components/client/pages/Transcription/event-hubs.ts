import { ReplaySubject, Subject } from "rxjs";
import type { Statistics } from "./utils";

export const editorStats = new ReplaySubject<Statistics>(1);

export const actions = new Subject<{ type: string; payload?: any }>();
