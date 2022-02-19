import { isMaterialColor } from '../..';

const printResult = async (files: string[]) => {
  const output = await isMaterialColor(files[0]);
  console.log(output);
};

export { printResult };
