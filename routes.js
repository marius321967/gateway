const pushEvent = require('./routes/pushEvent');
const pushStream = require('./routes/pushStream');
const pullStream = require('./routes/pullStream');

/**
 * Express server app upon which to register the routes.
 * @param {*} app 
 */
module.exports = (app) => {
    app.post('/events', pushEvent);
    app.post('/streams', pushStream);
    app.get('/streams/:id', pullStream);
}