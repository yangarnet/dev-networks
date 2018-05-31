import isEmpty from '../../validation/IsEmpty';

// FIXME  what about remove skill?
const updateSkillSet = (currentSkills, newSkills) => {
    newSkills.forEach(skill => {
        if (currentSkills.indexOf(skill) === -1) {
            currentSkills.push(skill);
        }
    });
    return currentSkills;
};

export const setProfilesToUpdate = (payload, currentProfile) => {
    return {
        handle: !isEmpty(payload.handle) ? payload.handle : currentProfile.handle,
        company: !isEmpty(payload.company) ? payload.company : currentProfile.company,
        webSite: !isEmpty(payload.webSite) ? payload.webSite : currentProfile.webSite,
        location: !isEmpty(payload.location) ? payload.location : currentProfile.location,
        status: !isEmpty(payload.status) ? payload.status : currentProfile.status,
        skills: !isEmpty(payload.skills) ? updateSkillSet(currentProfile.skills, payload.skills) : currentProfile.skills,
        bio: !isEmpty(payload.bio) ? payload.bio : currentProfile.bio,
        githubusername: !isEmpty(payload.githubusername) ? payload.githubusername : currentProfile.githubusername,
        social: Object.assign(currentProfile.social, payload.social),
        lastUpdated: Date.now()
    }
};

export const updateExperienceForProfile = (currentExperience, newExperience) => {
    currentExperience.forEach(exp => {
        if (exp.id === newExperience.id) {
            exp.title = newExperience.title;
            exp.company = newExperience.company;
            exp.location = newExperience.location;
            exp.from = newExperience.from;
            exp.to = newExperience.to;
            exp.current = newExperience.current;
            exp.description = newExperience.description;
        }
    });
};


export const deleteExperienceForProfile = (currentExperience, idToDelete) => {
    const index = currentExperience.findIndex(exp => exp.id === idToDelete);
    const result = currentExperience[index];
    currentExperience.splice(index, 1);
    return result;
};
