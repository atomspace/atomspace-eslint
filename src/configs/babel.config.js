function merge (to = {}, from = {}) {
	return Object.assign(to, from);
}

module.exports = function (config) {
	let inheritanceRules = [
		'new-cap',
		'object-curly-spacing',
		'no-invalid-this',
		'semi',
		'quotes',
		'no-unused-expressions',
		'camelcase'
	];

	function toBabelRule (name) {
		return {
			[name]: 'off',
			[`babel/${name}`]: config.rules[name] || 'off'
		};
	}

	let plugins = ['babel'];
	let rules = inheritanceRules
		.map(toBabelRule)
		.reduce(merge);

	return { plugins, rules	};
};