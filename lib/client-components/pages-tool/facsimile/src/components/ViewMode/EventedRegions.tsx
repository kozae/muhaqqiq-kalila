import { Group, Line } from "react-konva";

import { IElement } from "@state/StateProvider";
import { useFacsimileEventStore } from "../../../../store";

export default function EventedRegions({ elements }: { elements: IElement[] }) {
  const eventStore = useFacsimileEventStore();
  const toggleHighlightedRegion = eventStore(
    (state) => state.toggleHighlightedRegion
  );

  const cells = elements.map((el) => {
    return (
      <Line
        key={el.id}
        fill="transparent"
        points={el.region?.slice(0, -1) as number[]}
        closed
        onMouseEnter={() => toggleHighlightedRegion(el.id)}
        onMouseLeave={() => toggleHighlightedRegion(undefined)}
      />
    );
  });

  return <Group>{cells}</Group>;
}

function flattenTuples(arr: [number, number][]): number[] {
  return arr.reduce((acc: number[], tuple: [number, number]) => {
    return acc.concat(tuple);
  }, []);
}
