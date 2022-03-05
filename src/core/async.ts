import { exec } from 'child_process';
import { mkdir, readFile, writeFile } from 'fs';
import glob from 'glob';
import { dirname } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);
const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const mkdirAsync = promisify(mkdir);
const globAsync = promisify(glob);

const outputFileAsync = async (path: string, contents: string) => {
  await mkdirAsync(dirname(path), { recursive: true });
  await writeFileAsync(path, contents);
};

export { execAsync, writeFileAsync, readFileAsync, outputFileAsync, globAsync };
