import { StateEffect, StateField } from "@codemirror/state";
import { EditorView, WidgetType, Decoration } from "@codemirror/view";
import type { Segment } from "kalila-graphql";
import { sgementWidgetEvents } from "../event-hubs";




export const updateWidgetEffect = StateEffect.define<{ id: string, update: Segment & { position: number } }>();
export const addWidgetEffect = StateEffect.define<{ segment: Segment, position: number }>();
export const deleteWidgetEffect = StateEffect.define<{ id: string }>();

class Widget extends WidgetType {
    private readonly content: string;
    public readonly id: string;
    constructor(readonly segment: Segment, readonly onDelete: (id: string) => void) {
        super();
        this.content = ` /${segment.unit?.frame}${segment.unit?.order} `;
        this.id = segment.id;
    }

    toDOM() {
        const span = document.createElement("span");
        span.style.opacity = "0.7";
        span.style.color = "white";
        span.style.fontFamily = "Noto Sans Display, sans-serif";
        span.style.backgroundColor = "#4d4d0a";
        span.style.borderRadius = "5px";
        span.style.marginLeft = "3px";
        span.style.fontSize = "0.7em";

        span.title = this.segment.unit?.title || "";
        span.style.cursor = "pointer";

        span.addEventListener('mouseenter', () => {
            span.style.backgroundColor = 'red';
            const paddingLength = (this.content.length - 1) / 2;
            const padding = ' '.repeat(paddingLength);
            span.textContent = `${padding}X${padding}`;
            if (this.content.length % 2 === 0) {
                span.textContent += ' '; // Add an extra space for even length content to maintain the length
            }
        });

        span.addEventListener('mouseleave', () => {
            span.style.backgroundColor = "#4d4d0a";
            span.textContent = this.content;
        });

        span.addEventListener('click', () => this.onDelete(this.id));

        span.textContent = this.content;
        return span;
    }
}

// Define a state field to manage multiple widget decorations with dynamic positioning
export const unitsInTextFields = (segments: (Segment & { position: number })[]) => {

    const onDelete = (id: string) => { sgementWidgetEvents.next({ type: "delete", payload: { id } }); };

    let decorations = segments.map(segment => {
        const widget = new Widget(segment, onDelete);
        return Decoration.widget({ widget: widget, side: -1, id: segment.id }).range(segment.position);
    });

    decorations.sort((a, b) => a.from - b.from);


    return StateField.define({
        create() {
            return Decoration.set(decorations);
        },
        update(deco, tr) {
            decorations = decorations.map(decoration => {
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

            tr.effects.forEach(effect => {

                if (effect.is(addWidgetEffect)) {
                    const { segment, position } = effect.value;
                    const widget = new Widget(segment, onDelete);
                    decorations.push(Decoration.widget({ widget, side: -1 }).range(position));
                } else if (effect.is(updateWidgetEffect)) {
                    const { id, update } = effect.value;
                    const index = decorations.findIndex(deco => deco.value.spec.id === id);
                    if (index !== -1) {
                        const widget = new Widget(update, onDelete);
                        decorations[index] = Decoration.widget({ widget, side: -1 }).range(update.position);
                    }
                } else if (effect.is(deleteWidgetEffect)) {
                    const { id } = effect.value;
                    decorations = decorations.filter(deco => deco.value.spec.widget.id !== id);
                }
            });

            decorations.sort((a, b) => a.from - b.from);
            if (tr.docChanged || tr.effects.some(e => e.is(addWidgetEffect) || e.is(updateWidgetEffect) || e.is(deleteWidgetEffect))) {
                return Decoration.set(decorations);
            }
            return deco;
        },
        provide: f => EditorView.decorations.from(f)
    });
}


