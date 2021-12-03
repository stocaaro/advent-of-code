import * as fs from 'fs';
import * as path from 'path';

function mostCommonBits(
  values: number[][],
  prefer = 1,
  invert = false
): number[] {
  const counts: number[] = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      counts[j] ||= 0;
      counts[j] += values[i][j];
    }
  }
  const rets = invert ? [0, 1] : [1, 0];
  if (prefer == 1) {
    return counts.map((val) => {
      if (val >= Math.ceil(values.length / 2)) {
        return rets[0];
      } else {
        return rets[1];
      }
    });
  }
  return counts.map((val) => {
    if (val > Math.ceil(values.length / 2)) {
      return rets[0];
    } else {
      return rets[1];
    }
  });
}

fs.readFile(path.join(__dirname, 'input'), 'utf8', (error, data) => {
  const values = data.split(/\r?\n/).map((val) => {
    const bits = val.split('').map((n) => Number(n));
    return bits;
  });

  // Convert input into an array of binaray digit arrays
  const counts: number[] = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      counts[j] ||= 0;
      counts[j] += values[i][j];
    }
  }

  // Solution 1: Find the most common / uncommon bits
  const gammaAr = mostCommonBits(values);
  const epsilonAr = mostCommonBits(values, 1, true);
  const gamma = parseInt(epsilonAr.join(''), 2);
  const epsilon = parseInt(gammaAr.join(''), 2);
  const product = gamma * epsilon;
  console.log(`Solution 1: The product of gamma * epsilon is: ${product}`);

  // Solution 2: Filter by most and least common significant digits iteratively
  let currentValues: number[][] = Object.assign([], values);
  let curIndex = 0;
  while (currentValues.length > 1) {
    const curBits = mostCommonBits(currentValues, 1, false);
    currentValues = currentValues.filter((val) => {
      return val[curIndex] == curBits[curIndex];
    });
    curIndex += 1;
  }
  const oxGeneratorRating = parseInt(currentValues[0].join(''), 2);

  currentValues = Object.assign([], values);
  curIndex = 0;
  while (currentValues.length > 1) {
    const curBits = mostCommonBits(currentValues, 1, true);
    currentValues = currentValues.filter((val) => {
      return val[curIndex] == curBits[curIndex];
    });
    curIndex += 1;
  }
  const c02ScrubberRating = parseInt(currentValues[0].join(''), 2);

  const product2 = c02ScrubberRating * oxGeneratorRating;
  console.log(
    `Solution 2: The product of scrubberRating * oxogenRating is: ${product2}`
  );
});
