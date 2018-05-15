import validator from "validator";
import isEmpty from "./IsEmpty";

const validateRegisterInput = data => {
  let errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 15 })) {
    errors.name = "name length must between 2 and 15 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
