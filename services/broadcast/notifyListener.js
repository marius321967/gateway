const listenerRepository = require('../../state/listenerRepository');
const sendWsMessage = require('../listen/sendWsMessage');

/**
 * Send notification to a listener about new data.
 * Payload will additionally get appended the message type 'data',
 * category and data_type fields.
 * Resolves with null. Not expected to reject.
 * @param {Listener} listener Whom to inform.
 * @param {String} category Data category (event, stream).
 * @param {String} type Data type.
 * @param {*} payload This payload will be sent, in addition to data category and type.
 * @return {Promise}
 */
module.exports = (listener, category, type, payload) => {
    return new Promise((resolve, reject) => {
        // Merge payload and message parameters.
        const message = Object.assign(
            payload, 
            {
                type: 'data',
                category: category,
                data_type: type,
            })
        sendWsMessage(message, listener.connection);
        return resolve();
    });
};