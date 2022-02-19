import { isValidColor, toHexColor } from '../utils';
import { materialColors } from './colors';

const isMaterialColor = (color: string): boolean => {
  if (!isValidColor(color)) {
    throw new Error(`The given color "${color}" is not valid!`);
  }
  return materialColors.some(
    (materialColor) =>
      materialColor.hex.toUpperCase() === toHexColor(color).toUpperCase()
  );
};

export { isMaterialColor };
