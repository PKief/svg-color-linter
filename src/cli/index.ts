import minimist from 'minimist';
import { printHelp } from './commands/printHelp';
import { printResults } from './commands/printResults';
import { printVersion } from './commands/printVersion';
import { flags } from './config/options';

const run = async () => {
  const args = minimist<{
    version: undefined;
    config: string;
    help: undefined;
  }>(process.argv.slice(2), flags);

  if (args.version) {
    printVersion();
    return;
  }
  if (args.help) {
    printHelp();
    return;
  }

  if (!args.colors) {
    throw new Error('List of colors must be provided.');
  }

  await printResults(args._, args.colors);
};

try {
  run();
} catch (error) {
  console.error(error);
}
