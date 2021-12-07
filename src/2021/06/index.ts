import { forFileLinesOf } from '../helpers/fileAccess';

const curDays = forFileLinesOf<number[]>(__dirname, 'input', (line: string) => {
  return line.split(',').map((days) => {
    return Number(days);
  });
}).flat();

let fishCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

curDays.forEach((day) => {
  fishCounts[day] += 1;
});

for (let i = 1; i <= 256; i += 1) {
  const newFishCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let j = 0; j <= 8; j++) {
    if (j == 0) {
      newFishCounts[8] = fishCounts[j];
      newFishCounts[6] = fishCounts[j];
    } else {
      newFishCounts[j - 1] += fishCounts[j];
    }
  }
  fishCounts = newFishCounts;
  const curTotal = fishCounts
    .filter((x) => x)
    .reduce((total, v) => total + v, 0);
  console.log(`After ${i} days, there are now ${curTotal} fish.`);
}
