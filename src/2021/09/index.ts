import { forFileLinesOf } from '../helpers/fileAccess';

const grid = forFileLinesOf<number[]>(__dirname, 'input', (line: string) => {
  return line.split('').map((v) => Number(v));
});

const result: [number, number][] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const curVal = grid[y][x];
    const surroundingValues = [
      (grid[y - 1] || [])[x],
      (grid[y + 1] || [])[x],
      (grid[y] || [])[x - 1],
      (grid[y] || [])[x + 1]
    ].filter((v) => v != undefined);
    if (surroundingValues.find((val) => val <= curVal) == undefined) {
      result.push([y, x]);
    }
  }
}

const res = result.map(([y, x]) => grid[y][x] + 1).reduce((r, v) => r + v, 0);

console.log(`The total risk value is ${res}`);

function exploreAndMarkBasin(
  grid: number[][],
  gridTracker: boolean[][],
  x: number,
  y: number
):number {
  const curVal = (grid[y] || [])[x];
  const curTrack = (gridTracker[y] || [])[x];
  if (curVal == undefined || curTrack == true) {
    return 0;
  }

  gridTracker[y][x] = true;
  if (curVal == 9) {
    return 0;
  }

  return (
    1 +
    exploreAndMarkBasin(grid, gridTracker, x - 1, y) +
    exploreAndMarkBasin(grid, gridTracker, x + 1, y) +
    exploreAndMarkBasin(grid, gridTracker, x, y - 1) +
    exploreAndMarkBasin(grid, gridTracker, x, y + 1)
  );
}

const gridTracker = grid.map((row) => row.map((el) => false));

const basinSizes: number[] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (gridTracker[y][x] == false) {
      basinSizes.push(exploreAndMarkBasin(grid, gridTracker, x, y));
    }
  }
}

basinSizes.sort((a, b) => (a > b ? -1 : 1));

console.log(
  `The multiple of the 3 largest basin sizes is ${
    basinSizes[0] * basinSizes[1] * basinSizes[2]
  }`
);
