const notifyListeners = require('../services/broadcast/notifyListeners');
const authenticate = require('../services/auth/authenticate');
const verifyAuthorization = require('../services/auth/verifyAuthorization');

module.exports = (req, res) => {
    authenticate(req.headers.authorization)
        .then(token => {
            return verifyAuthorization(
                    token, 
                    { events: [req.body.type] }, 
                    'write');
        })
        .then(() => {
            return notifyListeners('events', req.body.type, 
            {
                meta: req.body.meta,
                data: req.body.data
            });
        })
        .then(() => {
            res.send({ code: 'OK' });
        })
        .catch(err => {
            const msg = err.message;
            if (msg === 'UNAUTHENTICATED' || msg === 'AUTH_UNRECOGNIZED_SCHEME' ||
                msg.startsWith('DATA_TYPE_UNAUTHORIZED')) {
                // console.warn('Warning: unauthenticated request from IP '+req.connection.remoteAddress);
                res.statusCode = 403;
                return res.send({code: msg})
            }
            res.statusCode = 400;
            res.send({ code: "INVALID_BODY" })
        })
}