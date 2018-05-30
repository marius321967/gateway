const fs = require('fs');
const http = require('http');
const https = require('https');

/**
 * Checks whether HTTPS_ENABLE is 'true', then returns a createServer() instance
 * of either an HTTP or HTTPS server. Provides optional app to createServer(). 
 * If HTTPS, loads /certs/cert.key and /certs/cert.crt files.
 * @param {*} app Optional app argument to provide to createServer().
 */
module.exports = (app) => {
    const enableHttps = process.env.HTTPS_ENABLE == 'true' || false;
    if (enableHttps) 
        return https.createServer({
            key: fs.readFileSync('./certs/cert.key'),
            cert: fs.readFileSync('./certs/cert.crt')
        }, app);
    else 
        return http.createServer(app);
}