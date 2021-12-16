import { forFileLinesOf } from '../helpers/fileAccess';

const energyLevels: number[][] = forFileLinesOf<number[]>(
  __dirname,
  'input',
  (line: string) => {
    return line.split('').map((v) => Number(v));
  }
);

function incrementNeighbors(grid: number[][], x: number, y: number) {
  for (let xoffset = -1; xoffset <= 1; xoffset++) {
    for (let yoffset = -1; yoffset <= 1; yoffset++) {
      if (
        (grid[y + yoffset] || [])[x + xoffset] &&
        (xoffset != 0 || yoffset != 0)
      ) {
        grid[y + yoffset][x + xoffset]++;
      }
    }
  }
}

let flashCount = 0;
for (let i = 0; i < 1000; i++) {
  const flashGrid = energyLevels.map((r) => r.map((v) => false));
  energyLevels.forEach((row) => {
    for (let j = 0; j < row.length; j++) {
      row[j] += 1;
    }
  });
  let incrementingNew = true;
  while (incrementingNew) {
    incrementingNew = false;
    for (let y = 0; y < energyLevels.length; y++) {
      for (let x = 0; x < energyLevels[y].length; x++) {
        if (energyLevels[y][x] > 9 && !flashGrid[y][x]) {
          incrementingNew = true;
          flashGrid[y][x] = true;
          incrementNeighbors(energyLevels, x, y);
        }
      }
    }
  }
  if (
    flashGrid.flat().length == flashGrid.flat().filter((v) => v != false).length
  ) {
    console.log(i + 1);
  }
  for (let y = 0; y < energyLevels.length; y++) {
    for (let x = 0; x < energyLevels[y].length; x++) {
      if (flashGrid[y][x]) {
        energyLevels[y][x] = 0;
        flashCount++;
      }
    }
  }
}

console.log(flashCount);
