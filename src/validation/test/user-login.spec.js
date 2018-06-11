import { expect, assert } from 'chai';
import validateUserLogin from '../user-login';

describe('user login validation', () => {

    it('should complain when email is empty', () => {
        let user = { email: '', password: 'abcefgg' };
        let { errors, isValid } = validateUserLogin(user);

        assert(errors !== null);
        assert.isFalse(isValid);
        expect(errors).to.have.property('email', 'please input an email address');
        expect(errors).not.to.have.property('password');
    });

    it('should complain when password is empty or failt to meet length requirement', () => {
        let user1 = { email: '1234@gmail.com', password: '' };
        let result1 = validateUserLogin(user1);

        assert.isNotNull(result1);
        assert.isFalse(result1.isValid);
        assert.isNotNull(result1.errors);
        expect(result1.errors).not.to.have.property('email', '', 'check you email');
        expect(result1.errors).to.have.property('password', 'please input a password');

        let user2 = { email: '1234@gmail.com', password: '12345' };
        let result2 = validateUserLogin(user2);
        assert.isNotNull(result2);
        assert.isFalse(result2.isValid);
        assert.isNotNull(result2.errors);
        expect(result2.errors).not.to.have.property('email', '', 'check you email');
        expect(result2.errors).to.have.property('password', 'password must be at least 6 characters');

        let user3 = { email: '1234@gmail.com', password: 'qqwertyuiuytrewehjkjhgfdsasdfghjzxcvbnmnbvcasdfghjklkytrtyuiolkhgfbnm,;lkjhggffertyuifdsfgytresdfghytresdfgfdstytujh' };
        let result3 = validateUserLogin(user3);
        assert.isNotNull(result3);
        assert.isFalse(result3.isValid);
        assert.isNotNull(result3.errors);
        expect(result3.errors).not.to.have.property('email', '', 'check you email');
        expect(result3.errors).to.have.property('password', 'password must be at least 6 characters');
    });

    it('should return OK with valid email and password', () => {
        let user = { email: 'test.email@gmail.com', password: 'Passw0rd' };
        let result = validateUserLogin(user);

        assert.isNotNull(result);
        assert.isTrue(result.isValid);
        assert.isEmpty(result.errors);
        expect(Object.keys(result.errors)).with.lengthOf(0);
    });
});
