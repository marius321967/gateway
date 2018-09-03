/**
 * Incoming streams must be kept in a repository so that new listeners are
 * notified about already existing streams.
 */

const Stream = require('../models/Stream');
const uuid = require('uuid');

const streams = {};
const streamsByType = {};

const ensureListsCreated = (type) => {
    if (streamsByType[type] == null)
        streamsByType[type] = [];
}

/**
 * Add new stream to the active streams repository.
 * @param {Stream} stream
 * @returns {String} ID assigned to the stream.
 */
exports.addStream = (stream) => {
    const id = uuid();
    stream.id = id;
    streams[id] = stream;
    ensureListsCreated(stream.type);
    streamsByType[stream.type].push(stream);
    return id;
}

exports.getStreamById = (id) => {
    return streams[id];
}

/**
 * Get all streams of the given data type.
 * @param {String} type Data type.
 */
exports.getStreamsByType = (type) => {
    ensureListsCreated(type);
    return streamsByType[type];
}

/**
 * Remove stream from the active streams repository.
 * @param {Stream} stream 
 */
exports.removeStream = (stream) => {
    delete streams[stream.id];
    streamsByType[stream.type].splice(streamsByType[stream.type].indexOf(stream), 1);
}