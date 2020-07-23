module.exports = function importResolver (neutrinoConfig) {
	let config = { settings: {} };

	config.settings['import/resolver'] = {
		webpack: {
			config () {
				return {
					resolve: {
						extensions: neutrinoConfig.resolve.extensions.values(),
						alias: neutrinoConfig.resolve.alias.entries(),
						modules: neutrinoConfig.resolve.modules.values(),
						aliasFields: neutrinoConfig.resolve.aliasFields.values(),

						// descriptionFields: neutrino.config.resolve.descriptionFields.values(),
						mainFields: neutrinoConfig.resolve.mainFields.values(),
						mainFiles: neutrinoConfig.resolve.mainFiles.values(),
						cachePredicate: neutrinoConfig.resolve.get('cachePredicate'),
						cacheWithContext: neutrinoConfig.resolve.get('cacheWithContext'),
						enforceExtension: neutrinoConfig.resolve.get('enforceExtension'),
						unsafeCache: neutrinoConfig.resolve.get('unsafeCache'),
						symlinks: neutrinoConfig.resolve.get('symlinks')
					}
				};
			}
		}
	};

	return config;
};