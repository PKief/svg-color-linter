const printHelp = () => {
  return console.log(
    `
  Usage
    $ npx svg-color-linter mySvgFile.svg anotherSvgFile.svg
  
  Options
    --version, -v  Show version
    --help, -h  Show help
    `
  );
};

export { printHelp };
