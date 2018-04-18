let eslint = require('@neutrinojs/eslint');

let coreConfig = require('./eslint.config.json');
let importConfig = require('./import.config.json');
let promiseConfig = require('./promise.config.json');
let jsDocConfig = require('./jsdoc.config.json');

let config = eslint.merge(
	eslint.merge(
		{ eslint: coreConfig },
		{ eslint: importConfig }
	),
	eslint.merge(
		{ eslint: promiseConfig },
		{ eslint: jsDocConfig }
	)
);

module.exports = function (neutrino, settings = {}) {
	neutrino.use(eslint, eslint.merge(config, settings));
};