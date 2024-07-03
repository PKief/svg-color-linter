import { describe, expect, it } from 'bun:test';
import { getColorsOfFile } from './get-colors-of-file';

describe('getColorsOfFile', () => {
  it('should return an empty array for an empty string', () => {
    expect(getColorsOfFile('')).toEqual([]);
  });

  it('should extract colors from fill, stop-color, and stroke attributes', () => {
    const svgContent = `<svg>
      <circle fill="#ff0000" />
      <rect stroke="#00ff00" />
      <path stop-color="#0000ff" />
    </svg>`;
    expect(getColorsOfFile(svgContent)).toEqual([
      '#ff0000',
      '#00ff00',
      '#0000ff',
    ]);
  });

  it('should extract colors from CSS styles', () => {
    const svgContent = `<svg>
      <style>
        .cls-1 { fill: #123456; }
        .cls-2 { stroke: #654321; }
      </style>
    </svg>`;
    expect(getColorsOfFile(svgContent)).toEqual(['#123456', '#654321']);
  });

  it('should ignore url references', () => {
    const svgContent = `<svg>
      <circle fill="url(#gradient)" />
    </svg>`;
    expect(getColorsOfFile(svgContent)).toEqual([]);
  });

  it('should ignore the color "none"', () => {
    const svgContent = `<svg>
      <rect fill="none" />
    </svg>`;
    expect(getColorsOfFile(svgContent)).toEqual([]);
  });

  it('should return unique colors', () => {
    const svgContent = `<svg>
      <circle fill="#ff0000" />
      <rect fill="#ff0000" />
    </svg>`;
    expect(getColorsOfFile(svgContent)).toEqual(['#ff0000']);
  });

  it('should handle mixed cases of color definitions', () => {
    const svgContent = `<svg>
      <circle fill="#ff0000" />
      <rect style="fill: #00ff00;" />
      <path stroke="none" />
      <linearGradient id="gradient">
        <stop stop-color="#0000ff" />
      </linearGradient>
      <rect fill="url(#gradient)" />
    </svg>`;
    expect(getColorsOfFile(svgContent)).toEqual([
      '#ff0000',
      '#0000ff',
      '#00ff00',
    ]);
  });
});
