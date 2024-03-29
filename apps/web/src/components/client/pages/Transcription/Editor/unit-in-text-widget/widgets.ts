import { WidgetType } from "@codemirror/view";
import type { SegmentUnitConnection } from "kalila-graphql";





export class UnitOpeningWidget extends WidgetType {
    private readonly _color: string = "#4d4d0a";
    private readonly content: string;
    public readonly id: string;


    constructor(public readonly segment: SegmentUnitConnection, readonly onDelete: (id: string) => void) {
        super();
        this.content = ` /${segment.frame}${segment?.order} `;
        this.id = segment.id;
    }

    toDOM() {
        const span = document.createElement("span");
        span.style.opacity = "0.7";
        span.style.color = "white";
        span.style.fontFamily = "Noto Sans Display, sans-serif";
        span.style.backgroundColor = this._color;
        span.style.borderRadius = "5px";
        span.style.marginLeft = "3px";
        span.style.fontSize = "0.7em";

        span.title = this.segment.title || "";
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
            span.style.backgroundColor = this._color;
            span.textContent = this.content;
        });

        span.addEventListener('click', () => this.onDelete(this.id));

        span.textContent = this.content;
        return span;
    }
}


export class UnitClosingWidget extends WidgetType {
    private readonly _color: string = "blue";
    private readonly content: string;
    public readonly id: string;
    constructor(public readonly segment: SegmentUnitConnection, readonly onDelete: (id: string) => void) {
        super();
        this.content = ` ${segment.frame}${segment?.order}/ `;
        this.id = segment.id;
    }

    toDOM() {
        const span = document.createElement("span");
        span.style.opacity = "0.7";
        span.style.color = "white";
        span.style.fontFamily = "Noto Sans Display, sans-serif";
        span.style.backgroundColor = this._color;
        span.style.borderRadius = "5px";
        span.style.marginLeft = "3px";
        span.style.fontSize = "0.7em";

        span.title = `${this.segment.title} (end)` || "";
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
            span.style.backgroundColor = this._color;
            span.textContent = this.content;
        });

        span.addEventListener('click', () => this.onDelete(this.id));

        span.textContent = this.content;
        return span;
    }
}
