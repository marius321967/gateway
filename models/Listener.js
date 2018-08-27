class Listener {
    constructor(connection, isAuthenticated, dataTypes) {
        this.connection = connection;
        this.isAuthenticated = isAuthenticated;
        this.dataTypes = dataTypes;
    }
}

module.exports = Listener;