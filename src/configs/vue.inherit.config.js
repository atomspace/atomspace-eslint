function merge (to = {}, from = {}) {
	return Object.assign(to, from);
}

module.exports = function (config) {
	let inheritanceRules = [
		'comma-dangle',
		'dot-location',
		'eqeqeq',
		'key-spacing',
		'object-curly-spacing',
		'space-unary-ops',
		'no-unused-vars',
		'comma-spacing',
		'prefer-template',
		'template-curly-spacing',
		'space-in-parens',
		'comma-style',
		'no-extra-parens',
		'no-useless-concat',
		'dot-notation',
		'object-curly-newline',
		'object-property-newline',
		'operator-linebreak',
		'func-call-spacing',
		'no-sparse-arrays'
	];

	function toVueRule (name) {
		return {
			[`vue/${name}`]: config.rules[name] || 'off'
		};
	}

	let rules = inheritanceRules
		.map(toVueRule)
		.reduce(merge);

	return { rules	};
};