import * as fs from 'fs';
import * as path from 'path';

class Instruction {
  direction: string;
  amount: number;
  constructor(direction: string, amount: number) {
    this.direction = direction;
    this.amount = amount;
  }
}

fs.readFile(path.join(__dirname, 'input1'), 'utf8', (error, data) => {
  const values = data.split(/\r?\n/).map((val) => {
    const [direction, amount] = val.split(' ');
    return new Instruction(direction, Number(amount));
  });
  let position = 0;
  let depth = 0;
  values.forEach((instruction) => {
    if (instruction.direction == 'up') {
      depth -= instruction.amount;
    } else if (instruction.direction == 'down') {
      depth += instruction.amount;
    } else if (instruction.direction == 'forward') {
      position += instruction.amount;
    } else {
      throw new Error(
        `Expected up/down/forward and received ${instruction.direction} instead`
      );
    }
  });
  console.log(position * depth);

  position = 0;
  depth = 0;
  let aim = 0;
  values.forEach((instruction) => {
    if (instruction.direction == 'up') {
      aim -= instruction.amount;
    } else if (instruction.direction == 'down') {
      aim += instruction.amount;
    } else if (instruction.direction == 'forward') {
      position += instruction.amount;
      depth += aim * instruction.amount;
    } else {
      throw new Error(
        `Expected up/down/forward and received ${instruction.direction} instead`
      );
    }
  });
  console.log(position * depth);
});
