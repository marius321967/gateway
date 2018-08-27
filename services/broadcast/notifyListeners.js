const listenerRepository = require('../../state/listenerRepository');
const notifyListener = require('./notifyListener');

/**
 * Send notification to all listeners matching given data type.
 * Payload will additionally get appended the message type 'data',
 * category and data_type fields.
 * Resolves with null. Not expected to reject.
 * @param {String} category Data category (event, stream).
 * @param {String} type Data type.
 * @param {*} payload This payload will be sent, in addition to data category and type.
 * @return {Promise}
 */
module.exports = (category, type, payload) => {
    return new Promise((resolve, reject) => {
        // Retrieve listeners for this data type.
        const listeners = listenerRepository.getListeners(category, type);
        // Notify all listeners.
        for (let i in listeners)
            notifyListener(listeners[i], category, type, payload);
        return resolve();
    });
};