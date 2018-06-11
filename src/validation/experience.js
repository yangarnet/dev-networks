import validator from 'validator';
import isEmpty from './IsEmpty';

const validateExperience = exp => {
    const EMPTY = '';
    // return an error object
    let errors = {};
    let { title, company } = exp;
    title = !isEmpty(title) ? title : EMPTY;
    company = !isEmpty(company) ? company : EMPTY;

    if (validator.isEmpty(title)) {
        errors.title = 'job title is required';
    }

    if (validator.isEmpty(company)) {
        errors.company = 'company name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateExperience;
