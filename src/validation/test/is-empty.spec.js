import chai from 'chai';
import { assert, expect } from 'chai';
import isEmpty from '../IsEmpty';

const should = chai.should();

describe('test case IS EMPTY in javascript', () => {
    it('should return correct value from isEmpty helper function in all cases', () => {
        let input;
        assert.isTrue(isEmpty(input), 'undefine should be evaluated to EMPTY');

        input = '';
        assert(isEmpty(input) === true);
        expect(isEmpty(input)).to.be.true;
        input = null;
        expect(isEmpty(input)).to.be.true;
        assert.isTrue(isEmpty(input));

        input = {};
        expect(isEmpty(input)).to.be.a('boolean');
        expect(isEmpty(input)).to.be.true;
        assert.strictEqual(isEmpty(input), true, 'empty object evaluats to be EMPTY');

        input = [];
        expect(input).with.property('length').to.be.equal(0);
        expect(isEmpty(input)).to.be.true;
        assert.isTrue(isEmpty(input), 'empty array should be evaluted to be EMPTY');
    });

    it('should return FALSE from isEmpty() for non-empty string', () => {
        let input = 'test';
        expect(isEmpty(input)).to.be.false;
        assert.strictEqual(isEmpty(input), false);
    });

    it('should return FALSE from isEmpty() for non-empty object', () => {
        let input = { a: 1 };
        expect(isEmpty(input)).to.be.false;
        assert.isFalse(isEmpty(input));
    });

    it('should return FALSE from isEmpty() for non-empty array', () => {
        let input = [1, 2, 3];
        expect(isEmpty(input)).to.be.false;
        assert.isFalse(isEmpty(input));
    });

    it('should return FALSE from isEmpty() for defined stuff', () => {
        let input = { a: [1, 2, 3], yes() { console.log('yes') } };
        expect(isEmpty(input)).to.be.false;
        assert.isFalse(isEmpty(input));
    });
});
