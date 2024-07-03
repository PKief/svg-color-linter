const printHelp = () => {
  return console.log(
    `
  Usage
    $ bunx svg-color-linter --colors colors.yml mySvgFile.svg anotherSvgFile.svg
  
  Options
    --colors, -c Path to the yml file containing the colors
    --version, -v  Show version
    --help, -h  Show help
    `
  );
};

export { printHelp };
