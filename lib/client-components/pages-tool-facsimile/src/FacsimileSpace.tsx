import { usePageDataStore } from "pages-tool-store";
import useImage from "use-image";
import { useFacsimileSpaceSize } from "./use-facsimile-space-size";
import { Stage, Layer, Image } from "react-konva";

const imageRoot = "https://kalila-pages.s3.eu-central-1.amazonaws.com/";

export interface IFacsimileSpaceProps {
  tool: string;
  mode: string;
  widthPercentage: number;
  navBarHeight: number;
  margin: number;
}

export function FacsimileSpace({
  tool,
  mode,
  widthPercentage,
  navBarHeight,
  margin,
}: IFacsimileSpaceProps) {
  const store = usePageDataStore();
  const imageUrl = store((state) => state.page.image);
  const [image] = useImage(`${imageRoot}${imageUrl}`);
  const [width, height, scaleRatio] = useFacsimileSpaceSize(
    [image?.width, image?.height],
    widthPercentage,
    navBarHeight,
    margin
  );

  return (
    <Stage
      className="border-secondary-100 border-2 border-solid shadow-lg"
      width={width}
      height={height}
    >
      <Layer>
        <Image x={0} y={0} width={width} height={height} image={image} />
      </Layer>
    </Stage>
  );
}
