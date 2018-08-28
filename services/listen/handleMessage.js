const parseWsMessage = require('./parseWsMessage');
const verifyAuthorization = require('../auth/verifyAuthorization');
const registerListener = require('./registerListener');
const sendWsMessage = require('./sendWsMessage');
const authenticate = require('../auth/authenticate');
const notifyListenerExistingStreams = require('../broadcast/notifyListenerExistingStreams');

/**
 * Handle message send over WebSocket by the client/listener.
 * @param {Listener} listener The client who sent the message.
 * @param {String} rawMessage 
 */
module.exports = (listener, rawMessage) => {
    var message;
    // First serialize message into an object before validating.
    parseWsMessage(rawMessage)
        .then(message2 => {
            message = message2;
            // Verify the provided authentication token.
            return authenticate(message.authentication);
        })
        .then(token => {
            // We now know the client's identity.
            // Check whether the authenticated client is allowed.
            return verifyAuthorization(token, message.types, 'read');
        })
        .then(() => {
            // The client is authenticated and authorized to perform
            // the requested actions.
            // Register them as an active listener in the repository.
            return registerListener(listener, message.types);
        })
        .then(() => {
            // Send OK because we haven't jumped to catch().
            return sendWsMessage({
                type: 'init',
                code: 'OK'
            }, listener.connection);
        })
        .then(() => {
            // The listener is now online. If there are any active streams
            // at the moment, immediately notify about them.
            notifyListenerExistingStreams(listener);
        })
        .catch(err => {
            // Reached this due to an error. Send the error message.
            return sendWsMessage({
                type: 'init',
                // This should hopefully be an error code from one of the services 
                // and not a text.
                code: err.message 
            }, listener.connection);
        });
};