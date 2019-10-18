module.exports = function envs (neutrinoConfig) {
	let eslintTargetEnvs = {
		'web': ['browser'],
		'node': ['node'],
		'async-node': ['node'],
		'webworker': ['worker', 'serviceworker '],
		'node-webkit': ['shared-node-browser'],
		'electron-main': ['node'],
		'electron-renderer': ['browser'],
		'electron-preload': ['browser']
	};
	let config = { env: {} };
	let target = neutrinoConfig.get('target');
	let eslintEnvs = eslintTargetEnvs[target];

	if (eslintEnvs) {
		eslintEnvs.forEach(function (env) {
			config.env[env] = true;
		});
	}

	return config;
};