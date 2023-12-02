import { forFileLinesOf } from '../helpers/fileAccess';

const lines: number[][] =
  forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
  }).map((l) => {
    const pl = l
      .replace(/eightwo/g, '82')
      .replace(/twone/g, '21')
      .replace(/oneight/g, '18')
      .replace(/one/g, '1')
      .replace(/two/g, '2')
      .replace(/three/g, '3')
      .replace(/four/g, '4')
      .replace(/five/g, '5')
      .replace(/six/g, '6')
      .replace(/seven/g, '7')
      .replace(/eight/g, '8')
      .replace(/nine/g, '9');
    return (
      pl
        .match(/\d+/g)
        ?.join()
        .split('')
        .map((c) => Number(c) as number)
        .filter((c) => !isNaN(c)) ?? []
    );
  }) ?? [];
const res = lines.map((l) => l[0] * 10 + l[l.length - 1]).reduce((n, v) => n + v, 0);

console.log(res);
