import { StateField, Range } from "@codemirror/state";
import { DecorationSet, Decoration, EditorView } from "@codemirror/view";
import {
  findInvalidRanges,
  findInvalidBraces,
} from "pages-tool-transcription-panel-wasm";

export const editorHighlights = StateField.define<DecorationSet>({
  create: () => Decoration.none,

  update(_, transaction) {
    const editionSymbols = /[!?[\]{}<>*؟†\(\)\.]/g;

    let newDecorations: Range<Decoration>[] = [];
    const docContent = transaction.newDoc.sliceString(0);

    const checkAndPushDecoration = (
      regex: RegExp,
      className: string = "highlight-invalid"
    ) => {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(docContent))) {
        let from = match.index;
        let to = from + match[0].length;
        let decoration = Decoration.mark({ class: className });
        newDecorations.push({ from, to, value: decoration });
      }
    };

    const pushDecorationFromIndexes = (
      indexes: number[],
      className: string = "highlight-invalid"
    ) => {
      for (const index of indexes) {
        let from = index;
        let to = index + 1;
        let decoration = Decoration.mark({ class: className });
        newDecorations.push({ from, to, value: decoration });
      }
    };

    const pushDecorationFromRanges = (
      indexes: { from: number; to: number }[],
      className: string = "highlight-invalid"
    ) => {
      for (const { from, to } of indexes) {
        let decoration = Decoration.mark({ class: className });
        newDecorations.push({ from, to: to + 1, value: decoration });
      }
    };

    checkAndPushDecoration(editionSymbols, "edition-symbol");
    const invalid = findInvalidRanges(docContent);
    pushDecorationFromRanges(invalid);

    const braces = findInvalidBraces(docContent);
    pushDecorationFromIndexes(braces);

    newDecorations.sort((a, b) => {
      if (a.from - b.from !== 0) return a.from - b.from;
      return a.to - b.to;
    });

    return Decoration.set(newDecorations);
  },

  provide: (field) => EditorView.decorations.from(field),
});
