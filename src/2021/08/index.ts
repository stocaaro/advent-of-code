import { forFileLinesOf } from '../helpers/fileAccess';

const numbersMap = [
  'abcefg', // 0 # 6
  'cf', // 1 # 2
  'acdeg', // 2 # 5
  'acdfg', // 3 # 5
  'bcdf', // 4 # 4
  'abdfg', // 5 # 5
  'abdefg', // 6 # 6
  'acf', // 7 # 3
  'abcdefg', // 8 # 7
  'abcdfg' // 9 # 6
];

const numbersMap2 = [
  'abcefg', // 0 # 6
  'abdfg' // 5 # 5
];

class Display {
  permutations: string[];
  output: string[];

  private numberMap?: string[];

  constructor(line: string) {
    const [perm_str, output_str] = line.split(' | ');
    this.permutations = perm_str.split(' ');
    this.output = output_str.split(' ');
  }

  getOutputNumbers(): number[] {
    return this.output.map((numStr) => this.numbersFor(numStr));
  }

  numbersFor(str: string) {
    const numMap = this.getNumberMap();

    const strChars = str.split('').sort();
    for (let i = 0; i < numMap.length; i++) {
      const testChars = numMap[i].split('').sort();
      if (strChars.join(',') == testChars.join(',')) {
        return i;
      }
    }
    throw Error('WAT');
  }

  private getNumberMap(): string[] {
    if (this.numberMap) {
      return this.numberMap;
    } else {
      const newMap: string[] = [];
      this.permutations.forEach((numStr) => {
        if (numStr.length == 2) {
          newMap[1] = numStr;
        } else if (numStr.length == 4) {
          newMap[4] = numStr;
        } else if (numStr.length == 3) {
          newMap[7] = numStr;
        } else if (numStr.length == 7) {
          newMap[8] = numStr;
        }
      });

      this.permutations.forEach((numStr) => {
        const oneChars = newMap[1].split('');
        const fourChars = newMap[4].split('');
        const curChars = numStr.split('');
        if (numStr.length == 5) {
          if (oneChars.every((c) => curChars.includes(c))) {
            newMap[3] = numStr;
          } else if (
            fourChars.filter((c) => curChars.includes(c)).length == 3
          ) {
            newMap[5] = numStr;
          } else {
            newMap[2] = numStr;
          }
        } else if (numStr.length == 6) {
          if (!oneChars.every((c) => curChars.includes(c))) {
            newMap[6] = numStr;
          } else if (fourChars.every((c) => curChars.includes(c))) {
            newMap[9] = numStr;
          } else {
            newMap[0] = numStr;
          }
        }
      });
      this.numberMap = newMap;
      return newMap;
    }
  }
}

const displays = forFileLinesOf<Display>(__dirname, 'input', (line: string) => {
  return new Display(line);
});

const x = displays
  .map((d) => {
    return Number(d.getOutputNumbers().join(''));
  })
  .flat();
console.log(x.reduce((t, v) => t + v, 0));
