import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const values = lines.map((l) => l.split(" "));

const gameScore: { [i: string]: number } = {
    'AX': 3,
    'AY': 6,
    'AZ': 0,
    'BX': 0,
    'BY': 3,
    'BZ': 6,
    'CX': 6,
    'CY': 0,
    'CZ': 3
};

const throwValue: { [i: string]: number } = {
    'X': 1,
    'Y': 2,
    'Z': 3
}

let totalScore = 0;

values.forEach(([o, p]) => {
    totalScore += throwValue[p] + gameScore[o + p];
})
console.log(totalScore)