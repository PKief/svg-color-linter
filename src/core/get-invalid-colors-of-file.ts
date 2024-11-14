import { minimatch } from 'minimatch';
import { ColorPalette, InvalidColorResult } from './models';
import { getSuggestions } from './suggestions';
import { isValidColor } from './utils';
import { validateColor } from './validate-color';

export const getInvalidColorsOfFile = (
  colors: string[],
  palette: ColorPalette,
  fileName: string
): InvalidColorResult[] => {
  if (palette.exclude) {
    if (palette.exclude.some((pattern) => minimatch(fileName, pattern))) {
      return [];
    }
  }
  return colors.reduce<InvalidColorResult[]>((result, color) => {
    if (!isValidColor(color)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: [],
      });
    } else if (!validateColor(color, palette.colors)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: getSuggestions(color, palette.colors),
      });
    }
    return result;
  }, []);
};
