import { Storage } from "aws-amplify";

export async function getJobData(id: string) {
  const { results } = await Storage.list(`line_detection_jobs/${id}`, {
    pageSize: 100,
  });
  return results;
}

export async function fetchAndParseS3Json(key: string) {
  const response = await Storage.get(key, { download: true });
  if (response.Body) {
    const text = await response.Body.text();
    return JSON.parse(text);
  }
  throw new Error("No body in S3 response");
}

export function formatDatetime(input: string | Date): string {
  // Try parsing the date with Date constructor
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    // If parsing fails, return the input as is
    return "";
  }

  // Return the formatted date
  // This example returns in the format 'Sep 22, 2023 14:32'
  return `${date.toLocaleString("en-US", {
    month: "short",
  })} ${date.getDate()}, ${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
