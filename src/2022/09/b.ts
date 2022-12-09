import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const stepMap: { [k: string]: Point } = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
}

type Point = { x: number, y: number };
const headPoint: Point = { x: 0, y: 0 };

const POINT_COUNT = 9;
const trailingPoints: Point[] = [];

for (let i = 0; i < POINT_COUNT; i += 1) {
    trailingPoints.push({ x: 0, y: 0 })
}

const movePoint = (point: Point, x: number, y: number) => {
    point.x += x;
    point.y += y;
}

const tailUpdate = (hp: Point, tp: Point) => {
    const xDist = hp.x - tp.x;
    const yDist = hp.y - tp.y;
    // If tail is touching head, don't move
    if (Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1) {
        return
    }
    if (xDist != 0 && yDist != 0) {
        movePoint(tp, xDist > 0 ? 1 : -1, yDist > 0 ? 1 : -1);
    } else if (hp.x !== tp.x) {
        movePoint(tp, xDist > 0 ? 1 : -1, 0);
    } else if (hp.y !== tp.y) {
        movePoint(tp, 0, yDist > 0 ? 1 : -1);
    }
}



const tailStack: Point[] = [];
tailStack.push({ ...headPoint });
const commands: [string, number][] = lines.map((l) => {
    const [dir, count] = l.split(' ');
    return [dir, parseInt(count)]
});

commands.forEach((command) => {
    const moveInfo = stepMap[command[0]];
    for (let i = 0; i < command[1]; i += 1) {
        movePoint(headPoint, moveInfo.x, moveInfo.y);
        let cur = headPoint;
        trailingPoints.forEach((t) => {
            tailUpdate(cur, t);
            cur = t;
        });

        tailStack.push({ ...cur });
    }
})

const uniqueTailLocations = new Set(tailStack.map((p) => p.x + "," + p.y))

console.log(uniqueTailLocations.size)