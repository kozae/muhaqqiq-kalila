import { StateContext } from "@state/StateProvider";
import { useContext } from "react";
import { Layer, Image } from "react-konva";

export default function ImageLayer() {
  const { image, width, height } = useContext(StateContext);
  return (
    <Layer listening={false}>
      <Image x={0} y={0} width={width} height={height} image={image} />
    </Layer>
  );
}
