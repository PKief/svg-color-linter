const printVersion = () => {
  return console.log(
    `${process.env.npm_package_name} v${process.env.npm_package_version}`
  );
};

export { printVersion };
