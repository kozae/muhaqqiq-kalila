class SyntaxError {
  public from: u32 = 0;
  public to: u32 = 0;
  public line: u32 = 0;
  public message: string = "";
}

export function findSyntaxErrors(s: string): Array<SyntaxError> {
  return findCharachterSyntaxErrors(s)
    .concat(findInvalidAsteriskSequence(s))
    .concat(findInvalidDotSequence(s))
    .concat(findInvalidSquareBracketSequence(s))
    .concat(findInvalidBraces(s));
}

function isSpaceOrBreak(code: i32): bool {
  return (
    code === " ".charCodeAt(0) ||
    code === "\n".charCodeAt(0) ||
    code === "\r".charCodeAt(0)
  );
}

function spaceCountTo(index: i32, lastLineBreak: u32, s: string): u32 {
  let count: u32 = 0;
  for (let j: i32 = lastLineBreak + 1; j < index; j++) {
    if (s.charCodeAt(j) === " ".charCodeAt(0)) {
      count++;
    }
  }
  return count;
}

function findCharachterSyntaxErrors(s: string): Array<SyntaxError> {
  let result: Array<SyntaxError> = new Array<SyntaxError>();

  let inError: bool = false;
  let start: u32 = 0;
  let message: string = "";
  let lastLineBreak: u32 = -1;

  for (let i: i32 = 0; i < s.length; i++) {
    let charCode: i32 = s.charCodeAt(i);
    if (charCode === "\n".charCodeAt(0)) {
      lastLineBreak = i;
    }

    let isValidChar =
      (charCode >= 0x0621 && charCode <= 0x0652) ||
      isSpaceOrBreak(charCode) ||
      charCode === "*".charCodeAt(0) ||
      charCode === ".".charCodeAt(0) ||
      charCode === "<".charCodeAt(0) ||
      charCode === ">".charCodeAt(0) ||
      charCode === "{".charCodeAt(0) ||
      charCode === "}".charCodeAt(0) ||
      charCode === "]".charCodeAt(0) ||
      charCode === "[".charCodeAt(0) ||
      charCode === "!".charCodeAt(0) ||
      charCode === "؟".charCodeAt(0) ||
      charCode === "(".charCodeAt(0) ||
      charCode === ")".charCodeAt(0) ||
      charCode === "†".charCodeAt(0);

    const isPrefix = ["!", "†", "؟", "{", "<", "("].includes(
      String.fromCharCode(charCode),
    );

    const isSuffix = [")", "}", ">"].includes(String.fromCharCode(charCode));

    if (isPrefix) {
      isValidChar =
        isValidChar && (i === 0 || isSpaceOrBreak(s.charCodeAt(i - 1)));
      if (!isValidChar) message = "wrong symbol use";
    }

    if (isPrefix) {
      isValidChar =
        isValidChar &&
        (i === s.length - 1 || !isSpaceOrBreak(s.charCodeAt(i + 1)));
      if (!isValidChar) message = "wrong symbol use";
    }

    if (isSuffix) {
      isValidChar =
        isValidChar && (i === 0 || !isSpaceOrBreak(s.charCodeAt(i - 1)));
      if (!isValidChar) message = "wrong symbol use";
    }

    if (isSuffix) {
      isValidChar =
        isValidChar &&
        (i === s.length - 1 || isSpaceOrBreak(s.charCodeAt(i + 1)));
      if (!isValidChar) message = "wrong symbol use";
    }

    if (!isValidChar && message === "") {
      message = "Unwanted characters";
    }

    if (!isValidChar) {
      if (!inError) {
        inError = true;
        start = i;
      }
    } else {
      if (inError) {
        const error = new SyntaxError();
        error.from = spaceCountTo(start, lastLineBreak, s) + 1;
        error.to = spaceCountTo(i + 1, lastLineBreak, s) + 1;
        error.line = u32(s.substring(0, start).split("\n").length);
        error.message = message;
        result.push(error);
        inError = false;
        message = "";
      }
    }
  }

  if (inError) {
    const error = new SyntaxError();
    error.from = spaceCountTo(start, lastLineBreak, s) + 1;
    error.to = spaceCountTo(s.length - 1, lastLineBreak, s) + 1;
    error.line = u32(s.substring(0, start).split("\n").length);
    error.message = message;
    result.push(error);
  }

  return result;
}

