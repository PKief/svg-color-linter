const printHelp = () => {
  return console.log(
    `
  Usage
    $ bunx svg-color-linter --config color-config.yml mySvgFile.svg anotherSvgFile.svg

  Options
    --config, -c Path to the yml file containing the colors
    --version, -v  Show version
    --help, -h  Show help
    `
  );
};

export { printHelp };
