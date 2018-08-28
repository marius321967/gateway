const expressWs = require('express-ws');
const handleNewConnection = require('./services/listen/handleNewConnection');

/**
 * Setup WebSocket boardcast server to distribute events to listeners.
 */
module.exports = (app) => {
    // Setup WebSocket module.
    expressWs(app); 
    // Add route for listening for data.
    app.ws('/listen', handleNewConnection);
}