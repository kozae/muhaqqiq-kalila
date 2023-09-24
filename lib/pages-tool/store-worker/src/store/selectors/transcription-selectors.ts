import { createSelector } from "@reduxjs/toolkit";
import lodash from "lodash";
import { type LineEntity } from "..";
import { selectAllLines, selectAllTextElements } from "../base-selectors";
import { rootSelector } from "./root-selector";

function determineTokenState(token: string): {
  token: string;
  state: string | null;
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

  if (token.startsWith("{{") && token.endsWith("}}"))
    return { token: token.slice(2, -2), state: "suppletion" };
  if (token.startsWith("{{") || token.endsWith("{{"))
    return { token: token.replace("{{", ""), state: "suppletion_begin" };
  if (token.endsWith("}}") || token.startsWith("}}"))
    return { token: token.replace("}}", ""), state: "suppletion_end" };

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

function formatTokenRev(token: string, state: string): string {
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

function formatToken(token: string, state: string): string {
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

function formatTokens(tokens: string[], states: string[]) {
  return tokens.map((t, i) => formatToken(t, states[i]));
}

export const selectTranscriptionPanelData = createSelector(
  rootSelector,
  (state) => {
    const lineList = selectAllLines(state.lines);
    const textList = selectAllTextElements(state.text);

    const grouped = lodash.groupBy(
      lodash.orderBy(lineList, "order"),
      "elementId",
    );
    const bodyLines = [];
    const colors = [];
    const ids = [];
    const points = [];
    const rotations = [];

    for (const el of textList) {
      if (el?.position?.startsWith("main") && grouped[el.id]) {
        for (const line of grouped[el.id]) {
          bodyLines.push(
            formatTokens(
              line!.tokens! as string[],
              line!.states! as string[],
            ).join(" "),
          );
          colors.push(line?.color ?? "#fff");
          ids.push(line?.id ?? "");
          points.push(line?.region?.slice(0, -1) ?? []);
          rotations.push(lodash.last(line?.region) ?? 0);
        }
      }
    }

    const lines: Record<string, LineEntity> = {};
    lineList
      .filter((l) => l?.region !== undefined)
      .forEach((l) => {
        lines[l!.id] = l;
      });

    return {
      bodyLines,
      colors,
      ids,
      points,
      rotations,
      id: state.info!.id,
      lines,
    };
  },
);
