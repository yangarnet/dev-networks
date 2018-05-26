import validator from "validator";
import isEmpty from "./IsEmpty";

const validateNewProfiles = data => {
  const EMPTY = "";
  // return an error object
  let errors = {};
  let { handle, status, bio, skills, webSite } = data;
  handle = !isEmpty(handle) ? handle : EMPTY;
  status = !isEmpty(status) ? status : EMPTY;
  bio = !isEmpty(bio) ? bio : EMPTY;
  skills = !isEmpty(skills) ? skills : EMPTY;

  if (!validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = "name length must between 2 and 40 characters";
  }

  if (validator.isEmpty(handle)) {
    errors.handle = "user profile handle is required";
  }

  if (validator.isEmpty(status)) {
    errors.status = "user profile status is required";
  }

  if (validator.isEmpty(bio)) {
    errors.bio = "user profile bio is required";
  }

  if (validator.isEmpty(skills)) {
    errors.skills = "user profile skills is required";
  }

  if (!isEmpty(webSite)) {
    if (!validator.isURL(webSite)) {
      errors.webSite = "not a valid URL";
    }
  }
  // can do similar stuff for twitter etc.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateNewProfiles;
