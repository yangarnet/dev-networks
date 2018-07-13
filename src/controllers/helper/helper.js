import isEmpty from "../../validation/IsEmpty";

// FIXME  what about remove skill?
const updateSkillSet = (currentSkills, newSkills) => {
    if (typeof newSkills == "string") {
        newSkills = newSkills.split(",");
    }
    newSkills.forEach(skill => {
        if (currentSkills.indexOf(skill) === -1) {
            currentSkills.push(skill);
        }
    });
    return currentSkills;
};

export const setProfilesToUpdate = (payload, currentProfile) => {
    payload.social = {
        facebook: payload.facebook,
        twitter: payload.twitter,
        linkedin: payload.linkedin,
        youtube: payload.youtube,
        instagram: payload.instagram
    };

    return {
        handle: !isEmpty(payload.handle)
            ? payload.handle
            : currentProfile.handle,
        company: !isEmpty(payload.company)
            ? payload.company
            : currentProfile.company,
        webSite: !isEmpty(payload.webSite)
            ? payload.webSite
            : currentProfile.webSite,
        location: !isEmpty(payload.location)
            ? payload.location
            : currentProfile.location,
        status: !isEmpty(payload.status)
            ? payload.status
            : currentProfile.status,
        skills: !isEmpty(payload.skills)
            ? updateSkillSet(currentProfile.skills, payload.skills)
            : currentProfile.skills,
        bio: !isEmpty(payload.bio) ? payload.bio : currentProfile.bio,
        githubusername: !isEmpty(payload.githubusername)
            ? payload.githubusername
            : currentProfile.githubusername,
        social: Object.assign(currentProfile.social, payload.social),
        lastUpdated: Date.now()
    };
};

export const updateExperienceForProfile = (
    currentExperience,
    newExperience
) => {
    currentExperience.forEach(exp => {
        if (exp.id === newExperience.id) {
            exp.title = isEmpty(newExperience.title)
                ? exp.title
                : newExperience.title;
            exp.company = isEmpty(newExperience.company)
                ? exp.company
                : newExperience.company;
            exp.location = isEmpty(newExperience.location)
                ? exp.location
                : newExperience.location;
            exp.from = isEmpty(newExperience.from)
                ? exp.from
                : newExperience.from;
            exp.to = isEmpty(newExperience.to) ? exp.to : newExperience.to;
            exp.current = isEmpty(newExperience.current)
                ? exp.current
                : newExperience.current;
            exp.description = isEmpty(newExperience.description)
                ? exp.description
                : newExperience.description;
        }
    });
};

export const updateEducationForProfile = (currentEducation, newEducation) => {
    currentEducation.forEach(edu => {
        if (edu.id === newEducation.id) {
            edu.school = isEmpty(newEducation.school)
                ? edu.school
                : newEducation.school;
            edu.degree = isEmpty(newEducation.degree)
                ? edu.degree
                : newEducation.degree;
            edu.fieldOfStudy = isEmpty(newEducation.fieldOfStudy)
                ? edu.fieldOfStudy
                : newEducation.fieldOfStudy;
            edu.from = isEmpty(newEducation.from)
                ? edu.from
                : newEducation.from;
            edu.to = isEmpty(newEducation.to) ? edu.to : newEducation.to;
            edu.current = isEmpty(newEducation.current)
                ? edu.current
                : newEducation.current;
            edu.description = isEmpty(newEducation.description)
                ? edu.description
                : newEducation.description;
        }
    });
};

export const deleteFromProfile = (current, idToDelete) => {
    const index = current.findIndex(exp => exp.id === idToDelete);
    const result = current[index];
    current.splice(index, 1);
    return result;
};

export class EmailAlreadyRegisteredError extends Error {
    constructor(message, status) {
        super(message);
        this.email = "email";
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const joinStringWithHyphen = str =>
    str
        .toLowerCase()
        .split(" ")
        .join("-");
