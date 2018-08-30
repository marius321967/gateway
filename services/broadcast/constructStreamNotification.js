const generateStreamPath = require('../streams/generateStreamPath');

/**
 * Construct an object which will be sent to listener
 * to notify them about a new stream. General parameters for any
 * new data notification are not included, only those specific to
 * streams.
 * @param {*} stream 
 */
module.exports = (stream) => {
    return {
        url: generateStreamPath(stream)
    };
}