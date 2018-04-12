var eslint = require('@neutrinojs/eslint');

var coreConfig = require('./eslint.config.json');
var importConfig = require('./import.config.json');

var config = eslint.merge(
	{ eslint: coreConfig },
	{ eslint: importConfig }
);

module.exports = function (neutrino, settings = {}) {
	neutrino.use(eslint, eslint.merge(config, settings));
};