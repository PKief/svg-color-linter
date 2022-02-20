export interface Result {
  file: string;
  invalidColor: string;
  suggestions: ColorSuggestion[];
}

export interface ColorSuggestion {
  hex: string;
  distance: number;
}
