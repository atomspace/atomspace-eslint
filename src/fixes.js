let noSecretsPlugin = require('eslint-plugin-no-secrets');

// Remove JSON processors as they conflict with another JSON plugins
delete noSecretsPlugin.processors;