export function getUnitStartLocation(position: number, doc: string) {

    const subDoc = doc.slice(0, position);
    const lines = subDoc.split('\n');
    const tokens = lines[lines.length - 1].trim().split(' ');

    return { line: lines.length - 1, token: tokens.length - 1 };
}
export function getUnitEndLocation(position: number, doc: string) {

    const subDoc = doc.slice(0, position);
    const lines = subDoc.split('\n');
    const tokens = lines[lines.length - 1].trim().split(' ');

    return { line: lines.length - 1, token: tokens.length - 1 };
}

export function findLastTokenInLine(doc: string, line: number) {
    const lines = doc.split('\n');
    const tokens = lines[line].trim().split(' ');
    return tokens.length - 1;
}