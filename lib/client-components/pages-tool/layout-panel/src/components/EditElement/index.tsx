import {
  IColoredRegion,
  useFacsimileEventStore,
  usePageDataStore,
} from "pages-tool-store";
import { useCallback, useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import RegionPreview from "./RegionPreview";
import { TextElement, Image } from "kalila-graphql";
import { MdScreenRotation } from "react-icons/md";
import { PanelContainer } from "pages-tool-shared-ui";
import { BigButton } from "common-components";
import { RotationsButtonGroup } from "./RotationsButtonGroup";

export default function EditElement({
  element,
}: {
  element:
    | (Image & IColoredRegion)
    | (Omit<TextElement, "lines"> & IColoredRegion)
    | null
    | undefined;
}) {
  const eventHub = useFacsimileEventStore();
  const [rotation, setRotation] = useState(
    element?.region ? element?.region[element.region.length - 1] ?? 0 : 0
  );
  const [updateImageElement, updateTextElement] = usePageDataStore()(
    (state) => [state.updateImageElement, state.updateTextElement]
  );
  const [points, resetWorkspace] = eventHub((state) => [
    state.regionUnderEdit,
    () => {
      state.toggleRegionSelectedForEditing(undefined);
      state.setFacsimileSpaceMode("view");
    },
  ]);

  const region$ = useRef(
    new BehaviorSubject<(number | null)[] | undefined | null>(
      element?.region?.slice(0, -1)
    )
  );

  const onDone = useCallback(() => {
    if (element?.position?.includes("image")) {
      updateImageElement(element.id, {
        region: [...region$.current.getValue()!, rotation],
      });
    } else {
      updateTextElement(element!.id, {
        region: [...region$.current.getValue()!, rotation],
      });
    }

    resetWorkspace();
  }, [rotation]);

  useEffect(() => {
    if (points) {
      region$.current.next([...points]);
    }
  }, [points]);

  return (
    <PanelContainer classes="mt-1 flex  w-full flex-col p-2">
      <h2 className="w-full text-center text-lg">
        Define region for element: [{(element?.order ?? 0) + 1}.
        {element?.position}]
      </h2>
      <div className="flex items-baseline justify-between">
        <p>Rotation:</p>
        <div className="p-2">
          <label htmlFor="filter" className="sr-only">
            Rotation
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MdScreenRotation
                className="text-primary-800 h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <input
              value={rotation}
              type="number"
              min="1"
              step="1"
              max="359"
              name="rotation"
              id="filter"
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setRotation(!isNaN(val) ? val : 0);
              }}
              className="text-secondary-900 focus:ring-secondary-600 block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <RotationsButtonGroup rotation={rotation} setRotation={setRotation} />
      </div>
      <RegionPreview region$={region$.current} rotation={rotation} />

      <div className="flex w-full justify-center">
        <BigButton className="bg-secondary-100 mt-2" onClick={onDone}>
          Done
        </BigButton>
      </div>
    </PanelContainer>
  );
}
