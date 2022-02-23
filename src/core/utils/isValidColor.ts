import { valid } from 'chroma-js';

const isValidColor = (hexColor: string | undefined): boolean => {
  if (hexColor === undefined) {
    return false;
  }
  return valid(hexColor);
};

export { isValidColor };
