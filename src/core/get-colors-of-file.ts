export const getColorsOfFile = (svgFileContents: string): string[] => {
  const colorPattern = new RegExp(/(fill|stop-color|stroke)="([^"]+)"/, 'gi');
  const colorPatternCss = new RegExp(/(stroke|fill):\s?([^;"]+)/, 'gi');
  const urlReference = new RegExp(/url\(#\w+\)/);

  const colors = [
    ...svgFileContents.matchAll(colorPattern),
    ...svgFileContents.matchAll(colorPatternCss),
  ];

  const result = [...colors]
    .map((c) => c[2])
    .filter((c) => c !== undefined)
    .filter((c) => !c.match(urlReference))
    .filter((c) => c !== 'none');

  // remove duplicates before returning
  return [...new Set(result)];
};
