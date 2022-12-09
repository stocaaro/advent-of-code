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
const tailPoint: Point = { x: 0, y: 0 };

const movePoint = (point: Point, x: number, y: number) => {
    point.x += x;
    point.y += y;
}

const tailUpdate = () => {
    // If tail is touching head, don't move
    const xDist = headPoint.x - tailPoint.x;
    const yDist = headPoint.y - tailPoint.y;
    if (Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1) {
        return
    }
    if (xDist != 0 && yDist != 0) {
        movePoint(tailPoint, xDist > 0 ? 1 : -1, yDist > 0 ? 1 : -1);
    } else if (headPoint.x !== tailPoint.x) {
        movePoint(tailPoint, xDist > 0 ? 1 : -1, 0);
    } else if (headPoint.y !== tailPoint.y) {
        movePoint(tailPoint, 0, yDist > 0 ? 1 : -1);
    }
}



const tailStack: Point[] = [];
tailStack.push({ ...tailPoint });
const commands: [string, number][] = lines.map((l) => {
    const [dir, count] = l.split(' ');
    return [dir, parseInt(count)]
});

commands.forEach((command) => {
    const moveInfo = stepMap[command[0]];
    for (let i = 0; i < command[1]; i += 1) {
        movePoint(headPoint, moveInfo.x, moveInfo.y);
        tailUpdate();
        tailStack.push({ ...tailPoint });
    }
})

const uniqueTailLocations = new Set(tailStack.map((p) => p.x + "," + p.y))

console.log(uniqueTailLocations.size)