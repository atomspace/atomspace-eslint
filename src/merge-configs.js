let deepmerge = require('deepmerge');

function merge (to = {}, from = {}) {
	return Object.assign({}, to, from);
}
function concat (to = [], from = []) {
	return [].concat(to).concat(from);
}

module.exports = function mergeConfigs (toConfig = {}, fromConfig = {}) {
	return {
		...toConfig,
		...fromConfig,
		parserOptions: deepmerge(toConfig.parserOptions || {}, fromConfig.parserOptions || {}),
		plugins: concat(toConfig.plugins, fromConfig.plugins),
		overrides: concat(toConfig.overrides, fromConfig.overrides),
		env: merge(toConfig.env, fromConfig.env),
		globals: merge(toConfig.globals, fromConfig.globals),
		extends: concat(toConfig.extends, fromConfig.extends),
		settings: deepmerge(toConfig.settings || {}, fromConfig.settings || {}),
		ignorePatterns: concat(toConfig.ignorePatterns, fromConfig.ignorePatterns),
		rules: merge(toConfig.rules, fromConfig.rules)
	};
};