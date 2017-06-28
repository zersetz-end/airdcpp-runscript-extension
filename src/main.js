'use strict';

import Execution from './Execution';
import EventType from './EventType';

const settingsDefinition = require('./settings.js');

const parameterPattern = /\$\{[a-zA-Z\.]*\}/;
const CONFIG_VERSION = 1;

// Settings manager docs: https://github.com/airdcpp-web/airdcpp-extension-settings-js
const SettingsManager = require('airdcpp-extension-settings');

var executions = [];

function clearExecutions(socket) {
	var execution;
	for(execution of executions){
		execution.unregister();
	}
	executions = [];
}

const updateExecutions = function (socket, extension, settings) {
	clearExecutions(socket);
	var executionConfigs = settings['executions'];
	// Collecting unique event types
	for (var i = 0;i< executionConfigs.length;i+=1) {
		var execution = new Execution(i,new EventType(executionConfigs[i]['event']), executionConfigs[i]['script']);
		execution.register(socket);
		executions.push(execution);
	}
};

// Entry point docs: https://github.com/airdcpp-web/airdcpp-extension-js#extension-entry-structure
module.exports = function (socket, extension) {
	const settings = SettingsManager(socket, {
		extensionName: extension.name,
		configFile: extension.configPath + 'config.json',
		configVersion: CONFIG_VERSION,
		definitions: settingsDefinition
	});

	settings.onValuesUpdated = updateExecutions.bind(this, socket, extension);

	const subscriberInfo = {
		id: extension.name,
		name: 'Runscript'
	};

	extension.onStart = async (sessionInfo) => {
		await settings.load();
	};

	extension.onStop = () => {

	};

};