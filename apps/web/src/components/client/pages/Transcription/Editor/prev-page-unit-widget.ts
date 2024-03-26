import { StateEffect, StateField } from "@codemirror/state";
import { EditorView, WidgetType, Decoration } from "@codemirror/view";
import type { Segment } from "kalila-graphql";

// Define the state effect for adding the widget
const addWidgetEffect = StateEffect.define();

// Define the widget
class Widget extends WidgetType {
    private readonly content: string;
    public readonly id: string;
    constructor(readonly segment: Segment) {
        super();
        this.content = ` /${segment.unit?.frame}${segment.unit?.order}...`;
        this.id = segment.id;
    }

    toDOM() {
        const span = document.createElement("span");
        span.style.opacity = "0.7";

        span.title = this.segment.unit?.title || "";
        span.style.cursor = "default";
        span.style.color = "white";
        span.style.fontFamily = "Noto Sans Display, sans-serif";
        span.style.backgroundColor = "#4d4d0a";
        span.style.borderRadius = "5px";
        span.style.marginLeft = "3px";
        span.style.fontSize = "0.7em";
        span.textContent = this.content;
        return span;
    }
}



// Define a state field to manage the widget decoration
export const unitFromPreviousPageWidgetField = (segment: Segment) => {
    const widget = new Widget(segment);
    const decoration = Decoration.widget({ widget: widget, side: -1 });

    return StateField.define({
        create() {
            return Decoration.set([decoration.range(0)]);
        },
        update(deco, tr) {
            // Automatically reposition the widget at the start of the document on every transaction
            if (tr.docChanged || tr.effects.some(e => e.is(addWidgetEffect))) {
                return Decoration.set([decoration.range(0)]);
            }
            return deco;
        },
        provide: f => EditorView.decorations.from(f)
    });
}

