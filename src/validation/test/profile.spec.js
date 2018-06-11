import { assert, expect } from 'chai';
import validateNewProfiles from '../profile';

describe('validate user profile', () => {
    it('should validate compulsory information in user profile', () => {
        let profile1 = {
            handle: '',
            status: '',
            bio: '',
            skills: '',
            webSite: ''
        };
        let result1 = validateNewProfiles(profile1);

        assert.isNotNull(result1);
        assert.isFalse(result1.isValid);
        assert.isNotNull(result1.errors);

        expect(result1.errors).to.have.property('handle', 'user profile handle is required');
        expect(result1.errors).to.have.property('status', 'user profile status is required');
        expect(result1.errors).to.have.property('bio', 'user profile bio is required');
        expect(result1.errors).to.have.property('skills', 'user profile skills is required');
        expect(result1.errors).to.have.property('webSite', 'not a valid URL');

        let profile2 = {
            handle: '1',
            status: '',
            bio: '',
            skills: '',
            webSite: ''
        };
        let result2 = validateNewProfiles(profile2);

        assert.isNotNull(result2);
        assert.isFalse(result2.isValid);
        assert.isNotNull(result2.errors);
        expect(result2.errors).to.have.property('handle', 'handle length must between 2 and 40 characters');
        expect(result2.errors).to.have.property('status', 'user profile status is required');
        expect(result2.errors).to.have.property('bio', 'user profile bio is required');
        expect(result2.errors).to.have.property('skills', 'user profile skills is required');
        expect(result2.errors).to.have.property('webSite', 'not a valid URL');

    });

    it('should pass a valid user profile', () => {
        let profile = {
            handle: 'your.handle',
            status: 'fulltime',
            bio: 'male',
            skills: 'javascript,html,css,node,react',
            webSite: 'https://www.google.com'
        };

        let result = validateNewProfiles(profile);

        assert.isNotNull(result);
        assert.isTrue(result.isValid);
        assert.isEmpty(result.errors);
    });
});
