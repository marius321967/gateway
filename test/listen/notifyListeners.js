const chai = require('chai').chai;
const sinon = require('sinon');
const notifyListeners = require('../../services/listen/notifyListeners');

describe('listen/notifyListeners', () => {
    it('Given single listener, should notify with correct payload', 
    done => {
        // Given
        const event = {
            event: 'the_event',
            data: {foo: 'bar'}
        };
        const listenerConnection = { send: sinon.fake() }; // A WebSocket connection object.
        const state = { listeners: { the_event: [listenerConnection] } };
        // When
        const promise = notifyListeners(event, state);
        // Then
        promise
            .then(() => {
                sinon.assert.calledWith(listenerConnection.send, 
                    '{"type":"event","event":"the_event","data":{"foo":"bar"}}');
                done();
            })
            .catch(done);
    });
});