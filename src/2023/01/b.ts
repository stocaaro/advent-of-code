import { forFileLinesOf } from '../helpers/fileAccess';

const replacementPairs = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

function replaceAllNumberValues(line: string): string {
  let somethingToReplace = true;
  while (somethingToReplace) {
    const nextKey = findFirstString(Object.keys(replacementPairs), line);
    if (nextKey) {
      // @ts-ignore
      line = replaceFirstInstance(line, nextKey, replacementPairs[nextKey] ?? '');
    } else {
      somethingToReplace = false;
    }
  }
  return line;
}

function findFirstString(strings: string[], target: string): string | undefined {
  let firstIndex = Infinity;
  let firstString: string | undefined;

  for (let i = 0; i < strings.length; i++) {
    const index = target.indexOf(strings[i]);

    if (index !== -1 && index < firstIndex) {
      firstIndex = index;
      firstString = strings[i];
    }
  }

  return firstString;
}

function replaceFirstInstance(target: string, searchString: string, replacement: string): string {
  const index = target.indexOf(searchString);

  if (index !== -1) {
    return target.substring(0, index) + replacement + target.substring(index + searchString.length);
  }

  return target;
}

const lines: number[][] =
  forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
  }).map((l) => {
    const pl = replaceAllNumberValues(l);
    return (
      pl
        .match(/\d+/g)
        ?.join()
        .split('')
        .map((c) => Number(c) as number)
        .filter((c) => !isNaN(c)) ?? []
    );
  }) ?? [];
// lines.forEach((l) => console.log(l));
const res = lines.map((l) => l[0] * 10 + l[l.length - 1]).reduce((n, v) => n + v, 0);

console.log(res);
