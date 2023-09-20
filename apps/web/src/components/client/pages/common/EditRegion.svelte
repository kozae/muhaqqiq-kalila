<script lang="ts">
  import type {
    ImageEntity,
    LineEntity,
    TextEntity,
  } from "pages-tool-store-worker";
  import PanelContainer from "./PanelContainer.svelte";
  import RotationsButtonGroup from "./RotationButtonGroup.svelte";
  import lodash from "lodash";
  import ScreenRotationIcon from "@icons/ScreenRotationIcon.svelte";
  import { writable } from "svelte/store";
  import BigButton from "@client/reusable/BigButton.svelte";
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { regionUrl, requestRegion } from "../facsimile-worker";
  import { BehaviorSubject, combineLatest, map, filter } from "rxjs";
  import { editRegionPoints$ } from "../facsimile-events";

  export let element: TextEntity | ImageEntity | LineEntity | undefined;
  let rotation = writable(element?.region ? lodash.last(element.region)! : 0);
  const dispatch = createEventDispatcher();
  const pageId: string = getContext("id");
  const url = regionUrl.pipe(
    filter((v) => v.pageId === pageId && v.id.startsWith("preview")),
    map((v) => v.region),
  );

  export const rotationWatcher = new BehaviorSubject(0);
  $: {
    rotationWatcher.next($rotation);
  }

  const sub = combineLatest([editRegionPoints$, rotationWatcher]).subscribe(
    ([points, rotationValue]) => {
      requestRegion(
        {
          id: "preview",
          region: [...points, rotationValue],
          color: "",
          order: 0,
        },
        pageId,
      );
    },
  );

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

<PanelContainer panelHasCommandBar={false}>
  <h2 class="w-full text-center text-lg">
    Define region for element: [{(element?.order ?? 0) + 1}.
    {element?.position}]
  </h2>
  <div class="flex items-baseline justify-around">
    <p>Rotation:</p>
    <div class="p-2">
      <label for="filter" class="sr-only"> Rotation </label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <ScreenRotationIcon className="text-primary-800 h-5 w-5" />
        </div>
        <input
          value={$rotation}
          type="number"
          min="1"
          step="1"
          max="359"
          name="rotation"
          id="filter"
          on:change={(e) => {
            let value = 0;
            // @ts-ignore
            if (e.target?.value) {
              // @ts-ignore
              value = parseInt(e.target.value);
            }
            if (!isNaN(value)) {
              rotation.set(value);
            }
          }}
          class="text-secondary-900 focus:ring-secondary-600 block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <RotationsButtonGroup {rotation} />
  </div>

  <img
    class="rounded"
    style="max-width: 100%; max-height: 50%;"
    width="auto"
    height="auto"
    src={$url}
    alt="failed"
  />

  <div class="flex w-full justify-center">
    <BigButton
      className="bg-secondary-100 mt-2"
      on:click={() => dispatch("done")}
    >
      Done
    </BigButton>
  </div>
</PanelContainer>
