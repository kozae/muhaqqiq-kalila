/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    "on:consider"?: (
      event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T },
    ) => void;
    "on:finalize"?: (
      event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T },
    ) => void;
  }
}
