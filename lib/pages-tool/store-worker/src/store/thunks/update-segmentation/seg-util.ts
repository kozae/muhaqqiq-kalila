import type { Segment } from "kalila-graphql";
import type { UnitMark } from "../..";
import { findLastTokenInLine, getUnitEndLocation, getUnitStartLocation } from "./text-util";
import { hasAClosingMark } from "./mark-util";
import { v4 as uuidv4 } from "uuid";


export function createSgementByUnitIdMap(segments: Segment[]) {
    const map = {} as Record<string, Segment>;
    segments.forEach(segment => {
        map[segment.unitId] = segment;
    });
    return map;
}

export function processMark(mark: UnitMark, index: number, marks: UnitMark[], doc: string, currSegments: Record<string, Segment>, currPage: number) {
    const isLastMark = index === marks.length - 1;
    const existingSegment = currSegments[mark.unit.id];
    const closingMark = hasAClosingMark(mark.unit.id, marks);

    let endLine: number | null | undefined = -1,
        endToken: number | null | undefined = -1,
        endPage = -1;
    if (isLastMark && existingSegment && closingMark === undefined) {
        console.log('retaining old end');
        endLine = existingSegment.endLine;
        endToken = existingSegment.endToken;
        endPage = existingSegment.endPage;
    }
    else if (closingMark) {
        const closingLocation = getUnitEndLocation(closingMark.position, doc)
        endLine = closingLocation.line;
        endToken = closingLocation.token;
        endPage = currPage
    } else {
        const nextMark = marks.find(m => m.position > mark.position && m.type === "open");
        if (nextMark) {
            const nextLocation = getUnitStartLocation(nextMark.position, doc);
            const markIsAfterLineBreak = doc[nextMark.position - 1] === '\n';
            if (markIsAfterLineBreak) {
                endLine = nextLocation.line - 1;
                endToken = findLastTokenInLine(doc, endLine);
                endPage = currPage;
            } else {
                endLine = nextLocation.line;
                endToken = nextLocation.token - 1;
                endPage = currPage;
            }
        }

    }

    if (existingSegment && existingSegment.startPage !== currPage) {
        return {
            ...existingSegment,
            endLine,
            endToken,
            endPage,
            version: Date.now(),
        } as Segment;
    }

    const { line: startLine, token: startToken } = getUnitStartLocation(mark.position, doc)

    if (existingSegment) {
        return {
            ...existingSegment,
            endLine,
            endToken,
            endPage,
            startLine,
            startToken,
            startPage: currPage,
            version: Date.now(),
        } as Segment;
    } else {
        return {
            __typename: "Segment",
            id: uuidv4(),
            unitId: mark.unit.id,
            unit: mark.unit,
            version: Date.now(),
            startLine,
            startToken,
            startPage: currPage,
            endLine,
            endToken,
            endPage
        } as Segment;
    }

}

export function findEndPositionOfSegmentFromPreviousPage(segment: Segment, marks: UnitMark[], doc: string, currPage: number) {

    const closingMark = hasAClosingMark(segment.unitId, marks);

    if (closingMark) {
        const closingLocation = getUnitEndLocation(closingMark.position, doc)
        const endLine = closingLocation.line;
        const endToken = closingLocation.token;
        const endPage = currPage;
        return {
            ...segment,
            endLine,
            endToken,
            endPage,
            version: Date.now(),
        } as Segment;
    } else {
        const nextMark = marks[0];
        if (nextMark) {
            const nextLocation = getUnitStartLocation(nextMark.position, doc);
            const markIsAfterLineBreak = doc[nextMark.position - 1] === '\n';
            if (markIsAfterLineBreak) {
                return {
                    ...segment,
                    endLine: nextLocation.line - 1,
                    endToken: findLastTokenInLine(doc, nextLocation.line - 1),
                    endPage: currPage,
                    version: Date.now(),
                } as Segment;
            } else {
                return {
                    ...segment,
                    endLine: nextLocation.line,
                    endToken: nextLocation.token - 1,
                    endPage: currPage,
                    version: Date.now(),
                } as Segment;
            }
        }
    }

    return null;
}