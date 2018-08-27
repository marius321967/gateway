const Token = require('../../models/Token');

/**
 * Verify whether the given token holder has access
 * to listening for all of their requested data types.
 * @param {Token} token Registered token holder.
 * @param {Object} requestedTypes Requested data types.
 *  The argument must be an object with data categories 
 *  containing arrays of types requested by the owner of the token.
 * @param {String} requestedAction The permission to check for. 
 *  Possible values: 'read' or 'write'.
 * @throws {Error} With DATA_TYPE_UNAUTHORIZED:<category>:<type> if a type 
 *  that is not allowed to the given client was requested.
 */
module.exports = (token, requestedTypes, requestedAction) => {
    // For each data category in requested types...
    for (let category in requestedTypes) {
        // For each data type in the category...
        for (let typeIndex in requestedTypes[category]) {
            // Check whether the client is allowed.
            const type = requestedTypes[category][typeIndex];
            if (token.dataTypes[category] == null || // Check whether anything in this data category is allowed
                token.dataTypes[category][type] == null || // Check whether any permissions given on this data type
                token.dataTypes[category][type][requestedAction] !== true) { // Check whether the required action is allowed.
                throw new Error('DATA_TYPE_UNAUTHORIZED:'+category+':'+type)
            }
        }
    }
}