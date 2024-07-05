import { autocompletion, type Completion, type CompletionSource } from "@codemirror/autocomplete";
import { addWidgetEffect, dropInCloseWidgetEffect } from "../unit-in-text-widget";
import { cleanupEffect } from "../cleanup-extension";
import { insertableUnitWatcher } from "../insertable-unit-watcher";


// Define the autocompletion source
const unitCompletionSource: CompletionSource = (context) => {


    const units = insertableUnitWatcher.getValue().units;


    if (!context.explicit && context.matchBefore(/\//) === null) {
        return null;
    }

    // Map language keywords to the completion format
    const options: Completion[] = units.map(unit => ({
        label: `${unit.order}. ${unit.title}`,
        apply: (view, _completion, from, _to) => {
            view.dispatch({
                effects: [
                    addWidgetEffect.of({ segment: { ...unit, __typename: "SegmentUnitConnection" }, position: from }),
                    cleanupEffect.of(null),

                ]
            });
        }
    }));

    const closingCompletion: Completion = {
        label: "(Close)",
        apply: (view, _completion, from, _to) => {
            view.dispatch({
                effects: [
                    dropInCloseWidgetEffect.of({ position: from }),
                    cleanupEffect.of(null),
                ]
            });
        }
    };



    return {
        from: context.pos,
        to: context.pos,
        options: [closingCompletion, ...options],
        validFor: /^[\w$]*$/
    };
};

// Create the language extension with autocompletion feature
export const unitInsertionExtension = autocompletion({
    override: [unitCompletionSource]
})

