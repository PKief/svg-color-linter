import { isMaterialColor } from './validate';

jest.mock('./colors', () => ({
  get materialColors() {
    return [{ category: 'red', hue: '50', hex: '#FFEBEE' }];
  },
}));

describe('Validate colors', () => {
  beforeEach(() => {
    jest.mock('../utils', () => ({
      isValidColor: jest.fn(() => true),
      toHexColor: jest.fn((color: string) => color),
    }));
  });

  it('should validate if a given color is part of the Material Color palette', () => {
    const color = '#FFEBEE';
    const result = isMaterialColor(color);
    expect(result).toBe(true);
  });

  it('should validate if a given color is part of the Material Color palette by being case insensitive', () => {
    const color = '#ffebee';
    const result = isMaterialColor(color);
    expect(result).toBe(true);
  });

  it('should detect if a given color is not part of the Material Color palette', () => {
    const color = '#FFEBEF';
    const result = isMaterialColor(color);
    expect(result).toBe(false);
  });

  it('should throw an error if the color input value is invalid', () => {
    jest.mock('../utils', () => ({
      isValidColor: jest.fn(() => false),
    }));
    const color = '#123123123';
    expect(() => isMaterialColor(color)).toThrow();
  });
});
