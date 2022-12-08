import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const map = lines.map((l) => l.split('').map((e) => parseInt(e)))

function visibleInDirectionCheck (x: number, y: number, incX: number, incY: number, value: number): boolean {
    // If we're out of bounds, then we're visible
    const curValue = map[y]?.[x];
    if (curValue === undefined) { // Check length bounds correctness
        return true
    }
    if (value <= curValue) {
        return false
    }
    return visibleInDirectionCheck(x + incX, y + incY, incX, incY, value);
}

function visible (x: number, y: number): boolean {
    if (
        visibleInDirectionCheck(x - 1, y, -1, 0, map[y][x]) ||
        visibleInDirectionCheck(x + 1, y, 1, 0, map[y][x]) ||
        visibleInDirectionCheck(x, y - 1, 0, -1, map[y][x]) ||
        visibleInDirectionCheck(x, y + 1, 0, +1, map[y][x])
    ) {
        return true;
    }
    return false;
}

const result = map.flatMap((row, y) => row.map((_, x) => visible(x, y)))

console.log(result.reduce((ret, v) => ret + (v ? 1 : 0), 0))