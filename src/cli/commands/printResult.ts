import { validate } from '../..';

const printResult = async (files: string[]) => {
  const output = await validate(files[0]);
  console.log(output);
};

export { printResult };
