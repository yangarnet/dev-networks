import validator from 'validator';
import isEmpty from './IsEmpty';

const validateUserPost = post => {
    const EMPTY = '';
    // return an error object
    let errors = {};
    let { text, name } = post;
    text = !isEmpty(text) ? text : EMPTY;
    name = !isEmpty(name) ? name : EMPTY;

    if (validator.isEmpty(text)) {
        errors.text = 'post text is required';
    }

    if (validator.isEmpty(name)) {
        errors.name = 'post name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateUserPost;
