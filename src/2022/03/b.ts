import { forFileLinesOf } from '../helpers/fileAccess';

const alpha = 'abcdefghijklmnopqrstuvwxyz';
const fullAlpha = (alpha + alpha.toUpperCase()).split('')
const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const groupedLines: string[][][] = []
lines.forEach((v, i) => {
    const index = Math.floor(i / 3);
    groupedLines[index] ??= [];
    groupedLines[index].push(v.split(''));
});

const overlap = groupedLines.map(([a, b, c]) => {
    const inAll = a.filter(value => b.includes(value) && c.includes(value));
    return fullAlpha.indexOf(inAll[0]) + 1
})

console.log(overlap.reduce((r, v) => r + v, 0))