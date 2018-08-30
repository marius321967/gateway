const pushEvent = require('./routes/pushEvent');
const pushStream = require('./routes/pushStream');
const pullStream = require('./routes/pullStream');

/**
 * Setup routes for clients to exchange data.
 * @param {*} app The Express server upon which to register the routes.
 */
module.exports = (app) => {
    // Route for pushing an event.
    app.post('/events', pushEvent);
    // Route for pushing a stream.
    app.post('/streams', pushStream);
    // Route for downloading a stream.
    app.get('/streams/:id', pullStream);
}