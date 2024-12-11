import { minimatch } from 'minimatch';
import { Config, InvalidColorResult } from './models';
import { getSuggestions } from './suggestions';
import { isValidColor } from './utils';
import { validateColor } from './validate-color';

export const getInvalidColorsOfFile = (
  colors: string[],
  config: Config,
  fileName: string
): InvalidColorResult[] => {
  if (config.exclude?.some((pattern) => minimatch(fileName, pattern))) {
    return [];
  }
  return colors.reduce<InvalidColorResult[]>((result, color) => {
    if (!isValidColor(color)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: [],
      });
    } else if (!validateColor(color, config.colors)) {
      result.push({
        file: fileName,
        invalidColor: color,
        suggestions: getSuggestions(color, config.colors),
      });
    }
    return result;
  }, []);
};
