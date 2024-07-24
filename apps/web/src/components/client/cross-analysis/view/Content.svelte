<script lang="ts">
  import Cells from "./Cells.svelte";
  import Chart from "./Chart.svelte";
  import { getCrossAnalysisColors } from "./colors";
  import {
    assignColorsToAnalysis,
    assignColorsToText,
    createVisualizationData,
  } from "./model";
  import RowHeading from "./RowHeading.svelte";

  export let data: any;

  const analysisWithColors = assignColorsToAnalysis(data.analysis);

  const coloredPassages = assignColorsToText(analysisWithColors, data.passages);

  const visualizationData = createVisualizationData(analysisWithColors);
  const colorsAndNames = visualizationData.groups.map((group) => ({
    color: group.color,
    name: group.colorName,
    textColor: group.textColor,
  }));
</script>

<div class="flex flex-col w-full h-fit">
  <RowHeading info={data?.info} />
  <div class="w-full overflow-x-scroll">
    <div class="flex flex-col w-fit min-w-full">
      <Cells {coloredPassages} sigla={data.sigla} />
    </div>
  </div>

  <div class="flex justify-around items-start p-4 w-full">
    <div class="w-6/12">
      <Chart data={visualizationData} sigla={data.sigla} />
    </div>

    <div class="w-4/12 h-fit flex flex-wrap">
      {#each colorsAndNames as { color, name, textColor }}
        <div
          class="w-1/4 m-1 p-1 rounded-md"
          style="background-color: {color}; color: {textColor}"
        >
          <span>{name}</span>
        </div>
      {/each}
    </div>
  </div>
</div>
