import validator from 'validator';
import isEmpty from './IsEmpty';

const validateEducation = edu => {
    const EMPTY = '';
    // return an error object
    let errors = {};
    let { school, degree, fieldOfStudy } = edu;
    school = !isEmpty(school) ? school : EMPTY;
    degree = !isEmpty(degree) ? degree : EMPTY;
    fieldOfStudy = !isEmpty(fieldOfStudy) ? fieldOfStudy : EMPTY;

    if (validator.isEmpty(school)) {
        errors.school = 'school is required';
    }

    if (validator.isEmpty(degree)) {
        errors.degree = 'degree is required';
    }

    if (validator.isEmpty(fieldOfStudy)) {
        errors.fieldOfStudy = 'field of study is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateEducation;
