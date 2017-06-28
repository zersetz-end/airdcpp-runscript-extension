const EventTypes = require('./EventTypes.js');
module.exports =  EventType;
function EventType(eventId) {
    console.log(eventId);
    this.id = eventId;
    this.hook = (eventId.indexOf("/hooks/") > 0);
    this.source = eventId.split('/')[1];
    this.event = eventId.split('/')[3];
    this.name = findName(eventId);
};

const findName = function (id) {
    var type;
    for (type of EventTypes) {
        if (type.id == id) {
            return type.name;
        }
    }
}

