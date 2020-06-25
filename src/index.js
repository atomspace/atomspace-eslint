let path = require('path');

let eslint = require('@neutrinojs/eslint');

let coreConfig = require('./configs/eslint.config');
let importConfig = require('./configs/import.config');
let promiseConfig = require('./configs/promise.config');
let jsDocConfig = require('./configs/jsdoc.config');
let amdConfig = require('./configs/amd.config');
let commentConfig = require('./configs/eslint-comment.config');
let regExpConfig = require('./configs/regexp.config');
let esnextConfig = require('./configs/esnext.config');
let es5Config = require('./configs/es5.config');
let babelConfig = require('./configs/babel.config');
let jestConfig = require('./configs/jest.config');
let fileNamesConfig = require('./configs/file-names.config');
let constConfig = require('./configs/const.config');
let htmlConfig = require('./configs/html.config');
let markdownConfig = require('./configs/markdown.config');
let reactConfig = require('./configs/react.config');
let jsxA11yConfig = require('./configs/jsx-a11y.config');
let restrictedGlobalsConfig = require('./configs/restricted-globals.config');
let extendNativeConfig = require('./configs/extend-native.config');
let arrowsConfig = require('./configs/arrows.config');
let eslintPluginConfig = require('./configs/eslint-plugin.config');
let compatConfig = require('./configs/compat.config');
let throwConfig = require('./configs/throw.config');
let securityConfig = require('./configs/security.config');
let envsConfig = require('./configs/envs.config');
let nodeConfig = require('./configs/node.config');
let libsConfig = require('./configs/libs.config');
let vueConfig = require('./configs/vue.config');
let mergeConfigs = require('./merge-configs');

module.exports = function (settings = {}) {
	return function (neutrino) {
		let { engines = {} } = neutrino.options.packageJson;
		let lintExtensions = settings.test || /\.(html?|jsx?|md|vue)$/;
		let outputPath = path.relative(neutrino.options.root, neutrino.options.output);
		let outputPattern = `/${outputPath.replace('\\', '/')}/**`;

		settings.esnext = settings.esnext === undefined ? true : settings.esnext; // `true` by default
		settings.eslint = settings.eslint || {};
		settings.browsers = settings.browsers || [];
		settings.node = settings.node || undefined;

		let baseConfig = [
			coreConfig,
			settings.esnext ? esnextConfig : es5Config,
			settings.esnext ? constConfig : {},
			importConfig,
			promiseConfig,
			jsDocConfig,
			amdConfig,
			commentConfig,
			regExpConfig,
			jestConfig,
			fileNamesConfig,
			htmlConfig,
			markdownConfig,
			reactConfig,
			jsxA11yConfig,
			restrictedGlobalsConfig,
			extendNativeConfig,
			arrowsConfig,
			eslintPluginConfig,
			settings.browsers.length ? compatConfig : {},
			throwConfig,
			securityConfig,
			nodeConfig,
			libsConfig,
			vueConfig,
			envsConfig(neutrino.config),
			engines.node ? {
				rules: {
					'node/no-unsupported-features/node-builtins': ['error', { version: engines.node }],
					'node/no-deprecated-api': ['error', { version: engines.node }]
				}
			} : {},
			settings.node ? {
				rules: {
					'node/no-unsupported-features/es-builtins': ['error', { version: settings.node }],
					'node/no-unsupported-features/es-syntax': ['error', { version: settings.node, ignores: ['modules'] }]
				}
			} : {},
			{
				settings: {
					browsers: settings.browsers
				},
				ignorePatterns: [outputPattern]
			},
			settings.eslint
		].reduce(mergeConfigs);

		if (settings.esnext) {
			baseConfig = mergeConfigs(baseConfig, babelConfig(baseConfig));
		}

		neutrino.use(eslint({
			test: lintExtensions,
			eslint: {
				baseConfig,
				resolvePluginsRelativeTo: path.resolve(__dirname, '../node_modules/.pnpm')
			 }
		}));
	};
};