import useFacsimileSpaceSize from "@hooks/use-facsimile-space-size";
import { usePageDataStore } from "pages-tool-store";
import { ReactNode, createContext } from "react";
import useImage from "use-image";

export interface IElement {
  id: string;
  region?: Array<number | null> | null;
  color?: string;
  order?: string;
}

export interface IState {
  width?: number;
  height?: number;
  scaleRatio?: number;
  image?: HTMLImageElement;
  elements: IElement[];
}

export interface ISizingParameters {
  widthPercentage: number;
  navBarHeight: number;
  margin: number;
}

export interface ISpaceParameters {
  tool: string;
}

export const StateContext = createContext<IState>({ elements: [] });
export default function StateProvider({
  widthPercentage,
  navBarHeight,
  margin,
  tool,
  children,
}: ISizingParameters & ISpaceParameters & { children: ReactNode }) {
  const store = usePageDataStore();
  const imageUrl = store((state) => state.imageDataUrl);
  const [image] = useImage(imageUrl);
  const [width, height, scaleRatio] = useFacsimileSpaceSize(
    [image?.width, image?.height],
    widthPercentage,
    navBarHeight,
    margin
  );

  const elements = store((state) => {
    const scale = (arr: IElement[]) =>
      arr.map((el) => {
        const region: number[] = [];
        if (el.region) {
          const rotation = el.region[el.region.length - 1];
          const points = el.region.slice(0, -1).map((v) => v! * scaleRatio!);
          region.push(...points);
          region.push(rotation!);
        }
        return { ...el, region };
      });
    if (tool === "layout") {
      return scale([...state.text, ...state.images] as IElement[]);
    }
    if (tool === "lines") {
      return scale(state.lines as IElement[]);
    }

    return [] as IElement[];
  });

  return (
    <StateContext.Provider
      value={{ width, height, scaleRatio, image, elements }}
    >
      {children}
    </StateContext.Provider>
  );
}
