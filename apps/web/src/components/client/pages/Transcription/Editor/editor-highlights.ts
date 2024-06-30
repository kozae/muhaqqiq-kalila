import { StateField, Range } from "@codemirror/state";
import { type DecorationSet, Decoration, EditorView } from "@codemirror/view";
import { check_text } from "pages-tool-transcription-panel-wasm";

export const editorHighlights = StateField.define<DecorationSet>({
  create: () => Decoration.none,

  update(_, transaction) {
    const editionSymbols = /[!?[\]{}<>*؟†\(\)\.]/g;

    let newDecorations: Range<Decoration>[] = [];
    const docContent = transaction.newDoc.sliceString(0);

    const checkAndPushDecoration = (
      regex: RegExp,
      className: string = "highlight-invalid",
      exclude: { from: number; to: number }[] = [],
    ) => {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(docContent))) {
        let from = match.index;
        let to = from + match[0].length;
        if (exclude.some((range) => range.from <= from && range.to >= to)) {
          continue;
        }
        let decoration = Decoration.mark({ class: className });
        newDecorations.push({ from, to, value: decoration });
      }
    };

    const pushDecorationFromIndexes = (
      indexes: number[],
      className: string = "highlight-invalid",
    ) => {
      for (const index of indexes) {
        let from = index;
        let to = index + 1;
        let decoration = Decoration.mark({ class: className });
        newDecorations.push({ from, to, value: decoration });
      }
    };

    const pushDecorationFromRanges = (
      ranges: { from: number; to: number }[],
      className: string = "highlight-invalid",
    ) => {
      console.log({ ranges });
      for (const range of ranges) {
        let from = range.from;
        let to = range.to + 1;
        let decoration = Decoration.mark({ class: className });
        newDecorations.push({ from, to, value: decoration });
      }
    };



    const invalid = check_text(docContent);
    const errorRanges = invalid.map((e) => ({ from: e.from, to: e.to }));
    pushDecorationFromRanges(errorRanges, "highlight-invalid");

    checkAndPushDecoration(editionSymbols, "edition-symbol", errorRanges);


    newDecorations.sort((a, b) => {
      if (a.from - b.from !== 0) return a.from - b.from;
      return a.to - b.to;
    });

    return Decoration.set(newDecorations);
  },

  provide: (field) => EditorView.decorations.from(field),
});
