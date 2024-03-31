import type { UnitMark } from "../..";

export function hasAClosingMark(id: string, marks: UnitMark[]) {
    return marks.find(m => m.type === "close" && m.unit.id === id);
}

