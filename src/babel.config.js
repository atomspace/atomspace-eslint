module.exports = function (config) {
	return {
		rules: {
			'new-cap': 'off',
			'babel/new-cap': config.rules['new-cap'],
			'object-curly-spacing': 'off',
			'babel/object-curly-spacing': config.rules['object-curly-spacing'],
			'no-invalid-this': 'off',
			'babel/no-invalid-this': config.rules['no-invalid-this'],
			'semi': 'off',
			'babel/semi': config.rules.semi

			// 'quotes': 'off',
			// 'babel/quotes': config.rules.quotes,
			// 'no-unused-expressions': 'off',
			// 'babel/no-unused-expressions': config.rules['no-unused-expressions']
		}
	};
};