function findInvalidDotSequence(s: string): Array<SyntaxError> {
  let errors: Array<SyntaxError> = new Array<SyntaxError>();
  let length: i32 = s.length;
  let dotCount: i32 = 0;
  let start: i32 = -1; // To remember the start index of the potential error

  for (let i: i32 = 0; i < length; i++) {
    let char: i32 = s.charCodeAt(i);

    if (char === ".".charCodeAt(0)) {
      if (dotCount == 0) {
        start = i; // set the start index of potential error
      }
      dotCount++;

      // Directly add an error if more than 3 dots in sequence
      if (dotCount > 3) {
        const error = new SyntaxError();
        error.from = start;
        error.to = i;
        error.line = u32(s.substring(0, start).split("\n").length);
        error.message = "wrong symbol use: more than three consecutive dots";
        errors.push(error);

        dotCount = 1; // Reset dot count as current dot might be the start of another valid sequence
        start = i; // Update the start index
      }
    } else {
      if (dotCount === 1 || dotCount === 2) {
        const error = new SyntaxError();
        error.from = start;
        error.to = i - 1;
        error.line = u32(s.substring(0, start).split("\n").length);
        error.message = "wrong symbol use: single or double dots";
        errors.push(error);
      }

      if (dotCount === 3) {
        if (start - 1 !== 0 && s.charCodeAt(start - 1) !== " ".charCodeAt(0)) {
          const error = new SyntaxError();
          error.from = start - 1;
          error.to = i - 1;
          error.line = u32(s.substring(0, start - 1).split("\n").length);
          error.message =
            "wrong symbol use: triple dots not preceded by a space";
          errors.push(error);
        }
        if (i !== length && char !== " ".charCodeAt(0)) {
          const error = new SyntaxError();
          error.from = start;
          error.to = i;
          error.line = u32(s.substring(0, start).split("\n").length);
          error.message =
            "wrong symbol use: triple dots not followed by a space";
          errors.push(error);
        }
      }

      dotCount = 0;
      start = -1;
    }
  }

  if (dotCount === 1 || dotCount === 2) {
    const error = new SyntaxError();
    error.from = start;
    error.to = length - 1;
    error.line = u32(s.substring(0, start).split("\n").length);
    error.message = "wrong symbol use: single or double dots at end";
    errors.push(error);
  }

  return errors;
}

