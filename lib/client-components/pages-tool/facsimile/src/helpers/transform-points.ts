export default function transformPoints(input: number[]) {
  const result: { x: number; y: number }[] = [];

  // Checking if the array length is even
  if (input.length % 2 !== 0) {
    throw new Error("Array length must be even");
  }

  for (let i = 0; i < input.length; i += 2) {
    const circleData = {
      x: input[i],
      y: input[i + 1],
    };
    result.push(circleData);
  }

  return result;
}
