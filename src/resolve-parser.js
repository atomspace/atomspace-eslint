module.exports = function resolveParser (config) {
	return {
		...config.parser && {
			parser: require.resolve(config.parser)
		},
		...config.parserOptions && config.parserOptions.parser && {
			parserOptions: {
				parser: require.resolve(config.parserOptions.parser)
			}
		}
	};
};