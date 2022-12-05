import { parse } from 'path';
import { forFileLinesOf } from '../helpers/fileAccess';

const colSplitRegex = /.{1,4}/g

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

let capturedColumns = false;

const columns: string[][] = [];
const instructions: number[][] = [];

lines.forEach((l) => {
    if (capturedColumns) {
        const [_move, n, _from, from, _to, to] = l.split(' ');
        if (n && from && to) {
            instructions.push([parseInt(n), parseInt(from), parseInt(to)])
        }
    } else {
        const cols = l.match(colSplitRegex);
        const colNums = cols?.map((c) => {
            return parseInt(c);
        }).filter((c) => {
            return !isNaN(c) && typeof c === 'number'
        })
        if (colNums && colNums?.length > 0) {
            capturedColumns = true;
            console.log(columns);
        } else {
            cols?.forEach((c, i) => {
                const value = c[1];
                columns[i + 1] ??= [];
                if (value !== ' ') {
                    columns[i + 1].unshift(value);
                }
            })
        }
    }
})

function move (n: number, from: number, to: number) {
    const vals = []
    for (let i = 0; i < n; i++) {
        const val = columns[from].pop()
        if (val) {
            vals.unshift(val)
        }
    }
    columns[to].push(...vals)
}

instructions.forEach(([n, from, to]) => move(n, from, to));

const result = columns.map((c) => c.pop()).join('')

console.log(result)