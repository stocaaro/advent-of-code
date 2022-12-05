import { forFileLinesOf } from '../helpers/fileAccess';

const lines: string[] = forFileLinesOf<string>(__dirname, 'input', (line: string) => {
    return line;
});

const assignmentPairs = lines.map((l) => l.split(',').map((e) => e.split('-').map((c) => parseInt(c))))

const fullyContainsPairs = assignmentPairs.filter(([a1, a2]) => {
    const a1ContainsA2Start = (a1[0] <= a2[0] && a1[1] >= a2[0])
    const a2ContainsA1Start = (a1[0] >= a2[0] && a1[0] <= a2[1])
    return a1ContainsA2Start || a2ContainsA1Start
})

console.log("Not started", fullyContainsPairs.length)