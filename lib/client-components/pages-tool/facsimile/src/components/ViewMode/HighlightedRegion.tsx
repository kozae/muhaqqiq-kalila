import { Group } from "react-konva";
import ComplementaryPolygon from "./ComplementaryPolygon";
import useStateSize from "@hooks/use-stage-size";
import { IElement } from "@state/StateProvider";

export default function HighLightedRegion({ element }: { element?: IElement }) {
  const { width, height } = useStateSize();
  const region = element?.region;
  return region ? (
    <Group>
      {width && height && (
        <ComplementaryPolygon region={region} stageSize={{ width, height }} />
      )}
    </Group>
  ) : (
    <></>
  );
}
