export function findInvalidBraces(s: string): Array<i32> {
  const len: i32 = s.length;
  let bracketStack: Array<i32> = new Array<i32>();
  let invalidIndexes: Array<i32> = new Array<i32>();

  for (let i = 0; i < len; i++) {
    const currentCharCode: i32 = s.charCodeAt(i); // Use charCodeAt to get char code
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
          s.charCodeAt(bracketStack.pop()) != "(".charCodeAt(0)
        ) {
          invalidIndexes.push(i);
        }
        break;
      case "]".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack.pop()) != "[".charCodeAt(0)
        ) {
          invalidIndexes.push(i);
        }
        break;
      case "}".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack.pop()) != "{".charCodeAt(0)
        ) {
          invalidIndexes.push(i);
        }
        break;
      case ">".charCodeAt(0):
        if (
          bracketStack.length == 0 ||
          s.charCodeAt(bracketStack.pop()) != "<".charCodeAt(0)
        ) {
          invalidIndexes.push(i);
        }
        break;
    }
  }

  while (bracketStack.length > 0) {
    invalidIndexes.push(bracketStack.pop());
  }

  return invalidIndexes;
}
