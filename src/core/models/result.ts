export interface Result {
  match: boolean;
  colorNeighbors: ColorSuggestion[];
}

export interface ColorSuggestion {
  hex: string;
  distance: number;
}
