export const base46 = (data: string) =>
  data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

export function hexToRgbUint32Array(hex: string): Uint32Array {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const { r, g, b } = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
  const arr = new Uint32Array(3);
  arr[0] = r;
  arr[1] = g;
  arr[2] = b;
  return arr;
}

export function colorStringToUint32Array(input: string): Uint32Array {
  let stringNumbers = input.split(",");
  let numArray = stringNumbers.map((numStr) => Number(numStr.trim()));

  // Validate input
  if (
    !numArray.every(
      (num) => Number.isInteger(num) && num >= 0 && num <= 4294967295
    )
  ) {
    throw new Error("Input string does not contain valid Uint32 numbers.");
  }

  return new Uint32Array(numArray);
}

export function decideTextColor(input: string): string {
  let stringNumbers = input.split(",");
  let numArray = stringNumbers.map((numStr) => Number(numStr.trim()));
  let RsRGB = numArray[0] / 255;
  let GsRGB = numArray[1] / 255;
  let BsRGB = numArray[2] / 255;

  let R =
    RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  let G =
    GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  let B =
    BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

  let L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return L > 0.179 ? "black" : "white";
}
