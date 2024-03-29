import { autocompletion, type Completion, type CompletionSource } from "@codemirror/autocomplete";
import { EditorState, StateEffect, StateField, type Extension } from "@codemirror/state";
import type { UnitEntity } from "pages-tool-store-worker";
import { addWidgetEffect, unitsInTextFields } from "../unit-in-text-widget";

const cleanupEffect = StateEffect.define();



export function cleanUpExtension(): Extension {
    return EditorState.transactionFilter.of(tr => {


        if (!tr.effects.some(effect => effect.is(cleanupEffect))) return tr;
        let changes: { from: number; to: number; }[] = [];
        let from = 0;
        tr.startState.doc.toString().split("\n").forEach((line, lineIndex) => {
            let pos = from;
            for (let char of line) {
                const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFEFC]/.test(char);
                const isAllowedChar = /[\.\*\[\](){}?!†\s\n]/.test(char);
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
// Define the autocompletion source
const languageCompletionSource: (units: UnitEntity[]) => CompletionSource = (units) => (context) => {

    if (!context.explicit && context.matchBefore(/\//) === null) {
        return null;
    }

    // Map language keywords to the completion format
    const options: Completion[] = units.map(unit => ({
        label: `${unit.order}. ${unit.title}`,
        apply: (view, _completion, _from, to) => {
            view.dispatch({
                effects: [
                    addWidgetEffect.of({ segment: { ...unit, __typename: "SegmentUnitConnection" }, position: _from }),
                    cleanupEffect.of(null),

                ]
            });
        }
    }));


    return {
        from: context.pos,
        options: options,
        validFor: /^[\w$]*$/
    };
};

// Create the language extension with autocompletion feature
export const unitInsertionExtension = (units: UnitEntity[]) =>
    autocompletion({
        override: [languageCompletionSource(units)]
    })

