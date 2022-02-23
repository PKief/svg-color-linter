import isSvg from 'is-svg';
import * as yaml from 'js-yaml';
import { getSuggestions, isColorInPalette } from '../../core';
import { readFileAsync } from '../../core/async';
import { ColorPalette, InvalidColorResult, Results } from '../../core/models';
import { isValidColor } from '../../core/utils';
import { red } from '../utils';

const printResults = async (fileNames: string[], colorFilePath: string) => {
  const { invalidColorResults, base64Results, invalidSvgResults } =
    await getResults(fileNames, colorFilePath);

  if (invalidSvgResults.length > 0) {
    invalidSvgResults.forEach((result) => {
      console.log(
        red(
          `The file "${result.file}" contains invalid SVG syntax and could not be recognized as valid SVG file`
        )
      );
    });
  }

  if (base64Results.length > 0) {
    base64Results.forEach((result) => {
      console.log(
        red(
          `The file "${result.file}" contains a base64 string and therefor it cannot be guaranteed that all colors are of the palette`
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
  } else {
  }
};

const getResults = async (
  fileNames: string[],
  colorFilePath: string
): Promise<Results> => {
  const result: Results = {
    invalidColorResults: [],
    base64Results: [],
    invalidSvgResults: [],
  };

  for (const fileName of fileNames) {
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

const getColorsInFile = (fileContents: string): string[] => {
  const colorPattern = new RegExp(/(fill|stop-color|stroke)="([^"]+)"/, 'gi');
  const colorPatternCss = new RegExp(/(stroke|fill):\s([^;]+)/, 'gi');
  const colors = [
    ...fileContents.matchAll(colorPattern),
    ...fileContents.matchAll(colorPatternCss),
  ];

  return [...colors]
    .map((c) => c[2])
    .filter((c) => c !== undefined)
    .filter((c): c is string => {
      if (c) {
        return isValidColor(c);
      }
      return false;
    });
};

const containsBase64EncodedString = (fileContents: string): boolean => {
  const base64Pattern = new RegExp('data:image/png;base64', 'gi');
  return base64Pattern.test(fileContents);
};

export { printResults };
