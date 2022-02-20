import { isColorInPalette } from './validate';

describe('Validate colors', () => {
  beforeEach(() => {
    jest.mock('./utils', () => ({
      isValidColor: jest.fn(() => true),
      toHexColor: jest.fn((color: string) => color),
    }));
  });

  it('should validate if a given color is part of the color palette', () => {
    const color = '#FFEBEE';
    const result = isColorInPalette(color, [color]);
    expect(result).toBe(true);
  });

  it('should validate if a given color is part of the color palette by being case insensitive', () => {
    const color = '#ffebee';
    const result = isColorInPalette(color, ['#FFEBEE']);
    expect(result).toBe(true);
  });

  it('should detect if a given color is not part of the color palette', () => {
    const color = '#FFEBEF';
    const result = isColorInPalette(color, []);
    expect(result).toBe(false);
  });

  it('should throw an error if the color input value is invalid', () => {
    jest.mock('./utils', () => ({
      isValidColor: jest.fn(() => false),
    }));
    const color = '#123123123';
    expect(() => isColorInPalette(color, [])).toThrow();
  });
});
