const EventTypes = require('./EventTypes.js');

module.exports = [
	{
		key: 'executions',
		title: 'Executions',
		type: 'list',
		item_type: 'struct',
		default_value: null,
		optional: true,
		definitions: [
			{
				key: 'event',
				title: 'Event/Hook',
				type: 'string',
				optional: false,
				default_value: EventTypes[0].id,
				options: EventTypes
			},
			{
				key: 'script',
				title: 'Script',
				type: 'text',
				optional: false,
                default_value: ""
			}
		]
	}
];