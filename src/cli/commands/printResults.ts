import * as yaml from 'js-yaml';
import { getSuggestions, isColorInPalette } from '../../core';
import { readFileAsync } from '../../core/async';
import { ColorPalette, InvalidColorResult, Results } from '../../core/models';
import { red } from '../utils';

const printResults = async (fileNames: string[], colorFilePath: string) => {
  const { invalidColorResults, base64Results } = await getResults(
    fileNames,
    colorFilePath
  );

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
          `⚠️  The color "${result.invalidColor}" in file "${
            result.file
          }" is invalid.\n\nYou can use one of the following instead: [${result.suggestions
            .map((s) => s.hex)
            .join(', ')}]`
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
  };
  for (const fileName of fileNames) {
    const svgFileContent = await readSvgFile(fileName);
    const colors = getColorsInFile(svgFileContent);
    const palette = yaml.load(
      await readFileAsync(colorFilePath, 'utf8')
    ) as ColorPalette;

    if (containsBase64EncodedString(svgFileContent)) {
      result.base64Results.push({ file: fileName, base64Error: true });
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
  const colorPattern = new RegExp(/fill="([^"]+)"/, 'g');
  const colors = fileContents.matchAll(colorPattern);
  return [...colors].map((c) => c[1]);
};

const containsBase64EncodedString = (fileContents: string): boolean => {
  const base64Pattern = new RegExp('data:image/png;base64', 'gi');
  return base64Pattern.test(fileContents);
};

export { printResults };
