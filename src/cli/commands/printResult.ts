import * as yaml from 'js-yaml';
import { getSuggestions, isColorInPalette } from '../../core';
import { readFileAsync } from '../../core/async';
import { ColorPalette, Result } from '../../core/models';
import { green, red } from '../utils';

const printResult = async (fileNames: string[], colorFilePath: string) => {
  const invalidColors = await getInvalidColors(fileNames, colorFilePath);

  if (invalidColors.length === 0) {
    console.log(green('✅ All colors are valid colors of the palette.'));
  } else {
    invalidColors.forEach((color) => {
      console.log(
        red(
          `⚠️  The color "${color.invalidColor}" in file "${
            color.file
          }" is invalid.\n\nYou can use one of the following instead: [${color.suggestions
            .map((s) => s.hex)
            .join(', ')}]`
        )
      );
    });
  }
};

const getColorsInFile = (file: string): string[] => {
  const colorPattern = new RegExp(/fill="([^"]+)"/, 'g');
  const colors = file.matchAll(colorPattern);
  return [...colors].map((c) => c[1]);
};

const readSvgFile = async (fileName: string) => {
  try {
    return await readFileAsync(fileName, 'utf8');
  } catch (error) {
    throw new Error(
      `Could not read file "${fileName}". Make sure it exists on the file system.`
    );
  }
};

const getInvalidColors = async (
  fileNames: string[],
  colorFilePath: string
): Promise<Result[]> => {
  const invalidColors: Result[] = [];
  for (const fileName of fileNames) {
    const svgFileContent = await readSvgFile(fileName);
    const colors = getColorsInFile(svgFileContent);
    const palette = yaml.load(
      await readFileAsync(colorFilePath, 'utf8')
    ) as ColorPalette;

    invalidColors.push(...getInvalidColorsOfFile(colors, palette, fileName));
  }
  return invalidColors;
};

const getInvalidColorsOfFile = (
  colors: string[],
  palette: ColorPalette,
  fileName: string
): Result[] => {
  return colors.reduce<Result[]>((result, color) => {
    if (!isColorInPalette(color, palette.colors)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: getSuggestions(color, palette.colors),
      });
    }
    return result;
  }, []);
};

export { printResult };
