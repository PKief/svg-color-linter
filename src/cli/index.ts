import { printResult } from './commands/printResult';

const run = async () => {
  const fileNames = process.argv.slice(2);
  await printResult(fileNames);
};

try {
  run();
} catch (error) {
  console.error(error);
}
