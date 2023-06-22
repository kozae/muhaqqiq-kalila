type Point = {
  x: number;
  y: number;
};

// Calculate Euclidean distance between two points
function getDistance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

// Check whether b is between a and c
function isBetween(a: Point, b: Point, c: Point): boolean {
  // If b is on the line, the sum of AB and BC should be equal to AC
  return getDistance(a, b) + getDistance(b, c) === getDistance(a, c);
}

// Calculate slope
function getSlope(a: Point, b: Point): number {
  if (a.x == b.x) return Infinity; // Vertical line
  return (b.y - a.y) / (b.x - a.x);
}

// Check whether p lies on the line formed by a and b
function isOnLine(a: Point, b: Point, p: Point): boolean {
  let slopeAB = getSlope(a, b);
  let slopeAP = getSlope(a, p);

  // Points are on the same line if their slopes with a common point are equal
  return slopeAB == slopeAP && isBetween(a, p, b);
}

// Get minimum Euclidean distance from the point to any point on the line segment
function getLineDistance(a: Point, b: Point, p: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (dx === 0 && dy === 0) {
    return getDistance(a, p);
  }

  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);

  if (t < 0) {
    return getDistance(a, p);
  }

  if (t > 1) {
    return getDistance(b, p);
  }

  return getDistance(p, {
    x: a.x + t * dx,
    y: a.y + t * dy,
  });
}

// Main function
export default function getClosestLine(
  points: Point[],
  newPoint: Point
): number[] {
  let n = points.length;
  let minDistance = Infinity;
  let closestLine = [-1, -1];

  // Check each pair of points
  for (let i = 0; i < n; i++) {
    if (isOnLine(points[i], points[(i + 1) % n], newPoint)) {
      // Return the index of the line where the new point intersects
      return [i, (i + 1) % n];
    }

    // Find the closest line
    let distance = getLineDistance(points[i], points[(i + 1) % n], newPoint);
    if (distance < minDistance) {
      minDistance = distance;
      closestLine = [i, (i + 1) % n];
    }
  }

  // If the point does not intersect any line, return the closest line
  return closestLine;
}
