import { forFileLinesOf } from '../helpers/fileAccess';

const input: string = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
  return line;
}).join('');

function shiftN(input: string[], charCount: number): string[] {
  const shiftedReturn = input.splice(0, charCount);
  return shiftedReturn;
}
const versionNumbers: number[] = [];

function parseInput(input: string[]): string[] {
  const packetVersion = parseInt(shiftN(input, 3).join(''), 2);
  const typeId = parseInt(shiftN(input, 3).join(''), 2);
  versionNumbers.push(packetVersion);
  if (typeId == 4) {
    // Return going wrong?
    return [processLiteral(input)];
  } else {
    const vals = processOperator(input);
    if (typeId == 0) {
      return [String(vals.map((v) => Number(v)).reduce((r, v) => r + v, 0))];
    } else if (typeId == 1) {
      return [String(vals.map((v) => Number(v)).reduce((r, v) => r * v, 1))];
    } else if (typeId == 2) {
      return [String(Math.min(...vals.map((v) => Number(v))))];
    } else if (typeId == 3) {
      return [String(Math.max(...vals.map((v) => Number(v))))];
    } else if (typeId == 5) {
      return Number(vals[0]) > Number(vals[1]) ? ['1'] : ['0'];
    } else if (typeId == 6) {
      return Number(vals[0]) < Number(vals[1]) ? ['1'] : ['0'];
    } else if (typeId == 7) {
      return Number(vals[0]) == Number(vals[1]) ? ['1'] : ['0'];
    } else {
      throw new Error('WAT');
    }
  }
}

function processLiteral(input: string[]): string {
  let prefix = '1';
  let binaryResult = '';
  while (prefix != '0') {
    const [newPrefix, ...packet] = shiftN(input, 5);
    prefix = newPrefix;
    binaryResult += packet.join('');
  }
  return String(parseInt(binaryResult, 2));
}

function processOperator(input: string[]): string[] {
  const modeBit = shiftN(input, 1).join('');
  if (modeBit == '0') {
    const totalLength = parseInt(shiftN(input, 15).join(''), 2);
    const subsInput = shiftN(input, totalLength);
    let ret: string[] = [];
    while (subsInput.length > 0) {
      if (Number(subsInput.join('')) != 0) {
        // If there are left over packet, process them
        const result = parseInput(subsInput);
        ret = ret.concat(...result);
      } else {
        // If we have left over 0's trim them off
        shiftN(subsInput, 4);
      }
    }
    return ret;
  } else {
    const numberOfSubPackets = parseInt(shiftN(input, 11).join(''), 2);
    let ret: string[] = [];
    for (let i = 0; i < numberOfSubPackets; i++) {
      const result = parseInput(input);
      ret = ret.concat(...result);
    }
    return ret;
  }
}

function parseHexToBinaryStringArray(input: string) {
  return input
    .split('')
    .map((v) => parseInt(v, 16).toString(2).padStart(4, '0'))
    .join('')
    .split('');
}

console.log(parseInput(parseHexToBinaryStringArray(input)));
console.log(versionNumbers.reduce((res, v) => res + v, 0));
