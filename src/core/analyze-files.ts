import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { glob } from 'glob';
import isGlob from 'is-glob';
import * as yaml from 'js-yaml';
import { getColorsOfFile } from './get-colors-of-file';
import { getInvalidColorsOfFile } from './get-invalid-colors-of-file';
import { ColorPalette, Results } from './models';
import { containsBase64EncodedString, readSvgFile } from './utils';

export const analyzeFiles = async (
  filePatterns: string[],
  colorFilePath: string
): Promise<Results> => {
  const result: Results = {
    invalidColorResults: [],
    base64Results: [],
    invalidSvgResults: [],
  };

  for (const filePattern of filePatterns) {
    const globFiles = isGlob(filePattern)
      ? await glob(filePattern)
      : [filePattern];

    for (const fileName of globFiles) {
      const svgFileContent = await readSvgFile(fileName);
      const colors = getColorsOfFile(svgFileContent);

      const palette = yaml.load(
        await readFile(colorFilePath, 'utf8')
      ) as ColorPalette;

      const isSvg = (await import('is-svg')).default;

      const fileBasename = basename(fileName);

      if (containsBase64EncodedString(svgFileContent)) {
        result.base64Results.push({ file: fileBasename, base64Error: true });
      } else if (!isSvg(svgFileContent)) {
        result.invalidSvgResults.push({ file: fileBasename, invalidSvg: true });
      } else {
        result.invalidColorResults.push(
          ...getInvalidColorsOfFile(colors, palette, fileBasename)
        );
      }
    }
  }
  return result;
};
