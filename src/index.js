let eslint = require('@neutrinojs/eslint');
const { merge } = require('eslint/lib/config/config-ops');

let coreConfig = require('./eslint.config.json');
let importConfig = require('./import.config.json');
let promiseConfig = require('./promise.config.json');
let jsDocConfig = require('./jsdoc.config.json');
let amdConfig = require('./amd.config.json');
let commentConfig = require('./eslint-comment.config.json');
let regExpConfig = require('./regexp.config.json');
let esnextConfig = require('./esnext.config.json');
let es5Config = require('./es5.config.json');
let babelConfig = require('./babel.config');
let jestConfig = require('./jest.config.json');
let fileNamesConfig = require('./file-names.config.json');
let constConfig = require('./const.config.json');
let htmlConfig = require('./html.config.json');
let markdownConfig = require('./markdown.config.json');
let reactConfig = require('./react.config.json');

function eslintrc (neutrino) {
	const options = neutrino.config.module
		.rule('lint')
		.use('eslint')
		.get('options');

	function arrayToObject (array) {
		return array.reduce((obj, item) => Object.assign(obj, { [item]: true }), {});
	}

	return merge(
		options.baseConfig,
		{
			...(options.parser && { parser: options.parser }),
			...(options.parserOptions && { parserOptions: options.parserOptions }),
			...(options.plugins && { plugins: options.plugins }),
			...(options.rules && { rules: options.rules }),
			...(options.envs && { env: arrayToObject(options.envs) }),
			...(options.globals && { globals: arrayToObject(options.globals) })
		}
	);
}

module.exports = function (neutrino, settings = {}) {
	settings.esnext = (settings.esnext === undefined) ? true : settings.esnext; // `true` by default
	settings.eslint = settings.eslint || {};
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
				return {
					...options,
					baseConfig
				};
			});
	neutrino.register('eslintrc', () => eslintrc(neutrino));
};