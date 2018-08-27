const Stream = require('../../models/Stream');

/**
 * Generate HTTP path for retrieving the given stream.
 * @param {Stream} stream 
 */
module.exports = (stream) => {
    return '/streams/'+stream.id;
}