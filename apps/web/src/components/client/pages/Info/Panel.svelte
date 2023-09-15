<script lang="ts">
  import { info$, requestState } from "@client/pages/store";
  import Display from "./Display.svelte";
  import Edit from "./Edit.svelte";
  import { map } from "rxjs";
  requestState("page");
  let mode: "view" | "edit" = "view";
  const editableValues$ = info$.pipe(
    map((info) => {
      if (!info) return undefined;
      const { commentary, foliation, pagination, tags } = info;
      return {
        commentary: (commentary || []).join("\n"),
        foliation: foliation || "",
        pagination: pagination || 0,
        tags: (tags || []).join(", "),
      };
    }),
  );
</script>

{#if mode === "view"}
  <Display bind:mode />
{:else if $editableValues$}
  <Edit bind:mode initialValues={$editableValues$} />
{/if}
