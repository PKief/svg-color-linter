import { readFile } from 'node:fs/promises';

export const readSvgFile = async (fileName: string) => {
  try {
    return await readFile(fileName, 'utf8');
  } catch (error) {
    throw new Error(
      `Could not read file "${fileName}". Make sure it exists on the file system.`
    );
  }
};