function findInvalidAsteriskSequence(s: string): Array<SyntaxError> {
  let errors: Array<SyntaxError> = new Array<SyntaxError>();
  let length: i32 = s.length;
  let asteriskCount: i32 = 0;
  let start: i32 = -1; // To remember the start index of the potential error

  for (let i: i32 = 0; i < length; i++) {
    let char: i32 = s.charCodeAt(i);

    if (char === "*".charCodeAt(0)) {
      if (asteriskCount == 0) {
        start = i; // set the start index of potential error
      }
      asteriskCount++;

      // Directly add an error if more than 3 dots in sequence
      if (asteriskCount > 3) {
        const error = new SyntaxError();
        error.from = start;
        error.to = i;
        error.line = u32(s.substring(0, start).split("\n").length);
        error.message =
          "wrong symbol use: more than three consecutive astrices";
        errors.push(error);

        asteriskCount = 1; // Reset dot count as current dot might be the start of another valid sequence
        start = i; // Update the start index
      }
    } else {
      if (asteriskCount === 1) {
        if (char === " ".charCodeAt(0)) {
          const error = new SyntaxError();
          error.from = start;
          error.to = i - 1;
          error.line = u32(s.substring(0, start).split("\n").length);
          error.message =
            "wrong symbol use: a single astrisk must be used as a suffix";
          errors.push(error);
        }
        if (start - 1 !== 0 && s.charCodeAt(start - 1) !== " ".charCodeAt(0)) {
          const error = new SyntaxError();
          error.from = start - 1;
          error.to = i - 1;
          error.line = u32(s.substring(0, start - 1).split("\n").length);
          error.message =
            "wrong symbol use: a single astrisk must be preceded by a space";
          errors.push(error);
        }
      }
      if (asteriskCount === 2) {
        const error = new SyntaxError();
        error.from = start;
        error.to = i - 1;
        error.line = u32(s.substring(0, start).split("\n").length);
        error.message = "wrong symbol use: double instead of triple astrices";
        errors.push(error);
      }

      if (asteriskCount === 3) {
        if (start - 1 !== 0 && s.charCodeAt(start - 1) !== " ".charCodeAt(0)) {
          const error = new SyntaxError();
          error.from = start - 1;
          error.to = i - 1;
          error.line = u32(s.substring(0, start - 1).split("\n").length);
          error.message =
            "wrong symbol use: triple astrices not preceded by a space";
          errors.push(error);
        }
        if (i !== length && char !== " ".charCodeAt(0)) {
          const error = new SyntaxError();
          error.from = start;
          error.to = i;
          error.line = u32(s.substring(0, start).split("\n").length);
          error.message =
            "wrong symbol use: triple astrices not followed by a space";
          errors.push(error);
        }
      }

      asteriskCount = 0;
      start = -1;
    }
  }

  if (asteriskCount === 1 || asteriskCount === 2) {
    const error = new SyntaxError();
    error.from = start;
    error.to = length - 1;
    error.line = u32(s.substring(0, start).split("\n").length);
    error.message = "wrong symbol use: single or double astrices at end";
    errors.push(error);
  }

  return errors;
}

function findInvalidBraces(s: string): Array<SyntaxError> {
  const len: i32 = s.length;
  let bracketStack: Array<i32> = new Array<i32>();
  let errors: Array<SyntaxError> = new Array<SyntaxError>();

  for (let i = 0; i < len; i++) {
    const currentCharCode: i32 = s.charCodeAt(i);
    switch (currentCharCode) {
      case "(".charCodeAt(0):
      case "[".charCodeAt(0):
      case "{".charCodeAt(0):
      case "<".charCodeAt(0):
        bracketStack.push(i);
        break;
      case ")".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack[bracketStack.length - 1]) !=
            "(".charCodeAt(0)
        ) {
          const error = new SyntaxError();
          error.from = u32(i);
          error.to = u32(i);
          error.line = u32(s.substring(0, i).split("\n").length);
          error.message = "Mismatched parenthesis: ) without matching (";
          errors.push(error);
        } else {
          bracketStack.pop();
        }
        break;
      case "]".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack[bracketStack.length - 1]) !=
            "[".charCodeAt(0)
        ) {
          const error = new SyntaxError();
          error.from = u32(i);
          error.to = u32(i);
          error.line = u32(s.substring(0, i).split("\n").length);
          error.message = "Mismatched bracket: ] without matching [";
          errors.push(error);
        } else {
          bracketStack.pop();
        }
        break;
      case "}".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack[bracketStack.length - 1]) !=
            "{".charCodeAt(0)
        ) {
          const error = new SyntaxError();
          error.from = u32(i);
          error.to = u32(i);
          error.line = u32(s.substring(0, i).split("\n").length);
          error.message = "Mismatched brace: } without matching {";
          errors.push(error);
        } else {
          bracketStack.pop();
        }
        break;
      case ">".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack[bracketStack.length - 1]) !=
            "<".charCodeAt(0)
        ) {
          const error = new SyntaxError();
          error.from = u32(i);
          error.to = u32(i);
          error.line = u32(s.substring(0, i).split("\n").length);
          error.message = "Mismatched angle bracket: > without matching <";
          errors.push(error);
        } else {
          bracketStack.pop();
        }
        break;
    }
  }

  while (bracketStack.length > 0) {
    const unmatchedIndex = bracketStack.pop();
    const error = new SyntaxError();
    error.from = u32(unmatchedIndex);
    error.to = u32(unmatchedIndex);
    error.line = u32(s.substring(0, unmatchedIndex).split("\n").length);
    const char = s.charCodeAt(unmatchedIndex);
    let errorMessage: string;

    switch (char) {
      case "(".charCodeAt(0):
        errorMessage = "Unmatched parenthesis: ( without corresponding )";
        break;
      case "[".charCodeAt(0):
        errorMessage = "Unmatched bracket: [ without corresponding ]";
        break;
      case "{".charCodeAt(0):
        errorMessage = "Unmatched brace: { without corresponding }";
        break;
      case "<".charCodeAt(0):
        errorMessage = "Unmatched angle bracket: < without corresponding >";
        break;
      default:
        errorMessage = `Unmatched character: ${char}`;
        break;
    }
    error.message = errorMessage;
    errors.push(error);
  }

  return errors;
}

