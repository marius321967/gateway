const handleMessage = require('./handleMessage');
const handleDisconnect = require('./handleDisconnect');
const Listener = require('../../models/Listener');

/**
 * Handle new WebSocket connection for listening for data.
 * Sets up handlers for when a new message is received
 * and when the connection closes.
 * @param {*} connection 
 */
module.exports = (connection) => {
    // Create empty listener (without data types assigned).
    const listener = new Listener(connection, false, {});
    // Handle new messages from listener.
    connection.on('message', m => handleMessage(listener, m));
    // Handle disconnection of listener.
    connection.on('close', () => handleDisconnect(listener));
};
