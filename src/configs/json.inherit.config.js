function merge (to = {}, from = {}) {
	return Object.assign(to, from);
}

module.exports = function (config) {
	let inheritanceRules = [
		'array-bracket-newline',
		'array-bracket-spacing',
		'array-element-newline',
		'comma-dangle',
		'comma-style',
		'indent',
		'key-spacing',
		'no-octal-escape',
		'no-useless-escape',
		'object-curly-newline',
		'object-curly-spacing',
		'object-property-newline'
	];

	function toJsonsRule (name) {
		let jsoncName = `jsonc/${name}`;
		let jsoncRule = config.rules[jsoncName];
		let eslintRule = config.rules[name];

		return {
			[jsoncName]: jsoncRule || eslintRule || 'off'
		};
	}

	let rules = inheritanceRules
		.map(toJsonsRule)
		.reduce(merge);

	return { rules	};
};