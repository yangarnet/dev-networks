import { assert, expect } from 'chai';
import validateExperience from '../experience';

describe('user experience validation', () => {
    it('should validate user experience', () => {
        let exp = { title: '', company: '' };
        let result = validateExperience(exp);

        expect(result).to.be.not.null;
        expect(result.isValid).to.be.false;
        expect(result.errors).to.be.not.empty;

        expect(result.errors).to.have.property('title', 'job title is required', 'enter the job title');
        expect(result.errors).to.have.property('company', 'company name is required', 'enter the company name')
    });

    it('should pass a valid user experience', () => {
        let exp = { title: 'thank for the post', company: 'github' };
        let result = validateExperience(exp);

        expect(result).to.be.not.null;
        expect(result.isValid).to.be.true;
        expect(result.errors).to.be.empty;
    });
});
