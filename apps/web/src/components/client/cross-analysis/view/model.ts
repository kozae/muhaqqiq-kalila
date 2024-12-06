import { groups } from "d3";
import { colorMap, crossAnalysisColors, determineTextColor, getNextColor } from "./colors";

export interface Fragment {
    [key: string]: string;
}

export interface Range {
    [key: string]: [number, number];
}

export interface Group {
    fragments: Fragment[];
    ranges: Range[];
    sources: string[];
    bgcolor?: string;
    textColor?: string;
    colorName?: string;
}

export interface UniqueFragment {
    [key: string]: [string, [number, number]][];
}

export interface Analysis {
    timestamp?: string;
    name?: string;
    settings?: {
        [key: string]: string;
    };
    groups: Group[];
    unique_fragments: UniqueFragment;
}

export type ColoredPassages = Record<string, { bgcolor?: string; text: string; textColor?: string; colorName?: string }[]>;


const londonRepresentatives = new Set(["L4044", "A4095", "L8751"])
const parisRepresentatives = new Set(["P3465", "P3466", "P3473", "BWII672"])


function determineGroup(sources: string[]) {
    const sourcesSet = new Set(sources);

    const intersectionWithLondon = new Set([...sourcesSet].filter(source => londonRepresentatives.has(source)));
    const intersectionWithParis = new Set([...sourcesSet].filter(source => parisRepresentatives.has(source)));

    if (intersectionWithLondon.size > 0 && intersectionWithParis.size === 0) {
        return "London";
    }
    if (intersectionWithParis.size > 0 && intersectionWithLondon.size === 0) {
        return "Paris";
    }
    return "Mixed";
}



export function assignColorsToAnalysis(analysis: Analysis): Analysis {
    const parisColorGenerator = getNextColor("Paris");
    const londonColorGenerator = getNextColor("London");
    const mixedColorGenerator = getNextColor("Mixed");
    const generators = {
        "Paris": parisColorGenerator,
        "London": londonColorGenerator,
        "Mixed": mixedColorGenerator
    }
    const newGroups: Group[] = []
    for (const group of analysis.groups) {
        const color = generators[determineGroup(group.sources)].next().value ?? { name: "", hex: "" };
        newGroups.push({ ...group, bgcolor: color.hex, textColor: determineTextColor(color.hex), colorName: color.name });
    }
    return { groups: newGroups, unique_fragments: analysis.unique_fragments };
}


export function initializeColoredPassages(passages: Record<string, string[]>): ColoredPassages {
    const coloredPassages: ColoredPassages = {};
    for (const [key, tokens] of Object.entries(passages)) {
        coloredPassages[key] = [{
            text: tokens.join(" "),
            bgcolor: undefined,
            textColor: undefined,
            colorName: undefined
        }];
    }
    return coloredPassages;
}

export function assignColorsToText(analysis: Analysis, passages: Record<string, string[]>): ColoredPassages {
    const uniqueFragmentColor = colorMap["Pink"];
    const coloredPassages: ColoredPassages = {};

    // Initialize coloredPassages with full text as a single fragment
    for (const [key, tokens] of Object.entries(passages)) {
        coloredPassages[key] = [{
            text: tokens.join(" "),
            bgcolor: undefined,
            textColor: undefined,
            colorName: undefined
        }];
    }

    // Helper function to split a fragment at given indices
    function splitFragment(fragment: ColoredPassages[string][number], start: number, end: number, color?: string, textColor?: string, colorName?: string) {
        const tokens = fragment.text.split(" ");
        const before = tokens.slice(0, start).join(" ");
        const middle = tokens.slice(start, end).join(" ");
        const after = tokens.slice(end).join(" ");

        const result = [];
        if (before) result.push({ ...fragment, text: before });
        result.push({ text: middle, bgcolor: color, textColor, colorName });
        if (after) result.push({ ...fragment, text: after });

        return result;
    }

    // Process groups
    for (const group of analysis.groups) {
        for (const source of group.sources) {

            if (!coloredPassages[source]) continue;

            for (const rangeGroup of group.ranges) {
                const [start, end] = rangeGroup[source];
                if (start === -1) continue;

                coloredPassages[source] = coloredPassages[source].flatMap(fragment => {
                    const fragmentStart = fragment.text.split(" ").indexOf(passages[source][start]);
                    if (fragmentStart === -1) return [fragment];

                    const fragmentEnd = fragmentStart + (end - start) + 1;
                    return splitFragment(fragment, fragmentStart, fragmentEnd, group.bgcolor, group.textColor, group.colorName);
                });
            }
        }
    }

    // Process unique fragments
    for (const [key, fragments] of Object.entries(analysis.unique_fragments)) {
        if (!coloredPassages[key]) continue;
        for (const [, [start, end]] of fragments) {
            if (start === -1) continue;

            coloredPassages[key] = coloredPassages[key].flatMap(fragment => {
                const fragmentStart = fragment.text.split(" ").indexOf(passages[key][start]);
                if (fragmentStart === -1) return [fragment];

                const fragmentEnd = fragmentStart + (end - start) + 1;
                return splitFragment(fragment, fragmentStart, fragmentEnd, uniqueFragmentColor, "black", "Pink");
            });
        }
    }

    return coloredPassages;
}

export interface VisualizationDataGroup {
    key: string;
    color: string;
    colorName: string;
    textColor: string;
    sources: string[];
}

export interface VisualizationData {
    groups: VisualizationDataGroup[];
}

export function createVisualizationData(analysis: Analysis) {
    const data: VisualizationData = {
        groups: []
    };

    const sourcesWithUnique = new Set(Object.keys(analysis.unique_fragments));

    data.groups.push({
        key: "unique",
        color: "#E38EEA",
        colorName: "Pink",
        textColor: "black",
        sources: [...sourcesWithUnique]
    });

    for (const group of analysis.groups) {
        const sources = group.sources
        const key = group.fragments[0][sources[0]].split(" ").slice(0, 2).join(" ");
        data.groups.push({
            key: key,
            color: group.bgcolor ?? "",
            colorName: group.colorName ?? "",
            textColor: group.textColor ?? "",
            sources
        });

    }
    data.groups.sort((a, b) => {
        if (a.color === '#E38EEA') return -1;
        if (b.color === '#E38EEA') return 1;
        return b.sources.length - a.sources.length;
    });
    return data;
}