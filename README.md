<h1 align="center">
  <br>
    <img src="https://github.com/PKief/svg-color-linter/raw/main/logo.png" alt="logo" width="200">
  <br><br>
  SVG Color Linter
  <br>
  <br>
</h1>

<h4 align="center">Linting tool to check if SVG files only use colors of a given color palette.</h4>

## CLI Command

The tool can be executed with this command:

```
bunx svg-color-linter --colors colors.yml file1.svg file2.svg
```

It will fetch all the colors of a YAML file which must have the following structure:

```yaml
colors:
  - "#FFEBEE"
  - "#FFCDD2"
  - "#EF9A9A"
  - "#E57373"
  - "#EF5350"
  - "#F44336"
```

It also supports glob file patterns to check multiple files matching the pattern like this:

```
bunx svg-color-linter --colors colors.yml ./images/**/*.svg ./another-dir/*.svg test.svg
```

### Excluding Files

You can exclude specific files or patterns from the analysis by adding an `exclude` key in the `colors.yml` file. The `exclude` key should contain a list of file patterns to be ignored. For example:

```yaml
colors:
  - "#FFEBEE"
  - "#FFCDD2"
  - "#EF9A9A"
  - "#E57373"
  - "#EF5350"
  - "#F44336"

exclude:
  - "folder-vue*"
  - "grunt"
  - "jenkins"
  - "kotlin"
  - "travis"
```

## Programmatic use

The tool can be imported as module into existing JavaScript or TypeScript code. Therefor it is necessary to install it via package manager:

```
npm install svg-color-linter
```

The module can be imported like this:

```ts
import { isColorInPalette, getSuggestions } from 'svg-color-linter';

isColorInPalette('#FFFFFF', ['#EEEEEE', '#121212']);
// false

getSuggestions('#C0CA35', ['#EEEEEE', '#121212']);
// [
//   { hex: '#C0CA33', distance: 0.160467661071053 },
//   { hex: '#CDDC39', distance: 4.307076277707079 },
//   { hex: '#D4E157', distance: 5.606714639567858 },
//   { hex: '#AFB42B', distance: 5.713845679863578 },
//   { hex: '#DCE775', distance: 8.065940911169271 }
// ]
```
