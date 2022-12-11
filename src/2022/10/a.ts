import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const commands: [string, number | undefined][] = lines.map((l) => {
    const [cmd, v] = l.split(' ');
    return [cmd, (v ? parseInt(v) : undefined)]
})

function getCommand (): [string | undefined, number, number | undefined] {
    const [command, value] = commands.shift() || [];
    let duration: number;
    if (command === 'noop') {
        duration = 1;
    } else {
        duration = 2;
    }
    return [command, duration, value]
}

let [nextCommand, duration, value] = getCommand();

let xRegister = 1;

const tickValues: number[] = []

while (nextCommand) {
    duration -= 1
    if (duration === 0) {
        if (value) {
            xRegister += value;
        }
        [nextCommand, duration, value] = getCommand();
    }
    tickValues.push(xRegister)
}

const ticks = [20, 60, 100, 140, 180, 220];
console.log(ticks.map((n) => tickValues[n - 2] * n).reduce((r, v) => r + v, 0))