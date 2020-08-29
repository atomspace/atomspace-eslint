module.exports = function importResolver (neutrinoConfig) {
	let config = { settings: {} };
	let resolve;

	config.settings['import/resolver'] = {
		webpack: {
			config () {
				// memoization for performance
				if (!resolve) {
					resolve = neutrinoConfig.resolve.toConfig();
				}
				return { resolve };
			}
		}
	};

	return config;
};