import { forFileLinesOf } from '../helpers/fileAccess';

const [xStart, xEnd, yStart, yEnd] = forFileLinesOf<number[]>(
  __dirname,
  'input',
  (line: string) => {
    return line
      .match(/x=(.*\d+)..(.*\d+), y=(.*\d+)..(.*\d+)/)
      ?.slice(1)
      .map((v) => Number(v))!;
  }
)[0];

function withinTarget(x: number, y: number): boolean {
  return xStart <= x && x <= xEnd && yStart <= y && y <= yEnd;
}

function beyondTarget(x: number, y: number): boolean {
  return xEnd < x || yStart > y;
}

type PhysicalState = {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
};

function step(startState: PhysicalState): PhysicalState {
  return {
    posX: startState.posX + startState.velX,
    posY: startState.posY + startState.velY,
    velX: Math.max(0, startState.velX - 1),
    velY: startState.velY - 1
  };
}

function testVelocity(velX: number, velY: number) {
  let state = {
    posX: 0,
    posY: 0,
    velX: velX,
    velY: velY
  };
  let maxHeight = 0;
  while (!beyondTarget(state.posX, state.posY)) {
    state = step(state);
    maxHeight = Math.max(maxHeight, state.posY);
    if (withinTarget(state.posX, state.posY)) {
      return maxHeight;
    }
  }
  return null;
}

const heights = [];
const initialVelocity = [];
for (let velX = 1; velX <= xEnd; velX++) {
  for (let velY = yStart; velY <= (xEnd / 2) * (xEnd / 2); velY++) {
    const result = testVelocity(velX, velY);
    if (result != null) {
      heights.push(result);
      initialVelocity.push([velX, velY]);
    }
  }
}

console.log(Math.max(...heights));

console.log(initialVelocity.length);
