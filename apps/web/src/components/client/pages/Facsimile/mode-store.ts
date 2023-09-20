import { writable } from "svelte/store";

export const mode = writable<"edit" | "view">("view");
