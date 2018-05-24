const sendWsMessage = require('../broadcast/sendWsMessage');

/**
 * Send notification to all listeners of event (if any).
 * Resolves with null. Not expected to reject.
 * @param {*} event Body of POST /event. For schema, see project's wiki.
 * @param {*} state Application state, root of /state.js. Must contain listeners object.
 * @return {Promise}
 */
module.exports = (event, state) => {
    return new Promise((resolve, reject) => {
        const listeners = state.listeners[event.event];
        if (!listeners) 
            return resolve();
        // Notify all listeners.
        for (let i = 0; i < listeners.length; i++) 
            // Notify this listener.
            sendWsMessage({
                type: 'event',
                event: event.event,
                data: event.data
            }, listeners[i]);
        return resolve();
    });
};