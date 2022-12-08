import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const map = lines.map((l) => l.split('').map((e) => parseInt(e)))

function visibleInDirection (x: number, y: number, incX: number, incY: number, value: number): number {
    // If we're out of bounds, then we're visible
    const curValue = map[y]?.[x];
    if (curValue === undefined) { // Check length bounds correctness
        return 0
    }
    if (value <= curValue) {
        return 1
    }
    return visibleInDirection(x + incX, y + incY, incX, incY, value) + 1;
}

function scenicScore (x: number, y: number): number {
    return (
        visibleInDirection(x - 1, y, -1, 0, map[y][x]) *
        visibleInDirection(x + 1, y, 1, 0, map[y][x]) *
        visibleInDirection(x, y - 1, 0, -1, map[y][x]) *
        visibleInDirection(x, y + 1, 0, +1, map[y][x])
    );
}

const result = map.flatMap((row, y) => row.map((_, x) => scenicScore(x, y)))

console.log(Math.max(...result))