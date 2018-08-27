const Token = require('../../models/Token');
const readTokensFile = require('./readTokensFile');

/**
 * Repository keeps a list of tokens that are allowed.
 */
module.exports = {
    getByToken(token) {
        const tokens = readTokensFile();
        const rawToken = tokens[token];
        if (!rawToken)
            return null;
        return new Token(token, rawToken.name, rawToken.types);
    }
}