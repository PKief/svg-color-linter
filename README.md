<h1 align="center">
  <br>
    <img src="https://github.com/PKief/changelog-machine/raw/main/logo.png" alt="logo" width="200">
  <br><br>
  Material Color Linter
  <br>
  <br>
</h1>

<h4 align="center">Linting tool to check if SVG files use only colors of the Material Design Color palette.</h4>

## CLI Command

The tool can be executed with this command:

```
npx material-color-linter file1.svg file2.svg
```

It will generate a file called CHANGELOG.md in the root directory of the project.

## Programmatic use

The tool can be imported as module into existing JavaScript or TypeScript code. Therefor it is necessary to install it via npm or yarn:

NPM:

```
npm install --save-dev material-color-linter
```

Yarn:

```
yarn add --dev material-color-linter
```

The module can be imported like this:

```ts
import { isMaterialColor } from 'material-color-linter';

isMaterialColor('#FFFFFF');
```
