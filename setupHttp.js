const express = require('express');
const routes = require('./routes');

/**
 * Setup listen server with Express.
 * Events will be provided via POST /event
 */
module.exports = (app) => {
    // Auto-parse JSON body on each POST request.
    app.use(express.json());
    // Register routes on the given Express app.
    routes(app);
};