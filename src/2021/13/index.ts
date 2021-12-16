import { forFileLinesOf } from '../helpers/fileAccess';

const instructions: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
  return line;
});

let foundBreak = false;

const foldInstructions: [string, number][] = [];
const coords: boolean[][] = [];

instructions.forEach((instruction) => {
  if (instruction == '') {
    foundBreak = true;
  } else if (foundBreak) {
    const foldToken: string = instruction.split(' ')[2];
    const [axis, num] = (foldToken || '').split('=');
    foldInstructions.push([axis, Number(num)]);
  } else {
    const [xStr, yStr] = instruction.split(',');
    coords[Number(yStr)] ||= [];
    coords[Number(yStr)][Number(xStr)] = true;
  }
});

function fold(coords: boolean[][], axis: string, foldIndex: number) {
  const width = Math.max(...coords.map((row) => (row || []).length).filter((e) => e));
  const newCoords: boolean[][] = [];
  for (let curY = 0; curY < coords.length; curY++) {
    for (let curX = 0; curX < width; curX++) {
      if (axis == 'x') {
        if (curX < foldIndex) {
          newCoords[curY] ||= [];
          newCoords[curY][curX] =
            (coords[curY] || [])[curX] || (coords[curY] || [])[2 * foldIndex - curX];
        }
      } else {
        if (curY < foldIndex) {
          newCoords[curY] ||= [];
          newCoords[curY][curX] =
            (coords[curY] || [])[curX] || (coords[2 * foldIndex - curY] || [])[curX];
        }
      }
    }
  }
  return newCoords;
}

function outputCoords(coords: boolean[][]) {
  const width = Math.max(...coords.map((row) => (row || []).length).filter((e) => e));
  for (let y = 0; y < coords.length; y++) {
    const line = [];
    for (let x = 0; x < width; x++) {
      line.push((coords[y] || [])[x] ? '#' : '.');
    }
    console.log(line.join(''));
  }
}

let curCoords = coords;

foldInstructions.forEach((foldInst) => {
  curCoords = fold(curCoords, ...foldInst);
  // outputCoords(curCoords);
  console.log(curCoords.flat().filter((v) => v).length);
});
outputCoords(curCoords);
