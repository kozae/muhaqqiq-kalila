import type { Segment } from "kalila-graphql";
import { orderBy } from "lodash";
import { type RootState } from "../..";
import { selectAllLines, selectAllOpenSegments, selectAllSegments, selectAllTextElements } from "../../base-selectors";
import { formatAndJoinTokens, groupLinesByElementId } from "./util";
import lodash from 'lodash';



function prepareTokenAndLineLengthMaps(state: RootState) {
    const lineList = selectAllLines(state.lines);
    const textList = selectAllTextElements(state.text);
    const grouped = groupLinesByElementId(lineList);

    const lineLens: Record<number, number> = {};
    const tokenLens: Record<number, number[]> = {};
    for (const el of textList) {
        if (el?.position?.startsWith("main") && grouped[el.id]) {

            for (const line of grouped[el.id]) {
                // prepare text
                const lineText = formatAndJoinTokens(line);


                // track lengths
                lineLens[line.order] = lineText?.length ?? 0;
                tokenLens[line.order] = line.tokens?.map((t) => t!.length) ?? [];
            }
        }
    }

    return { lineLens, tokenLens };

}

function getSegmentFromPrevPage(segments: Segment[], currPageNumber: number) {
    return segments.find(seg => seg.startPage < currPageNumber && seg.endPage === currPageNumber);
}

function getNearestSegmentFromPrevPage(segments: Segment[], currPageNumber: number) {
    return lodash.chain(segments).filter(seg => seg.startPage < currPageNumber).sortBy(seg => seg.startPage).last().value();
}


function buildSegmentsWithStartPositions(pageSegments: Segment[], lineLens: Record<number, number>, tokenLens: Record<number, number[]>, pageNumber: number) {

    const segmenstWithPositions: (Segment & { position: number })[] = []
    for (const segment of pageSegments) {
        let position = 0;
        if (segment.startPage < pageNumber) {
            segmenstWithPositions.push({ ...segment, position });
            continue;
        }
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
            if (tokenOrder === endToken && endToken === tokenLens[endLine].length - 1) {
                continue;
            }
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
            const isConsecutive = segment.endToken + 1 === nextSegment.startToken;
            if ((isSameLine && isConsecutive) || (isNextLine && endTokenIsLastInLine)) {
                segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position });
            } else {
                const close = calculateCloseFlag(segment.endLine, segment.endToken);
                segmenstWithPositionsAndCloseFlag.push({ ...segment, position: segment.position, close });
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
    const openSegments = selectAllOpenSegments(state.openSegments);
    const segFromPrevPage = getSegmentFromPrevPage(segments, state.info?.number ?? 0) || getNearestSegmentFromPrevPage(openSegments, state.info?.number ?? 0);
    const pageSegments = [
        ...segments.filter(seg => seg.startPage === state.info?.number ?? 0),
        ...[segFromPrevPage].filter(Boolean).map(seg => ({ ...seg, isStatic: true }))
    ];

    const { lineLens, tokenLens } = prepareTokenAndLineLengthMaps(state);

    const segmenstWithPositions = buildSegmentsWithStartPositions(pageSegments, lineLens, tokenLens, state.info?.number ?? 0);

    const segmenstWithPositionsAndCloseFlag = buildSegmentsWithCloseFlag(segmenstWithPositions, state.info?.number ?? 0, lineLens, tokenLens);

    return { segments: segmenstWithPositionsAndCloseFlag };
}
