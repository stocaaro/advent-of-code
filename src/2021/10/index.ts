import { forFileLinesOf } from '../helpers/fileAccess';

const codeLines = forFileLinesOf<string[]>(
  __dirname,
  'input',
  (line: string) => {
    return line.split('');
  }
);

const charPairs: { [key: string]: string } = {
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>'
};

const points: { [key: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const points2: { [key: string]: number } = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const charOpen = Object.keys(charPairs);

let buffer: string[] = [];
const result: string[] = [];
const result2: string[][] = [];

for (const line of codeLines) {
  for (const index in line) {
    const char = line[index];
    if (charOpen.includes(char)) {
      buffer.push(char);
    } else {
      const openChar = buffer.pop() || '';
      if (!(charPairs[openChar] == char)) {
        result.push(char);
        buffer = [];
        break;
      }
    }
  }
  if (buffer.length > 0) {
    result2.push(buffer.reverse());
    buffer = [];
  }
}

console.log(result.map((char) => points[char]).reduce((a, b) => a + b, 0));
let scores2 = result2.map((row) => {
  let curScore = 0;
  for (const index in row) {
    const char = charPairs[row[index]];
    curScore = curScore * 5 + points2[char];
  }
  return curScore;
});
scores2 = scores2.sort((a, b) => a - b);
console.log(scores2[Math.round((scores2.length - 1) / 2)]);
