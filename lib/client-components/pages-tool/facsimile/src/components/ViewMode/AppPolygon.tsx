import { Line, Group, Text } from "react-konva";

export default function AppPolygon({
  region,
  color,
  text,
}: {
  region: Array<number | null>;
  color?: string;
  text?: string;
}) {
  const OFFSET = 5; // Set the offset as required
  const RADIAN_45_DEGREE = Math.PI / 4;

  // Calculate the text position at 45 degrees to the right of the first point
  const textX = (region[0] ?? 0) + OFFSET * Math.cos(RADIAN_45_DEGREE);
  const textY = (region[1] ?? 0) + OFFSET * Math.sin(RADIAN_45_DEGREE);

  return (
    <Group>
      <Line
        points={region.slice(0, -1) as number[]}
        tension={0.0}
        closed
        stroke={(color && `rgba(${color}, 0.6)`) ?? "rgba(0,0,255, 0.1)"}
        fill={(color && `rgba(${color}, 0.3)`) ?? "rgba(0,0,255, 0.1)"}
      />
      <Text
        x={textX}
        y={textY}
        text={text ?? ""}
        align="center"
        verticalAlign="middle"
        // fill={(color && `rgba(${color}, 1)`) ?? "rgba(0,0,255, 0.1)"}
        fill="rgba(255, 255, 255, 0.9)"
        fontSize={24}
        fontStyle="bold"
      />
    </Group>
  );
}
