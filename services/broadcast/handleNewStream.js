const Stream = require('../../models/Stream');
const activeStreamsRepository = require('../../state/activeStreamsRepository');
const listenerRepository = require('../../state/listenerRepository');
const notifyListeners = require('../../services/broadcast/notifyListeners');
const constructStreamNotification = require('./constructStreamNotification')
const devnull = require('dev-null');

/**
 * Register new data stream and notify listeners.
 * @param {*} request Express request (stream with pipe()).
 * @param {String} type Data type.
 * @param {*} metadata Optional stream metadata.
 */
module.exports = (request, type, metadata) => {
    const stream = new Stream(request, type, metadata);
    activeStreamsRepository.addStream(stream);
    // Notify listeners.
    const listeners = listenerRepository.getListeners('streams', type);
    for (let i in listeners) {
        notifyListeners('streams', type, constructStreamNotification(stream));
    }
    // Keep stream alive, otherwise piping to listeners will not work.
    request.pipe(devnull());
    // request.pipe(process.stdout);
    // Handle stream end.
    request.socket.on('close', () => {
        // Stream closed gracefully or crashed.
        activeStreamsRepository.removeStream(stream);
    })
}