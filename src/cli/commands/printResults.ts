import isGlob from 'is-glob';
import isSvg from 'is-svg';
import * as yaml from 'js-yaml';
import { getSuggestions, isColorInPalette } from '../../core';
import { globAsync, readFileAsync } from '../../core/async';
import { ColorPalette, InvalidColorResult, Results } from '../../core/models';
import { isValidColor } from '../../core/utils';
import { green, red } from '../utils';

const printResults = async (filePatterns: string[], colorFilePath: string) => {
  const { invalidColorResults, base64Results, invalidSvgResults } =
    await getResults(filePatterns, colorFilePath);

  if (invalidSvgResults.length > 0) {
    invalidSvgResults.forEach((result) => {
      console.log(red(`⚠️  [${result.file}] Invalid SVG syntax`));
    });
  }

  if (base64Results.length > 0) {
    base64Results.forEach((result) => {
      console.log(
        red(
          `⚠️  [${result.file}] Usage of base64 string, no guarantee that all colors are of the palette`
        )
      );
    });
  }

  if (invalidColorResults.length > 0) {
    invalidColorResults.forEach((result) => {
      console.log(
        red(
          `⚠️  [${result.file}] Invalid color "${
            result.invalidColor
          }". Suggestions: [${result.suggestions
            .map((s) => s.hex)
            .join(', ')}]\n`
        )
      );
    });
  }

  if (
    invalidColorResults.length +
      invalidSvgResults.length +
      base64Results.length ===
    0
  ) {
    console.log(green('✅ All colors in all files are valid!'));
    process.exit(0);
  } else {
    process.exit(1);
  }
};

const getResults = async (
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
      ? await globAsync(filePattern)
      : [filePattern];

    for (const fileName of globFiles) {
      const svgFileContent = await readSvgFile(fileName);
      const colors = getColorsInFile(svgFileContent);

      const palette = yaml.load(
        await readFileAsync(colorFilePath, 'utf8')
      ) as ColorPalette;

      if (containsBase64EncodedString(svgFileContent)) {
        result.base64Results.push({ file: fileName, base64Error: true });
      } else if (!isSvg(svgFileContent)) {
        result.invalidSvgResults.push({ file: fileName, invalidSvg: true });
      } else {
        result.invalidColorResults.push(
          ...getInvalidColorsOfFile(colors, palette, fileName)
        );
      }
    }
  }
  return result;
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

const getInvalidColorsOfFile = (
  colors: string[],
  palette: ColorPalette,
  fileName: string
): InvalidColorResult[] => {
  return colors.reduce<InvalidColorResult[]>((result, color) => {
    if (!isValidColor(color)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: [],
      });
    } else if (!isColorInPalette(color, palette.colors)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: getSuggestions(color, palette.colors),
      });
    }
    return result;
  }, []);
};

const getColorsInFile = (fileContents: string): string[] => {
  const colorPattern = new RegExp(/(fill|stop-color|stroke)="([^"]+)"/, 'gi');
  const colorPatternCss = new RegExp(/(stroke|fill):\s?([^;"]+)/, 'gi');
  const colors = [
    ...fileContents.matchAll(colorPattern),
    ...fileContents.matchAll(colorPatternCss),
  ];

  return [...colors]
    .map((c) => c[2])
    .filter((c) => c !== undefined)
    .filter((c) => c !== 'none');
};

const containsBase64EncodedString = (fileContents: string): boolean => {
  const base64Pattern = new RegExp('data:image/png;base64', 'gi');
  return base64Pattern.test(fileContents);
};

export { printResults };
