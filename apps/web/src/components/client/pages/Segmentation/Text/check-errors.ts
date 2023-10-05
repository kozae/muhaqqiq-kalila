import type {
  SegmentEndFromPreviousPageMark,
  SegmentStartMark,
  SegmentationToken,
} from "pages-tool-store-worker";

export function tagPlacementErrors(text: SegmentationToken[][]) {
  const errors: string[] = [];
  const endMarks: Record<
    string,
    { lineIndex: number; tokenIndex: number; display: string }
  > = {};

  const startMarks: Record<
    string,
    { lineIndex: number; tokenIndex: number; display: string }
  > = {};

  let lastStartToken:
    | SegmentStartMark
    | SegmentEndFromPreviousPageMark
    | undefined = undefined;
  text.forEach((line, lineIndex) => {
    line.forEach((token, tokenIndex) => {
      const isLastToken = tokenIndex === line.length - 1;
      if (token.type === "end") {
        endMarks[token.unitId] = {
          lineIndex,
          tokenIndex,
          display: token.display,
        };
        if (tokenIndex === 0) {
          errors.push(
            `End mark for unitId ${token.display} is placed as the first element of the line.`,
          );
        }
        if (lastStartToken && lastStartToken.unitId !== token.unitId) {
          errors.push(
            `End mark for unitId ${token.display} is placed after start mark for unitId ${lastStartToken.display}.`,
          );
        }
        if (!isLastToken && line[tokenIndex + 1].type !== "token") {
          errors.push(
            `End mark for unit ${token.display} is placed too close to another mark.`,
          );
        }
      }

      if (token.type === "start" || token.type === "endFromPrev") {
        lastStartToken = token;
        startMarks[token.unitId] = {
          lineIndex,
          tokenIndex,
          display: token.display,
        };
        if (tokenIndex === line.length - 1) {
          errors.push(
            `Start mark for unitId ${token.display} is placed as the last element of the line.`,
          );
        }

        if (!isLastToken && line[tokenIndex + 1].type !== "token") {
          errors.push(
            `Start mark for unit ${token.display} is placed too close to another mark.`,
          );
        }
      }
    });
  });

  for (const [unitId, { lineIndex, tokenIndex, display }] of Object.entries(
    endMarks,
  )) {
    const { lineIndex: startLine, tokenIndex: startToken } = startMarks[unitId];

    if (lineIndex < startLine) {
      errors.push(
        `End mark for unit ${display} is placed before its start mark.`,
      );
    }
    if (lineIndex === startLine && tokenIndex <= startToken + 1) {
      errors.push(
        `End mark for unit ${display} is placed too close to its start mark.`,
      );
    }
  }

  return errors;
}
