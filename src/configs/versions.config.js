let vue3Config = require('./vue3.config');
let compatConfig = require('./compat.config');
let mergeConfigs = require('../merge-configs');

module.exports = function (neutrino, settings) {
	const VUE_3_VERSION = 3;
	const DEFAULT_VUE_VERSION = '^2.6.0';
	const DEFAULT_REACT_VERSION = '16.12';
	const DEFAULT_JEST_VERSION = '26';
	let { engines = {} } = neutrino.options.packageJson;
	let vueSemVer = neutrino.getDependencyVersion('vue') || {};
	let reactSemVer = neutrino.getDependencyVersion('react') || {};
	let jestSemVer = neutrino.getDependencyVersion('jest') || {};
	let vueVersion = vueSemVer.version || DEFAULT_VUE_VERSION;
	let reactVersion = reactSemVer.version || DEFAULT_REACT_VERSION;
	let jestVersion = jestSemVer.version || DEFAULT_JEST_VERSION;
	let vueIs3thVersion = vueSemVer.major === VUE_3_VERSION;

	let config = [
		{
			settings: {
				jest: {
					version: jestVersion
				},
				react: {
					version: reactVersion
				},
				browsers: settings.browsers
			},
			env: {
				...settings.browsers.length ? { browser: true } : {},
				...settings.node && { node: true }
			},
			rules: {
				'vue/no-unsupported-features': ['error', {
					version: vueVersion,
					ignores: []
				}],
				...engines.node && {
					'node/no-unsupported-features/node-builtins': ['error', { version: engines.node }],
					'node/no-deprecated-api': ['error', { version: engines.node }]
				},
				...settings.node && {
					'node/no-unsupported-features/es-builtins': ['error', { version: settings.node }],
					'node/no-unsupported-features/es-syntax': ['error', { version: settings.node, ignores: ['modules'] }]
				}
			}
		},
		settings.browsers.length ? compatConfig : {},
		vueIs3thVersion ? vue3Config : {}
	].reduce(mergeConfigs);

	return config;
};