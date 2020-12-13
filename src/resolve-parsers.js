module.exports = function resolveParsers (config) {
	if (config.parser) {
		config.parser = require.resolve(config.parser);
	}

	if (config.parserOptions && config.parserOptions.parser) {
		config.parserOptions.parser = require.resolve(config.parserOptions.parser);
	}

	if (config.overrides) {
		config.overrides.forEach(resolveParsers);
	}
};