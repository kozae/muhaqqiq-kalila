import { useFacsimileEventStore } from "../../../../store";
import HighLightedRegion from "./HighlightedRegion";
import AllRegions from "./AllRegions";
import { Layer } from "react-konva";
import EventedRegions from "./EventedRegions";
import useElements from "@hooks/use-elements";

export default function ViewModeRegions() {
  const elements = useElements();

  const eventHub = useFacsimileEventStore();
  const highlightedRegion = eventHub(
    ({ highlightedRegion }) => highlightedRegion
  );
  return (
    <Layer>
      {highlightedRegion && (
        <HighLightedRegion
          element={elements.find((el) => el.id === highlightedRegion)!}
        />
      )}
      {!highlightedRegion && <AllRegions elements={elements} />}
      <EventedRegions elements={elements} />
    </Layer>
  );
}
