const setupHttp = require('./setupHttp');
const setupWebsocket = require('./setupWebsocket');
const express = require('express');

// Initialize server instance.
const app = express();
// Setup HTTP on the server.
setupHttp(app);
// Setup Websocket module on the same server.
setupWebsocket(app);
// Start the server.
console.log('Listening on port 8000');
app.listen(8000);
