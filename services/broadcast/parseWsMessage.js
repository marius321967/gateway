/**
 * Parse and validate WebSocket message string.
 * Parses JSON.
 * Resolves with parsed message (object).
 * Rejects with INVALID_SYNTAX, INVALID_EVENTS_MISSING
 * @param {String} message Message from WebSocket.
 * @return {Promise}
 */
module.exports = (message) => {
    return new Promise((resolve, reject) => {
        try {message = JSON.parse(message)}
        catch (e) { 
            return reject(new Error('INVALID_SYNTAX'));
        }
        if (message.events === null || !Array.isArray(message.events))
            return reject(new Error('INVALID_EVENTS_MISSING'));
        return resolve(message);
    });
}