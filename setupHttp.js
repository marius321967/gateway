const express = require('express');
const routes = require('./routes');

/**
 * Setup listen server with Express.
 * Events will be provided via POST /event
 */
module.exports = (app) => {
    app.use(express.json());
    routes(app);
};