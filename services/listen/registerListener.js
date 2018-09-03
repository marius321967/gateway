const Listener = require('../../models/Listener');
const listenerRepository = require ('../../state/listenerRepository');

/**
 * Register listener to be notified to all given data types.
 * 
 * Assigns those types to the listener itself in dataTypes property.
 * This is used to backtrack which data types the listener is 
 * subscribed to.
 * 
 * Resolves with null. Not expected to reject.
 * @param {Listener} listener 
 * @param {Object} types Lists of data type strings for each data category.
 * @return {Promise}
 */
module.exports = (listener, types) => {
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
        // Assign the same list of data types to the listener itself, so we have a reverse reference.
        listener.dataTypes = types; 
        return resolve();
    });
};