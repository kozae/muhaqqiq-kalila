import { autocompletion, type Completion, type CompletionSource } from "@codemirror/autocomplete";
import type { UnitEntity } from "pages-tool-store-worker";
import { addWidgetEffect, dropInCloseWidgetEffect } from "../unit-in-text-widget";
import { cleanupEffect } from "../cleanup-extension";


// Define the autocompletion source
const unitCompletionSource: (units: UnitEntity[]) => CompletionSource = (units) => (context) => {

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

    const closingCompletion: Completion = {
        label: "(Close)",
        apply: (view, _completion, _from, to) => {
            view.dispatch({
                effects: [
                    dropInCloseWidgetEffect.of({ position: _from }),
                    cleanupEffect.of(null),
                ]
            });
        }
    };



    return {
        from: context.pos,
        options: [closingCompletion, ...options],
        validFor: /^[\w$]*$/
    };
};

// Create the language extension with autocompletion feature
export const unitInsertionExtension = (units: UnitEntity[]) =>
    autocompletion({
        override: [unitCompletionSource(units)]
    })

