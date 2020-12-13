let path = require('path');

let eslint = require('@neutrinojs/eslint');

let coreConfig = require('./configs/eslint.config');
let importConfig = require('./configs/import.config');
let importResolverConfig = require('./configs/import-resolver.config');
let promiseConfig = require('./configs/promise.config');
let jsDocConfig = require('./configs/jsdoc.config');
let amdConfig = require('./configs/amd.config');
let commentConfig = require('./configs/eslint-comment.config');
let esnextConfig = require('./configs/esnext.config');
let es5Config = require('./configs/es5.config');
let babelConfig = require('./configs/babel.config');
let jestConfig = require('./configs/jest.config');
let fileNamesConfig = require('./configs/file-names.config');
let htmlConfig = require('./configs/html.config');
let markdownConfig = require('./configs/markdown.config');
let reactConfig = require('./configs/react.config');
let jsxA11yConfig = require('./configs/jsx-a11y.config');
let restrictedGlobalsConfig = require('./configs/restricted-globals.config');
let extendNativeConfig = require('./configs/extend-native.config');
let arrowsConfig = require('./configs/arrows.config');
let eslintPluginConfig = require('./configs/eslint-plugin.config');
let securityConfig = require('./configs/security.config');
let envsConfig = require('./configs/envs.config');
let nodeConfig = require('./configs/node.config');
let libsConfig = require('./configs/libs.config');
let vueConfig = require('./configs/vue.config');
let vueInheritConfig = require('./configs/vue.inherit.config');
let vueA11yConfig = require('./configs/vue-a11y.config');
let sortClassConfig = require('./configs/sort-class.config');
let sonarConfig = require('./configs/sonar.config');
let unicornConfig = require('./configs/unicorn.config');
let versionsConfig = require('./configs/versions.config');
let jsonConfig = require('./configs/json.config');
let jsonInheritConfig = require('./configs/json.inherit.config');
let mergeConfigs = require('./merge-configs');
let resolveParser = require('./resolve-parser');
let aliasPlugins = require('./alias-plugins');
let aliasImportResolvers = require('./alias-import-resolvers');

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let outputPath = path.relative(neutrino.options.root, neutrino.options.output);
		let outputPattern = `/${outputPath.replace('\\', '/')}/**`;

		let settings = {
			test: customSettings.test || /\.(html?|jsx?|md|markdown|vue)$/,
			esnext: customSettings.esnext === undefined ? true : customSettings.esnext, // `true` by default
			eslint: customSettings.eslint || {},
			browsers: customSettings.browsers || [],
			node: customSettings.node || undefined
		};

		let baseConfig = [
			coreConfig,
			importConfig,
			importResolverConfig(neutrino.config),
			promiseConfig,
			jsDocConfig,
			amdConfig,
			commentConfig,
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
			securityConfig,
			nodeConfig,
			libsConfig,
			vueConfig,
			vueA11yConfig,
			sortClassConfig,
			sonarConfig,
			unicornConfig,
			jsonConfig,
			settings.esnext ? esnextConfig : es5Config,
			envsConfig(neutrino.config),
			versionsConfig(neutrino, settings),
			{
				ignorePatterns: [outputPattern]
			},
			settings.eslint
		].reduce(mergeConfigs);

		baseConfig = [
			baseConfig,
			vueInheritConfig(baseConfig),
			jsonInheritConfig(baseConfig),
			settings.esnext ? babelConfig(baseConfig) : {},
			resolveParser(baseConfig)
		].reduce(mergeConfigs);

		aliasPlugins(baseConfig);
		aliasImportResolvers(baseConfig);

		neutrino.use(eslint({
			test: settings.test,
			eslint: {
				baseConfig
			 }
		}));
	};
};

module.exports.merge = mergeConfigs;