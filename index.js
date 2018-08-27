const setupHttp = require('./setupHttp');
const setupWebsocket = require('./setupWebsocket');
const express = require('express');

// Initialize server.
const app = express();
// Setup HTTP routes.
setupHttp(app);
// Setup Websocket module on the same server.
setupWebsocket(app);
// Start server.
console.log('Listening on port 8000')
app.listen(8000);
