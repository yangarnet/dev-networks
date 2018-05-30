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
