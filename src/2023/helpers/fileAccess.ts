import * as fs from 'fs';
import * as path from 'path';

export function forFileLinesOf<T>(
  dirname: string,
  filename: string,
  action: (line: string) => T
): T[] {
  let ret: T[] = [];
  const data = fs.readFileSync(path.join(dirname, filename), 'utf8');
  ret = data.split(/\r?\n/).map((line: string) => {
    return action(line);
  });
  return ret;
}
