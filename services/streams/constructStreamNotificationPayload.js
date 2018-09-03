const generateStreamPath = require('../streams/generateStreamPath');

/**
 * Generate message payload for notifying listener about a new
 * stream.
 * @param {*} stream 
 */
module.exports = (stream) => {
    return {
        type: stream.type,
        url: generateStreamPath(stream)
    };
}