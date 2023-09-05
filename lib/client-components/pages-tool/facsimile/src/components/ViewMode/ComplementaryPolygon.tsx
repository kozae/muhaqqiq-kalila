import getPolygonBoundingBox from "@helpers/get-polygon-bounding-box";
import { Rect, Group } from "react-konva";

export default function ComplementaryPolygon({
  region,
  stageSize,
}: {
  region: Array<number | null>;
  stageSize: { width: number; height: number };
}) {
  const [minX, minY, maxX, maxY] = getPolygonBoundingBox(
    region.slice(0, -1) as number[]
  );

  const fill = "rgba(0,0,0, 0.5)";

  return (
    <Group>
      <Rect x={0} y={0} width={stageSize.width} height={minY} fill={fill} />
      <Rect
        x={0}
        y={maxY}
        width={stageSize.width}
        height={stageSize.height - maxY}
        fill={fill}
      />
      <Rect x={0} y={minY} width={minX} height={maxY - minY} fill={fill} />
      <Rect
        x={maxX}
        y={minY}
        width={stageSize.width - maxX}
        height={maxY - minY}
        fill={fill}
      />
    </Group>
  );
}
