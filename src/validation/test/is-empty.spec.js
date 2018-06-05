import chai from 'chai';
import { assert, expect } from 'chai';
import isEmpty from '../IsEmpty';

const should = chai.should();

describe('test case IS EMPTY in javascript', () => {
    it('should return correct value from isEmpty helper function in all cases', () => {
        let input = '';
        assert(isEmpty(input) === true, 'empty string should be evaluated to be TRUE');
        input = 'non empty';
        assert(isEmpty(input) === false, 'non empty string should be evaluated to be FALSE');
        input = null;
        expect(isEmpty(input)).to.true;
    });
});
