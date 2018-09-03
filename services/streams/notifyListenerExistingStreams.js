const activeStreamsRepository = require('../../state/activeStreamsRepository');
const notifyListener = require('../broadcast/notifyListener');
const constructStreamNotificationPayload = require('./constructStreamNotificationPayload');

/**
 * Send notification to the listener about each existing stream.
 * This service is used to notify a listener who has just connected.
 * @param {*} listener 
 */
module.exports = (listener) => {
    // For each stream the listener is subscribed to...
    for (const typeIndex in listener.dataTypes.streams) {
        const type = listener.dataTypes.streams[typeIndex];
        const streamsOfType = activeStreamsRepository.getStreamsByType(type);
        for (const streamIndex in streamsOfType) {
            const stream = streamsOfType[streamIndex];
            notifyListener(listener, 'stream', constructStreamNotificationPayload(stream));
        }
    }
}