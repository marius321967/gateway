const sinon = require('sinon');
const sendWsMessage = require('../../services/listen/sendWsMessage');

describe('listen/sendWsMessage', () => {
    it('Given message, should serialize & call send',
    done => {
        // Given 
        const message = {foo: 'bar'};
        const connection = { send: sinon.fake() }; // A WebSocket connection object.
        // When 
        const promise = sendWsMessage(message, connection);
        // Then
        promise
            .then(() => {
                sinon.assert.calledWith(connection.send,
                    '{"foo":"bar"}');
                done();
            })
            .catch(done);
    });
});