'use strict';

const CONFIG_VERSION = 3;

// Settings manager docs: https://github.com/airdcpp-web/airdcpp-extension-settings-js
const SettingsManager = require('airdcpp-extension-settings');

const fs = require('fs');
const Module = require('module');
const domain = require('domain');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const triggers = require('./triggers').default
const _ = require('underscore');

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

function unregister(item){
	try{
		item.domain.exit();
		item.unregister();
		var index = registered.indexOf(item);
		if(index > -1){
			registered.splice(index, 1);
		}
		item.socket.post('events',
		{
			text: `Unregistered: ${JSON.stringify(item.config)}`,
			severity: 'info'
		});
	} catch (error) {
		item.socket.logger.error(`Failed to unregister: ${JSON.stringify(item.config)} Error: ${error}`);
		item.socket.post('events',
		{
			text: `Failed to unregister: ${JSON.stringify(item.config)} Error: ${error.message}`,
			severity: 'warn'
		});
	}
}; 

const register = async function(socket, trigger, config){
	try{
		var functionParameter = parameter.concat(trigger.parameter);
		var script = fs.readFileSync(config.script,"UTF-8");
		var scriptFunction = new AsyncFunction(functionParameter.join(), script);
		var d = domain.create();
		d.on('error', handleError.bind(this, socket, config));
		var callback = d.bind(scriptFunction.bind(this, socket, Module.prototype.require));
		var item = {
			triggerId: trigger.id,
			config: config,
			socket: socket,
			unregister: await trigger.register(socket, config, callback),
			domain: d
		};
		registered.push(item);
		socket.post('events',
		{
			text: `Registered: ${JSON.stringify(config)}`,
			severity: 'info'
		});
	} catch (error) {
		socket.logger.error(`Failed to register: ${JSON.stringify(config)} Error: ${error}`);
		socket.post('events',
		{
			text: `Failed to register: ${JSON.stringify(config)} Error: ${error.message}`,
			severity: 'warn'
		});
	}
};

const updateRegistered = async function (socket, extension, settings) {
	triggers.map(async function (trigger) {
		var triggerConfigs = settings[trigger.id];
		if (triggerConfigs) {
			registered.filter(item => item.triggerId == trigger.id && triggerConfigs.filter(config => _.isEqual(item.config, config)).length == 0)
					.forEach(item => unregister(item));
			triggerConfigs.filter(config => registered.filter(item => item.triggerId == trigger.id && _.isEqual(item.config, config)).length == 0)
					.forEach(config => register(socket, trigger, config));
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
		registered.forEach(item => unregister(item));
	};

};