import { forFileLinesOf } from '../helpers/fileAccess';


const lines: string[] = forFileLinesOf<string>(__dirname, 'input1', (line: string) => {
    return line;
});

let index = 0;
let elfCalories: number[] = [];

lines.forEach((l) => {
    if (l == "") {
        index += 1;
    } else {
        elfCalories[index] ??= 0;
        elfCalories[index] += parseInt(l);
    }
})
console.log(Math.max(...elfCalories));