import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const input = lines.join('');
for (let i = 0; i <= input.length; i++) {
    const token = input.substring(i, i + 4);
    if (new Set(token.split('')).size === 4) {
        console.log(i + 4);
        break;
    }
}

