let eslint = require('@neutrinojs/eslint');
let { merge } = require('eslint/lib/config/config-ops');

let coreConfig = require('./configs/eslint.config.json');
let importConfig = require('./configs/import.config.json');
let promiseConfig = require('./configs/promise.config.json');
let jsDocConfig = require('./configs/jsdoc.config.json');
let amdConfig = require('./configs/amd.config.json');
let commentConfig = require('./configs/eslint-comment.config.json');
let regExpConfig = require('./configs/regexp.config.json');
let esnextConfig = require('./configs/esnext.config.json');
let es5Config = require('./configs/es5.config.json');
let babelConfig = require('./configs/babel.config');
let jestConfig = require('./configs/jest.config.json');
let fileNamesConfig = require('./configs/file-names.config.json');
let constConfig = require('./configs/const.config.json');
let htmlConfig = require('./configs/html.config.json');
let markdownConfig = require('./configs/markdown.config.json');
let reactConfig = require('./configs/react.config.json');
let reactHooksConfig = require('./configs/react-hooks.config');
let jsxA11yConfig = require('./configs/jsx-a11y.config.json');
let restrictedGlobalsConfig = require('./configs/restricted-globals.config');
let extendNativeConfig = require('./configs/extend-native.config');
let arrowsConfig = require('./configs/arrows.config');
let eslintPluginConfig = require('./configs/eslint-plugin.config');
let compatConfig = require('./configs/compat.config');
let throwConfig = require('./configs/throw.config');
let securityConfig = require('./configs/security.config');

function assign (to = {}, from = {}) {
	return Object.assign(to, from);
}

function eslintrc (neutrino) {
	let options = neutrino.config.module.rule('lint').use('eslint').get('options');
	let {
		baseConfig, parser, parserOptions, plugins, rules, envs, globals
	} = options;

	function arrayToObject (array) {
		return array.reduce((obj, item) => assign(obj, { [item]: true }), {});
	}

	return merge(
		baseConfig,
		[
			parser && { parser },
			parserOptions && { parserOptions },
			plugins && { plugins },
			rules && { rules },
			envs && { env: arrayToObject(envs) },
			globals && { globals: arrayToObject(globals) }
		].reduce(assign, {})
	);
}

module.exports = function (neutrino, settings = {}) {
	settings.esnext = (settings.esnext === undefined) ? true : settings.esnext; // `true` by default
	settings.eslint = settings.eslint || {};
	settings.browsers = settings.browsers || [];
	let lintExtensions = settings.test || /\.(html?|jsx?|md)$/;
	let neutrinoExtensions = neutrino.options.extensions;
	let baseConfig = [
		coreConfig,
		importConfig,
		promiseConfig,
		jsDocConfig,
		amdConfig,
		commentConfig,
		regExpConfig,
		settings.esnext ? esnextConfig : es5Config,
		settings.esnext ? babelConfig(coreConfig) : {},
		jestConfig,
		fileNamesConfig,
		settings.esnext ? constConfig : {},
		htmlConfig,
		markdownConfig,
		reactConfig,
		reactHooksConfig,
		jsxA11yConfig,
		restrictedGlobalsConfig,
		extendNativeConfig,
		arrowsConfig,
		eslintPluginConfig,
		settings.browsers.length ? compatConfig : {},
		throwConfig,
		securityConfig,
		{
			settings: {
				browsers: settings.browsers
			}
		},
		settings.eslint
	].reduce(merge);

	function isNotInExtensions (extension) {
		return neutrinoExtensions.indexOf(extension) < 0;
	}

	neutrino.options.extensions = neutrinoExtensions
		.concat(['html', 'htm', 'md']
		.filter(isNotInExtensions));
	neutrino.use(eslint, { test: lintExtensions });
	neutrino.config.module.rule('lint')
		.use('eslint')
			.tap(function reset (options) {
				options.envs = [];
				options.globals = [];
				options.parserOptions = {};
				return options;
			})
			.tap(function configure (options) {
				return assign(options, { baseConfig });
			});
	neutrino.register('eslintrc', () => eslintrc(neutrino));
};