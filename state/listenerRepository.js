const Listener = require('../models/Listener');

const listeners = {}

/**
 * Ensure a list of listeners is created for 
 * the given data category and type.
 * @param {String} category 
 */
const ensureListReady = (category, type) => {
    if (listeners[category] == null)
        listeners[category] = {};
    if (listeners[category][type] == null)
        listeners[category][type] = [];
}

/**
 * Register listener for the given data category and type.
 * @param {Listener} listener 
 * @param {String} category Data category (events, streams, etc.)
 * @param {String} type Data type.
 */
exports.addListener = (listener, category, type) => {
    ensureListReady(category, type);
    listeners[category][type].push(listener);
}

/**
 * Get all active listeners for the given data category and type.
 */
exports.getListeners = (category, type) => {
    ensureListReady(category, type);
    return listeners[category][type];
}

/**
 * Remove listener from all lists of active listeners.
 * @param {Listener}
 */
exports.removeListener = (listener) => {
    // For each data category requested by the listener...
    for (let category in listener.dataTypes) {
        // For each data type in the category...
        for (let typeIndex in listener.dataTypes[category]) {
            // Remove listener from the list.
            const type = listener.dataTypes[category][typeIndex];
            const list = listeners[category][type];
            list.splice(list.indexOf(listener), 1);
        }
    }
}
