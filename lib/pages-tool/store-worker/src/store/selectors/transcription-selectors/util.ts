import lodash from "lodash";
import { type LineEntity, formatTokens } from "../..";

export function formatAndJoinTokens(line: LineEntity) {
    return formatTokens(
        line.tokens as string[],
        line.states as string[],
    ).join(" ");
}

export function groupLinesByElementId(lines: LineEntity[]) {
    return lodash.groupBy(
        lodash.orderBy(lines, "order"),
        "elementId",
    );
}