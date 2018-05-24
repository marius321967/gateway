/**
 * In given state, add given webSocket connection as listener
 * to all requested events.
 * Resolves with null. Not expected to reject.
 * @param {String[]} events List of events to listen to.
 * @param {Object} state Root of /state.js
 * @return {Promise}
 */
module.exports = (connection, events, state) => {
    return new Promise((resolve, reject) => {
        // Register listener to events.
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (state.listeners[event] == null)
                state.listeners[event] = []; // Create space for listeners of this event.
            if (state.listeners[event].indexOf(connection) > -1)
                continue; // Don't duplicate.
            state.listeners[event].push(connection);
        }
        return resolve();
    });
};