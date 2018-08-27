/**
 * Validate format of given credentials.
 * This does not validate the auth token itself.
 * It also does not validate whether auth scheme is implemented.
 * @param {*} credentials 
 * @returns {Object} Contains scheme and token.
 * @throws {Error} with UNAUTHENTICATED.
 */
module.exports = (credentials) => {
    if (!credentials)
        throw new Error('UNAUTHENTICATED');
    const parts = credentials.split(' ', 2);
    const scheme = parts[0],
          token = parts[1];
    if (!scheme || !token)
        throw new Error('UNAUTHENTICATED');
    return { scheme, token };
}