import { forFileLinesOf } from '../helpers/fileAccess';

type BoardNumber = number | undefined;

class Board {
  values: BoardNumber[][];
  constructor(boardInput: string[]) {
    this.values = boardInput.map((row) => {
      return (row.match(/.{3}/g) || []).map((val) => {
        return Number(val) || 0;
      });
    });
  }

  selectNumber(num: number) {
    this.values.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] == num) {
          row[i] = undefined;
        }
      }
    });
  }

  winCondition(): boolean {
    // Rows condition
    const columns: boolean[] = Array(5).fill(true);
    let success = false;
    this.values.forEach((row) => {
      if (row.filter((e) => e).length == 0) {
        success = true;
      }
      for (let j = 0; j < row.length; j++) {
        if (row[j]) {
          columns[j] = false;
        }
      }
    });
    if (columns.filter((v) => v).length > 0) {
      success = true;
    }
    return success;
  }

  sum(): number {
    const values = this.values.flat();
    let sum = 0;
    values.forEach((v) => {
      if (v) {
        sum += v;
      }
    });
    return sum;
  }
}

class Game {
  boards: Board[];
  inputNumbers?: number[];
  inputIndex = 0;

  private incompeteBoardLines: string[] = [];

  constructor() {
    this.boards = [];
  }

  addLine(line: string) {
    if (!this.inputNumbers) {
      this.inputNumbers = line.split(',').map((i) => Number(i));
    } else if (line == '') {
      if (this.incompeteBoardLines.length == 5) {
        this.boards.push(new Board(this.incompeteBoardLines));
      } else if (this.incompeteBoardLines.length > 0) {
        throw Error('There is data, but not a full board. What the heck?');
      }
      this.incompeteBoardLines = [];
    } else {
      this.incompeteBoardLines.push(line + ' ');
    }
  }

  currentNumber(): number {
    if (this.inputNumbers && this.inputNumbers[this.inputIndex] != undefined) {
      return this.inputNumbers[this.inputIndex];
    } else {
      throw Error('Whats going on?');
    }
  }

  playAnotherRound() {
    this.boards.forEach((board) => {
      board.selectNumber(this.currentNumber());
    });
    this.inputIndex += 1;
  }

  winners(): Board[] {
    return this.boards.filter((board) => {
      return board.winCondition();
    });
  }

  score(): number {
    if (this.inputNumbers) {
      const lastNumberCalled = this.inputNumbers[this.inputIndex - 1] || 0;
      const firstWinnersSum = this.winners()[0].sum();
      return firstWinnersSum * lastNumberCalled;
    } else {
      throw Error('Whats going on?');
    }
  }

  removeWinners() {
    this.boards = this.boards.filter((board) => {
      return !board.winCondition();
    });
  }
}

const gameData = new Game();
forFileLinesOf<void>(__dirname, 'input', (line: string) => {
  gameData.addLine(line);
});
gameData.addLine('');
while (gameData.winners().length == 0) {
  gameData.playAnotherRound();
}
console.log(gameData.score());
gameData.removeWinners();

while (gameData.boards.length != 1 || gameData.winners().length != 1) {
  gameData.removeWinners();
  gameData.playAnotherRound();
}
console.log(gameData.score());
