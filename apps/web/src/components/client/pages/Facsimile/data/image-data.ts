import {
  debounceTime,
  fromEvent,
  map,
  mergeMap,
  Observable,
  of,
  startWith,
} from "rxjs";
import { imageDataUrl$ } from "@client/pages/store";

function createSizeObservable(
  imSize: [number, number],
  widthPercentage: number = 40,
  navBarHeight: number = 90,
  margin: number = 2,
) {
  const calculate = (windowSize: { height: number; width: number }) => {
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

    return { width, height, scaleRatio };
  };

  return fromEvent(window, "resize").pipe(
    startWith({ height: window.innerHeight, width: window.innerWidth }),
    debounceTime(10),
    map(() =>
      calculate({ height: window.innerHeight, width: window.innerWidth }),
    ),
  );
}

function createImageElement(url: string) {
  return new Observable<HTMLImageElement>((subscriber) => {
    const img = document.createElement("img");
    img.src = url;
    img.onload = () => {
      subscriber.next(img);
      subscriber.complete();
    };
  });
}

const data = imageDataUrl$.pipe(
  mergeMap((url) => (url ? createImageElement(url) : of(undefined))),
  mergeMap((img) =>
    img
      ? createSizeObservable([img.width, img.height]).pipe(
          map((size) => ({ img, ...size })),
        )
      : of(undefined),
  ),
);

export default data;
