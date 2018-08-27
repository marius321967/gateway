const chai = require('chai');
const assert = chai.assert;
const registerListener = require('../../services/listen/registerListener');
chai.use(require('chai-shallow-deep-equal'));

describe('listen/registerListener', () => {
    it('Given multiple events, should register them & not remove existing listeners',
    done => {
        // Given 
        const connection = {foo: 'bar'};
        const events = ['the_event_1', 'the_event_2'];
        const state = { 
            listeners: {
                the_event_2: [{bar: 'baz'}] // Second already existing listener.
            }
        }; // A WebSocket connection object.
        // When 
        const promise = registerListener(connection, events, state);
        // Then
        promise
            .then(() => {
                assert.shallowDeepEqual(state, 
                { 
                    listeners: {
                        the_event_1: [{foo: 'bar'}],
                        the_event_2: [{bar: 'baz'}, {foo: 'bar'}]
                    }
                });
                done();
            })
            .catch(done);
    });
});