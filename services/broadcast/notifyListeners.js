const listenerRepository = require('../../state/listenerRepository');
const notifyListener = require('./notifyListener');

/**
 * Send notification to all listeners matching given data type.
 * Payload will additionally get appended the message type 'data',
 * category and data_type fields.
 * Resolves with null. Not expected to reject.
 * @param {String} category Data category (event, stream).
 * @param {String} type Data type.
 * @param {String} messageType 'type' property in the root object of the message
 * that will be sent over Websocket. This is usually the singular version of the
 * data category.
 * @param {*} payload This payload will be sent, in addition to data category and type.
 * @return {Promise}
 */
module.exports = (category, type, messageType, payload) => {
    return new Promise((resolve, reject) => {
        // Retrieve listeners for this data type.
        const listeners = listenerRepository.getListeners(category, type);
        // Notify all listeners.
        for (let i in listeners)
            notifyListener(listeners[i], messageType, payload);
        return resolve();
    });
};