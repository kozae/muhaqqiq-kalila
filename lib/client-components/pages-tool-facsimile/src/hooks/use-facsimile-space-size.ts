import useWindowSize from "./use-window-size";

export default function useFacsimileSpaceSize(
  imSize: [number | undefined, number | undefined],
  widthPercentage: number,
  navBarHeight: number,
  margin: number
) {
  const windowSize = useWindowSize();
  const maxHeight = windowSize.height - navBarHeight - 2 * margin;
  const maxWidth = (Math.min(windowSize.width, 1600) * widthPercentage) / 100;

  let scaleRatio = 1,
    width = imSize[0],
    height = imSize[1];

  if (
    imSize[1] &&
    imSize[0] &&
    (imSize[1] > maxHeight || imSize[0] > maxWidth)
  ) {
    scaleRatio = maxHeight / imSize[1];
    height = maxHeight;
    width = imSize[0] * scaleRatio;
    if (width > maxWidth) {
      scaleRatio = maxWidth / imSize[0];
      width = maxWidth;
      height = (imSize[1] * width) / imSize[0];
    }
  }

  return [width, height, scaleRatio];
}
