import { forFileLinesOf } from '../helpers/fileAccess';

const alpha = 'abcdefghijklmnopqrstuvwxyz';
const fullAlpha = (alpha + alpha.toUpperCase()).split('')
const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const splitlines = lines.map((l) => [
    l.slice(0, l.length / 2),
    l.slice(l.length / 2, l.length)
])

const overlap = splitlines.map(([p1, p2]) => {
    const array1 = p1.split('');
    const array2 = p2.split('');
    const char = array1.filter(value => array2.includes(value))[0];
    return fullAlpha.indexOf(char) + 1;
})

console.log(overlap.reduce((r, v) => r + v, 0))