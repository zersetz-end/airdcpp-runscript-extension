# airdcpp-runscript-extension [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

Extension to execute scripts (JavaScript) on certain events/hooks provided by the [AirDC++ Web Client](https://github.com/airdcpp-web/airdcpp-webclient) or controlled by [cron](https://www.npmjs.com/package/node-cron) statement.

## Configuration

The configuration consists of 3 sections for events, hooks and schedules. Executions for the same event/hook are executed asynchronously, so the scripts should never build on one another.

![Settings](doc/settings_screen.png?raw=true "Settings")

## Script execution

Scripts are currently executed by wrapping them in a [AsyncFunction](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) object.

## Parameter

The following parameters are defined:

| Name | Type | Description
| :--- | :--- | :--- |
| **socket** | object | The [Api socket](https://github.com/airdcpp-web/airdcpp-apisocket-js/blob/master/GUIDE.md)
| **require** | function | Module.require(id) function to load additional modules in the script
| **message** | object | (Hook and event only) Received message
| **accept** | function | (Hook only) Function to accept the validation ([documentation](https://github.com/airdcpp-web/airdcpp-apidocs/blob/master/communication-protocols.md#action-hooks))
| **reject** | function | (Hook only) Function to reject the validation ([documentation](https://github.com/airdcpp-web/airdcpp-apidocs/blob/master/communication-protocols.md#action-hooks))

Resulting method signatures for each execution type:

```javascript
async cron(socket, require){
    // your script code
}

async event(socket, require, message){
    // your script code
}

async hook(socket, require, message, accept, reject){
    // your script code
}
```

## Resources

- [AirDC++ Web API reference](http://apidocs.airdcpp.net)

[build-badge]: https://img.shields.io/travis/zersetz-end/airdcpp-runscript-extension/master.svg?style=flat-square
[build]: https://travis-ci.com/zersetz-end/airdcpp-runscript-extension

[npm-badge]: https://img.shields.io/npm/v/airdcpp-runscript-extension.svg?style=flat-square
[npm]: https://www.npmjs.com/package/airdcpp-runscript-extension