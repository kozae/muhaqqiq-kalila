<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import type { VisualizationData } from "./model";

  export let data: VisualizationData;
  export let sigla: string[];

  const groups = data.groups;

  let chartContainer: HTMLDivElement;

  onMount(() => {
    const margin = { top: 40, right: 0, bottom: 60, left: 100 }; // Increased margins
    const width = chartContainer.clientWidth - margin.left - margin.right;
    const height = chartContainer.clientHeight - margin.top - margin.bottom;

    const svg = d3
      .select(chartContainer)
      .append("svg")
      .attr("width", chartContainer.clientWidth) // Full width of container
      .attr("height", chartContainer.clientHeight) // Full height of container
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const yScale = d3
      .scaleBand()
      .domain(groups.map((d) => d.key))
      .range([0, height])
      .padding(0.1);

    const xScale = d3.scaleBand().domain(sigla).range([0, width]).padding(0.1);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(30)")
      .style("text-anchor", "start")
      .style("font-size", "1rem");

    svg
      .append("g")
      .attr("class", "y-axis font-arabicnoto")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end")
      .style("font-size", "1rem");

    groups.forEach((d) => {
      d.sources.forEach((source) => {
        svg
          .append("rect")
          .attr("x", xScale(source) ?? 0)
          .attr("y", yScale(d.key) ?? 0)
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("fill", d.color);
      });
    });
  });
</script>

<div bind:this={chartContainer} class="chart-container"></div>

<style>
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style>
