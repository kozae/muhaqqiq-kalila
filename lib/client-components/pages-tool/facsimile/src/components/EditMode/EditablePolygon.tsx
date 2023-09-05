import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Layer, Circle, Line } from "react-konva";
import Konva from "konva";
import hexToRgba from "@helpers/hex-to-rgba";
import useStageSize from "@hooks/use-stage-size";
import transformPoints from "@helpers/transform-points";
import getClosestLine from "@helpers/get-closest-line";
import { KonvaEventObject } from "konva/lib/Node";
import { useFacsimileEventStore } from "pages-tool-store";
import { checkBounds as wasmCheckBounds } from "pages-tool-facsimile-wasm";

export interface CircleData {
  x: number;
  y: number;
}

const circlesToPoints = (circles: CircleData[]): number[] => {
  return circles
    .map((circle) => [circle.x, circle.y])
    .reduce((prev, current) => prev.concat(current), []);
};

const RADIUS = 15;

export default function EditablePolygon({ init }: { init: number[] }) {
  const eventHub = useFacsimileEventStore();
  const setRegion = eventHub((state) => state.setRegionUnderEdit);
  const { width, height, scaleRatio } = useStageSize();
  const [circles, setCircles] = useState<CircleData[]>(() => {
    return transformPoints(init);
  });

  useEffect(() => setRegion(circlesToPoints(circles)), [circles]);

  const [centerX, centerY] = useMemo(
    () => [
      circles.reduce((sum, { x }) => sum + x, 0) / circles.length,
      circles.reduce((sum, { y }) => sum + y, 0) / circles.length,
    ],

    [circles]
  );

  const layerRef = useRef<Konva.Layer | null>(null);

  const checkBounds = useCallback(
    (x: number, y: number, radius = RADIUS) => {
      if (width && height) return wasmCheckBounds(x, y, width, height, radius);
      return { x, y, moved: false };
    },
    [width, height]
  );

  const handleDragMove = useCallback(
    (
      e: KonvaEventObject<DragEvent>,
      index: number,
      newPos: { x: number; y: number }
    ) => {
      const { x, y } = checkBounds(newPos.x, newPos.y);

      setCircles((curr) => {
        const newCircles = [...curr];
        newCircles[index] = {
          ...newCircles[index],
          x: x / (scaleRatio ?? 1),
          y: y / (scaleRatio ?? 1),
        };
        return newCircles;
      });
    },
    [scaleRatio]
  );

  const handleCenterDragMove = useCallback(
    (newPos: { x: number; y: number }, center: { x: number; y: number }) => {
      const checked = checkBounds(newPos.x, newPos.y);
      const dx = checked.x - center.x * (scaleRatio ?? 1);
      const dy = checked.y - center.y * (scaleRatio ?? 1);

      setCircles((curr) =>
        [...curr].map((circle) => {
          const checked = checkBounds(
            circle.x * (scaleRatio ?? 1) + dx,
            circle.y * (scaleRatio ?? 1) + dy
          );
          return {
            ...circle,
            x: checked.x / (scaleRatio ?? 1),
            y: checked.y / (scaleRatio ?? 1),
          };
        })
      );
    },
    [scaleRatio]
  );

  const addVertix = useCallback(
    (e: any) => {
      const mousePos = e.target.getStage().getPointerPosition();
      const x = mousePos.x / (scaleRatio ?? 1);
      const y = mousePos.y / (scaleRatio ?? 1);
      const insertPosition = getClosestLine(circles, { x, y });
      if (insertPosition[1] !== -1) {
        const newCircle: CircleData = {
          x: x,
          y: y,
        };

        setCircles((curr) => {
          const newCircles = [...curr];
          newCircles.splice(insertPosition[1], 0, newCircle);
          return newCircles;
        });
      }
    },
    [scaleRatio, circles]
  );

  const deleteVertix = (index: number) => {
    if (circles.length > 4) {
      const newCircles = [...circles];
      newCircles.splice(index, 1);
      setCircles(newCircles);
    }
  };

  return (
    <Layer ref={layerRef}>
      {circles.map((circle, index) => (
        <Circle
          key={index}
          x={circle.x * (scaleRatio ?? 1)}
          y={circle.y * (scaleRatio ?? 1)}
          radius={RADIUS}
          stroke="#1b2e3c"
          strokeWidth={1}
          draggable
          onDragMove={(e) =>
            handleDragMove(e, index, { x: e.target.x(), y: e.target.y() })
          }
          onMouseOver={(e) => {
            (e.target as Konva.Circle).radius(RADIUS * 1.5);
            layerRef.current?.batchDraw();
          }}
          onMouseOut={(e) => {
            (e.target as Konva.Circle).radius(RADIUS);
            layerRef.current?.batchDraw();
          }}
          onDblClick={() => deleteVertix(index)}
        />
      ))}

      <Line
        points={circlesToPoints(circles).map((v) => v * (scaleRatio ?? 1))}
        fill={hexToRgba("#4d4d0a", 0.4)}
        stroke={hexToRgba("#4d4d0a", 0.6)}
        strokeWidth={1}
        closed
        onMouseOver={(e) => {
          (e.target as Konva.Line).strokeWidth(5);
          layerRef.current?.batchDraw();
        }}
        onMouseOut={(e) => {
          (e.target as Konva.Line).strokeWidth(1);
          layerRef.current?.batchDraw();
        }}
        onClick={addVertix}
      />
      <Circle
        x={centerX * (scaleRatio ?? 1)}
        y={centerY * (scaleRatio ?? 1)}
        radius={10}
        fill={hexToRgba("#1b2e3c", 0.7)}
        draggable
        onDragMove={(e) =>
          handleCenterDragMove(
            { x: e.target.x(), y: e.target.y() },
            { x: centerX, y: centerY }
          )
        }
        onMouseOver={(e) => {
          (e.target as Konva.Circle).radius(RADIUS * 1.5);
          layerRef.current?.batchDraw();
        }}
        onMouseOut={(e) => {
          (e.target as Konva.Circle).radius(RADIUS);
          layerRef.current?.batchDraw();
        }}
      />
    </Layer>
  );
}
