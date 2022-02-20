import { isValidColor, toHexColor } from './utils';

const isColorInPalette = (color: string, palette: string[]): boolean => {
  if (!isValidColor(color)) {
    throw new Error(`The given color "${color}" is not valid!`);
  }
  return palette.some(
    (paletteColor) =>
      paletteColor.toUpperCase() === toHexColor(color).toUpperCase()
  );
};

export { isColorInPalette };
