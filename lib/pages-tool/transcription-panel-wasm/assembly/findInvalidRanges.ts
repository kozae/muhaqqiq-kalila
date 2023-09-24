class Range {
  public from: u32 = 0;
  public to: u32 = 0;
}

export function findInvalidRanges(s: string): Array<Range> {
  return findInvalidCharacterRanges(s)
    .concat(findInvalidAsteriskRanges(s))
    .concat(findInvalidSquareBracketRanges(s))
    .concat(findInvalidDotRanges(s));
}

function findInvalidCharacterRanges(s: string): Array<Range> {
  let result: Array<Range> = new Array<Range>();

  let inRange: bool = false;
  let start: u32 = 0;

  for (let i: i32 = 0; i < s.length; i++) {
    let charCode: i32 = s.charCodeAt(i);

    // Helper function to check if the current character is whitespace or a line break
    function isSpaceOrBreak(code: i32): bool {
      return (
        code === " ".charCodeAt(0) ||
        code === "\n".charCodeAt(0) ||
        code === "\r".charCodeAt(0)
      );
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
    }

    if (isPrefix) {
      isValidChar =
        isValidChar &&
        (i === s.length - 1 || !isSpaceOrBreak(s.charCodeAt(i + 1)));
    }

    if (isSuffix) {
      isValidChar =
        isValidChar && (i === 0 || !isSpaceOrBreak(s.charCodeAt(i - 1)));
    }

    if (isSuffix) {
      isValidChar =
        isValidChar &&
        (i === s.length - 1 || isSpaceOrBreak(s.charCodeAt(i + 1)));
    }

    if (!isValidChar) {
      if (!inRange) {
        inRange = true;
        start = i;
      }
    } else {
      if (inRange) {
        const range = new Range();
        range.from = start;
        range.to = i - 1;
        result.push(range);
        inRange = false;
      }
    }
  }

  if (inRange) {
    const range = new Range();
    range.from = start;
    range.to = s.length - 1;
    result.push(range);
  }

  return result;
}

function findInvalidDotRanges(s: string): Array<Range> {
  let ranges: Array<Range> = new Array<Range>();
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

      // Directly add a range if more than 3 dots in sequence
      if (dotCount > 3) {
        const range = new Range();
        range.from = u32(start);
        range.to = u32(i);
        ranges.push(range);

        dotCount = 1; // Reset dot count as current dot might be the start of another valid sequence
        start = i; // Update the start index
      }
    } else {
      if (dotCount === 1 || dotCount === 2) {
        const range = new Range();
        range.from = u32(start);
        range.to = u32(i - 1);
        ranges.push(range);
      }

      if (dotCount === 3) {
        if (start - 1 !== 0 && s.charCodeAt(start - 1) !== " ".charCodeAt(0)) {
          const range = new Range();
          range.from = u32(start - 1);
          range.to = u32(i - 1);
          ranges.push(range);
        }
        if (i !== length && char !== " ".charCodeAt(0)) {
          const range = new Range();
          range.from = u32(start);
          range.to = u32(i);
          ranges.push(range);
        }
      }

      dotCount = 0;
      start = -1;
    }
  }

  if (dotCount === 1 || dotCount === 2) {
    const range = new Range();
    range.from = u32(start);
    range.to = u32(length - 1);
    ranges.push(range);
  }

  return ranges;
}

function findInvalidAsteriskRanges(s: string): Array<Range> {
  let ranges: Array<Range> = new Array<Range>();
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

      // Directly add a range if more than 3 asterisks in sequence
      if (asteriskCount > 3) {
        const range = new Range();
        range.from = u32(start);
        range.to = u32(i);
        ranges.push(range);

        asteriskCount = 1; // Reset asterisk count as current asterisk might be the start of another valid sequence
        start = i; // Update the start index
      }
    } else {
      if (asteriskCount === 1) {
        if (char === " ".charCodeAt(0)) {
          const range = new Range();
          range.from = u32(start);
          range.to = u32(i - 1);
          ranges.push(range);
        }
        if (start - 1 !== 0 && s.charCodeAt(start - 1) !== " ".charCodeAt(0)) {
          const range = new Range();
          range.from = u32(start - 1);
          range.to = u32(i - 1);
          ranges.push(range);
        }
      }

      if (asteriskCount === 2) {
        const range = new Range();
        range.from = u32(start);
        range.to = u32(i - 1);
        ranges.push(range);
      }

      if (asteriskCount === 3) {
        if (start - 1 !== 0 && s.charCodeAt(start - 1) !== " ".charCodeAt(0)) {
          const range = new Range();
          range.from = u32(start - 1);
          range.to = u32(i - 1);
          ranges.push(range);
        }
        if (i !== length && char !== " ".charCodeAt(0)) {
          const range = new Range();
          range.from = u32(start);
          range.to = u32(i);
          ranges.push(range);
        }
      }

      asteriskCount = 0;
      start = -1;
    }
  }

  if (asteriskCount === 1 || asteriskCount === 2) {
    const range = new Range();
    range.from = u32(start);
    range.to = u32(length - 1);
    ranges.push(range);
  }

  return ranges;
}

function findInvalidSquareBracketRanges(s: string): Array<Range> {
  let results: Array<Range> = [];
  let i: i32 = 0;

  function isSpaceOrLineBreak(ch: string): bool {
    return ch == " " || ch == "\n";
  }

  while (i < s.length) {
    let ch: string = s[i];
    if (ch == "[") {
      let start: u32 = i;
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
              const range = new Range();
              range.from = start;
              range.to = i + 1;
              results.push(range);
            }
            i++;
          } else {
            const range = new Range();
            range.from = start;
            range.to = i + 1;
            results.push(range);
          }
        } else {
          const range = new Range();
          range.from = start;
          range.to = i;
          results.push(range);
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
            const range = new Range();
            range.from = start;
            range.to = i + 1;
            results.push(range);
          }
          i++;
        } else {
          const range = new Range();
          range.from = start;
          range.to = i;
          results.push(range);
        }
      }
    } else {
      i++;
    }
  }
  return results;
}
