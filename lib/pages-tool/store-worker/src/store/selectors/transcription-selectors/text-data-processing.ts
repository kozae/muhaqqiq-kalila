import lodash from "lodash";
import { type LineEntity, type RootState, toTitleCase } from "../..";
import { selectAllLines, selectAllTextElements } from "../../base-selectors";
import type { TranscriptionData } from "./models";
import { formatAndJoinTokens, groupLinesByElementId } from "./util";


function initTranscriptionData() {
    return {
        text: [] as string[],
        colors: [] as string[],
        ids: [] as string[],
        points: [] as number[][],
        rotations: [] as number[],
    }
}

function addLineDataToTranscriptionData(line: LineEntity, data: TranscriptionData | undefined = undefined): TranscriptionData {
    const text = formatAndJoinTokens(line);
    if (!data) {

        return {
            text: text ? [text] : [],
            colors: [line?.color ?? "#fff"],
            ids: [line?.id ?? ""],
            points: [(line?.region?.slice(0, -1) ?? []) as number[]],
            rotations: [lodash.last(line?.region) ?? 0],
        };
    }
    return {
        ...data,
        text: text ? [...data.text, text] : data.text,
        colors: [...data.colors, line?.color ?? "#fff"],
        ids: [...data.ids, line?.id ?? ""],
        points: [...data.points, (line?.region?.slice(0, -1) ?? []) as number[]],
        rotations: [...data.rotations, lodash.last(line?.region) ?? 0],
    };
}

export function buildTranscriptionData(state: RootState) {
    const lineList = selectAllLines(state.lines);
    const textList = selectAllTextElements(state.text);

    const grouped = groupLinesByElementId(lineList);

    let body = initTranscriptionData();
    const glosses: Record<string, TranscriptionData> = {};
    for (const el of textList) {
        if (grouped[el.id]) {
            if (el?.position?.startsWith("main")) {
                for (const line of grouped[el.id]) {
                    body = addLineDataToTranscriptionData(line, body);
                }
            } else {
                let gloss = initTranscriptionData();
                for (const line of grouped[el.id]) {
                    gloss = addLineDataToTranscriptionData(line, gloss);
                }
                glosses[`${el?.order + 1}. ${toTitleCase(el?.position ?? "")}`] = gloss;
            }
        }
    }

    const lines: Record<string, LineEntity> = {};
    lineList
        .filter((l) => l?.region !== undefined)
        .forEach((l) => {
            lines[l!.id] = l;
        });

    return { body, glosses, hasGloss: Object.keys(glosses).length > 0, lines };

}
