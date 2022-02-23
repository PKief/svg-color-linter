export interface Results {
  invalidColorResults: InvalidColorResult[];
  base64Results: Base64Result[];
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

export interface ColorSuggestion {
  hex: string;
  distance: number;
}
