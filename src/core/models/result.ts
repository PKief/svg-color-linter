export interface Results {
  invalidColorResults: InvalidColorResult[];
  base64Results: Base64Result[];
  invalidSvgResults: InvalidSvgResult[];
}

export interface InvalidColorResult {
  file: string;
  invalidColor: string;
  suggestions: ColorSuggestion[];
}

export interface Base64Result {
  file: string;
  base64Error: boolean;
}

export interface InvalidSvgResult {
  file: string;
  invalidSvg: boolean;
}

export interface ColorSuggestion {
  hex: string;
  distance: number;
}
