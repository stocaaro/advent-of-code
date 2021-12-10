import { forFileLinesOf } from '../helpers/fileAccess';

const positions = forFileLinesOf<number[]>(
  __dirname,
  'input',
  (line: string) => {
    return line.split(',').map((days) => {
      return Number(days);
    });
  }
).flat();

const min = Math.min(...positions);
const max = Math.max(...positions);

let minFuelSpent = Infinity;
for (let i = min; i <= max; i++) {
  const fuelSpent = positions
    .map((pos) => Math.abs(pos - i))
    .reduce((a, b) => a + b, 0);
  minFuelSpent = Math.min(minFuelSpent, fuelSpent);
}

console.log(`Minimum fuel spent to align is ${minFuelSpent}`);

minFuelSpent = Infinity;
for (let i = min; i <= max; i++) {
  const fuelSpent = positions
    .map((pos) => Math.abs(pos - i))
    .reduce((a, b) => a + (b * (b + 1)) / 2, 0);
  minFuelSpent = Math.min(minFuelSpent, fuelSpent);
}

console.log(`Second part: Minimum fuel spent to align is ${minFuelSpent}`);
