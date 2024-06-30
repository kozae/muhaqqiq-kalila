import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LineEntity, ThunkApi } from "..";
import { selectAllTextElements } from "../base-selectors";
import { selectElementLines } from "../internal-selectors";
import { divideTextElementsIntoEqualLineRegions } from "../util";
import { sortBy } from "lodash";


export const redistributeLines = createAsyncThunk<LineEntity[], {}, ThunkApi>(
    "redistributeLines",
    async ({ }, { getState }) => {

        const state = getState();
        const textElements = selectAllTextElements(state.text);
        const updatedLines: LineEntity[] = [];

        for (const el of textElements) {
            const elementLines = sortBy(selectElementLines(state, el.id), "order");

            const lineRegions = divideTextElementsIntoEqualLineRegions(el.region as number[], elementLines.length);
            for (const [index, line] of elementLines.entries()) {
                const region = lineRegions[index];
                const updatedLine = { ...line, region };
                updatedLines.push(updatedLine);
            }
        }





        return updatedLines;
    },
);
