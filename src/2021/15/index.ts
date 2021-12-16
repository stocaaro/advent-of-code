import { forFileLinesOf } from '../helpers/fileAccess';

const maze: number[][] = forFileLinesOf<number[]>(__dirname, 'input', (line: string) => {
  return line.split('').map((v) => Number(v));
});
const superMaze: number[][] = [];
for (let height = 0; height < 5; height++) {
  for (let width = 0; width < 5; width++) {
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        superMaze[row + height * maze.length] ||= [];
        superMaze[row + height * maze.length][col + width * maze[0].length] =
          ((maze[row][col] + (height + width) - 1) % 9) + 1;
      }
    }
  }
}

maze[0][0] = 0;
superMaze[0][0] = 0;

type MazeLoction = {
  score: number;
  x: number;
  y: number;
};

function lowestValuePath(maze: number[][]): number {
  const visited: boolean[][] = [];
  const mazeDistances: number[][] = [];

  const reachableQueue: MazeLoction[] = [];
  reachableQueue.push({ score: 0, x: 0, y: 0 });
  while (reachableQueue.length > 0) {
    // Pick the next entry
    const { score, x, y } = reachableQueue.shift()!;

    // Skip if its been covered
    if ((visited[y] || [])[x] != undefined) {
      continue;
    }
    // Set score (minimum of measured neighbors scored plus current value)
    const newScore = score + maze[y][x];
    mazeDistances[y] ||= [];
    mazeDistances[y][x] = newScore;
    visited[y] ||= [];
    visited[y][x] = true;

    // Mark neighbors as reachable and re-sort reachable
    const neighborLocations = [
      { score: newScore, x: x + 1, y: y },
      { score: newScore, x: x - 1, y: y },
      { score: newScore, x: x, y: y + 1 },
      { score: newScore, x: x, y: y - 1 }
    ];

    neighborLocations.forEach((loc) => {
      if ((maze[loc.y] || [])[loc.x] != undefined && !(visited[loc.y] || [])[loc.x]) {
        reachableQueue.push(loc);
      }
    });
    reachableQueue.sort((a, b) => a.score - b.score);
  }
  return mazeDistances[mazeDistances.length - 1][mazeDistances[0].length - 1];
}
console.log(lowestValuePath(maze));
console.log(lowestValuePath(superMaze));
