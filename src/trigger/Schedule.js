const settings = [
    {
        key: 'cron',
        title: 'Cron Schedule',
        type: 'string',
        description: 'Cron-style schedule',
        optional: false,
        default_value: ''
    }
];

const cron = require('node-cron');

const parameter = [];

const register = async(socket, config, callback)=>{
    var task = cron.schedule(config['cron'], callback);
    return function(){
        task.destroy();
    }
};

const id = 'schedule';
const name = 'Schedule';
const description = 'Executes a script based on cron schedules.';

export default {
    settings,
    parameter,
    register,
    id,
    name,
    description
}