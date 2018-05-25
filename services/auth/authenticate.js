const validateBasic = require('./validateBasic');
const schemes = {
    Basic: validateBasic
    // ...
    // eg. Bearer validateFirebase
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
        if (!credentials)
            return reject(new Error('UNAUTHENTICATED'));
        const parts = credentials.split(' ', 2);
        const scheme = parts[0];
        const token = parts[1];
        if (!schemes[scheme])
            return reject(new Error('AUTH_UNRECOGNIZED_SCHEME'));
        schemes[scheme](token)
            .then(resolve)
            .catch(() => {
                return reject(new Error('UNAUTHENTICATED'));
            });
    });
}