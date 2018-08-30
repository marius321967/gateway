const express = require('express');
const routes = require('./routes');

/**
 * Configure the Express HTTP server.
 * Enables JSON parsing for incoming requests and
 * sets up all routes.
 */
module.exports = (app) => {
    // Auto-parse JSON body on each POST request.
    app.use(express.json());
    // Register routes on the given Express app.
    routes(app);
};