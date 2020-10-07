let moduleAlias = require('module-alias');

function toFullName (pluginName) {
	const ESLINT_PREFIX = 'eslint-plugin-';
	const ORGANIZATION_EXPRESSION = /^(@[\d.A-z-]+)\/(.+)$/;
	let nameIsFull = pluginName.indexOf(ESLINT_PREFIX) === 0;
	let nameIsOrganization = ORGANIZATION_EXPRESSION.test(pluginName);

	if (nameIsOrganization) {
		let [, organizationName, name] = pluginName.match(ORGANIZATION_EXPRESSION);

		return `${organizationName}/${toFullName(name)}`;
	}

	return nameIsFull ? pluginName : `${ESLINT_PREFIX}${pluginName}`;
}

function aliasToCurrentScope (pluginName) {
	moduleAlias.addAlias(pluginName, require.resolve(pluginName));
}

module.exports = function aliasPlugins (config) {
	let { plugins = [] } = config;

	plugins
		.map(toFullName)
		.forEach(aliasToCurrentScope);
};