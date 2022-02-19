<h1 align="center">
  <br>
    <img src="https://github.com/PKief/changelog-machine/raw/main/logo.png" alt="logo" width="200">
  <br><br>
  Material Color Linter
  <br>
  <br>
</h1>

<h4 align="center">Linting tool to check if SVG files use only colors of the Material Design Color palette.</h4>

## Getting started

The tool can be executed with this command:

```
npx material-color-linter
```

It will generate a file called CHANGELOG.md in the root directory of the project.

## Configuration

The generation of the changelog can be configured via a config file.

```
npx changelog-machine --config changelog.config.json
```

### Command overview

| COMMAND     | ALIAS | DESCRIPTION                    |
| ----------- | ----- | ------------------------------ |
| `--config`  | `-c`  | Path to the configuration file |
| `--version` | `-v`  | Print version                  |
| `--help`    | `-h`  | Print command instructions     |

### Configuration file

The configuration file can be configured like this:

```json
{
  "title": "Changelog",
  "description": "Some description text",
  "repositoryUrl": "https://github.com/PKief/vscode-material-icon-theme",
  "blacklistPattern": "Release|^\\d+\\.\\d+\\.\\d+$",
  "filePath": "CHANGELOG.md"
}
```

More detailed description of the config:

| CONFIG             | DESCRIPTION                                     | DEFAULT                                                                                            |
| ------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `title`            | Title of the changelog                          | "Changelog"                                                                                        |
| `description`      | Description under the title                     | "All notable changes to this project will be documented in this file. Dates are displayed in UTC." |
| `filePath`         | Path of the output file                         | "CHANGELOG.md"                                                                                     |
| `repositoryUrl`    | Links to the repository for further information |                                                                                                    |
| `blacklistPattern` | Regex to remove commit messages                 |                                                                                                    |

## Example output

The following commit summary is printed into the CHANGELOG.md file and can look like this:

#### [v4.12.1](https://github.com/PKief/vscode-material-icon-theme/compare/v4.12.1...HEAD)

> February 5, 2022

- Update release commit message [`3167316`](https://github.com/PKief/vscode-material-icon-theme/commit/3167316)
- Update release workflow [`7f2520d`](https://github.com/PKief/vscode-material-icon-theme/commit/7f2520d)
- Adjust preview script for folder icons [`6a00111`](https://github.com/PKief/vscode-material-icon-theme/commit/6a00111)
- Fix compare link [`fa45abf`](https://github.com/PKief/vscode-material-icon-theme/commit/fa45abf)
- Filter out release commits [`e3468ca`](https://github.com/PKief/vscode-material-icon-theme/commit/e3468ca)

## Programmatic use

The tool can be imported as module into existing JavaScript or TypeScript code. Therefor it is necessary to install it via npm or yarn:

NPM:

```
npm install --save-dev changelog-machine
```

Yarn:

```
yarn add --dev changelog-machine
```

The module can be imported like this:

```ts
import { printMarkdown } from 'changelog-machine';

// usage with default config
printMarkdown();

// usage with customizations
printMarkdown({
  filePath: './changelog/CHANGES.md',
  description: 'List of changes',
  title: 'All releases',
  blacklistPattern: '^Release', // excludes all commits that start with "Release"
  repositoryUrl: 'https://github.com/PKief/vscode-material-icon-theme',
});
```
