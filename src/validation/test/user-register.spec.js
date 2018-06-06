import { expect, assert } from 'chai';
import validateRegisterInput from '../user-register';

describe('test cases for user registration', () => {
    it('should return error when user name is empty', () => { });
    it('should return error when user email is empty', () => { });
    it('should return error when user password or confirmed password is empty', () => { });
    it('should return error when user name is less than 2 characters', () => { });
    it('should return error when user name is more than 15 characters', () => { });
    it('should return error when user email is invalid', () => { });
    it('should return error when user password is less than 6 characters', () => { });
    it('should return error when user password is more than 30 characters', () => { });
    it('should return error when user password and confirmed password not match', () => { });
});
