export const highlightColors = [
  "100,149,237",
  "192,57,43",
  "142,68,173",
  "22,160,133",
  "255,255,194",
  "86,101,115",
  "46,204,113",
  "0,32,194",
  "111,78,55",
  "231,116,113",
  "100,233,134",
  "200,162,200",
  "211,84,0",
  "127,82,93",
];

export function determineTokenState(token: string): {
  token: string;
  state: string;
} {
  if (token.startsWith("†") || token.endsWith("†"))
    return { token: token.replace("†", ""), state: "corrupt" };
  if (token.startsWith("*") || token.endsWith("*"))
    return { token: token.replace("*", ""), state: "emended" };
  if (token.startsWith("?") || token.endsWith("?") || token.startsWith("؟") || token.endsWith("؟"))
    return { token: token.replace("?", ""), state: "unintelligible" };
  if (token.startsWith("!") || token.endsWith("!"))
    return { token: token.replace("!", ""), state: "lexicalError" };

  if (token.startsWith("[[") && token.endsWith("]]"))
    return { token: token.slice(2, -2), state: "crossOut" };
  if (token.startsWith("[[") || token.endsWith("[["))
    return { token: token.replace("[[", ""), state: "crossOutBegin" };
  if (token.endsWith("]]") || token.startsWith("]]"))
    return { token: token.replace("]]", ""), state: "crossOutEnd" };

  if (token.startsWith("[") && token.endsWith("]"))
    return { token: token.slice(1, -1), state: "dittography" };
  if (token.startsWith("[") || token.endsWith("["))
    return { token: token.replace("[", ""), state: "dittographyBegin" };
  if (token.endsWith("]") || token.startsWith("]"))
    return { token: token.replace("]", ""), state: "dittographyEnd" };

  if (token.startsWith("{") && token.endsWith("}"))
    return { token: token.slice(1, -1), state: "suppletion" };
  if (token.startsWith("{") || token.endsWith("{"))
    return { token: token.replace("{", ""), state: "suppletionBegin" };
  if (token.endsWith("}") || token.startsWith("}"))
    return { token: token.replace("}", ""), state: "suppletionEnd" };

  if (token.startsWith("<") && token.endsWith(">"))
    return { token: token.slice(1, -1), state: "added" };
  if (token.startsWith("<") || token.endsWith("<"))
    return { token: token.replace("<", ""), state: "addedBegin" };
  if (token.endsWith(">") || token.startsWith(">"))
    return { token: token.replace(">", ""), state: "addedEnd" };

  if (token.startsWith("(") && token.endsWith(")"))
    return { token: token.slice(1, -1), state: "title" };
  if (token.startsWith("(") || token.endsWith("("))
    return { token: token.replace("(", ""), state: "titleBegin" };
  if (token.endsWith(")") || token.startsWith(")"))
    return { token: token.replace(")", ""), state: "titleEnd" };

  return { token, state: "sound" };
}

export function formatTokenRev(token: string, state: string): string {
  switch (state) {
    case "corrupt":
      return `${token}†`;
    case "emended":
      return `${token}*`;
    case "unintelligible":
      return `${token}?`;
    case "lexicalError":
      return `${token}!`;
    case "dittography":
      return `[${token}]`;
    case "dittographyEnd":
      return `[${token}`;
    case "dittographyBegin":
      return `${token}]`;
    case "crossOut":
      return `[[${token}]]`;
    case "crossOutEnd":
      return `[[${token}`;
    case "crossOutBegin":
      return `${token}]]`;
    case "suppletion":
      return `{${token}}`;
    case "suppletionEnd":
      return `{${token}`;
    case "suppletionBegin":
      return `${token}}`;
    case "added":
      return `<${token}>`;
    case "addedEnd":
      return `<${token}`;
    case "addedBegin":
      return `${token}>`;
    case "title":
      return `(${token})`;
    case "titleEnd":
      return `(${token}`;
    case "titleBegin":
      return `${token})`;
    default:
      return token;
  }
}

export function formatToken(token: string, state: string): string {
  switch (state) {
    case "corrupt":
      return `†${token}`;
    case "emended":
      return `*${token}`;
    case "unintelligible":
      return `?${token}`;
    case "lexicalError":
      return `!${token}`;
    case "dittography":
      return `[${token}]`;
    case "dittographyEnd":
      return `${token}]`;
    case "dittographyBegin":
      return `[${token}`;
    case "crossOut":
      return `[[${token}]]`;
    case "crossOutEnd":
      return `${token}]]`;
    case "crossOutBegin":
      return `[[${token}`;
    case "suppletion":
      return `{${token}}`;
    case "suppletionEnd":
      return `${token}}`;
    case "suppletionBegin":
      return `{${token}`;
    case "added":
      return `<${token}>`;
    case "addedEnd":
      return `${token}>`;
    case "addedBegin":
      return `<${token}`;
    case "title":
      return `(${token})`;
    case "titleEnd":
      return `${token})`;
    case "titleBegin":
      return `(${token}`;
    default:
      return token;
  }
}

export function formatTokens(tokens: string[] | undefined, states: string[] | undefined) {

  if (!tokens || !states) return;

  return tokens.map((t, i) => formatToken(t, states[i]));
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}


export function getPointAtAdistanceAndAngle(x: number, y: number, distance: number, angle: number) {
  const angleInRadians = angle * Math.PI / 180;
  const X = x + distance * Math.cos(angleInRadians);
  const Y = y + distance * Math.sin(angleInRadians);
  return [X, Y];
}


export function getSubRegion(points: number[], top: number, left: number, width: number, height: number) {
  const [X0, Y0, X1, Y1, X2, Y2, X3, Y3, R] = points;
  const [x0, y0] = getPointAtAdistanceAndAngle(X0, Y0, Math.sqrt(Math.pow(top, 2) + Math.pow(left, 2)), R + 90);
  const [x1, y1] = getPointAtAdistanceAndAngle(x0, y0, width, R);
  const [x2, y2] = getPointAtAdistanceAndAngle(x1, y1, height, R + 90);
  const [x3, y3] = getPointAtAdistanceAndAngle(x0, y0, height, R + 90);

  return [
    Math.round(x0),
    Math.round(y0),
    Math.round(x1),
    Math.round(y1),
    Math.round(x2),
    Math.round(y2),
    Math.round(x3),
    Math.round(y3),
    R
  ];
}

export function getDistance(p1: [number, number], p2: [number, number]) {
  return Math.round(
    Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
  );
}


export function divideTextElementsIntoEqualLineRegions(textElementRegion: number[], lineCount: number): Record<number, number[]> {
  const [x0, y0, x1, y1, x2, y2, x3, y3, r] = textElementRegion;

  // Calculate the height of the text element region
  const height = getDistance([x0, y0], [x3, y3]);
  const width = getDistance([x0, y0], [x1, y1]);

  // Calculate the height of each line region
  const lineHeight = Math.round(height / lineCount);

  // Create an object to store the line regions
  const lineRegions: Record<number, number[]> = {};

  // Calculate and store the region for each line
  for (let i = 0; i < lineCount; i++) {
    const topY = i * lineHeight;

    lineRegions[i] = getSubRegion(textElementRegion, topY, 0, width, lineHeight);
  }

  return lineRegions;
}
