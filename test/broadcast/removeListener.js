const chai = require('chai');
const assert = chai.assert;
const removeListener = require('../../services/broadcast/removeListener');
chai.use(require('chai-shallow-deep-equal'));

describe('broadcast/removeListener', () => {
    it('Given given state with multiple listeners, should correctly remove only given listener',
    done => {
        // Given 
        const connection = {foo: 'bar'};
        const state = { 
            listeners: {
                the_event_1: [ connection ],
                the_event_2: [ {bar: 'baz'}, connection ]
            }
        }; // A WebSocket connection object.
        // When 
        const promise = removeListener(connection, state);
        // Then
        promise
            .then(() => {
                assert.shallowDeepEqual(state, 
                { 
                    listeners: {
                        the_event_1: [],
                        the_event_2: [ {bar: 'baz'} ]
                    }
                });
                done();
            })
            .catch(done);
    });
});