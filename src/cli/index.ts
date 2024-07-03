import minimist from 'minimist';
import { printHelp } from './commands/printHelp';
import { printResults } from './commands/printResults';
import { printVersion } from './commands/printVersion';
import { flags } from './config/options';

const run = async () => {
  const args = minimist<{
    version: undefined;
    colors: string;
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
    console.log('List of colors must be provided.');
    printHelp();
    process.exit(1);
  }

  // If no file patterns are provided, print help
  if (args._.length === 0) {
    console.log('At least one file pattern must be provided.');
    printHelp();
    process.exit(1);
  }

  await printResults(args._, args.colors);
};

try {
  run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
