# airdcpp-runscript-extension

Extension to execute scripts (JavaScript) on certain events/hooks provided by the [AirDC++ Web Client](https://github.com/airdcpp-web/airdcpp-webclient).

## Configuration

The configuration consists of Executions which pair an event or a hook with a script. Executions for the same event/hook are executed asynchronously, so the scripts should never build on one another.

![Settings](doc/settings_screen.png?raw=true "Settings")

## Script execution

Scripts are currently executed by wrapping them in a [Function](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function) object.

## Variables

| Name | Type | Description
| :--- | :--- | :--- |
| **message** | object | The message send by the hook/event.
| **execution** | object | The execution object itself.
| **child_process** | module | Node.js [Child Process](https://nodejs.org/api/child_process.html) module, which can be used to run shell scripts/commands.
| **fs** | module | Node.js [File System](https://nodejs.org/api/fs.html) module to access local files.

The `execution` object itself contains:

| Name | Type | Description
| :--- | :--- | :--- |
| **index** | integer | Position of this execution in the configuration file.
| **event** | object | Object representation of the subsribed event/hook.
| **script** | string | The executed script.
| **socket** | module | The [Api socket](https://github.com/airdcpp-web/airdcpp-apisocket-js/blob/master/GUIDE.md)

Additionaly hook subscriptions also have acces to the `accept` and `reject` functions as described [here](https://github.com/airdcpp-web/airdcpp-apidocs/blob/master/communication-protocols.md#action-hooks).

## Resources

- [AirDC++ Web API reference](http://apidocs.airdcpp.net)
