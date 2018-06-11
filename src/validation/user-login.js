import validator from 'validator';
import isEmpty from './IsEmpty';

const validateUserLogin = data => {
    const EMPTY = '';
    // return an error object
    let errors = {};
    let {
        email,
        password
    } = data;

    email = !isEmpty(email) ? email : EMPTY;
    password = !isEmpty(password) ? password : EMPTY;

    if (validator.isEmpty(email)) {
        errors.email = 'please input an email address';
    }

    if (!validator.isEmpty(email) && !validator.isEmail(email)) {
        errors.email = 'please provide a valid email address';
    }

    if (validator.isEmpty(password)) {
        errors.password = 'please input a password';
    }

    if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = errors.password || 'password must be at least 6 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateUserLogin;
