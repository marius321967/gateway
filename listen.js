const express = require('express');

/**
 * Setup listen server with Express.
 * Events will be provided via POST /event
 */
module.exports = () => {
    const app = express();
    app.use(express.json());
    // Setup routes
    app.post('/helloworld', (req, res) => {
        console.log('received: '+req.body);
        res.send({ msg: 'Hello World!' });
    })
    return app;
};