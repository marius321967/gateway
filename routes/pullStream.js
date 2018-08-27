const authenticate = require('../services/auth/authenticate');
const verifyAuthorization = require('../services/auth/verifyAuthorization');
const activeStreamsRepository = require('../state/activeStreamsRepository');

module.exports = (req, res) => {
    var stream = null;
    authenticate(req.headers.authorization)
        .then(token => {
            stream = activeStreamsRepository.getStreamById(req.params.id);
            if (!stream) 
                throw new Error('STREAM_NOT_FOUND');
            return verifyAuthorization(
                token, 
                { streams: [stream.type] }, 
                'read');
        })
        .then(() => {
            res.header('Transfer-Encoding', 'chunked');
            stream.request.pipe(res); // Pipe data to response.
            // When stream ends, finish the request.
            stream.request.socket.once('close', () => res.end());
        });
}