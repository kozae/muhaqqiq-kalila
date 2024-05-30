import { WidgetType } from "@codemirror/view";
import type { SegmentUnitConnection } from "kalila-graphql";

export class UnitFromPrevPageWidget extends WidgetType {
    private readonly content: string;
    public readonly id: string;
    constructor(readonly segment: SegmentUnitConnection) {
        super();
        this.content = ` /${segment.frame}${segment.order}...`;
        this.id = segment.id;
    }

    toDOM() {
        const span = document.createElement("span");
        span.style.opacity = "0.7";

        span.title = this.segment.title || "";
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


export class UnitWidget extends WidgetType {
    protected readonly content: string;
    public readonly id: string;
    protected readonly _color: string;

    constructor(public readonly segment: SegmentUnitConnection, readonly onDelete: (id: string) => void, color: string, contentFormat: string) {
        super();
        this.content = contentFormat.replace("{frame}", segment.frame!).replace("{order}", segment.order.toString());
        this.id = segment.id;
        this._color = color;
    }

    toDOM() {
        const span = document.createElement("span");
        span.style.color = "white";
        span.style.fontFamily = "Noto Sans Display, sans-serif";
        span.style.fontWeight = "bold";
        span.style.color = this._color;
        span.style.borderRadius = "5px";
        span.style.marginLeft = "3px";
        span.style.fontSize = "0.8em";
        span.style.minWidth = "70px";
        span.style.letterSpacing = "1.5px";

        span.style.border = `3px dashed ${this._color}`;


        span.title = this.segment.title || "";
        span.style.cursor = "pointer";

        span.addEventListener('mouseenter', () => {
            span.style.color = 'red';
            span.style.border = `3px dashed red`;
        });

        span.addEventListener('mouseleave', () => {
            span.style.color = this._color;
            span.style.border = `3px dashed ${this._color}`;
        });

        span.addEventListener('click', () => this.onDelete(this.id));

        span.textContent = this.content;
        return span;
    }
}

export class UnitOpeningWidget extends UnitWidget {
    constructor(segment: SegmentUnitConnection, onDelete: (id: string) => void) {
        super(segment, onDelete, "#4d4d0a", ` /{frame}{order} `);
    }
}

export class UnitClosingWidget extends UnitWidget {
    constructor(segment: SegmentUnitConnection, onDelete: (id: string) => void) {
        super(segment, onDelete, "blue", ` {frame}{order}/ `);
    }
}
