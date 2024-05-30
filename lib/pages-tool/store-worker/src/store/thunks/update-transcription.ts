import { createAsyncThunk, type Update } from "@reduxjs/toolkit";
import { determineTokenState, type LineEntity, type TextEntity, type ThunkApi } from "..";
import { v4 } from "uuid";
import { selectAllLines, selectAllTextElements } from "../base-selectors";


export const updateTranscription = createAsyncThunk<
    {
        lineUpdates: Update<LineEntity, string>[];
        newLines: LineEntity[];
        newTextElemnt: TextEntity | null
    },
    { doc: string, ids: string[] },
    ThunkApi
>("updateTranscription", async ({ doc, ids }, { getState }) => {
    const lineUpdates: Update<LineEntity, string>[] = [];
    const text = doc.trim().split("\n");
    console.log(text);
    const newLines: LineEntity[] = [];
    if (text.length >= ids.length) {
        text.forEach((line, index) => {
            const processed = line
                .trim()
                .replace(/\s{2,}/g, " ")
                .split(" ")
                .map((token) => determineTokenState(token.trim()));
            const tokens = processed.map((t) => t.token);
            const states = processed.map((t) => t.state);
            if (index < ids.length) {
                lineUpdates.push({
                    id: ids[index],
                    changes: { tokens, states },
                });
            } else {
                newLines.push({
                    id: v4(),
                    elementId: "",
                    tokens,
                    states,
                    position: "line",
                    __typename: "Line",
                    order: index,
                });
            }
        });
    } else {
        ids.forEach((id, index) => {
            if (index >= text.length - 1) {
                lineUpdates.push({
                    id,
                    changes: { tokens: null, states: null },
                });
            }

        });
    }

    let newTextElemnt: TextEntity | null = null;
    let elementId = "";
    if (newLines.length > 0) {
        const textElements = selectAllTextElements(getState().text);
        if (textElements.length > 0) {
            elementId = textElements[0].id;
        } else {
            elementId = v4();
            newTextElemnt = {
                id: elementId,
                order: 0,
                position: "main body",
                pageId: getState().info!.id,
                __typename: "TextElement",
            };
        }
    }


    return {
        lineUpdates,
        newLines: newLines.map((line) => ({ ...line, elementId })),
        newTextElemnt
    };
});
