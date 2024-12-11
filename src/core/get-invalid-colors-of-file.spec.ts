import { afterEach, describe, expect, it, jest } from 'bun:test';
import { getInvalidColorsOfFile } from './get-invalid-colors-of-file';
import { Config, InvalidColorResult } from './models';

describe('getInvalidColorsOfFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockConfig: Config = {
    colors: ['#ff0000', '#00ff00', '#0000ff'], // Example palette
  };

  it('should return an empty array if all colors are valid and in the palette', () => {
    const colors = ['#ff0000', '#00ff00'];
    const fileName = 'test.svg';
    expect(getInvalidColorsOfFile(colors, mockConfig, fileName)).toEqual([]);
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
    expect(getInvalidColorsOfFile(colors, mockConfig, fileName)).toEqual(
      expected
    );
  });

  it('should exclude specified files from analysis', () => {
    const colors = ['#f0f0f0'];
    const fileName = 'icon1.svg';
    const excludePatterns = ['*.svg'];
    const mockConfigWithExclude: Config = {
      ...mockConfig,
      exclude: excludePatterns,
    };
    expect(
      getInvalidColorsOfFile(colors, mockConfigWithExclude, fileName)
    ).toEqual([]);
  });
});
