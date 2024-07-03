import { describe, expect, it } from 'bun:test';
import { validateColor } from './validate-color';

describe('Validate colors', () => {
  it('should validate if a given color is part of the color palette', () => {
    const color = '#FFEBEE';
    const result = validateColor(color, [color]);
    expect(result).toBe(true);
  });

  it('should validate if a given color is part of the color palette by being case insensitive', () => {
    const color = '#ffebee';
    const result = validateColor(color, ['#FFEBEE']);
    expect(result).toBe(true);
  });

  it('should detect if a given color is not part of the color palette', () => {
    const color = '#FFEBEF';
    const result = validateColor(color, []);
    expect(result).toBe(false);
  });

  it('should throw an error if the color input value is invalid', () => {
    const color = '#123123123';
    expect(() => validateColor(color, [])).toThrow();
  });
});
