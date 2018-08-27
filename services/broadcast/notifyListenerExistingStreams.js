const activeStreamsRepository = require('../../state/activeStreamsRepository');
const notifyListener = require('./notifyListener');
const constructStreamNotification = require('./constructStreamNotification');

module.exports = (listener) => {
    // For each stream the listener is subscribed to...
    for (const typeIndex in listener.dataTypes.streams) {
        const type = listener.dataTypes.streams[typeIndex];
        const streamsOfType = activeStreamsRepository.getStreamsByType(type);
        for (const streamIndex in streamsOfType) {
            const stream = streamsOfType[streamIndex];
            notifyListener(listener, 'streams', type, constructStreamNotification(stream));
        }
    }
}