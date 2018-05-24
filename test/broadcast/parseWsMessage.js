const chai = require('chai');
const assert = chai.assert;
const parseWsMessage = require('../../services/broadcast/parseWsMessage');
chai.use(require('chai-shallow-deep-equal'));

describe('broadcast/parseWsMessage', () => {
    it('Given invalid JSON, should throw with INVALID_SYNTAX',
    done => {
        // Given
        const message = 'non_json';
        // When
        const promise = parseWsMessage(message);
        // Then
        promise
            .then(() => {
                done(new Error('Expected to reject.'));
            })
            .catch(err => {
                assert.equal(err.message, 'INVALID_SYNTAX');
                done();
            }) 
            .catch(done);
    });

    it('Given JSON with no events field, should throw with INVALID_EVENTS_MISSING',
    done => {
        // Given
        const message = '{"foo": "bar"}';
        // When
        const promise = parseWsMessage(message);
        // Then
        promise
            .then(() => {
                done(new Error('Expected to reject.'));
            })
            .catch(err => {
                assert.equal(err.message, 'INVALID_EVENTS_MISSING');
                done();
            }) 
            .catch(done);
    });

    it('Given valid JSON with events field, should return object',
    done => {
        // Given
        const message = '{"events": ["the_event"]}';
        // When
        const promise = parseWsMessage(message);
        // Then
        promise
            .then(parsed => {
                assert.shallowDeepEqual(parsed, { events: ['the_event'] });
                done();
            })
            .catch(done);
    });
});