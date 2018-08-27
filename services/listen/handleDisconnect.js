const listenerRepository = require('../../state/listenerRepository');

module.exports = (listener) => {
    listenerRepository.removeListener(listener);
}