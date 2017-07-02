'use strict';

const parameterPattern = /\$\{[a-zA-Z\.]*\}/;

const vm = require('vm');
const fs = require('fs');
const child_process = require('child_process');

// Public
module.exports = Execution;
function Execution(index, event, script) {
    this.index = index;
    this.event = event;
    this.script = script;
    this.promise = null;
    this.socket = null;
    this._function = null;
}

Execution.prototype.register = async function (socket) {
    if (this.promise == null) {
        this.socket = socket;
        this.logger = socket.logger;
        if (this.event.hook) {
            this._function = new Function('execution','fs','child_process','message','accept', 'reject',this.script);
            this.promise = await socket.addHook(this.event.source, this.event.event, handleHook.bind(this, this));
            this.logger.info(`Registered: ${this.event.name}[${this.index}]`);
        } else {
            this._function = new Function('execution','fs','child_process','message',this.script);
            this.promise = await socket.addListener(this.event.source, this.event.event, handleEvent.bind(this, this));
            this.logger.info(`Registered: ${this.event.name}[${this.index}]`);
        }
    }
};

Execution.prototype.unregister = function () {
    if (this.promise != null) {
        this.promise();
        this.promise = null;
    }
};

const handleEvent = async function (execution, message) {
    try {
        execution.logger.verbose(`Executing: ${execution.event.name}[${execution.index}]`);
        this._function(execution,  fs, child_process, message);
    } catch (error) {
        handleError(execution, error);
    }
};

const handleHook = async function (execution, message, accept, reject) {
    try {
        execution.logger.verbose(`Executing: ${execution.event.name}[${execution.index}]`);
        this._function(execution,  fs, child_process, message, accept, reject);
    } catch (error) {
        handleError(execution, error);
    }
};

const handleError = function (execution, error) {
    var errorText = `Script execution failed for event "${execution.event.name}", index ${execution.index}: ${error}`;
    execution.socket.logger.error(errorText);
    execution.socket.post('events', {
        text: errorText,
        severity: 'error'
    });
}