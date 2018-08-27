const authenticate = require('../services/auth/authenticate');
const verifyAuthorization = require('../services/auth/verifyAuthorization');
const handleNewStream = require('../services/broadcast/handleNewStream');

module.exports = (req, res) => {
    const metaEncoded = req.query.meta || '';
    const metaRaw = Buffer.from(metaEncoded, 'base64').toString('ascii');
    var meta = null;
    if (metaRaw.length)
        meta = JSON.parse(metaRaw);
    const type = req.query.type;
    authenticate(req.headers.authorization)
        .then(token => {
            return verifyAuthorization(token, {streams: [type]}, 'write');
        })
        .then(() => {
            return handleNewStream(req, type, meta);
        })
        .then(() => {
            // Send response when stream upload ends.
            req.socket.on('close', () => res.send( {code: 'OK'} ) )
        })
        .catch(err => {
            const msg = err.message;
            if (msg === 'UNAUTHENTICATED' || msg === 'AUTH_UNRECOGNIZED_SCHEME' ||
                msg.startsWith('DATA_TYPE_UNAUTHORIZED')) {
                res.statusCode = 403;
            }
            res.statusCode = 400;
            res.send({ code: msg })
        })
}