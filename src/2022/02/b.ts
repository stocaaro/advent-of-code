import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const values = lines.map((l) => l.split(" "));

const roundSelection: { [i: string]: string } = {
    'AX': 'C',
    'AY': 'A',
    'AZ': 'B',
    'BX': 'A',
    'BY': 'B',
    'BZ': 'C',
    'CX': 'B',
    'CY': 'C',
    'CZ': 'A'
};

const throwValue: { [i: string]: number } = {
    'A': 1,
    'B': 2,
    'C': 3
}

const outcomeValue: { [i: string]: number } = {
    'X': 0,
    'Y': 3,
    'Z': 6
}

let totalScore = 0;

values.forEach(([o, r]) => {
    totalScore += outcomeValue[r] + throwValue[roundSelection[o + r]];
})
console.log(totalScore)