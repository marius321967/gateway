const generateStreamPath = require('../streams/generateStreamPath');

module.exports = (stream) => {
    return {
        url: generateStreamPath(stream)
    };
}