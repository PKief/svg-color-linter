import { valid } from 'chroma-js';

const isValidColor = (hexColor: string): boolean => {
  return valid(hexColor);
};

export { isValidColor };
