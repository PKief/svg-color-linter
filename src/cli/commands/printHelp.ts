const printHelp = () => {
  return console.log(
    `
  Usage
    $ npx material-color-linter mySvgFile.svg anotherSvgFile.svg
  
  Options
    --version, -v  Show version
    --help, -h  Show help
    `
  );
};

export { printHelp };
