let restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
	rules: {
		'no-restricted-globals': ['error'].concat(restrictedGlobals)
	}
};