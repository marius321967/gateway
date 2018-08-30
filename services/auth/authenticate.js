const authenticateBasic = require('./authenticateBasic');
const schemes = {
    Basic: authenticateBasic
    // ...
    // Add your own custom token validators here.
    // eg. Bearer: authenticateDynamicToken
}

/**
 * Authenticate using credentials.
 * Credentials format: <scheme> <token>
 * Read more in project's wiki.
 * Resolves with authenticated user. User's model depends on scheme.
 * Rejects with AUTH_UNRECOGNIZED_SCHEME, UNAUTHENTICATED.
 * @param {String} credentials 
 * @return {Promise}
 */
module.exports = (credentials) => {
    return new Promise((resolve, reject) => {
        // Validate credentials format.
        if (!credentials)
            return reject(new Error('UNAUTHENTICATED'));
        // Read authentication schema and token off the credentials.
        const parts = credentials.split(' ', 2);
        const scheme = parts[0],
              token = parts[1];
        if (!schemes[scheme])
            return reject(new Error('AUTH_UNRECOGNIZED_SCHEME'));
        // Validate the token itself depending on the scheme.
        schemes[scheme](token)
            .then(client => {
                return resolve(client);
            })
            .catch(() => {
                return reject(new Error('UNAUTHENTICATED'));
            });
    });
}