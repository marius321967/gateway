const WebSocket = require('ws');
const http = require('http');
/**
 * Setup WebSocket boardcast server to distribute events to listeners.
 */
module.exports = () => {
    const server = http.createServer();
    const wss = new WebSocket.Server({ server });
    
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            ws.send('Xx'+message+'xX');
        });
    });
    return {httpSrv: server, wsSrv: wss};
}