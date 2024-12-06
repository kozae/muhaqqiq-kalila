import { writable, type Writable } from 'svelte/store';
import type { Analysis, ColoredPassages } from './model';
import { Subject } from 'rxjs';

export const coloredPassages: Writable<ColoredPassages> = writable({});
export const analysis: Writable<Analysis | null | undefined> = writable(null);


export const runAnalysisSubject$ = new Subject<{ version: string, fragmentationInstructions: string, refinementInstructions: string, threshold: number, stamp: number } | undefined>();
