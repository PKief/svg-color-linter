import minimist from 'minimist';

const flags: minimist.Opts | undefined = {
  string: 'config',
  boolean: ['version', 'help'],
  alias: { c: 'config', v: 'version', h: 'help' },
  unknown: () => true,
  default: { lang: 'en' },
  '--': true,
  stopEarly: true,
};

export { flags };
