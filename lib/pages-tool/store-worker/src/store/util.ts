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
  if (token.startsWith("?") || token.endsWith("?"))
    return { token: token.replace("?", ""), state: "unintelligible" };
  if (token.startsWith("!") || token.endsWith("!"))
    return { token: token.replace("!", ""), state: "lexical-error" };

  if (token.startsWith("[[") && token.endsWith("]]"))
    return { token: token.slice(2, -2), state: "cross-out" };
  if (token.startsWith("[[") || token.endsWith("[["))
    return { token: token.replace("[[", ""), state: "cross-out_begin" };
  if (token.endsWith("]]") || token.startsWith("]]"))
    return { token: token.replace("]]", ""), state: "cross-out_end" };

  if (token.startsWith("[") && token.endsWith("]"))
    return { token: token.slice(1, -1), state: "dittography" };
  if (token.startsWith("[") || token.endsWith("["))
    return { token: token.replace("[", ""), state: "dittography_begin" };
  if (token.endsWith("]") || token.startsWith("]"))
    return { token: token.replace("]", ""), state: "dittography_end" };

  if (token.startsWith("{") && token.endsWith("}"))
    return { token: token.slice(2, -2), state: "suppletion" };
  if (token.startsWith("{") || token.endsWith("{"))
    return { token: token.replace("{", ""), state: "suppletion_begin" };
  if (token.endsWith("}") || token.startsWith("}"))
    return { token: token.replace("}", ""), state: "suppletion_end" };

  if (token.startsWith("<") && token.endsWith(">"))
    return { token: token.slice(1, -1), state: "added" };
  if (token.startsWith("<") || token.endsWith("<"))
    return { token: token.replace("<", ""), state: "added_begin" };
  if (token.endsWith(">") || token.startsWith(">"))
    return { token: token.replace(">", ""), state: "added_end" };

  if (token.startsWith("(") && token.endsWith(")"))
    return { token: token.slice(1, -1), state: "title" };
  if (token.startsWith("(") || token.endsWith("("))
    return { token: token.replace("(", ""), state: "title_begin" };
  if (token.endsWith(")") || token.startsWith(")"))
    return { token: token.replace(")", ""), state: "title_end" };

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
    case "lexical-error":
      return `${token}!`;
    case "dittography":
      return `[${token}]`;
    case "dittography_end":
      return `[${token}`;
    case "dittography_begin":
      return `${token}]`;
    case "cross-out":
      return `[[${token}]]`;
    case "cross-out_end":
      return `[[${token}`;
    case "cross-out_begin":
      return `${token}]]`;
    case "suppletion":
      return `{${token}}`;
    case "suppletion_end":
      return `{${token}`;
    case "suppletion_begin":
      return `${token}}`;
    case "added":
      return `<${token}>`;
    case "added_end":
      return `<${token}`;
    case "added_begin":
      return `${token}>`;
    case "title":
      return `(${token})`;
    case "title_end":
      return `(${token}`;
    case "title_begin":
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
    case "lexical-error":
      return `!${token}`;
    case "dittography":
      return `[${token}]`;
    case "dittography_end":
      return `${token}]`;
    case "dittography_begin":
      return `[${token}`;
    case "cross-out":
      return `[[${token}]]`;
    case "cross-out_end":
      return `${token}]]`;
    case "cross-out_begin":
      return `[[${token}`;
    case "suppletion":
      return `{${token}}`;
    case "suppletion_end":
      return `${token}}`;
    case "suppletion_begin":
      return `{${token}`;
    case "added":
      return `<${token}>`;
    case "added_end":
      return `${token}>`;
    case "added_begin":
      return `<${token}`;
    case "title":
      return `(${token})`;
    case "title_end":
      return `${token})`;
    case "title_begin":
      return `(${token}`;
    default:
      return token;
  }
}

export function formatTokens(tokens: string[], states: string[]) {
  return tokens.map((t, i) => formatToken(t, states[i]));
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
