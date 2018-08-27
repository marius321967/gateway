const expressWs = require('express-ws');
const handleNewConnection = require('./services/listen/handleNewConnection');

/**
 * Setup WebSocket boardcast server to distribute events to listeners.
 */
module.exports = (app) => {
    expressWs(app);
    // Setup listen route.
    app.ws('/listen', handleNewConnection);
}