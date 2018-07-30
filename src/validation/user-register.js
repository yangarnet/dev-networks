import validator from "validator";
import isEmpty from "./IsEmpty";

const validateRegisterInput = data => {
    const EMPTY = "";
    // return an error object
    let errors = {};
    let { name, email, password, confirmedPassword } = data;
    name = !isEmpty(name) ? name : EMPTY;
    email = !isEmpty(email) ? email : EMPTY;
    password = !isEmpty(password) ? password : EMPTY;
    confirmedPassword = !isEmpty(confirmedPassword) ? confirmedPassword : EMPTY;

    if (!validator.isLength(name, { min: 2, max: 15 })) {
        errors.name = "name length must between 2 and 15 characters";
    }

    if (validator.isEmpty(name)) {
        errors.name = "please input your user name";
    }

    if (validator.isEmpty(email)) {
        errors.email = "please input an email address";
    }

    if (!validator.isEmail(email)) {
        errors.email = errors.email || "please provide a valid email address";
    }

    if (validator.isEmpty(password)) {
        errors.password = "please input a password";
    }

    if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password =
            errors.password || "password must be at least 6 characters";
    }

    if (validator.isEmpty(confirmedPassword)) {
        errors.confirmedPassword = "please input your confirmed password";
    }

    if (!validator.equals(password, confirmedPassword)) {
        errors.confirmedPassword = "password should be matched";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateRegisterInput;
