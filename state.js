/**
 * Gobal app state.
 * listeners: each key in the object will be name of event. 
 *  Content will be an array of WebSocket connections which are allowed to listen
 *  to event.
 */
module.exports = {
    listeners: {}
};