import { forFileLinesOf } from '../helpers/fileAccess';

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  pathTo(anotherPoint: Point): Point[] {
    const res = [];
    if (this.x == anotherPoint.x) {
      const from = Math.min(this.y, anotherPoint.y);
      const to = Math.max(this.y, anotherPoint.y);
      for (let i = from; i <= to; i++) {
        res.push(new Point(this.x, i));
      }
      return res;
    } else if (this.y == anotherPoint.y) {
      const from = Math.min(this.x, anotherPoint.x);
      const to = Math.max(this.x, anotherPoint.x);
      for (let i = from; i <= to; i++) {
        res.push(new Point(i, this.y));
      }
      return res;
    } else {
      const from = Math.min(this.y, anotherPoint.y);
      const to = Math.max(this.y, anotherPoint.y);
      if ((this.x - anotherPoint.x) * (this.y - anotherPoint.y) > 0) {
        const xMin = Math.min(this.x, anotherPoint.x);
        for (let i = from; i <= to; i++) {
          res.push(new Point(xMin + i - from, i));
        }
      } else {
        const xMax = Math.max(this.x, anotherPoint.x);
        for (let i = from; i <= to; i++) {
          res.push(new Point(xMax - (i - from), i));
        }
      }

      return res;
    }
    return [];
  }
}

type OptionalNumber = number | undefined;

class Grid {
  regions: OptionalNumber[][];

  constructor() {
    this.regions = [];
  }

  addLine(line: string) {
    const matches = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);
    if (matches?.length == 5) {
      const p1 = new Point(Number(matches[1]), Number(matches[2]));
      const p2 = new Point(Number(matches[3]), Number(matches[4]));
      const path = p1.pathTo(p2);
      for (let i = 0; i < path.length; i++) {
        const pathPoint = path[i];
        this.regions[pathPoint.y] ||= [];
        this.regions[pathPoint.y][pathPoint.x] ||= 0;
        this.regions[pathPoint.y][pathPoint.x] =
          Number(this.regions[pathPoint.y][pathPoint.x]) + 1;
      }
    } else {
      throw Error(`Undexpected matches count for ${line}`);
    }
  }

  pointsGreaterThanOrEqualTo(value: number) {
    return this.regions
      .flat()
      .filter((x) => x)
      .map((val) => Number(val) >= value)
      .filter((x) => x).length;
  }
}
const grid = new Grid();
forFileLinesOf<void>(__dirname, 'input', (line: string) => {
  grid.addLine(line);
});

console.log(
  `There are ${grid.pointsGreaterThanOrEqualTo(2)} points two or greater`
);
