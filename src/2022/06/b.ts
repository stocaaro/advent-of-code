import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const input = lines.join('');
for (let i = 0; i <= input.length; i++) {
    const token = input.substring(i, i + 14);
    if (new Set(token.split('')).size === 14) {
        console.log(i + 14);
        break;
    }
}

