module.exports = function (config) {
	return {
		rules: {
			'new-cap': 'off',
			'babel/new-cap': config.rules['new-cap'] || 'off',
			'object-curly-spacing': 'off',
			'babel/object-curly-spacing': config.rules['object-curly-spacing'] || 'off',
			'no-invalid-this': 'off',
			'babel/no-invalid-this': config.rules['no-invalid-this'] || 'off',
			'semi': 'off',
			'babel/semi': config.rules.semi || 'off',
			'quotes': 'off',
			'babel/quotes': config.rules.quotes || 'off',
			'no-unused-expressions': 'off',
			'babel/no-unused-expressions': config.rules['no-unused-expressions'] || 'off',
			'camelcase': 'off',
			'babel/camelcase ': config.rules.camelcase || 'off'
		}
	};
};