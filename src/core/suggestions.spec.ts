import { getSuggestions } from './suggestions';

describe('Get color suggestions', () => {
  beforeEach(() => {
    jest.mock('./utils', () => ({
      isValidColor: jest.fn(() => true),
      toHexColor: jest.fn((color: string) => color),
    }));
  });

  it('should give color suggestions for a given color', () => {
    const color = '#FFEBEF';
    const result = getSuggestions(color, [
      '#FFEBEE',
      '#FFCDD2',
      '#EF9A9A',
      '#E57373',
      '#EF5350',
    ]);
    expect(result).toHaveLength(5);
  });

  it('should throw an error if the color input value is invalid', () => {
    const color = '#123123123';
    expect(() => getSuggestions(color, [])).toThrow();
  });
});
