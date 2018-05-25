/**
 * Removes given listener connection from all events.
 * Resolves with null. Not expected to reject.
 * @param {*} connection WebSocket connection.
 * @param {Object} state Root of /state.js
 * @return {Promise}
 */
module.exports = (connection, state) => {
    return new Promise((resolve, reject) => {
        for (let event in state.listeners) {
            let index = state.listeners[event].indexOf(connection);
            if (index == -1) // Connection not listening to this event.
                continue;
            state.listeners[event].splice(index, 1);
        }
        return resolve();
    });
}