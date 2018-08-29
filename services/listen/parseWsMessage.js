/**
 * Parse and validate JSON message sent over websocket.
 * @param {String} message Raw message string from WebSocket.
 * @return {Object} The parsed message.
 * @throws {Error} INVALID_SYNTAX or INVALID_TYPES_MISSING
 */
module.exports = (message) => {
    return new Promise((resolve, reject) => {
        // Decode.
        try {message = JSON.parse(message)}
        catch (e) {
            return reject(new Error('INVALID_SYNTAX'));
        }
        // Validate message contents.
        if (message.types === null)
            return reject(new Error('INVALID_TYPES_MISSING'));
        return resolve(message);
    });
}