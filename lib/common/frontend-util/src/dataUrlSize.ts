export function calculateSizeFromDataURL(dataUrl: string): string {
  const sizeInBytes = dataUrl.length * (3 / 4) - 2; // Base64 size calculation
  const sizeInMB = (sizeInBytes / 1024 ** 2).toFixed(2); // Convert bytes to MB and limit decimal places
  return sizeInMB;
}
