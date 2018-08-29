const listenerRepository = require('../../state/listenerRepository');

/**
 * Perform handling when listener's websocket connection closes.
 * Removes the listener from active listeners repository.
 */
module.exports = (listener) => {
    listenerRepository.removeListener(listener);
}