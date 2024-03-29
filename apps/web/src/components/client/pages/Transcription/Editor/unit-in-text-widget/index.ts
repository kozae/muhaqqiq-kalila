import { StateEffect, StateField, Transaction } from "@codemirror/state";
import { EditorView, Decoration } from "@codemirror/view";
import type { Segment } from "kalila-graphql";
import { sgementWidgetEvents } from "../../event-hubs";
import { alertSubject } from "@client/Alert";
import { UnitClosingWidget, UnitOpeningWidget } from "./widgets";
import { addWidgetEffect, updateWidgetEffect, deleteWidgetEffect, dropInCloseWidgetEffect } from "./effects";
import { findLast, orderBy } from "lodash";


const onDelete = (id: string) => { sgementWidgetEvents.next({ type: "delete", payload: { id } }); };

function createInitialDecorations(segments: (Segment & { position: number, close?: number })[]) {

    const decorations = [];
    for (const segment of segments) {
        const widget = new UnitOpeningWidget(segment.unit!, onDelete);
        decorations.push(Decoration.widget({ widget: widget, side: -1, id: segment.id }).range(segment.position));
        if (segment.close !== undefined) {
            const widget = new UnitClosingWidget(segment.unit!, onDelete);
            decorations.push(Decoration.widget({ widget: widget, side: -1, id: segment.id }).range(segment.close));
        }
    }
    return orderBy(decorations, ['from'], ['asc']);

}

function shiftDecorationPositionsOnUpdate(decorations: any[], tr: Transaction) {
    return decorations.map(decoration => {
        let newPos = decoration.from;
        tr.changes.iterChanges((fromA, toA, fromB, toB) => {
            if (fromA < decoration.from) {
                const diff = (toB - fromB) - (toA - fromA);
                newPos += diff;
            }
        });

        if (tr.newDoc.sliceString(newPos, newPos + 1) === '\n') {
            newPos += 1;
        }

        decoration = Decoration.widget({ widget: decoration.value.spec.widget, side: -1 }).range(newPos);

        return decoration;
    });
}

function applyAddWidgetEffect(decorations: any[], effect: StateEffect<any>) {
    const { segment, position } = effect.value;
    const isInText = decorations.some(deco => deco.value.spec.widget.id === segment.id);
    if (!isInText) {
        const anotherUnitHere = decorations.some(deco => [position, position + 1, position - 1].includes(deco.from));
        if (!anotherUnitHere) {
            const widget = new UnitOpeningWidget(segment, onDelete);
            decorations = [...decorations, Decoration.widget({ widget, side: -1 }).range(position)];
        } else {
            alertSubject.next({ type: "warning", message: `Unit '${segment.title}' must be at least one word apart from the nearest unit.` });
        }

    } else {
        alertSubject.next({ type: "warning", message: `Unit '${segment.title}' is already assigned in the current page` });
    }

    return decorations;
}

function applyUpdateWidgetEffect(decorations: any[], effect: any) {
    return decorations.map(deco => {
        if (deco.value.spec.id === effect.value.id) {
            const widget = new UnitOpeningWidget(effect.value.update, onDelete);
            return Decoration.widget({ widget, side: -1 }).range(effect.value.update.position);
        }
        return deco;
    });
}
function applyDeleteWidgetEffect(decorations: any[], effect: any) {
    return [...decorations.filter(deco => deco.value.spec.id !== effect.value.id)];
}


function applyDropInCloseWidgetEffect(decorations: any[], effect: any) {
    let newDecorations = [...decorations];
    const { position } = effect.value;
    const unitToClose = findLast(decorations, deco => deco.from < position && deco.value.spec.widget instanceof UnitOpeningWidget);
    if (unitToClose) {
        const widget = new UnitClosingWidget(unitToClose.value.spec.widget.segment, onDelete);
        newDecorations = [...decorations, Decoration.widget({ widget, side: -1 }).range(position)];
    }
    return newDecorations;
}


function processEffects(decorations: any[], tr: Transaction) {
    let newDecorations = [...decorations];
    tr.effects.forEach(effect => {
        switch (true) {
            case effect.is(addWidgetEffect):
                newDecorations = applyAddWidgetEffect(decorations, effect);
                break;
            case effect.is(updateWidgetEffect):
                newDecorations = applyUpdateWidgetEffect(decorations, effect);
                break;
            case effect.is(deleteWidgetEffect):
                newDecorations = applyDeleteWidgetEffect(decorations, effect);
                break;
            case effect.is(dropInCloseWidgetEffect):
                newDecorations = applyDropInCloseWidgetEffect(decorations, effect);
                break;
        }
    });

    return newDecorations;
}


// Define a state field to manage multiple widget decorations with dynamic positioning
const unitsInTextFields = (segments: (Segment & { position: number, close?: number })[]) => {

    let decorations = createInitialDecorations(segments);


    return StateField.define({
        create() {
            return Decoration.set(decorations);
        },
        update(deco, tr) {

            decorations = shiftDecorationPositionsOnUpdate(decorations, tr);
            decorations = processEffects(decorations, tr);
            decorations.sort((a, b) => a.from - b.from);


            if (tr.docChanged || tr.effects.some(e => e.is(addWidgetEffect) || e.is(updateWidgetEffect) || e.is(deleteWidgetEffect))) {
                // TODO inform the store of the changes
                return Decoration.set(decorations);
            }
            return deco;
        },
        provide: f => EditorView.decorations.from(f)
    });
}


export { addWidgetEffect, updateWidgetEffect, deleteWidgetEffect, unitsInTextFields, dropInCloseWidgetEffect }