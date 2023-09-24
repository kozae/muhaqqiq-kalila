import type { ILayoutElement } from "pages-tool-store-worker";

export function getScale(ration: number) {
  return (arr: ILayoutElement[]) =>
    arr.map((el) => {
      const region: number[] = [];
      if (el.region) {
        const rotation = el.region[el.region.length - 1];
        const points = el.region.slice(0, -1).map((v) => v! * ration!);
        region.push(...points);
        region.push(rotation!);
      }
      return { ...el, region };
    });
}
