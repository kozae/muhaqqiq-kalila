import {
  PhotoIcon,
  DocumentTextIcon,
  TrashIcon,
  ArrowsUpDownIcon,
  EyeIcon,
} from "@heroicons/react/20/solid";
import { Tooltip } from "common-components";
import { MdOutlineHideImage, MdOutlineHighlightAlt } from "react-icons/md";
import type { Identifier, XYCoord } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface LayoutElementProps {
  el: any;
  index: number;
  highlightedRegion: string | undefined;
  toggleHighlightedRegion: (id?: string) => void;
  canDelete: Record<string, boolean>;
  remove: Record<string, () => void>;
  toggleZoomedRegion: (id: string) => void;
  editRegion: (id: string) => void;
  setMode: (mode: "view" | "edit" | "create") => void;
  moveElement: (oldOrder: number, newOrder: number) => void;
}

export function LayoutElement({
  el,
  highlightedRegion,
  toggleHighlightedRegion,
  canDelete,
  remove,
  toggleZoomedRegion,
  editRegion,
  setMode,
  index,
  moveElement,
}: LayoutElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    any,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "EL",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveElement(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag, previw] = useDrag({
    type: "EL",
    item: () => {
      return { id: el.id, index };
    },

    collect: (monitor: any) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));
  return (
    <div
      ref={previw}
      key={el?.id}
      className={
        highlightedRegion === el?.id
          ? "m-1 flex scale-105 items-center justify-between rounded p-4"
          : "m-1 flex items-center justify-between rounded p-4"
      }
      style={{
        border: `solid 3px rgba(${el?.color ?? "240,239,60"}, 0.6)`,
        backgroundColor: `rgba(${el?.color ?? "240,239,60"}, 0.3)`,
        opacity,
      }}
      onMouseEnter={() => el?.region && toggleHighlightedRegion(el?.id)}
      onMouseLeave={() => el?.region && toggleHighlightedRegion(undefined)}
    >
      <div className="flex items-center">
        {el?.position?.startsWith("image") ? (
          <PhotoIcon
            className="text-primary-500 mr-2 h-8 w-8 rounded"
            aria-hidden="true"
          />
        ) : (
          <DocumentTextIcon
            className="text-primary-500 t mr-2 h-8 w-8 rounded "
            aria-hidden="true"
          />
        )}

        <h1 className="text-xl">
          {el?.order! + 1}. &nbsp; {el?.position}
        </h1>
      </div>
      <div className="flex items-center">
        {canDelete[el?.id ?? ""] && (
          <button onClick={remove[el?.id ?? ""]}>
            <TrashIcon
              className="hover:text-secondary-700 mr-2 h-4 w-4 rounded text-red-500"
              aria-hidden="true"
            />
          </button>
        )}
        {!el?.region && (
          <Tooltip message="no facsimile region defined">
            <MdOutlineHideImage className="mr-2  h-8 w-8 rounded text-gray-500" />
          </Tooltip>
        )}
        <div
          ref={ref}
          className="hover:cursor-grab active:active:cursor-grabbing"
          data-handler-id={handlerId}
        >
          <ArrowsUpDownIcon
            className="text-primary-500 mr-2 h-8 w-8 rounded"
            aria-hidden="true"
          />
        </div>

        {el?.region && (
          <button>
            <EyeIcon
              className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
              aria-hidden="true"
              onClick={() => toggleZoomedRegion(el!.id)}
            />
          </button>
        )}
        <button
          onClick={() => {
            editRegion(el!.id);
            setMode("edit");
          }}
        >
          <MdOutlineHighlightAlt
            className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
