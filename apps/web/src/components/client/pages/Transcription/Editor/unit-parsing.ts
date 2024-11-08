import { StateEffect, type Extension, EditorState } from "@codemirror/state";
import { insertableUnitWatcher } from "./insertable-unit-watcher";
import { tokenize } from "pages-tool-transcription-panel-wasm";
import { baseParserConfig } from "./base-parser-confug";



export function formatToken(token: string, state: string): string {
    switch (state) {
        case "corrupt":
            return `†${token}`;
        case "emended":
            return `*${token}`;
        case "unintelligible":
            return `?${token}`;
        case "error":
            return `!${token}`;
        case "superfluous_single":
            return `[${token}]`;
        case "superfluous_close":
            return `${token}]`;
        case "superfluous_open":
            return `[${token}`;
        case "cross-out_single":
            return `[[${token}]]`;
        case "cross-out_close":
            return `${token}]]`;
        case "cross-out_open":
            return `[[${token}`;
        case "suppletion_single":
            return `{${token}}`;
        case "suppletion_close":
            return `${token}}`;
        case "suppletion_open":
            return `{${token}`;
        case "added_single":
            return `<${token}>`;
        case "added_close":
            return `${token}>`;
        case "added_open":
            return `<${token}`;
        case "title_single":
            return `(${token})`;
        case "title_close":
            return `${token})`;
        case "title_open":
            return `(${token}`;
        default:
            return token;
    }
}

export function handleParsing(docStr: string) {
    const units = insertableUnitWatcher.getValue().units;
    const segments: any[] = [];
    const unitMap = new Map(units.map(unit => [unit.order, unit]));
    const pattern = /[A-Za-z]+-\d+-\d+/g;
    const matches = docStr.match(pattern) || [];
    const parsedUnits = matches.map(tag => {
        const [frame, frameNumber, order] = tag.split('-');
        return {
            tag,
            frame,
            frameNumber: parseInt(frameNumber),
            order: parseInt(order),
            unit: unitMap.get(parseInt(order))
        };
    })
        .filter(item => item.unit !== undefined)
        .sort((a, b) => b.tag.length - a.tag.length);

    const unitTagDef = parsedUnits.map(unit => `[[tag]]\n symbol = "${unit.tag}"\n label = "${unit.unit?.title}"\n`).join("\n");
    const { tokens, errors } = tokenize(docStr, unitTagDef + baseParserConfig);
    let newStr = "";
    let line = 0;
    for (const token of tokens) {
        if ("Word" in token) {
            if (token.Word.line_number !== line && token.Word.token_order === 0) {
                newStr += "\n";
            } else {
                newStr += " ";
            }
            newStr += formatToken(token.Word.word, token.Word.state);
            line = token.Word.line_number;
        } else if ("Tag" in token) {
            newStr += " ";
            const unit = parsedUnits.find(unit => unit.tag === token.Tag.tag);
            if (!unit || !unit.unit) {
                // Handle tag as error if unit not found
                newStr += token.Tag.tag;
            } else {
                const seg = { ...unit.unit, __typename: "SegmentUnitConnection", position: newStr.length };
                segments.push(seg);
            }
        } else if ("Error" in token) {
            if (token.Error.line !== line && token.Error.order_in_line === 0) {
                newStr += "\n";
            } else {
                newStr += " ";
            }
            newStr += token.Error.token;
        }
    }
    return {
        changes: {
            from: 0,
            to: docStr.length,
            insert: newStr
        },
        segments
    }
}