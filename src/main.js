'use strict';

const CONFIG_VERSION = 3;

// Settings manager docs: https://github.com/airdcpp-web/airdcpp-extension-settings-js
const SettingsManager = require('airdcpp-extension-settings');

const fs = require('fs');
const Module = require('module');
const domain = require('domain');

import triggers from './triggers';

var registered = [];

const parameter = [
	'socket',
	'require'
];

const scriptSettings = [{
	key: 'script',
	title: 'Script',
	type: 'file_path',
	optional: false,
	default_value: ""
}];

const settingsDef = triggers.map(function (type) {
	return {
		key: type.id,
		title: type.name,
		description: type.description,
		type: 'list',
		item_type: 'struct',
		optional: true,
		default_value: null,
		definitions: type.settings.concat(scriptSettings)
	};
});

function clearRegistered(socket) {
	var item;
	for (item of registered) {
		item.domain.exit();
		item.unregister();
		socket.logger.info(`Unregistered: ${JSON.stringify(item.config)}`);
	}
	registered = [];
}

const updateRegistered = async function (socket, extension, settings) {
	clearRegistered(socket);
	triggers.map(async function (trigger) {
		var triggerConfigs = settings[trigger.id];
		if (triggerConfigs) {
			var config;
			for (config of triggerConfigs) {
				var functionParameter = parameter.concat(trigger.parameter);
				var script;
				try{
					script = fs.readFileSync(config.script,"UTF-8");
					var scriptFunction = new Function(functionParameter.join(), script);
					var d = domain.create();
					d.on('error', handleError.bind(this, socket, config));
					var callback = d.bind(scriptFunction.bind(this, socket, Module.prototype.require));
					var item = {
						config: config,
						socket: socket,
						unregister: await trigger.register(socket, config, callback),
						domain: d
					};
					registered.push(item);
					socket.logger.info(`Registered: ${JSON.stringify(config)}`);
				} catch (error) {
					handleError(socket, config, error);
				}
			}
		}
	});
};

const handleError = function (socket, config, error) {
	var prefix = `[runscript:${config.script}]`;
	socket.logger.error(`${prefix}${error}`);
	socket.post('events', {
		text: `${prefix}${error.stack}`,
		severity: 'error'
	});
};

// Entry point docs: https://github.com/airdcpp-web/airdcpp-extension-js#extension-entry-structure
module.exports = function (socket, extension) {
	const settingsManager = SettingsManager(socket, {
		extensionName: extension.name,
		configFile: extension.configPath + 'config.json',
		configVersion: CONFIG_VERSION,
		definitions: settingsDef
	});

	settingsManager.onValuesUpdated = updateRegistered.bind(this, socket, extension);

	const migrateConfig = (loadedConfigVersion, loadedData) =>{
		if(loadedConfigVersion < 2){
			var config = {
				"event": [],
				"hook":[]
			};
			var exec;
			for(exec of loadedData.executions){
				var array;
				if(exec.event.indexOf('hooks') > 0){
					config.hook.push({
						"path": exec.event,
						"script": exec.script
					});;
				}else{
					config.event.push({
						"path": exec.event,
						"script": exec.script
					});;
				}
				array
			}
			return config;
		}else if(loadedConfigVersion < 3){
			triggers.map((trigger) => {
				var index = 0;
				var triggerConfigs = loadedData[trigger.id];
				if (triggerConfigs) {
					var item;
					for (item of triggerConfigs) {
						var scriptFile = `${extension.configPath}${trigger.id}-${index}.js`;
						fs.writeFileSync(scriptFile, item.script);
						item.script = scriptFile;
						socket.post('events', {
							text: `Script ${trigger.id}-${index} saved to ${scriptFile}`,
							severity: 'info'
						});
						index++;
					}
				}
			});
			return loadedData;
		}
	};

	extension.onStart = async (sessionInfo) => {
		await settingsManager.load(migrateConfig);
	};

	extension.onStop = () => {
		clearRegistered(socket);
	};

};