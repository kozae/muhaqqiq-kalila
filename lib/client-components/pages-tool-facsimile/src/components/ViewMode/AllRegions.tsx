import { Group } from "react-konva";
import AppPolygon from "./AppPolygon";
import useStateSize from "@hooks/use-stage-size";
import { IElement } from "@state/StateProvider";

export default function AllRegions({ elements }: { elements: IElement[] }) {
  const { scaleRatio } = useStateSize();
  return (
    <Group>
      {scaleRatio &&
        elements
          .filter((el) => el.region !== undefined && el.region !== null)
          .map((el) => (
            <AppPolygon
              key={el.id}
              region={el.region!}
              color={el.color}
              text={el.order! + 1}
            />
          ))}
    </Group>
  );
}
