import { Dir } from 'fs';
import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

type File = {
    type: 'FILE';
    name: string;
    size: number;
}

type Directory = {
    type: 'DIR';
    name: string;
    contents: (File | Directory)[];
}

const root: Directory = {
    type: 'DIR',
    name: '/',
    contents: []
}

let currentDirectoryStack: Directory[] = [];

lines.forEach((l) => {
    const cur = currentDirectoryStack[currentDirectoryStack.length - 1]

    if (l[0] === '$') {
        const [_p, cmd, input] = l.split(' ');
        if (cmd === 'cd') {
            if (input === '..') {
                currentDirectoryStack.pop();
            } else if (input === '/') {
                currentDirectoryStack = [root];
            } else {
                const dir = cur.contents.find((f) => f.name === input && f.type === 'DIR');
                if (dir && dir.type === 'DIR') {
                    currentDirectoryStack.push(
                        dir
                    )
                }
            }
        }
    } else {
        const fileInfo = l.split(' ');
        if (fileInfo[0] === 'dir') {
            cur.contents.push({
                type: 'DIR',
                name: fileInfo[1],
                contents: []
            })
        } else {
            cur.contents.push({
                type: 'FILE',
                name: fileInfo[1],
                size: parseInt(fileInfo[0])
            })
        }
    }
})

function getSize (cur: Directory) {
    let size = 0;
    cur.contents.forEach((f) => {
        if (f.type === 'FILE') {
            size += f.size;
        }
        if (f.type === 'DIR') {
            size += getSize(f);
        }
    })
    return size;
}

const DISK_SIZE = 70000000;
const TARGET_UNUSED_SPACE = 30000000;
const SIZE_LIMIT = TARGET_UNUSED_SPACE - (DISK_SIZE - getSize(root));

function sizeTraversal (cur: Directory): number[] {
    const size = getSize(cur);
    const sizes = cur.contents.filter((f) =>
        f.type === 'DIR'
    ).flatMap((d) => sizeTraversal(d as Directory))
    if (size >= SIZE_LIMIT) {
        return [size, ...sizes];
    } else {
        return sizes;
    }
}

console.log(Math.min(...sizeTraversal(root)));