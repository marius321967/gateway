const state = require('../../state');
const Listener = require('../../models/Listener');
const listenerRepository = require ('../../state/listenerRepository');

/**
 * In given state, add given webSocket connection as listener
 * to all requested events.
 * Resolves with null. Not expected to reject.
 * @param {Listener} listener 
 * @param {Object} events List of events to listen to.
 * @param {Object} state Root of /state.js
 * @return {Promise}
 */
module.exports = (listener, types, state) => {
    return new Promise((resolve, reject) => {
        // Register listener to events.
        // For each data category...
        for (let category in types) {
            // For each data type in the category...
            for (let typeIndex in types[category]) {
                // Add listener to the repository.
                const type = types[category][typeIndex];
                listenerRepository.addListener(listener, category, type);
            }
        }
        listener.dataTypes = types; // Assign same list of data types to the listener, so we can backtrack.
        return resolve();
    });
};