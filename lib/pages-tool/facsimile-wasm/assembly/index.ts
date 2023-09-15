// The entry file of your WebAssembly module.

class BoundsResult {
  public x: i32 = 0;
  public y: i32 = 0;
  public moved: bool = false;
}

export function checkBounds(
  x: i32,
  y: i32,
  width: i32,
  height: i32,
  radius: i32
): BoundsResult {
  let result = new BoundsResult();

  result.x = x;
  result.y = y;

  if (x - radius < 0) result.x = radius;
  if (x + radius > width) result.x = width - radius;
  if (y - radius < 0) result.y = radius;
  if (y + radius > height) result.y = height - radius;

  result.moved = x != result.x || y != result.y;

  return result;
}
