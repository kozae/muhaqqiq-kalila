import type { UnitEntity } from "pages-tool-store-worker";
import { writable } from "svelte/store";

export const selectedUnit = writable<UnitEntity | null>(null);
export const showDeleteModal = writable(false);
export const showEditModal = writable(false);
export const showCreateModal = writable(false);
