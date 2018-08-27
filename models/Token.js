/**
 * Represents an auth token which grants permissions to the system.
 */
class Token {
    /**
     * @param {String} token
     * @param {String} name
     * @param {Object} dataTypes Allowed data types.
     */
    constructor(token, name, dataTypes) {
        this.token = token;
        this.name = name;
        this.dataTypes = dataTypes;
    }
}

module.exports = Token;