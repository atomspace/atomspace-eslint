var eslint = require('@neutrinojs/eslint');

var coreConfig = require('./eslint.config.json');
var importConfig = require('./import.config.json');
var promiseConfig = require('./promise.config.json');

var config = eslint.merge(
	eslint.merge(
		{ eslint: coreConfig },
		{ eslint: importConfig }
	),
	{ eslint: promiseConfig }
);

module.exports = function (neutrino, settings = {}) {
	neutrino.use(eslint, eslint.merge(config, settings));
};