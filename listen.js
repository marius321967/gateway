const express = require('express');
const state = require('./state');
const notifyListeners = require('./services/listen/notifyListeners');

/**
 * Setup listen server with Express.
 * Events will be provided via POST /event
 */
module.exports = () => {
    const app = express();
    app.use(express.json());
    // Setup routes.
    app.post('/event', (req, res) => {
        notifyListeners(req.body, state)
            .then(() => {
                res.send({ code: 'OK' });
            })
            .catch(() => {
                res.statusCode = 400;
                res.send({ code: "INVALID_BODY" })
            })
    });
    return app;
};