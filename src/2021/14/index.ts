import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
  return line;
});

type CharCountTable = { [key: string]: number };

const startingList = lines[0].split('');

const insertionMap = lines.slice(2).reduce<{ [key: string]: string }>((ret, val) => {
  const [k, v] = val.split(' -> ');
  ret[k] = v;
  return ret;
}, {});

function insertFromMap(
  startingList: string[],
  map: { [key: string]: string },
  levels: number,
  accumulator: (ret: CharCountTable, char: string) => CharCountTable,
  initialCountTable: CharCountTable
): CharCountTable {
  let currentCountTable = copyCountTable(initialCountTable);
  for (let i = 0; i < startingList.length; i++) {
    accumulator(currentCountTable, startingList[i]);
    if (startingList[i + 1] != undefined) {
      const newCountTable = betweenFromMap(
        startingList[i],
        startingList[i + 1],
        map,
        levels,
        accumulator,
        {}
      );
      currentCountTable = mergeCountTable(currentCountTable, newCountTable);
    }
  }
  return currentCountTable;
}

const betweenCallCache: { [key: string]: CharCountTable } = {};

function betweenFromMap(
  firstChar: string,
  secondChar: string,
  map: { [key: string]: string },
  levels: number,
  accumulator: (ret: CharCountTable, char: string) => CharCountTable,
  currentValue: CharCountTable
): CharCountTable {
  if (betweenCallCache[`${firstChar}-${secondChar}-${String(levels)}`] != undefined) {
    return betweenCallCache[`${firstChar}-${secondChar}-${String(levels)}`];
  }

  const returnTable: CharCountTable = {};
  const innerChar = map[firstChar + secondChar];
  if (levels > 1) {
    const first = betweenFromMap(firstChar, innerChar, map, levels - 1, accumulator, {});
    mergeCountTable(returnTable, first);
    accumulator(returnTable, innerChar);
    const rest = betweenFromMap(innerChar, secondChar, map, levels - 1, accumulator, {});
    mergeCountTable(returnTable, rest);
  } else {
    accumulator(returnTable, innerChar);
  }
  betweenCallCache[`${firstChar}-${secondChar}-${String(levels)}`] = returnTable;
  return returnTable;
}

function copyCountTable(table: CharCountTable): CharCountTable {
  return Object.assign({}, table);
}

function mergeCountTable(tableA: CharCountTable, tableB: CharCountTable): CharCountTable {
  for (const key in tableB) {
    tableA[key] ||= 0;
    tableA[key] += tableB[key];
  }
  return tableA;
}

const lettersGroups = insertFromMap(
  startingList,
  insertionMap,
  40,
  (ret, char): { [key: string]: number } => {
    ret[char] ||= 0;
    ret[char] += 1;
    return ret;
  },
  {}
);
const letterCounts = Object.values(lettersGroups);
console.log(lettersGroups);
console.log(Math.max(...letterCounts) - Math.min(...letterCounts));