function findInvalidSquareBracketSequence(s: string): Array<SyntaxError> {
  let errors: Array<SyntaxError> = [];
  let i: i32 = 0;

  function isSpaceOrLineBreak(ch: string): bool {
    return ch == " " || ch == "\n";
  }

  while (i < s.length) {
    let ch: string = s[i];
    if (ch == "[") {
      let start: u32 = i;
      let currentLine: u32 = 1;

      // Calculate line number for the current position
      for (let j: i32 = 0; j < i; j++) {
        if (s[j] == "\n") {
          currentLine++;
        }
      }

      i++;
      if (i < s.length && s[i] == "[") {
        // Potential [[ sequence
        i++;
        while (
          i < s.length &&
          s[i] != "[" &&
          s[i] != "]" &&
          !isSpaceOrLineBreak(s[i])
        ) {
          i++;
        }
        if (i < s.length && s[i] == "]") {
          i++;
          if (i < s.length && s[i] == "]") {
            if (i + 1 >= s.length || !isSpaceOrLineBreak(s[i + 1])) {
              let error = new SyntaxError();
              error.from = start;
              error.to = i + 1;
              error.line = currentLine;
              error.message =
                "Invalid [[word]] sequence without a trailing space or line break.";
              errors.push(error);
            }
            i++;
          } else {
            let error = new SyntaxError();
            error.from = start;
            error.to = i + 1;
            error.line = currentLine;
            error.message = "Missing closing bracket for [[word] sequence.";
            errors.push(error);
          }
        } else {
          let error = new SyntaxError();
          error.from = start;
          error.to = i;
          error.line = currentLine;
          error.message = "Invalid bracket sequence.";
          errors.push(error);
        }
      } else {
        // Potential [ sequence
        while (
          i < s.length &&
          s[i] != "[" &&
          s[i] != "]" &&
          !isSpaceOrLineBreak(s[i])
        ) {
          i++;
        }
        if (i < s.length && s[i] == "]") {
          if (i + 1 >= s.length || !isSpaceOrLineBreak(s[i + 1])) {
            let error = new SyntaxError();
            error.from = start;
            error.to = i + 1;
            error.line = currentLine;
            error.message =
              "Invalid [word] sequence without a trailing space or line break.";
            errors.push(error);
          }
          i++;
        } else {
          let error = new SyntaxError();
          error.from = start;
          error.to = i;
          error.line = currentLine;
          error.message = "Invalid bracket sequence.";
          errors.push(error);
        }
      }
    } else if (ch == "]") {
      // If there's a closing bracket without a matching opening bracket
      let start: u32 = i;
      let currentLine: u32 = 1;

      // Calculate line number for the current position
      for (let j: i32 = 0; j < i; j++) {
        if (s[j] == "\n") {
          currentLine++;
        }
      }

      let error = new SyntaxError();
      error.from = start;
      error.to = i + 1;
      error.line = currentLine;
      error.message = "Closing bracket without a matching opening bracket.";
      errors.push(error);
      i++;
    } else {
      i++;
    }
  }

  return errors;
}
