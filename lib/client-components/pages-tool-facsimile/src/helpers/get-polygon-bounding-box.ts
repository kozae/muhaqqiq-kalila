export default function getPolygonBoundingBox(vertices: number[]) {
  if (vertices.length % 2 !== 0) {
    throw new Error(
      "Invalid input: the vertices array must have an even number of elements."
    );
  }

  let minX = vertices[0];
  let minY = vertices[1];
  let maxX = vertices[0];
  let maxY = vertices[1];

  for (let i = 2; i < vertices.length; i += 2) {
    const x = vertices[i];
    const y = vertices[i + 1];

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  return [minX, minY, maxX, maxY];
}
