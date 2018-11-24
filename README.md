# Atom Space ESLint Preset

`@atomspace/eslint` is a Neutrino preset that supports linting JavaScript projects with ESLint config used in Atom Space.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Build Status][build-status]][travis-url]

## Features

- Zero upfront configuration necessary to start linting your project
- Modern Babel knowledge supporting ES modules, JSX (when used with React preset), Web and Node.js apps
- Highly visible during development, fails compilation when building for production
- Promises linting
- Module systems linting (ES, CommonJS, AMD)
- Regex shorthand to improve readability
- ESLint comments linting
- JSDoc syntax linting
- Easily extensible to customize your project as needed

## Requirements

- Node.js v6 LTS, v8, v9
- Npm v3.0+
- Neutrino v8

## Installation

`@atomspace/eslint` can be installed via the Yarn or NPM clients. Inside your project, make sure `neutrino` and `@atomspace/eslint` are development dependencies. You will also be using another Neutrino preset for building your application source code.

#### npm

```bash
❯ npm install --save-dev neutrino "@atomspace/eslint"
```

## Project Layout

`@atomspace/eslint` follows the standard [project layout](https://neutrino.js.org/project-layout) specified by Neutrino. This
means that by default all project source code should live in a directory named `src` in the root of the
project.

## Quickstart

After adding the Atom Space preset to your Neutrino-built project, edit your project's `packaje.json` and `.neutrinorc.js` to add the preset for linting **before** your build presets

#### .neutrinorc.js

```js
module.exports = {
   use: [
      '@atomspace/eslint'

      // put your build preset here (optional)
   ]
};
```

#### package.json

```json
{
   "scripts": {
      "start": "neutrino start",
      "build": "neutrino build",
      "lint": "neutrino lint"
   }
}
```

If you have a Neutrino **build** preset in `.neutrinorc.js`, start the app. Then check your console for any linting errors. If everything is successful, you should see no errors in the console. ESLint errors visible during development are reported, but will still continue to build and serve your
project. ESLint errors during production build will not build the project, and will cause the command to fail.

```bash
❯ npm start

✔ Development server running on: http://localhost:5000
✔ Build completed

ERROR in ./src/index.js

/src/index.js
  7:1   warning  Unexpected console statement                no-console
  7:14  error    A space is required after '{'               babel/object-curly-spacing
  7:20  error    Missing space before value for key 'hello'  key-spacing
  7:27  error    A space is required before '}'              babel/object-curly-spacing

✖ 4 problems (3 errors, 1 warning)
```

## Building

`@atomspace/eslint` will cause errors to **fail your build** when creating a bundle via `neutrino build`.

```bash
❯ npm run build

/src/index.js
  6:1   warning  Unexpected console statement            no-console
  6:14  error    A space is required after '{'           babel/object-curly-spacing
  6:16  error    Missing space before value for key 'a'  key-spacing
  6:17  error    A space is required before '}'          babel/object-curly-spacing

✖ 4 problems (3 errors, 1 warning)

error Command failed with exit code 1.
```

## Preset options

### Configuration

This preset inherits options from [@neutrinojs/eslint](https://neutrino.js.org/packages/eslint#usage).
If you wish to customize what is included, excluded, or any ESLint options, you can provide an options object with the
preset and this will be merged with defaults. Use an array pair instead of a string to supply these options. Define `eslint` property to override eslint configuration.

_Example: Include browser and Node environments and turn off semicolons from being required as defined by the Atom Space rules._

```js
module.exports = {
   use: [
      ['@atomspace/eslint', {
         eslint: {
            envs: ['browser', 'node'],
            rules: {
               semi: 'off'
            }
         }
      }]
   ]
};
```

### EcmaScript

This preset enables rules compatible with the latest EcmaScript version by default. This is suitable for the latest browsers or if you use transpilation during a build step. However in some cases old good ES5 may be required. You may disable modern features by overriding `esnext` property:

```js
module.exports = {
   use: [
      ['@atomspace/eslint', { esnext: false }]
   ]
};
```

This will disable:

- ES modules
- new ES global namespaces
- new syntax like destructuring, arrow functions, default params, classes, etc.
- implied strict mode (you will have to define `use strict` directive in every file)

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`@atomspace/eslint` creates some conventions to make overriding the configuration easier once you are ready to
make changes.

### Rules

The following is a list of rules and their identifiers which can be overridden:

| Name | Description | Environments and Commands |
| --- | --- | --- |
| `lint` | Lints JS and JSX files from the `src` directory using ESLint. Contains a single loader named `eslint`. This is inherited from `@neutrinojs/eslint`. | all |

## ESLint CLI

This middleware registers a command named `lint` which programmatically calls ESLint and prints the results to
the console.

```bash
❯ neutrino lint
```

```bash
❯ neutrino lint --fix
```

If you want to call them in your project it will be better to register npm scripts like this:

#### package.json

```json
{
   "scripts": {
      "pretest": "neutrino lint",
      "lint": "neutrino lint --fix"
   }
}
```

and use

```bash
❯ npm test
```

```bash
❯ npm run lint
```

## Integration with development tools

`@neutrinojs/eslint`, from which this preset inherits, also provides a method for getting the ESLint
configuration suitable for use in an eslintrc file. Typically this is used for providing hints or fix solutions to the
development environment, e.g. IDEs and text editors. Doing this requires
[creating an instance of the Neutrino API](https://neutrino.js.org/api) and providing the middleware it uses. If you keep all
this information in a `.neutrinorc.js`, this should be relatively straightforward. By providing all the middleware used
to Neutrino, you can ensure all the linting options used across all middleware will be merged together for your
development environment, without the need for copying, duplication, or loss of organization and separation.

This middleware registers another command named `eslintrc` which returns an ESLint configuration object suitable for
consumption by the ESLint CLI. Use the Neutrino API's `call` method to invoke this command:

_Example: Create a .eslintrc.js file in the root of the project, using `.neutrinorc.js` middleware._

#### .eslintrc.js

```js
const neutrino = require('neutrino').Neutrino;

module.exports = neutrino({ cwd: __dirname })
  .use('.neutrinorc.js')
  .call('eslintrc');
```

Projects may face a problem when their editor or IDE lints all files and highlights errors that were normally excluded
from source, i.e. Neutrino's `include` and `exclude` options. Unfortunately ESLint does not provide the possibility to configure ignored paths from Neutrino configuration and exclude them
from linting. Projects authors should define this manually in their project root directory in a `.eslintignore` file:

#### .eslintignore

```txt
/build
/*.*
```

ESLint will exclude built files and any files in the root directory (e.g. custom Neutrino configuration) but `src` and
`test` folders will be still checked. `node_modules` are ignored by default in ESLint. More information can be found
in the [ESLint user guide](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories).

## VSCode tips

To enable ESLint in **Visual Studio Code** you need to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

These are suggested workspace settings related to `@atomspace/eslint` rules:

#### .vscode/settings.json

```json
{
   "editor.insertSpaces": false,
   "editor.detectIndentation": false,
   "jshint.enable": false,
   "eslint.enable": true,
   "eslint.autoFixOnSave": true,
   "editor.formatOnSave": false,
   "javascript.format.enable": true,
   "javascript.validate.enable": false,
   "files.eol": "\n",
   "files.insertFinalNewline": false,
   "[markdown]": {
      "editor.tabSize": 3,
      "editor.insertSpaces": true
   },
   "eslint.options": {
      "extensions": [".js", ".jsx", ".html", ".md"]
   },
   "eslint.validate": [
      {
         "language": "javascript",
         "autoFix": true
      },
      {
         "language": "javascriptreact",
         "autoFix": true
      },
      {
         "language": "html",
         "autoFix": true
      },
      {
         "language": "markdown",
         "autoFix": true
      }
   ]
}
```

When project has been initially installed you need to restart an editor. After this ESLint will start to highlight and auto-fix errors in your code.

`@atomspace/eslint` can work in your editor even if there is no build infrastructure (`npm start` / `npm run build`). You can install it to any kind of JavaScript projects following the [ESLint CLI](#eslint-cli) guide above.

[npm-image]: https://img.shields.io/npm/v/@atomspace/eslint.svg
[npm-downloads]: https://img.shields.io/npm/dt/@atomspace/eslint.svg
[npm-url]: https://npmjs.org/package/@atomspace/eslint
[build-status]: https://travis-ci.org/atomspace/atomspace-eslint.svg?branch=master
[travis-url]: https://travis-ci.org/atomspace/atomspace-eslint