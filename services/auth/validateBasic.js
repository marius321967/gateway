const fs = require('fs');

/**
 * Checks with /tokens file whether given token is valid.
 * Resolves with empty object.
 * Rejects with: UNAUTHENTICATED,
 * ERR_SERVER if file read failed.
 * @param {String} token Authentication token to check.
 */
module.exports = (token) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./tokens/tokens', (err, data) => {
            if (err)
                return reject(new Error('ERR_SERVER'));

            const tokens = data.toString().split( /(?:\r\n|\r|\n)/g );
            for (let i = 0; i < tokens.length; i++) 
                if (tokens[i].length >= 16 && token == tokens[i])
                    return resolve( {} );
            return reject(new Error('UNAUTHENTICATED'));
        });
    });
};