<script lang="ts">
  import type { ChapterCollationRow } from "kalila-graphql";
  import { getContext } from "svelte";

  export let data: ChapterCollationRow | null = null;
  const chapter = getContext("chapter") ? `${getContext("chapter")}.` : "";
</script>

<div class="flex w-full bg-secondary-200">
  <div class="font-bold p-2 sticky left-0 text-primary-500">
    ({chapter}{data?.order}) {data?.title}
  </div>
</div>
