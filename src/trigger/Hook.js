const compare = function (a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

const types = [
    {
        id: '/hubs/hooks/hub_incoming_message_hook',
        name: '/hubs/hooks/hub_incoming_message_hook'
    }
    , {
        id: '/hubs/hooks/hub_outgoing_message_hook',
        name: '/hubs/hooks/hub_outgoing_message_hook'
    }
    , {
        id: '/private_chat/hooks/private_chat_incoming_message_hook',
        name: '/private_chat/hooks/private_chat_incoming_message_hook'
    }
    , {
        id: '/private_chat/hooks/private_chat_outgoing_message_hook',
        name: '/private_chat/hooks/private_chat_outgoing_message_hook'
    }
    ,  {
        id: '/queue/hooks/queue_file_finished_hook',
        name: '/queue/hooks/queue_file_finished_hook'
    }
    , {
        id: '/queue/hooks/queue_bundle_finished_hook',
        name: '/queue/hooks/queue_bundle_finished_hook'
    }
].sort(compare);

const settings = [
    {
        key: 'path',
        title: 'Path',
        type: 'string',
        description: 'Event the script should be executed for.',
        optional: false,
        default_value: types[0].id,
        options: types
    }
];

const parameter = ['message', 'accept', 'reject'];

const register = async(socket, config, callback)=>{
    return await socket.addHook(config.path.split('/')[1], config.path.split('/')[3], scriptFunction);
};

const id = 'hook';
const name = 'Hook';
const description = 'Executes a script based on validation hooks.';

export default {
    settings,
    parameter,
    register,
    id,
    name,
    description
}