const handleMessage = require('./handleMessage');
const handleDisconnect = require('./handleDisconnect');
const Listener = require('../../models/Listener');

module.exports = (connection) => {
    // Create empty listener.
    const listener = new Listener(connection, false, {});
    // Handle new messages from listener.
    connection.on('message', m => handleMessage(listener, m));
    // Handle disconnection of listener.
    connection.on('close', () => handleDisconnect(listener));
};
