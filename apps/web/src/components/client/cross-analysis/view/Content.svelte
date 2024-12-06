<script lang="ts">
  import { clearQueryParams } from "./analysis-doc-from-url";
  import AnalysisPanel from "./AnalysisPanel.svelte";
  import Cells from "./Cells.svelte";
  import Chart from "./Chart.svelte";
  import {
    assignColorsToAnalysis,
    assignColorsToText,
    createVisualizationData,
    initializeColoredPassages,
    type VisualizationData,
  } from "./model";
  import RowHeading from "./RowHeading.svelte";
  import { analysis, coloredPassages } from "./store";
  import BigButton from "@client/reusable/BigButton.svelte";

  export let data: any;

  let settings: {
    [key: string]: string;
  } = {};
  let visualizationData: VisualizationData | null = null;
  let colorsAndNames:
    | { color: string; name: string; textColor: string }[]
    | null = null;

  coloredPassages.set(initializeColoredPassages(data.passages));

  $: {
    const loadedAnalysis = $analysis;
    if (loadedAnalysis) {
      settings = loadedAnalysis.settings ?? {};
      const analysisWithColors = assignColorsToAnalysis(loadedAnalysis);
      const loadedColoredPassages = assignColorsToText(
        analysisWithColors,
        data.passages,
      );

      visualizationData = createVisualizationData(analysisWithColors);
      colorsAndNames = visualizationData.groups.map((group) => ({
        color: group.color,
        name: group.colorName,
        textColor: group.textColor,
      }));
      coloredPassages.set(loadedColoredPassages);
    } else {
      coloredPassages.set(initializeColoredPassages(data.passages));
      visualizationData = null;
      colorsAndNames = null;
    }
  }
</script>

<div class="flex flex-col w-full h-fit min-h-[calc(100vh-64px)]">
  <RowHeading info={data?.info} />
  <div class="w-full overflow-x-scroll">
    <div class="flex flex-col w-fit min-w-full">
      <Cells sigla={data.sigla} />
    </div>
  </div>

  {#if visualizationData && colorsAndNames}
    <div class="w-full flex flex-col">
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

        <div class="w-1/12 flex self-stretch justify-center items-center">
          <BigButton
            className="bg-primary-200 text-black m-2"
            on:click={() => {
              clearQueryParams();
              analysis.set(null);
            }}>Back</BigButton
          >
        </div>
      </div>

      <div class="w-full flex flex-col justify-center items-center">
        {#if settings.fragmentationInstructions}
          <div class="w-6/12 m-2 p-2 border rounded">
            <strong>Custom Fragmentation Instructions:</strong>
            <p>{settings.fragmentationInstructions}</p>
          </div>
        {/if}
        {#if settings.refinementInstructions}
          <div class="w-6/12 m-2 p-2 border rounded">
            <strong>Custom Refinement Instructions:</strong>
            <p>{settings.refinementInstructions}</p>
          </div>
        {/if}
        {#if settings.threshold}
          <div class="w-6/12 m-2 p-2 border rounded">
            <strong>Distance Threshold:</strong>
            <p>{settings.threshold}</p>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <AnalysisPanel id={data.id} />
  {/if}
</div>
