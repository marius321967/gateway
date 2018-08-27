class Stream {
    constructor(request, type, metadata) {
        this.id = null;
        this.request = request;
        this.type = type;
        this.metadata = metadata;
    }
}

module.exports = Stream;