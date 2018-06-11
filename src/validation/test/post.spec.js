import { assert, expect } from 'chai';
import validateUserPost from '../post';

describe('validate user post', () => {
    it('should valiate all compulsory fields in user post', () => {
        let post = { text: '', name: '' };
        let result = validateUserPost(post);

        assert.isNotNull(result);
        assert.isNotEmpty(result.errors);
        assert.isFalse(result.isValid);

        expect(result.errors).to.have.property('text', 'post text is required')
        expect(result.errors).to.have.property('name', 'post name is required')
    });

    it('should pass a valid user post', () => {
        let post = { text: 'thank for leaving a comment', name: 'first test' };
        let result = validateUserPost(post);

        assert.isNotNull(result);
        assert.isEmpty(result.errors);
        assert.isTrue(result.isValid);
    });
});
