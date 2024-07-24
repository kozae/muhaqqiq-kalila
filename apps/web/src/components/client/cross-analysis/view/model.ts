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
    groups: Group[];
    unique_fragments: UniqueFragment;
}

export type ColoredPassages = Record<string, { bgcolor?: string; text: string; textColor?: string; colorName?: string }[]>;


const londonRepresentatives = new Set(["L4044", "A4095", "L8751"])
const parisRepresentatives = new Set(["P3465", "P3466", "L8751", "P3473", "BWII672"])


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


export function assignColorsToText(analysis: Analysis, passages: Record<string, string>): ColoredPassages {
    const uniqueFragmentColor = colorMap["Pink"];
    const coloredPassages: ColoredPassages = {};

    // Initialize coloredPassages with empty arrays
    for (const key in passages) {
        coloredPassages[key] = [];
    }

    // Helper function to add text fragments in order
    function addTextFragment(key: string, start: number, end: number, color?: string, textColor?: string, colorName?: string) {

        if (start < end) {
            coloredPassages[key].push({ bgcolor: color, text: passages[key].substring(start, end), textColor: textColor, colorName: colorName });
        }
    }

    // Process unique fragments
    for (const [key, fragments] of Object.entries(analysis.unique_fragments)) {
        for (const [text, [start, end]] of fragments) {
            if (start === -1) continue;
            addTextFragment(key, start, end, uniqueFragmentColor, "black", "Pink");
        }
    }

    // Process groups
    for (const group of analysis.groups) {
        if (group.sources.length === Object.keys(passages).length) {
            continue;
        }




        for (const source of group.sources) {
            for (const rangeGroup of group.ranges) {
                const range = rangeGroup[source];
                if (range[0] === -1) continue;
                addTextFragment(source, range[0], range[1], group.bgcolor, group.textColor, group.colorName);
            }
        }
    }

    // Add remaining text fragments that are not part of any group or unique fragment
    for (const key in passages) {
        const fragments = coloredPassages[key];
        let lastIndex = 0;

        const sortedFragments = fragments.sort((a, b) => {
            const startA = passages[key].indexOf(a.text);
            const startB = passages[key].indexOf(b.text);
            return startA - startB;
        });

        coloredPassages[key] = [];

        for (const fragment of sortedFragments) {
            const start = passages[key].indexOf(fragment.text, lastIndex);
            if (start > lastIndex) {
                addTextFragment(key, lastIndex, start);
            }
            addTextFragment(key, start, start + fragment.text.length, fragment.bgcolor, fragment.textColor, fragment.colorName);
            lastIndex = start + fragment.text.length;
        }

        if (lastIndex < passages[key].length) {
            addTextFragment(key, lastIndex, passages[key].length);
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