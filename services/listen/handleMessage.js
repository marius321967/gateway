const parseWsMessage = require('./parseWsMessage');
const verifyAuthorization = require('../auth/verifyAuthorization');
const registerListener = require('./registerListener');
const sendWsMessage = require('./sendWsMessage');
const authenticate = require('../auth/authenticate');
const state = require('../../state');
const Listener = require('../../models/Listener');
const notifyListenerExistingStreams = require('../broadcast/notifyListenerExistingStreams');

module.exports = (listener, rawMessage) => {
    var message;
    parseWsMessage(rawMessage)
        .then(message2 => {
            message = message2;
            return authenticate(message.authentication);
        })
        .then(token => {
            // Check whether client is allowed
            return verifyAuthorization(token, message.types, 'read');
        })
        .then(() => {
            return registerListener(listener, message.types);
        })
        // Send OK or error.
        .then(() => {
            return sendWsMessage({
                type: 'init',
                code: 'OK'
            }, listener.connection);
        })
        .then(() => notifyListenerExistingStreams(listener) )
        .catch(err => {
            return sendWsMessage({
                type: 'init',
                code: err.message
            }, listener.connection);
        });
};