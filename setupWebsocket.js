const expressWs = require('express-ws');
const handleNewConnection = require('./services/listen/handleNewConnection');

/**
 * Setup WebSocket on the given Express instance 
 * to distribute data to listeners.
 */
module.exports = (app) => {
    // Setup WebSocket module on the given server instance.
    expressWs(app);
    // Add ws route for listening for data.
    app.ws('/listen', handleNewConnection);
}