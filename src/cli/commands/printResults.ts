import { analyzeFiles } from '../analyze-files';

const printResults = async (filePatterns: string[], colorFilePath: string) => {
  const { invalidColorResults, base64Results, invalidSvgResults } =
    await analyzeFiles(filePatterns, colorFilePath);

  if (invalidSvgResults.length > 0) {
    for (const result of invalidSvgResults) {
      console.log(`[${result.file}] Invalid SVG syntax`);
    }
  }

  if (base64Results.length > 0) {
    for (const result of base64Results) {
      console.log(
        `[${result.file}] Usage of base64 string, no guarantee that all colors are of the palette`
      );
    }
  }

  if (invalidColorResults.length > 0) {
    for (const result of invalidColorResults) {
      const suggestionsText =
        result.suggestions.length > 0
          ? `Suggestions: [${result.suggestions.map((s) => s.hex).join(', ')}]`
          : '';

      const errorMessage = `[${result.file}] Invalid color "${result.invalidColor}". ${suggestionsText}`;
      console.log(errorMessage);
    }
  }

  if (
    invalidColorResults.length +
      invalidSvgResults.length +
      base64Results.length ===
    0
  ) {
    console.log('✅ All colors in all files are valid!');
    process.exit(0);
  } else {
    process.exit(1);
  }
};

export { printResults };
