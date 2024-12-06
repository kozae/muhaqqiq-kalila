import { StateEffect, type Extension, EditorState } from "@codemirror/state";

export const cleanupEffect = StateEffect.define();



export function cleanUpExtension(): Extension {
    return EditorState.transactionFilter.of(tr => {


        if (!tr.effects.some(effect => effect.is(cleanupEffect))) return tr;
        let changes: { from: number; to: number; }[] = [];
        let from = 0;
        tr.startState.doc.toString().split("\n").forEach((line, lineIndex) => {
            let pos = from;
            for (let char of line) {
                const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFEFC]/.test(char);
                const isAllowedChar = /[\.\*\[\](){}?!†\s\n|#]/.test(char);
                if (!isArabic && !isAllowedChar) {
                    changes.push({ from: pos, to: pos + 1 });
                }
                pos++;
            }
            from += line.length + 1; // +1 for the newline character
        });
        return [tr, { changes }];
    });
}