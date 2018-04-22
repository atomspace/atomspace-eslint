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

module.exports = function (neutrino, settings = {}) {
	let config = [
		{ eslint: coreConfig },
		{ eslint: importConfig },
		{ eslint: promiseConfig },
		{ eslint: jsDocConfig },
		{ eslint: amdConfig },
		{ eslint: commentConfig },
		{ eslint: regExpConfig },
		{ eslint: settings.esnext ? esnextConfig : es5Config },
		{ eslint: babelConfig(coreConfig) },
		settings
	].reduce(eslint.merge);

	neutrino.use(eslint);
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