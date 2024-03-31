import type { Segment } from "kalila-graphql";
import { orderBy } from "lodash";
import { type RootState } from "../..";
import { selectAllLines, selectAllSegments, selectAllTextElements } from "../../base-selectors";
import { formatAndJoinTokens, groupLinesByElementId } from "./util";



function prepareTokenAndLineLengthMaps(state: RootState) {
    const lineList = selectAllLines(state.lines);
    const textList = selectAllTextElements(state.text);
    const grouped = groupLinesByElementId(lineList);

    const lineLens: Record<number, number> = {};
    const tokenLens: Record<number, number[]> = {};
    for (const el of textList) {
        if (el?.position?.startsWith("main")) {
            for (const line of grouped[el.id]) {
                // prepare text
                const lineText = formatAndJoinTokens(line);


                // track lengths
                lineLens[line.order] = lineText.length;
                tokenLens[line.order] = line.tokens!.map((t) => t!.length);
            }
        }
    }

    return { lineLens, tokenLens };

}

function getSegmentFromPrevPage(segments: Segment[], currPageNumber: number) {
    return segments.find(seg => seg.startPage < currPageNumber && seg.endPage === currPageNumber);
}

function buildSegmentsWithStartPositions(pageSegments: Segment[], lineLens: Record<number, number>, tokenLens: Record<number, number[]>) {

    const segmenstWithPositions: (Segment & { position: number })[] = []
    for (const segment of pageSegments) {
        let position = 0;
        for (let lineOrder = 0; lineOrder < segment.startLine; lineOrder++) {
            position += lineLens[lineOrder] ?? 0;
            position += 1; // for the line break
        }
        for (let tokenOrder = 0; tokenOrder < segment.startToken; tokenOrder++) {
            position += tokenLens[segment.startLine][tokenOrder] ?? 0;
            position += 1; // for the space
        }
        segmenstWithPositions.push({ ...segment, position })
    }
    return orderBy(segmenstWithPositions, "position");
}



function buildSegmentsWithCloseFlag(segmenstWithStartPositions: (Segment & { position: number })[], currPageNumber: number, lineLens: Record<number, number>, tokenLens: Record<number, number[]>) {

    const segmenstWithPositionsAndCloseFlag: (Segment & { position: number, close?: number })[] = []

    const calculateCloseFlag = (endLine: number, endToken: number) => {
        let close = 0;
        for (let lineOrder = 0; lineOrder < endLine; lineOrder++) {
            close += lineLens[lineOrder] ?? 0;
            close += 1; // for the line break
        }
        for (let tokenOrder = 0; tokenOrder <= endToken; tokenOrder++) {
            close += tokenLens[endLine][tokenOrder] ?? 0;
            close += 1; // for the space
        }
        return close;

    }

    segmenstWithStartPositions.forEach((segment, index, array) => {
        if (segment.endLine === undefined || segment.endLine === null || segment.endToken === undefined || segment.endToken === null || segment.endLine === -1 || segment.endToken === -1) {
            segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position });
            return;
        }

        const nextSegment = array[index + 1];

        const endTokenIsLastInLine = segment.endToken === tokenLens[segment.endLine].length - 1;
        if (nextSegment) {
            const isSameLine = segment.endLine === nextSegment.startLine;
            const isNextLine = segment.endLine + 1 === nextSegment.startLine && nextSegment.startToken === 0;
            const isNonConsecutive = segment.endToken + 1 !== nextSegment.startToken;
            if ((isSameLine && isNonConsecutive) || (isNextLine && !endTokenIsLastInLine)) {
                const close = calculateCloseFlag(segment.endLine, segment.endToken);
                segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position, close });
            } else {
                segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position });
            }
        } else {
            if (segment.endPage === currPageNumber) {
                const close = calculateCloseFlag(segment.endLine, segment.endToken);
                segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position, close });

            } else {
                segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position });

            }
        }
    });

    return segmenstWithPositionsAndCloseFlag;
}

export function buildSegmentationData(state: RootState) {

    const segments = selectAllSegments(state.segments);
    const segFromPrevPage = getSegmentFromPrevPage(segments, state.info!.number);
    const pageSegments = segments.filter(seg => seg.startPage === state.info!.number);

    const { lineLens, tokenLens } = prepareTokenAndLineLengthMaps(state);

    const segmenstWithPositions = buildSegmentsWithStartPositions(pageSegments, lineLens, tokenLens);

    const segmenstWithPositionsAndCloseFlag = buildSegmentsWithCloseFlag(segmenstWithPositions, state.info!.number, lineLens, tokenLens);

    return { segFromPrevPage, segments: segmenstWithPositionsAndCloseFlag };
}
