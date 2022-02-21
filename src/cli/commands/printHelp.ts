const printHelp = () => {
  return console.log(
    `
  Usage
    $ npx svg-color-linter --colors colors.yml mySvgFile.svg anotherSvgFile.svg
  
  Options
    --colors, -c Path to the yml file containing the colors
    --version, -v  Show version
    --help, -h  Show help
    `
  );
};

export { printHelp };
