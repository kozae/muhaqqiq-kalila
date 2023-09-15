import type { ILayout, PageState, PageSummary } from "pages-tool-store-worker";
import { ReplaySubject } from "rxjs";

function sub<T>(buffer = 1) {
  return new ReplaySubject<T>(buffer);
}
export const ready$ = sub<string>();

export const title$ = sub<string | undefined>();
export const hasChanges$ = sub<boolean>();

export const imageDataUrl$ = sub<string | undefined>();

export const info$ = sub<PageState>();

export const summary$ = sub<PageSummary>();

export const layout$ = sub<ILayout>();
