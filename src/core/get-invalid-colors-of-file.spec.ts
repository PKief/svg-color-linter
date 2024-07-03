import { afterEach, describe, expect, it, jest } from 'bun:test';
import { getInvalidColorsOfFile } from './get-invalid-colors-of-file';
import { ColorPalette, InvalidColorResult } from './models';

describe('getInvalidColorsOfFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPalette: ColorPalette = {
    colors: ['#ff0000', '#00ff00', '#0000ff'], // Example palette
  };

  it('should return an empty array if all colors are valid and in the palette', () => {
    const colors = ['#ff0000', '#00ff00'];
    const fileName = 'test.svg';
    expect(getInvalidColorsOfFile(colors, mockPalette, fileName)).toEqual([]);
  });

  it('should identify invalid colors not in the palette', () => {
    const colors = ['#ff0000', '#invalid'];
    const fileName = 'test.svg';
    const expected: InvalidColorResult[] = [
      {
        file: fileName,
        invalidColor: '#invalid',
        suggestions: [], // Assuming getSuggestions returns an empty array for this test
      },
    ];
    expect(getInvalidColorsOfFile(colors, mockPalette, fileName)).toEqual(
      expected
    );
  });
});
