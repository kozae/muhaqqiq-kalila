import type { RectConfig } from "konva/lib/shapes/Rect";

export function getWidthAndHeight(p: number[]) {
  return {
    width: getDistance([p[0], p[1]], [p[2], p[3]]),
    height: getDistance([p[0], p[1]], [p[6], p[7]]),
  };
}

function getDistance(p1: [number, number], p2: [number, number]) {
  return Math.round(
    Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)),
  );
}

function degToRad(degrees: number) {
  return degrees * (Math.PI / 180);
}

function atDistanceAndAngle(
  origin: [number, number],
  distance: number,
  angle: number,
): [number, number] {
  const angleInRad = degToRad(angle);
  return [
    Math.round(origin[0] + distance * Math.cos(angleInRad)),
    Math.round(origin[1] + distance * Math.sin(angleInRad)),
  ];
}

export function fromRect(
  { x, y, width, height, rotation, scaleX, scaleY }: RectConfig,
  scaleRatio: number = 1,
): number[] {
  const scaledWidth = width! * scaleX!;
  const scaledHeight = height! * scaleY!;
  const p1 = [x!, y!] as [number, number],
    p2 = atDistanceAndAngle(p1, scaledWidth, rotation!),
    p3 = atDistanceAndAngle(p2, scaledHeight, rotation! + 90),
    p4 = atDistanceAndAngle(p1, scaledHeight, rotation! + 90);
  const points = [p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]].map(
    (v) => Math.round(v / scaleRatio),
  );

  const rotationValue = Math.round(
    rotation! >= 0 ? rotation! : 360 + rotation!,
  );
  return [...points, rotationValue === 360 ? 0 : rotationValue];
}

export function getSubRegion(
  p: number[],
  rotation: number,
  {
    top,
    left,
    width,
    height,
  }: { top: number; left: number; width: number; height: number },
) {
  const p1 = atDistanceAndAngle(
      [p[0], p[1]],
      Math.sqrt(Math.pow(top, 2) + Math.pow(left, 2)),
      rotation + 90,
    ),
    p2 = atDistanceAndAngle(p1, width, rotation),
    p3 = atDistanceAndAngle(p2, height, rotation + 90),
    p4 = atDistanceAndAngle(p1, height, rotation + 90);
  return [p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1], rotation];
}
