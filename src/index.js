let eslint = require('@neutrinojs/eslint');

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
let jestConfig = require('./jest.config');
let fileNamesConfig = require('./file-names.config');
let constConfig = require('./const.config');
let htmlConfig = require('./html.config');
let markdownConfig = require('./markdown.config');

function merge (to, from) {
	let toEslint = to.eslint;
	let fromEslint = from.eslint;
	let toOverrides = toEslint.overrides || [];
	let fromOverrides = fromEslint.overrides || [];
	let overrides = toOverrides.concat(fromOverrides);
	let config = eslint.merge(to, from);

	config.eslint.overrides = overrides;
	return config;
}

module.exports = function (neutrino, settings = {}) {
	settings.esnext = (settings.esnext === undefined) ? true : settings.esnext; // `true` by default
	let lintExtensions = settings.test || /\.(html?|jsx?)$/; // TODO: add 'md' in the future
	let neutrinoExtensions = neutrino.options.extensions;
	let config = [
		{ eslint: coreConfig },
		{ eslint: importConfig },
		{ eslint: promiseConfig },
		{ eslint: jsDocConfig },
		{ eslint: amdConfig },
		{ eslint: commentConfig },
		{ eslint: regExpConfig },
		{ eslint: settings.esnext ? esnextConfig : es5Config },
		{ eslint: settings.esnext ? babelConfig(coreConfig) : {} },
		{ eslint: jestConfig },
		{ eslint: fileNamesConfig },
		{ eslint: settings.esnext ? constConfig : {} },
		{ eslint: htmlConfig },
		{ eslint: markdownConfig },
		settings
	].reduce(merge);

	function isNotInExtensions (extension) {
		return neutrinoExtensions.indexOf(extension) < 0;
	}

	neutrino.options.extensions = neutrinoExtensions
		.concat(['html', 'htm'/*, 'md'*/]
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
				return eslint.merge({ eslint: options }, config).eslint;
			});
};