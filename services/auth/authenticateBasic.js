const fs = require('fs');
const tokenRepository = require('./tokenRepository');
const Token = require('../../models/Token');

/**
 * Does basic authentication by checking whether provided
 * token is in the token repository.
 * @param {String} token Authentication token to check.
 * @returns {Token} Details about the client.
 * @throws {Error} If token is not allowed.
 */
module.exports = (token) => {
    return new Promise((resolve, reject) => {
        // Search for allowed token details in the repository.
        const authenticatedToken = tokenRepository.getByToken(token);
        // Handle token not found.
        if (!authenticatedToken)
            return reject(new Error('UNAUTHENTICATED'));
        // Resolve with the authenticated client.
        return resolve(authenticatedToken);
    });
};