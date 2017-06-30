'use strict';

const parameterPattern = /\$\{[a-zA-Z\.]*\}/;

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
}

Execution.prototype.register = async function (socket) {
    if (this.promise == null) {
        this.socket = socket;
        this.logger = socket.logger;
        if (this.event.hook) {
            this.promise = await socket.addHook(this.event.source, this.event.event, handleHook.bind(this, this));
        } else {
            this.promise = await socket.addListener(this.event.source, this.event.event, handleEvent.bind(this, this));
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
        eval(execution.script);
    } catch (error) {
        handleError(execution, error);
    }
};

const handleHook = async function (execution, message, accept, reject) {
    try {
        eval(execution.script);
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