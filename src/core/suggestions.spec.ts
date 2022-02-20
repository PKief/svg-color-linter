import { getSuggestions } from './suggestions';

jest.mock('./colors', () => ({
  get materialColors() {
    return [
      { category: 'red', hue: '50', hex: '#FFEBEE' },
      { category: 'red', hue: '100', hex: '#FFCDD2' },
      { category: 'red', hue: '200', hex: '#EF9A9A' },
      { category: 'red', hue: '300', hex: '#E57373' },
      { category: 'red', hue: '400', hex: '#EF5350' },
      { category: 'red', hue: '500', hex: '#F44336' },
      { category: 'red', hue: '600', hex: '#E53935' },
      { category: 'red', hue: '700', hex: '#D32F2F' },
      { category: 'red', hue: '800', hex: '#C62828' },
      { category: 'red', hue: '900', hex: '#B71C1C' },
      { category: 'red', hue: 'A100', hex: '#FF8A80' },
      { category: 'red', hue: 'A200', hex: '#FF5252' },
      { category: 'red', hue: 'A400', hex: '#FF1744' },
      { category: 'red', hue: 'A700', hex: '#D50000' },
    ];
  },
}));

describe('Get color suggestions', () => {
  beforeEach(() => {
    jest.mock('./utils', () => ({
      isValidColor: jest.fn(() => true),
      toHexColor: jest.fn((color: string) => color),
    }));
  });

  it('should give color suggestions for a given color', () => {
    const color = '#FFEBEF';
    const result = getSuggestions(color);
    expect(result).toHaveLength(5);
  });

  it('should throw an error if the color input value is invalid', () => {
    const color = '#123123123';
    expect(() => getSuggestions(color)).toThrow();
  });
});
