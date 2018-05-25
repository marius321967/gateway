const express = require('express');
const state = require('./state');
const notifyListeners = require('./services/listen/notifyListeners');
const authenticate = require('./services/auth/authenticate');

/**
 * Setup listen server with Express.
 * Events will be provided via POST /event
 */
module.exports = () => {
    const app = express();
    app.use(express.json());
    // Setup routes.
    app.post('/event', (req, res) => {
        authenticate(req.headers.authorization)
            .then(() => {
                return notifyListeners(req.body, state);
            })
            .then(() => {
                res.send({ code: 'OK' });
            })
            .catch(err => {
                const msg = err.message;
                if (msg === 'UNAUTHENTICATED' || msg === 'AUTH_UNRECOGNIZED_SCHEME') {
                    res.statusCode = 403;
                    return res.send({code: msg})
                }
                res.statusCode = 400;
                res.send({ code: "INVALID_BODY" })
            })
    });
    return app;
};