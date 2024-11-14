import minimist from 'minimist';

const flags: minimist.Opts | undefined = {
  string: 'colors',
  boolean: ['version', 'help'],
  alias: { v: 'version', h: 'help' },
  unknown: (a) => true,
  default: { lang: 'en' },
  '--': true,
  stopEarly: true,
};

export { flags };
