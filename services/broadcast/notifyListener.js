const listenerRepository = require('../../state/listenerRepository');
const sendWsMessage = require('../listen/sendWsMessage');

/**
 * Send notification to a listener about new data.
 * Payload will additionally get appended the message type 'data',
 * category and data_type fields.
 * Resolves with null. Not expected to reject.
 * @param {Listener} listener Whom to inform.
 * @param {String} messageType 'type' property in the root object of the message
 * that will be sent over Websocket. This is usually the singular version of the
 * data category.
 * @param {*} payload This payload will be sent, in addition to data category and type.
 * @return {Promise}
 */
module.exports = (listener, messageType, payload) => {
    return new Promise((resolve, reject) => {
        // Root message object.
        const message = {
            type: messageType,
            payload: payload
        };
        sendWsMessage(message, listener.connection);
        return resolve();
    });
};