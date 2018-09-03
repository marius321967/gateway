const Stream = require('../../models/Stream');
const activeStreamsRepository = require('../../state/activeStreamsRepository');
const listenerRepository = require('../../state/listenerRepository');
const notifyListeners = require('../../services/broadcast/notifyListeners');
const constructStreamNotificationPayload = require('./constructStreamNotificationPayload')
const devnull = require('dev-null');

/**
 * Register new data stream and notify listeners.
 * @param {*} request Express request (stream with pipe()).
 * @param {String} type Data type.
 * @param {*} metadata Optional stream metadata.
 */
module.exports = (request, type, metadata) => {
    const stream = new Stream(request, type, metadata);
    // Add stream to the actives streams repository.
    // Streams must be kept in a repository so that new listeners are
    // notified about already existing streams.
    activeStreamsRepository.addStream(stream);
    // Notify listeners about the new stream - do it asychronousy.
    notifyListeners('streams', type, 'stream', constructStreamNotificationPayload(stream));
    // Keep stream alive by piping to some empty reader, 
    // otherwise piping to listeners will not work.
    request.pipe(devnull());
    // Set handler for when the stream ends.
    // This handler is called both when the stream ends gracefully
    // and when it crashes.
    request.socket.on('close', () => {
        activeStreamsRepository.removeStream(stream);
    });
}