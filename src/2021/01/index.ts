import { forFileLinesOf } from '../helpers/fileAccess';

let countOfIncreases = 0;

function countIncreases(inputArray: number[]): number {
  let countOfIncreases = 0;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i + 1]) {
      if (inputArray[i] < inputArray[i + 1]) {
        countOfIncreases += 1;
      }
    }
  }
  return countOfIncreases;
}

const values = forFileLinesOf<number>(__dirname, 'input1', (line: string) => {
  return Number(line);
});
console.log(values);

// How many measurements are larger than the previous measurement?
countOfIncreases = countIncreases(values);
console.log(
  `The total times the next measurement was larger than the previous is: ${countOfIncreases}`
);

// Instead, consider sums of a three-measurement sliding window
const threeMeasureWindows = [];
for (let i = 0; i < values.length; i++) {
  if (values[i + 2]) {
    threeMeasureWindows.push(values[i] + values[i + 1] + values[i + 2]);
  }
}
countOfIncreases = countIncreases(threeMeasureWindows);
console.log(
  `With windows, the total times the next measurement was larger than the previous is: ${countOfIncreases}`
);
