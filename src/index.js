let eslint = require('@neutrinojs/eslint');

let coreConfig = require('./eslint.config.json');
let importConfig = require('./import.config.json');
let promiseConfig = require('./promise.config.json');
let jsDocConfig = require('./jsdoc.config.json');
let amdConfig = require('./amd.config.json');

let config = [
	{ eslint: coreConfig },
	{ eslint: importConfig },
	{ eslint: promiseConfig },
	{ eslint: jsDocConfig },
	{ eslint: amdConfig }
].reduce(eslint.merge);

module.exports = function (neutrino, settings = {}) {
	neutrino.use(eslint, eslint.merge(config, settings));
};