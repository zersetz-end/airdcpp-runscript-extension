const fs = require('fs');
const path = require('path');

const RemoteExtension = require('airdcpp-extension').RemoteExtension;

const extensionConfig = {
	packageInfo: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')),
	dataPath: __dirname,
	nameSuffix: '-dev',
};

// See https://github.com/airdcpp-web/airdcpp-extension-js for usage information
RemoteExtension(
	require('../dist/main.js'), 
	require('./settings.js'), 
	extensionConfig
);