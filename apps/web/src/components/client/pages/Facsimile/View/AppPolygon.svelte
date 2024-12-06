<script lang="ts">
  import { Line, Group, Text } from "svelte-konva";
  export let region: Array<number>;
  export let color: string;
  export let text: string;

  const OFFSET = 5; // Set the offset as required

  // Extract the rotation value
  const rotation = region[8] ?? 0;

  // Calculate the text position based on the rotation value
  let textX =
    Math.min(
      region[0] ?? Infinity,
      region[2] ?? Infinity,
      region[4] ?? Infinity,
      region[6] ?? Infinity,
    ) + OFFSET;
  let textY =
    Math.min(
      region[1] ?? Infinity,
      region[3] ?? Infinity,
      region[5] ?? Infinity,
      region[7] ?? Infinity,
    ) + OFFSET;
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
