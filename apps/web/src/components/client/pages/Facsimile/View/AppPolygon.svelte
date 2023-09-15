<script lang="ts">
  import { Line, Group, Text } from "svelte-konva";
  export let region: Array<number>;
  export let color: string;
  export let text: string;

  const OFFSET = 5; // Set the offset as required
  const RADIAN_45_DEGREE = Math.PI / 4;

  // Calculate the text position at 45 degrees to the right of the first point
  let textX = (region[0] ?? 0) + OFFSET * Math.cos(RADIAN_45_DEGREE);
  let textY = (region[1] ?? 0) + OFFSET * Math.sin(RADIAN_45_DEGREE);
</script>

<Group>
  <Line
    config={{
      points: region.slice(0, -1),
      tension: 0.0,
      closed: true,
      stroke: (color && `rgba(${color}, 0.6)`) ?? "rgba(0,0,255, 0.1)",
      fill: (color && `rgba(${color}, 0.3)`) ?? "rgba(0,0,255, 0.1)",
    }}
  />
  <Text
    config={{
      x: textX,
      y: textY,
      text: text ?? "",
      align: "center",
      verticalAlign: "middle",
      fill: "rgba(255, 255, 255, 0.9)",
      fontSize: 24,
      fontStyle: "bold",
    }}
  />
</Group>
