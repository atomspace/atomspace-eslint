module.exports = function (config) {
	return {
		rules: {
			'vue/comma-dangle': config.rules['comma-dangle'] || 'off',
			'vue/dot-location': config.rules['dot-location'] || 'off',
			'vue/eqeqeq': config.rules.eqeqeq || 'off',
			'vue/key-spacing': config.rules['key-spacing'] || 'off',
			'vue/keyword-spacing': config.rules['keyword-spacing'] || 'off',
			'vue/object-curly-spacing': config.rules['object-curly-spacing'] || 'off',
			'vue/space-unary-ops': config.rules['space-unary-ops'] || 'off',
			'vue/no-unused-vars': config.rules['no-unused-vars'] || 'off',
			'vue/comma-spacing': config.rules['comma-spacing'] || 'off',
			'vue/prefer-template': config.rules['prefer-template'] || 'off',
			'vue/template-curly-spacing': config.rules['template-curly-spacing'] || 'off',
			'vue/space-in-parens': config['space-in-parens'] || 'off',
			'vue/comma-style': config.rules['comma-style'] || 'off',
			'vue/no-extra-parens': config.rules['no-extra-parens'] || 'off',
			'vue/no-useless-concat': config.rules['no-useless-concat'] || 'off',
			'vue/dot-notation': config.rules['dot-notation'] || 'off',
			'object-curly-newline': config.rules['object-curly-newline'] || 'off',
			'object-property-newline': config.rules['object-property-newline'] || 'off',
			'operator-linebreak': config.rules['operator-linebreak'] || 'off',
			'func-call-spacing': config.rules['func-call-spacing'] || 'off',
			'vue/no-sparse-arrays': config.rules['no-sparse-arrays'] || 'off'
		}
	};
};