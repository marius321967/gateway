/**
 * Serialize and send message to given listener.
 * Serializes to JSON.
 * Resolves with null. Not expected to reject.
 * @param {Object} message The message to send.
 * @param {*} connection WebSocket connection.
 */
module.exports = (message, connection) => {
    return new Promise((resolve, reject) => {
        const serialized = JSON.stringify(message);
        connection.send(serialized);
        return resolve();
    });
}