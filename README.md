# Atom Space ESLint Preset

`@atomspace/eslint` is a Neutrino preset that supports linting JavaScript projects with ESLint config used in Atom Space.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Build Status][build-status]][travis-url]

## Features

- Zero upfront configuration necessary to start linting your project
- React support
- Vue support
- Node.js support
- Accessibility linting in React and Vue
- Highly visible during development, fails compilation when building for production
- Promises linting
- Module systems linting (ES, CommonJS, AMD) considering Webpack modules paths resolving
- Regex shorthand to improve readability
- ESLint comments linting
- JSDoc syntax linting
- ESLint plugins linting
- Jest tests linting
- Security rules
- File names linting
- Various libraries linting
- Markdown code fragments linting
- Checking for best practices
- Easily extensible to customize your project as needed

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack 4
- ESLint 7.4+

## Installation

`@atomspace/eslint` can be installed using NPM. Inside your project, make sure `neutrino`, `eslint` and `@atomspace/eslint` are development dependencies. You will also be using another Neutrino preset for building your application source code.

```bash
npm install --save-dev neutrino eslint "@atomspace/eslint"
```

## Quickstart

After adding the Atom Space preset to your Neutrino-built project, edit your project's `package.json` and `.neutrinorc.js` to add the preset for linting **before** your build presets. Make it the first in the list of presets

#### .neutrinorc.js

```js
let atomspaceEslint = require('@atomspace/eslint');

module.exports = {
   use: [
      atomspaceEslint()

      // put your rest of presets here
   ]
};
```

#### package.json

```json
{
   "scripts": {
      "build": "webpack --mode production",
      "start": "webpack --mode development",
      "lint": "eslint ./ --format codeframe --fix"
   }
}
```

`@atomspace/eslint`, provides an `.eslintrc()` output handler for generating the ESLint configuration in a format suitable for use in an `.eslintrc.js` file. This allows the ESLint CLI to be used outside of building the project, and for IDEs and text editors to provide linting hints/fixes.

Create a `.eslintrc.js` file in the root of the project, containing:

#### .eslintrc.js

```js
let neutrino = require('neutrino');

module.exports = neutrino().eslintrc();
```

## Building

If you have a Neutrino **build** preset in `.neutrinorc.js`, start the app in **development mode** via `webpack --mode development`. Then check your console for any linting errors. If everything is successful, you should see no errors in the console. ESLint errors visible during development are reported, but will still continue to build and serve your project.

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

ESLint errors during **production mode** build will not build the project, and will cause the command to **fail your build** when creating a bundle via `webpack --mode production`.

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

If you wish to customize what is included, excluded, or any ESLint options, you can provide an options object with the preset and this will be merged with defaults. Define `eslint` property to override ESLint configuration.

_Example: Include a plugin, browser and Node environments and turn off semicolons from being required as defined by the Atom Space rules._

```js
let atomspaceEslint = require('@atomspace/eslint');

module.exports = {
   use: [
      atomspaceEslint({
         eslint: {
            plugins: ['fp'],
            env: {
               browser: true,
               node: true
            },
            rules: {
               semi: 'off'
            }
         }
      })
   ]
};
```

### EcmaScript

This preset enables rules compatible with the latest EcmaScript version by default. This is suitable for the latest browsers or if you use transpilation during a build step. However in some cases old good ES5 may be required. You may disable modern features by overriding `esnext` property:

```js
module.exports = {
   use: [
      atomspaceEslint({ esnext: false })
   ]
};
```

This will disable:

- ES modules
- new ES global namespaces
- new syntax like destructuring, arrow functions, default function arguments, classes, etc.
- implied strict mode (you will have to define `use strict` directive in every file)

### Compatibility

#### Browser

In case you want to check a compatibility with certain browsers you may pass `browsers` option to settings. But it is recommended to use it only in case **if there is no Babel transpilation** for such browsers.

Configure supported browsers in `.neutrinorc.js` (see [browserslist](https://github.com/browserslist/browserslist)):

```js
module.exports = {
   use: [
      atomspaceEslint({ browsers: ['ie >= 8'] })
   ]
};
```

#### Node

If you want to check a compatibility with a NodeJS version pass `node` option to settings. This will check the code for EcmaScript compatibility. It is recommended to use it only **if there is no Babel transpilation**.

```js
module.exports = {
   use: [
      atomspaceEslint({ node: '>=8.0.0' })
   ]
};
```

Also you can enable linting of NodeJS features and deprecated API providing `engines` in your **package.json**. This will highlight usage of deprecated properties, methods and global variables.

```json
"engines": {
    "node": ">=8.3.0"
}
```

## ESLint CLI

You can find more details how to run ESLint in the CLI in the [official documentation](https://eslint.org/docs/user-guide/command-line-interface).

Usually ESLint is a part of Webpack build configuration and any violation will prevent build and report errors. So it is not necessary to run ESLint separately during CI/CD for instance. But if you don't use Webpack and would like to include linting in your pipeline you can use this configuration of scripts

#### package.json

```json
{
   "scripts": {
      "eslint": "eslint ./",
      "pretest": "npm run eslint -- --max-warnings 0 --format codeframe",
      "lint": "npm run eslint -- --fix"
   }
}
```

Running of tests will lint before and fail if there are violations

```bash
❯ npm test
```

Running `lint` command will auto-fix and report left violations

```bash
❯ npm run lint
```

## VSCode tips

To enable ESLint in **Visual Studio Code** you should have the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed.

These are suggested workspace settings related to `@atomspace/eslint` rules:

#### .vscode/settings.json

```json
{
   "editor.insertSpaces": false,
   "editor.detectIndentation": false,
   "jshint.enable": false,
   "eslint.enable": true,
   "editor.formatOnSave": false,
   "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
   },
   "javascript.format.enable": true,
   "javascript.validate.enable": false,
   "files.eol": "\n",
   "files.insertFinalNewline": false,
   "[markdown]": {
      "editor.tabSize": 3,
      "editor.insertSpaces": true
   },
   "eslint.options": {
      "extensions": [".js", ".jsx", ".html", ".md", ".vue"]
   },
   "eslint.validate": ["javascript", "javascriptreact", "html", "markdown", "vue"],
   "vetur.validation.template": false
}
```

When project has been initially installed you need to restart an editor. After this ESLint will start to highlight and auto-fix errors in your code on file save.

`@atomspace/eslint` can work in your editor even if there is no build infrastructure (`npm start` / `npm run build`). You can install it to any kind of JavaScript projects following the [ESLint CLI](#eslint-cli) guide above.

[npm-image]: https://img.shields.io/npm/v/@atomspace/eslint.svg
[npm-downloads]: https://img.shields.io/npm/dt/@atomspace/eslint.svg
[npm-url]: https://npmjs.org/package/@atomspace/eslint
[build-status]: https://travis-ci.com/atomspace/atomspace-eslint.svg?branch=master
[travis-url]: https://travis-ci.com/atomspace/atomspace-eslint