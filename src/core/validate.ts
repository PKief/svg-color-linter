import chroma from 'chroma-js';
import { ColorSuggestion, Result } from '../models';
import { materialColors } from './colors';

const validate = async (hexColor: string): Promise<Result> => {
  const distances = materialColors
    .map((matColor) => ({
      distance: chroma.distance(matColor.hex, hexColor),
      color: matColor.hex,
    }))
    .sort((a, b) => a.distance - b.distance);

  const suggestedColors: ColorSuggestion[] = [];

  // pick five colors with the lowest distance to the input color
  distances.slice(0, 5).forEach((distance) => {
    const suggestedColor = distance.color;
    suggestedColors.push({
      hex: suggestedColor,
      distance: distance.distance,
    });
  });

  const colorIsMatch = hexColor === suggestedColors[0].hex;

  return {
    match: colorIsMatch,
    colorNeighbors: suggestedColors,
  };
};

export { validate };
