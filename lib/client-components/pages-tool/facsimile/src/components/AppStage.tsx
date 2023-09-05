import useStageSize from "@hooks/use-stage-size";
import Konva from "konva";
import { ReactNode, useCallback, useState } from "react";
import { Line, Stage, Layer } from "react-konva";

export default function AppStage({ children }: { children: ReactNode }) {
  const { width, height } = useStageSize();
  const [cursorPos, setCursorPos] = useState<Konva.Vector2d>({ x: 0, y: 0 });
  const [isCrosshairVisible, setIsCrosshairVisible] = useState(false);

  const handleMouseMove = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = event.target.getStage();
      const mousePos = stage!.getPointerPosition();
      setCursorPos(mousePos!);
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsCrosshairVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsCrosshairVisible(false);
  }, []);

  return (
    <Stage
      className="border-secondary-100 border-2 border-solid shadow-lg"
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onDragMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isCrosshairVisible && (
        <Layer listening={false}>
          <Line
            points={[0, cursorPos.y, width!, cursorPos.y]}
            stroke="black"
            strokeWidth={1}
            dash={[10, 10]}
          />
          <Line
            points={[cursorPos.x, 0, cursorPos.x, height!]}
            stroke="black"
            strokeWidth={1}
            dash={[10, 10]}
          />
        </Layer>
      )}
    </Stage>
  );
}
