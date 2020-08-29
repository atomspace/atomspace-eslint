module.exports = function importResolver (neutrinoConfig) {
	let config = { settings: {} };

	config.settings['import/resolver'] = {
		webpack: {
			config () {
				let { resolve } = neutrinoConfig;

				return {
					resolve: {
						extensions: resolve.extensions.values(),
						alias: resolve.alias.entries(),
						modules: resolve.modules.values(),
						aliasFields: resolve.aliasFields.values(),
						descriptionFiles: resolve.descriptionFiles.values(),
						mainFields: resolve.mainFields.values(),
						mainFiles: resolve.mainFiles.values(),
						cachePredicate: resolve.get('cachePredicate'),
						cacheWithContext: resolve.get('cacheWithContext'),
						enforceExtension: resolve.get('enforceExtension'),
						unsafeCache: resolve.get('unsafeCache'),
						symlinks: resolve.get('symlinks')
					}
				};
			}
		}
	};

	return config;
};