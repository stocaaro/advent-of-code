import { forFileLinesOf } from '../helpers/fileAccess';

const lines: number[][] =
  forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
  }).map(
    (l) =>
      l
        .match(/\d+/g)
        ?.join()
        .split('')
        .map((c) => Number(c) as number)
        .filter((c) => !isNaN(c)) ?? []
  ) ?? [];
const res = lines.map((l) => l[0] * 10 + l[l.length - 1]).reduce((n, v) => n + v, 0);

console.log(res);
