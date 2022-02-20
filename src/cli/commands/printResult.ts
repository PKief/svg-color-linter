import * as yaml from 'js-yaml';
import { getSuggestions, isColorInPalette } from '../../core';
import { readFileAsync } from '../../core/async';
import { ColorPalette, Result } from '../../core/models';
import { green, red } from '../utils';

const printResult = async (fileNames: string[]) => {
  const invalidColors: Result[] = [];
  for (const fileName of fileNames) {
    let contents;
    try {
      contents = await readFileAsync(fileName, 'utf8');
    } catch (error) {
      throw new Error(
        `Could not read file "${fileName}". Make sure it exists on the file system.`
      );
    }

    const colors = getColorsInFile(contents);
    const palette = yaml.load(
      await readFileAsync('./colors.yml', 'utf8')
    ) as ColorPalette;
    colors.forEach((color) => {
      if (!isColorInPalette(color, palette.colors)) {
        invalidColors.push({
          file: fileName,
          invalidColor: color,
          suggestions: getSuggestions(color, palette.colors),
        });
      }
    });
  }

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

export { printResult };
