import { expect, assert } from 'chai';
import validateRegisterInput from '../user-register';

describe('test cases for user registration', () => {

    it('should return error when user name is empty', () => {
        let user = { email: '1232@gmail.com', password: '123456', confirmedPassword: '123456' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'please input your user name');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user name is less than 2 characters', () => {
        let user = { name: 'y', email: '1232@gmail.com', password: '123456', confirmedPassword: '123456' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user name is more than 15 characters', () => {
        let user = { name: 'abcdfghijklmnopqrstuvwxyz', email: '1232@gmail.com', password: '123456', confirmedPassword: '123456' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user email is empty', () => {
        let user = { name: 'abcdfghijklmnopqrstuvwxyz', email: '', password: '123456', confirmedPassword: '123456' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(errors).to.have.property('email', 'please input an email address');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user email is invalid', () => {
        let user = { name: 'abcdfghijklmnopqrstuvwxyz', email: 'your email @ gmail.com', password: '123456', confirmedPassword: '123456' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(errors).to.have.property('email', 'please provide a valid email address');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user password or confirmed password is empty', () => {
        let user = { name: 'abcdfghijklmnopqrstuvwxyz', email: 'your email @ gmail.com', password: '', confirmedPassword: '' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(errors).to.have.property('email', 'please provide a valid email address');
        expect(errors).to.have.property('password', 'please input a password');
        expect(errors).to.have.property('confirmedPassword', 'please input your confirmed password');

        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user password and confirmed password not match', () => {
        let user = { name: 'abcdfghijklmnopqrstuvwxyz', email: 'your email @ gmail.com', password: '12345768', confirmedPassword: '' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(errors).to.have.property('email', 'please provide a valid email address');
        expect(errors).to.have.property('confirmedPassword', 'please input your confirmed password');
        expect(errors).to.have.property('passwordNotMatched', 'password should be matched');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;

        let user2 = { name: 'abcdfghijklmnopqrstuvwxyz', email: 'your email @ gmail.com', password: '12345768', confirmedPassword: 'asdfas' };
        let result = validateRegisterInput(user2);
        expect(result).to.have.property('errors');
        expect(result).to.have.property('isValid');
        expect(result.errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(result.errors).to.have.property('email', 'please provide a valid email address');
        expect(result.errors).to.have.property('passwordNotMatched', 'password should be matched');

        assert.isFalse(result.isValid);
        expect(result.isValid).to.be.false;
    });

    it('should return error when user password is less than 6 characters', () => {
        let user = { name: 'abcdfghijklmnopqrstuvwxyz', email: 'your email @ gmail.com', password: '12345', confirmedPassword: 'dfgsdf' };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(errors).to.have.property('email', 'please provide a valid email address');
        expect(errors).to.have.property('password', 'password must be at least 6 characters');
        expect(errors).to.have.property('passwordNotMatched', 'password should be matched');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

    it('should return error when user password is more than 30 characters', () => {
        let user = {
            name: 'abcdfghijklmnopqrstuvwxyz', email: 'your email @ gmail.com',
            password: '123sdfgsdfgsdfgsdfgdfg36475uetjyrreegtd75e64577tyhggfsdfgdsfgdsfgsfhfgr6797dgndfgsdsdfdsdfgsdfgdfgsdfsdsdfgi5tyjhfgr45',
            confirmedPassword: 'dfgsdf'
        };
        let { errors, isValid } = validateRegisterInput(user);
        expect(errors).to.be.not.undefined;
        expect(errors).to.have.property('name', 'name length must between 2 and 15 characters');
        expect(errors).to.have.property('email', 'please provide a valid email address');
        expect(errors).to.have.property('password', 'password must be at least 6 characters');
        expect(errors).to.have.property('passwordNotMatched', 'password should be matched');
        assert.isFalse(isValid);
        expect(isValid).to.be.false;
    });

});
