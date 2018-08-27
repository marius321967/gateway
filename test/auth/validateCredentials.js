const chai = require('chai');
const assert = chai.assert;
const validateCredentials = require('../../services/auth/validateCredentials');
chai.use(require('chai-shallow-deep-equal'));

describe('auth/validateCredentials', () => {
    it('Given empty, should throw UNAUTHENTICATED', () => {
        // Given 
        const credentials = ''
        // When 
        const action = () => validateCredentials(credentials);
        // Then
        assert.throws(action, 'UNAUTHENTICATED');
    });

    it('Given missing token, should throw UNAUTHENTICATED', () => {
        // Given 
        const credentials = 'Basic    '
        // When 
        const action = () => validateCredentials(credentials);
        // Then
        assert.throws(action, 'UNAUTHENTICATED');
    });

    it('Given correctly formatted credentials, should return with parsed credentials',
    () => {
        // Given 
        const credentials = 'Custom xyz'
        // When 
        const result = validateCredentials(credentials);
        // Then
        assert.equal(result.scheme, 'Custom');
        assert.equal(result.token, 'xyz');
    });
});