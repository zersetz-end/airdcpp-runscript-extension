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

const CronJob = require('cron').CronJob;

const parameter = [];

const register = async(socket, config, callback)=>{
    var task = new CronJob(config['cron'],callback,null,true,null);
    return function(){
        task.stop();
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